import React from 'react';
import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { createType } from '../../http/deviceAPI';

const CreateType = ({ show, onHide }) => {
    const [typeName, setTypeName] = useState('');
    
    const addType = () => {
        createType({name: typeName})
        setTypeName('');
        onHide();
    };

    return (
        <Modal
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Control
                        value={typeName}
                        onChange={(event) => setTypeName(event.target.value)}
                        placeholder={"Введите название типа"}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    onClick={addType}
                    variant="outline-success"
                >
                    Добавить
                </Button>
                
                <Button
                    onClick={onHide}
                    variant="outline-danger"
                >
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;