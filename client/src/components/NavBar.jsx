import React from 'react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { Context } from '..';
import { NavLink } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';

const NavBar = observer(() => {
    const { user } = useContext(Context);

    console.log('NavBar render')
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'var(--light)'}} to={SHOP_ROUTE}>КупиДевайс</NavLink>

                {user.isAuth ? (
                    <Nav className="ml-auto" style={{color: 'var(--light)'}}>
                        <Button variant={'outline-light'}>Админ. панель</Button>
                        <Button variant={'outline-light'} className='ml-4'>Войти</Button>
                    </Nav>
                ) : (
                    <Nav className="ml-auto" style={{color: 'var(--light)'}}>
                        <Button onClick={() => user.setIsAuth(true)} variant={'outline-light'}>Авторизация</Button>
                    </Nav>
                )}
            </Container>
      </Navbar>
    );
});

export default NavBar;