import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin, notification } from 'antd';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PFEP_DATA, STOP_STEP_LOADING } from 'common/actions';
import { PREPStockKeepingFormFields } from 'common/formFields/PFEP/PFEPStockKeeping.formFields';
import { ArrowRightOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { PREPCycleTimeFormFields } from 'common/formFields/PFEP/PFEPCycleTIme.formFields';
import { PREPTouchPointsFormFields } from 'common/formFields/PFEP/PFEPTouchPoints.formFields';

export const PFEPStockKeepingForm = ({ id, onCancel,onDone,onNext,active }) => {
  const [loading,setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state =  useSelector(e=>(e.data.pfepData))

  const submit = async (data) =>{
    setLoading(true)
    await dispatch({ type:ADD_PFEP_DATA,data });
    setLoading(false)
    if(active === 3){
      onNext();
    }
  }
  useEffect( ()=>{
    if(active!==3){
      form.submit()
      dispatch({ type:STOP_STEP_LOADING })
    }
  },[active])

  return (
    <Spin spinning={loading}>
      <Form
        onFinish={submit}
        initialValues={state}
        form={form}
        layout='vertical'
        // hideRequiredMark
        autoComplete='off'
      >
        <Divider orientation='left'>Stock Keeping</Divider>
        <Row style={{ justifyContent: 'left' }}>
          {PREPStockKeepingFormFields.slice(0, 3).map((item, idx) => (
            <Col span={8}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {PREPStockKeepingFormFields.slice(3, 6).map((item, idx) => (
            <Col span={8}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Divider orientation='left'>Cycle Time</Divider>
        <Row style={{ justifyContent: 'left' }}>
          {PREPCycleTimeFormFields.slice(0, 3).map((item, idx) => (
            <Col span={8}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Divider orientation='left'>Touch Points</Divider>
        <Form.List name='tp'>
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align='middle'>
                    {PREPTouchPointsFormFields.slice(0, 4).map((item) => (
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
                      const temp = form.getFieldValue('tp')
                      if( temp === undefined || temp.length<5){
                        add();
                      }else{
                        notification.info({message:"Only 5 touch points can be added!"})
                      }
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
            <Button type='primary' onClick={onCancel}>
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

export default PFEPStockKeepingForm;

