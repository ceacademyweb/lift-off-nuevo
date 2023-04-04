import {useEffect, useState} from "react";
import {API_PATH} from "../../utils/apiPath";
import {useParams} from "react-router-dom";
import {ObjectDelete, uploadFile} from "../../utils/firebase";
import axios from "axios";
import {Notify} from "notiflix/build/notiflix-notify-aio";

const JournalAdmin = () => {
  const {id} = useParams();
  const [journal, setJournal] = useState<any>(null)
  const [level, setLevel] = useState<any>(journal && journal.user.level)
  useEffect(() => {
    const getJournal = () => {
      fetch(`${API_PATH}/journal-get/${id}`)
        .then(response => response.json())
        .then(data => {
          const journalObj = {
            data: data.result[0],
            user: data.user

          }
          setLevel(data.user.level)
          setJournal(journalObj)
        })
    }

    // console.log(journal.user.level,'journal')
    // setLevel(journal.user.level)

    if(!journal) getJournal()
  }, [journal, level])

  const submit = async (e:any) => {
    e.preventDefault()
    const target = e.target
    const data = target.dataset
    const formData = new FormData(target)
    const button = e.target.querySelector('button');
    button.innerHTML = '<img src="/img/load.svg" alt="">';
    const file = target.file.files[0]
    console.log(file)
    const ext = file.name.split('.')[1];
    console.log(ext)
    try{
      const allowedExtensions = /(.jpg|.png|.pdf)$/i;
      if(!allowedExtensions.exec(file.name)){
        throw new Error('Solo se permiten archivos PDF, PNG, JPG o JPEG')
      }

      const result = await uploadFile(file)
      if (result.url) {
        console.log(result)
        formData.append('url', result.url)
        formData.append('ext', ext)
        formData.append('refFileStorage', result.result.metadata.fullPath)
        formData.append('journal', data.journal)
        formData.append('user', data.user)
        axios.post(`${API_PATH}/journal-admin`, formData)
          .then(res => {
            fetch(`${API_PATH}/journal-get/${id}`)
              .then(response => response.json())
              .then(data => {
                const journalObj = {
                  data: data.result[0],
                  user: data.user

                }
                setLevel(data.user.level)
                setJournal(journalObj)
                Notify.success('Archivo cargado con exito');
                button.innerHTML = 'enviar'
              })
          })

      }
    }catch (err){

    }
  }
  const download = (e:any) => {
    e.preventDefault()
    const target = e.target
    const data = target.dataset
    // console.log(data)
    fetch(`${e.target.dataset.download}`)
      .then(response => {
        response.blob()
          .then(blob => {
            let localURL = window.URL.createObjectURL(blob);
            let temporalAnchor = document.createElement('a');
            temporalAnchor.style.display = 'none';
            document.body.appendChild(temporalAnchor);
            temporalAnchor.href = localURL;
            temporalAnchor.download = e.target.dataset.name;
            temporalAnchor.click();
            window.URL.revokeObjectURL(localURL);
            document.body.removeChild(temporalAnchor);
          })
      })
  }
  const updateLevel = (e:any) => {
    const data = e.target.dataset
    const formData = new FormData()
    const button = e.target;
    button.innerHTML = '<img src="/img/load.svg" alt="">';
    formData.append('level', data.level)
    formData.append('id', data.id)
    axios.post(`${API_PATH}/level`, formData)
      .then(res => {
        console.log(res)
        fetch(`${API_PATH}/journal-get/${id}`)
          .then(response => response.json())
          .then(data => {
            const journalObj = {
              data: data.result[0],
              user: data.user

            }
            setLevel(data.user.level)
            setJournal(journalObj)
            Notify.success('Nivel actualizado con éxito');
            button.innerHTML = 'Guardar'
          })
      })

  }
  const destroy = async (e:any) => {
    const target = e.target
    const data = target.dataset
    console.log(data)
    try {
      const result = await axios.put(`${API_PATH}/qualified/${data.journal}`)
      console.log(result)
      if (result.status === 200){
        await ObjectDelete(data.storage)
        // setJournal(result.data)
        fetch(`${API_PATH}/journal-get/${id}`)
          .then(response => response.json())
          .then(data => {
            const journalObj = {
              data: data.result[0],
              user: data.user

            }
            setLevel(data.user.level)
            setJournal(journalObj)

            Notify.success('Archivo eliminado');
          })
      }else{

        throw new Error('Error al eliminar el archivo')
      }
    }catch (e:any) {
      Notify.failure(e.message);
    }
  }

  return (
    <section className="section Journal padding">
      {
        journal && (
          <>
            <p>Nombre: {journal.user.name} {journal.user.lastName}</p>
             <p>Código: {journal.user.codeMember}</p>
            <div className="range-slider" style={{marginBottom:'2em'}}>
              <span className="range-lavel range-slider__value">Nivel: </span>
              <input
                className="range-slider__range"
                type="range"
                value={level}
                min="0"
                max="5"
                step="1"
                onChange={(e) => setLevel(e.target.value)}
              />
              <span className="range-slider__value">{level}</span>
              <button className="range-lavel range-slider__value range-slider__button" data-id={journal.user._id} data-level={level} onClick={updateLevel} >Guardar</button>
            </div>
            <article className={'Journal__show'}>
              <div className="Journal__show-left">
                <p>Sin calificar</p>
                <div className="layer">
                  {
                    journal.data.ext === 'pdf' ? (
                        <embed src={`${journal.data.urlFile}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} type="application/pdf" width="100%" height="600px" />

                      ):
                      (
                        <img src={journal.data.urlFile} alt={journal.data._id}/>
                      )
                  }
                </div>
                <button className={'btn btn-dark'} style={{marginTop:'1em'}} data-download={`${journal.data.urlFile}`} data-name={`${journal.user.name}-${journal.user.lastName}-${journal.data._id}`} onClick={download}>Descargar</button>
              </div>
              <div className="Journal__show-right">
                <p>Calificado</p>

                {
                  journal.data.qualified
                    ? (
                      <>
                        <div className="layer">
                          {
                            journal.data.journalQualifieldExt === 'pdf'
                              ? (
                                <embed src={`${journal.data.journalQualifieldPath}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} type="application/pdf" width="100%" height="600px" />
                              ): (
                                <img src={journal.data.journalQualifieldPath} alt={journal.data._id}/>
                              )
                          }

                        </div>
                        <button className={'btn btn-dark'} style={{marginTop:'1em'}} data-user={journal.user._id} data-journal={journal.data._id} data-storage={journal.data.journalQualifieldRefFileStorage}  onClick={destroy}>Borrar</button>
                      </>
                    )
                    : (
                      <form action="" onSubmit={submit} data-journal={journal.data._id} data-user={journal.user._id}>
                        <label htmlFor="upload">Subir Journal Calificado</label>
                        <input type="file" id="upload" name="file" accept="image/x-png,image/jpeg,application/pdf"/>
                        <button type="submit" className={'btn btn-dark btn-small'}>subir</button>
                      </form>
                    )
                }
              </div>
            </article>
          </>
        )
      }
    </section>
  )
}

export default JournalAdmin
