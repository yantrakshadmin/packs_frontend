import React, {useState} from 'react';
import {Form, Col, Row, Button, Divider, Spin, message} from 'antd';
import {
  GRNFormFields,
  GRNItemFormFields,
  RegenerateGRNFields01,
  RegenerateGRNFields02,
} from 'common/formFields/GRN.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createRegGRN, editRegGRN, retrieveRegGRN} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import moment from 'moment';
import formItem from '../hocs/formItem.hoc';

import _ from 'lodash';
import {filterActive} from 'common/helpers/mrHelper';

export const GRNForm = ({id, onCancel, onDone}) => {
  const {data: warehouses} = useAPI('/warehouse/', {});
  const {data: products} = useAPI('/products/', {});

  const {form, submit, loading} = useHandleForm({
    create: createRegGRN,
    edit: editRegGRN,
    retrieve: retrieveRegGRN,
    success: 'GRN created/edited successfully.',
    failure: 'Error in creating/editing GRN.',
    done: onDone,
    close: onCancel,
    id,
    dates: ['date'],
  });

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">GRN Details</Divider>
      <Form onFinish={submit} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row style={{justifyContent: 'left'}}>
          {RegenerateGRNFields01.slice(0, 1).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {RegenerateGRNFields01.slice(1, 2).map((item, idx) => (
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
                    selectOptions: filterActive(_, warehouses) || [],
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

        <Divider orientation="left">Product Details</Divider>
        <Form.List name="items">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align="middle">
                    {GRNItemFormFields.slice(0, 1).map((item) => (
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
                              selectOptions: filterActive(_, products) || [],
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
                    {GRNItemFormFields.slice(1, 2).map((item) => (
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
                    {GRNItemFormFields.slice(3).map((item) => (
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
                    <Col span={3}>
                      <Button
                        type="danger"
                        style={index != 0 ? {top: '-2vh'} : null}
                        onClick={() => {
                          remove(field.name);
                        }}>
                        <MinusCircleOutlined /> Delete
                      </Button>
                    </Col>
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
