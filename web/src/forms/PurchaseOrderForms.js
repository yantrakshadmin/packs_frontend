import React, {useState} from 'react';
import {Form, Col, Row, Button, Divider, Spin, message} from 'antd';
import {
  PurchaseOrdersFormFields,
  PurchaseOrderItemFormFields,
} from 'common/formFields/PurchaseOrderFormfields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createPurchseOrder, editPurchaseOrder, retrievePurchaseOrder} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import moment from 'moment';
import formItem from '../hocs/formItem.hoc';

import _ from 'lodash';
import {filterActive} from 'common/helpers/mrHelper';

export const PurchaseOrderForm = ({id, onCancel, onDone}) => {
  const {data: vendors} = useAPI('/vendors/', {});
  const {data: warehouses} = useAPI('/warehouse/', {});
  const {data: products} = useAPI('/products/', {});

  const preProcessData = (data) => {
    const newdata = {...data, amount: data.amount.toString(), gst: data.gst.toString()};
    return newdata;
  };

  const {form, submit, loading} = useHandleForm({
    create: createPurchseOrder,
    edit: editPurchaseOrder,
    retrieve: retrievePurchaseOrder,
    success: 'Purchase Order created/edited successfully.',
    failure: 'Error in creating/editing PUrchase Order.',
    done: onDone,
    close: onCancel,
    id,
    dates: ['expected_delivery'],
    customHandling: preProcessData,
  });

  const checkfields = (data) => {
    console.log('data inside change is ', data);
    const d = form.getFieldValue('items');
    const name = data[0].name[2];
    const value = data[0].value;
    const index = data[0].name[1];
    let priceperunit;
    if (products !== null && products !== undefined) {
      (products?.results || []).forEach((prod) => {
        if (prod.id === value && name === 'item') {
          priceperunit = prod.priceperunit;
        }
      });
    }
    if (name === 'item') {
      if (d) {
        const newd = d.map((oned) => {
          if (oned) {
            if (oned.item === value) {
              oned.item_price = priceperunit;
              return oned;
            }
            return oned;
          }
        });
        form.setFieldsValue('items', newd);
      }
    }
  };
  //
  // const preProcess = (data) => {
  //   if (reqFile) {
  //     data.document = reqFile.originFileObj;
  //   } else delete data.document;
  //   const req = new FormData();
  //   for (const key in data) {
  //     console.log(key, typeof data[key]);
  //     if (key === 'inward_date') {
  //       const value = moment(data[key]).format('YYYY-MM-DD HH:mm');
  //       req.append(key.toString(), value.toString());
  //     } else if (typeof data[key] === 'object' && key != 'document') {
  //       // let value = new Blob([JSON.stringify(data[key])], {type: 'application/json'});
  //       req.append(key.toString(), JSON.stringify(data[key]));
  //     } else req.append(key.toString(), data[key]);
  //   }
  //   submit(req);
  // };

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Purchase Order Details</Divider>
      <Form
        onFinish={submit}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        onFieldsChange={checkfields}>
        <Row style={{justifyContent: 'left'}}>
          {PurchaseOrdersFormFields.slice(0, 1).map((item, idx) => (
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
                    selectOptions: vendors?.results
                      ? filterActive(_, vendors?.results).filter((vendor) => vendor.type === 'Material')
                      : [],
                    customTitle: 'name',
                    dataKeys: ['street', 'city'],
                  },
                })}
              </div>
            </Col>
          ))}
          {PurchaseOrdersFormFields.slice(1, 2).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {PurchaseOrdersFormFields.slice(2, 3).map((item, idx) => (
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
                    selectOptions: filterActive(_, warehouses?.results) || [],
                    key: 'id',
                    customTitle: 'name',
                    dataKeys: ['address', 'city'],
                    showSearch: true,
                  },
                })}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {PurchaseOrdersFormFields.slice(4, 8).map((item, idx) => (
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
                {fields.map((field, index) => (
                  <Row align="middle">
                    {PurchaseOrderItemFormFields.slice(0, 1).map((item) => (
                      <Col span={7}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              placeholder: 'Select',
                              type: 'number',
                              showSearch: true,
                              filterOption: (input, option) =>
                                option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                            },
                            others: {
                              selectOptions: filterActive(_, products?.results) || [],
                              key: 'id',
                              dataKeys: ['name', 'description', 'category'],
                              customTitle: 'short_code',
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
                    {PurchaseOrderItemFormFields.slice(1, 3).map((item) => (
                      <Col span={7}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            noLabel: index != 0,
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
                      style={index != 0 ? {top: '-2vh'} : null}
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
