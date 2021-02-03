import React, {useState} from 'react';
import {Form, Col, Row, Button, Divider, Spin, message} from 'antd';
import {wareHouseFormFields} from 'common/formFields/warehouse.formFields';
import {useHandleForm} from 'hooks/form';
import {createWarehouse, editWarehouse, retrieveWarehouse} from 'common/api/auth';
import formItem from '../hocs/formItem.hoc';

export const WareHouseForm = ({id, onCancel, onDone}) => {
  const [reqFile, setFile] = useState(null);

  const {form, submit, loading} = useHandleForm({
    create: createWarehouse,
    edit: editWarehouse,
    retrieve: retrieveWarehouse,
    success: 'Warehouse created/edited successfully.',
    failure: 'Error in creating/editing warehouse.',
    done: onDone,
    close: onCancel,
    id,
  });

  const handleFieldsChange = (data = null) => {
    if (data)
      if (data[0])
        if (data[0].name)
          if (data[0].name[0])
            if (data[0].name[0] === 'gst' || data[0].name[0] === 'pan') {
              const val = data[0].value.toUpperCase();
              form.setFieldsValue({[data[0].name[0]]: val});
            }
  };

  const preProcess = (data) => {
    if (reqFile) {
      data.document = reqFile.originFileObj;
    } else delete data.document;
    const req = new FormData();
    for (const key in data) {
      req.append(key.toString(), data[key]);
    }
    submit(req);
  };

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Warehouse Details</Divider>
      <Form
        onFinish={preProcess}
        initialValues={{active: true}}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        onFieldsChange={handleFieldsChange}>
        <Row style={{justifyContent: 'left'}}>
          {wareHouseFormFields.slice(0, 3).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {wareHouseFormFields.slice(3, 6).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem({...item})}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          {wareHouseFormFields.slice(6, 9).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          {wareHouseFormFields.slice(10, 11).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row align="center">
          {formItem({
            ...wareHouseFormFields[9],
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
        </Row>

        <Row>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <div className="p-2" />
          <Button type="primary" onClick={onCancel}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};
