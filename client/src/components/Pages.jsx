import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Pagination } from 'react-bootstrap';

import { Context } from '../index';

const Pages = observer(() => {
    const { deviceStore } = useContext(Context);
    const pages = Math.ceil(deviceStore.totalNumberOfDevices / deviceStore.limit);
    const totalPages = [];

    for (let i = 0; i < pages; i++) {
        totalPages.push(i + 1);
    }

    return (
        <Pagination className='mt-3'>
            {totalPages.map(page =>
                <Pagination.Item
                    active={page === deviceStore.selectedPage}
                    onClick={() => deviceStore.setSelectedPage(page)}
                    key={page}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;