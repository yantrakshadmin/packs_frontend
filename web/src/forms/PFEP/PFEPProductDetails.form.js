import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin } from 'antd';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PFEP_DATA, STOP_STEP_LOADING } from 'common/actions';
import { PREPProductDetailsFormFields } from 'common/formFields/PFEP/PFEPProductDetails.formFields';
import { ArrowRightOutlined } from '@ant-design/icons';

export const PFEPProductDetailsForm = ({ id, onCancel,active,onNext }) => {
  const [loading,setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state =  useSelector(e=>(e.data.pfepData))

  const submit = async (data) =>{
    setLoading(true)
    await dispatch({ type:ADD_PFEP_DATA,data });
    setLoading(false)
    if(active===1){
      onNext();
    }
  }
  useEffect( ()=>{
    if(active!==1){
      form.submit()
      dispatch({ type:STOP_STEP_LOADING })
    }
  },[active])
  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Product Details Form</Divider>
      <Form
        onFinish={submit}
        initialValues={{ ...state,np_ef:state.np_ef?state.np_ef:'New Part' }}
        form={form}
        layout='vertical'
        // hideRequiredMark
        autoComplete='off'
      >
        <Row style={{ justifyContent: 'left' }}>
          {PREPProductDetailsFormFields.slice(0, 4).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {PREPProductDetailsFormFields.slice(4, 8).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {PREPProductDetailsFormFields.slice(8,12).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {PREPProductDetailsFormFields.slice(12,15).map((item, idx) => (
            <Col span={8}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {PREPProductDetailsFormFields.slice(15,18).map((item, idx) => (
            <Col span={8}>
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

export default PFEPProductDetailsForm;

