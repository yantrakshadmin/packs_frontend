import React, {useEffect, useState, useCallback} from 'react';
import {Form, Col, Row, Button, Divider, Spin, Input, Alert} from 'antd';
import {
  relocationFormFields,
  relocationFlowFormFields,
} from 'common/formFields/relocation.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createRelocation, editRelocation, retrieveRelocation} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import {useControlledSelect} from '../hooks/useControlledSelect';
import formItem from '../hocs/formItem.hoc';

import {ifNanReturnZero} from 'common/helpers/mrHelper';

import moment from 'moment';

import _ from 'lodash';
import {filterActive} from 'common/helpers/mrHelper';
import {parse} from '@fortawesome/fontawesome-svg-core';

export const RelocationForm = ({id, onCancel, onDone, isEmployee}) => {
  // const [flowId, setFlowId] = useState(null);

  const [kits, setKits] = useState([]);

  // const {data: flows} = useAPI('/myflows/', {});
  // const {data: kits} = useControlledSelect(flowId);
  const {data: vendors} = useAPI('/vendors-exp/', {});
  const {data: products, loading: ploading} = useAPI('/products/', {});
  const {data: kitsFull, loading: kloading} = useAPI('/kits/', {});
  const {data: warehouses} = useAPI('/warehouse/', {});

  useEffect(() => {
    if (!kloading) {
      const temp = kitsFull.map((k) => ({
        id: k.id,
        active: k.active,
        kit_name: k.kit_name,
        kit_info: k.kit_info,
        products: k.products.map((p) => ({
          product: p.product.id,
          short_code: p.product.short_code,
          quantity: p.quantity,
        })),
      }));
      setKits(temp);
    }
  }, [kloading]);

  const {form, submit, loading} = useHandleForm({
    create: createRelocation,
    edit: editRelocation,
    retrieve: retrieveRelocation,
    success: 'Relocation created/edited successfully',
    failure: 'Error in creating/editing Relocation.',
    done: onDone,
    close: onCancel,
    id,
    dates: ['transaction_date'],
  });

  const [selectedPK, setSelectedPK] = useState('Products');
  const [kitItems, setKitItems] = useState([]);

  useEffect(() => {
    console.log(kitItems);
  }, [kitItems]);

  useEffect(() => {
    if (id && !loading) {
      const temp = form.getFieldValue('productORkits');
      setSelectedPK(temp);
    }
  }, [loading]);

  useEffect(() => {
    if (id && !loading && !ploading) {
      const temp = form.getFieldValue('productORkits');
      if (temp === 'Kits') {
        const ki = [...kitItems];
        const iks = form.getFieldValue('items_kits');
        iks.forEach((i, idx) => {
          const x = i.items.map((j) => {
            const thisProduct = _.find(products, (p) => p.id === j.product);
            return {
              product: j.product,
              quantity: j.quantity,
              short_code: thisProduct.short_code,
            };
          });
          ki[idx] = x;
        });
        setKitItems(ki);
      }
    }
  }, [loading, ploading]);

  const preProcess = useCallback(
    (data) => {
      if (data.productORkits === 'Kits') {
        const {items_kits} = data;
        const temp = items_kits.map((ik, idx) => ({
          ...ik,
          items: kitItems[idx],
        }));
        data.items_kits = temp;
      }
      //console.log(data);
      submit(data);
    },
    [submit, kitItems],
  );

  const handleFieldsChange = useCallback(
    (data) => {
      if (data[0]) {
        if (data[0].name) {
          const thisField = data[0].name[0];
          if (thisField === 'productORkits') {
            form.setFieldsValue({items: []});
            form.setFieldsValue({items_kits: []});
            setKitItems([]);
          }
          if (
            data[0].name[0] === 'items_kits' &&
            data[0].name[2] === 'quantity' &&
            form.getFieldValue(['items_kits', data[0].name[1], 'kit'])
          ) {
            const kitID = form.getFieldValue(['items_kits', data[0].name[1], 'kit']);
            const thisKit = _.find(kits, (k) => k.id === kitID);
            if (thisKit) {
              const fieldName = data[0].name[1];
              const val = data[0].value;
              const temp = [...kitItems];
              if (val > 0) {
                temp[fieldName] = thisKit.products.map((k) => ({
                  ...k,
                  quantity: parseInt(k.quantity) * parseInt(val),
                }));
              } else if (val === '0' || val === '') {
                temp[fieldName] = thisKit.products.map((k) => ({
                  ...k,
                  quantity: 0,
                }));
              }
              setKitItems(temp);
            }
          }
        }
      }
    },
    [form, kitItems, kits],
  );

  const handleKitItemQtyChange = useCallback(
    (ev, idx, jdx) => {
      const temp = [...kitItems];
      if (ev.target.value === '' || ev.target.value < 0) {
        temp[idx][jdx].quantity = 0;
      } else {
        temp[idx][jdx].quantity = ev.target.value;
      }
      setKitItems(temp);
    },
    [kitItems],
  );

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Relocation Details</Divider>
      <Form
        onFinish={preProcess}
        form={form}
        initialValues={{productORkits: 'Products'}}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        onFieldsChange={handleFieldsChange}>
        <Row style={{justifyContent: 'left'}}>
          {relocationFormFields.slice(0, 1).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {relocationFormFields.slice(1, 3).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  others: {
                    ...item.others,
                    selectOptions: filterActive(_, warehouses) || [],
                    key: 'id',
                    dataKeys: ['address'],
                    customTitle: 'name',
                  },
                })}
              </div>
            </Col>
          ))}
          {relocationFormFields.slice(3, 4).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  others: {
                    selectOptions: filterActive(_, vendors) || [],
                    key: 'id',
                    dataKeys: ['code'],
                    customTitle: 'name',
                  },
                })}
              </div>
            </Col>
          ))}
          {relocationFormFields.slice(4, 11).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {relocationFormFields.slice(11).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  kwargs: {
                    ...item.kwargs,
                    disabled: id ? true : false,
                    onChange: (v) => setSelectedPK(v),
                  },
                })}
              </div>
            </Col>
          ))}
        </Row>

        <Divider orientation="left">
          {selectedPK === 'Products' ? 'Products Details' : 'Kits Details'}
        </Divider>

        {selectedPK === 'Products' ? (
          <Form.List name="items">
            {(fields, {add, remove}) => {
              return (
                <div>
                  {fields.map((field, index) => (
                    <Row align="middle">
                      {relocationFlowFormFields.slice(0, 1).map((item, idx) => (
                        <Col key={idx} span={item.colSpan}>
                          <div className="p-2">
                            {formItem({
                              ...item,
                              noLabel: index != 0,
                              kwargs: {
                                ...item.kwargs,
                                showSearch: true,
                                filterOption: (input, option) =>
                                  option.search
                                    .toString()
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0,
                              },
                              others: {
                                ...item.others,
                                selectOptions: filterActive(_, products) || [],
                                key: 'id',
                                customTitle: 'short_code',
                                dataKeys: ['description'],
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
                      {relocationFlowFormFields.slice(1).map((item, idx) => (
                        <Col key={idx} span={item.colSpan}>
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
                      <Col span={2}>
                        <Button
                          // style={{ width: '9vw' }}
                          style={index != 0 ? {top: '-2vh'} : null}
                          type="danger"
                          onClick={() => {
                            remove(field.name);
                          }}>
                          <MinusCircleOutlined />
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
        ) : (
          <Row gutter={20}>
            <Col span={12}>
              <Form.List name="items_kits">
                {(fields, {add, remove}) => {
                  return (
                    <div>
                      {fields.map((field, index) => (
                        <Row align="middle">
                          {relocationFlowFormFields.slice(0, 1).map((item, idx) => (
                            <Col key={idx} span={item.colSpan}>
                              <div className="p-2">
                                {formItem({
                                  ...item,
                                  key: 'kit',
                                  noLabel: index != 0,
                                  kwargs: {
                                    ...item.kwargs,
                                    showSearch: true,
                                    filterOption: (input, option) =>
                                      option.search
                                        .toString()
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0,
                                    onChange: (v) => {
                                      const thisKit = _.find(kits, (k) => k.id === v);
                                      const temp = [...kitItems];
                                      temp[field.name] = thisKit.products;
                                      setKitItems(temp);
                                    },
                                  },
                                  others: {
                                    ...item.others,
                                    selectOptions: filterActive(_, kits) || [],
                                    key: 'id',
                                    customTitle: 'kit_name',
                                    dataKeys: ['kit_info'],
                                    formOptions: {
                                      ...field,
                                      name: [field.name, 'kit'],
                                      fieldKey: [field.fieldKey, 'kit'],
                                    },
                                  },
                                  customLabel: 'Kit',
                                })}
                              </div>
                            </Col>
                          ))}
                          {relocationFlowFormFields.slice(1).map((item, idx) => (
                            <Col key={idx} span={item.colSpan}>
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
                          <Col span={2}>
                            <Button
                              // style={{ width: '9vw' }}
                              style={index != 0 ? {top: '-2vh'} : null}
                              type="danger"
                              onClick={() => {
                                remove(field.name);
                                setKitItems(kitItems.filter((i, idx) => idx !== field.name));
                              }}>
                              <MinusCircleOutlined />
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
            </Col>
            <Col span={12}>
              {kitItems.map((i, idx) => {
                return (
                  <>
                    <Row>
                      <Col span={12}>Product</Col>
                      <Col span={12}>Quantity</Col>
                    </Row>
                    {i
                      ? i.map((j, jdx) => (
                          <Input.Group compact>
                            <Input
                              style={{width: '50%'}}
                              value={kitItems[idx][jdx].short_code}
                              disabled
                            />
                            <Input
                              style={{width: '50%'}}
                              type="number"
                              onChange={(ev) => handleKitItemQtyChange(ev, idx, jdx)}
                              value={kitItems[idx][jdx].quantity}
                            />
                          </Input.Group>
                        ))
                      : null}
                    <br />
                  </>
                );
              })}
            </Col>
          </Row>
        )}

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
