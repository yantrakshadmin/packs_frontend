import React, {useState} from 'react';
import {Row, Col, Form, Button} from 'antd';
import {connect} from 'react-redux';
import {useAPI} from 'common/hooks/api';
import {getReformattedData} from 'common/helpers/inventory';
import {transitInventoryColumn} from 'common/columns/transitInventory.column';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import formItem from '../../hocs/formItem.hoc';
import {FORM_ELEMENT_TYPES} from '../../constants/formFields.constant';

const TransitInventoryScreen = ({currentPage}) => {
  const [cid, setCid] = useState(null);

  const {data: clients} = useAPI('/receiverclients/', {});

  const {data: clientInv, loading, reload} = useAPI(`/rclient-inv/?id=${cid}`, {
    method: 'GET',
    secure: true,
  });

  console.log(clientInv, 'Client');

  const tabs = [
    {
      name: 'Receiver Client',
      key: 'receiverClientInventory',
      data: getReformattedData(clientInv),
      columns: transitInventoryColumn,
      loading,
    },
  ];
  const [form] = Form.useForm();
  const onSubmit = async (data) => {
    setCid(data.cid);
  };

  return (
    <>
      <Form onFinish={onSubmit} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row align="middle" gutter={32}>
          <Col span={8}>
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
                key: 'id',
                customTitle: 'name',
                dataKeys: ['address'],
              },
              type: FORM_ELEMENT_TYPES.SELECT,
              customLabel: 'Receiver Client',
            })}
          </Col>
          <Col span={4}>
            <Button type="primary" htmlType="submit">
              Get Inventory
            </Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col span={12}>
          <TableWithTabHOC
            refresh={reload}
            tabs={tabs}
            size="small"
            title="Receiver Client"
            hideRightButton
          />
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(TransitInventoryScreen);
