import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from './favicon.ico';
import avatar from './defAvaCir.png';
import s from './header.module.css';
import Container from '../Container/Container';

export default function Header() {
  return (
    <header className={s.header}>
      <Container className="Container">
        <div className={s.wrapper}>
          <Link className={s.logo} to="/">
            <img src={logo} alt="logo" className={s.logo} />
          </Link>

          <nav className={s.nav}>
            <NavLink
              exact
              to="/"
              className={s.link}
              activeClassName={s.activLink}
            >
              Популярные
            </NavLink>
            <NavLink
              to="/movies"
              className={s.link}
              activeClassName={s.activLink}
            >
              Найти
            </NavLink>
          </nav>

          <div className={s.auth}>
            <img width="40px" src={avatar} alt="avatar" className={s.avatar} />
            <button type="button" className={`${s.btn}  ${s.btnEnter} `}>
              Войти
            </button>
            <button type="button" className={`${s.btn}  ${s.btnReg} `}>
              Регистрация
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
