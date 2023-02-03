import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Col, Container, Row } from 'react-bootstrap';

import BrandBar from '../components/BrandBar';
import TypeBar from '../components/TypeBar';
import DeviceList from '../components/DeviceList';
import Pages from '../components/Pages';
import { Context } from '..';
import { fetchAllBrands, fetchAllDevices, fetchAllTypes } from '../http/deviceAPI';

const Shop = observer(() => {
    const { deviceStore } = useContext(Context);

    const fetchAndSetAllTypes = async () => {
        const types = await fetchAllTypes();

        deviceStore.setTypes(types);
    };
    
    const fetchAndSetAllBrands = async () => {
        const brands = await fetchAllBrands();

        deviceStore.setBrands(brands);
    };

    const fetchAndSetAllDevices = async () => {
        const { rows: devices, count: totalNumberOfDevices} = await fetchAllDevices();

        deviceStore.setDevices(devices);
        deviceStore.setTotalNumberOfDevices(totalNumberOfDevices);
    };

    useEffect(() => {
        try {
            fetchAndSetAllTypes();
            fetchAndSetAllBrands();
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    useEffect(() => {
        try {
            fetchAndSetAllDevices()
        } catch (error) {
            console.log(error.message)
        }
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