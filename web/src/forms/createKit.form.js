import React from 'react';
import {Form, Col, Row, Button, Divider, Spin, Typography} from 'antd';
import {formItem} from '../hocs/formItem.hoc';
import {kitFormFields} from 'common/formFields/kit.formFields';
import {kitProductsFormFields} from 'common/formFields/kitProducts.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createKit, retrieveKit, editKit, retrieveClients} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';

export const KitForm = ({id, onCancel, onDone}) => {
  const {data: clients} = useAPI('/clients/', {});
  const {data: products} = useAPI('/products/', {});
  const {form, submit, loading} = useHandleForm({
    create: createKit,
    edit: editKit,
    retrieve: retrieveKit,
    success: 'Product created/edited successfully.',
    failure: 'Error in creating/editing product.',
    done: onDone,
    close: onCancel,
    id,
  });

  const preProcess = (data) => {
    const {products} = data;
    const newProducts = products.map((prod) => ({
      product: Number(prod.product),
      quantity: Number(prod.quantity),
    }));
    data['products'] = newProducts;
    console.log(data);
    submit(data);
  };

  const othersClients = {
    selectOptions: clients || [],
    key: 'user',
    customTitle: 'client_name',
  };

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Kit Details</Divider>
      <Form onFinish={preProcess} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row style={{justifyContent: 'left'}}>
          {kitFormFields.slice(0, 2).map((item, idx) => (
            <Col span={12}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {kitFormFields.slice(2, 3).map((item, idx) => (
            <Col span={12}>
              <div key={idx} className="p-2">
                {formItem({...item})}
              </div>
            </Col>
          ))}
          <Col span={12}>
            <div key={4} className="p-2">
              {formItem({...kitFormFields[3], others: othersClients})}
            </div>
          </Col>
        </Row>
        <Divider orientation="left">Kit Details</Divider>

        <Form.List name="products">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field) => (
                  <Row align="middle">
                    {kitProductsFormFields.slice(0, 1).map((item) => (
                      <Col span={8}>
                        <div className="p-2">
                          {formItem({
                            ...item,
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
                    {kitProductsFormFields.slice(1, 2).map((item) => (
                      <Col span={8}>
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
