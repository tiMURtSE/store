import React from 'react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../..';
import Button from '../ui/button/Button';
import classes from './NavBar.module.css';

const NavBar = observer(() => {
    const { user } = useContext(Context);

    return (
        <header className='header'>
            <div className="container">
                <nav className={classes.nav}>
                    <div>КупиДевайс</div>

                    {(user.isAuth) ? (
                        <ul className={classes.nav__list}>
                            <li><Button>Админ. панель</Button></li>
                            <li><Button>Войти</Button></li>
                        </ul>
                    ) : (
                        <ul className={classes.nav__list}>
                            <li><Button onClick={() => user.setIsAuth(true)}>Авторизация</Button></li>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
        
    );
});

export default NavBar;