import React, {useEffect, useState} from 'react';
import {Form, Col, Row, Button, Divider, Spin} from 'antd';
import {
  materialRequestFormFields,
  materialRequestFlowFormFields,
} from 'common/formFields/materialRequest.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createMr, editAddMr, retrieveAddMr} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import {useControlledSelect} from '../hooks/useControlledSelect';
import formItem from '../hocs/formItem.hoc';
import {FORM_ELEMENT_TYPES} from '../constants/formFields.constant';

import _ from 'lodash';
import {filterActive} from 'common/helpers/mrHelper';

export const AddMaterialRequestForm = ({id, onCancel, onDone}) => {
  const [flowId, setFlowId] = useState(null);
  const [selectedClient, setSelectedClient] = useState({name: 'Select Client', id: null});
  const {data: flows} = useAPI(`/c-flows/?id=${selectedClient.id}`, {});
  const {data: kits} = useControlledSelect(flowId);
  const {data: clients} = useAPI('/clients/', {});

  const {form, submit, loading} = useHandleForm({
    create: createMr,
    edit: editAddMr,
    retrieve: async () => {
      const result = await retrieveAddMr(id);
      console.log(result.data, 'ret');
      setSelectedClient({id: result.data.owner});
      return {...result, data: {...result.data, client_id: result.data.owner}};
    },
    success: 'Material Request created/edited successfully.',
    failure: 'Error in creating/editing material request.',
    done: onDone,
    close: onCancel,
    id,
    dates: ['delivery_required_on'],
  });

  const preProcess = (data) => {
    const {flows} = data;
    const newFlows = flows.map((flo) => ({
      flow: Number(flo.flow),
      kit: Number(flo.kit),
      quantity: Number(flo.quantity),
    }));
    data.flows = newFlows;
    submit(data);
  };

  const handleFieldsChange = (data) => {
    if (data) {
      if (data[0]) {
        if (data[0].name[0] === 'client_id') {
          const filtered = clients.filter((item) => item.user === data[0].value);
          setSelectedClient({name: filtered[0].client_name, id: filtered[0].user});
        }
      }
    }
  };
  // useEffect(()=>{
  //   console.log('flows',newflows,flows);
  // },[ newflows])
  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Material Request Details</Divider>
      <Form
        onFinish={preProcess}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        onFieldsChange={handleFieldsChange}>
        {formItem({
          key: 'client_id',
          kwargs: {
            placeholder: 'Select',
          },
          others: {
            selectOptions: clients || [],
            key: 'user',
            customTitle: 'client_name',
            dataKeys: ['client_shipping_address'],
          },
          type: FORM_ELEMENT_TYPES.SELECT,
          customLabel: 'Client',
        })}
        <Divider orientation="center">{selectedClient.name}</Divider>
        <Row style={{justifyContent: 'left'}}>
          {materialRequestFormFields.slice(0, 1).map((item, idx) => (
            <Col span={24}>
              <div key={idx.toString()} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Divider orientation="left">Flow and Kit Details</Divider>
        <Form.List name="flows">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align="middle">
                    {materialRequestFlowFormFields.slice(0, 1).map((item) => (
                      <Col span={13}>
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
                    {materialRequestFlowFormFields.slice(1, 2).map((item) => (
                      <Col span={4}>
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
                    {materialRequestFlowFormFields.slice(2, 3).map((item) => (
                      <Col span={4}>
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
                    <Col span={3}>
                      <Button
                        // style={{ width: '9vw' }}
                        style={index != 0 ? {top: '-2vh'} : null}
                        type="danger"
                        onClick={() => {
                          remove(field.name);
                        }}>
                        <MinusCircleOutlined /> Delete
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
