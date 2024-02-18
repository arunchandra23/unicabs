// Navbar.js
import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, ProfileOutlined, SettingOutlined } from '@ant-design/icons';

const NavBar = () => {
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
      <Menu.Item key="home" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
