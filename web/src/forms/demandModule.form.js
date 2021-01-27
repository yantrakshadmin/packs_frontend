import React, {useState, useCallback, useEffect} from 'react';
import {Form, Col, Row, Button, Divider, Spin, Space, Card} from 'antd';
import {
  demandModuleFormFields,
  demandModuleFlowFormFields,
  demandModuleFlowFormCalFields,
} from 'common/formFields/demandModule.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createMr, editMr, retrieveMr} from 'common/api/auth';
import {PlusOutlined, CloseOutlined} from '@ant-design/icons';
import {useControlledSelect} from '../hooks/useControlledSelect';
import formItem from '../hocs/formItem.hoc';

import DmCalModal from './demandModuleCalModal.form';

import _ from 'lodash';
import {filterActive} from 'common/helpers/mrHelper';

export const DemandModuleForm = ({id, onCancel, onDone}) => {
  const {data: flows} = useAPI('/myflows/', {});
  const [flowId, setFlowId] = useState(null);

  const [kits, setKits] = useState([]);

  useEffect(() => {
    if (flowId) {
      const f = _.find(flows, (o) => o.id === flowId);
      const ks = f.kits.map((el) => el.kit);
      setKits(ks);
    }
  }, [flowId]);

  const {form, submit, loading} = useHandleForm({
    create: createMr,
    edit: editMr,
    retrieve: retrieveMr,
    success: 'Demand created/edited successfully.',
    failure: 'Error in creating/editing Demand.',
    done: onDone,
    close: onCancel,
    id,
    dates: ['delivery_required_on'],
  });

  const [kitQuantities, setKitQuantities] = useState({});

  const preProcess = (data) => {
    const {flows} = data;
    const newFlows = flows.map((flo) => ({
      flow: Number(flo.flow),
      kit: Number(flo.kit),
    }));
    data.flows = newFlows;
    console.log(data);
    submit(data);
  };

  const handleFieldsChange = useCallback(
    (data) => {
      if (data[0]) {
        if (data[0].name) {
          if (data[0].name[0] === 'flows') {
            const fields = form.getFieldsValue();

            if ('flows' in fields) {
              const fieldKey = data[0].name[1];
              const flowsX = fields['flows'];
              if (fieldKey in flowsX) {
                if ('flow' in flowsX[fieldKey]) {
                  const thisFlow = _.find(flows, (o) => o.id === flowsX[fieldKey].flow);
                  if ('kit' in flowsX[fieldKey]) {
                    const thisKit = _.find(kits, (o) => o.id === flowsX[fieldKey].kit);
                    if (thisFlow && thisKit) {
                      Object.assign(flowsX[fieldKey], {
                        part_number: thisKit.part_number,
                        receiver_client_name: thisFlow.receiver_client.name,
                        receiver_client_city: thisFlow.receiver_client.city,
                        flow_days: thisFlow.flow_days,
                        kit_type: thisKit.kit_type,
                        kit_id: thisKit.kit_name,
                        components_per_kit: thisKit.components_per_kit,
                      });
                    }
                  }
                  form.setFieldsValue({flows: flowsX});
                  console.log(flowsX);
                }
              }
            }
          }
        }
      }
    },
    [kits, flows, form, kitQuantities],
  );

  const handleOLDFieldsChange = useCallback(
    (data) => {
      if (data[0]) {
        if (data[0].name) {
          const currentSelected = data[0].name[0];
          if (currentSelected === 'flows') {
            const fieldKey = data[0].name[1];
            form.setFieldsValue({
              flows: form.getFieldValue(currentSelected).map((v) => {
                if (v) {
                  if ('flow' in v && 'kit' in v) {
                    const thisKit = _.find(kits, (o) => o.id === v.kit);
                    const thisFlow = _.find(flows, (o) => o.id === v.flow);
                    const quantities = fieldKey in kitQuantities ? kitQuantities[fieldKey] : [];
                    if (thisKit && thisFlow) {
                      return {
                        ...v,
                        part_number: thisKit.part_number,
                        receiver_client_name: thisFlow.receiver_client.name,
                        receiver_client_city: thisFlow.receiver_client.city,
                        flow_days: thisFlow.flow_days,
                        kit_type: thisKit.kit_type,
                        kit_id: thisKit.kit_name,
                        components_per_kit: thisKit.components_per_kit,
                        quantities: quantities,
                      };
                    }
                  }
                  return v;
                }
              }),
            });
          }
        }
      }
      console.log(form.getFieldsValue());
    },
    [kits, flows, form, kitQuantities],
  );

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Demand Module Details</Divider>
      <Form
        onFinish={preProcess}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        onFieldsChange={handleFieldsChange}>
        <Row style={{justifyContent: 'left'}}>
          {demandModuleFormFields.slice(0, 1).map((item, idx) => (
            <Col span={24}>
              <div key={idx} className="p-2">
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
                  <Card>
                    <Row gutter={8}>
                      <Col span={16}>
                        {demandModuleFlowFormFields.slice(0, 1).map((item) => (
                          <>
                            {formItem({
                              ...item,
                              kwargs: {
                                onChange: (val) => {
                                  setFlowId(val);
                                },
                                placeholder: 'Select Flow',
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
                          </>
                        ))}
                      </Col>
                      <Col span={8}>
                        {demandModuleFlowFormFields.slice(1, 2).map((item) => (
                          <>
                            {formItem({
                              ...item,
                              kwargs: {
                                placeholder: 'Select Part Name',
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
                                customTitle: 'part_name',
                                //dataKeys: ['kit_name', 'kit_info', 'components_per_kit'],
                                formOptions: {
                                  ...field,
                                  name: [field.name, item.key],
                                  fieldKey: [field.fieldKey, item.key],
                                },
                              },
                            })}
                          </>
                        ))}
                      </Col>
                    </Row>

                    <Space key={field.fieldKey}>
                      {demandModuleFlowFormFields.slice(2).map((item) => (
                        <>
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
                        </>
                      ))}
                      <Form.Item label="Cal">
                        <DmCalModal
                          form={form}
                          field={field}
                          kitQuantities={kitQuantities}
                          setKitQuantities={setKitQuantities}
                          deliveryMonth={form.getFieldValue('delivery_month')}
                        />
                      </Form.Item>

                      <Form.Item label="Action">
                        <Button
                          type="danger"
                          title="Delete"
                          onClick={() => {
                            remove(field.name);
                          }}>
                          <CloseOutlined />
                        </Button>
                      </Form.Item>
                    </Space>
                  </Card>
                ))}
                <br />
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
