import React, { useState, useEffect } from 'react';
import flowsColumns from 'common/columns/Flows.column';
import { Input } from 'antd';
import { retreiveFlowsClient } from 'common/api/auth';
import { connect } from 'react-redux';
import { useTableSearch } from 'hooks/useTableSearch';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import KitsTable from '../../components/KitsTable';

const { Search } = Input;

const FlowClientScreen = ({ currentPage }) => {
  const [searchVal, setSearchVal] = useState(null);
  const [csvData, setCsvData] = useState(null);

  const { filteredData, loading, reload } = useTableSearch({ searchVal, retrieve: retreiveFlowsClient });

  useEffect(() => {
    if (filteredData) {
      const csvd = [];
      filteredData.forEach((d) => {
        const temp = {
          ...d,
          'sender_client': d.sender_client.client_name,
          'receiver_client': d.receiver_client.name,
        };
        delete temp.kits;
        delete temp.owner;
        csvd.push(temp);
        d.kits.forEach((k) => {
          csvd.push({
            KitName: k.kit.kit_name,
            Quantity: k.quantity,
            ComponentPM: k.component_pm,
            TripCost: k.trip_cost,
          });
        });
      });
      setCsvData(csvd);
    }
  }, [filteredData]);

  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
    },
    ...flowsColumns,

  ];

  const tabs = [
    {
      name: 'All Flows',
      key: 'allFlows',
      data: filteredData,
      columns,
      loading,
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ width: '15vw', display: 'flex', alignItems: 'flex-end' }}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder='Search' enterButton />
        </div>
      </div>
      <br />
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size='middle'
        title='Client Flows'
        modalWidth={50}
        expandHandleKey='kits'
        expandParams={{ loading }}
        ExpandBody={KitsTable}
        csvdata={csvData}
        csvname={`ClientFlows${  searchVal  }.csv`}
        hideRightButton
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(FlowClientScreen);
