import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin, notification } from 'antd';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CREATE_CP_DATA, STOP_STEP_LOADING } from 'common/actions';
import { operatingCostMonthlyFormFields }
  from 'common/formFields/createCP/operatingCostMonthly.formFields';
import { createCP, editCP } from 'common/api/auth';

export const LogisticCreateCPForm = ({ id, onCancel,onDone,active,onNext }) => {
  const [loading,setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state =  useSelector(e=>(e.data.createCPData))


  const submit = async (data) =>{
    setLoading(true)
    await dispatch({ type:ADD_CREATE_CP_DATA,data });
    setLoading(false)
    if(active === 3){
      if(id){
        const { error } = await editCP(id,{ ...state,...data });
        if (error) {
          notification.warning({
            message: 'Unable To Edit.',
            description:
              'Something went wrong CP editing failed.',
          });
          onCancel();
        } else {
          onDone();
        }
      }
      else{
        const { error } = await createCP({ ...state,...data });
        if (error) {
          notification.warning({
            message: 'Unable To Create.',
            description:
              'Something went wrong CP creation failed.',
          });
          onCancel();
        } else {
          onDone();
        }
      }
    }}

  useEffect( ()=>{
    if(active!==3){
      form.submit()
      dispatch({ type:STOP_STEP_LOADING })
    }
  },[active])

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Opex</Divider>
      <Form
        onFinish={submit}
        form={form}
        initialValues={
          { ...state }
        }
        layout='vertical'
        // hideRequiredMark
        autoComplete='off'
      >
        <Row style={{ justifyContent: 'left' }}>
          {operatingCostMonthlyFormFields.slice(0, 4).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {item.customLabel}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {operatingCostMonthlyFormFields.slice(0, 4).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {operatingCostMonthlyFormFields.slice(4, 8).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {item.customLabel}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {operatingCostMonthlyFormFields.slice(4, 8).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {operatingCostMonthlyFormFields.slice(8, 12).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {item.customLabel}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {operatingCostMonthlyFormFields.slice(8,12).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {operatingCostMonthlyFormFields.slice(12, 16).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {item.customLabel}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {operatingCostMonthlyFormFields.slice(12,16).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {operatingCostMonthlyFormFields.slice(16, 18).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {item.customLabel}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {operatingCostMonthlyFormFields.slice(16,18).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row justify='space-between'>
          <div className='row'>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
            <div className='p-2' />
            <Button type='primary' onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </Row>
      </Form>
    </Spin>
  );
};

export default LogisticCreateCPForm;

