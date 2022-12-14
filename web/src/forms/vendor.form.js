import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin, Alert } from 'antd';
import { vendorFormFields } from 'common/formFields/vendor.formFields';
import { useHandleForm } from 'hooks/form';
import { createVendor, editVendor, retrieveVendor, retrieveVendors } from 'common/api/auth';
import formItem from '../hocs/formItem.hoc';

const VendorForm = ({ id, onCancel, onDone }) => {
  const [allvendors, setAllVendors] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { form, submit, loading } = useHandleForm({
    create: createVendor,
    edit: editVendor,
    retrieve: retrieveVendor,
    success: 'Vendor created/edited successfully.',
    failure: 'Error in creating/editing vendor.',
    done: onDone,
    close: onCancel,
    id,
  });

 
  const getVendors = async () => {
    const { data } = await retrieveVendors({ page: 1, pageSize: 10 })
    setAllVendors(data?.results)

  }


  useEffect(() => {
    getVendors();
    //  const rdata = retrieveVendors(1,10)
    //  console.log({rdata});
    // retrieveVendors().then((response) => {
    //   console.log({response});
    //   setAllVendors([]);

  }, []);

  const handleFieldsChange = (data) => {
    console.log(data);

    if (data)
      if (data[0])
        if (data[0].name)
          if (data[0].name[0]) {
            if (data[0].name[0] === 'gst' || data[0].name[0] === 'pan') {
              const val = data[0].value.toUpperCase();
              form.setFieldsValue({ [data[0].name[0]]: val });
            } else if (data[0].name[0] === 'code') {
              let flag = 0;
              if (allvendors) {
                (allvendors || []).forEach((element) => {
                  if (element.code === data[0].value) {
                    flag = 1;
                  }
                });
                if (flag) setErrorMessage('Vendor With the Same Code Already Exists');
                else setErrorMessage('');
              }
            }
          }
  };

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Vendor Details</Divider>
      <Form
        onFinish={submit}
        form={form}
        initialValues={{ active: true }}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        onFieldsChange={handleFieldsChange}>
        <Row>
          {' '}
          <Col span={24}>{formItem(vendorFormFields[0])}</Col>
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {vendorFormFields.slice(1, 3).map((item, idx) => (
            <Col span={12}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        {errorMessage && (
          <Row justify="center" gutter={[0, 30]} style={{ marginBottom: '1rem' }}>
            <Col>
              <Alert message={errorMessage} type="warning" />
            </Col>
          </Row>
        )}
        <Row style={{ justifyContent: 'left' }}>
          {vendorFormFields.slice(3, 7).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({ item })}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'space-between' }}>
          {vendorFormFields.slice(7, 11).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'space-between' }}>
          {vendorFormFields.slice(11, 15).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'space-between' }}>
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
          <Button type="primary" htmlType="submit" disabled={errorMessage}>
            Save
          </Button>
          <div className="p-2" />
          {/* <Button type="primary" onClick={onCancel}>
            Cancel
          </Button> */}
        </Row>
      </Form>
    </Spin>
  );
};

export default VendorForm;
