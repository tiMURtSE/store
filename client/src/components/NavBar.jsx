import React from 'react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { Context } from '..';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'var(--light)'}} to={SHOP_ROUTE}>КупиДевайс</NavLink>

                {user.isAuth ? (
                    <Nav className="ml-auto" style={{color: 'var(--light)'}}>
                        <Button onClick={() => navigate(ADMIN_ROUTE)} variant={'outline-light'}>Админ. панель</Button>
                        <Button onClick={() => navigate(LOGIN_ROUTE)} variant={'outline-light'} className='ms-4'>Выйти</Button>
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