import React from 'react';
import { Form, Col, Row, Button, Divider, Spin } from 'antd';
import { useHandleForm } from 'hooks/form';
import { createMRStatus } from 'common/api/auth';
import { MRRejectionFormFields } from 'common/formFields/MRRejection.formFields';
import formItem from '../hocs/formItem.hoc';

export const MRRejectionForm = ({ id, onCancel, onDone,mr }) => {

  const { form, submit, loading } = useHandleForm({
    create:async (data)=>{
      console.log(data);
      const response = await createMRStatus({ ...data,mr,is_rejected:true });
      return response},
    edit: null,
    retrieve: null,
    success: 'Successfully Submitted',
    failure: 'Error in Submission',
    done: onDone,
    close: onCancel,
    id,
  });
  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Reason For Rejection</Divider>
      <Form
        onFinish={submit}
        form={form}
        layout='vertical'
        hideRequiredMark
        autoComplete='off'>
        <Row style={{ justifyContent: 'left' }}>
          {MRRejectionFormFields.slice(0,1).map((item, idx) => (
            <Col span={10}>
              <div key={idx.toString(10)} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
          {MRRejectionFormFields.slice(1,2).map((item, idx) => (
            <Col span={8}>
              <div key={idx.toString(10)} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          <Button type='primary' htmlType='submit'>
            Save
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

export default MRRejectionForm;
