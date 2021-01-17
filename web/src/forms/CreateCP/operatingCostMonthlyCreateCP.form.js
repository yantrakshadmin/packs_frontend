import React, { useEffect, useState, useCallback } from 'react';
import { Form, Col, Row, Button, Divider, Spin, notification } from 'antd';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CREATE_CP_DATA, STOP_STEP_LOADING } from 'common/actions';
import { operatingCostMonthlyFormFields } from 'common/formFields/createCP/operatingCostMonthly.formFields';
import { getFieldsByColumn, } from 'common/constants/solutionproposalCreateCP';
import { createCP, editCP } from 'common/api/auth';

import { ifNanReturnZero } from 'common/helpers/mrHelper';
import _ from 'lodash';


export const LogisticCreateCPForm = ({ id, onCancel,onDone,active,onNext }) => {
  const [loading,setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state =  useSelector(e=>(e.data.createCPData))


  const submit = async (data) =>{
    setLoading(true)
    console.log(data,'data to be submitted')
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
          notification.success({
            message: 'CP Created/Edited Successfully.',
          });
        }
      }
    }}

  useEffect( ()=>{
    if(active!==3){
      form.submit()
      dispatch({ type:STOP_STEP_LOADING })
    }
  },[active])

  const updateDirectCost = useCallback(() => {
    if (form.getFieldValue('standard_assets') && form.getFieldValue('insert_type') && form.getFieldValue("kit_based_on_usage_ratio")) {
      let directCost = 0;
      const depCostCols = getFieldsByColumn(form.getFieldValue('standard_assets'),form.getFieldValue('insert_type'),'dep_cost');
      console.log(depCostCols,'depCostCols')
      depCostCols.forEach((i) => {
        console.log(form.getFieldValue(i),i);
        directCost += form.getFieldValue(i);
      })
      console.log(directCost,'directCost')
      directCost /=form.getFieldValue("kit_based_on_usage_ratio");
      console.log(directCost,'again dC')
      form.setFieldsValue({
        "direct_cost" : _.round(directCost,2),
      })
    } else {
      form.setFieldsValue({
        "direct_cost" : 0,
      })
    }
  },[form])

  const updateOperatingCost = useCallback(() => {
    if (form.getFieldValue("total_cost")) {
      form.setFieldsValue({
        "operating_cost" : _.round(form.getFieldValue("total_cost"),2),
      })
    } else {
      form.setFieldsValue({
        "operating_cost" : 0,
      })
    }
  },[form])

  const updateContingencyMargin = useCallback(() => {
    if (form.getFieldValue("operating_cost") && form.getFieldValue("direct_cost")) {
      form.setFieldsValue({
        "contigency_margin" : _.round((form.getFieldValue("operating_cost")+form.getFieldValue("direct_cost"))*0.02,2),
      })
    } else {
      form.setFieldsValue({
        "contigency_margin" : 0,
      })
    }
  },[form])

  const updateMinCostToBillForATrip = useCallback(() => {
    if (form.getFieldValue("operating_cost") && form.getFieldValue("direct_cost") && form.getFieldValue("contigency_margin")) {
      form.setFieldsValue({
        "min_cost_for_trip" : _.round(form.getFieldValue("operating_cost")+form.getFieldValue("direct_cost")+form.getFieldValue("contigency_margin"),2),
      })
    } else {
      form.setFieldsValue({
        "min_cost_for_trip" : 0,
      })
    }
  },[form])

  const updatePriceShouldBeBilled = useCallback(() => {
    if (form.getFieldValue("min_cost_for_trip")) {
      form.setFieldsValue({
        "billing_price" : _.round(form.getFieldValue("min_cost_for_trip")/0.8,2),
      })
    } else {
      form.setFieldsValue({
        "billing_price" : 0,
      })
    }
  },[form])

  const updateMarginAgreedForThisFlow = useCallback(() => {
    if (form.getFieldValue("trip_cost") && form.getFieldValue("min_cost_for_trip")) {
      form.setFieldsValue({
        "agreed_margin" : _.round((form.getFieldValue("trip_cost")/form.getFieldValue("min_cost_for_trip")-1)*100,2),
      })
    } else {
      form.setFieldsValue({
        "agreed_margin" : 0,
      })
    }
  },[form])

  const updateGrossMargins = useCallback(() => {
    if (form.getFieldValue("trip_cost") && form.getFieldValue("operating_cost")) {
      form.setFieldsValue({
        "gross_margins" : _.round(((form.getFieldValue("trip_cost")-form.getFieldValue("operating_cost"))/form.getFieldValue("trip_cost")*100),2),
      })
    } else {
      form.setFieldsValue({
        "gross_margins" : 0,
      })
    }
  },[form])

  useEffect( () => {
    updateDirectCost();
    updateOperatingCost();
    updateContingencyMargin();
    updateMinCostToBillForATrip();
    updatePriceShouldBeBilled();
    updateMarginAgreedForThisFlow();
    updateGrossMargins();
  }, [] )

  const handleFieldsChange = useCallback(data => {

    if(data[0]){
      if(data[0].name) {

        const currentInputField = data[0].name[0];
        console.log(currentInputField);

        if (currentInputField==="trip_cost") {
          updateMarginAgreedForThisFlow();
          updateGrossMargins();
        }

      }
    }

  	},[form,])


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
        onFieldsChange={handleFieldsChange}
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

