//@ts-nocheck
import React, {useEffect, useState} from "react";
import {useUserStore} from "../../store/user";
import {API_PATH} from "../../utils/apiPath";
import axios from "axios";
import {Link} from "react-router-dom";
import {uploadFile} from "../../utils/firebase";
import {Notify} from "notiflix/build/notiflix-notify-aio";

const JournalsUser = () => {
  const userStr = useUserStore(state => state.user)
  const [journals, setJournals] = useState(null)
  const [user, setUser] = useState(null)
  const [level, setLevel] = useState(0);
  const id = userStr._id;
  const fetchJournal = async () => {
    try {
      const journalFetch = await fetch(`${API_PATH}/journalforuser/${id}`)
      const journalRes = await journalFetch.json()
      const userFetch = await fetch(`${API_PATH}/user/${id}`)
      const userRes = await userFetch.json()

      console.log(journalRes.length)
      setJournals(journalRes)
      setUser(userRes[0])

      console.log(userRes[0])
      if(userRes[0].level) {
        setLevel(userRes[0].level)
      }
    } catch (error){
      console.log(error)
    }
  }

  useEffect(() => {

    if(!journals)fetchJournal()
  }, [journals])
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
        // console.log(result)
        formData.append('url', result.url)
        formData.append('ext', ext)
        formData.append('refFileStorage', result.result.metadata.fullPath)
        axios.post(`${API_PATH}/journal`, formData)
          .then(res => {
            fetchJournal()
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
  return (
    <section className="section Journal padding">
      <div className="range-slider" style={{marginBottom: '2.5em'}}>
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
      <article className={'form-container'} style={{marginBottom:'3em'}}>
        <form className="form-upload" onSubmit={submit} encType="">
          <input
            type="hidden"
            className="form-upload__input"
            id="userId"
            name="userId"
            value={id}
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
                value={user && `${user.name} ${user.lastName}`}
                onChange={e => setUser(e.target.value)}
              />
            </div>
            <div className="form-upload__group">
              <label htmlFor="file" className="form-upload__label">
                Jornal:
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
      {/*    <input*/}
      {/*      type="hidden"*/}
      {/*      className="form-upload__input"*/}
      {/*      id="userId"*/}
      {/*      name="userId"*/}
      {/*      value={user && user._id}*/}
      {/*      // onChange={inputChange}*/}
      {/*      readOnly*/}
      {/*      hidden={true}*/}
      {/*    />*/}
      {/*    <input*/}
      {/*      type="hidden"*/}
      {/*      className="form-upload__input"*/}
      {/*      value={level}*/}
      {/*      id="journalFase"*/}
      {/*      // onChange={inputChange}*/}
      {/*      name="journalFase"*/}
      {/*      hidden*/}
      {/*    />*/}
      {/*    <div className="form-upload__row">*/}
      {/*      <div className="form-upload__group">*/}
      {/*        <label htmlFor="name" className="form-upload__label">*/}
      {/*          Nombre:*/}
      {/*        </label>*/}
      {/*        <input*/}
      {/*          type="text"*/}
      {/*          className="form-upload__input"*/}
      {/*          id="name"*/}
      {/*          name="name"*/}
      {/*          value={user && user.name}*/}
      {/*          // onChange={inputChange}*/}
      {/*          readOnly*/}
      {/*        />*/}

      {/*      </div>*/}
      {/*      <div className="form-upload__group">*/}
      {/*        <label htmlFor="file" className="form-upload__label">*/}
      {/*          Archivo:*/}
      {/*        </label>*/}
      {/*        <input*/}
      {/*          type="file"*/}
      {/*          className="form-upload__input"*/}
      {/*          id="file"*/}
      {/*          name="file"*/}
      {/*        />*/}
      {/*      </div>*/}


      {/*    </div>*/}

      {/*    <button type="submit" className="btn btn-dark">*/}
      {/*      Enviar*/}
      {/*    </button>*/}
      {/*  </form>*/}
      {/*</article>*/}
      <article className={'journal-container'}>
        {
          journals &&
            journals.map((item: any, index: number) => (

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
export default JournalsUser
