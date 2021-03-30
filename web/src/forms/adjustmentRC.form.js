import React, {useEffect, useState, useCallback} from 'react';
import {Form, Col, Row, Button, Divider, Spin, message, Alert} from 'antd';
import {
  adjustmentFormFields,
  adjustmentFlowFormFields,
} from 'common/formFields/adjustmentInventory.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createRCAdjustment} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import formItem from '../hocs/formItem.hoc';

import {ifNanReturnZero} from 'common/helpers/mrHelper';

import moment from 'moment';

import _ from 'lodash';

export const AdjustmentForm = ({id, onCancel, onDone, isEmployee}) => {
  // const [flowId, setFlowId] = useState(null);

  // const {data: flows} = useAPI('/myflows/', {});
  // const {data: kits} = useControlledSelect(flowId);

  //const {data: warehouses} = useAPI('/warehouse/', {});
  //   const {data: invItems} = useAPI('/inv-items/', {});

  //   const [products, setProducts] = useState([]);

  const {data: scInvItems} = useAPI('/rc-inv-items/', {});

  const [scInvClients, setScInvClients] = useState([]);
  const [selectedScClient, setSelectedScClient] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (scInvItems) {
      const temp = scInvItems.map((i) => ({
        id: i.client.pk,
        client_name: i.client.name,
      }));
      setScInvClients(_.uniqBy(temp, 'id'));
    }
  }, [scInvItems]);

  useEffect(() => {
    if (scInvItems && selectedScClient) {
      const temp = _.filter(scInvItems, (o) => o.client.pk === selectedScClient);
      const temp2 = temp.map((o) => ({
        id: o.product.id,
        short_code: o.product.short_code,
        description: o.product.description,
        quantity: o.quantity,
      }));
      console.log(temp2);
      setSelectedProducts(temp2 || []);
    }
  }, [scInvItems, selectedScClient]);

  const {form, submit, loading} = useHandleForm({
    create: createRCAdjustment,
    edit: () => {},
    retrieve: () => {},
    success: 'RC Adjustment created/edited successfully',
    failure: 'Error in creating/editing RC Adjustment.',
    done: onDone,
    close: onCancel,
    id,
    dates: ['date'],
  });

  //   useEffect(() => {
  //     if (id && !loading) {
  //       const transactions = form.getFieldValue('transactions');
  //       const newT = transactions.map((t) => ({
  //         ...t,
  //         t_no: t.a_t_no ? t.a_t_no : t.r_t_no,
  //       }));
  //       form.setFieldsValue({transactions: newT});
  //     }
  //   }, [loading]);

  const renderAlert = useCallback(() => {
    if (id && !loading) {
      return <Alert message="Your previous documents will be replaced!" type="warning" closable />;
    }
  }, [loading]);

  const toFormData = useCallback((data) => {
    const req = new FormData();
    for (const key in data) {
      if (key === 'items') {
        req.append('items', JSON.stringify(data.items));
      } else if (key === 'date') {
        req.append(key.toString(), data[key].format());
      } else if (key === 'file') {
        if (data[key]) {
          let c = 0;
          req.append(key.toString(), data[key]);
          data[key].forEach((el) => {
            req.append(`file${c}`, el);
            c = c + 1;
          });
          req.set('no_of_file_files', c);
        }
      } else {
        req.append(key.toString(), data[key]);
      }
    }
    return req;
  }, []);

  const toFormDataForNoBillFiles = useCallback((data) => {
    const req = new FormData();
    for (const key in data) {
      if (key === 'items') {
        req.append('items', JSON.stringify(data.items));
      } else if (key === 'date') {
        req.append(key.toString(), data[key].format());
      } else if (key === 'file') {
      } else {
        req.append(key.toString(), data[key]);
      }
    }
    return req;
  }, []);

  const preProcess = (data) => {
    let failed = false;
    const {file} = data;
    if (file) {
      try {
        const {fileList} = data.file;
        if (fileList) {
          const newFileList = fileList.map((f) => {
            if (f.status !== 'done') {
              message.error(`${f.name} has not been uploaded yet!`);
              failed = true;
            } else {
              return f.originFileObj;
            }
          });
          data.file = newFileList;
          if (!failed) {
            const finalData = toFormData(data);
            submit(finalData);
          }
        } else {
          if (!failed) {
            const finalData = toFormDataForNoBillFiles(data);
            submit(finalData);
          }
        }
      } catch (err) {
        alert(err);
        message.error(`Something went wrong!`);
      }
    } else {
      const finalData = toFormData(data);
      finalData.append('no_of_file_files', 0);
      console.log(finalData);
      submit(finalData);
    }
  };

  const handleFieldsChange = useCallback(
    (data) => {
      if (data[0]) {
        if (data[0].name) {
          const thisField = data[0].name[0];
          console.log(thisField);
          if (thisField === 'items') {
            const items = form.getFieldValue('items');
            const fieldKey = data[0].name[1];
            const thisListField = data[0].name[2];
            if (thisListField === 'product') {
              try {
                const v = data[0].value;
                const thisProduct = _.find(selectedProducts, (p) => parseInt(p.id) === parseInt(v));
                Object.assign(items[fieldKey], {
                  quantity: thisProduct.quantity,
                  quantity_adjusted: items[fieldKey]['new_quantity']
                    ? parseInt(items[fieldKey]['new_quantity']) - parseInt(thisProduct.quantity)
                    : null,
                });
                form.setFieldsValue({items});
              } catch (err) {}
            }
            if (thisListField === 'new_quantity') {
              try {
                const q = items[fieldKey]['quantity'];
                const v = data[0].value;
                Object.assign(items[fieldKey], {
                  quantity_adjusted: parseInt(v) - parseInt(q),
                });
                form.setFieldsValue({items});
              } catch (err) {}
            }
          }
        }
      }
    },
    [form, selectedProducts],
  );

  return (
    <Spin spinning={loading}>
      {renderAlert()}
      <Form
        onFinish={preProcess}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        onFieldsChange={handleFieldsChange}>
        <Row style={{justifyContent: 'left'}}>
          {adjustmentFormFields.slice(0, 2).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {adjustmentFormFields.slice(3, 4).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {adjustmentFormFields.slice(2, 3).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  //rules: [{required: id ? false : true, message: 'Please upload file!'}],
                  kwargs: {
                    ...item.kwargs,
                    onChange(info) {
                      const {fileList} = info;
                      console.log(fileList);
                      fileList.forEach((f) => {
                        if (f.status === 'error') {
                          message.error(`${f.name} file upload failed.`);
                        }
                      });
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
          {adjustmentFormFields.slice(4, 5).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  key: 'receiver_client',
                  customLabel: 'Receiver Client',
                  kwargs: {
                    ...item.kwargs,
                    showSearch: true,
                    filterOption: (input, option) =>
                      option.search.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0,
                    onChange: (val) => {
                      setSelectedScClient(val);
                    },
                  },
                  others: {
                    selectOptions: scInvClients,
                    key: 'id',
                    customTitle: 'client_name',
                  },
                })}
              </div>
            </Col>
          ))}
        </Row>

        <Divider orientation="left">Product Details</Divider>

        <Form.List name="items">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align="middle">
                    {adjustmentFlowFormFields.slice(0, 1).map((item, idx) => (
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
                              selectOptions: selectedProducts,
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
                    {adjustmentFlowFormFields.slice(1).map((item, idx) => (
                      <Col key={idx} span={item.colSpan}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            others: {
                              ...item.others,
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
