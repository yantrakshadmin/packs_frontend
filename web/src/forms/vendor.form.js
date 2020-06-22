import React from 'react';
import {Form, Col, Row, Button, Divider, Spin} from 'antd';
import formItem from '../hocs/formItem.hoc';
import {vendorFormFields} from 'common/formFields/vendor.formFields';
// import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createVendor, editVendor, retrieveVendor} from 'common/api/auth';

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

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Product Details</Divider>
      <Form onFinish={submit} form={form} layout="vertical" hideRequiredMark autoComplete="off">
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
                {formItem({...item})}
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
          {vendorFormFields.slice(15, 18).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          <Col span={6}></Col>
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
