import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { Context } from '.';

import './App.css';
import AppRouter from './components/AppRouter';
import { check } from './http/userAPI';

const App = observer(() => {
    const { user } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        check().then(data => {
            user.setIsAuth(true);
            // в видео тут вместо data стоит true
            user.setUser(data);    
        }).finally(() => setIsLoading(false))
    }, []);

    if (isLoading) {
        return <Spinner animation='border'/>
    }

    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;