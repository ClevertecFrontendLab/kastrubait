import LogoFull from '@public/assets/icons/logo-full.svg';
import LogoShort from '@public/assets/icons/Logo-short.svg';
// import LogoShort from '../../../assets/icons/LogoShort.png';
// import LogoFull from '../../../assets/icons/LogoFull.png';


import s from './logo.module.scss';

interface IPropsLogo {
    mobileView: boolean;
    collapsed: boolean;
}

export const Logo = ({ collapsed, mobileView }: IPropsLogo) => {
    let src = LogoFull;

    if (collapsed && !mobileView) {
        src = LogoShort;
    }
    return (
        <div className={s.logo} >
            <img src={src}/>
        </div>
    )
};


