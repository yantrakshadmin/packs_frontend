import React, { useEffect, useState } from 'react';
import { useAPI } from 'common/hooks/api';
import { Button, Col, Form, Row } from 'antd';
import moment from 'moment';
import formItem from '../../hocs/formItem.hoc';
import { FORM_ELEMENT_TYPES } from '../../constants/formFields.constant';
import { MasterHOC } from '../../hocs/Master.hoc';

export const InventoryScreen = () => {
  const { data: warehouses } = useAPI('/warehouse/', {});
  const [ reqObj,setObj ] = useState({ warehouse:null,date:null })
  const { data: inventory,loading:invLoading } =
    useAPI(reqObj.warehouse && reqObj.date?`/inventory/?wh=${reqObj.warehouse}&date=${reqObj.date}`:'/inventory/', {});
  const [form] = Form.useForm();
  const [ reformattedInv,setReformattedInv] = useState([])

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
      <Form
        onFinish={onSubmit}
        form={form}
        layout='vertical'
        hideRequiredMark
        autoComplete='off'>
        <Row align='middle' gutter={32}>
          <Col span={10}>
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
                customTitle: 'Warehouse',
              },
              type: FORM_ELEMENT_TYPES.SELECT,
              customLabel: 'Client',
            })}
          </Col>
          <Col span={3}>
            {formItem({
              key: 'date',
              rules: [{ required: true, message: 'Please select From date!' }],
              kwargs: {
                placeholder: 'Select',
                type: 'number',
              },
              type: FORM_ELEMENT_TYPES.DATE,
              others: null,
              customLabel: 'From',
            })}
          </Col>
          <Col span={3}>
            <Button type='primary' htmlType='submit'>
              Get Inventory
            </Button>
          </Col>
        </Row>
      </Form>
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
            data={[]}
            title='In Transits'
            hideRightButton
            loading={invLoading}
            columns={column} />
        </Col>
      </Row>
    </div>
  );
};
export default InventoryScreen;
