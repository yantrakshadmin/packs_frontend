import React, {useState, useCallback, useEffect} from 'react';
import {Form, Col, Row, Button, Divider, Spin, Space, Card, Input} from 'antd';
import {
  demandModuleFormFields,
  demandModuleFlowFormFields,
  demandModuleFlowFormFieldsSpecialEmp,
} from 'common/formFields/demandModule.formFields';
import {useAPI} from 'common/hooks/api';
import {loadAPI} from 'common/helpers/api';
import {useHandleForm} from 'hooks/form';
import {createDm, editDm, retrieveDm} from 'common/api/auth';
import {PlusOutlined, CloseOutlined} from '@ant-design/icons';
import {useControlledSelect} from '../hooks/useControlledSelect';
import formItem from '../hocs/formItem.hoc';
import _ from 'lodash';

import moment from 'moment';
import DmCalModal from './demandModuleCalModal.form';

import {filterActive} from 'common/helpers/mrHelper';

export const DemandModuleForm = ({id, onCancel, onDone, filteredData}) => {
  //const {data: flows} = useAPI('/myflows/', {});

  //const [flowId, setFlowId] = useState(null);

  //const {data: kits} = useControlledSelect(flowId);

  const [thisDemand, setThisDemand] = useState(null);

  useEffect(() => {
    if (filteredData && id) {
      const t = _.find(filteredData, (el) => el.id === id);
      if (t) {
        setThisDemand(t);
      }
    }
  }, []);

  const {form, submit, loading} = useHandleForm({
    create: createDm,
    edit: editDm,
    retrieve: retrieveDm,
    success: 'Demand created/edited successfully.',
    failure: 'Error in creating/editing Demand.',
    done: onDone,
    close: onCancel,
    id,
    dates: ['delivery_month'],
  });

  const [kitQuantities, setKitQuantities] = useState([]);

  useEffect(() => {
    if (id && !loading) {
      const demand_flows = form.getFieldValue('demand_flows');
      if (demand_flows) {
        const temp = [];

        demand_flows.forEach((i, idx) => {
          temp[idx] = i.quantities.map((ev) => ({
            ...ev,
            date: moment(ev.date),
          }));
        });
        setKitQuantities(temp);
      }
    }
  }, [id, loading]);

  const preProcess = (data) => {
    const {demand_flows} = data;
    console.log(demand_flows);
    const newFlows = demand_flows.map((flo) => ({
      ...flo,
      deployed_pool: flo.deployed_pool ? flo.deployed_pool : 0,
      //   flow: Number(flo.flow),
      //   kit: Number(flo.kit),
      //   monthly_quantity: flo.monthly_quantity,
      //   quantities: flo.quantities,
      //   part_number: flo.part_number ? flo.part_number : '',
      //   receiver_client_name: flo.receiver_client_name ? flo.receiver_client_name : '',
      //   receiver_client_city: flo.receiver_client_city ? flo.receiver_client_city : '',
      //   flow_days: flo.flow_days ? flo.flow_days : '',
      //   kit_name: flo.kit_name ? flo.kit_name : '',
      //   kit_type: flo.kit_type ? flo.kit_type : '',
      //   components_per_kit: flo.components_per_kit ? flo.components_per_kit : '',
    }));
    data.demand_flows = newFlows;
    console.log(data);
    submit(data);
  };

  //   const handleFieldsChange = useCallback(
  //     (data) => {
  //       try {
  //         if (data[0].name[0] === 'demand_flows') {
  //           const fieldKey = data[0].name[1];
  //           const flowsX = form.getFieldValue('demand_flows');
  //           const thisFlow = _.find(flows, (o) => o.id === flowsX[fieldKey].flow);
  //           const thisKit = _.find(kits, (o) => o.id === flowsX[fieldKey].kit);
  //           Object.assign(flowsX[fieldKey], {
  //             part_number: thisKit.part_number,
  //             receiver_client_name: thisFlow.receiver_client.name,
  //             receiver_client_city: thisFlow.receiver_client.city,
  //             flow_days: thisFlow.flow_days,
  //             kit_type: thisKit.kit_type,
  //             kit_name: thisKit.kit_name,
  //             components_per_kit: thisKit.components_per_kit,
  //           });
  //           form.setFieldsValue({demand_flows: flowsX});
  //         }
  //       } catch (err) {}
  //     },
  //     [kits, flows, form],
  //   );

  if (id && !thisDemand) {
    return null;
  }

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Volume Plan Details</Divider>
      <Form
        onFinish={preProcess}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        //onFieldsChange={handleFieldsChange}
      >
        <Card>
          Delivery Month:{' '}
          {thisDemand.delivery_month ? moment(thisDemand.delivery_month).format('MM/YYYY') : '-'}
        </Card>

        <Divider orientation="left">Flow and Kit Details</Divider>

        <Form.List name="demand_flows">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Card>
                    <Row gutter={8}>
                      <Col span={8}>
                        <Form.Item label={'Flow'}>
                          <Input
                            value={thisDemand.demand_flows[field.fieldKey].flow.flow_name}
                            size="middle"
                            disabled
                          />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item label={'Kit'}>
                          <Input
                            value={thisDemand.demand_flows[field.fieldKey].kit.part_name}
                            size="middle"
                            disabled
                          />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item label={'Required Kit/Month'}>
                          <Input
                            value={_.ceil(
                              thisDemand.demand_flows[field.fieldKey].monthly_quantity /
                                thisDemand.demand_flows[field.fieldKey].components_per_kit,
                            )}
                            size="middle"
                            disabled
                          />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item label={'Required Pool'}>
                          <Input
                            value={
                              thisDemand.demand_flows[field.fieldKey].flow.flow_days
                                ? _.ceil(
                                    (thisDemand.demand_flows[field.fieldKey].flow.flow_days / 30) *
                                      (thisDemand.demand_flows[field.fieldKey].monthly_quantity /
                                        thisDemand.demand_flows[field.fieldKey].components_per_kit),
                                  )
                                : '-'
                            }
                            size="middle"
                            disabled
                          />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        {demandModuleFlowFormFieldsSpecialEmp.map((item) => (
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
                      </Col>
                    </Row>

                    <Space key={field.fieldKey}>
                      {demandModuleFlowFormFields.slice(2, 9).map((item) => (
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
                      {/* {demandModuleFlowFormFields.slice(9).map((item) => (
                        <>
                          {formItem({
                            ...item,
                            kwargs: {
                              placeholder: 'Monthly Qty',
                              disabled: true,
                            },
                            others: {
                              formOptions: {
                                ...field,
                                name: [field.name, item.key],
                                fieldKey: [field.fieldKey, item.key],
                              },
                            },
                          })}
                        </>
                      ))} */}
                      <Form.Item label="Cal">
                        <DmCalModal
                          form={form}
                          field={field}
                          fieldName={field.name}
                          kitQuantities={kitQuantities}
                          setKitQuantities={setKitQuantities}
                          deliveryMonth={form.getFieldValue('delivery_month')}
                          letEdit={false}
                        />
                      </Form.Item>
                    </Space>
                  </Card>
                ))}
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

// useEffect(() => {
//   if (id && !loading) {
//     const demand_flows = form.getFieldValue('demand_flows');
//     if (demand_flows) {
//       const DF = demand_flows.map((i, idx) => {
//         try {
//           const {data: thisFlow} = loadAPI(`/demand-flows/?id=${demand_flows[idx].flow}`);
//           const {data: thisKit} = loadAPI(`/demand-kits/?id=${demand_flows[idx].kit}`);
//           return {
//             ...i,
//             part_number: thisKit.part_number,
//             // receiver_client_name: thisFlow.receiver_client.name,
//             // receiver_client_city: thisFlow.receiver_client.city,
//             // flow_days: thisFlow.flow_days,
//             kit_type: thisKit.kit_type,
//             kit_id: thisKit.kit_name,
//             components_per_kit: thisKit.components_per_kit,
//           };
//         } catch (err) {
//           console.log(err);
//           return null;
//         }
//       });

//       console.log(DF);
//       form.setFieldsValue({demand_flows: DF});
//     }
//   }
// }, [id, loading]);

// const handleFieldsChange = useCallback(
//   (data) => {
//     if (data[0]) {
//       if (data[0].name) {
//         if (data[0].name[0] === 'demand_flows') {
//           const fields = form.getFieldsValue();

//           if ('demand_flows' in fields) {
//             const fieldKey = data[0].name[1];
//             const flowsX = fields['demand_flows'];
//             if (fieldKey in flowsX) {
//               if ('flow' in flowsX[fieldKey]) {
//                 const thisFlow = _.find(flows, (o) => o.id === flowsX[fieldKey].flow);
//                 if ('kit' in flowsX[fieldKey]) {
//                   const thisKit = _.find(kits, (o) => o.id === flowsX[fieldKey].kit);
//                   if (thisFlow && thisKit) {
//                     Object.assign(flowsX[fieldKey], {
//                       part_number: thisKit.part_number,
//                       receiver_client_name: thisFlow.receiver_client.name,
//                       receiver_client_city: thisFlow.receiver_client.city,
//                       flow_days: thisFlow.flow_days,
//                       kit_type: thisKit.kit_type,
//                       kit_id: thisKit.kit_name,
//                       components_per_kit: thisKit.components_per_kit,
//                     });
//                   }
//                 }
//                 form.setFieldsValue({demand_flows: flowsX});
//                 console.log(flowsX);
//               }
//             }
//           }
//         }
//       }
//     }
//   },
//   [kits, flows, form],
// );
// const renderDFTable = useCallback(
//   (fieldKey) => {
//     try {
//       const flowsX = form.getFieldsValue('demand_flows');
//       const thisFlow = _.find(flows, (o) => o.id === flowsX[fieldKey].flow);
//       const thisKit = _.find(kits, (o) => o.id === flowsX[fieldKey].kit);
//       const dataSource = [
//         {
//           part_number: thisKit.part_number,
//           receiver_client_name: thisFlow.receiver_client.name,
//           receiver_client_city: thisFlow.receiver_client.city,
//           flow_days: thisFlow.flow_days,
//           kit_type: thisKit.kit_type,
//           kit_id: thisKit.kit_name,
//           components_per_kit: thisKit.components_per_kit,
//         },
//       ];
//       return <Table columns={demandFlowsCols} dataSource={dataSource} size="small" />;
//     } catch (err) {
//       console.log(err);
//       const dataSource = [
//         {
//           part_number: '-',
//           receiver_client_name: '-',
//           receiver_client_city: '-',
//           flow_days: '-',
//           kit_type: '-',
//           kit_id: '-',
//           components_per_kit: '-',
//         },
//       ];
//       return <Table columns={demandFlowsCols} dataSource={dataSource} size="small" />;
//     }
//   },
//   [flowId, kits, flows, form],
// );
