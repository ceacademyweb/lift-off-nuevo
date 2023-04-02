import {useJournalsStore} from "../../store/Journals";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const JournalId = () => {
  const id= useParams()
  const {JournalsStr, setJournalsStr} = useJournalsStore();
  const jou = JournalsStr?.find((journal:any)=>journal.journal._id===id.id)
  console.log(jou)
  useEffect(() => {
  }, [])

  const download = (e:any) => {
    console.log('click')
    // axios.get(`${e.target.dataset.download}`)
    //   .then(({data}) => {console.log(data)})
  console.log(e.target.dataset)
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

  const upload = (e:any) => {}
  return (
    <section className="section Rating JournalId">
      {/*{JSON.stringify(juornal.journal.imagePath)}*/}
      <h2>Nombre: {jou.user.name} {jou.user.lastName}</h2>
      <p>Code: {jou.user.codeMember}</p>

      <article className={'JournalId__container'}>
        <div className="JournalId__user">
          {
            jou.journal.ext==='pdf'
              ? (
                <embed src={`${jou.journal.imagePath}`}/>
              )
              : (
                <img src={`${jou.journal.imagePath}`} alt=""/>
              )
          }
          <button style={{display:"block"}} data-download={`${jou.journal.imagePath}`} data-id={`${jou.user.name}${jou.user.lastName}_${jou.user.codeMember}-${jou.journal._id}`} onClick={download}>Descargar</button>
        </div>
        <div className="JournalId__qualified">
          {
            jou.journal.qualified?
              (
                <p>journal qualified</p>
              ):
              (
                <form action="" onSubmit={upload}>
                  <label htmlFor="file">Subir archivo Calificado</label>
                  <input type='text' value={jou.user._id} name='journalId'/>
                  <input type='text' value={jou.journal._id} name='userId'/>
                  <input type="file" name="file" id="file"/>
                </form>
              )
          }
        </div>
      </article>
    </section>
  )
}

export default JournalId
