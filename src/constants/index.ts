import { IdcardOutlined, TrophyFilled, HeartFilled, CalendarOutlined } from '@ant-design/icons';

export type IconLinkType = {
    buttonText: string;
    icon: React.ReactNode;
};

export type cardInfoListType = {
    title: string;
    link: IconLinkType;
};

export const SIDER_MENU: { key: string, icon: React.ComponentType, label: string }[] =
                                                            [ { key: '1', icon: CalendarOutlined, label: "Календарь" },
                                                              { key: '2', icon: HeartFilled, label: "Тренировки" },
                                                              { key: '2', icon: TrophyFilled, label: "Достижения" },
                                                              { key: '2', icon: IdcardOutlined, label: "Профиль" } ];

export const ACTION_CARD: {key: string, icon: React.ComponentType, title: string, buttonText: string}[] =
                            [ { key: '1', icon: HeartFilled, title: "Расписать тренировки", buttonText: 'Тренировки' },
                              { key: '2',icon: CalendarOutlined, title: "Назначить календарь", buttonText: 'Календарь' },
                              { key: '3',icon: IdcardOutlined, title: "Заполнить профиль", buttonText: 'Профиль' } ];

export const enum NAVIGATION {
    Home = 'Главная',
}

