import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '..';
import bigStar from '../assets/bigStar.png';
import { addDeviceInBasket, fetchUserBasket } from '../http/basketAPI';
import { fetchBasket, fetchOneDevice } from '../http/deviceAPI';
import { checkAuth } from '../http/userAPI';
import { BASKET_ROUTE } from '../utils/consts';

const DevicePage = observer(() => {
    const { userStore, deviceStore } = useContext(Context);
    const [device, setDevice] = useState({info: []});
    const [isDeviceInBasket, setIsDeviceInBasket] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchOneDevice(id)
            .then(data => setDevice(data))
    }, []);

    useEffect(() => {
        getBasket();
    }, [device])

    const getBasket = async () => {
        const basket = await fetchUserBasket(userStore.user.id);
        setIsDeviceInBasket(basket.info.some(currDevice => currDevice.deviceId === device.id))
    };

    const addToCart = async () => {
        const { basketId } = await checkAuth();
        const deviceId = device.id;
        addDeviceInBasket(basketId, deviceId)
            .then(data => alert('Товар добавлен в корзину!'))
            .then(data => getBasket())
    }

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
                        
                        {isDeviceInBasket ? (
                            <Button 
                                onClick={() => navigate(BASKET_ROUTE)}
                                variant={"outline-dark"}
                            >
                                В корзину
                            </Button>
                        ) : (
                            <Button 
                                onClick={addToCart}
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