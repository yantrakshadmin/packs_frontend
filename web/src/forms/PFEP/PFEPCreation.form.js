import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin} from 'antd';
import { PREPBasicDetailsFormFields } from 'common/formFields/PFEP/PFEPBasicDetails.formFields';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PFEP_DATA } from 'common/actions';
import { PREPCreationFormFields } from 'common/formFields/PFEP/PFEPCreation.formFields';
import { ArrowRightOutlined } from '@ant-design/icons';

export const PFEPCreationForm = ({ id, onCancel,onDone,onNext }) => {
  const [loading,setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const submit = async (data) =>{
    setLoading(true)
    await dispatch({ type:ADD_PFEP_DATA,data });
    setLoading(false)
    onNext();
  }
  const state =  useSelector(e=>(e.data.pfepData))

  useEffect(()=>{
    // form.setFieldsValue({
    //     proposal_for_client:state.proposal_for_client?state.proposal_for_client:null,
    //     sender_client:state.sender_client?state.sender_client:null,
    //     sender_location:state.sender_location?state.sender_location:null,
    //     receiver_client:state.receiver_client?state.receiver_client:null,
    //     receiver_location:state.receiver_location?state.receiver_location:null
    //   })
  },[state])

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>PFEP Creation</Divider>
      <Form
        // initialValues={state}
        // initialValues={{
        //   proposal_for_client:state.proposal_for_client?state.proposal_for_client:null,
        //   sender_client:state.sender_client?state.sender_client:null,
        //   sender_location:state.sender_location?state.sender_location:null,
        //   receiver_client:state.receiver_client?state.receiver_client:null,
        //   receiver_location:state.receiver_location?state.receiver_location:null
        // }}
        onFinish={submit}
        form={form}
        layout='vertical'
        hideRequiredMark
        autoComplete='off'
      >
        <Row style={{ justifyContent: 'left' }}>
          {PREPCreationFormFields.slice(0, 3).map((item, idx) => (
            <Col span={8}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {PREPCreationFormFields.slice(3, 5).map((item, idx) => (
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

export default PFEPCreationForm;

