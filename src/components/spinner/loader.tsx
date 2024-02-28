import React from "react";
import { useLottie } from 'lottie-react';
import loader from '@public/assets/loader.json';

import style from './loader.module.scss';

export const Loader: React.FC = () => {
const options = {
    animationData: loader,
    loop: true
    };

    const { View } = useLottie(options);

    return (
        <>
            <div className={style['loader-bg']}></div>
            <div data-test-id='loader' className={style['loader_content']}>
                {View}
            </div>
        </>
    );
};
