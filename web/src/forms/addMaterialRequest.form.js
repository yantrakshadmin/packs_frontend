import React, {useEffect, useState, useCallback} from 'react';
import {Form, Col, Row, Button, Divider, Spin, Alert, Space} from 'antd';
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
import {getAllFlows} from 'common/api/auth';
import moment from 'moment';

export const AddMaterialRequestForm = ({id, onCancel, onDone}) => {
  const [flowId, setFlowId] = useState(null);
  const [selectedClient, setSelectedClient] = useState({name: 'Select Client', id: null});
  const {data: flows, loading: loadingF} = useAPI(`/c-flows/?id=${selectedClient.id}`, {});
  const [selectedKits, setSelectedKits] = useState([]);
  //const {data: kits} = useControlledSelect(flowId);
  const {data: clients} = useAPI('/clients/', {});
  const [disableAdd, setDisableAdd] = useState(true);
  const [kitdata, setKitData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  console.log({ flows });

  //code to fetch kitdata whenever client or date is changed or selected
  useEffect(() => {
    if (selectedClient.id !== null && selectedDate !== null) {
      getAllFlows({cname: selectedClient.id, date: selectedDate}).then((response) => {
        setKitData(response.data);
      });
    }
  }, [selectedClient, selectedDate]);

  useEffect(() => {
    if (flows && !loadingF && id) {
      const temp = [];
      flows.forEach((f) => {
        f.kits.forEach((k) => {
          temp.push(k.kit);
        });
      });
      setSelectedKits(_.uniqBy(temp, 'id'));
    }
  }, [loadingF, flows]);

  useEffect(() => {
    if (flowId) {
      const selectedFlow = _.find(flows, (f) => f.id === flowId);
      const temp = (selectedFlow.kits || []).map((k) => k.kit);
      setSelectedKits(temp);
    }
  }, [flowId]);

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

  const handleFieldsChange = useCallback(
    (data) => {
      if (data[0].name[0] === 'delivery_required_on') {
        if (data[0].value === null) {
          setDisableAdd(true);
          setSelectedDate(null);
        } else {
          const d = moment(data[0].value).startOf('date').format('YYYY-MM-DD HH:MM');
          setSelectedDate(d);
          setDisableAdd(false);
        }
      }
      if (data) {
        if (data[0]) {
          if (data[0].name[0] === 'client_id') {
            const sc = _.find(clients?.results, (item) => item.user === data[0].value);
            setSelectedClient({name: sc.client_name, id: sc.user});
          }
        }

        const flowsList = form.getFieldValue('flows');

        if (kitdata !== null && kitdata.detail === undefined) {
          kitdata.forEach((singleData) => {
            const tempKitID = singleData.flows[0].kit.id;
            let cnt = 0;
            if (flowsList !== null && flowsList !== undefined) {
              flowsList.forEach((singleFlow) => {
                if (singleFlow !== undefined)
                  if (singleFlow.kit === tempKitID) {
                    cnt = 1;
                  }
              });
            }
            if (cnt)
              setErrorMessage(
                'Material requests for this kit already exist. Please update or delete the pending material request.',
              );
            else setErrorMessage('');
          });
        }

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
    },
    [clients?.results, selectedClient, setSelectedClient, kitdata],
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
        {formItem({
          key: 'client_id',
          kwargs: {
            placeholder: 'Select',
            disabled: id ? true : false,
          },
          others: {
            selectOptions: clients?.results || [],
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
        <Divider orientation="left">Flows and Kit Details</Divider>
        {errorMessage && (
          <Row justify="center" gutter={[0, 30]} style={{marginBottom: '1rem'}}>
            <Col>
              <Alert message={errorMessage} type="warning" />
            </Col>
          </Row>
        )}
        <Form.List name="flows">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align="middle">
                    {materialRequestFlowFormFields.slice(0, 1).map((item) => (
                      <Col span={7}>
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
                              selectOptions: filterActive(_, flows?.results) || [],
                              key: 'id',
                              dataKeys: ['flow_info'],
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
                      <Col span={11}>
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
                              //     console.log(data);
                              //     setFlowId(data);
                              //   }
                              // },
                            },
                            others: {
                              selectOptions: filterActive(_, selectedKits?.results) || [],
                              key: 'id',
                              dataKeys: ['kit_info', 'components_per_kit'],
                              customTitle: 'kit_name',
                              customTitleInfo: 'kit_info',
                              searchKeys: ['kit_info', 'part_name', 'components_per_kit'],
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
          <Button type="primary" htmlType="submit" disabled={errorMessage ? true : false}>
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
