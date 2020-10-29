import React, { useEffect, useState } from 'react';
import { Form, Col, Row,Menu ,Dropdown,Button, Divider, Spin, notification } from 'antd';
import formItem from 'hocs/formItem.hoc';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PFEP_DATA } from 'common/actions';
import { PREPSolutionRequiredFormFields }
  from 'common/formFields/PFEP/PFEPSolutionRequired.formFields';
import { createPFEP, editPFEP } from 'common/api/auth';
import { DownOutlined } from '@ant-design/icons'

const { Item }  = Menu;

export const PFEPSolutionRequiredForm = ({  onCancel,onNext }) => {
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
  const menu = (
    <Menu>
      {PREPSolutionRequiredFormFields.slice(0, 9).map((item, idx) => (
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
  );
  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Solution Required</Divider>
      <Form
        onFinish={submit}
        form={form}
        initialValues={state}
        layout='vertical'
        // hideRequiredMark
        autoComplete='off'
      >
        <Row style={{ justifyContent: 'left' }}>
          {PREPSolutionRequiredFormFields.slice(9,10).map((item, idx) => (
            <Col span={4}>
              <div key={idx.toString()} className='p-2'>
                {item.customLabel}
              </div>
            </Col>
          ))}
          {PREPSolutionRequiredFormFields.slice(10,14).map((item, idx) => (
            <Col span={5}>
              <div key={idx.toString()} className='p-2'>
                {item.customLabel}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {PREPSolutionRequiredFormFields.slice(9,10).map((item, idx) => (
            <Col span={4}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
          {PREPSolutionRequiredFormFields.slice(10,14).map((item, idx) => (
            <Col span={5}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          <Col>
            <div className='p-2'>
              <Dropdown overlay={menu} trigger={['click']}>
                <Button className='ant-dropdown-link' onClick={e => e.preventDefault()}>
                  Solution Required
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

