import { Card, Divider } from 'antd';

import './action_card.module.scss';

interface IPropsCard {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
}

const { Meta } = Card;

export const ActionCard = ({ children, className = '', title, description }: IPropsCard) => {
    return (
        <>
            {description ? (
                <Card className={className ? 'card card-meta ' + className : 'card card-meta'}>
                    <Meta title={title} description={description} />
                    <Divider className='divider' />
                    {children}
                </Card>
            ) : (
                <Card className={className ? 'card ' + className : 'card'} title={title}>
                    {children}
                </Card>
            )}
        </>
    );
};
