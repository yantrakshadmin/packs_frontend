import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin, Tag } from 'antd';
import { ArrowRightOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_CREATE_CP_BASIC_DATA,
  ADD_CREATE_CP_DATA,
  STOP_STEP_LOADING,
} from 'common/actions';
import { formListSolutionProposalCreateCPFormFields, solutionProposalCreateCPFormFields }
  from 'common/formFields/createCP/solutionProposalCreateCP.formFields';
import { getSpecifications } from 'common/constants/solutionproposalCreateCP';

export const SolutionProposalCreateCPForm = ({ id, onCancel,lead,onNext,active }) => {
  const [loading,setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state =  useSelector(e=>(e.data.createCPData))

  const submit = async (data) =>{
    setLoading(true)
    await dispatch({ type:ADD_CREATE_CP_DATA,
      data:{ ...data } });
    setLoading(false)
    if(active === 1){
      onNext();
    }
  }

  useEffect( ()=>{
    if(active!==1){
      form.submit()
      dispatch({ type:STOP_STEP_LOADING })
    }
  },[active])
  const handleFieldsChange = (data) => {
    if(data[0]){
      if(data[0].name){
        if(data[0].name[0]==='standard_assets') {
          console.log(data[0].name[0], data, 'this one');
          form.setFieldsValue({ solutions:getSpecifications(data[0].value) })
        }}}
  }

  return (
    <Spin spinning={loading}>
      <Form
        initialValues={{ ...state }}
        onFinish={submit}
        form={form}
        layout='vertical'
        // hideRequiredMark
        onFieldsChange={handleFieldsChange}
        autoComplete='off'
      >
        <Divider orientation='left'>Capex</Divider>
        <div className='row px-2'>
          {state.solution_flc ? <Tag>FLC</Tag> : null}
          {state.solution_fsc ? <Tag>FSC</Tag> : null}
          {state.solution_crate ? <Tag>Crate</Tag> : null}
          {state.solution_ppbox ? <Tag>PP Box</Tag> : null}
          {state.solution_palletized_box ? <Tag>Solution Palletized Box</Tag> : null}
          {state.solution_palletized_crate? <Tag>Solution Palletized Crate</Tag> : null}
          {state.solution_pp ? <Tag>Solution PP</Tag> : null}
          {state.solution_stacking_nesting ? <Tag>Solution Stacking Nesting</Tag> : null}
          {state.solution_wp ? <Tag>Solution WP</Tag> : null}
        </div>
        <Row style={{ justifyContent: 'left' }}>
          {solutionProposalCreateCPFormFields.map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Form.List name='solutions'>
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align='middle'>
                    {formListSolutionProposalCreateCPFormFields.slice(0,1).map((item) => (
                      <Col span={4}>
                        <div className='p-2'>
                          {formItem({
                            ...item,
                            noLabel: index !== 0,
                            form,
                            others: {
                              formOptions: {
                                ...field,
                                // hidden:true,
                                name: [field.name, item.key],
                                fieldKey: [field.fieldKey, item.key],
                              },
                            },
                          })}
                        </div>
                      </Col>
                    ))}
                    {formListSolutionProposalCreateCPFormFields.slice(1,7).map((item) => (
                      <Col span={3}>
                        <div className='p-2'>
                          {formItem({
                            ...item,
                            noLabel: index !== 0,
                            form,
                            others: {
                              formOptions: {
                                ...field,
                                name: [field.name, item.key],
                                fieldKey: [field.fieldKey, item.key],
                              },
                            },
                          })}
                        </div>
                      </Col>
                    ))}
                  </Row>
                ))}
              </div>
            );
          }}
        </Form.List>
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

export default SolutionProposalCreateCPForm;

