import React, {useState, useEffect} from 'react';
import {Form, Col, Row, Button, Divider, Spin, message} from 'antd';
import formItem from '../hocs/formItem.hoc';
import {
  DeliveredFormFields,
  DeliveredProductFormFields,
} from 'common/formFields/delivered.formFields';
import {useHandleForm} from 'hooks/form';
import {
  createDelivered,
  retrieveDelivered,
  editDelivered,
  allDelivered,
  retrieveAllotmentsDelivered,
} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';

export const DeliveredForm = ({id, onCancel, onDone, transaction_no}) => {
  const [delivered, setDelivered] = useState(false);
  const [reqDlvd, setReqDlvd] = useState(null);
  const [deliveryId, setDeliveryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allotment, setAllotment] = useState(null);
  const [products, setProducts] = useState(null);
  const [reqFile, setFile] = useState(null);

  const {form, submit} = useHandleForm({
    create: createDelivered,
    retrieve: retrieveDelivered,
    success: 'Request created/edited successfully.',
    failure: 'Error in creating/editing request.',
    done: onDone,
    close: onCancel,
    edit: editDelivered,
    id: deliveryId,
  });

  useEffect(() => {
    form.setFieldsValue({transaction_no});
  }, [form]);

  useEffect(() => {
    const fetchDelivered = async () => {
      const {data} = await allDelivered(id);
      if (data) {
        console.log(data);
        console.log(id);
        const dlvd = data[0];
        if (dlvd) {
          setDeliveryId(dlvd.id);
          console.log(dlvd.id);
        }
      }
    };
    fetchDelivered();
  }, [id]);

  useEffect(() => {
    const fetchDelivered = async () => {
      setLoading(true);
      const {data} = await retrieveAllotmentsDelivered();
      if (data) {
        setLoading(false);
        const reqdlvd = data.filter((dlvd) => dlvd.id === id)[0];
        if (reqdlvd) {
          setReqDlvd(reqdlvd);
        }
      }
    };
    if (id) fetchDelivered();
  }, [id]);

  useEffect(() => {
    if (reqDlvd) {
      console.log('yes');
      let reqProd = [];
      console.log(reqDlvd);
      reqDlvd.flows.forEach((flow) => {
        flow.kit.products.forEach((prod) => {
          reqProd.push(prod.product);
        });
      });
      console.log(reqProd);
      setProducts(reqProd);
      setLoading(false);
    }
  }, [reqDlvd]);

  const preProcess = (data) => {
    data['allotment'] = allotment.id;
    if (reqFile) {
      data.document = reqFile.originFileObj;
    }
    const req = new FormData();
    for (var key in data) {
      req.append(key.toString(), data[key]);
    }
    submit(req);
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
                    onChange: (val) => setDelivered(val),
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
                  kwargs: {
                    onChange(info) {
                      const {status} = info.file;
                      if (status !== 'uploading') {
                        console.log(info.file, info.fileList);
                      }
                      if (status === 'done') {
                        setFile(info.file);
                        message.success(`${info.file.name} file uploaded successfully.`);
                      } else if (status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                      }
                    },
                  },
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
                {fields.map((field, index) => (
                  <Row align="middle">
                    {DeliveredProductFormFields.slice(0, 1).map((item) => (
                      <Col span={7}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              placeholder: 'Select',
                              type: 'number',
                              disabled: delivered,
                              showSearch: true,
                              filterOption: (input, option) =>
                                option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                            },
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
                    {DeliveredProductFormFields.slice(1, 2).map((item) => (
                      <Col span={7}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              placeholder: 'Enter',
                              type: 'number',
                              disabled: delivered,
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
                            noLabel: index != 0,
                            kwargs: {
                              placeholder: 'Select',
                              disabled: delivered,
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
                      style={index != 0 ? {top: '-2vh'} : null}
                      disabled={delivered}
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
                    disabled={delivered}
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
