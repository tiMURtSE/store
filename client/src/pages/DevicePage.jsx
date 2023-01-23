import React from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import bigStar from '../assets/bigStar.png';

const DevicePage = () => {
    const device = {id: 1, name: 'iPhone 12 pro', price: 25000, rating: 5, img: 'https://www.purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png'};

    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    <Image src={device.img} width={300} height={300}></Image>
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
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>

            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>

                {/* {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )} */}
            </Row>
        </Container>
    );
};

export default DevicePage;