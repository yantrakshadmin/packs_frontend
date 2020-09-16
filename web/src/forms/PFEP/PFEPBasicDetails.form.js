import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin } from 'antd';
import { PREPBasicDetailsFormFields } from 'common/formFields/PFEP/PFEPBasicDetails.formFields';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PFEP_DATA } from 'common/actions';

export const PFEPBasicDetailsForm = ({ id, onCancel,onDone,onNext }) => {
  const [loading,setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state =  useSelector(e=>(e.data.pfepData))

  const submit = async (data) =>{
    console.log(data);
    setLoading(true)
    await dispatch({ type:ADD_PFEP_DATA,data });
    setLoading(false)
    onNext();
    console.log(state,'ye wala')
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
        <Row style={{ justifyContent: 'left' }}>
          {PREPBasicDetailsFormFields.slice(0, 4).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          <Button type='primary' htmlType='submit'>
            Next
          </Button>
          <div className='p-2' />
          <Button type='primary' onClick={onDone}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};

export default PFEPBasicDetailsForm;

