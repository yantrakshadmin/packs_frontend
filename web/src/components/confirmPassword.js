import React, {useState, useCallback} from 'react';
import {Form, Col, Row, Button, Divider, Spin, Card, Input} from 'antd';
import {useHandleForm} from 'hooks/form';
import {navigate, useParams} from '@reach/router';
import {confirmPassword} from 'common/api/auth';
import formItem from '../hocs/formItem.hoc';
import {FORM_ELEMENT_TYPES} from '../constants/formFields.constant';
import './SignIn/sign-in.styles.scss';

export default () => {
  const {uname} = useParams();

  const {form, submit, loading} = useHandleForm({
    create: confirmPassword,
    edit: () => {},
    retrieve: () => {},
    success: 'Check your email',
    failure: 'Something went wrong',
    done: () => {
      navigate('/');
    },
    close: () => {},
  });

  const preProcess = (data) => {
    submit(data);
  };

  return (
    <Row style={{marginTop: '100px'}} align="middle" justify="center">
      <Col span={12}>
        <Card>
          <Spin spinning={loading}>
            <Divider orientation="left">Password Reset - {uname}</Divider>
            <Form
              onFinish={preProcess}
              form={form}
              initialValues={{username: uname}}
              layout="vertical"
              hideRequiredMark
              autoComplete="off"
              onFieldsChange={() => {}}>
              <Row style={{justifyContent: 'left'}}>
                <Col span={24}>
                  {formItem({
                    key: 'username',
                    rules: [{required: true, message: 'Please enter name!'}],
                    kwargs: {
                      placeholder: 'Enter',
                      disabled: true,
                    },
                    type: FORM_ELEMENT_TYPES.INPUT,
                    others: null,
                    customLabel: 'Username',
                  })}
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please enter new password!'}]}>
                    <Input.Password placeholder="New Password" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  {formItem({
                    key: 'otp',
                    rules: [{required: true, message: 'Please enter otp!'}],
                    kwargs: {
                      placeholder: 'Enter OTP',
                    },
                    type: FORM_ELEMENT_TYPES.INPUT,
                    others: null,
                    customLabel: 'OTP',
                  })}
                </Col>
              </Row>

              <Row>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <div className="p-2" />
                <Button
                  type="primary"
                  onClick={() => {
                    navigate('/');
                  }}>
                  Cancel
                </Button>
              </Row>
            </Form>
          </Spin>
        </Card>
      </Col>
    </Row>
  );
};
