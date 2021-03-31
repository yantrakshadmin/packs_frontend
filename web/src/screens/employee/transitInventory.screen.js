import React from 'react';
import {Row, Col} from 'antd';
import {connect} from 'react-redux';
import {useAPI} from 'common/hooks/api';
import {
  transitInventoryAllotmentColumn,
  transitInventoryReturnColumn,
  transitInventoryProductLevelColumn,
} from 'common/columns/transitInventory.column';
import {
  getReformattedAllotmentData,
  getReformattedReturnData,
  getReformattedProductInfoData,
} from 'common/helpers/inventory';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';

const TransitInventoryScreen = ({currentPage}) => {
  const {data: returnInTransit, loading: rLoading, reload: rReload} = useAPI('/r-intransit/', {
    method: 'GET',
    secure: true,
  });
  const {data: deliveredInTransit, loading: dLoading, reload: dReload} = useAPI('/d-intransit/', {
    method: 'GET',
    secure: true,
  });
  const {data: returnPInTransit, loading: rPLoading, reload: rPReload} = useAPI('/r-intransit-p/', {
    method: 'GET',
    secure: true,
  });
  const {data: deliveredPInTransit, loading: dPLoading, reload: dPReload} = useAPI(
    '/d-intransit-p/',
    {
      method: 'GET',
      secure: true,
    },
  );

  const tabs = [
    {
      name: 'Kit Level',
      key: 'allotmentInTransit',
      data: getReformattedAllotmentData(deliveredInTransit),
      columns: transitInventoryAllotmentColumn,
      dLoading,
    },
    {
      name: 'Product Level',
      key: 'allotmentPInTransit',
      data: getReformattedProductInfoData(deliveredPInTransit),
      columns: transitInventoryProductLevelColumn,
      dPLoading,
    },
  ];

  const tabs2 = [
    {
      name: 'Kit Level',
      key: 'returnInTransit',
      data: getReformattedReturnData(returnInTransit),
      columns: transitInventoryReturnColumn,
      rLoading,
    },
    {
      name: 'Product Level',
      key: 'returnPInTransit',
      data: getReformattedProductInfoData(returnPInTransit),
      columns: transitInventoryProductLevelColumn,
      rPLoading,
    },
  ];

  return (
    <>
      <Row gutter={10}>
        <Col span={12}>
          <TableWithTabHOC
            refresh={() => {
              rReload();
              dReload();
            }}
            tabs={tabs}
            size="small"
            title="Allotment InTransits"
            hideRightButton
          />
        </Col>
        <Col span={12}>
          <TableWithTabHOC
            refresh={() => {
              rReload();
              dReload();
            }}
            tabs={tabs2}
            size="small"
            title="Return InTransits"
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
