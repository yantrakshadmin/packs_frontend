import React, {useEffect} from 'react';
import {Form, Col, Row, Button, Divider, Spin} from 'antd';
import formItem from '../hocs/formItem.hoc';
import {
  allotmentFormFields,
  allotmentProductFormFields,
} from 'common/formFields/allotment.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createAllotment, retrieveAllotment, editAllotment} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';

export const AllotmentMainForm = ({id, onCancel, onDone}) => {
  const {data: warehouses} = useAPI('/warehouse/', {});
  const {data: vendors} = useAPI('/vendors/', {});
  const {data: kits} = useAPI('/kits/', {});
  const {data: flows} = useAPI('/flows/', {});

  const {form, submit, loading} = useHandleForm({
    create: createAllotment,
    success: 'Allotment created/edited successfully.',
    failure: 'Error in creating/editing allotment.',
    retrieve: retrieveAllotment,
    edit: editAllotment,
    done: onDone,
    close: onCancel,
    id,
  });

  const preProcess = (data) => {
    console.log(data);
    submit(data);
  };

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Allotment Details</Divider>
      <Form onFinish={preProcess} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row style={{justifyContent: 'left'}}>
          {allotmentFormFields.slice(0, 4).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {allotmentFormFields.slice(4, 8).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          <Col span={6}>
            <div key={9} className="p-2">
              {formItem({
                ...allotmentFormFields[8],
                others: {
                  selectOptions: warehouses || [],
                  key: 'id',
                  customTitle: 'name',
                  dataKeys: ['address', 'email'],
                },
              })}
            </div>
          </Col>
          <Col span={6}>
            <div className="p-2">
              {formItem({
                ...allotmentFormFields[9],
                others: {
                  selectOptions: vendors
                    ? vendors.filter((vendor) => vendor.type === 'Transporter')
                    : [],
                  key: 'id',
                  customTitle: 'name',
                  dataKeys: ['city', 'pincode'],
                },
              })}
            </div>
          </Col>
          {allotmentFormFields.slice(10, 12).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Divider orientation="left">Product Details</Divider>

        <Form.List name="flows">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field) => (
                  <Row align="middle">
                    <Col span={6}>
                      <div className="p-2">
                        {formItem({
                          ...allotmentProductFormFields[0],
                          others: {
                            selectOptions: flows || [],
                            customTitle: 'flow_name',
                            key: 'id',
                            formOptions: {
                              ...field,
                              name: [field.name, 'flow'],
                              fieldKey: [field.fieldKey, 'flow'],
                            },
                          },
                        })}
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="p-2">
                        {formItem({
                          ...allotmentProductFormFields[1],
                          others: {
                            selectOptions: kits || [],
                            customTitle: 'kit_name',
                            key: 'id',
                            formOptions: {
                              ...field,
                              name: [field.name, 'kit'],
                              fieldKey: [field.fieldKey, 'kit'],
                            },
                          },
                        })}
                      </div>
                    </Col>
                    {allotmentProductFormFields.slice(2, 4).map((item, idx) => (
                      <Col span={6}>
                        <div key={idx} className="p-2">
                          {formItem({
                            ...item,
                            others: {
                              formOptions: {
                                ...field,
                                name: [field.name, item.key],
                                fieldKey: [field.fieldKey, item.key],
                              },
                            },
                          })}
                        </div>
                      </Col>
                    ))}
                    <Button
                      type="danger"
                      onClick={() => {
                        remove(field.name);
                      }}>
                      <MinusCircleOutlined /> Delete
                    </Button>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block>
                    <PlusOutlined /> Add Item
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
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
