import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Form, Button, Dropdown, Row, Col } from 'react-bootstrap';

import { Context } from '../..';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';

const CreateDevice = observer(({ show, onHide }) => {
    const { deviceStore } = useContext(Context);
    const [characteristics, setCharacteristics] = useState([]);
    const [deviceName, setDeviceName] = useState('');
    const [devicePrice, setDevicePrice] = useState(0);
    const [deviceImageFile, setDeviceImageFile] = useState(null);

    const addCharacteristics = () => {
        setCharacteristics([...characteristics, {name: '', description: '', number: Date.now()}]);
    };
    const removeCharacteristics = (number) => {
        setCharacteristics(characteristics.filter(element => element.number !== number));
    };

    const selectDeviceImageFile = (event) => {
        const file = event.target.files[0];

        setDeviceImageFile(file);
    };
    const setCharacteristicsDescription = (key, value, number) => {
        const result = characteristics.map(element => {
            if (element.number === number) {
                return {...element, [key]: value};
            } else {
                return element;
            }
        });

        setCharacteristics(result);
    };

    const addNewDevice = () => {
        const newDevice = new FormData();

        newDevice.append('typeId', deviceStore.selectedType.id);
        newDevice.append('brandId', deviceStore.selectedBrand.id);
        newDevice.append('name', deviceName);
        newDevice.append('price', `${devicePrice}`);
        newDevice.append('info', JSON.stringify(characteristics));
        newDevice.append('img', deviceImageFile);

        createDevice(newDevice)
            .then(data => onHide());
    };

    useEffect(() => {
        fetchTypes()
            .then(data => deviceStore.setTypes(data))
        
        fetchBrands()
            .then(data => deviceStore.setBrands(data))
    }, []);

    return (
        <Modal
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить девайс
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2">
                        <Dropdown.Toggle>{deviceStore.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {deviceStore.types.map(type => 
                                <Dropdown.Item onClick={() => deviceStore.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2">
                        <Dropdown.Toggle>{deviceStore.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {deviceStore.brands.map(brand => 
                                <Dropdown.Item onClick={() => deviceStore.setSelectedBrand(brand)} key={brand.id}>{brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={deviceName}
                        onChange={event => setDeviceName(event.target.value)}
                        className='mt-3'
                        placeholder='Введите название устройства'
                    />
                    <Form.Control
                        value={devicePrice}
                        onChange={event => setDevicePrice(Number(event.target.value))}
                        className='mt-3'
                        placeholder='Введите цену устройства'
                        type='number'
                    />
                    <Form.Control
                        className='mt-3'
                        type='file'
                        onChange={selectDeviceImageFile}
                        
                    />
                    <hr/>
                    <Button
                        onClick={() => addCharacteristics()}
                    >
                        Добавить новое свойство
                    </Button>
                    {characteristics.map(i => 
                        <Row key={i.number} className='mt-4'>
                            <Col md={4}>
                                <Form.Control
                                    value={i.name}
                                    onChange={(event) => setCharacteristicsDescription('name', event.target.value, i.number)}
                                    placeholder='Введите название свойства'
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(event) => setCharacteristicsDescription('description', event.target.value, i.number)}
                                    placeholder='Введите описание свойства'
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant={'outline-danger'}
                                    onClick={() => removeCharacteristics(i.number)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={addNewDevice} variant="outline-success">Добавить</Button>
                <Button onClick={onHide} variant="outline-danger">Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;