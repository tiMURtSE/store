import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Col, Card, Image, Button } from 'react-bootstrap';

import star from '../assets/star.png';
import { BASKET_ROUTE, DEVICE_ROUTE } from '../utils/consts';
import { removeDeviceFromBasket } from '../http/basketAPI';
import { getUserData } from '../http/userAPI';
import { Context } from '..';

const DeviceItem = ({ device, brandName }) => {
    const { deviceStore } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const devicesInUserBasket = deviceStore.devicesInUserBasket;

    const removeDevice = async () => {
        try {
            const { basketId } = await getUserData();
            const removedDevice = await removeDeviceFromBasket(device.id, basketId);

            const updatedDevices = devicesInUserBasket.filter(currDevice => currDevice.id !== device.id);
            console.log(updatedDevices)
            deviceStore.setDevicesInUserBasket(updatedDevices);
            alert("Товар убран из корзины!");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Col 
            md={3} 
            className={'mt-3'} 
        >
            <Card 
                style={{width: 165, cursor: 'pointer'}} 
                onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
                border={'light'}
            >
                <Image 
                    src={process.env.REACT_APP_API_URL + device.img} 
                    width={165} 
                    height={165} 
                />

                <div className='mt-1 d-flex justify-content-between align-items-center'>
                    <div className='text-black-50'>{brandName}</div>

                    <div className='d-flex align-items-center'>
                        <div>{device.rating}</div>
                        <Image src={star}></Image>
                    </div>
                </div>

                <div>{device.name}</div>
            </Card>

            {
                (location.pathname === BASKET_ROUTE) && (
                    <Button 
                        className='mt-3'
                        onClick={removeDevice}
                        variant='danger'
                    >
                        Убрать из корзины
                    </Button>
                )
            }
        </Col>
    );
};

export default DeviceItem;