import React, {useEffect, useState, useCallback} from 'react';
import {Form, Col, Row, Button, Divider, Spin, message, Alert} from 'antd';
import {expenseFormFields, expenseFlowFormFields} from 'common/formFields/expense.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createExpense, editExpenseTest, retrieveExpense} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import {useControlledSelect} from '../hooks/useControlledSelect';
import formItem from '../hocs/formItem.hoc';

import moment from 'moment';

import _ from 'lodash';
import {filterActive} from 'common/helpers/mrHelper';

export const ExpenseForm = ({id, onCancel, onDone, isEmployee}) => {
  // const [flowId, setFlowId] = useState(null);

  // const {data: flows} = useAPI('/myflows/', {});
  // const {data: kits} = useControlledSelect(flowId);
  const {data: vendors} = useAPI('/vendors-exp/', {});
  const {data: allotExp} = useAPI('/allot-exp/', {});
  const {data: returnExp} = useAPI('/return-exp/', {});

  const {form, submit, loading} = useHandleForm({
    create: createExpense,
    edit: editExpenseTest,
    retrieve: retrieveExpense,
    success: 'Expense created/edited successfully',
    failure: 'Error in creating/editing Expense.',
    done: onDone,
    close: onCancel,
    id,
    dates: ['invoice_date'],
  });

  useEffect(() => {
    if (id && !loading) {
      const transactions = form.getFieldValue('transactions');
      const newT = transactions.map((t) => ({
        ...t,
        t_no: t.a_t_no ? t.a_t_no : t.r_t_no,
      }));
      form.setFieldsValue({transactions: newT});
    }
  }, [loading]);

  const renderAlert = useCallback(() => {
    if (id && !loading) {
      return (
        <Alert message="Your previous bill documents will be replaced!" type="warning" closable />
      );
    }
  }, [loading]);

  const toFormData = useCallback((data) => {
    const req = new FormData();
    for (const key in data) {
      if (key === 'transactions') {
        req.append('transactions', JSON.stringify(data.transactions));
      } else if (key === 'invoice_date') {
        req.append(key.toString(), data[key].format());
      } else if (key === 'bill') {
        if (data[key]) {
          let c = 0;
          req.append(key.toString(), data[key]);
          data[key].forEach((el) => {
            req.append(`bill${c}`, el);
            c = c + 1;
          });
          req.set('no_of_bill_files', c);
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
      if (key === 'transactions') {
        req.append('transactions', JSON.stringify(data.transactions));
      } else if (key === 'invoice_date') {
        req.append(key.toString(), data[key].format());
      } else if (key === 'bill') {
      } else {
        req.append(key.toString(), data[key]);
      }
    }
    return req;
  }, []);

  const preProcess = (data) => {
    const {transactions} = data;
    const {transaction_type} = data;

    if (transactions && transaction_type) {
      if (transaction_type === 'Return') {
        const newFlows = transactions.map((flo) => {
          if ('a_t_no' in flo) delete flo['a_t_no'];
          return {
            ...flo,
            r_t_no: Number(flo.t_no),
          };
        });
        data.transactions = newFlows;
      } else {
        const newFlows = transactions.map((flo) => {
          if ('r_t_no' in flo) delete flo['r_t_no'];
          return {
            ...flo,
            a_t_no: Number(flo.t_no),
          };
        });
        data.transactions = newFlows;
      }
    }

    let failed = false;
    const {bill} = data;
    if (bill) {
      try {
        const {fileList} = data.bill;
        if (fileList) {
          const newFileList = fileList.map((f) => {
            if (f.status !== 'done') {
              message.error(`${f.name} has not been uploaded yet!`);
              failed = true;
            } else {
              return f.originFileObj;
            }
          });
          data.bill = newFileList;
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
      finalData.append('no_of_bill_files', 0);
      console.log(finalData);
      submit(finalData);
    }
  };

  const getTranastionSelectOptions = useCallback(() => {
    const tt = form.getFieldValue('transaction_type');
    if (tt === 'Allot') {
      if (allotExp)
        return allotExp.map((i) => ({...i, dispatch_date: moment(i.dispatch_date).format('L')}));
    } else if (tt === 'Return') {
      if (returnExp)
        return returnExp.map((i) => ({
          ...i,
          transaction_date: moment(i.transaction_date).format('L'),
        }));
    }
    return [];
  }, [form, allotExp, returnExp]);

  const getDataKeys = useCallback(() => {
    const tt = form.getFieldValue('transaction_type');
    if (tt === 'Allot') {
      return ['dispatch_date'];
    } else if (tt === 'Return') {
      return ['transaction_date'];
    }
    return [];
  }, [form]);

  const [ttTouched, setTTTouched] = useState(false);

  useEffect(() => {
    if (id && !loading) {
      if (form.getFieldValue('transaction_type')) {
        setTTTouched(true);
      }
    }
  }, [loading]);

  const handleFieldsChange = useCallback(
    (data) => {
      if (data[0]) {
        if (data[0].name) {
          const thisField = data[0].name[0];
          console.log(thisField);
          if (thisField === 'transaction_type') {
            form.setFieldsValue({transactions: []});
            setTTTouched(true);
          }
          if (thisField === 'amount' || thisField === 'gst') {
            if (form.getFieldValue('amount') && form.getFieldValue('gst')) {
              form.setFieldsValue({
                total_amount: _.ceil(
                  parseFloat(form.getFieldValue('amount')) +
                    parseFloat(form.getFieldValue('amount') * (form.getFieldValue('gst') / 100)),
                ),
              });
            } else {
              form.setFieldsValue({
                total_amount: 0,
              });
            }
          }
        }
      }
    },
    [ttTouched],
  );

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Expense Details</Divider>
      {renderAlert()}
      <Form
        onFinish={preProcess}
        initialValues={{status: 'Hold'}}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        onFieldsChange={handleFieldsChange}>
        <Row style={{justifyContent: 'left'}}>
          {expenseFormFields.slice(0, 2).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {expenseFormFields.slice(2, 3).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  others: {
                    selectOptions: filterActive(_, vendors) || [],
                    key: 'id',
                    dataKeys: ['code'],
                    customTitle: 'name',
                  },
                })}
              </div>
            </Col>
          ))}
          {expenseFormFields.slice(3, 4).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  rules: [{required: id ? false : true, message: 'Please upload bill!'}],
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
          {expenseFormFields.slice(4, 7).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {expenseFormFields.slice(7, 8).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  kwargs: {
                    ...item.kwargs,
                    disabled: id ? true : false,
                  },
                })}
              </div>
            </Col>
          ))}
          {expenseFormFields.slice(8).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>

        <Divider orientation="left">Transaction Details</Divider>

        <Form.List name="transactions">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align="middle">
                    {expenseFlowFormFields.slice(0, 1).map((item, idx) => (
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
                              selectOptions: getTranastionSelectOptions(),
                              key: 'id',
                              customTitle: 'transaction_no',
                              dataKeys: getDataKeys(),
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
                    {expenseFlowFormFields.slice(1).map((item, idx) => (
                      <Col key={idx} span={item.colSpan}>
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
                    block
                    disabled={ttTouched ? false : true}>
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
