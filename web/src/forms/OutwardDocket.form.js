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



  const { form, submit, loading } = useHandleForm({
    create: createOutward,
    edit: editOutward,
    retrieve: retrieveOutward,
    success: 'Outward Docket created/edited successfully.',
    failure: 'Error in creating/editing Outward Docket.',
    done: onDone,
    close: onCancel,
    id,
  });

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Outward Docket</Divider>
      <Form
        onFinish={submit}
        form={form}
        layout='vertical'
        hideRequiredMark
        autoComplete='off'
        // onFieldsChange={handleFieldsChange}
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
          {outwardDocketFormFields.slice(4, 5).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className='p-2'>
                 {formItem({ ...item,others:{
                  selectOptions:kits || [],
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
