import React, {useEffect, useState, useCallback} from 'react';
import {Form, Col, Row, Button, Divider, Spin, Card} from 'antd';
import {groupFormFields, groupModelChoicesGrouped} from 'common/formFields/group.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createGroup, editGroup, retrieveGroup} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import formItem from '../hocs/formItem.hoc';
import {FORM_ELEMENT_TYPES} from '../constants/formFields.constant';

import _ from 'lodash';

export const GroupForm = ({id, onCancel, onDone}) => {
  const {data: employees} = useAPI('/employees/', {});

  const {data: sender_clients} = useAPI('/clients/', {});
  const {data: receiver_clients} = useAPI('/receiverclients/', {});
  const {data: warehouses} = useAPI('/warehouse/', {});

  const [selectedModels, setSelectedModels] = useState([]);

  const {form, submit, loading} = useHandleForm({
    create: createGroup,
    edit: editGroup,
    retrieve: retrieveGroup,
    success: 'Group created/edited successfully',
    failure: 'Error in creating/editing Group.',
    done: onDone,
    close: onCancel,
    id,
    dates: ['invoice_date'],
  });

  useEffect(() => {
    if (id && !loading) {
      const temp = form.getFieldValue('groupmodels');
      const smTemp = selectedModels;
      temp.forEach((m) => {
        const k = _.findKey(groupModelChoicesGrouped, (o) => o.includes(m.model));
        if (k && !smTemp.includes(k)) {
          smTemp.push(k);
          form.setFieldsValue({
            [k]: true,
          });
        }
      });
      setSelectedModels(smTemp);
    }
  }, [id, loading]);

  const preProcess = useCallback(
    (data) => {
      const temp = {};
      temp.name = data.name;
      temp.emp = data.emp;
      temp.sender_clients = data.sender_clients || [];
      temp.receiver_clients = data.receiver_clients || [];
      temp.warehouses = data.warehouses || [];
      let s = [];
      selectedModels.forEach((i) => {
        groupModelChoicesGrouped[i].forEach((j) => {
          s.push({model: j});
        });
      });

      // if (temp.sender_clients.length > 0) {
      //   s.push({model: 'Sender Client'});
      // }

      if (temp.receiver_clients.length > 0) {
        s.push({model: 'Receiver Client'});
      }

      if (temp.warehouses.length > 0) {
        s.push({model: 'Warehouse'});
      }

      temp.groupmodels = s;
      submit(temp);
    },
    [selectedModels],
  );

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Group Details</Divider>
      <Form
        onFinish={preProcess}
        initialValues={{status: 'Hold', gst: 0}}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off">
        <Row style={{justifyContent: 'left'}}>
          {groupFormFields.slice(0, 1).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {groupFormFields.slice(1, 2).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  others: {
                    ...item.others,
                    selectOptions: employees || [
                      {
                        user: 2,
                        employee_name: 'Yantraksh',
                        employee_email: '0',
                        employee_phone: '0',
                        employee_city: '0',
                        employee_role: 'callrahul',
                      },
                    ],
                    key: 'user',
                    dataKeys: ['employee_email'],
                    customTitle: 'employee_name',
                  },
                })}
              </div>
            </Col>
          ))}
        </Row>

        <Divider orientation="left">Model Details</Divider>

        <Row style={{justifyContent: 'left'}}>
          {_.keys(groupModelChoicesGrouped).map((modelName, modelIdx) => (
            <Col span={8} key={modelIdx}>
              <Card>
                <Row gutter={10}>
                  <Col span={18}>{modelName}</Col>
                  <Col span={6}>
                    {formItem({
                      key: modelName,
                      type: FORM_ELEMENT_TYPES.SWITCH,
                      kwargs: {
                        onChange: (val) => {
                          if (val) {
                            setSelectedModels(_.concat(selectedModels, [modelName]));
                          } else {
                            setSelectedModels(_.remove(selectedModels, (i) => i !== modelName));
                          }
                        },
                      },
                      others: {
                        defaultValue: false,
                        formOptions: {noStyle: true},
                      },
                      customLabel: modelName,
                    })}
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>

        <br />

        <Row gutter={10}>
          <Col span={8}>
            <Card title="Sender Clients">
              <Form.List name="sender_clients">
                {(fields, {add, remove}) => {
                  return (
                    <div>
                      {fields.map((field, index) => (
                        <Row align="middle">
                          <Col span={20}>
                            <div className="p-2">
                              {formItem({
                                type: FORM_ELEMENT_TYPES.SELECT,
                                noLabel: true,
                                kwargs: {
                                  placeholder: 'Select Sender Client',
                                  showSearch: true,
                                  filterOption: (input, option) =>
                                    option.search
                                      .toString()
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0,
                                },
                                others: {
                                  selectOptions: sender_clients || [],
                                  key: 'user',
                                  dataKeys: ['client_email'],
                                  customTitle: 'client_name',
                                  formOptions: {
                                    ...field,
                                    name: [field.name, 'pk'],
                                    fieldKey: [field.fieldKey, 'pk'],
                                  },
                                },
                              })}
                            </div>
                          </Col>
                          <Col span={4}>
                            <Button
                              // style={{ width: '9vw' }}
                              style={{top: '-2vh'}}
                              type="danger"
                              onClick={() => {
                                remove(field.name);
                              }}
                              block>
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
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Receiver Clients">
              <Form.List name="receiver_clients">
                {(fields, {add, remove}) => {
                  return (
                    <div>
                      {fields.map((field, index) => (
                        <Row align="middle">
                          <Col span={20}>
                            <div className="p-2">
                              {formItem({
                                type: FORM_ELEMENT_TYPES.SELECT,
                                noLabel: true,
                                kwargs: {
                                  placeholder: 'Select Receiver Client',
                                  showSearch: true,
                                  filterOption: (input, option) =>
                                    option.search
                                      .toString()
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0,
                                },
                                others: {
                                  selectOptions: receiver_clients || [],
                                  key: 'id',
                                  dataKeys: ['address'],
                                  customTitle: 'name',
                                  formOptions: {
                                    ...field,
                                    name: [field.name, 'pk'],
                                    fieldKey: [field.fieldKey, 'pk'],
                                  },
                                },
                              })}
                            </div>
                          </Col>
                          <Col span={4}>
                            <Button
                              // style={{ width: '9vw' }}
                              style={{top: '-2vh'}}
                              type="danger"
                              onClick={() => {
                                remove(field.name);
                              }}
                              block>
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
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Warehouses">
              <Form.List name="warehouses">
                {(fields, {add, remove}) => {
                  return (
                    <div>
                      {fields.map((field, index) => (
                        <Row align="middle">
                          <Col span={20}>
                            <div className="p-2">
                              {formItem({
                                type: FORM_ELEMENT_TYPES.SELECT,
                                noLabel: true,
                                kwargs: {
                                  placeholder: 'Select Warehouse',
                                  showSearch: true,
                                  filterOption: (input, option) =>
                                    option.search
                                      .toString()
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0,
                                },
                                others: {
                                  selectOptions: warehouses || [],
                                  key: 'id',
                                  dataKeys: ['address'],
                                  customTitle: 'name',
                                  formOptions: {
                                    ...field,
                                    name: [field.name, 'pk'],
                                    fieldKey: [field.fieldKey, 'pk'],
                                  },
                                },
                              })}
                            </div>
                          </Col>
                          <Col span={4}>
                            <Button
                              // style={{ width: '9vw' }}
                              style={{top: '-2vh'}}
                              type="danger"
                              onClick={() => {
                                remove(field.name);
                              }}
                              block>
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
            </Card>
          </Col>
        </Row>

        <br />

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
