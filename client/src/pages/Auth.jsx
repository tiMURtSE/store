import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Card, Button, Row } from "react-bootstrap";

import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from '../http/userAPI';
import { Context } from '..';
import { setAndDecodeToken } from '../utils/usefulFunctions';

const Auth = observer(() => {
    const { userStore } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogInPageOpen = (location.pathname === LOGIN_ROUTE);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitUserCredentials = async () => {
        try {
            let data;

            if (isLogInPageOpen) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }

            const user = setAndDecodeToken(data.token);

            userStore.setIsUserAuthorized(true);
            userStore.setUser(user);
            navigate(SHOP_ROUTE);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogInPageOpen ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between align-items-center mt-3 ps-3 pe-3">
                        {isLogInPageOpen ?
                            <div style={{width: 'auto'}}>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div style={{width: 'auto'}}>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button
                            style={{width: 'auto'}}
                            variant={"outline-success"}
                            onClick={submitUserCredentials}
                        >
                            {isLogInPageOpen ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;