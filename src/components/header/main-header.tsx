import { Layout, Breadcrumb, Space, Button, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

// type IMainHeader = {
//     mobileView: boolean;
// };

const { Header } = Layout;
const { Title } = Typography;

export const MainHeader = () => {
    return (
        <Header className='main_header'>
            <Breadcrumb className='main_nav'>
                <Breadcrumb.Item>Главная</Breadcrumb.Item>
            </Breadcrumb>
            <Space className='header_layout'>
                <Title className='header_text'>
                    Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей мечты!
                </Title>
                <Button type='text' className='btn_setup'>
                    <SettingOutlined />
                    Настройки
                </Button>
            </Space>
        </Header>
    );
};
