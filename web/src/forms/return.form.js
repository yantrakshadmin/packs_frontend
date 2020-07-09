import React, {useState, useEffect} from 'react';
import {Form, Col, Row, Button, Divider, Spin, Modal} from 'antd';
import {Table} from 'react-bootstrap';
import formItem from '../hocs/formItem.hoc';
import {returnFormFields, returnProductFormFields} from 'common/formFields/return.formFields.js';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createReturn, retrieveReturn, editReturn, retrieveRFlows} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import Products from 'icons/Products';

// import 'bootstrap/dist/css/bootstrap.min.css';

export const ReturnForm = ({id, onCancel, onDone}) => {
  const [products, setProducts] = useState(null);
  const [flow, setFlow] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
    const fetchFlow = async () => {
      const {data} = await retrieveReturn(id);
      setFlow(data.id);
    };
    if (id) fetchFlow();
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      const {data} = await retrieveRFlows();
      if (data) {
        const flo = data.filter((d) => d.id === flow)[0];
        let prods = [];
        flo.kits.map((k) => {
          k.kit.products.map((prod) => prods.push(prod.product));
          return null;
        });
        setProducts(prods);
      }
    };
    if (flow) fetchProducts();
  }, [flow]);

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
        {products ? (
          <Table bordered size="sm">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Product Name</th>
                <th>Product Code</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod, index) => {
                return (
                  <tr>
                    <td>{index}</td>
                    <td>{prod.name}</td>
                    <td>{prod.short_code}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : null}
      </Modal>
      <Divider orientation="left">Return Docket Details</Divider>
      <Form onFinish={submit} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row style={{justifyContent: 'left'}}>
          {returnFormFields.slice(0, 3).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          <Col span={5}>
            <div key={3} className="p-2">
              {formItem({
                ...returnFormFields[3],
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
                  selectOptions: flows || [],
                  key: 'id',
                  dataKeys: ['flow_name', 'flow_info', 'flow_type'],
                  customTitle: 'flow_name',
                },
              })}
            </div>
          </Col>
          <Col span={1}>
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
          {returnFormFields.slice(4, 8).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({...item})}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {returnFormFields.slice(8, 10).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({...item})}
              </div>
            </Col>
          ))}
          <Col span={6}>
            <div key={4} className="p-2">
              {formItem({
                ...returnFormFields[10],
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
                ...returnFormFields[11],
              })}
            </div>
          </Col>
        </Row>
        <Divider orientation="left">Product Details</Divider>

        <Form.List name="items">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field) => (
                  <Row align="middle">
                    {returnProductFormFields.slice(0, 1).map((item) => (
                      <Col span={10}>
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
                    {returnProductFormFields.slice(1, 2).map((item) => (
                      <Col span={10}>
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
