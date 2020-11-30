import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin } from 'antd';
import moment from 'moment';
import {
  allotmentFormFields,
  allotmentProductFormFields,
} from 'common/formFields/allotmentMain.formFields';
import { useAPI } from 'common/hooks/api';
import { useHandleForm } from 'hooks/form';
import { createAllotment, editAllotment, retrieveAllotments } from 'common/api/auth';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import formItem from '../hocs/formItem.hoc';

export const AllotmentMainForm = ({ id, onCancel, onDone }) => {
  const [loading, setLoading] = useState(true);

  const { data: warehouses } = useAPI('/warehouse/', {});
  const { data: vendors } = useAPI('/vendors/', {});
  const { data: kits } = useAPI('/kits/', {});
  const { data: flows } = useAPI('/flows/', {});

  const { form, submit } = useHandleForm({
    create: createAllotment,
    success: 'Allotment created/edited successfully.',
    failure: 'Error in creating/editing Allotment.',
    edit: editAllotment,
    done: onDone,
    close: onCancel,
    id,
  });
  console.log(id);
  useEffect(() => {
    console.log(id);
    const fetchAllotment = async () => {
      setLoading(true);
      const { data } = await retrieveAllotments(id);
      if (data) {
        const allotment = data;
        console.log(allotment);
        const formData = {
          flows: allotment.flows.map((flo) => ({
            flow: flo.flow.id,
            kit: flo.kit.id,
            asked_quantity: flo.asked_quantity,
            alloted_quantity: flo.alloted_quantity,
          })),
          sales_order: allotment.sales_order.id,
          model: allotment.model,
          driver_name: allotment.driver_name,
          lr_number: allotment.lr_number,
          vehicle_number: allotment.vehicle_number,
          freight_charges: allotment.freight_charges,
          vehicle_type: allotment.vehicle_type,
          remarks: allotment.remarks,
          transport_by: allotment.transport_by.id,
          send_from_warehouse: allotment.send_from_warehouse.id,
          dispatch_date: moment(allotment.dispatch_date),
          expected_delivery: moment(allotment.expected_delivery),
        };
        console.log(formData);
        form.setFieldsValue({ ...formData });
        setLoading(false);
      }
    };
    if (id && form && kits && warehouses && flows && vendors) fetchAllotment();
  }, [id, form, kits, warehouses, flows, vendors]);

  const preProcess = (data) => {
    console.log(data);
    submit(data);
  };

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Allotment Details</Divider>
      <Form onFinish={preProcess} form={form} layout='vertical' hideRequiredMark autoComplete='off'>
        <Row style={{ justifyContent: 'left' }}>
          {allotmentFormFields.slice(0, 4).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ justifyContent: 'left' }}>
          {allotmentFormFields.slice(4, 8).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          <Col span={6}>
            <div key={9} className='p-2'>
              {formItem({
                ...allotmentFormFields[8],
                kwargs: {
                  showSearch: true,
                  placeholder: 'Select',
                  filterOption: (input, option) =>
                    option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                },
                others: {
                  selectOptions: warehouses || [],
                  key: 'id',
                  customTitle: 'name',
                  dataKeys: ['address', 'email'],
                },
              })}
            </div>
          </Col>
          <Col span={6}>
            <div className='p-2'>
              {formItem({
                ...allotmentFormFields[9],
                kwargs: {
                  showSearch: true,
                  placeholder: 'Select',
                  filterOption: (input, option) =>
                    option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                },
                others: {
                  selectOptions: vendors
                    ? vendors.filter((vendor) => vendor.type === 'Transporter')
                    : [],
                  key: 'id',
                  customTitle: 'name',
                  dataKeys: ['city', 'pincode'],
                },
              })}
            </div>
          </Col>
          {allotmentFormFields.slice(10, 12).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Divider orientation='left'>Kit Details</Divider>

        <Form.List name='flows'>
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align='middle'>
                    <Col span={5}>
                      <div className='p-2'>
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
                    <Col span={5}>
                      <div className='p-2'>
                        {formItem({
                          ...allotmentProductFormFields[1],
                          noLabel: index != 0,
                          others: {
                            selectOptions: kits || [],
                            customTitle: 'kit_name',
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
                      <Col span={5}>
                        <div key={idx} className='p-2'>
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
                    <Button
                      type='danger'
                      style={index != 0 ? { top: '-2vh' } : null}
                      onClick={() => {
                        remove(field.name);
                      }}>
                      <MinusCircleOutlined />
                      {' '}
                      Delete
                    </Button>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type='dashed'
                    onClick={() => {
                      add();
                    }}
                    block>
                    <PlusOutlined />
                    {' '}
                    Add Item
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        <Row>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
          <div className='p-2' />
          <Button type='primary' onClick={onDone}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};
