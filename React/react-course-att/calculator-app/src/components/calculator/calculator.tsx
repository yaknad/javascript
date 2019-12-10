import React, { useState } from 'react';
import './calculator.scss';
import {Screen} from './screen/screen'
import { Button } from './button/button';



export const Calculator = () => {

    const [screenText, setScreenText] = useState("");
    
//    const [screenText2, setScreenText2] = useState(""); - each useState is "watched" for changes seperately - so change in one will not trigger the other!
    const BUTTONS_CONFIG: string[]  = ['1','2','3','+','4','5','6','-','7','8','9','*','0','.','C','/','CE'];
    function onButtonClicked(sign:string) {
        setScreenText(prev => prev + sign);
    }


    return ( 
        <div className = 'calc-container'>
            <Screen text={screenText}></Screen>
            <div className='buttons-container'>
                {
                   BUTTONS_CONFIG
                   //.filter(sign => !isNaN(sign as any))
                   .map(sign => <Button key={sign} 
                                        onClick={() => onButtonClicked(sign)}>
                                            {sign}</Button>)           
                }
            </div>
        </div>
    );

    // NOTE: if we change the key (dynamically), it will force React to re-render the component! 
    // The key is used to prevent unrequired creation of components - because it recognizes that the components still exists and only chnaged their place (index). 
    // If there isn't a key, any change will cause React to think the whole component (and child components) has changed, and needs to be recreated.

    // state is per component

    // rerender trigger: 
    //1. change of prop,
    //2. key disappearing





    // const renderFunction = (sign: string) => <Button>{sign}</Button>;
   
    // return ( 
    //     <div className = 'calc-container'>
    //         <Screen text='screen'></Screen>
    //         <div className='buttons-container'>
    //             {
    //                 ['1','2','3','+','4','5','6','-','7','8','9','*','0','.','C','/','CE'].map(sign => renderFunction(sign))              
    //             }
    //         </div>
    //     </div>
    // );
};