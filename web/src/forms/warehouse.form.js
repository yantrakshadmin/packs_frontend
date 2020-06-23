import React from 'react';
import {Form, Col, Row, Button, Divider, Spin} from 'antd';
import formItem from '../hocs/formItem.hoc';
import {wareHouseFormFields} from 'common/formFields/warehouse.formFields.js';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createWarehouse, editWarehouse, retrieveWarehouse} from 'common/api/auth';

export const WareHouseForm = ({id, onCancel, onDone}) => {
  const {form, submit, loading} = useHandleForm({
    create: createWarehouse,
    edit: editWarehouse,
    retrieve: retrieveWarehouse,
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
            if (data[0].name[0] === 'gst' || data[0].name[0] === 'pan') {
              let val = data[0].value.toUpperCase();
              form.setFieldsValue({[data[0].name[0]]: val});
            }
  };

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Warehouse Details</Divider>
      <Form
        onFinish={submit}
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
        <Row align="center">{formItem(wareHouseFormFields[9])}</Row>

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
