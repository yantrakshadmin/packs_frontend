import React, {useState} from 'react';
import {Form, Button, Input, Checkbox, notification} from 'antd';
import {ACCESS_TOKEN, REFRESH_TOKEN} from 'common/constants/storage';
import {getJWTTokens} from 'common/api/auth';
import {getUserMeta} from 'common/helpers/auth';
import {useDispatch} from 'react-redux';
import {connect} from 'react-redux';

import './sign-in.styles.scss';

const SignIn = ({user}) => {
  const dispatch = useDispatch();
  const [signIn, setSignIn] = useState(false);

  const [form] = Form.useForm();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 9,
      span: 14,
    },
  };

  const onFinish = async ({username, password}) => {
    try {
      // setLoading(true);
      const {data: tokens} = await getJWTTokens({username, password});

      const {access, refresh} = tokens;
      await window.storage.set(ACCESS_TOKEN, access);
      await window.storage.set(REFRESH_TOKEN, refresh);

      console.log(access);
      await getUserMeta(dispatch);
    } catch (e) {
      notification.error({
        message: `Can't Sign In user: ${username} - Invalid Credentials.`,
      });
    }
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onSignIn = () => {
    setSignIn(true);
  };

  if (signIn) {
    return (
      <div className="sign-in">
        <Form
          form={form}
          {...layout}
          name="basic"
          hideRequiredMark
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
  return (
    <div className="intro">
      <h1>Welcome to Yantra Packs</h1>
      <br />
      <div className="content">
        Yantra Packs provide sustainable material handling equipment solutions to Auto,
        FMCG,Chemical and Industrial/ Manufacturing companies to help them store and distribute
        goods efficiently, helping them to boost profitability and increase efficiency.
      </div>
      <br /> <br />
      <Button size="large" type="primary" onClick={() => onSignIn()}>
        Sign In
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {user: state.user.userMeta};
};

export default connect(mapStateToProps)(SignIn);
