import React, {useState, useEffect} from 'react';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import MaterialRequestsTable from '../../components/MaterialRequestsTable';
import materialEmployeecolumns from 'common/columns/materialEmployee.column';
import {Link} from '@reach/router';
import {Button, Input} from 'antd';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {retrieveEmployeeMrs} from 'common/api/auth';

const {Search} = Input;

const ReceiverClientEmployeeScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [csvData, setCsvData] = useState(null);

  const {filteredData, loading, reload} = useTableSearch({
    searchVal,
    retrieve: retrieveEmployeeMrs,
  });

  useEffect(() => {
    if (filteredData) {
      console.log(filteredData);
      let csvd = [];
      filteredData.forEach((d) => {
        let temp = {
          ...d,
          ['owner']: d.owner.first_name + d.owner.last_name,
          ['delivery_required_on']: d.delivery_required_on.slice(0, 10),
        };
        delete temp['flows'];
        csvd.push(temp);
        d['flows'].forEach((flo) => {
          csvd.push({
            FlowName: flo.flow.flow_name,
            KitName: flo.kit.kit_name,
            Quantity: flo.quantity,
          });
        });
      });
      setCsvData(csvd);
    }
  }, [filteredData]);

  const columns = [
    ...materialEmployeecolumns,
    {
      title: 'Status',
      key: 'status',
      className: 'align-center',
      filters: [
        {
          text: 'Allocated',
          value: true,
        },
        {
          text: 'Pending',
          value: false,
        },
      ],
      onFilter: (value, record) => record.is_allocated === value,
      render: (text, record) => {
        if (record.is_allocated)
          return (
            <Button
              type="primary"
              style={{
                backgroundColor: '#00FF00',
                outline: 'none',
                border: 'none',
                borderRadius: '7%',
              }}
              onClick={(e) => e.stopPropagation()}>
              Allocated
            </Button>
          );
        return (
          <Button
            type="primary"
            style={{
              backgroundColor: 'red',
              outline: 'none',
              border: 'none',
              borderRadius: '7%',
              color: 'rgba(255,255,255,0.9)',
            }}
            onClick={(e) => e.stopPropagation()}>
            Pending
          </Button>
        );
      },
    },
    {
      title: 'Docket',
      key: 'docket',
      width: '10vw',
      render: (text, record) => (
        <Button type="primary" disabled={record.is_allocated} onClick={(e) => e.stopPropagation()}>
          <Link to="../create-allotment/" state={{id: record.id}} key={record.id}>
            Create Allotment Docket
          </Link>
        </Button>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All Material Requests',
      key: 'allMaterialRequests',
      data: filteredData,
      columns,
      loading,
    },
  ];

  const cancelEditing = () => setEditingId(null);

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div style={{width: '15vw', display: 'flex', alignItems: 'flex-end'}}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder="Search" enterButton />
        </div>
      </div>
      <br />
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size="middle"
        title="Material Requests"
        editingId={editingId}
        cancelEditing={cancelEditing}
        ExpandBody={MaterialRequestsTable}
        expandHandleKey="flows"
        hideRightButton
        expandParams={{loading}}
        csvdata={csvData}
        csvname="MRs.csv"
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(ReceiverClientEmployeeScreen);
