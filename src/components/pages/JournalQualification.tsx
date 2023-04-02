
import {useEffect, useRef, useState} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import {API_PATH} from "../../utils/apiPath";
import {Notify} from "notiflix/build/notiflix-notify-aio";
import {ObjectDelete, uploadFile} from "../../utils/firebase";
const JournalQualification = () => {
  const {id} = useParams();
  const getJournal = async () => {
    const journalFetch = await fetch(`${API_PATH}/journal/${id}`)
    const journalRes = await journalFetch.json()
    return journalRes
  }
  const [journal, setJournal] = useState(getJournal)
  const [seeder, setSeeder] = useState(1)

  useEffect(() => {
    // (async ()=> {
    //   console.log(`${API_PATH}/journal/${id}`)
    //   const journalFetch = await fetch(`${API_PATH}/journal/${id}`)
    //   const journalRes = await journalFetch.json()
    //   console.log(journalRes)
    //   // setJournal(journalRes)
    // })()

  }, [])

  const download = (e:any) => {
    e.preventDefault()
    fetch(`${e.target.dataset.download}`)
      .then(response => {
        if(response.ok) {
          response.blob()
            .then(blob => {
              let localURL = window.URL.createObjectURL(blob);
              let temporalAnchor = document.createElement('a');
              temporalAnchor.style.display = 'none';
              document.body.appendChild(temporalAnchor);
              temporalAnchor.href = localURL;
              console.log(e.target.dataset.id)
              temporalAnchor.download = e.target.dataset.id;
              temporalAnchor.click();
              window.URL.revokeObjectURL(localURL);
              document.body.removeChild(temporalAnchor);
            })
            .catch(error => {
              console.error(error.message);
            });
        } else {
          console.log('Algo salió mal');
        }
      })
      .catch(error => {
        console.error(error.message);
      });
  }
 const upload = async (e:any) => {
    e.preventDefault()
   Notify.init({
     position: 'center-top',
     timeout: 3000,
     backOverlay: true,
     failure: {
       background: 'darkred',
       textColor: '#fff',
       childClassName: 'notiflix-notify-failure',
       notiflixIconColor: 'rgba(255,255,255,.9)',
       fontAwesomeClassName: 'fas fa-times-circle',
       fontAwesomeIconColor: 'rgba(255,255,255,.9)',
       backOverlayColor: 'rgba(0,0,0,.5)',
     },
   })
   const target = e.target
   const button = target.querySelector('button')
   const formData = new FormData(target)
   try{
     const file = target.file.files[0]
     const allowedExtensions = /(.jpg|.png|.pdf)$/i;
     if(!allowedExtensions.exec(file.name)){
       throw new Error('Solo se permiten archivos PDF, PNG, JPG o JPEG')
     }
     button.innerHTML = 'Subiendo...'
     const ext = !file.name.includes('.jpeg') ? file.type.split('/')[1]: 'jpg';
     const result = await uploadFile(file)
     if (result.url) {
       formData.append('url', result.url)
       formData.append('ext', ext)
       formData.append('id', e.target.dataset.id)
       formData.append('refFileStorage', result.result.metadata.fullPath)
       axios.post(`${API_PATH}/qualified`, formData)
         .then(res => {
            console.log(res.data)
           setJournal(res.data)
            // window.location.reload()
         })
     }
   }
   catch (e) {
     Notify.failure('Solo se permiten archivos PDF, PNG O JPG');
   }
   // let jour = JournalsStr
   //@ts-ignore


 }
 const destroy = async (e:any) => {
   await ObjectDelete(e.target.dataset.ref)
   setSeeder(Math.random())
 }
  return(
    <section className="section Journal padding">
      {
        // @ts-ignore
        // journal && journal.map((item: any, index: number) => (
        //   <div key={index}>
        //     <h2>{item.user.name} {item.user.lastName}</h2>
        //     <p> Código: {item._id}</p>
        //     <article className={'Journal__show'}>
        //       <div className="Journal__show-left">
        //         <p>Sin calificar</p>
        //         {
        //           item.ext === 'pdf' ? (
        //               <embed src={`${item.urlFile}#toolbar=0&navpanes=0&scrollbar=0`} type="application/pdf" width="100%" height="600px" />
        //
        //               // <iframe src={`https://docs.google.com/gview?url=${item.urlFile}&embedded=true`} />
        //               // <iframe src="https://docs.google.com/viewer?srcid=1AdyzEZ8rhItZZ6PtQpHYsX4MyIpuYHgJ&pid=explorer&efh=false&a=v&chrome=false&embedded=true" width="100%" height="680px"></iframe>
        //
        //
        //             ):
        //             (
        //               <img src={item.urlFile} alt={item._id}/>
        //             )
        //         }
        //         <button className={'btn btn-dark'} data-download={`${item.urlFile}`} data-id={`${item.user.name}${item.user.lastName}-${item._id}`} onClick={download}>Descargar</button>
        //
        //       </div>
        //       <div className="Journal__show-right">
        //         <p>Calificado</p>
        //         {
        //           item.qualified
        //             ? (
        //               <>
        //                 {
        //                   item.journalQualifieldExt === 'pdf'
        //                   ? (
        //                      <embed src={`${item.journalQualifieldPath}#toolbar=0&navpanes=0&scrollbar=0`} type="application/pdf" width="100%" height="600px" />
        //                   ): (
        //                     <img src={item.journalQualifieldPath} alt={item._id}/>
        //                   )
        //                 }
        //                 <button className={'btn btn-dark'} data-id={`${item._id}`} data-ref={`${item.journalQualifieldRefFileStorage}`} onClick={destroy}>Borrar</button>
        //               </>
        //             )
        //             : (
        //               <form action="" onSubmit={upload} data-id={item._id}>
        //                 <div className="form-upload__group">
        //                   <label htmlFor="file" className="form-upload__label">
        //                     Archivo:
        //                   </label>
        //                   <input
        //                     type="file"
        //                     className="form-upload__input"
        //                     id="file"
        //                     name="file"
        //                   />
        //                 </div>
        //                 <button className={'btn btn-dark btn small'}>Subir</button>
        //               </form>
        //             )
        //         }
        //
        //       </div>
        //     </article>
        //   </div>
        // ))
      }
    </section>
  )
}

export default JournalQualification
