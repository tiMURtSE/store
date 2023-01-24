import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import DeviceStore from './store/DeviceStore';
import UserStore from './store/UserStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
const Context = createContext(null);

root.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore(),
            device: new DeviceStore(),
        }}>
            <App />
        </Context.Provider>
    </React.StrictMode>
);

export { Context };
