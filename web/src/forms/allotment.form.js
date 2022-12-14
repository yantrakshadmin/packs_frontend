import React, {useEffect, useState} from 'react';
import {Form, Col, Row, Button, Divider, Spin} from 'antd';
import moment from 'moment';
import {
  allotmentFormFields,
  allotmentProductFormFields,
} from 'common/formFields/allotment.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createAllotment} from 'common/api/auth';
import {navigate} from '@reach/router';
import formItem from '../hocs/formItem.hoc';

const AllotmentForm = ({location}) => {
  const [flows, setFlows] = useState([]);
  const [kits, setKits] = useState([]);
  const [kitsWithInfo, setKitsWithInfo] = useState([]);
  const {data: flowFetched} = useAPI(`/mr-table-exp-allot/?id=${location.state.id || ''}`, {});
  const {data: warehouses} = useAPI('/warehouse/', {});
  const {data: vendors} = useAPI('/vendors/', {});

  const onDone = () => {
    navigate('./material-request/');
  };

  useEffect(() => {
    console.log('kits are', kits);
    if (kits !== undefined) {
      setKitsWithInfo(
        kits.map((k) => {
          return {
            ...k,
            desc: k.kit_name + ' - ' + k.kit_info,
          };
        }),
      );
    }
  }, [kits]);

  useEffect(() => {
    console.log('kits with info', kitsWithInfo);
  }, [kitsWithInfo]);

  const {form, submit, loading} = useHandleForm({
    create: createAllotment,
    success: 'Allotment created/edited successfully.',
    failure: 'Error in creating/editing allotment.',
    done: onDone,
    close: () => null,
  });

  useEffect(() => {
    const fetchFlows = async () => {
      if (location.state.id && flowFetched && flowFetched[0] && form) {
        const tempKits = [];
        const tempFlows = [];
        const reqFlows = (flowFetched[0].flows || []).map((item) => {
          tempFlows.push(item.flow);
          tempKits.push(item.kit);
          return {
            flow: item.flow.id,
            kit: item.kit.id,
            asked_quantity: item.quantity,
          };
        });
        const finalFlows = {
          flows: reqFlows,
        };
        setFlows(tempFlows);
        setKits(tempKits);
        form.setFieldsValue({
          ...finalFlows,
          model: 'Rent',
          vehicle_type: 'Part Load',
          sales_order: location.state.id,
          dispatch_date: moment(flowFetched[0].delivery_required_on),
          expected_delivery: moment(flowFetched[0].delivery_required_on),
        });
      }
    };
    fetchFlows();
  }, [location.state.id, flowFetched, form]);

  const preProcess = (data) => {
    submit(data);
  };

  const getWarehouses = (warehouses) => {
    if (warehouses?.results != undefined) {
      return warehouses?.results.filter((warehouse) => {
        if (warehouse.active === true) return true;
        return false;
      });
    }
    return warehouses;
  };

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Allotment Details</Divider>
      <Form onFinish={preProcess} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row style={{justifyContent: 'left'}}>
          {allotmentFormFields.slice(0, 4).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {allotmentFormFields.slice(4, 8).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          <Col span={6}>
            <div key={9} className="p-2">
              {formItem({
                ...allotmentFormFields[8],
                others: {
                  selectOptions: getWarehouses(warehouses?.results) || [],
                  key: 'id',
                  customTitle: 'name',
                  dataKeys: ['address', 'email'],
                },
              })}
            </div>
          </Col>
          <Col span={6}>
            <div className="p-2">
              {formItem({
                ...allotmentFormFields[9],
                others: {
                  selectOptions: vendors?.results
                    ? vendors?.results.filter((vendor) => vendor.type === 'Transporter')
                    : [],
                  key: 'id',
                  customTitle: 'name',
                  dataKeys: ['city', 'pincode'],
                },
              })}
            </div>
          </Col>
          <Col span={6}>
            <div key={10} className="p-2">
              {formItem(allotmentFormFields[10])}
            </div>
          </Col>
        </Row>
        <Row>
          {allotmentFormFields.slice(11, 13).map((item, idx) => (
            <Col span={4}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>

        <Divider orientation="left">Kit Details</Divider>

        <Form.List name="flows">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align="middle">
                    <Col span={6}>
                      <div className="p-2">
                        {formItem({
                          ...allotmentProductFormFields[0],
                          noLabel: index != 0,
                          others: {
                            selectOptions: flows || [],
                            customTitle: 'flow_name',
                            key: 'id',
                            formOptions: {
                              ...field,
                              name: [field.name, 'flow'],
                              fieldKey: [field.fieldKey, 'flow'],
                            },
                          },
                        })}
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="p-2">
                        {formItem({
                          ...allotmentProductFormFields[1],
                          noLabel: index != 0,
                          others: {
                            selectOptions: kitsWithInfo || [],
                            customTitle: 'desc',
                            key: 'id',
                            formOptions: {
                              ...field,
                              name: [field.name, 'kit'],
                              fieldKey: [field.fieldKey, 'kit'],
                            },
                          },
                        })}
                      </div>
                    </Col>
                    {allotmentProductFormFields.slice(2, 4).map((item, idx) => (
                      <Col span={4}>
                        <div key={idx} className="p-2">
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
                  </Row>
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
          <Button type="primary" onClick={onDone}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};

export default AllotmentForm;
