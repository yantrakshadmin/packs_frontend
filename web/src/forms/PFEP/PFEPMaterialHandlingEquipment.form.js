import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin } from 'antd';
import { PREPMaterialHandlingEquipmentFormFields } from
  'common/formFields/PFEP/PFEPMaterialHandlingEquipment.formFields';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PFEP_DATA } from 'common/actions';
import { ArrowRightOutlined } from '@ant-design/icons';

export const PFEPMaterialHandlingEquipmentForm = ({ id, onCancel,onDone,onNext }) => {
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
  // useEffect(()=>{
    // form.setFieldsValue({
    //     hopt:state.hopt?state.hopt:null,
    //     dock_leveler:state.dock_leveler?state.dock_leveler:null,
    //     fork_lift:state.fork_lift?state.fork_lift:null,
    //   })
  // },[state])

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Material Handling Equipments</Divider>
      <Form
        onFinish={submit}
        form={form}
        initialValues={{
          hopt:state.hopt?state.hopt:false,
          dock_leveler:state.dock_leveler?state.dock_leveler:false,
          fork_lift:state.fork_lift?state.fork_lift:false,
        }}
        layout='vertical'
        hideRequiredMark
        autoComplete='off'
      >
        <Row style={{ justifyContent: 'left' }}>
          {PREPMaterialHandlingEquipmentFormFields.slice(0, 3).map((item, idx) => (
            <Col span={4}>
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

export default PFEPMaterialHandlingEquipmentForm;

