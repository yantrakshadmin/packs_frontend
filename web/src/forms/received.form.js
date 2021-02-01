import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Form, message, Row, Spin } from 'antd';
import {
  ReceivedFormFields,
  ReceivedProductFormFields,
} from 'common/formFields/received.formFields';
import { useHandleForm } from 'hooks/form';
import {
  createReceived,
  editReceived,
  allReceived,
  retrieveReceived,
  retrieveReturns,
} from 'common/api/auth';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import formItem from '../hocs/formItem.hoc';

export const ReceivedForm = ({ id, onCancel, onDone }) => {
  const [loading, setLoading] = useState(true);
  const [received, setReceived] = useState(false);
  const [reqFile, setFile] = useState(null);
  const [returnn, setReturn] = useState(null);
  const [products, setProducts] = useState(null);
  const [receivedId, setReceivedId] = useState(null);

  const { form, submit } = useHandleForm({
    create: createReceived,
    success: 'Request created/edited successfully.',
    failure: 'Error in creating/editing request.',
    done: onDone,
    close: onCancel,
    edit: editReceived,
    retrieve: retrieveReceived,
    id: receivedId,
    dates:['receiving_date']
  });


  useEffect(() => {
    const fetchDelivered = async () => {
      const { data } = await allReceived();
      console.log(data,'REceived form')
      if (data) {
        const dlvd = data.filter((d) => d.returndocket === id)[0];
        if (dlvd) {
          setReceivedId(dlvd.id);
        } else {
          form.setFieldsValue({ delivered: true });
        }
      }
    };
    if (id) {
      fetchDelivered();
    }
  }, [id]);


  useEffect(() => {
    const fetchReturn = async () => {
      const { data } = await retrieveReturns(id);
      if (data) {
        setLoading(false);
        const reqdlvd = data;
        if (reqdlvd) {
          setReturn(reqdlvd);
        } else {
          form.setFieldsValue({ delivered: true });
        }
      }
      // if (data) {
      //   setReturn(data);
      //   console.log(data,'reqdlvd')
      // }
    };
    if (id) fetchReturn();
  }, [id]);

  //
  // useEffect(() => {
  //   const fetchReceived = async () => {
  //     const { data } = await allReceived();
  //     console.log(id);
  //     if (data) {
  //       const reqrcvd = data.filter((rcvd) => rcvd.returndocket === id)[0];
  //       if (reqrcvd) {
  //         setReceivedId(reqrcvd.id);
  //         setReceived(reqrcvd.delivered);
  //       }
  //     }
  //   };
  //   if (id) fetchReceived();
  // }, [id]);

  useEffect(() => {
    if (form && returnn) {
      form.setFieldsValue({
        transaction_no: returnn.transaction_no,
      });
      setLoading(false);
    }
  }, [returnn, form]);

  useEffect(() => {
    const reqProds = [];
    if (returnn){
      setReceived(returnn.id);
      returnn.kits.forEach((item) => {
        item.kit.products.forEach((prod) => {
          reqProds.push(prod.product);
        });
      });
      // const reqProds = returnn.kits.map((item) => item.product);
      setProducts(reqProds);
    }
  }, [returnn]);

  const toFormData=(obj, form, namespace)=> {
    const fd = form || new FormData();
    let formKey;

    for (const property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          formKey = `${namespace  }[${  property  }]`;
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

  const preProcess = async (data) => {
    data.returndocket = returnn.id;
    data.received = received;
    if (reqFile) {
      data.document = reqFile.originFileObj;
    } else delete data.document;
    const req = toFormData(data);

    await submit(req);
  };
  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Delivery Details</Divider>
      <Form onFinish={preProcess} form={form} layout='vertical' hideRequiredMark autoComplete='off'>
        <Row style={{ justifyContent: 'left' }}>
          {ReceivedFormFields.slice(0, 1).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
          {ReceivedFormFields.slice(2, 3).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
          {ReceivedFormFields.slice(1, 2).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className='p-2'>
                {formItem({
                  ...item,
                  kwargs: {
                    onChange: (val) => setReceived(val),
                  },
                })}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {ReceivedFormFields.slice(3, 4).map((item, idx) => (
            <Col span={24} style={{ justifyContent: 'center' }}>
              <div key={idx} className='p-2'>
                {formItem({
                  ...item,
                  kwargs: {
                    multiple:true,
                    onChange(info) {
                      const { status } = info.file;
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
        <Divider orientation='left'>Discrepancy Details</Divider>

        <Form.List name='items'>
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align='middle'>
                    {ReceivedProductFormFields.slice(0, 1).map((item) => (
                      <Col span={7}>
                        <div className='p-2'>
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              placeholder: 'Select',
                              type: 'number',
                              disabled: received,
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
                    {ReceivedProductFormFields.slice(1, 2).map((item) => (
                      <Col span={7}>
                        <div className='p-2'>
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              placeholder: 'Enter',
                              type: 'number',
                              disabled: received,
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
                    {ReceivedProductFormFields.slice(2, 3).map((item) => (
                      <Col span={7}>
                        <div className='p-2'>
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              placeholder: 'Select',
                              disabled: received,
                            },
                            others: {
                              selectOptions: ['Repairable', 'Return', 'Damage',
                                'Swap Return','Excess','Lost','Others',],
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
                      type='danger'
                      style={index != 0 ? { top: '-2vh' } : null}
                      disabled={received}
                      onClick={() => {
                        remove(field.name);
                      }}>
                      <MinusCircleOutlined />
                      {' '}
                      Delete
                    </Button>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type='dashed'
                    disabled={received}
                    onClick={() => {
                      add();
                    }}
                    block>
                    <PlusOutlined />
                    {' '}
                    Add Item
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        <Row>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
          <div className='p-2' />
          <Button type='primary' onClick={onCancel}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};
