import React from 'react';
import { Row,Col } from 'antd';
import { connect } from 'react-redux';
import { useAPI } from 'common/hooks/api';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';


const TransitInventoryScreen = ({ currentPage }) => {
  const { data:clientInv, loading:loading, reload:reload } = useAPI('/client-inv/', {
    method: 'GET',
    secure: true,
  })
  console.log(clientInv,'Client')
  const columns = [
    {
      title: 'Product',
      key: 'short_code',
      dataIndex:'short_code'
    },{
      title: 'Quantity',
      key: 'quantity',
      dataIndex:'quantity'
    },
  ];
  const getReformattedData=(obj)=>(Object.keys(obj).map((key=>({
    short_code:key,
    quantity:obj[key] }))))
  const tabs = [
    {
      name: 'Allotment In-Transit',
      key: 'allotmentInTransit',
      data: getReformattedData([]),
      columns,
      loading,
    },
  ];

  return (
    <>
      <Row>
        <Col span={12}>
          <TableWithTabHOC
            refresh={reload}
            tabs={tabs}
            size='small'
            title='Client Inventory'
            hideRightButton
          />
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(TransitInventoryScreen);
