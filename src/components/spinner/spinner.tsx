import React from "react";
import { useLottie } from 'lottie-react';
import loader from './loader.json';

export const Spinner: React.FC = () => {
const options = {
    animationData: loader,
    loop: true
    };

    const { View } = useLottie(options);

    return <>{View}</>;
};
