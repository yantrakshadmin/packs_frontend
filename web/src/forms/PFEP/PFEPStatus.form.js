import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin,Menu, notification, Dropdown } from 'antd';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PFEP_DATA, STOP_STEP_LOADING } from 'common/actions';
import {
  CloseOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { createPFEP, editPFEP } from 'common/api/auth';
import { PFEPStatusFormFields } from 'common/formFields/PFEP/PFEPStatus.formFields';

const { Item }  = Menu;

export const PFEPStatusForm = ({ id, onCancel,active,onDone }) => {
  const [loading,setLoading] = useState(false);
  const [dropdownVisible,setDropdownVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state =  useSelector(e=>(e.data.pfepData))


  const submit = async (data) =>{
    setLoading(true)
    await dispatch({ type:ADD_PFEP_DATA,data });
    setLoading(false)
    if(active === 5){
      if(id){
        const { error } = await editPFEP(id,{ ...state,...data });
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
        const { error } = await createPFEP({ ...state,...data });
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
    }}
  useEffect( ()=>{
    if(active!==5){
      form.submit()
      dispatch({ type:STOP_STEP_LOADING })
    }
  },[active])
  const menu = (
    <Menu onClick={(e)=>{if(e.key==='close'){setDropdownVisible(false)}}}>
      <Item key='close'>
        <div className='row justify-between align-center'>
          Close
          <CloseOutlined />
        </div>
      </Item>
      {PFEPStatusFormFields.slice(0,11).map((item, idx) => (
        <Item key={idx.toString()}>
          <div className='row justify-between'>
            <div style={{ flexWrap:'wrap',marginRight:'5px' }}>
              {item.customLabel}
              {' '}
            </div>
            {formItem(item)}
          </div>
        </Item>
      ))}
    </Menu>
  )
  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Status</Divider>
      <Form
        onFinish={submit}
        initialValues={state}
        form={form}
        layout='vertical'
        // hideRequiredMark
        autoComplete='off'
      >
        <Row style={{ justifyContent: 'left' }}>
          {PFEPStatusFormFields.slice(11,12).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
          {' '}
          <Col span={5}>
            <div className='p-2'>
              <Dropdown
                trigger={['click']}
                overlay={menu}
                onVisibleChange={(e)=>{setDropdownVisible(e)}}
                visible={dropdownVisible}
              >
                <Button className='ant-dropdown-link' onClick={e => e.preventDefault()}>
                  Select Status
                  {' '}
                  <DownOutlined />
                </Button>
              </Dropdown>
            </div>
            <br />
            <br />
            <br />
          </Col>
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

export default PFEPStatusForm;

