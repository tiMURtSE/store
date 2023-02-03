import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { Context } from '..';
import { addDeviceInBasket, fetchDeviceInBasket, fetchUserBasket } from '../http/basketAPI';
import { fetchOneDevice } from '../http/deviceAPI';
import { BASKET_ROUTE } from '../utils/consts';
import bigStar from '../assets/bigStar.png';

const DevicePage = observer(() => {
    const { userStore } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();
    const [device, setDevice] = useState({info: []});
    const [isDeviceInBasket, setIsDeviceInBasket] = useState(false);

    const fetchAndSetOneDevice = async () => {
        try {
            const device = await fetchOneDevice(id);

            setDevice(device);
        } catch (error) {
            console.log(error.message)
        }
    };

    const clickAddToCartButton = async () => {
        const { basketId } = userStore.user;
        const deviceId = device.id;

        if (!basketId || !deviceId) {
            alert('Войдите в аккаунт для добавления товара в корзину!');
            return;
        }

        addToCart(basketId, deviceId);
    };

    const addToCart = async (basketId, deviceId) => {
        try {
            const response = await addDeviceInBasket(basketId, deviceId);

            alert('Товар добавлен в корзину!');
        } catch (error) {
            console.log(error.message)
        }
    };

    const checkForDeviceInBasket = async () => {
        try {
            const basketId = userStore.user.basketId;
            const deviceId = device.id;

            if (!basketId || !deviceId) return;

            const deviceInBasket = await fetchDeviceInBasket(basketId, deviceId);

            setIsDeviceInBasket(Boolean(deviceInBasket.id));
        } catch (error) {
            console.log('error', error.message);
        }
    };

    useEffect(() => {
        fetchAndSetOneDevice();
    }, []);

    useEffect(() => {
        checkForDeviceInBasket();
    }, [device]);

    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    <Image src={process.env.REACT_APP_API_URL + device.img} width={300} height={300}></Image>
                </Col>

                <Col md={4}>
                    <Form>
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width:240, height: 240, backgroundSize: 'cover', fontSize: 64}}
                        >
                            {device.rating}
                        </div>
                    </Form>
                </Col>

                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>От: {device.price} руб.</h3>
                        
                        {(isDeviceInBasket && userStore.user.id) ? (
                            <Button 
                                onClick={() => navigate(BASKET_ROUTE)}
                                variant={"outline-dark"}
                            >
                                В корзину
                            </Button>
                        ) : (
                            <Button 
                                onClick={clickAddToCartButton}
                                variant={"outline-dark"}
                            >
                                Добавить в корзину
                            </Button>
                        )}
                    </Card>
                </Col>
            </Row>

            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>

                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.name}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
});

export default DevicePage;