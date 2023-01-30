import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Form } from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
        <Form className="d-flex flex-wrap align-items-center">
            {device.brands.map(brand =>
                <Card
                    style={{cursor:'pointer'}}
                    key={brand.id}
                    className="p-3"
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>
            )}

            {
                (device.selectedBrand.id) && (
                    <Card
                        className='d-flex p-2 ms-3'
                        onClick={() => device.setSelectedBrand({})}
                        style={{backgroundColor: '#f8d7da', cursor: 'pointer'}}
                    >
                        <span>&#10060;</span>
                    </Card>
                )
            }
        </Form>
    );
});

export default BrandBar;