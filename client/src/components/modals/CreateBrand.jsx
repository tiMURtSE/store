import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const CreateBrand = ({ show, onHide }) => {
    return (
        <Modal
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Введите название бренда"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} variant="outline-danger">Закрыть</Button>
                <Button variant="outline-success">Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;