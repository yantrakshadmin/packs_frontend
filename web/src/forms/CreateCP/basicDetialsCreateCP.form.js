import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin } from 'antd';
import { ArrowRightOutlined, } from '@ant-design/icons';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_CREATE_CP_DATA,
  STOP_STEP_LOADING,
} from 'common/actions';
import { basicDetailCreateCPFormFields }
  from 'common/formFields/createCP/basicDetailsCreateCP.formFields';

export const BasicDetailsCreateCPForm = ({ id, onCancel,lead,onNext,active }) => {
  const [loading,setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state =  useSelector(e=>(e.data.createCPData))

  const submit = async (data) =>{
    setLoading(true)
    await dispatch({ type:ADD_CREATE_CP_DATA,
      data:{ ...data } });
    setLoading(false)
    if(active === 0){
      onNext();
    }
  }

  useEffect( ()=>{
    if(active!==0){
      form.submit()
      dispatch({ type:STOP_STEP_LOADING })
    }
  },[active])

  return (
    <Spin spinning={loading}>
      <Form
        initialValues={{ ...state }}
        onFinish={submit}
        form={form}
        layout='vertical'
        // hideRequiredMark
        autoComplete='off'
      >
        <Divider orientation='left'>Basic Details</Divider>
        <Row style={{ justifyContent: 'left' }}>
          {basicDetailCreateCPFormFields.slice(0, 4).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Divider orientation='left'>Part Details</Divider>
        <Row style={{ justifyContent: 'left' }}>
          {basicDetailCreateCPFormFields.slice(4, 14).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
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

export default BasicDetailsCreateCPForm;

