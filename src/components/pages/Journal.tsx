
import {useEffect, useRef, useState} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import {API_PATH} from "../../utils/apiPath";


const Journal = () => {
  const {id} = useParams();
  const [journal, setJournal] = useState(null)

  useEffect(() => {
    (async ()=> {
      console.log(`${API_PATH}/journal/${id}`)
      const journalFetch = await fetch(`${API_PATH}/journalforuser/${id}`)
      const journalRes = await journalFetch.json()
      console.log(journalRes)
      setJournal(journalRes)
    })()

  }, [])


  return(
    <section className="section Journal padding">
      {
        // @ts-ignore
        journal && journal.map((item: any, index: number) => (
          <div key={index}>
            <h2>{item.user.name} {item.user.lastName}</h2>
            <p> Código: {item.user.codeMember}</p>
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

              </div>
              <div className="Journal__show-right">
                <p>Calificado</p>

                {
                  item.qualified
                    ? (
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
                    )
                    : (
                      <p>En espera de Calificacion</p>
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

export default Journal
