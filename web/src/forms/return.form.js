import React, {useState, useEffect} from 'react';
import {Form, Col, Row, Button, Divider, Spin, Modal} from 'antd';
import formItem from '../hocs/formItem.hoc';
import {returnFormFields, returnProductFormFields} from 'common/formFields/return.formFields.js';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createReturn, retrieveReturn, editReturn, retrieveRFlows} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import Products from 'icons/Products';

import './returnform.styles.scss';

export const ReturnForm = ({id, onCancel, onDone}) => {
  const [products, setProducts] = useState(null);
  const [flow, setFlow] = useState(null);
  const [rflow, setRFlow] = useState(null);
  const [returnn, setReturn] = useState(null);
  const [reqFlows, setReqFlows] = useState(null);
  const [receiverClient, setReceiverClient] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const {data: receiverClients} = useAPI('/receiverclients/', {});
  const {data: warehouses} = useAPI('/warehouse/', {});
  const {data: flows} = useAPI('/flows/', {});
  const {data: vendors} = useAPI('/vendors/', {});

  const {form, submit, loading} = useHandleForm({
    create: createReturn,
    edit: editReturn,
    retrieve: retrieveReturn,
    success: 'Return created/edited successfully.',
    failure: 'Error in creating/editing return.',
    done: onDone,
    close: onCancel,
    id,
    dates: ['transaction_date'],
  });

  useEffect(() => {
    console.log(id);
    const fetchReturn = async () => {
      const {data} = await retrieveReturn(id);
      if (data) {
        setReturn(data);
      }
    };
    if (id) fetchReturn();
  }, [id]);

  useEffect(() => {
    console.log(returnn);
    const setVals = () => {
      setReceiverClient(returnn.receiver_client);
      setFlow(returnn.flow);
    };
    if (returnn) setVals();
  }, [returnn]);

  useEffect(() => {
    if (flows && receiverClient) {
      const reqf = flows.filter((flo) => flo.receiver_client.id === receiverClient);
      console.log(reqf);
      setReqFlows(reqf);
    }
  }, [flows, receiverClient]);

  useEffect(() => {
    const fetchRFlow = async () => {
      const {data} = await retrieveRFlows();
      if (data) {
        console.log(data);
        const flo = data.filter((d) => d.id === flow)[0];
        setRFlow(flo);
      }
    };
    if (flow) fetchRFlow();
  }, [flow]);

  useEffect(() => {
    if (rflow) {
      let prods = [];
      rflow.kits.map((k) => {
        k.kit.products.map((prod) => prods.push(prod.product));
        return null;
      });
      console.log(prods);
      setProducts(prods);
    }
  }, [rflow]);

  return (
    <Spin spinning={loading}>
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        style={{position: 'absolute', right: '2vw'}}
        footer={
          <Button type="primary" onClick={() => setModalVisible(false)}>
            Ok
          </Button>
        }
        width="18vw">
        {rflow ? (
          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Kit Name</th>
                <th>Product Code</th>
              </tr>
            </thead>
            <tbody>
              {rflow.kits.map((k, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{k.kit.kit_name}</td>
                    <td>
                      {
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          {k.kit.products.map((prod) => (
                            <p>{prod.product.short_code}</p>
                          ))}
                        </div>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </Modal>
      <Divider orientation="left">Return Docket Details</Divider>
      <Form onFinish={submit} form={form} layout="vertical" hideRequiredMark autoComplete="off">
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
                  selectOptions: warehouses || [],
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
                  selectOptions: receiverClients || [],
                  key: 'id',
                  dataKeys: ['address', 'city'],
                  customTitle: 'name',
                },
              })}
            </div>
          </Col>
          <Col span={6}>
            <div key={3} className="p-2">
              {formItem({
                ...returnFormFields[4],
                kwargs: {
                  onChange: (val) => {
                    setFlow(val);
                    setModalVisible(true);
                  },
                  placeholder: 'Select',
                  showSearch: true,
                  filterOption: (input, option) =>
                    option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                },
                others: {
                  selectOptions: reqFlows || [],
                  key: 'id',
                  dataKeys: ['flow_name', 'flow_info', 'flow_type'],
                  customTitle: 'flow_name',
                },
              })}
            </div>
          </Col>
          <Col span={2}>
            <div key={1000} className="p-2">
              <Button
                style={{
                  top: '28px',
                  width: '4px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  padding: '1px',
                }}
                onClick={() => setModalVisible(true)}>
                <Products />
              </Button>
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
                    ? vendors.filter((vendor) => vendor.type === 'Transporter')
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

        <Form.List name="items">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align="middle">
                    {returnProductFormFields.slice(0, 1).map((item) => (
                      <Col span={10}>
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
                              selectOptions: products || [],
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
                    {returnProductFormFields.slice(1, 2).map((item) => (
                      <Col span={10}>
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
