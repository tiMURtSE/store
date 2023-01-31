import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Card, Image } from 'react-bootstrap';

import star from '../assets/star.png';
import { DEVICE_ROUTE } from '../utils/consts';

const DeviceItem = ({ device, brandName }) => {
    const navigate  = useNavigate();

    return (
        <Col 
            md={3} 
            className={'mt-3'} 
            onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
        >
            <Card 
                style={{width: 150, cursor: 'pointer'}} 
                border={'light'}
            >
                <Image 
                    src={process.env.REACT_APP_API_URL + device.img} 
                    width={150} 
                    height={150} 
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
        </Col>
    );
};

export default DeviceItem;