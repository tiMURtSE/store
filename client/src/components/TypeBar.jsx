import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import ListGroup from "react-bootstrap/ListGroup";

const TypeBar = observer(() => {
    const { device } = useContext(Context);

    return (
        <ListGroup>
            {device.types.map(type =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={type.id === device.selectedType.id}
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}

            {
                (device.selectedType.id) && (
                    <ListGroup.Item
                        onClick={() => device.setSelectedType({})}
                        style={{textAlign: 'center', cursor: 'pointer'}}
                        variant='danger'
                    >
                        &#10060;
                    </ListGroup.Item>
                )
            }
        </ListGroup>
    );
});

export default TypeBar;