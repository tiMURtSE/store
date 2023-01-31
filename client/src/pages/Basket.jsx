import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { checkAuth } from '../http/userAPI';
import { fetchUserBasket } from '../http/basketAPI';

const Basket = () => {

    useEffect(() => {
        checkAuth().then(data => {
            fetchUserBasket(data.id).then(data => console.log(data))
            console.log(data)
        })
    });

    return (
        <Row>

        </Row>
    );
};

export default Basket;