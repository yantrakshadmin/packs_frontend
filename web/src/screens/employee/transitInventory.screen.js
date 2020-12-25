import React from 'react';
import { Row,Col } from 'antd';
import { connect } from 'react-redux';
import { useAPI } from 'common/hooks/api';
import { transitInventoryColumn } from 'common/columns/transitInventory.column';
import { getReformattedData } from 'common/helpers/inventory';
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


  const tabs = [
    {
      name: 'Allotment In-Transit',
      key: 'allotmentInTransit',
      data: getReformattedData(deliveredInTransit),
      columns:transitInventoryColumn,
      dLoading,
    },{
      name: 'Return In-Transit',
      key: 'returnInTransit',
      data: getReformattedData(returnInTransit),
      columns:transitInventoryColumn,
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
