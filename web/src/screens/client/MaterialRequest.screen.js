import React, {useState} from 'react';
import materialRequestColumns from 'common/columns/materialRequest.column';
import {Popconfirm, Button, Input, Popover} from 'antd';
import {deleteMr, retrieveMrs} from 'common/api/auth';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {useAPI} from 'common/hooks/api';
import {mergeArray} from 'common/helpers/mrHelper';
import {MaterialRequestForm} from 'forms/materialRequest.form';
import TableWithTabHOC from 'hocs/TableWithTab.hoc';
import MaterialRequestsTable from 'components/MaterialRequestsTableClient';
import {deleteHOC} from 'hocs/deleteHoc';
import Delete from 'icons/Delete';
import Edit from 'icons/Edit';
import ExpandTable from '../../components/MaterialRequestsTable';

const {Search} = Input;

const MaterialRequestEmployeeScreen = ({currentPage, isEmployee}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const {filteredData, loading, reload} = useTableSearch({searchVal, retrieve: retrieveMrs});
  const {data: mrStatusData} = useAPI('list-mrstatus/');
  const cancelEditing = () => {
    setEditingId(null);
  };

  const columns = [
    ...materialRequestColumns,

    {
      title: 'Status',
      key: 'status',
      className: 'align-center',
      render: (text, record) => {
        if (record.is_allocated && !record.is_rejected)
          return (
            <Button
              type="primary"
              style={{
                backgroundColor: '#00FF00',
                outline: 'none',
                border: 'none',
              }}
              onClick={(e) => e.stopPropagation()}
              block>
              Allocated
            </Button>
          );
        if (!record.is_allocated && !record.is_rejected) {
          return (
            <Button
              type="primary"
              style={{
                backgroundColor: 'red',
                outline: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.9)',
              }}
              onClick={(e) => e.stopPropagation()}
              block>
              Pending
              {'  '}
            </Button>
          );
        }
        if (!record.is_allocated && record.is_rejected) {
          return (
            // <Popover
            //   content={
            //     <div style={{width: '20rem'}}>
            //       <text>
            //         <b>Reason : </b>
            //         {record.reason}
            //       </text>
            //       <br />
            //       {record.remarks ? (
            //         <text>
            //           <b>Remarks : </b>
            //           {record.remarks}
            //         </text>
            //       ) : null}
            //     </div>
            //   }>
            //   <Button type="primary" danger>
            //     Rejected
            //   </Button>
            // </Popover>
            <Button type="primary" danger block>
              Rejected
            </Button>
          );
        }
        return <div />;
      },
    },
    // {
    //   title: 'Reason',
    //   key: 'reason',
    //   className: 'align-center',
    //   render: (text, record) => {
    //     if (record.is_allocated && !record.is_rejected) return '-';
    //     if (!record.is_allocated && !record.is_rejected) {
    //       return '-';
    //     }
    //     if (!record.is_allocated && record.is_rejected) {
    //       return record.reason;
    //     }
    //     return <div />;
    //   },
    // },
    // {
    //   title: 'Remarks',
    //   key: 'remarks',
    //   className: 'align-center',
    //   render: (text, record) => {
    //     if (record.is_allocated && !record.is_rejected) return '-';
    //     if (!record.is_allocated && !record.is_rejected) {
    //       return '-';
    //     }
    //     if (!record.is_allocated && record.is_rejected) {
    //       return record.remarks;
    //     }
    //     return <div />;
    //   },
    // },
    // {
    //   title:'Request Status',
    //   key:'is_rejected',
    //   render:(row)=>(
    //     <div>
    //       {/* eslint-disable-next-line no-nested-ternary */}
    //       {row.is_rejected?(
    //         <Popover content={(
    //           <div style={{ width:'20rem' }}>
    //             <text>
    //               <b>Reason : </b>
    //               {row.reason}
    //             </text>
    //             <br />
    //             {row.remarks?(
    //               <text>
    //                 <b>Remarks : </b>
    //                 {row.remarks}
    //               </text>
    //             ):null}
    //           </div>
    //         )}>
    //           <Button type='primary' danger>Rejected</Button>
    //         </Popover>
    //       ):row.is_rejected === undefined?(
    //         <Button>Not Created</Button>
    //       ):<div><Button type='primary'>Approved</Button></div>}
    //     </div>
    //   )
    // },
    {
      title: 'Raised By',
      key: 'raised_by',
      dataIndex: 'raised_by',
    },
    {
      title: 'Action',
      key: 'operation',
      width: '7vw',
      render: (text, record) => (
        <div className="row justify-evenly">
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              setEditingId(record.id);
              e.stopPropagation();
            }}>
            <Edit />
          </Button>
          <Popconfirm
            title="Confirm Delete"
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteMr,
              success: 'Deleted Material Request successfully',
              failure: 'Error in deleting Material request',
            })}>
            <Button
              style={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: 'none',
                padding: '1px',
              }}
              onClick={(e) => e.stopPropagation()}>
              <Delete />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All Material Requests',
      key: 'allMaterialRequests',
      data: mergeArray(filteredData || [], mrStatusData || []),
      columns,
      loading,
    },
  ];

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
        modalBody={MaterialRequestForm}
        modalWidth={80}
        formParams={{isEmployee}}
        //expandHandleKey="flows"
        //expandParams={{loading}}
        ExpandBody={ExpandTable}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(MaterialRequestEmployeeScreen);
