import React from 'react';
import { Row,Col } from 'antd';
import { connect } from 'react-redux';
import { useAPI } from 'common/hooks/api';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';


const TransitInventoryScreen = ({ currentPage }) => {
  const { data:returnInTransit, loading:rLoading, reload:rReload } = useAPI('/r-intransit/', {
    method: 'GET',
    secure: true,
  })
  const { data:deliveredInTransit, loading:dLoading, reload:dReload } = useAPI('/d-intransit/', {
    method: 'GET',
    secure: true,
  })

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
      data: getReformattedData(deliveredInTransit || []),
      columns,
      dLoading,
    },{
      name: 'Return In-Transit',
      key: 'returnInTransit',
      data: getReformattedData(returnInTransit || []),
      columns,
      rLoading,
    },
  ];

  return (
    <>
      <Row>
        <Col span={12}>
          <TableWithTabHOC
            refresh={()=>{rReload(); dReload()}}
            tabs={tabs}
            size='small'
            title='InTransits'
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
