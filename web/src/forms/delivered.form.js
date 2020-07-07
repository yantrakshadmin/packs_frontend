import React, {useState, useEffect} from 'react';
import {Form, Col, Row, Button, Divider, Spin} from 'antd';
import formItem from '../hocs/formItem.hoc';
import {DeliveredFormFields, DeliveredProductFormFields} from 'common/formFields/delivered.form';
// import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {
  createDelivered,
  retrieveAllotments,
  retrieveDelivered,
  editDelivered,
} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';

export const DeliveredForm = ({id, onCancel, onDone}) => {
  const [discrepancy, setDiscrepancy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allotment, setAllotment] = useState(null);
  const [products, setProducts] = useState(null);

  const {form, submit} = useHandleForm({
    create: createDelivered,
    success: 'Request created/edited successfully.',
    failure: 'Error in creating/editing request.',
    done: onDone,
    close: onCancel,
    edit: editDelivered,
    id,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const {data} = await retrieveAllotments();
      if (data) {
        const allot = data.filter((d) => d.id === id);
        setAllotment(allot[0]);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchDelivered = async () => {
      const {data} = await retrieveDelivered(id);
      if (data) {
        console.log(data);
        form.setFieldsValue(data);
      }
    };
    if (id && form) fetchDelivered();
  }, [id, form]);

  useEffect(() => {
    setLoading(true);
    if (allotment) {
      let reqProd = [];
      console.log(allotment);
      form.setFieldsValue({transaction_no: allotment.transaction_no});
      form.setFieldsValue({discrepancy: allotment.is_delivered});
      allotment.flows.map((flow) => {
        flow.kit.products.map((prod) => {
          reqProd.push(prod.product);
          return null;
        });
        return null;
      });
      setProducts(reqProd);
      setLoading(false);
    }
  }, [allotment]);

  const preProcess = (data) => {
    data['allotment'] = allotment.id;
    data['delivered'] = discrepancy;
    submit(data);
  };

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Delivery Details</Divider>
      <Form onFinish={preProcess} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row style={{justifyContent: 'left'}}>
          {DeliveredFormFields.slice(0, 1).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {DeliveredFormFields.slice(1, 2).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  kwargs: {
                    onChange: (val) => setDiscrepancy(val),
                  },
                })}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {DeliveredFormFields.slice(2, 3).map((item, idx) => (
            <Col span={24} style={{justifyContent: 'center'}}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                })}
              </div>
            </Col>
          ))}
        </Row>
        <Divider orientation="left">Discrepancy Details</Divider>

        <Form.List name="items">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field) => (
                  <Row align="middle">
                    {DeliveredProductFormFields.slice(0, 1).map((item) => (
                      <Col span={7}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            kwargs: {
                              placeholder: 'Select',
                              type: 'number',
                              disabled: discrepancy,
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
                    {DeliveredProductFormFields.slice(1, 2).map((item) => (
                      <Col span={7}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            kwargs: {
                              placeholder: 'Enter',
                              type: 'number',
                              disabled: discrepancy,
                            },
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
                    {DeliveredProductFormFields.slice(2, 3).map((item) => (
                      <Col span={7}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            kwargs: {
                              placeholder: 'Select',
                              disabled: discrepancy,
                            },
                            others: {
                              selectOptions: ['Repairable', 'Return', 'Damage', 'Swap Return'],
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
                      disabled={discrepancy}
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
                    disabled={discrepancy}
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
