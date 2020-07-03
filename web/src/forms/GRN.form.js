import React from 'react';
import {Form, Col, Row, Button, Divider, Spin} from 'antd';
import formItem from '../hocs/formItem.hoc';
import {GRNFormFields, GRNItemFormFields} from 'common/formFields/GRN.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createGRN, editGRN, retrieveGRN} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';

export const GRNForm = ({id, onCancel, onDone}) => {
  const {data: vendors} = useAPI('/vendors/', {});
  const {data: warehouses} = useAPI('/warehouse/', {});
  const {data: products} = useAPI('/products/', {});

  const {form, submit, loading} = useHandleForm({
    create: createGRN,
    edit: editGRN,
    retrieve: retrieveGRN,
    success: 'GRN created/edited successfully.',
    failure: 'Error in creating/editing GRN.',
    done: onDone,
    close: onCancel,
    id,
  });

  //   const preProcess = (data) => {
  //     const {products} = data;
  //     const newProducts = products.map((prod) => ({
  //       product: Number(prod.product),
  //       quantity: Number(prod.quantity),
  //     }));
  //     data['products'] = newProducts;
  //     console.log(data);
  //     submit(data);
  //   };

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Kit Details</Divider>
      <Form onFinish={submit} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row style={{justifyContent: 'left'}}>
          {GRNFormFields.slice(0, 1).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  kwargs: {
                    placeholder: 'Select',
                    showSearch: true,
                    filterOption: (input, option) =>
                      option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                  },
                  others: {
                    selectOptions: warehouses || [],
                    key: 'id',
                    customTitle: 'name',
                    dataKeys: ['address', 'city'],
                    showSearch: true,
                  },
                })}
              </div>
            </Col>
          ))}
          {GRNFormFields.slice(1, 2).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  kwargs: {
                    placeholder: 'Select',
                    showSearch: true,
                    filterOption: (input, option) =>
                      option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                  },
                  others: {
                    key: 'id',
                    selectOptions: vendors
                      ? vendors.filter((vendor) => vendor.type === 'Material')
                      : [],
                    customTitle: 'name',
                    dataKeys: ['street', 'city'],
                  },
                })}
              </div>
            </Col>
          ))}
          {GRNFormFields.slice(2, 3).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  kwargs: {
                    placeholder: 'Select',
                    showSearch: true,
                    filterOption: (input, option) =>
                      option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                  },
                  others: {
                    key: 'id',
                    selectOptions: vendors
                      ? vendors.filter((vendor) => vendor.type === 'Transporter')
                      : [],
                    customTitle: 'name',
                    dataKeys: ['street', 'city'],
                  },
                })}
              </div>
            </Col>
          ))}
          {GRNFormFields.slice(3, 4).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {GRNFormFields.slice(4, 8).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({...item})}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {GRNFormFields.slice(8, 12).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({...item})}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {GRNFormFields.slice(12, 14).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({...item})}
              </div>
            </Col>
          ))}
        </Row>
        <Divider orientation="left">Product Details</Divider>
        <Form.List name="items">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field) => (
                  <Row align="middle">
                    {GRNItemFormFields.slice(0, 1).map((item) => (
                      <Col span={7}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            kwargs: {
                              placeholder: 'Select',
                              type: 'number',
                              showSearch: true,
                              filterOption: (input, option) =>
                                option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                            },
                            others: {
                              selectOptions: products || [],
                              key: 'id',
                              dataKeys: ['short_code', 'description', 'category'],
                              customTitle: 'name',
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
                    {GRNItemFormFields.slice(1, 3).map((item) => (
                      <Col span={7}>
                        <div className="p-2">
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
          <Button type="primary" onClick={onCancel}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};
