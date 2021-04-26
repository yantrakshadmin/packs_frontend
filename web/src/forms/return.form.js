import React, {useState, useEffect} from 'react';
import {Form, Col, Row, Button, Divider, Spin, Modal} from 'antd';
import moment from 'moment';
import {
  returnFormFields,
  returnProductFormFields,
  returnKitFormFields,
} from 'common/formFields/return.formFields.js';
import {useAPI} from 'common/hooks/api';
import {loadAPI} from 'common/helpers/api';
import {useHandleForm} from 'hooks/form';
import {navigate} from '@reach/router';
import {createReturn, retrieveReturn, editReturn} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import formItem from '../hocs/formItem.hoc';

import './returnform.styles.scss';

import _ from 'lodash';
import {filterActive} from 'common/helpers/mrHelper';

const ReturnForm = ({location}) => {
  const [products, setProducts] = useState(null);
  const [kitID, setKitID] = useState(null);
  const [pcc, setPcc] = useState([]);
  const [kits, setKits] = useState(null);
  const [flow, setFlow] = useState(null);
  const [returnn, setReturn] = useState(null);
  const [loading, setLoading] = useState(location.state ? !!location.state.id : false);
  const [reqFlows, setReqFlows] = useState(null);
  const [receiverClient, setReceiverClient] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const {data: receiverClients} = useAPI('/receiverclients/', {});
  const {data: warehouses} = useAPI('/warehouse/', {});
  const {data: flows} = useAPI('/flows/', {});
  const {data: vendors} = useAPI('/vendors/', {});

  const {form, submit} = useHandleForm({
    create: createReturn,
    edit: editReturn,
    success: 'Return created/edited successfully.',
    failure: 'Error in creating/editing return.',
    id: location.state.id,
    done: () => navigate('/employee/return-dockets/'),
    close: () => navigate('/employee/return-dockets/'),
  });

  useEffect(() => {
    if (form) form.setFields([{name: ['transaction_type'], value: 'Return'}]);
    const fetchReturn = async () => {
      const {data} = await retrieveReturn(location.state.id);
      if (data) {
        setReturn(data);
      }
    };
    if (location.state) fetchReturn();
  }, [location.state]);

  useEffect(() => {
    // console.log(returnn);
    const setVals = () => {
      setReceiverClient(returnn.receiver_client);
      setFlow(returnn.flow);
      let temp = [];
      const returnKits = returnn.kits;
      for (let i = 0; i < returnKits.length; i++) {
        temp = [...temp, i];
      }
      setPcc(temp);
      returnn.transaction_date = moment(returnn.transaction_date);
      form.setFieldsValue(returnn);
      if (returnKits.length > 0)
        returnKits.map((k, idx) => {
          form.setFields([
            {
              name: [`items${idx}`],
              value: k.items.map((i) => {
                return {product: i.product, product_quantity: i.quantity};
              }),
            },
          ]);
        });
      setLoading(false);
    };
    if (returnn && form) setVals();
  }, [returnn, form]);

  useEffect(() => {
    if (flows && receiverClient) {
      const reqf = flows.filter((flo) => flo.receiver_client.id === receiverClient);
      // console.log(reqf);
      setReqFlows(reqf);
    }
  }, [flows, receiverClient]);

  useEffect(() => {
    const fetchKits = async () => {
      const kitss = [];
      const prods = [];
      const {data} = await loadAPI(`/r-flows/?id=${receiverClient}`);
      data.forEach((d) => {
        d.kits.forEach((k) => {
          kitss.push({...k.kit});
          k.kit.products.forEach((p) => prods.push(p.product));
        });
      });
      setProducts(prods);
      setKits(_.uniqBy(kitss, 'id'));
    };
    if (receiverClient) fetchKits();
  }, [receiverClient]);

  const [addDisabled, setAddDisabled] = useState(false);

  const handleFieldsChange = async (data) => {
    // console.log(data, kitID);
    setAddDisabled(false);
    if (data)
      if (data[0])
        if (data[0].name)
          if (data[0].name[2]) {
            if (
              data[0].name[2] === 'kit' ||
              (data[0].name[2] === 'quantity' &&
                data[0].errors[0] === 'Please enter quantity!' &&
                kitID)
            ) {
              if (data[0].name[2] === 'kit') setKitID(data[0].value);
              // console.log(data[0].name);
              if (kitID) {
                console.log(kitID);
                const rk = _.find(kits, (k) => k.id === kitID);
                if (rk) {
                  const produces = [];
                  rk.products.forEach((p) => {
                    produces.push({product: p.product.id, product_quantity: p.quantity});
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
            if (data[0].name[2] === 'quantity') {
              if (!kitID) {
                const kitd = form.getFieldValue([data[0].name[0], data[0].name[1], 'kit']);
                if (kitd) {
                  setKitID(kitd);
                }
                console.log(kitd, '!kit');
              }
              if (kitID) {
                const q = data[0].value;
                // let temp = form.getFieldValue(`items${data[0].name[1]}`);
                // const rk = kits.filter((k) => k.id === kitID)[0];
                const rk = _.find(kits, (k) => k.id === kitID);
                console.log(rk, 'kitID : ');
                if (rk) {
                  form.setFields([
                    {
                      name: [`items${data[0].name[1]}`],
                      value: rk.products.map((p) => {
                        // console.log(p.product_quantity, q);
                        return {product: p.product.id, product_quantity: p.quantity * q};
                      }),
                    },
                  ]);
                  console.log(data[0].name[1], 'rk');
                }
                setKitID(undefined);
              }
            }

            if (data[0].name[2] === 'kit' || data[0].name[2] === 'quantity') {
              const kts = form.getFieldValue('kits');
              const lastK = kts[kts.length - 1];
              if (lastK) {
                if (lastK.kit && lastK.quantity) {
                  setAddDisabled(false);
                } else {
                  setAddDisabled(true);
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
          return {product: i.product, quantity: i.product_quantity};
        }),
      };
    });
    const reqD = {...data, kits: tempkits};
    // console.log(reqD);
    submit(reqD);
  };
  console.log(pcc, 'pcc');
  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Return Docket Details</Divider>
      <Form
        onFieldsChange={handleFieldsChange}
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        style={{margin: '2vw'}}>
        <Row style={{justifyContent: 'left'}}>
          {returnFormFields.slice(0, 2).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          <Col span={8}>
            <div key={3} className="p-2">
              {formItem({
                ...returnFormFields[2],
                kwargs: {
                  placeholder: 'Select',
                  showSearch: true,
                  filterOption: (input, option) =>
                    option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                },
                others: {
                  selectOptions: filterActive(_, warehouses) || [],
                  key: 'id',
                  dataKeys: ['address', 'city'],
                  customTitle: 'name',
                },
              })}
            </div>
          </Col>
          <Col span={8}>
            <div key={3} className="p-2">
              {formItem({
                ...returnFormFields[3],
                kwargs: {
                  placeholder: 'Select',
                  showSearch: true,
                  onChange: (val) => {
                    console.log(val);
                    setReceiverClient(val);
                  },
                  filterOption: (input, option) =>
                    option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                },
                others: {
                  selectOptions: filterActive(_, receiverClients) || [],
                  key: 'id',
                  dataKeys: ['address', 'city'],
                  customTitle: 'name',
                },
              })}
            </div>
          </Col>
          <Col span={8}>
            <div key={3} className="p-2">
              {formItem({
                ...returnFormFields[4],
                kwargs: {
                  placeholder: 'Select',
                  showSearch: true,
                  filterOption: (input, option) =>
                    option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                },
                others: {
                  selectOptions: filterActive(_, reqFlows) || [],
                  key: 'id',
                  dataKeys: ['flow_name', 'flow_info', 'flow_type'],
                  customTitle: 'flow_name',
                },
              })}
            </div>
          </Col>
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {returnFormFields.slice(5, 9).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({...item})}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {returnFormFields.slice(9, 11).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({...item})}
              </div>
            </Col>
          ))}
          <Col span={6}>
            <div key={4} className="p-2">
              {formItem({
                ...returnFormFields[11],
                kwargs: {
                  showSearch: true,
                  placeholder: 'Select',
                  filterOption: (input, option) =>
                    option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                },
                others: {
                  selectOptions: vendors
                    ? filterActive(_, vendors).filter((vendor) => vendor.type === 'Transporter')
                    : [],
                  key: 'id',
                  customTitle: 'name',
                  dataKeys: ['city', 'pincode'],
                },
              })}
            </div>
          </Col>
          <Col span={6}>
            <div key={4} className="p-2">
              {formItem({
                ...returnFormFields[12],
              })}
            </div>
          </Col>
        </Row>
        <Divider orientation="left">Product Details</Divider>
        <Row>
          <Col span={12}>
            <Form.List name="kits">
              {(fields, {add, remove}) => {
                // console.log(fields);
                return (
                  <div>
                    {fields.map((field, index) => (
                      <Row align="middle" gutter={10}>
                        {returnKitFormFields.slice(0, 1).map((item) => (
                          <Col span={15}>
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
                                selectOptions: filterActive(_, kits) || [],
                                key: 'id',
                                //dataKeys: ['kit_name'],
                                customTitle: 'kit_name',
                                customTitleInfo: 'kit_info',
                                searchKeys: ['kit_info'],
                                formOptions: {
                                  ...field,
                                  name: [field.name, item.key],
                                  fieldKey: [field.fieldKey, item.key],
                                },
                              },
                            })}
                          </Col>
                        ))}
                        {returnKitFormFields.slice(1, 2).map((item) => (
                          <Col span={6}>
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
                          </Col>
                        ))}
                        <Col span={3}>
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
                            <MinusCircleOutlined />
                          </Button>
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          const temp = pcc;
                          setPcc([...pcc, pcc.length]);
                          add();
                          setAddDisabled(true);
                        }}
                        block
                        disabled={!!addDisabled}>
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
                          {returnProductFormFields.slice(0, 1).map((item) => (
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
                          {returnProductFormFields.slice(1, 2).map((item) => (
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
          <Button type="primary" onClick={() => navigate('/employee/return-dockets/')}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};

export default ReturnForm;
