import React, {useEffect, useState} from 'react';
import {Form, Col, Row, Button, Divider, Spin} from 'antd';
import {clientFormFields} from 'common/formFields/employeeProfile.formFields';
import {useHandleForm} from 'hooks/form';
import {editEmployeeProfile, retrieveEmployeeProfile} from 'common/api/auth';
import formItem from '../hocs/formItem.hoc';

const EmployeeForm = ({id, onCancel, onDone}) => {
  const [reqFile, setFile] = useState(null);

  const {form, submit, loading} = useHandleForm({
    create: null,
    edit: editEmployeeProfile,
    retrieve: retrieveEmployeeProfile,
    success: 'Employee created/edited successfully.',
    failure: 'Error in creating/editing Employee.',
    done: onDone,
    close: onCancel,
    id,
  });

  useEffect(() => {
    if (id && !loading) {
      const email = form.getFieldValue('employee_email');
      if (!email || email === '0') {
        form.setFieldsValue({employee_email: ''});
      }
    }
  }, [loading]);

  const handleFieldsChange = (data) => {};

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
      <Divider orientation="left">User Details</Divider>
      <Form
        onFinish={preProcess}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        onFieldsChange={handleFieldsChange}>
        <Row style={{justifyContent: 'left'}}>
          {clientFormFields.map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        {/* <Row style={{justifyContent: 'left'}}>
          {clientFormFields.slice(5, 8).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          {clientFormFields.slice(8, 12).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          {clientFormFields.slice(12, 16).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          {clientFormFields.slice(16, 20).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          {clientFormFields.slice(21, 22).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row align="center">
          {formItem({
            ...clientFormFields[20],
            kwargs: {
              onChange(info) {
                const {status} = info.file;
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
        </Row> */}

        <Row>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <div className="p-2" />
          <Button type="primary" onClick={onDone}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};

export default EmployeeForm;
