import LogoFull from '../../../../public/assets/icons/logo-full.svg';
import LogoShort from '../../../../public/assets/icons/logo-short.svg';


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


