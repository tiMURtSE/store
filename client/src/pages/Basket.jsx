import React, { useEffect, useState, useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import DeviceItem from '../components/DeviceItem';
import { getUserData } from '../http/userAPI';
import { fetchUserBasket, fetchDevicesForBasket } from '../http/basketAPI';
import { fetchAllBrands, fetchDevices, fetchOneDevice } from '../http/deviceAPI';
import { Context } from '..';

const Basket = observer(() => {
    const { userStore, deviceStore } = useContext(Context);
    const [userBasket, setUserBasket] = useState([])

    const fetchAndSetUserBasket = async () => {
        try {
            const userId = userStore.user.id;
            const { info } = await fetchUserBasket(userId);
            const userDevicesId = info.map(device => device.deviceId);
            const { rows: devices } = await fetchDevicesForBasket(userDevicesId);

            setUserBasket(devices);
        } catch (error) {
            console.log(error.message)
        }
    };

    const getBrandName = (brandId) => {
        const brands = deviceStore.brands;

        for (let brand of brands) {
            if (brandId === brand.id) {
                return brand.name;
            }
        }
    };

    useEffect(() => {
        fetchAndSetUserBasket();
    }, []);

    return (
        <Container>
            <Row className='d-flex'>
                {userBasket.map(device =>
                    <DeviceItem key={device.id} device={device} brandName={getBrandName(device.brandId)} fetchAndSetUserBasket={fetchAndSetUserBasket}/>
                )} 
            </Row>
        </Container>
    );
});

export default Basket;