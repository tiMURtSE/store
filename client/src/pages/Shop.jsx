import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Col, Container, Row } from 'react-bootstrap';

import BrandBar from '../components/BrandBar';
import TypeBar from '../components/TypeBar';
import DeviceList from '../components/DeviceList';
import Pages from '../components/Pages';
import { Context } from '..';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';

const Shop = observer(() => {
    const { deviceStore } = useContext(Context);
    
    useEffect(() => {
        fetchTypes()
            .then(data => deviceStore.setTypes(data))
        
        fetchBrands()
            .then(data => deviceStore.setBrands(data))
    }, []);

    useEffect(() => {
        fetchDevices(deviceStore.selectedBrand.id, deviceStore.selectedType.id, deviceStore.limit, deviceStore.selectedPage)
            .then(data => {
                deviceStore.setDevices(data.rows);
                deviceStore.setTotalCount(data.count);
                console.log(data);
            })
    }, [deviceStore.selectedBrand, deviceStore.selectedType, deviceStore.selectedPage]);

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList />
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;