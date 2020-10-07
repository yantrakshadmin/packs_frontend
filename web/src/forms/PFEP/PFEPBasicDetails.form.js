import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons'
import { PREPBasicDetailsFormFields } from 'common/formFields/PFEP/PFEPBasicDetails.formFields';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PFEP_BASIC_DATA, ADD_PFEP_DATA, CLEAN_PFEP_DATA } from 'common/actions';

export const PFEPBasicDetailsForm = ({ id, onCancel,lead ,onDone,onNext }) => {
  const [loading,setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state =  useSelector(e=>(e.data.pfepData))

  useEffect(()=>{
    // const initialData = {
    //   date:state.date?state.date:null,
    //   contact_person:state.contact_person?state.contact_person:null,
    //   designation:state.designation?state.designation:null,
    //   email:state.email?state.email:null,
    //   contact_no:state.contact_no?state.contact_no:null
    // };
    // console.log({
    //   date:state.date?state.date:null,
    //   contact_person:state.contact_person?state.contact_person:null,
    //   designation:state.designation?state.designation:null,
    //   email:state.email?state.email:null,
    //   contact_no:state.contact_no?state.contact_no:null
    // },"state")
    // form.setFieldsValue(initialData);
    // form.setFieldsValue({
    //   date:state.date?state.date:null,
    //   contact_person:state.contact_person?state.contact_person:null,
    //   designation:state.designation?state.designation:null,
    //   email:state.email?state.email:null,
    //   contact_no:state.contact_no?state.contact_no:null
    // })
  },[state])

  const submit = async (data) =>{
    setLoading(true)
    await dispatch({ type:ADD_PFEP_BASIC_DATA,data:{ ...data,lead_no:lead } });
    setLoading(false)
    onNext();
  }

  return (
    <Spin spinning={loading}>
      <Form
        // initialValues={{
        //   date:state.date?state.date:null,
        //   contact_person:state.contact_person?state.contact_person:null,
        //   designation:state.designation?state.designation:null,
        //   email:state.email?state.email:null,
        //   contact_no:state.contact_no?state.contact_no:null
        // }}
        // initialValues={{ ...state }}
        onFinish={submit}
        form={form}
        layout='vertical'
        hideRequiredMark
        autoComplete='off'
      >
        <Row style={{ justifyContent: 'left' }}>
          {PREPBasicDetailsFormFields.slice(0, 4).map((item, idx) => (
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

export default PFEPBasicDetailsForm;

