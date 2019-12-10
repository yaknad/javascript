import React from 'react';
import './button.scss';

interface ButtonProps{
    onClick: (/*sign: string*/) => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => <button onClick={onClick}>{children}</button> 
//children is a keyword tat represents the children (child component) of the component - this property will always be in the props object