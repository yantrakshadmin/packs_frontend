import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Form, Col, Row, Button, Divider, Spin } from 'antd';
import { ticketFormFields, ticketFlowFormFields } from 'common/formFields/ticket.formFields';
import { useAPI } from 'common/hooks/api';
import { useHandleForm } from 'hooks/form';
import { createDEPS, editDEPS, retrieveAllotments, retrieveDEP, retrieveGRNs, retrieveReturnDocket } from 'common/api/auth';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { getUniqueObject } from 'common/helpers/getUniqueValues';
import _ from 'lodash';
import formItem from '../hocs/formItem.hoc';
import moment from 'moment';
import { loadAPI } from 'common/helpers/api';

export const TicketForm = ({ id, onCancel, onDone, isAssigned }) => {

  const [ticketData, setTicketData] = useState([]);
  const [transactionType, setTransactionType] = useState([]);
  const [transactionId, setTransactionId] = useState(0);
  const [transactionData, setTransactionData] = useState([]);
  const [title, setTitle] = useState('id');
  const [dataKeys, setDataKeys] = useState([]);

  const {user} = useSelector((s) => s);
  const {userMeta} = user;
  const {id: companyId} = userMeta;


  const { data: users } = useAPI(`/employees/`);
  // const { data: users } = useAPI(`/employees-wp/${companyId}/`);
  const { data: allotExp } = useAPI(`/allot-exp/?id=${companyId}`);
  const { data: grnExp } = useAPI(`/grn-exp/?id=${companyId}`);
  const { data: returnExp } = useAPI(`/return-exp/?id=${companyId}`);

  const { form, submit, loading } = useHandleForm({
    create: createDEPS,
    edit: editDEPS,
    retrieve: retrieveDEP,
    success: 'Ticket created/edited successfully',
    failure: 'Error in creating/editing Ticket.',
    done: onDone,
    close: onCancel,
    id
  });


  useEffect(() => {

    const setData = async () => {

      if(transactionType == 'Allotment' && allotExp) {
        setTitle('transaction_no')
        setDataKeys(['dispatch_date'])
        setTransactionData(allotExp.map((i) => ({ ...i, dispatch_date: moment(i.dispatch_date).format('L') })))
      } else if(transactionType == 'Return' && returnExp) {
        setTitle('transaction_no')
        setDataKeys(['transaction_date'])
        setTransactionData(returnExp.map((i) => ({ ...i, transaction_date: moment(i.transaction_date).format('L') })))
      } else if(transactionType == 'GRN' && grnExp) {
        setTitle('invoice_no')
        setDataKeys(['inward_date'])
        setTransactionData(grnExp.map((i) => ({ ...i, inward_date: moment(i.inward_date).format('L') })))
      }
      
    }

    setData()
    
  }, [transactionType])

  useEffect(() => {

    const setData = async () => {

      if(transactionType == 'Allotment' && allotExp) {
        const {data: products} = await retrieveAllotments(transactionId)
        setTicketData(getUniqueObject(
          products.flows.map((flow) => flow.kit.products.map((item) => item.product)),
          'id',
        )[0])
      } else if(transactionType == 'Return' && returnExp) {

        const {data: products} = await loadAPI(`return-received/?id=${transactionId}`);
        const {data: allProducts} = await loadAPI(`/products/`);

        const neededProducts = products.kits.map((kit) => kit.kit.products.map((item) => item.product))[0]

        const myArrayFiltered = allProducts.filter((el) => {
          return neededProducts.some((f) => {
            return f.id === el.id ;
          });
        });
        
        setTicketData(myArrayFiltered)
        
      } else if(transactionType == 'GRN' && grnExp) {
        const {data: products} = await retrieveGRNs()
        console.log(transactionId)
        setTicketData(getUniqueObject(
          products.filter(product => product.id == transactionId)[0].items.map((item) => item.item),
          'id',
        ))
      }
      
    }

    setData()

  }, [transactionId])

  useEffect(() => {
    if(id && !loading){

      setTransactionType(form.getFieldValue('transaction_type'))

      if(form.getFieldValue('transaction_type') == 'Allotment'){
        form.setFieldsValue({'t_no': form.getFieldValue('a_t_no')})
      } else if(form.getFieldValue('transaction_type') == 'Return') {
        form.setFieldsValue({'t_no': form.getFieldValue('r_t_no')})
      } else if(form.getFieldValue('transaction_type') == 'GRN') {
        form.setFieldsValue({'t_no': form.getFieldValue('g_t_no')})
      } else if(form.getFieldValue('transaction_type') == 'Delivered') {
        form.setFieldsValue({'t_no': form.getFieldValue('d_t_no')})
      } else if(form.getFieldValue('transaction_type') == 'Received') {
        form.setFieldsValue({'t_no': form.getFieldValue('rec_t_no')})
      } else if(form.getFieldValue('transaction_type') == 'Relocation') {
        form.setFieldsValue({'t_no': form.getFieldValue('rel_t_no')})
      }

      setTransactionId(form.getFieldValue('t_no'))

    }
  }, [id, loading, form])

  const preProcess = (data) => {

    if(transactionType == 'Allotment'){
      data.a_t_no = data.t_no
    } else if(transactionType == 'Return') {
      data.r_t_no = data.t_no
    } else if(transactionType == 'GRN') {
      data.g_t_no = data.t_no
    } else if(transactionType == 'Delivered') {
      data.d_t_no = data.t_no
    } else if(transactionType == 'Received') {
      data.rec_t_no = data.t_no
    } else if(transactionType == 'Relocation') {
      data.rel_t_no = data.t_no
    }

    delete data.t_no

    if(data.assigned_to){
      if(data.status == 'Unassigned') data.status = 'Assigned'
      else if(!!isAssigned) {
        data.status = 'Assigned'
      }
    } else {
      if(data.status == 'Assigned') data.status = 'Unassigned'
    }

    submit(data);

  };

  const handleFieldsChange = useCallback(
    (data) => {
      if (data[0]) {
        if (data[0].name) {
          const thisField = data[0].name[0];
          console.log(form.getFieldValue(thisField), thisField);
          if(thisField == 'transaction_type') setTransactionType(form.getFieldValue(thisField))
          if(thisField == 't_no') setTransactionId(form.getFieldValue(thisField))
        }
      }
    },
    [],
  );

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Ticket Details</Divider>
      <Form
        onFinish={preProcess}
        initialValues={{ status: 'Unassigned', criticality: 'Normal' }}
        form={form}
        layout='vertical'
        hideRequiredMark
        autoComplete='off'
        onFieldsChange={handleFieldsChange}>
        <Row style={{ justifyContent: 'left' }}>
          {ticketFormFields.slice(0, 1).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className='p-2'>
                {formItem({
                  ...item,
                  others: {
                    selectOptions: users || [],
                    key: 'user',
                    dataKeys: ['employee_city'],
                    customTitle: 'employee_name',
                  },
                })}
              </div>
            </Col>
          ))}
          {ticketFormFields.slice(1, 2).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className='p-2'>
                {formItem({
                  ...item,
                  kwargs: {
                    ...item.kwargs,
                    disabled: !!id,
                  },
                })}
              </div>
            </Col>
          ))}
          {ticketFormFields.slice(2, 3).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className='p-2'>
                {formItem({
                  ...item,
                  kwargs: {
                    ...item.kwargs,
                    disabled: !!id,
                  },
                  others: {
                    selectOptions: transactionData || [],
                    key: 'id',
                    dataKeys: dataKeys,
                    customTitle: title,
                  },
                })}
              </div>
            </Col>
          ))}
          {ticketFormFields.slice(3).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className='p-2'>
                {formItem({
                  ...item,
                  kwargs: {
                    ...item.kwargs,
                    disabled: (!!id && isAssigned),
                  },
                })}
              </div>
            </Col>
          ))}
        </Row>

        <Divider orientation='left'>Transaction Details</Divider>

        <Form.List name='items'>
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align='middle'>
                    {/* {ticketFlowFormFields.slice(0, 1).map((item, idx) => (
                      <Col key={idx} span={item.colSpan}>
                        <div className='p-2'>
                          {formItem({ ...item,
                            noLabel: index != 0,
                            kwargs: {
                              ...item.kwargs,
                              showSearch: true,
                              filterOption: (input, option) =>
                                option.search
                                  ?.toString()
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0,
                            },
                            others: {
                              ...item.others,
                              key: 'id',
                              formOptions: {
                                ...field,
                                name: [field.name, item.key],
                                fieldKey: [field.fieldKey, item.key],
                                getValueFromEvent:(r)=>{
                                  setRefreshTransactionNumber(prev => prev +1)
                                  return r
                                },
                              },
                            },
                          })}
                        </div>
                      </Col>
                    ))} */}
                    {ticketFlowFormFields.slice(1, 2).map((item, idx) => (
                      <Col key={idx} span={item.colSpan}>
                        <div className='p-2'>
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              ...item.kwargs,
                              disabled: (!!id && isAssigned),
                              showSearch: true,
                              filterOption: (input, option) =>
                                option.search
                                  ?.toString()
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0,
                            },
                            others: {
                              selectOptions: ticketData || [],
                              key: 'id',
                              customTitle: 'name',
                              dataKeys: ['short_code'],
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
                    {ticketFlowFormFields.slice(2,3).map((item, idx) => (
                      <Col key={idx} span={item.colSpan}>
                        <div className='p-2'>
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              ...item.kwargs,
                              disabled: (!!id && isAssigned),
                            },
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
                    {ticketFlowFormFields.slice(3, 4).map((item, idx) => (
                      <Col key={idx} span={item.colSpan}>
                        <div className='p-2'>
                          {formItem({ ...item,
                            noLabel: index != 0,
                            kwargs: {
                              ...item.kwargs,
                              disabled: (!!id && isAssigned),
                            },
                            others: {
                              ...item.others,
                              key: 'id',
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
                    <Col span={1}>
                      <Button
                        // style={{ width: '9vw' }}
                        disabled={(!!id && isAssigned)}
                        style={index != 0 ? { top: '-2vh' } : null}
                        type='danger'
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
                    type='dashed'
                    disabled={(!!id && isAssigned)}
                    onClick={() => {
                      add();
                    }}
                    block
                    // disabled={!ttTouched}
                  >
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
          <Button type='primary' onClick={onCancel}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};

