import { Image } from 'antd';
import LogoFull from '@public/assets/icons/logo-full.svg'
import LogoShort from '@public/assets/icons/logo-short.svg';

import './logo.module.scss';

interface IPropsLogo {
    mobileView: boolean;
    collapsed: boolean;
}

export const Logo = ({ collapsed, mobileView }: IPropsLogo) => {
    let src = LogoFull;

    if (collapsed && !mobileView) {
        src = LogoShort;
    }

    return <Image src={src} preview={false} alt='logo' />;
};
