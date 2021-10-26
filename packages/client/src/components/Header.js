import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Button, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import useCurrentUser from '../hooks/useCurrentUser';

const Header = () => {
  const [user, loggedIn, tools] = useCurrentUser();

  const menu = (
    <Menu>
      <Menu.Item onClick={() => tools.logOut()} key="logout">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex flex-row justify-between border-b-2 px-40 py-5">
      <Link to="/">
        <img src={logo} />
      </Link>
      <div className="flex flex-row items-center">
        <Input prefix={<SearchOutlined />} placeholder="Search" className="mr-5" />
        <Link to="/create-project">
          <Button type="primary" className="h-full">
            Start a project
          </Button>
        </Link>
        {!loggedIn ? (
          <Button type="primary" className="h-full ml-2" onClick={() => tools?.logIn()}>
            Sign In to start
          </Button>
        ) : (
          <Dropdown overlay={menu}>
            <strong className="ml-3 mb-0 cursor-pointer" style={{ width: 200 }}>
              Hi, Son
            </strong>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default Header;
