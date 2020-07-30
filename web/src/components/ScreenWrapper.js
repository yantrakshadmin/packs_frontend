import React, {useState, Suspense} from 'react';
import {Layout, Menu, Divider, Dropdown, Avatar, Typography} from 'antd';
import {Link} from '@reach/router';
import {useDispatch} from 'react-redux';
import {signOutUser} from 'common/actions/signIn';
import {connect} from 'react-redux';

import {changePage} from 'common/actions/changePage';
import logo from 'common/assets/Yantraksh Logo.png';

import {Loading} from 'components/Loading';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const {SubMenu} = Menu;
const {Header, Content, Sider, Footer} = Layout;
const {Text} = Typography;

const ScreenWrapper = ({routes, navigate, children, user, changePage}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [collapsedWidth, setCollapsedWidth] = useState(80);
  const dispatch = useDispatch();
  const onSignOut = () => {
    dispatch(signOutUser());
    navigate('../');
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to={`/${user.type}/edit-profile/`}>Edit Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={() => onSignOut()}>
        <Text type="danger">Log Out</Text>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="">
      <Header
        className="header row align-center justify-between"
        style={{backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20}}>
        <div className="bg-white m-0 row align-center">
          <img
            style={{
              height: '33px',
              width: '135px',
              position: 'absolute',
            }}
            alt="Yantraksh"
            src={logo}
          />
        </div>

        <Dropdown overlay={menu} trigger={['click']}>
          <div className="row align-center">
            <p className="m-2">{user.name}</p>
            <Avatar size="large" src={user.dp} />
          </div>
        </Dropdown>
      </Header>
      <Divider style={{margin: 0, padding: 0}} />
      <Layout>
        <Sider
          // trigger={null}
          // style={{zoom: '90%'}}
          collapsible
          width={200}
          collapsedWidth={collapsedWidth}
          onCollapse={() => {
            setCollapsedWidth(80);
            setIsCollapsed(!isCollapsed);
          }}
          className="site-layout-background">
          <Menu
            theme="dark"
            mode="inline"
            inlineCollapsed
            defaultSelectedKeys={[routes[0].name]}
            defaultOpenKeys={[routes[0].name]}
            style={{height: '100%', borderRight: 0}}>
            {routes.map((i) => {
              if (i.subMenu) {
                return (
                  <SubMenu
                    key={i.name}
                    icon={
                      <FontAwesomeIcon icon={i.icon} style={{marginRight: isCollapsed ? 50 : 5}} />
                    }
                    title={i.name}>
                    {i.subMenu.map((subItem) => (
                      <Menu.Item key={subItem.name}>
                        <Link
                          to={`/${user.type}${subItem.path}`}
                          key={subItem.name}
                          onClick={() => changePage(1)}>
                          {subItem.name}
                        </Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                );
              }
              return (
                <Menu.Item
                  key={i.name}
                  icon={
                    <FontAwesomeIcon icon={i.icon} style={{marginRight: isCollapsed ? 50 : 5}} />
                  }>
                  <Link to={`/${user.type}${i.path}`} key={i.name} onClick={() => changePage(1)}>
                    {i.name}
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout style={{padding: '24px'}}>
          <Suspense fallback={<Loading />}>
            <Content
              className="site-layout-background content-style"
              style={{minHeight: `calc( 100vh - 184px )`}}>
              {children}
            </Content>
          </Suspense>
          <Footer className="row justify-end ">
            <span>
              <a target="_blank" rel="noopener noreferrer" href="https://yantraksh.com">
                Yantraksh Logistics Pvt. Ltd.
              </a>{' '}
              &copy; All rights reserved
            </span>
          </Footer>
        </Layout>
      </Layout>
      <Divider style={{margin: 0, padding: 0}} />
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {user: state.user.userMeta};
};

export default connect(mapStateToProps, {changePage})(ScreenWrapper);
