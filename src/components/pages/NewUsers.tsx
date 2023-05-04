import {useEffect, useState} from "react";
import {API_PATH} from "../../utils/apiPath";

const NewUsers = () => {

  const [users, setUsers] = useState(null)
  const getUsers = async () => {
    const dataFetch = await fetch(`${API_PATH}/admin/users/nuevos`)
    const data  = await dataFetch.json()
    setUsers(data.result)
    return(data)
  }
  useEffect (() => {
    if (!users) {
      getUsers()
    }
  },[users])

  const activeUser = async (e:any) => {
    const target = e.target
    const id = target.dataset.id
    try {
      const result = await fetch(`${API_PATH}/admin/auth/${id}`)
      setUsers(null)
      console.log(result)
    }catch (e) {
      console.log(e)
    }
  }
  return (
    <section className="section NewUsers padding">
      <h1>New Users</h1>
      <article className={'NewUsers__container'}>
        <table className={'table-fill'}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Código</th>
              <th>Activar</th>
            </tr>
          </thead>
          <tbody>
          {
            //@ts-ignore
            users && users.map((item: any, index: number) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.codeMember}</td>
                <td><button data-id={item._id} onClick={activeUser}>Activar</button></td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </article>
    </section>
  )
}

export default NewUsers
