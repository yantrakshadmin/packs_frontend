import React, {useEffect} from 'react';
import {Button, Form, Card, Typography, Divider, Checkbox, Input} from 'antd';
import {connect} from 'react-redux';
import {signUpEmployeeStartAsync} from 'common/actions/signUp';
import {redirectTo} from '@reach/router';

import './sign-up.styles.scss';

const {Text} = Typography;

const SignUp = ({user, signUpEmployeeStartAsync}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user.first_name) redirectTo('/');
  }, [user]);

  const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 12,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 9,
      span: 14,
    },
  };

  const onFinish = ({username, email, firstname: first_name, lastname: last_name, password}) => {
    signUpEmployeeStartAsync({username, email, last_name, first_name, password});
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="container">
      <Card style={{boxShadow: '2px 2px 2px grey', borderRadius: '5px'}}>
        <Typography>
          {/* <Title level={3} style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>
            Register as a Client
          </Title> */}
          <Text strong style={{fontSize: '25px'}}>
            Register as an Employee
          </Text>
          <Divider />
          <Form
            className="signin"
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
              label="First Name"
              name="firstname"
              rules={[
                {
                  required: true,
                  message: 'Please input your First Name!',
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: 'Please input your Last Name!',
                },
              ]}>
              <Input />
            </Form.Item>

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
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email',
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback>
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({getFieldValue}) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
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
        </Typography>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {user: state.user.userMeta};
};

export default connect(mapStateToProps, {signUpEmployeeStartAsync})(SignUp);
