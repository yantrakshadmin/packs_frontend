import React, { useState } from 'react';
import { Form, Button, Input, Checkbox } from 'antd';
import './sign-in.styles.scss';

const SignIn = (props) => {
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

  const onFinish = (values) => {
    console.log('Success:', values);
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
      <Form
        className='signin'
        form={form}
        {...layout}
        name='basic'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          label='Username'
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
  return (
    <div className='intro'>
      <h1>Welcome to Yantra Packs</h1>
      <br />
      <div className='content'>
        Yantra Packs provide sustainable material handling equipment solutions to Auto,
        FMCG,Chemical and Industrial/ Manufacturing companies to help them store and distribute
        goods efficiently, helping them to boost profitability and increase efficiency.
      </div>
      <br /> 
      {' '}
      <br />
      <Button size='large' type='primary' onClick={() => onSignIn()}>
        Sign In
      </Button>
    </div>
  );
};

export default SignIn;
