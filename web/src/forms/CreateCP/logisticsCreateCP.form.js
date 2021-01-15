import React, { useEffect, useState,useCallback } from 'react';
import { Form, Col, Row, Button, Divider, Spin } from 'antd';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CREATE_CP_DATA, STOP_STEP_LOADING } from 'common/actions';
import { ArrowRightOutlined } from '@ant-design/icons';
import { logisticCreateCPFormFields }
  from 'common/formFields/createCP/logisticsCreateCP.formFields';

import { ifNanReturnZero } from 'common/helpers/mrHelper';


export const LogisticCreateCPForm = ({ id, onCancel,onDone,active,onNext }) => {
  const [loading,setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state =  useSelector(e=>(e.data.createCPData))

  const submit = async (data) =>{
    setLoading(true)
    await dispatch({ type:ADD_CREATE_CP_DATA,data });
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


  const handleFieldsChange = useCallback(data => {

		if(data[0]){
			if(data[0].name) {

        const currentInputField = data[0].name[0];
        console.log(currentInputField);


        if (currentInputField==="min_warehouse" || currentInputField==="transportation_w1_c1" || currentInputField==="transportation_c2_w2" || currentInputField==="transportation_w2_w1" || currentInputField==="total_cost_supply_chain" || currentInputField==="labor_cost_perton" || currentInputField==="repair_reconditioning" || currentInputField==="other_cost" || currentInputField==="total_cost") {
          if ( form.getFieldValue("min_warehouse") || form.getFieldValue("transportation_w1_c1") || form.getFieldValue("transportation_c2_w2") || form.getFieldValue("transportation_w2_w1") ) {
            form.setFieldsValue({
              "total_cost_supply_chain" : ifNanReturnZero(form.getFieldValue("min_warehouse"))+ifNanReturnZero(form.getFieldValue("transportation_w1_c1"))+ifNanReturnZero(form.getFieldValue("transportation_c2_w2"))+ifNanReturnZero(form.getFieldValue("transportation_w2_w1")),
            })
          } else {
            form.setFieldsValue({
              "total_cost_supply_chain" : 0,
            })
          }

          if ( form.getFieldValue("total_cost_supply_chain") || form.getFieldValue("labor_cost_perton") || form.getFieldValue("repair_reconditioning") || form.getFieldValue("other_cost") ) {
            form.setFieldsValue({
              "total_cost" : ifNanReturnZero(form.getFieldValue("total_cost_supply_chain"))+ifNanReturnZero(form.getFieldValue("labor_cost_perton"))+ifNanReturnZero(form.getFieldValue("repair_reconditioning"))+ifNanReturnZero(form.getFieldValue("other_cost")),
            })
          } else {
            form.setFieldsValue({
              "total_cost" : 0,
            })
          }
        }

			}
		}

  	},[form,])


  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Logistic Details</Divider>
      <Form
        onFinish={submit}
        form={form}
        initialValues={
          { ...state }
        }
        layout='vertical'
        onFieldsChange={handleFieldsChange}
        // hideRequiredMark
        autoComplete='off'
      >
        <Row style={{ justifyContent: 'left' }}>
          {logisticCreateCPFormFields.slice(0, 4).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {item.customLabel}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {logisticCreateCPFormFields.slice(0, 4).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {logisticCreateCPFormFields.slice(4, 8).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {item.customLabel}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {logisticCreateCPFormFields.slice(4, 8).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {logisticCreateCPFormFields.slice(8, 9).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {item.customLabel}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {logisticCreateCPFormFields.slice(8, 9).map((item, idx) => (
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

export default LogisticCreateCPForm;

