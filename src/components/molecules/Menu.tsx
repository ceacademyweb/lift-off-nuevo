// @ts-nocheck

import menu from '../../utils/menu';
import { NavLink } from 'react-router-dom';
import {useUserStore} from "../../store/user";
import {useState} from "react";

const Menu = ({ active, action }) => {
  const isAdmin = useUserStore(state => state.isAdmin)
  const isSuper = useUserStore(state => state.isSuper)
  const user = useUserStore(state => state.user)
  const [superUser, setSuperUser] = useState(user.isSuper)
  return (
    <ul className={`main-menu ${active ? 'is-active' : ''}`}>
      {menu.map((item) => (
        <li key={item.title} className="main-menu__item">
          {item.title !== 'Lift-off' && item.title !== 'TRADEPLOY' ? (
            <NavLink
              onClick={action}
              className={'main-menu__link'}
              to={item.link}
            >
              {item.title}
            </NavLink>
          ) : (
            <a onClick={action} className={'main-menu__link'} href={item.link}>
              {item.title}
            </a>
          )}
        </li>
      ))}
      {
        isAdmin ? (
          <li className="main-menu__item">
            <NavLink onClick={action}
                     className={'main-menu__link'}
                     to={'/admin/calificacion'}>
              Calificación

            </NavLink>
          </li>
        ):null

      }
      {
        superUser ? (
          <li className="main-menu__item">
            <NavLink onClick={action}
                     className={'main-menu__link'}
                     to={'/super/nuevos'}>
              Nuevos

            </NavLink>
          </li>
        ):null

      }
    </ul>
  );
};

export default Menu;
