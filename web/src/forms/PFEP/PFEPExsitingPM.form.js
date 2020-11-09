import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin } from 'antd';
import { PREPExistingPMFormFields } from 'common/formFields/PFEP/PFEPExsitingPM.formFields';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PFEP_DATA, STOP_STEP_LOADING } from 'common/actions';
import { ArrowRightOutlined } from '@ant-design/icons';

export const PFEPExsitingPMForm = ({ id, onCancel,onDone,active,onNext }) => {
  const [loading,setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state =  useSelector(e=>(e.data.pfepData))

  const submit = async (data) =>{
    setLoading(true)
    await dispatch({ type:ADD_PFEP_DATA,data });
    setLoading(false)
    if(active===2){
      onNext();
    }
  }
  useEffect( ()=>{
    if(active!==2){
      form.submit()
      dispatch({ type:STOP_STEP_LOADING })
    }
  },[active])
  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Existing Package Material</Divider>
      <Form
        onFinish={submit}
        form={form}
        initialValues={
          { ...state,
            packaging_type:state.packaging_type?state.packaging_type:'New Part' ,
            current_packaging:state.current_packaging?state.current_packaging:'Returnable'
          }
        }
        layout='vertical'
        // hideRequiredMark
        autoComplete='off'
      >
        <Divider orientation='center'>Packaging Dimensions(OD)</Divider>
        <Row style={{ justifyContent: 'left' }}>
          {PREPExistingPMFormFields.slice(0, 3).map((item, idx) => (
            <Col span={8}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Divider orientation='center'>Pocket Dimensions(ID)</Divider>
        <Row style={{ justifyContent: 'left' }}>
          {PREPExistingPMFormFields.slice(3, 6).map((item, idx) => (
            <Col span={8}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {PREPExistingPMFormFields.slice(21, 24).map((item, idx) => (
            <Col span={8}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {PREPExistingPMFormFields.slice(6, 8).map((item, idx) => (
            <Col span={12}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {PREPExistingPMFormFields.slice(8, 12).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {PREPExistingPMFormFields.slice(12, 16).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {PREPExistingPMFormFields.slice(16, 17).map((item, idx) => (
            <Col span={4}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
          {PREPExistingPMFormFields.slice(17, 21).map((item, idx) => (
            <Col span={5}>
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

export default PFEPExsitingPMForm;

