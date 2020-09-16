import React, { useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin} from 'antd';
import { PREPBasicDetailsFormFields } from 'common/formFields/PFEP/PFEPBasicDetails.formFields';
import formItem from 'hocs/formItem.hoc';
import { useDispatch } from 'react-redux';
import { ADD_PFEP_DATA } from 'common/actions';
import { PREPCreationFormFields } from 'common/formFields/PFEP/PFEPCreation.formFields';

export const PFEPCreationForm = ({ id, onCancel,onDone,onNext }) => {
  const [loading,setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const submit = async (data) =>{
    setLoading(true)
    await dispatch({ type:ADD_PFEP_DATA,data });
    setLoading(false)
    onNext();
  }

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>PFEP Creation</Divider>
      <Form
        onFinish={submit}
        form={form}
        layout='vertical'
        hideRequiredMark
        autoComplete='off'
      >
        <Row style={{ justifyContent: 'left' }}>
          {PREPCreationFormFields.slice(0, 3).map((item, idx) => (
            <Col span={8}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {PREPCreationFormFields.slice(3, 5).map((item, idx) => (
            <Col span={8}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          <Button type='primary' htmlType='submit'>
            Next
          </Button>
          <div className='p-2' />
          <Button type='primary' onClick={onDone}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};

export default PFEPCreationForm;

