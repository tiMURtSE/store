import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import ListGroup from "react-bootstrap/ListGroup";

import { Context } from "../index";

const TypeBar = observer(() => {
    const { deviceStore } = useContext(Context);

    return (
        <ListGroup>
            {deviceStore.types.map(type =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={type.id === deviceStore.selectedType.id}
                    onClick={() => deviceStore.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}

            {
                (deviceStore.selectedType.id) && (
                    <ListGroup.Item
                        onClick={() => deviceStore.setSelectedType({})}
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