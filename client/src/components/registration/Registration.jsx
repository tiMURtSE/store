import React from 'react';

import Button from '../ui/button/Button';
import Input from '../ui/input/Input';
import classes from './Registration.module.css';

const Registration = () => {
    return (
        <div className={classes.registration}>
            <h2 className={classes.registration__title}>Регистрация</h2>
            <form className={classes.registration__form} action="#">
                <div className="input">
                    <label htmlFor="email"></label>
                    <Input type="text" name='email'/>
                </div>

                <div className="input">
                    <label htmlFor="password"></label>
                    <Input type="password" name='password'/>
                </div>

                <Button isDark={true} type='button'>Зарегестрироваться</Button>
            </form>
        </div>
    );
};

export default Registration;