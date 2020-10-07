import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin } from 'antd';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PFEP_DATA } from 'common/actions';
import { PREPStockKeepingFormFields } from 'common/formFields/PFEP/PFEPStockKeeping.formFields';
import { ArrowRightOutlined } from '@ant-design/icons';

export const PFEPStockKeepingForm = ({ id, onCancel,onDone,onNext }) => {
  const [loading,setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state =  useSelector(e=>(e.data.pfepData))

  const submit = async (data) =>{
    setLoading(true)
    await dispatch({ type:ADD_PFEP_DATA,data });
    setLoading(false)
    onNext();
  }
  useEffect(()=>{
    // form.setFieldsValue({
    //   emitter_inv:state.emitter_inv?state.emitter_inv:null,
    //   transit_time:state.transit_time?state.transit_time:null,
    //   wh_emitter:state.wh_emitter?state.wh_emitter:null,
    //   wh_receiver:state.wh_receiver?state.wh_receiver:null,
    //   other_storage:state.other_storage?state.other_storage:null,
    //   receiver_inv:state.receiver_inv?state.receiver_inv:null,
    // })
  },[state])

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Stock Keeping</Divider>
      <Form
        onFinish={submit}
        // initialValues={{
        //   emitter_inv:state.emitter_inv?state.emitter_inv:null,
        //   transit_time:state.transit_time?state.transit_time:null,
        //   wh_emitter:state.wh_emitter?state.wh_emitter:null,
        //   wh_receiver:state.wh_receiver?state.wh_receiver:null,
        //   other_storage:state.other_storage?state.other_storage:null,
        //   receiver_inv:state.receiver_inv?state.receiver_inv:null,
        // }}
        form={form}
        layout='vertical'
        hideRequiredMark
        autoComplete='off'
      >
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

