import React, {useEffect, useState, useCallback} from 'react';
import {Button, Col, Divider, Form, message, Row, Spin} from 'antd';
import {ReceivedFormFields, ReceivedProductFormFields} from 'common/formFields/received.formFields';
import {loadAPI} from 'common/helpers/api';
import {useHandleForm} from 'hooks/form';
import {
  createReceived,
  editReceived,
  allReceived,
  retrieveReceived,
  retrieveReturns,
} from 'common/api/auth';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import formItem from '../hocs/formItem.hoc';
import _ from 'lodash';
import { useAPI } from 'common/hooks/api';

export const ReceivedForm = ({id, onCancel, onDone}) => {
  const [loading, setLoading] = useState(true);
  const [received, setReceived] = useState(true);
  const [reqFile, setFile] = useState(null);
  const [returnn, setReturn] = useState(null);
  const [products, setProducts] = useState(null);
  const [receivedId, setReceivedId] = useState(null);

  const [limitsData, setLimitsData] = useState({});
  const [mainProduct, setMainProduct] = useState([])

  const {form, submit} = useHandleForm({
    create: createReceived,
    success: 'Request created/edited successfully.',
    failure: 'Error in creating/editing request.',
    done: onDone,
    close: onCancel,
    edit: editReceived,
    retrieve: retrieveReceived,
    id: receivedId,
    dates: ['receiving_date'],
  });

  console.log(mainProduct, "mainProduct");

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        const { data } = await loadAPI(`/received-desc/?id=${id}`);
        setLimitsData(data);
     
      }
    };
    fetch();
  }, [id]);

  useEffect(() => {
    const fetch = async () => { 
      const { data } = await loadAPI(`products`);
      setMainProduct(data);
    }
    fetch();
   
   
  }, [])
  

  useEffect(() => {
    const fetchDelivered = async () => {
      const {data} = await allReceived();
      // console.log(data, 'REceived form');
      if (data) {
        const dlvd = data.filter((d) => d.returndocket === id)[0];
        if (dlvd) {
          setReceivedId(dlvd.id);
        } else {
          form.setFieldsValue({delivered: true});
        }
      }
    };
    if (id) {
      fetchDelivered();
    }
  }, [id]);

  useEffect(() => {
    const fetchReturn = async () => {
      const {data} = await retrieveReturns(id);
      if (data) {
        setLoading(false);
        const reqdlvd = data;
        if (reqdlvd) {
          setReturn(reqdlvd);
        } else {
          //form.setFieldsValue({delivered: true});
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
    if (returnn) {
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

  // const toFormData = (obj, form, namespace) => {
  //   const fd = form || new FormData();
  //   let formKey;

  //   for (const property in obj) {
  //     if (obj.hasOwnProperty(property) && obj[property]) {
  //       if (namespace) {
  //         formKey = `${namespace}[${property}]`;
  //       } else {
  //         formKey = property;
  //       }
  //       // nested
  //       if (property === 'items') fd.append('items', JSON.stringify(obj.items));
  //       // if the property is an object, but not a File, use recursivity.
  //       else if (obj[property] instanceof Date) {
  //         fd.append(formKey, obj[property].toISOString());
  //       } else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
  //         toFormData(obj[property], fd, formKey);
  //       } else {
  //         // if it's a string or a File object
  //         fd.append(formKey, obj[property]);
  //       }
  //     }
  //   }
  //   return fd;
  // };

  const toFormData = useCallback((data) => {
    const req = new FormData();
    for (const key in data) {
      if (key === 'items') {
        req.append('items', JSON.stringify(data.items));
      } else if (key === 'receiving_date') {
        req.append(key.toString(), data[key].format());
      } else if (key === 'document') {
        if (data[key]) {
          let c = 0;
          req.append(key.toString(), data[key]);
          data[key].forEach((el) => {
            req.append(`document${c}`, el);
            c = c + 1;
          });
          req.set('no_of_document_files', c);
        }
      } else {
        req.append(key.toString(), data[key]);
      }
    }
    return req;
  }, []);

  const toFormDataForNoDocumentFiles = useCallback((data) => {
    const req = new FormData();
    for (const key in data) {
      if (key === 'items') {
        req.append('items', JSON.stringify(data.items));
      } else if (key === 'receiving_date') {
        req.append(key.toString(), data[key].format());
      } else if (key === 'document') {
      } else {
        req.append(key.toString(), data[key]);
      }
    }
    return req;
  }, []);

  const preProcess = async (data) => {
    data.returndocket = returnn.id;
    data.received = received;

    if (data.delivered === true) {
      if ('items' in data) delete data.items;
    }

    // if (reqFile) {
    //   data.document = reqFile.originFileObj;
    // } else delete data.document;
    // const req = toFormData(data);

    // await submit(req);

    let failed = false;
    const {document} = data;
    if (document) {
      try {
        const {fileList} = data.document;
        if (fileList) {
          const newFileList = fileList.map((f, index) => {
            const myNewFile = new File([f.originFileObj],
                `${returnn.transaction_no}-${index+1}.${f.type.split('/')[1]||'jpg'}`, {type: f.type});
            if (f.status !== 'done') {
              message.error(`${f.name} has not been uploaded yet!`);
              failed = true;
            } else {
              return myNewFile;
            }
          });
          data.document = newFileList;
          if (!failed) {
            const finalData = toFormData(data);
            submit(finalData);
          }
        } else {
          if (!failed) {
            const finalData = toFormDataForNoDocumentFiles(data);
            submit(finalData);
          }
        }
      } catch (err) {
        alert(err);
        message.error(`Something went wrong!`);
      }
    } else {
      const finalData = toFormData(data);
      finalData.append('no_of_document_files', 0);
      // console.log(finalData);
      submit(finalData);
    }
  };

  const handleFieldsChange = useCallback(
    (data) => {
      if (data[0]) {
        if (data[0].name) {
          const thisField = data[0].name[0];
          if (thisField === 'delivered') {
            if (data[0].value === false) {
              const temp = [];
              _.entries(limitsData).forEach((v) => {
                console.log(v ,"mainProduct fi;terrrrrrrr")
                temp.push({
                  product:( mainProduct || []).filter(f => f.id == parseInt(v[0])).map(e => e.short_code) ,
                  actual_quantity: v[1],
                });
              });
              form.setFieldsValue({items: temp});
            } else {
              form.setFieldsValue({items: []});
            }
          }
        }
      }
    },
    [form, limitsData],
  );

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Delivery Details</Divider>
      <Form
        onFinish={preProcess}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        initialValues={{delivered: true}}
        onFieldsChange={handleFieldsChange}>
        <Row style={{justifyContent: 'left'}}>
          {ReceivedFormFields.slice(0, 1).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {ReceivedFormFields.slice(2, 3).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {ReceivedFormFields.slice(1, 2).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
             
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
        <Row style={{justifyContent: 'left'}}>
          {ReceivedFormFields.slice(3, 4).map((item, idx) => (
            <Col span={24} style={{justifyContent: 'center'}}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  kwargs: {
                    multiple: true,
                    onChange(info) {
                      const {fileList} = info;
                      // console.log(fileList);
                      fileList.forEach((f) => {
                        if (f.status === 'error') {
                          message.error(`${f.name} file upload failed.`);
                        }
                      });
                      // const {status} = info.file;
                      // if (status !== 'uploading') {
                      //   console.log(info.file, info.fileList);
                      // }
                      // if (status === 'done') {
                      //   setFile(info.file);
                      //   message.success(`${info.file.name} file uploaded successfully.`);
                      // } else if (status === 'error') {
                      //   message.error(`${info.file.name} file upload failed.`);
                      // }
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
                    {ReceivedProductFormFields.slice(0, 1).map((item) => (
                      <Col span={6}>
                        <div className="p-2">
                          {/* {console.log(item, " itemm of Producttt")} */}
                          {formItem(
                            {
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              placeholder: 'Select',
                              disabled: true,
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
                            }
                          )}
                        </div>
                      </Col>
                    ))}
                    {ReceivedProductFormFields.slice(3, 4).map((item) => (
                      <Col span={5}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              placeholder: 'Enter',
                              disabled: true,
                              type: 'number',
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
                    {ReceivedProductFormFields.slice(1, 2).map((item) => (
                      <Col span={5}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              placeholder: 'Enter',
                              type: 'number',
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
                      <Col span={6}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              placeholder: 'Select',
                            },
                            others: {
                              selectOptions: [
                                'Repairable',
                                'Return',
                                'Damage',
                                'Swap Return',
                                'Excess',
                                'Lost',
                                'Others',
                              ],
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
                        type="danger"
                        style={index != 0 ? {top: '-2vh'} : null}
                        disabled={received}
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
                    disabled={true}
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
