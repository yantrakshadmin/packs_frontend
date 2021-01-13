import React, { useEffect, useState, useCallback } from 'react';
import { Form, Col, Row, Button, Divider, Spin } from 'antd';
import { ArrowRightOutlined, } from '@ant-design/icons';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_CREATE_CP_DATA,
  STOP_STEP_LOADING,
} from 'common/actions';
import { basicDetailCreateCPFormFields } from 'common/formFields/createCP/basicDetailsCreateCP.formFields';

import _ from 'lodash';

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

  const handleFieldsChange = useCallback(data => {

    if (form.getFieldValue("volume_pm") && form.getFieldValue("kit_pm")) {
      form.setFieldsValue({
        "total_kit_per_month" : _.ceil(form.getFieldValue("volume_pm")/form.getFieldValue("kit_pm")),
      })
    } else {
      form.setFieldsValue({
        "total_kit_per_month" : 0,
      })
    }

    if (form.getFieldValue("yantra_cycle")) {
      form.setFieldsValue({
        "kit_usage_ratio" : _.round(30/form.getFieldValue("yantra_cycle"),2),
      })
    } else {
      form.setFieldsValue({
        "kit_usage_ratio" : 0,
      })
    }

    if (form.getFieldValue("total_kit_per_month") && form.getFieldValue("kit_usage_ratio") && form.getFieldValue("buffer")) {
      form.setFieldsValue({
        "kit_based_on_usage_ratio" : _.ceil(( form.getFieldValue("total_kit_per_month")/form.getFieldValue("kit_usage_ratio") )*( 1+parseInt(form.getFieldValue("buffer")) )),
      })
    } else {
      form.setFieldsValue({
        "kit_based_on_usage_ratio" : 0,
      })
    }

  },[form])

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
        onFieldsChange={handleFieldsChange}
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

