import api from "../../api/ceacademyApi";
import {useUserStore} from "../../store/user";
import {useJournalsStore} from "../../store/Journals";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Logo from "../molecules/Logo";
import Slider from "../organisms/Slider";
import {Notify} from "notiflix/build/notiflix-notify-aio";
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
});
const Login = () => {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()
  const setUserStore = useUserStore(state => state.setUser)
  const setToken= useUserStore(state => state.setToken)
  const setAdmin = useUserStore(state => state.setAdmin)
  const setJournals = useJournalsStore(state => state.setJournalsStr)
  // const [user, setUser] = useState({})
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e.target)
    //@ts-ignore
    const button = e.target.querySelector('button');
    button.innerHTML = '<img src="/img/load.svg" alt="">';
    const email = (e.currentTarget.elements[0] as HTMLInputElement).value
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value
    const {data} = await api.post('/login', {email, password})
    console.log(data)
    if (data.status >= 400 && data.status < 500) {
      // setMessage('Usuario o contraseña incorrectos')
      setStatus(true)
      button.innerHTML = 'Ingresar';

      Notify.failure('Usuario o contraseña incorrectos');
      // console.log(err);
      return
    }else if (data.status >= 500) {
      Notify.failure('Lo sentimos, ha ocurrido un error, por favor vuelva a intentarlo mas tarde');
      // setMessage('Lo sentimos, ha ocurrido un error, por favor vuelva a intentarlo mas tarde')
      setStatus(true)
      button.innerHTML = 'Ingresar';
      return
    }else{
      setUserStore(data.userData)
      setToken(data.token)
      setAdmin(data.userData.admin)
      navigate('/')
      // if(data.userData.admin){
      //   api.get('/journal')
      //     .then(({data}) => {
      //       const journals = data
      //       api.get('/users')
      //         .then(({data}) => {
      //           // const journalsArr:any = []
      //           // const users = data.result
      //           // journals.forEach((journal: any) => {
      //           //   // console.log(journal.userId)
      //           //   // users.map((user: any) => {console.log(user._id)})
      //           //   const userJournal = users.find((user: any) => user._id === journal.userId)
      //           //
      //           //   const obj = {journal, user: userJournal}
      //           //   journalsArr.push(obj)
      //           // })
      //           // setJournals(journalsArr)
      //           console.log(data,'login journals')
      //         })
      //     })
      // }
    }
  }
  useEffect(() => {
  }, [])
  return (
    <section className="login form-section">
      <div className="form-section__img">
        <div className="img-logo">
          <Logo />
          <Slider />
        </div>
        <img
          src="/img/login-bg.jpg"
          className="img-fondo"
          alt="fondo registro"
        />
      </div>
      <div className="form-section__container">
        <div className="form-section__header">
          <a className="form-section__logo1" href="/">
            <img src="/img/logo.svg" alt="" />
            {/*<Slider />*/}
          </a>
        </div>
        <h1>Inicia Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electónico:</label>
            <input type="email" id='email' required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id='password' required/>
          </div>
          <button>
            Ingresar
          </button>
          {
            status ?
              <p>{message}</p>
              : null
          }
        </form>
      </div>
    </section>
  )
}

export default Login
