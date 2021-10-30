import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Button, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useUserContext } from '../providers/UserProvider';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  const { user, loggedIn, tools } = useUserContext();

  const menu = (
    <Menu>
      <Menu.Item key="My Projects" onClick={() => history.push('/my-projects')}>
        My Projects
      </Menu.Item>
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
        {loggedIn && (
          <Link to="/create-project" style={{ height: '34px' }}>
            <Button type="primary" className="h-full">
              Start a project
            </Button>
          </Link>
        )}

        {!loggedIn ? (
          <Button type="primary" className="h-full ml-2" onClick={() => tools?.logIn()}>
            Sign In to start
          </Button>
        ) : (
          <Dropdown overlay={menu}>
            <strong className="ml-3 mb-0 cursor-pointer">
              <span>Hi,</span>
              <span>{user.addr}</span>
            </strong>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default Header;
