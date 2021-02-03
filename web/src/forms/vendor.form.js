import React from 'react';
import {Form, Col, Row, Button, Divider, Spin} from 'antd';
import {vendorFormFields} from 'common/formFields/vendor.formFields';
import {useHandleForm} from 'hooks/form';
import {createVendor, editVendor, retrieveVendor} from 'common/api/auth';
import formItem from '../hocs/formItem.hoc';

export const VendorForm = ({id, onCancel, onDone}) => {
  const {form, submit, loading} = useHandleForm({
    create: createVendor,
    edit: editVendor,
    retrieve: retrieveVendor,
    success: 'Vendor created/edited successfully.',
    failure: 'Error in creating/editing vendor.',
    done: onDone,
    close: onCancel,
    id,
  });

  const handleFieldsChange = (data) => {
    console.log(data);

    if (data)
      if (data[0])
        if (data[0].name)
          if (data[0].name[0])
            if (data[0].name[0] === 'gst' || data[0].name[0] === 'pan') {
              const val = data[0].value.toUpperCase();
              form.setFieldsValue({[data[0].name[0]]: val});
            }
  };

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Vendor Details</Divider>
      <Form
        onFinish={submit}
        form={form}
        initialValues={{active: true}}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        onFieldsChange={handleFieldsChange}>
        <Row>
          {' '}
          <Col span={24}>{formItem(vendorFormFields[0])}</Col>
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {vendorFormFields.slice(1, 3).map((item, idx) => (
            <Col span={12}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {vendorFormFields.slice(3, 7).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({item})}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          {vendorFormFields.slice(7, 11).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          {vendorFormFields.slice(11, 15).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          {vendorFormFields.slice(15, 19).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          <Col span={6} />
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
