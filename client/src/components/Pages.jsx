import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { Context } from '../index';

const Pages = observer(() => {
    const { device } = useContext(Context);
    const pages = Math.ceil(device.totalCount / device.limit);
    const totalPages = [];

    for (let i = 0; i < pages; i++) {
        totalPages.push(i + 1);
    }

    return (
        <Pagination className='mt-3'>
            {totalPages.map(page =>
                <Pagination.Item
                    active={page === device.selectedPage}
                    onClick={() => device.setSelectedPage(page)}
                    key={page}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;