import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin } from 'antd';
import { PREPExistingPMFormFields } from 'common/formFields/PFEP/PFEPExsitingPM.formFields';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PFEP_DATA } from 'common/actions';
import { PREPCreationFormFields } from 'common/formFields/PFEP/PFEPCreation.formFields';
import { ArrowRightOutlined } from '@ant-design/icons';

export const PFEPExsitingPMForm = ({ id, onCancel,onDone,onNext }) => {
  const [loading,setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state =  useSelector(e=>(e.data.pfepData))

  useEffect(()=>{
    // form.setFieldsValue({
    //     packaging_type:state.packaging_type?state.packaging_type:null,
    //     packaging_length:state.packaging_length?state.packaging_length:null,
    //     packaging_breadth:state.packaging_breadth?state.packaging_breadth:null,
    //     packaging_height:state.packaging_height?state.packaging_height:null,
    //     pocket_length:state.pocket_length?state.pocket_length:null,
    //     pocket_breadth:state.pocket_breadth?state.pocket_breadth:null,
    //     pocket_height:state.pocket_height?state.pocket_height:null,
    //     inserts_pm:state.inserts_pm?state.inserts_pm:null,
    //     paerts_per_layer:state.paerts_per_layer?state.paerts_per_layer:null,
    //     total_parts_per_pm:state.total_parts_per_pm?state.total_parts_per_pm:null,
    //     pm_loaded_weight:state.pm_loaded_weight?state.pm_loaded_weight:null,
    //     price_per_unit:state.price_per_unit?state.price_per_unit:null,
    //     remarks:state.remarks?state.remarks:null,
    //   })
  },[state])

  const submit = async (data) =>{
    setLoading(true)
    await dispatch({ type:ADD_PFEP_DATA,data });
    setLoading(false)
    onNext();
  }

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Existing Package Material</Divider>
      <Form
        onFinish={submit}
        form={form}
        // initialValues={{
        //   packaging_type:state.packaging_type?state.packaging_type:null,
        //   packaging_length:state.packaging_length?state.packaging_length:null,
        //   packaging_breadth:state.packaging_breadth?state.packaging_breadth:null,
        //   packaging_height:state.packaging_height?state.packaging_height:null,
        //   pocket_length:state.pocket_length?state.pocket_length:null,
        //   pocket_breadth:state.pocket_breadth?state.pocket_breadth:null,
        //   pocket_height:state.pocket_height?state.pocket_height:null,
        //   inserts_pm:state.inserts_pm?state.inserts_pm:null,
        //   paerts_per_layer:state.paerts_per_layer?state.paerts_per_layer:null,
        //   total_parts_per_pm:state.total_parts_per_pm?state.total_parts_per_pm:null,
        //   pm_loaded_weight:state.pm_loaded_weight?state.pm_loaded_weight:null,
        //   price_per_unit:state.price_per_unit?state.price_per_unit:null,
        //   remarks:state.remarks?state.remarks:null,
        // }}
        layout='vertical'
        hideRequiredMark
        autoComplete='off'
      >
        <Row style={{ justifyContent: 'left' }}>
          {PREPExistingPMFormFields.slice(0, 4).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {PREPExistingPMFormFields.slice(4, 8).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {PREPExistingPMFormFields.slice(8, 11).map((item, idx) => (
            <Col span={8}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {PREPExistingPMFormFields.slice(11, 13).map((item, idx) => (
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

export default PFEPExsitingPMForm;

