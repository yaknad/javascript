import React from 'react';

export interface ScreenProps {
    text: string,
    //id?: number // same as - id: string | undefined
}

export const Screen : React.FC<ScreenProps> = ({text/*, id*/}) => <div>{text}</div>