import React, { useEffect, useState } from 'react';
import { useAPI } from 'common/hooks/api';
import { Button, Col, Form, Row } from 'antd';
import moment from 'moment';
import formItem from 'hocs/formItem.hoc';
import { FORM_ELEMENT_TYPES } from 'constants/formFields.constant';
import { MasterHOC } from 'hocs/Master.hoc';

export const InventoryScreen = () => {
  const { data: warehouses } = useAPI('/warehouse/', {});
  const [ reqObj,setObj ] = useState({ warehouse:null,date:null })
  const [ cid,setCid ] = useState(null)
  const { data: inventory,loading:invLoading } =
    useAPI(reqObj.warehouse && reqObj.date?
      `/inventory/?wh=${reqObj.warehouse}&date=${reqObj.date}`:'', {});
  const { data: clients } = useAPI('/clients/', {});
  const { data: transitData,loading:transitLoading } = useAPI(`/client-inventory/?id=${cid}`, {});
  const [form] = Form.useForm();
  const [ reformattedInv,setReformattedInv] = useState([])
  const [ reformattedTran,setReformattedTran] = useState([])

  const onSubmitTransit = async (data) => {
    setCid(data.cid);
  };

  const onSubmit = async (data) => {
    const date = moment(form.getFieldValue('date')).format('YYYY-MM-DD+HH:MM');
    setObj({ warehouse:data.warehouse,date })
  };

  const reformatData = (obj ) =>{
    return obj?Object.keys(obj).map(code=>({ productCode:code,productQuantity:obj[code] })):[]
  }

  useEffect(()=>{
    setReformattedInv(reformatData(inventory))
  },[inventory])

  useEffect(()=>{
    setReformattedTran(reformatData(transitData))
  },[transitData])

  const column  = [
    {
      title:'Product Code',
      key:'productCode',
      dataIndex:'productCode'
    },
    {
      title:'Product Quantity',
      key:'productQuantity',
      dataIndex:'productQuantity'
    }
  ];

  return (
    <div>
      <Row gutter={32}>
        <Col span={12}>
          <Form
            onFinish={onSubmit}
            form={form}
            layout='vertical'
            hideRequiredMark
            autoComplete='off'>
            <Row align='middle' gutter={32}>
              <Col span={16}>
                {formItem({
                  key: 'warehouse',
                  kwargs: {
                    placeholder: 'Select',
                    showSearch: true,
                    filterOption: (input, option) =>
                      option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                  },
                  others: {
                    selectOptions: warehouses || [],
                    key: 'id',
                    dataKeys: ['address', 'city'],
                    customTitle: 'name',
                  },
                  type: FORM_ELEMENT_TYPES.SELECT,
                  customLabel: 'Warehouse',
                })}
              </Col>
              <Col span={8}>
                {formItem({
                  key: 'date',
                  rules: [{ required: true, message: 'Please select From date!' }],
                  kwargs: {
                    placeholder: 'Select',
                    type: 'number',
                  },
                  type: FORM_ELEMENT_TYPES.DATE,
                  others: null,
                  customLabel: 'Date',
                })}
              </Col>
            </Row>
            <Row justify='center'>
              <Col span={4}>
                <Button type='primary' htmlType='submit'>
                  Get Inventory
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={12}>
          <Form
            onFinish={onSubmitTransit}
            layout='vertical'
            hideRequiredMark
            autoComplete='off'>
            <Row align='middle' justify='center' gutter={32}>
              <Col span={16}>
                {formItem({
                  key: 'cid',
                  kwargs: {
                    placeholder: 'Select',
                    showSearch: true,
                    filterOption: (input, option) =>
                      option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                  },
                  others: {
                    selectOptions: clients || [],
                    key: 'user',
                    customTitle: 'client_name',
                    dataKeys: ['client_shipping_address'],
                  },
                  type: FORM_ELEMENT_TYPES.SELECT,
                  customLabel: 'Client',
                })}
              </Col>
            </Row>
            <Row justify='center'>
              <Col span={4}>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row gutter={32}>
        <Col span={12}>
          <MasterHOC
            size='small'
            data={reformattedInv}
            title='Inventory'
            hideRightButton
            loading={invLoading}
            columns={column} />
        </Col>
        <Col span={12}>
          <MasterHOC
            size='small'
            data={reformattedTran}
            title='Client Inventory'
            hideRightButton
            loading={transitLoading}
            columns={column} />
        </Col>
      </Row>
    </div>
  );
};
export default InventoryScreen;
