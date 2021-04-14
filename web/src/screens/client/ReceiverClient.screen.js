import React, {useState, useEffect} from 'react';
import receiverColumns from 'common/columns/Receiver.column';
import {Popconfirm, Button, Input} from 'antd';
import {deleteReceiverClient, retieveReceiverClientsClientSide} from 'common/api/auth';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {GetUniqueValue, GetUniqueValueNested} from 'common/helpers/getUniqueValues';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import {ReceiverForm} from '../../forms/receiver.form';
import NoPermissionAlert from 'components/NoPermissionAlert';
import {ifNotStrReturnA} from 'common/helpers/mrHelper';

const {Search} = Input;

const ReceiverClientEmployeeScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [csvData, setCsvData] = useState(null);

  const {filteredData, loading, reload, hasPermission} = useTableSearch({
    searchVal,
    retrieve: retieveReceiverClientsClientSide,
  });

  useEffect(() => {
    if (filteredData) {
      const csvd = [];
      filteredData.forEach((d) => {
        delete d.owner;
        csvd.push({...d, emitter: d.emitter.client_name});
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
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      sorter: (a, b) => ifNotStrReturnA(a.name).localeCompare(ifNotStrReturnA(b.name)),
      showSorterTooltip: false,
    },
    {
      title: 'City',
      key: 'city',
      dataIndex: 'city',
      filters: GetUniqueValue(filteredData || [], 'city'),
      onFilter: (value, record) => record.city === value,
    },
    ...receiverColumns,
    {
      title: 'Emitter',
      key: 'emitter',
      filters: GetUniqueValueNested(filteredData || [], 'emitter', 'client_name') || [],
      onFilter: (value, record) => record.emitter.client_name === value,
      render: (text, record) => record.emitter.client_name,
    },
    // {
    //   title: 'Action',
    //   key: 'operation',
    //   width: '7vw',
    //   render: (text, record) => (
    //     <div className="row align-center justify-evenly">
    //       <Button
    //         // disabled
    //         style={{
    //           backgroundColor: 'transparent',
    //           border: 'none',
    //           boxShadow: 'none',
    //           padding: '1px',
    //         }}
    //         onClick={(e) => {
    //           setEditingId(record.id);
    //           e.stopPropagation();
    //         }}>
    //         <Edit />
    //       </Button>
    //       {/* <Popconfirm
    //         // disabled
    //         title='Confirm Delete'
    //         onConfirm={deleteHOC({
    //           record,
    //           reload,
    //           api: deleteReceiverClient,
    //           success: 'Deleted Receiver Client successfully',
    //           failure: 'Error in deleting receiver client',
    //         })}>
    //         <Button
    //           // disabled
    //           style={{
    //             backgroundColor: 'transparent',
    //             boxShadow: 'none',
    //             border: 'none',
    //             padding: '1px',
    //           }}
    //           onClick={(e) => e.stopPropagation()}>
    //           <Delete />
    //         </Button>
    //       </Popconfirm> */}
    //     </div>
    //   ),
    // },
  ];

  const tabs = [
    {
      name: 'All Clients',
      key: 'allReceiverClients',
      data: filteredData,
      columns,
      loading,
    },
  ];

  const cancelEditing = () => setEditingId(null);

  return (
    <NoPermissionAlert hasPermission={hasPermission}>
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
        title="Clients"
        hideRightButton={true}
        //editingId={editingId}
        //cancelEditing={cancelEditing}
        //modalBody={ReceiverForm}
        //modalWidth={45}
        expandParams={{loading}}
        csvdata={csvData}
        csvname={`Clients${searchVal}.csv`}
      />
    </NoPermissionAlert>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(ReceiverClientEmployeeScreen);
