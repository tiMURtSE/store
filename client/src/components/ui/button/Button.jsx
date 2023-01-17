import React from 'react';
import classes from './Button.module.css';

const Button = ({ children, isDark, ...props}) => {
    const btnClass = classes.btn + (isDark ? ` ${classes.dark}` : '');
    
    return (
        <button className={btnClass} {...props}>
            {children}
        </button>
    );
};

export default Button;