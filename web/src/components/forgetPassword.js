import React, {useState, useCallback} from 'react';
import {Form, Col, Row, Button, Divider, Spin, Card} from 'antd';
import {useHandleForm} from 'hooks/form';
import {navigate} from '@reach/router';
import {forgotPassword} from 'common/api/auth';
import formItem from '../hocs/formItem.hoc';
import {FORM_ELEMENT_TYPES} from '../constants/formFields.constant';
import './SignIn/sign-in.styles.scss';

export default () => {
  const [text, setText] = useState(null);

  const {form, submit, loading} = useHandleForm({
    create: forgotPassword,
    edit: () => {},
    retrieve: () => {},
    success: "We've sent an OTP to your registered Email.",
    failure: 'Something went wrong',
    done: () => {
      navigate(`/confirm-password/${text}`);
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
            <Divider orientation="left">Password Reset</Divider>
            <Form
              onFinish={preProcess}
              form={form}
              layout="vertical"
              hideRequiredMark
              autoComplete="off"
              onFieldsChange={() => {}}>
              <Row style={{justifyContent: 'left'}}>
                <Col span={24}>
                  <div className="p-2">
                    {formItem({
                      key: 'username',
                      rules: [{required: true, message: 'Please enter username!'}],
                      kwargs: {
                        placeholder: 'Enter',
                        onChange: (ev) => {
                          setText(ev.target.value);
                        },
                      },
                      type: FORM_ELEMENT_TYPES.INPUT,
                      others: null,
                      customLabel: 'Username',
                    })}
                  </div>
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
