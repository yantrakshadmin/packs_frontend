import React, {useEffect, useState} from 'react';
import {Form, Col, Row, Button, Divider, Spin, Card} from 'antd';
import formItem from 'hocs/formItem.hoc';
import {useDispatch, useSelector} from 'react-redux';
import {ADD_PFEP_DATA, STOP_STEP_LOADING} from 'common/actions';
import {PREPStockKeepingFormFields} from 'common/formFields/PFEP/PFEPStockKeeping.formFields';
import {ArrowRightOutlined, MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Row01FF} from 'common/formFields/PFEP/SCSStockKeeping.formFields';
import {PREPTouchPointsFormFields} from 'common/formFields/PFEP/PFEPTouchPoints.formFields';

export const PFEPStockKeepingForm = ({id, onCancel, onDone, onNext, active}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((e) => e.data.pfepData);

  const submit = async (data) => {
    setLoading(true);
    await dispatch({type: ADD_PFEP_DATA, data});
    setLoading(false);
    if (active === 1) {
      onNext();
    }
  };
  useEffect(() => {
    if (active !== 1) {
      form.submit();
      dispatch({type: STOP_STEP_LOADING});
    }
  }, [active]);

  return (
    <Spin spinning={loading}>
      <Form
        onFinish={submit}
        initialValues={state}
        form={form}
        layout="vertical"
        // hideRequiredMark
        autoComplete="off">
        <Divider orientation="left">Supply chain details</Divider>

        <Form.List name="sks">
          {(fields, {add, remove}) => {
            return (
              <>
                {fields.map((field, index) => (
                  <Card title={`Flow ${index + 1}`}>
                    <Row gutter={5} align="middle">
                      {Row01FF.map((item) => (
                        <Col span={item.colSpan}>
                          {formItem({
                            ...item,
                            form,
                            others: {
                              formOptions: {
                                ...field,
                                name: [field.name, item.key],
                                fieldKey: [field.fieldKey, item.key],
                              },
                            },
                          })}
                        </Col>
                      ))}
                      <Col span={1}>
                        <Button
                          type="danger"
                          onClick={() => {
                            remove(field.name);
                          }}
                          block>
                          <MinusCircleOutlined />
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                ))}
                <br />
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block>
                    <PlusOutlined /> Add
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>

        <Row justify="space-between">
          <div className="row">
            <Button type="primary" htmlType="submit" disabled>
              Submit
            </Button>
            <div className="p-2" />
            <Button type="primary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
          <Button type="link" htmlType="submit">
            <ArrowRightOutlined style={{fontSize: 30}} />
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};

export default PFEPStockKeepingForm;
