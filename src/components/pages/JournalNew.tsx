import {useEffect, useRef, useState} from "react";
import {useUserStore} from "../../store/user";
import {API_PATH} from "../../utils/apiPath";
import {useJournalsStore} from "../../store/Journals";
import {uploadFile} from "../../utils/firebase";
// import {useJournalsStore} from "../../store/Journals";
import {Link} from "react-router-dom";
import {Notify} from "notiflix/build/notiflix-notify-aio";
import axios from "axios";

const JournalNew = () => {
  const user = useUserStore(state => state.user)
  const userID = user._id;
  const [journals, setJournals] = useState(null)
  const [level, setLevel] = useState(user.journalLevel? user.journalLevel : 0);
  const journalRef = useRef(null)
  const {JournalsStr, setJournalsStr} = useJournalsStore();
  const logoutJournalsStr = useJournalsStore(state => state.logoutJournalsStr);
  useEffect(() => {
    axios.get(`${API_PATH}/user-new/${userID}`)
      .then(res => {
        console.log(res.data)
        setJournalsStr(res.data)
      })
  }, [])

  const submit = async (e: any) => {
    e.preventDefault()
    //@ts-ignore
    const button = e.target.querySelector('button');
    button.innerHTML = '<img src="/img/load.svg" alt="">';
    const target = e.target
    // const button = target.querySelector('button')
    const formData = new FormData(target)
    try{
      const file = target.file.files[0]
      const allowedExtensions = /(.jpg|.png|.pdf)$/i;
      if(!allowedExtensions.exec(file.name)){
        throw new Error('Solo se permiten archivos PDF, PNG, JPG o JPEG')
      }
      const ext = !file.name.includes('.jpeg') ? file.type.split('/')[1]: 'jpg';
      const result = await uploadFile(file)
      if (result.url) {
        console.log(result.result.metadata.fullPath)
        formData.append('url', result.url)
        formData.append('ext', ext)
        formData.append('refFileStorage', result.result.metadata.fullPath)
        axios.post(`${API_PATH}/journal`, formData)
          .then(res => {
            let jour = JournalsStr
            jour.push(res.data)
            setJournalsStr(jour)
            Notify.success('Archivo cargado con exito');
            button.innerHTML = 'enviar'
          })
      }
    }
    catch (e) {
      Notify.failure('Solo se permiten archivos PDF, PNG O JPG');
      button.innerHTML = 'enviar'
    }
    // let jour = JournalsStr
    //@ts-ignore


  }

  // const submit = async (e: any) => {
  //   e.preventDefault()
  //   const formData = new FormData(e.target)
  //   formData.append('journal',JSON.stringify({ide: 123, name: 'test'}))
  //   const response =  await axios.post(`${API_PATH}/journal`, formData)
  //   console.log(response.data)
  // }
  return (
    <section className="section Journal padding">
      <h1 className="text-center">Journal</h1>
      <div className="range-slider">
        <span className="range-lavel range-slider__value">Nivel: </span>
        <input
          className="range-slider__range"
          type="range"
          value={level}
          min="0"
          max="5"
          step="1"
          readOnly={true}
        />
        <span className="range-slider__value">{level}</span>
      </div>
      <article className={'form-container'}>
        <form className="form-upload" onSubmit={submit} encType="">
          <input
            type="hidden"
            className="form-upload__input"
            id="userId"
            name="userId"
            value={user._id}
            // onChange={inputChange}
            readOnly
            hidden={true}
          />
          <input
            type="hidden"
            className="form-upload__input"
            value={level}
            id="journalFase"
            // onChange={inputChange}
            name="journalFase"
            hidden
          />
          <div className="form-upload__row">
            <div className="form-upload__group">
              <label htmlFor="name" className="form-upload__label">
                Nombre:
              </label>
              <input
                type="text"
                className="form-upload__input"
                id="name"
                name="name"
                value={`${user.name}`}
                // onChange={inputChange}
                readOnly
              />

            </div>
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


          </div>

          <button type="submit" className="btn btn-dark">
            Enviar
          </button>
        </form>
      </article>

      <article className={'journal-container'} ref={journalRef}>

        {
          // @ts-ignore
          JournalsStr && JournalsStr.map((item: any, index: number) => (
          <Link to={`/journal/${item._id}`} key={item._id}>
            <div className="journal-item" key={index}>
              {
                item.ext === 'pdf' ? (
                  <embed src={`${item.urlFile}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} type="application/pdf"/>
                ):
                (
                  <img src={item.urlFile} alt={item._id}/>
                )
              }
            </div>
          </Link>
          ))
        }
      </article>
    </section>
  )
}

export default JournalNew
