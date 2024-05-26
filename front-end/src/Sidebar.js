import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { MailOutlined , CalendarOutlined , AppstoreOutlined , SettingOutlined  } from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<MailOutlined />}>
          Menu Item 1
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          Menu Item 2
        </Menu.Item>
        <Menu.Item key="3" icon={<AppstoreOutlined />}>
          Menu Item 3
        </Menu.Item>
        <Menu.Item key="4" icon={<SettingOutlined />}>
          Menu Item 4
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;