import {useUserStore} from "../../store/user";
import {Link, useNavigate} from "react-router-dom";
import {useFasesStore} from "../../store/VideosFases";
import {useVideosStore} from "../../store/videos";
import logo from '/img/logo.svg';
import {useState} from "react";
import Hamburger from "../molecules/Hamburger";
import Menu from "../molecules/Menu";
import {useJournalsStore} from "../../store/Journals";
const Header = () => {
  const logout = useUserStore(state => state.logout)
  const logoutFases = useFasesStore(state => state.logoutFases)
  const logoutVidStr = useVideosStore(state => state.logoutVidStr)
  const logoutJournalsStr = useJournalsStore(state => state.logoutJournalsStr);
  const user = useUserStore(state => state.user)
  const navigate = useNavigate()
  const [active, setActive] = useState(false);
  const ToggleMenuFunction = () => {
    !active ? setActive(true) : setActive(false);
  };
  return(

    <header className="Header">
      <div className="Header__top">
        <Link to={'/'} className="Header__logo">
          <img src={logo} alt="Logotipo" />
        </Link>
        <nav className="main-nav">
          <Hamburger active={active} action={ToggleMenuFunction} />
          <Menu active={active} action={ToggleMenuFunction} />
        </nav>
      </div>
      <p className={'user-container'}>Bienvenido: {user.name}
        <i
          style={{ opacity: '0.8', marginLeft: '.5em', cursor: 'pointer' }}
          title="Cerrar Sesión"
          className="fa-solid fa-right-from-bracket"
          onClick={() => {
            logout()
            logoutFases('vid')
            logoutVidStr('vid')
            logoutJournalsStr(null)
            navigate('/login')
          }}
        ></i>
      </p>
    </header>
  );
};
export default Header;
