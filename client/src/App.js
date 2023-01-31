import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Spinner } from 'react-bootstrap';

import './App.css';
import { Context } from '.';
import AppRouter from './components/AppRouter';
import { checkAuth } from './http/userAPI';

const App = observer(() => {
    const { userStore } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        check();
        // checkAuth().then(data => {
        //     userStore.setIsAuth(true);
        //     userStore.setUser(data);    
        // }).finally(() => setIsLoading(false))
    }, []);

    const check = async () => {
        try {
            const data = await checkAuth();
            console.log(data)
            userStore.setIsAuth(true);
            userStore.setUser(data);            
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false)
        }
    };

    if (isLoading) return <Spinner animation='border'/>;
    
    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;