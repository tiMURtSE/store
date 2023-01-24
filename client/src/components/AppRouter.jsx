import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import SharedLayout from '../pages/SharedLayout';
import Shop from '../pages/Shop';
import { Context } from '..';
import { authRoutes, publicRoutes } from '../routes/routes';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
    const { user } = useContext(Context);
    
    return (
        <Routes>
            <Route path='/' element={<SharedLayout />}>
                <Route index element={<Shop />}/>

                {user.isAuth && (
                    authRoutes.map(route => 
                        <Route path={route.path} element={route.element} key={route.path}/>
                    )
                )}

                {publicRoutes.map(route =>
                    <Route path={route.path} element={route.element} key={route.path}/>
                )}
            </Route>
        </Routes>
    );
});

export default AppRouter;