import React, {useEffect, useState} from 'react';
import {Button, Col, Divider, Form, Row, Spin} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {useHandleForm} from 'hooks/form';
import {createOutward, editOutward, retrieveOutward} from 'common/api/auth';
import {outwardDocketFormFields} from 'common/formFields/outwardDocket.formFields';
import {outwardDocketKitFormFields} from 'common/formFields/outwardDocketKits.formFields';
import {useAPI} from 'common/hooks/api';
import {getUniqueObject} from 'common/helpers/getUniqueValues';

import moment from 'moment';

import _ from 'lodash';
import {filterActive} from 'common/helpers/mrHelper';
import {outwardProductFormFields} from 'common/formFields/return.formFields';
import formItem from '../hocs/formItem.hoc';

const getKits = (data) => {
  return data.map((item) => ({
    kit: item.kit,
    quantity_parts: item.quantity_parts,
    quantity_kit: item.quantity_kit,
  }));
};

const getKitItems = (data, setPcc) => {
  var temp = {};
  var pccTemp = [];
  console.log(data);
  data.forEach((item, idx) => {
    temp[`items${idx}`] = item['items'] ? item.items : [];
    pccTemp.push(idx);
  });
  setPcc(pccTemp);
  return temp;
};

export const OutwardDocketForm = ({id, onCancel, onDone}) => {
  const {data: flows} = useAPI('/client-flows/');
  const {data: kits} = useAPI('/client-kits/');
  const [receiverClients, setReceiverClients] = useState([]);
  const [pcc, setPcc] = useState([]);
  const [products, setProducts] = useState(null);
  const [kitID, setKitID] = useState(null);

  useEffect(() => {
    if (flows) {
      setReceiverClients(
        filterActive(
          _,
          getUniqueObject(
            flows.map((item) => item.receiver_client),
            'id',
          ),
        ),
      );
    }
  }, [flows]);

  useEffect(() => {
    console.log(pcc);
  }, [pcc]);

  const {form, submit, loading} = useHandleForm({
    create: createOutward,
    edit: editOutward,
    retrieve: async (fetchId) => {
      const response = await retrieveOutward(fetchId);
      const {data} = response;
      const temp = getKits(data.kits);
      const kitItems = getKitItems(data.kits, setPcc);
      return {...response, data: {...data, kits: temp, ...kitItems}};
    },
    success: 'Outward Docket created/edited successfully.',
    failure: 'Error in creating/editing Outward Docket.',
    done: onDone,
    close: onCancel,
    id,
    dates: ['dispatch_date', 'transaction_date'],
  });

  useEffect(() => {
    const prods = [];
    if (kits) {
      console.log(kits, 'kits...');
      kits.forEach((k) => {
        k.products.forEach((p) => prods.push(p.product));
      });
    }
    setProducts(prods);
  }, [kits]);

  const handleFieldsChange = (data) => {
    if (data[0]) {
      if (data[0].name) {
        if (data[0].name[2] === 'quantity_parts') {
          const allkits = form.getFieldValue('kits');
          const selectedKit = kits.filter((i) => i.id === allkits[data[0].name[1]].kit);
          const q = Math.ceil(parseInt(data[0].value, 0) / selectedKit[0].components_per_kit);
          allkits[data[0].name[1]] = {
            ...allkits[data[0].name[1]],
            quantity_kit: q,
          };
          form.setFieldsValue('kits', allkits);
          if (kitID) {
            const rk = kits.filter((k) => k.id === kitID)[0];
            form.setFields([
              {
                name: [`items${data[0].name[1]}`],
                value: rk.products.map((p) => {
                  return {product: p.product.id, quantity: p.quantity * q};
                }),
              },
            ]);
          }
        }
        if (
          data[0].name[2] === 'kit' ||
          (data[0].name[2] === 'quantity_kit' &&
            data[0].errors[0] === 'Please enter quantity!' &&
            kitID)
        ) {
          if (data[0].name[2] === 'kit') setKitID(data[0].value);
          // console.log(data[0].name);
          if (kitID) {
            const rk = kits.filter((k) => k.id === kitID)[0];
            const produces = [];
            rk.products.forEach((p) => {
              produces.push({product: p.product.id, quantity: p.quantity});
            });
            form.setFields([
              {
                name: [`items${data[0].name[1]}`],
                value: produces,
              },
            ]);
          }
        }
      }
    }
  };

  const handleSubmit = (data) => {
    const tempkits = data.kits.map((k, idx) => {
      const items = data[`items${idx}`];
      delete data[`items${idx}`];
      return {
        ...k,
        items: items.map((i) => {
          return {product: i.product, quantity: i.quantity};
        }),
      };
    });
    const reqD = {...data, kits: tempkits};
    // console.log(reqD);
    submit(reqD);
  };

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Outward Docket</Divider>
      <Form
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        initialValues={{transaction_date: moment(), dispatch_date: moment(), transaction_no: 0}}
        hideRequiredMark
        autoComplete="off"
        onFieldsChange={handleFieldsChange}>
        <Row>
          {outwardDocketFormFields.slice(0, 3).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {outwardDocketFormFields.slice(3, 4).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className="p-2">
                {formItem({
                  ...item,
                  others: {
                    selectOptions: receiverClients,
                    key: 'id',
                    customTitle: 'name',
                    dataKeys: ['address'],
                  },
                })}
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          {outwardDocketFormFields.slice(4, 8).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>

        <Divider orientation="left">Kit Details</Divider>
        <Row>
          <Col span={12}>
            <Form.List name="kits">
              {(fields, {add, remove}) => {
                return (
                  <div>
                    {fields.map((field, index) => (
                      <Row align="middle">
                        {outwardDocketKitFormFields.slice(0, 1).map((item) => (
                          <Col span={6}>
                            <div className="p-2">
                              {formItem({
                                ...item,
                                noLabel: index != 0,
                                kwargs: {
                                  placeholder: 'Select',
                                  showSearch: true,
                                  filterOption: (input, option) =>
                                    option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                                },
                                form,
                                others: {
                                  selectOptions: filterActive(_, kits) || [],
                                  key: 'id',
                                  dataKeys: ['components_per_kit', 'kit_info', 'kit_name'],
                                  customTitle: 'kit_name',
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
                        {outwardDocketKitFormFields.slice(1, 3).map((item) => (
                          <Col span={6}>
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
                                form,
                              })}
                            </div>
                          </Col>
                        ))}
                        <Button
                          type="danger"
                          style={index != 0 ? {top: '-2vh'} : null}
                          onClick={() => {
                            // console.log(field.name);
                            const temp = pcc.filter((p, idx) => idx != field.name);
                            const temp1 = temp.map((t) => {
                              if (t > field.name) {
                                const tdata = form.getFieldValue([`items${t}`]);
                                form.setFields([
                                  {
                                    name: [`items${t - 1}`],
                                    value: tdata,
                                  },
                                ]);
                                return --t;
                              }
                              return t;
                            });
                            form.resetFields([`items${pcc.length - 1}`]);
                            setPcc([...temp1]);
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
                          setPcc([...pcc, pcc.length]);
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
          <Col span={1} />
          <Col span={11}>
            {pcc.map((p, idx) => (
              <Form.List name={`items${p}`}>
                {(fields, {add, remove}) => {
                  return (
                    <div>
                      {fields.map((field, ind) => (
                        <Row align="middle">
                          {outwardProductFormFields.slice(0, 1).map((item) => (
                            <Col span={12}>
                              <div className="p-2">
                                {formItem({
                                  ...item,
                                  noLabel: ind != 0,
                                  others: {
                                    selectOptions: products || [],
                                    key: 'id',
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
                          {outwardProductFormFields.slice(1, 2).map((item) => (
                            <Col span={12}>
                              <div className="p-2">
                                {formItem({
                                  ...item,
                                  noLabel: ind != 0,
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
                        </Row>
                      ))}
                    </div>
                  );
                }}
              </Form.List>
            ))}
          </Col>
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
