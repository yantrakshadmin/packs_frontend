import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin, notification } from 'antd';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PFEP_DATA } from 'common/actions';
import { PREPSolutionRequiredFormFields }
  from 'common/formFields/PFEP/PFEPSolutionRequired.formFields';
import { createPFEP, editPFEP } from 'common/api/auth';

export const PFEPSolutionRequiredForm = ({ id, onCancel,onDone,onNext }) => {
  const [loading,setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state =  useSelector(e=>(e.data.pfepData))


  const submit = async (data) =>{
    setLoading(true)
    await dispatch({ type:ADD_PFEP_DATA,data });
    setLoading(false)
    if(id){
      const { error } = await editPFEP(id,{...state,...data});
      if (error) {
        notification.warning({
          message: 'Unable To Edit.',
          description:
            'Something went wrong PFEP editing failed.',
        });
        onCancel();
      } else {
        onDone();
      }
    }
    else{
      const { error } = await createPFEP({...state,...data});
      if (error) {
        notification.warning({
          message: 'Unable To Create.',
          description:
            'Something went wrong PFEP creation failed.',
        });
        onCancel();
      } else {
        onDone();
      }
    }
  }
  // useEffect(()=>{
    // form.setFieldsValue({
    //     solution_flc:state.solution_flc?state.solution_flc:null,
    //     solution_fsc:state.solution_fsc?state.solution_fsc:null,
    //     solution_crate:state.solution_crate?state.solution_crate:null,
    //     solution_ppbox:state.solution_ppbox?state.solution_ppbox:null,
    //     part_orientation:state.part_orientation?state.part_orientation:null,
    //     parts_pm:state.parts_pm?state.parts_pm:null,
    //     status:state.status?state.status:null,
    //   })
  // },[state])
  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Solution Required</Divider>
      <Form
        onFinish={submit}
        form={form}
        initialValues={{
          solution_flc:state.solution_flc?state.solution_flc:false,
          solution_fsc:state.solution_fsc?state.solution_fsc:false,
          solution_crate:state.solution_crate?state.solution_crate:false,
          solution_ppbox:state.solution_ppbox?state.solution_ppbox:false,
          part_orientation:state.part_orientation?state.part_orientation:null,
          parts_pm:state.parts_pm?state.parts_pm:null,
          status:state.status?state.status:null,
        }}
        layout='vertical'
        hideRequiredMark
        autoComplete='off'
      >
        <Row style={{ justifyContent: 'left' }}>
          {PREPSolutionRequiredFormFields.slice(4, 7).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {PREPSolutionRequiredFormFields.slice(0, 4).map((item, idx) => (
            <Col span={2}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
          <div className='p-2' />
          <Button type='primary' onClick={onCancel}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};

export default PFEPSolutionRequiredForm;

