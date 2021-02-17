import React, {useEffect, useState} from 'react';
import {Form, Col, Row, Button, Divider, Spin} from 'antd';
import {expenseFormFields, expenseFlowFormFields} from 'common/formFields/expense.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createExpense, editMr, retrieveMr} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import {useControlledSelect} from '../hooks/useControlledSelect';
import formItem from '../hocs/formItem.hoc';

import _ from 'lodash';
import {filterActive} from 'common/helpers/mrHelper';

export const ExpenseForm = ({id, onCancel, onDone, isEmployee}) => {
  const [flowId, setFlowId] = useState(null);

  const {data: flows} = useAPI('/myflows/', {});
  const {data: kits} = useControlledSelect(flowId);

  useEffect(() => {
    console.log(isEmployee);
  }, []);

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
    const {flows} = data;
    if (flows) {
      const newFlows = flows.map((flo) => ({
        flow: Number(flo.flow),
        kit: Number(flo.kit),
        quantity: Number(flo.quantity),
      }));
      data.flows = newFlows;
    }

    console.log(data);
    submit(data);
  };

  const handleFieldsChange = (data) => {
    console.log(data);
  };

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
          {expenseFormFields.slice(0).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>

        <Divider orientation="left">Transaction Details</Divider>

        <Form.List name="flows">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align="middle">
                    {expenseFlowFormFields.slice(0, 1).map((item) => (
                      <Col span={item.colSpan}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              onChange: (val) => {
                                setFlowId(val);
                              },
                              placeholder: 'Select',
                              showSearch: true,
                              filterOption: (input, option) =>
                                option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                            },
                            others: {
                              selectOptions: filterActive(_, flows) || [],
                              key: 'id',
                              dataKeys: ['flow_name', 'flow_info', 'flow_type'],
                              customTitle: 'flow_name',
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
                    {expenseFlowFormFields.slice(1, 2).map((item) => (
                      <Col span={item.colSpan}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              placeholder: 'Select',
                              showSearch: true,
                              filterOption: (input, option) =>
                                option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                              onFocus: () => {
                                const data = form.getFieldValue(['flows', field.name, 'flow']);
                                if (data) {
                                  console.log(data);
                                  setFlowId(data);
                                }
                              },
                            },
                            others: {
                              selectOptions: filterActive(_, kits) || [],
                              key: 'id',
                              dataKeys: ['kit_name', 'kit_info', 'components_per_kit'],
                              customTitle: 'kit_name',
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
                    {expenseFlowFormFields.slice(2).map((item) => (
                      <Col span={item.colSpan}>
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
