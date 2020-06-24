import React from 'react';
import {Form, Col, Row, Button, Divider, Spin} from 'antd';
import formItem from '../hocs/formItem.hoc';
import {flowFormFields} from 'common/formFields/flow.formFields';
import {flowKitsFormFields} from 'common/formFields/flowKit.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createFlow, editFlow, retreiveFlow} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';

export const FlowForm = ({id, onCancel, onDone}) => {
  const {data: receiverClients} = useAPI('/receiverclients/', {});
  const {data: clients} = useAPI('/clients/', {});
  const {data: kits} = useAPI('/kits/', {});

  const {form, submit, loading} = useHandleForm({
    create: createFlow,
    edit: editFlow,
    retrieve: retreiveFlow,
    success: 'Flow created/edited successfully.',
    failure: 'Error in creating/editing flow.',
    done: onDone,
    close: onCancel,
    id,
  });

  const preProcess = (data) => {
    const {kits} = data;
    const newKits = kits.map((kitty) => ({
      kit: Number(kitty.kit),
      quantity: Number(kitty.quantity),
      component_pm: Number(kitty.component_pm),
      trip_cost: Number(kitty.trip_cost),
    }));
    data['kits'] = newKits;
    console.log(data);
    submit(data);
  };

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Flow Details</Divider>
      <Form onFinish={preProcess} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row style={{justifyContent: 'left'}}>
          {flowFormFields.slice(0, 3).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {flowFormFields.slice(3, 4).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem({...item})}
              </div>
            </Col>
          ))}
          <Col span={8}>
            <div key={4} className="p-2">
              {formItem({
                ...flowFormFields[4],
                kwargs: {
                  showSearch: true,
                  placeholder: 'Select',
                  optionFilterProp: 'children',
                  filterOption: (input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                },
                others: {
                  selectOptions: clients || [],
                  key: 'user',
                  customTitle: 'client_name',
                },
              })}
            </div>
          </Col>
          <Col span={8}>
            <div key={4} className="p-2">
              {formItem({
                ...flowFormFields[5],
                kwargs: {
                  showSearch: true,
                  placeholder: 'Select',
                  optionFilterProp: 'children',
                  filterOption: (input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                },
                others: {
                  selectOptions: receiverClients || [],
                  key: 'id',
                  customTitle: 'name',
                },
              })}
            </div>
          </Col>
        </Row>
        <Divider orientation="left">Kit Details</Divider>

        <Form.List name="kits">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field) => (
                  <Row align="middle">
                    {flowKitsFormFields.slice(0, 1).map((item) => (
                      <Col span={5}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            kwargs: {
                              placeholder: 'Select',
                              type: 'number',
                              showSearch: true,
                              optionFilterProp: 'children',
                              filterOption: (input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                            },
                            others: {
                              selectOptions: kits || [],
                              key: 'id',
                              dataKeys: ['short_code', 'description', 'category'],
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
                    {flowKitsFormFields.slice(1, 2).map((item) => (
                      <Col span={5}>
                        <div className="p-2">
                          {formItem({
                            ...item,
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
                    {flowKitsFormFields.slice(2, 4).map((item) => (
                      <Col span={5}>
                        <div className="p-2">
                          {formItem({
                            ...item,
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
                    <Button
                      type="danger"
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
