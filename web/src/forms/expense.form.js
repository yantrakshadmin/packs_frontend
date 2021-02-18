import React, {useEffect, useState, useCallback} from 'react';
import {Form, Col, Row, Button, Divider, Spin} from 'antd';
import {expenseFormFields, expenseFlowFormFields} from 'common/formFields/expense.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createExpense, editMr, retrieveMr} from 'common/api/auth';
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
    edit: editMr,
    retrieve: retrieveMr,
    success: isEmployee
      ? 'Material Request created/edited successfully.'
      : 'Your material request has been placed successfully. We shall process the request within 12 working hours.',
    failure: 'Error in creating/editing Material Request.',
    done: onDone,
    close: onCancel,
    id,
    dates: ['delivery_required_on'],
  });

  const preProcess = (data) => {
    const {transactions} = data;
    if (transactions) {
      const newFlows = transactions.map((flo) => ({
        ...flo,
        transaction_no: Number(flo.transaction_no),
      }));
      data.transactions = newFlows;
    }

    console.log(data);
    submit(data);
  };

  const getTranastionSelectOptions = useCallback(() => {
    const tt = form.getFieldValue('transaction_type');
    if (tt === 'Allot') {
      return allotExp.map((i) => ({...i, dispatch_date: moment(i.dispatch_date).format('L')}));
    } else if (tt === 'Return') {
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
        }
      }
    },
    [ttTouched],
  );

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Expense Details</Divider>
      <Form
        onFinish={preProcess}
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
          {expenseFormFields.slice(3, 6).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {expenseFormFields.slice(6).map((item, idx) => (
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
