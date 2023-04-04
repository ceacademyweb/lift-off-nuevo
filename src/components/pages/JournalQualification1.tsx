//@ts-nocheck

import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {API_PATH} from "../../utils/apiPath";
import {getDownloadURL} from "firebase/storage";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {Notify} from "notiflix/build/notiflix-notify-aio";
import {ObjectDelete, uploadFile} from "../../utils/firebase";
import axios from "axios";

const JournalQualification1 = () => {
  const {id} = useParams();
  const [journal, setJournal] = useState(null)
  const [level,setLevel] = useState(null)
  const levelInput:any = useRef()

  useEffect(() => {

    const fetchJournal = async () => {
      try {
        const journalFetch = await fetch(`${API_PATH}/journal/${id}`)
        const journalRes = await journalFetch.json()
        console.log(journalRes)
        setJournal(journalRes)
        setLevel(journalRes[0].level)
      } catch (error){
        console.log(error)
      }
    }
    if(!journal) fetchJournal()
  }, [journal])

  const destroy = async (e:any) => {
    console.log('llega')
    e.preventDefault()
    console.log(e.target.dataset.id)
    try {
      const result = await axios.put(`${API_PATH}/qualified/${e.target.dataset.id}`)
      console.log(result)
      if (result.status === 200){
        await ObjectDelete(e.target.dataset.ref)
        setJournal(result.data)
        Notify.success('Archivo eliminado');
      }else{

        throw new Error('Error al eliminar el archivo')
      }
    }catch (e:any) {
      Notify.failure(e.message);
    }
    // setSeeder(Math.random())
  }
  const download = async (e:any) => {
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
    const target = e.target
    const button = target.querySelector('button')
    button.innerHTML = '<img src="/img/load.svg" alt="">';
    const formData = new FormData()
    const file = target.file.files[0]
    const allowedExtensions = /(.jpg|.png|.pdf)$/i;
    console.log(file)
    try{
      if(!allowedExtensions.exec(file.name)){
        throw new Error('Solo se permiten archivos PDF, PNG, JPG o JPEG')
      }
      const ext = !file.name.includes('.jpeg') ? file.type.split('/')[1]: 'jpg';
      const result = await uploadFile(file)
      if (result.url){
        formData.append('url', result.url)
        formData.append('ext', ext)
        formData.append('id', e.target.dataset.id)
        formData.append('refFileStorage', result.result.metadata.fullPath)

        const res:any = await axios.post(`${API_PATH}/qualified`, formData)

        if(res.status===200) {
          Notify.success('Archivo subido correctamente');
          button.innerHTML = 'subir';
          setJournal(res.data)
        }else{
          throw new Error('No se pudo subir el archivo, por favor intentelo mas tarde')
        }
      }else{
        throw new Error('No se pudo subir el archivo, por favor intentelo mas tarde')
      }
    }
    catch (error:any){
      Notify.failure(error.message);
      button.innerHTML = 'subir';
    }

  }
 const barChange = (e:any) => {
    const value = parseInt(e.target.value)
   // @ts-ignore
    setLevel(value)

 }

 const levelUpdate = async (e:any) => {
    e.preventDefault()
   const formData = new FormData()
   formData.append('level', e.target.dataset.level)
   formData.append('id', e.target.dataset.id)
   formData.append('journalId', e.target.dataset.journalid)
    try{
      const result = await axios.post(`${API_PATH}/level`, formData)
      if(result.status===200){
        console.log(result.data)
        Notify.success('Nivel actualizado');
      }else{
        throw new Error('No se pudo actualizar el nivel')
      }
    }catch (e:any) {
      Notify.failure(e.message);
    }
 }
  // @ts-ignore
  return (
    <section className="section Journal Journal-qualy padding">
      {
        // @ts-ignore
        journal && journal.map((item: any, index: number) => (
          <div key={index}>
            <h2>{item.user.name} {item.user.lastName}</h2>
            <p>Código: {item.user.codeMember?item.user.codeMember:'no existe código'}</p>
            <div className="range-slider" style={{marginBottom:'3em'}}>
              <span className="range-lavel range-slider__value">Nivel: </span>
              <input
                className="range-slider__range"
                type="range"
                value={level.toString()}
                min="0"
                max="5"
                step="1"
                onChange={barChange}
                ref={levelInput}
              />
              <span className="range-slider__value">{level}</span>
              <button className="range-lavel range-slider__value range-slider__button" data-id={item.user._id} data-level={level} data-journalid={item._id} onClick={levelUpdate}>Guardar</button>
            </div>
            <article className={'Journal__show'}>
              <div className="Journal__show-left">
                <p>Sin calificar</p>
                <div className="layer">
                {
                  item.ext === 'pdf' ? (
                      <embed src={`${item.urlFile}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} type="application/pdf" width="100%" height="600px" />
                    ):
                    (
                      <img src={item.urlFile} alt={item._id}/>
                    )
                }
                </div>
                <button className={'btn btn-dark btn-top'} data-download={`${item.urlFile}`} data-id={`${item.user.name}${item.user.lastName}-${item._id}`} onClick={download}>Descargar</button>

              </div>
              <div className="Journal__show-right">
                <p>Calificado</p>
                {
                  item.qualified
                    ? (
                      <>
                      <div className="layer">
                        {
                          item.journalQualifieldExt === 'pdf'
                          ? (
                             <embed src={`${item.journalQualifieldPath}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} type="application/pdf" width="100%" height="600px" />
                          ): (
                            <img src={item.journalQualifieldPath} alt={item._id}/>
                          )
                        }
                      </div>
                      <button className={'btn btn-dark btn-top'} data-id={`${item._id}`} data-ref={`${item.journalQualifieldRefFileStorage}`} onClick={destroy}>Borrar</button>
                      </>
                    )
                    : (
                      <form action="" onSubmit={upload} data-id={item._id}>
                        <div className="form-upload__group">
                          <label htmlFor="file" className="form-upload__label">
                            Archivo:
                          </label>
                          <input
                            type="file"
                            className="form-upload__input"
                            id="file"
                            name="file"
                          />
                        </div>
                        <button className={'btn btn-dark btn-small'}>Subir</button>
                      </form>
                    )
                }

              </div>
            </article>
          </div>
        ))
      }
    </section>
  )
}

export default JournalQualification1
