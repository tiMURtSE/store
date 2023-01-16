import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Context } from '..';

import { authRoutes, publicRoutes } from '../routes/routes';

const AppRouter = () => {
    const { user } = useContext(Context);

    console.log(user)
    return (
        <Routes>
            {/* <Route path='/' element={<SharedLayout/>}> */}
                {user.isAuth && (
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