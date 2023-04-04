import {useEffect, useState} from "react";
import api from "../../api/ceacademyApi";
import {Link} from "react-router-dom";
import axios from "axios";
import {API_PATH} from "../../utils/apiPath";
const data = async () => {
  // return await axios.get('https://ceacademy-auth-production.up.railway.app/journal')
  return await axios.get('http://localhost:5000/journal')
}

const Rating = () => {
  const [journals, setJournals] = useState(null)
  useEffect(() => {
    (async ()=> {
      console.log(`${API_PATH}/journals/`)
      const journalFetch = await fetch(`${API_PATH}/journals/`)
      const journalRes = await journalFetch.json()
      console.log(journalRes)
      setJournals(journalRes)
    })()
  }, [])

  return (
    <section className="Rating">
      <h1>Journals</h1>
      <h2>Sin Calificar</h2>
      <article className={'Rating__container'}>
        {
          // JSON.stringify(journals)
          // @ts-ignore
          journals && journals.map((item: any, index: number) => (
            <>
              {
                !item.qualified
                ? (
                    <Link to={`/admin/calificacion/${item._id}`} key={item._id}>
                      {/*<p>{item.user.name} {item.user.lastName}</p>*/}
                      {/*<p>Código: {item.user.codeMember?item.user.codeMember:'no existe código'}</p>*/}
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
                  )
                : null
              }
            </>

          ))
        }
      </article>
      <h2>Calificados</h2>
      <article className={'Rating__container'}>
        {
          // JSON.stringify(journals)
          // @ts-ignore
          journals && journals.map((item: any, index: number) => (
            <>
              {
                item.qualified
                ? (
                    <Link to={`/admin/calificacion/${item._id}`} key={item._id}>
                      {/*<p>{item.user.name} {item.user.lastName}</p>*/}
                      {/*<p>Código: {item.user.codeMember?item.user.codeMember:'no existe código'}</p>*/}
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
                  )
                : null
              }
            </>

          ))
        }
      </article>
    </section>

  )
}

export default Rating
