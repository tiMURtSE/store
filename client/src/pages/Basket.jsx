import React, { useEffect, useState, useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import DeviceItem from '../components/DeviceItem';
import { getUserData } from '../http/userAPI';
import { fetchUserBasket } from '../http/basketAPI';
import { fetchAllBrands, fetchDevices, fetchOneDevice } from '../http/deviceAPI';
import { Context } from '..';

const Basket = observer(() => {
    const { userStore, deviceStore } = useContext(Context);
    const [userBasket, setUserBasket] = useState([]);

    const fetchAndSetUserBasket = async () => {
        try {
            console.log('asd')
            const userId = userStore.user.id;
            const userBasket = await fetchUserBasket(userId);

            setUserBasket(userBasket.info);
        } catch (error) {
            console.log(error.message)
        }
    };

    useEffect(() => {
        fetchAndSetUserBasket();
    }, []);

    console.log(123)









    // const getBasket = async () => {
    //     const user = await getUserData();
    //     const { info: devicesInBasket} = await fetchUserBasket(user.id);
    //     const devicesId = devicesInBasket.map(device => device.deviceId);
    //     const devices = await fetchAllBasket(devicesId);

    //     deviceStore.setDevicesInUserBasket(devices.rows);
    // };

    // // неправильно сделано
    const getBrandName = (brandId) => {
        const brands = deviceStore.brands;

        for (let brand of brands) {
            if (brandId === brand.id) {
                return brand.name;
            }
        }
    };

    // useEffect(() => {
    //     getBasket();
    //     fetchAllBrands()
    //         .then(data => deviceStore.setBrands(data))
    // }, []);

    return (
        <Container>
            <Row className='d-flex'>
                {userBasket.map(device =>
                    <DeviceItem key={device.id} device={device} brandName={getBrandName(device.brandId)}/>
                )} 
            </Row>
        </Container>
    );
});

export default Basket;