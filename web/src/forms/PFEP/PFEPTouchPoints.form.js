import React, { useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin} from 'antd';
import formItem from 'hocs/formItem.hoc';
import { useDispatch } from 'react-redux';
import { ADD_PFEP_DATA } from 'common/actions';
import { PREPTouchPointsFormFields } from 'common/formFields/PFEP/PFEPTouchPoints.formFields';
import { flowKitsFormFields } from 'common/formFields/flowKit.formFields';
import { ArrowRightOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export const PfepTouchPointsForm = ({ id, onCancel,onDone,onNext }) => {
  const [loading,setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const submit = async (data) =>{
    setLoading(true)
    await dispatch({ type:ADD_PFEP_DATA,data });
    setLoading(false)
    onNext();
  }

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Basic Details</Divider>
      <Form
        onFinish={submit}
        form={form}
        layout='vertical'
        hideRequiredMark
        autoComplete='off'
      >
        <Form.List name='touch_points'>
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align='middle'>
                    {PREPTouchPointsFormFields.slice(0, 3).map((item) => (
                      <Col span={5}>
                        <div className='p-2'>
                          {formItem({
                            ...item,
                            noLabel: index !== 0,
                            form,
                            others: {
                              formOptions: {
                                ...field,
                                name: [field.name, item.key],
                                fieldKey: [field.fieldKey, item.key],
                              },
                            },
                          })}
                        </div>
                      </Col>
                    ))}
                    <Button
                      type='danger'
                      style={index !== 0 ? { top: '-2vh' } : null}
                      onClick={() => {
                        remove(field.name);
                      }}>
                      <MinusCircleOutlined />
                      {' '}
                      Delete
                    </Button>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type='dashed'
                    onClick={() => {
                      add();
                    }}
                    block>
                    <PlusOutlined />
                    {' '}
                    Add Item
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        <Row justify='space-between'>
          <div className='row'>
            <Button type='primary' htmlType='submit' disabled>
              Submit
            </Button>
            <div className='p-2' />
            <Button type='primary' onClick={onDone}>
              Cancel
            </Button>
          </div>
          <Button type='link' htmlType='submit'>
            <ArrowRightOutlined style={{ fontSize:30 }}  />
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};

export default PfepTouchPointsForm;

