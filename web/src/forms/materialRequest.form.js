import React, {useEffect, useState, useCallback} from 'react';
import {Form, Col, Row, Button, Divider, Spin} from 'antd';
import {
  materialRequestFormFields,
  materialRequestFlowFormFields,
} from 'common/formFields/materialRequest.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createMr, editMr, retrieveMr} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import {useControlledSelect} from '../hooks/useControlledSelect';
import formItem from '../hocs/formItem.hoc';

import _ from 'lodash';
import {filterActive} from 'common/helpers/mrHelper';

export const MaterialRequestForm = ({id, onCancel, onDone, isEmployee}) => {
  const [flowId, setFlowId] = useState(null);
  const [selectedKits, setSelectedKits] = useState([]);

  const {data: flows, loading: loadingF} = useAPI('/myflows/', {});
  //const {data: kitsAll} = useAPI('/kits/', {});

  //const {data: kits} = useControlledSelect(flowId);

  useEffect(() => {
    if (!loadingF && id) {
      const temp = [];
      flows.forEach((f) => {
        f.kits.forEach((k) => {
          temp.push(k.kit);
        });
      });
      setSelectedKits(_.uniqBy(temp, 'id'));
    }
  }, [loadingF]);

  useEffect(() => {
    if (flowId) {
      const selectedFlow = _.find(flows, (f) => f.id === flowId);
      const temp = (selectedFlow.kits || []).map((k) => k.kit);
      setSelectedKits(temp);
    }
  }, [flowId]);

  const {form, submit, loading} = useHandleForm({
    create: createMr,
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
    const newFlows = flows.map((flo) => ({
      flow: Number(flo.flow),
      kit: Number(flo.kit),
      quantity: Number(flo.quantity),
    }));
    data.flows = newFlows;
    console.log(data);
    submit(data);
  };

  const [disableAdd, setDisableAdd] = useState(false);

  const handleFieldsChange = useCallback(
    (data) => {
      if (data[0]) {
        if (data[0].name[0]) {
          const flowsList = form.getFieldValue('flows');
          if (flowsList) {
            if (flowsList.length > 0) {
              if (flowsList[flowsList.length - 1]) {
                if (
                  'flow' in flowsList[flowsList.length - 1] &&
                  'kit' in flowsList[flowsList.length - 1] &&
                  'quantity' in flowsList[flowsList.length - 1]
                ) {
                  setDisableAdd(false);
                } else {
                  setDisableAdd(true);
                }
              } else {
                if (flowsList.length > 1) {
                  let flowsX = form.getFieldValue('flows');
                  flowsX[flowsX.length - 1] = {flow: flowsX[flowsX.length - 2].flow};
                  setFlowId(flowsX[flowsX.length - 2].flow);
                  form.setFieldsValue({flows: flowsX});
                }
              }
            } else {
              setDisableAdd(false);
            }
          }
        }
      }
    },
    [form, disableAdd, setDisableAdd],
  );

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
        <Row style={{justifyContent: 'left'}}>
          {materialRequestFormFields.slice(0, 1).map((item, idx) => (
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
                  <Row align="middle">
                    {materialRequestFlowFormFields.slice(0, 1).map((item) => (
                      <Col span={10}>
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
                              searchKeys: ['flow_info'],
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
                      <Col span={7}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              placeholder: 'Select',
                              showSearch: true,
                              filterOption: (input, option) =>
                                option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                              // onFocus: () => {
                              //   const data = form.getFieldValue(['flows', field.name, 'flow']);
                              //   if (data) {
                              //     setFlowId(data);
                              //   }
                              // },
                            },
                            others: {
                              selectOptions: filterActive(_, selectedKits) || [],
                              key: 'id',
                              dataKeys: ['kit_name', 'components_per_kit'],
                              customTitle: 'part_name',
                              searchKeys: ['kit_name', 'components_per_kit'],
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
                      setDisableAdd(true);
                    }}
                    block
                    disabled={disableAdd}>
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
