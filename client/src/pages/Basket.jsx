import React, { useEffect, useState, useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import DeviceItem from '../components/DeviceItem';
import { checkAuth } from '../http/userAPI';
import { fetchUserBasket } from '../http/basketAPI';
import { fetchBasket, fetchBrands, fetchDevices, fetchOneDevice } from '../http/deviceAPI';
import { Context } from '..';

const Basket = observer(() => {
    const { deviceStore } = useContext(Context);
    const devicesInUserBasket = deviceStore.devicesInUserBasket;

    const getBasket = async () => {
        const user = await checkAuth();
        const { info: devicesInBasket} = await fetchUserBasket(user.id);
        const devicesId = devicesInBasket.map(device => device.deviceId);
        const devices = await fetchBasket(devicesId);

        deviceStore.setDevicesInUserBasket(devices.rows);
    };

    // неправильно сделано
    const getBrandName = (brandId) => {
        const brands = deviceStore.brands;

        for (let brand of brands) {
            if (brandId === brand.id) {
                return brand.name;
            }
        }
    };

    useEffect(() => {
        getBasket();
        fetchBrands()
            .then(data => deviceStore.setBrands(data))
    }, []);

    return (
        <Container>
            <Row className='d-flex'>
                {devicesInUserBasket.map(device =>
                    <DeviceItem key={device.id} device={device} brandName={getBrandName(device.brandId)}/>
                )} 
            </Row>
        </Container>
    );
});

export default Basket;