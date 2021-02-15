import React, {useState, useEffect} from 'react';
import {Form, Col, Row, Button, Divider, Spin, message} from 'antd';
import {
  DeliveredFormFields,
  DeliveredProductFormFields,
} from 'common/formFields/delivered.formFields';
import {useHandleForm} from 'hooks/form';
import {
  createOutwardDeliveredDocket,
  retrieveOutwardDeliveredDocket,
  allInward,
  editOutwardDeliveredDocket,
  retrieveDocketOutwardInward,
} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import formItem from '../hocs/formItem.hoc';

export const OutwardDeliveredDocketForm = ({id, onCancel, onDone, transaction_no}) => {
  const [delivered, setDelivered] = useState(false);
  const [reqDlvd, setReqDlvd] = useState(null);
  const [deliveryId, setDeliveryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allotment, setAllotment] = useState(null);
  const [products, setProducts] = useState(null);
  const [reqFile, setFile] = useState(null);
  const getItems = (items) => {
    return items.map((item) => ({
      product: item.product.id,
      quantity: item.quantity,
      fault: item.fault,
    }));
  };
  const {form, submit} = useHandleForm({
    create: createOutwardDeliveredDocket,
    retrieve: async () => {
      const response = await retrieveOutwardDeliveredDocket(deliveryId);
      return {...response, data: {...response.data, items: getItems(response.data.items)}};
    },
    success: 'Request created/edited successfully.',
    failure: 'Error in creating/editing request.',
    done: onDone,
    close: onCancel,
    edit: editOutwardDeliveredDocket,
    id: deliveryId,
  });

  useEffect(() => {
    form.setFieldsValue({transaction_no});
  }, [form]);

  useEffect(() => {
    const fetchDelivered = async () => {
      const {data} = await allInward();
      if (data) {
        const dlvd = data.filter((d) => d.outwarddocket === id)[0];
        if (dlvd) {
          setDeliveryId(dlvd.id);
        } else {
          form.setFieldsValue({delivered: true});
        }
      }
    };
    if (id) {
      fetchDelivered();
      setAllotment(id);
    }
  }, [id]);

  useEffect(() => {
    const fetchDelivered = async () => {
      setLoading(true);
      const {data} = await retrieveDocketOutwardInward(id);
      if (data) {
        setLoading(false);
        const reqdlvd = data;
        if (reqdlvd) {
          setReqDlvd(reqdlvd);
        } else {
          form.setFieldsValue({delivered: true});
        }
      }
    };
    if (id) {
      fetchDelivered();
      setAllotment(id);
    }
  }, [id]);

  useEffect(() => {
    if (reqDlvd) {
      const reqProd = [];
      console.log(reqDlvd, 'req');
      reqDlvd.kits.forEach((flow) => {
        flow.kit.products.forEach((prod) => {
          reqProd.push(prod.product);
        });
      });
      console.log(reqProd);
      setProducts(reqProd);
      setLoading(false);
      form.setFieldsValue({delivered: true});
    }
  }, [reqDlvd]);

  function toFormData(obj, form, namespace) {
    const fd = form || new FormData();
    let formKey;

    for (const property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          formKey = `${namespace}[${property}]`;
        } else {
          formKey = property;
        }
        // nested
        if (property === 'items') fd.append('items', JSON.stringify(obj.items));
        // if the property is an object, but not a File, use recursivity.
        else if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        } else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          toFormData(obj[property], fd, formKey);
        } else {
          // if it's a string or a File object
          fd.append(formKey, obj[property]);
        }
      }
    }
    return fd;
  }

  const preProcess = (data) => {
    data.outwarddocket = id;
    // data.delivered = delivered;
    if (reqFile) {
      console.log(reqFile, 'reques');
      data.document = reqFile.originFileObj;
    } else delete data.document;
    const req = toFormData(data);
    // const req = new FormData();
    // for (var key in data) {
    //   req.append(key.toString(), data[key]);
    // }
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
          {DeliveredFormFields.slice(2, 3).map((item, idx) => (
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
          {DeliveredFormFields.slice(3, 4).map((item, idx) => (
            <Col span={24} style={{justifyContent: 'center'}}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  kwargs: {
                    multiple: true,
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
                            noLabel: index !== 0,
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
                            noLabel: index !== 0,
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
                            noLabel: index !== 0,
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
                      style={index !== 0 ? {top: '-2vh'} : null}
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
