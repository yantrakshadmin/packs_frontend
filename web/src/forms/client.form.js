import React, { useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin, message, notification } from 'antd';
import { clientFormFields ,mailingListFormFields } from 'common/formFields/clientProfile.formFields';
import { useHandleForm } from 'hooks/form';
import { editClientProfile, retrieveClientProfile } from 'common/api/auth';
import formItem from '../hocs/formItem.hoc';

export const ClientForm = ({ id, onCancel, onDone }) => {
  const [reqFile, setFile] = useState(null);

  const { form, submit, loading } = useHandleForm({
    create: null,
    edit: editClientProfile,
    retrieve: retrieveClientProfile,
    success: 'Client created/edited successfully.',
    failure: 'Error in creating/editing client.',
    done: onDone,
    close: onCancel,
    id,
  });

  const handleFieldsChange = (data = null) => {
    console.log(data);

    if (data)
      if (data[0])
        if (data[0].name)
          if (data[0].name[0])
            if (data[0].name[0] === 'client_gst' || data[0].name[0] === 'client_pan') {
              const val = data[0].value.toUpperCase();
              form.setFieldsValue({ [data[0].name[0]]: val });
            }
  };

  const preProcess = (data) => {
    if (reqFile) {
      data.annexure = reqFile.originFileObj;
    } else delete data.annexure;
    const req = new FormData();
    for (const key in data) {
      req.append(key.toString(), data[key]);
    }
    submit(req);
  };

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Client Details</Divider>
      <Form
        onFinish={preProcess}
        form={form}
        layout='vertical'
        hideRequiredMark
        autoComplete='off'
        onFieldsChange={handleFieldsChange}>
        <Row align='center'>
          <Col span={24}>{formItem(clientFormFields[0])}</Col>
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {clientFormFields.slice(1, 5).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {clientFormFields.slice(5, 8).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'space-between' }}>
          {clientFormFields.slice(8, 12).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'space-between' }}>
          {clientFormFields.slice(12, 16).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'space-between' }}>
          {clientFormFields.slice(16, 20).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'space-between' }}>
          {clientFormFields.slice(21, 22).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'space-between' }}>
          {mailingListFormFields.map((item, idx) => (
            <Col span={24}>
              <div key={idx} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row align='center'>
          {formItem({
            ...clientFormFields[20],
            kwargs: {
              onChange(info) {
                const { status } = info.file;
                if (status !== 'uploading') {
                  console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                  setFile(info.file);
                  message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
                }
              },
            },
          })}
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

export default ClientForm;
