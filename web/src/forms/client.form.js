import React from 'react';
import {Form, Col, Row, Button, Divider, Spin} from 'antd';
import formItem from '../hocs/formItem.hoc';
import {clientFormFields} from 'common/formFields/clientProfile.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {editClientProfile, retrieveClientProfile} from 'common/api/auth';

export const ClientForm = ({id, onCancel, onDone}) => {
  const {form, submit, loading} = useHandleForm({
    create: null,
    edit: editClientProfile,
    retrieve: retrieveClientProfile,
    success: 'Product created/edited successfully.',
    failure: 'Error in creating/editing product.',
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
              let val = data[0].value.toUpperCase();
              form.setFieldsValue({[data[0].name[0]]: val});
            }
  };

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Client Details</Divider>
      <Form
        onFinish={submit}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        onFieldsChange={handleFieldsChange}>
        <Row align="center">
          <Col span={24}>{formItem(clientFormFields[0])}</Col>
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {clientFormFields.slice(1, 5).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {clientFormFields.slice(5, 8).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem({...item})}
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
        <Row align="center">{formItem(clientFormFields[20])}</Row>

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

export default ClientForm;
