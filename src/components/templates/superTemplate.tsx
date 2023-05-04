import {Outlet, useNavigate} from "react-router-dom";
import {useUserStore} from "../../store/user";
import {useEffect, useState} from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import {isMobile} from "react-device-detect";

const SuperTemplate = () => {
  const isAuth = useUserStore(state => state.isAuth)
  const user = useUserStore(state => state.user)
  const isAdmin = useUserStore(state => state.isAdmin)
  const [superUser, setSuperUser] = useState(user.isSuper)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuth) navigate('/login')
    if (!isAdmin) navigate('/')
    if (!superUser) navigate('/')
    if (isMobile){
      document.body.classList.add('mobile')
    }else{
      document.body.classList.remove('mobile')
    }
  }, [])
  return(
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default SuperTemplate
