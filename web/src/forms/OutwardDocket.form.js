import React, { useEffect,useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin } from 'antd';
import { useHandleForm } from 'hooks/form';
import {
  createOutward,
  editOutward,
  retrieveOutward,
} from 'common/api/auth';
import { outwardDocketFormFields }
  from 'common/formFields/outwardDocket.formFields';
import { useAPI } from 'common/hooks/api';
import formItem from '../hocs/formItem.hoc';

export const OutwardDocketForm = ({ id, onCancel, onDone }) => {
  const { data:flows } = useAPI('/client-flows/');
  const [receiverClients,setReceiverClients] = useState([])
  const [kits,setKits] = useState([])
  const [rClientIndex,setRClientIndex] = useState(0)
  const [isIndex,setIsIndex] = useState(true);
  // kits: Array(3)
  // 0:
  // component_pm: 4800
  // id: 79
  // kit: {id: 21, kit_name: "KIT1182D", kit_info: "On Tank Assy_FSC", components_per_kit: 1200, kit_type: "FSC", …}
  // quantity: 4
  // trip_cost: 1250

  useEffect(()=>{
    if(flows){
      setReceiverClients(flows.map((item,ind)=>({
        ...item.receiver_client,
        value:ind.toString() })))
    }
  },[flows])
  useEffect(()=>{
    if(flows){
      if(flows[rClientIndex]){
        // console.log(flows,'ye wala')
        setKits(flows[rClientIndex].kits.map(item=>({
          id:item.id,
          kit_name:item.kit.kit_name,
          kit_info:item.kit.kit_info,
          kit_type:item.kit.kit_type
        })))
      }
    }
  },[rClientIndex,flows])

  const { form, submit, loading } = useHandleForm({
    create: createOutward,
    edit: editOutward,
    retrieve: retrieveOutward,
    success: 'Vendor created/edited successfully.',
    failure: 'Error in creating/editing vendor.',
    done: onDone,
    close: onCancel,
    id,
  });

  const handleFieldsChange = (data) => {
    if(data[0]){
      if (data[0].name[0] === 'sending_location' ) {
        if(isIndex){
          const ind =parseInt(data[0].value,0);
          setRClientIndex(ind);
          const { id:rId } = receiverClients[ind];
          form.setFieldsValue({ [data[0].name[0]]:rId });
        }
        setIsIndex(!isIndex);
      }}
  };

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
                  key: 'value',
                  customTitle: 'name',
                  dataKeys: ['address',],
                }, })}
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          {outwardDocketFormFields.slice(4, 5).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem({ ...item,others:{
                  selectOptions:kits,
                  key: 'id',
                  customTitle: 'kit_name',
                  dataKeys: ['kit_info','kit_type'],
                } } )}
              </div>
            </Col>
          ))}
          {outwardDocketFormFields.slice(5, 8).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem( item )}
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          {outwardDocketFormFields.slice(8, 11).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
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
