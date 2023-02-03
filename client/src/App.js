import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Spinner } from 'react-bootstrap';

import './App.css';
import { Context } from '.';
import AppRouter from './components/AppRouter';
import { getUserData } from './http/userAPI';
import { setAndDecodeToken } from './utils/usefulFunctions';

const App = observer(() => {
    const { userStore } = useContext(Context);
    const [isPageLoading, setIsPageLoading] = useState(true);

    const defineUserCredentials = async () => {
        try {
            const data = await getUserData();
            const user = setAndDecodeToken(data.token);
            
            userStore.setIsUserAuthorized(true);
            userStore.setUser(user);            
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsPageLoading(false);
        }
    };

    useEffect(() => {
        defineUserCredentials();
    }, []);

    if (isPageLoading) {
        return <Spinner animation='border'/>;
    }
    
    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;