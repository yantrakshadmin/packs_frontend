import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Form, Row, Spin } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useHandleForm } from 'hooks/form';
import { createOutward, editOutward, retrieveOutward } from 'common/api/auth';
import { outwardDocketFormFields, } from 'common/formFields/outwardDocket.formFields';
import { outwardDocketKitFormFields } from 'common/formFields/outwardDocketKits.formFields'
import { useAPI } from 'common/hooks/api';
import { getUniqueObject } from 'common/helpers/getUniqueValues';
import formItem from '../hocs/formItem.hoc';

export const OutwardDocketForm = ({ id, onCancel, onDone }) => {
  const { data:flows } = useAPI('/client-flows/');
  const { data:kits } = useAPI('/client-kits/');
  const [receiverClients,setReceiverClients] = useState([])

  useEffect(()=>{
    if(flows){
      setReceiverClients(getUniqueObject(flows.map((item)=>(item.receiver_client)),'id'))
    }
  },[flows])

  const getKits = (data) => {
    return data.map(item => ({
      kit:item.kit,
      quantity_parts: item.quantity_parts,
      quantity_kit: item.quantity_kit }))
  }


  const { form, submit, loading } = useHandleForm({
    create: createOutward,
    edit:editOutward,
    retrieve:
      async (fetchId)=>{
        const response = await retrieveOutward(fetchId);
        const { data } = response;
        const temp= getKits(data.kits)
        return { ...response, data:{ ...data,kits:temp, } }
      },
    success: 'Outward Docket created/edited successfully.',
    failure: 'Error in creating/editing Outward Docket.',
    done: onDone,
    close: onCancel,
    id,
    dates: ['dispatch_date','transaction_date'],
  });

  const handleFieldsChange = (data) => {
    if(data[0]){
      if(data[0].name){
        if(data[0].name[2]==='quantity_parts'){
          const allkits = form.getFieldValue('kits')
          const selectedKit = kits.filter(i=>(i.id === allkits[data[0].name[1]].kit))
          allkits[data[0].name[1]] = {
            ...allkits[data[0].name[1]],
            quantity_kit: Math.ceil(parseInt(data[0].value,0) / selectedKit[0].components_per_kit)
          }
          form.setFieldsValue('kits',allkits)
        }}}
  }


  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Outward Docket</Divider>
      <Form
        onFinish={submit}
        form={form}
        layout='vertical'
        hideRequiredMark
        autoComplete='off'
        onFieldsChange={handleFieldsChange}
        >
        <Row>
          {outwardDocketFormFields.slice(0, 3).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
          {outwardDocketFormFields.slice(3, 4).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem({ ...item,others: {
                  selectOptions:receiverClients,
                  key: 'id',
                  customTitle: 'name',
                  dataKeys: ['address',],
                }, })}
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          {outwardDocketFormFields.slice(4, 8).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>

        <Divider orientation='left'>Kit Details</Divider>

        <Form.List name='kits'>
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align='middle'>
                    {outwardDocketKitFormFields.slice(0, 1).map((item) => (
                      <Col span={7}>
                        <div className='p-2'>
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              placeholder: 'Select',
                              showSearch: true,
                              filterOption: (input, option) =>
                                option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                            },
                            form,
                            others: {
                              selectOptions: kits || [],
                              key: 'id',
                              dataKeys: ['components_per_kit', 'kit_info', 'kit_name'],
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
                    {outwardDocketKitFormFields.slice(1, 3).map((item) => (
                      <Col span={7}>
                        <div className='p-2'>
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
                            form,
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
          <Button type='primary' onClick={onCancel}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};
