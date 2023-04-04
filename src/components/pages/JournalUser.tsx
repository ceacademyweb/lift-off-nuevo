import {useEffect, useState} from "react";
import {API_PATH} from "../../utils/apiPath";
import {useParams} from "react-router-dom";
import videojs from "video.js";
import any = videojs.any;

const JournalUser = () => {
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
  return (
    <section className="section Journal padding">
      {
        journal && (
          <>
            <p>Nombre: {journal.user.name} {journal.user.lastName}</p>
             <p>Código: {journal.user.codeMember}</p>
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

              </div>
              <div className="Journal__show-right">
                <p>Calificado</p>

                {
                  journal.data.qualified
                    ? (
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
                    )
                    : (
                      <p>En espera de Calificacion</p>
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

export default JournalUser
