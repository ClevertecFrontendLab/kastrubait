import React from "react";
import { useLottie } from 'lottie-react';
import loader from '@public/assets/loader.json';

export const Loader: React.FC = () => {
const options = {
    animationData: loader,
    loop: true
    };

    const { View } = useLottie(options);

    return (
        <div data-test-id='loader' className='s.loader_container'>
            {View}
        </div>
    );
};
