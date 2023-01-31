import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Card, Form } from "react-bootstrap";

import { Context } from "../index";

const BrandBar = observer(() => {
    const { deviceStore } = useContext(Context);

    return (
        <Form className="d-flex flex-wrap align-items-center">
            {deviceStore.brands.map(brand =>
                <Card
                    style={{cursor:'pointer'}}
                    key={brand.id}
                    className="p-3"
                    onClick={() => deviceStore.setSelectedBrand(brand)}
                    border={brand.id === deviceStore.selectedBrand.id ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>
            )}

            {
                (deviceStore.selectedBrand.id) && (
                    <Card
                        className='d-flex p-2 ms-3'
                        onClick={() => deviceStore.setSelectedBrand({})}
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