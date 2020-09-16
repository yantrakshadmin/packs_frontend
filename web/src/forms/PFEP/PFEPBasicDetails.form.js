import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons'
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

export default PFEPBasicDetailsForm;

