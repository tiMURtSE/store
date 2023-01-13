import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { authRoutes, publicRoutes } from '../routes/routes';

const AppRouter = () => {
    const isAuth = false;

    return (
        <Routes>
            {/* <Route path='/' element={<SharedLayout/>}> */}
                {isAuth && (
                    authRoutes.map(route => 
                        <Route path={route.path} element={route.element} key={route.path}/>
                    )
                )}

                {publicRoutes.map(route =>
                    <Route path={route.path} element={route.element} key={route.path}/>
                )}
            {/* </Route> */}
        </Routes>
    );
};

export default AppRouter;