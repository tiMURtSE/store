import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Row } from 'react-bootstrap';

import { Context } from "../index";
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
    const { deviceStore } = useContext(Context);

    const getBrandName = (brandId) => {
        const brands = deviceStore.brands;

        for (let brand of brands) {
            if (brandId === brand.id) {
                return brand.name;
            }
        }
    };
    
    return (
        <Row className='d-flex'>
            {deviceStore.devices.map(device =>
                <DeviceItem key={device.id} device={device} brandName={getBrandName(device.brandId)}/>
            )}
        </Row>
    );
});

export default DeviceList;