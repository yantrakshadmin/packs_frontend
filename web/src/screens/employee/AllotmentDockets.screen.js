import React, {useState} from 'react';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import allotmentColumns from 'common/columns/Allotment.column';
import {Input, Button} from 'antd';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {useAPI} from 'common/hooks/api';
import {useEffect} from 'react';
import {Link} from '@reach/router';
// import Upload from '../../icons/Upload';
// import File from '../../icons/File';

const {Search} = Input;

const AllotmentDocketsScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [reqData, setReqData] = useState([]);

  const {data: allotments, loading} = useAPI('/allotments/', {});

  const {filteredData, reload} = useTableSearch({
    searchVal,
    reqData: reqData,
  });

  useEffect(() => {
    if (allotments) {
      const reqD = allotments.map((alt) => ({
        id: alt.id,
        transaction_no: alt.transaction_no,
        parent_name: alt.sales_order.owner.first_name + ' ' + alt.sales_order.owner.last_name,
        dispatch_date: alt.dispatch_date,
        warehouse_name: alt.send_from_warehouse.name,
        model: alt.model,
        vehicle_number: alt.vehicle_number,
        transport_by: alt.transport_by.name,
      }));
      setReqData(reqD);
    }
  }, [allotments]);

  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => (currentPage - 1) * 5 + index + 1,
    },
    ...allotmentColumns,
    {
      title: 'View Docket',
      key: 'view_docket',
      render: (text, record) => {
        console.log(record);
        return (
          <Button type="primary">
            <Link to="../docket" state={{id: record.id}} key={record.id}>
              View Docket
            </Link>
          </Button>
        );
      },
    },
  ];

  const tabs = [
    {
      name: 'All Allotment Dockets',
      key: 'allAllotmentDockets',
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
        title="Allotment Dockets"
        editingId={editingId}
        cancelEditing={cancelEditing}
        // expandParams={{loading}}
        hideRightButton
        // scroll={{x: 2000}}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(AllotmentDocketsScreen);
