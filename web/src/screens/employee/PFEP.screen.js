import React, { useState, useEffect } from 'react';
import { Popconfirm,Tag, Button, Input } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { useTableSearch } from 'hooks/useTableSearch';
import { retrievePFEP,  deletePFEP } from 'common/api/auth';
import Delete from 'icons/Delete';
import { PFEPColumn } from 'common/columns/PFEP.column';
import {  utcDateFormatter } from 'common/helpers/dateFomatter';
import {  ADD_PFEP_DATA, CLEAN_PFEP_DATA } from 'common/actions';
import { deleteHOC } from '../../hocs/deleteHoc';
import Edit from '../../icons/Edit';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import { PFEPMainForm } from '../../forms/PFEP/PFEPMain.form';

const { Search } = Input;

const PFEPEmployeeScreen = ({ currentPage }) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [lead, setLead] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const dispatch = useDispatch();

  const { filteredData, loading, reload } = useTableSearch({
    searchVal,
    retrieve: retrievePFEP,
  });
  useEffect(() => {
    if (filteredData) {
      const csvd = [];
      filteredData.forEach((d) => {
        delete d.owner;
        csvd.push(d);
      });
      setCsvData(csvd);
    }
  }, [filteredData]);

  const columns = [
    ...PFEPColumn,
    {
      title: 'Created Date',
      key: 'date',
      dataIndex: 'date',
      render:(text)=>(<div>{utcDateFormatter(text)}</div>)
    },
    {
      title: 'Emitter',
      key:'emitter',
      render:(record)=>(
        <div>
          {record.emitter_inv}
          {' - '}
          {
            record.wh_emitter
}
        </div>
      )
    },
    {
      title: 'Receiver',
      key:'receiver',
      render:(record)=>(
        <div>
          {record.receiver_inv}
          {' - '}
          {
            record.wh_receiver
          }
        </div>
      )
    },{
      title: 'Contact Person',
      key:'contact_person',
      render:(record)=>(
        <div>
          {record.contact_person}
          <br />
          {
            record.contact_no
          }
          <br />
          {record.email}
        </div>
      )
    },
    {
      title:'Solution Required',
      key:'solution_required',
      render:(record)=>(
        <div className='column'>
          {record.solution_flc?<Tag>FLC</Tag>:null}
          {record.solution_fsc?<Tag>FSC</Tag>:null}
          {record.solution_crate?<Tag>Crate</Tag>:null}
          {record.solution_ppbox?<Tag>PP Box</Tag>:null}
        </div>
      )
    },{
      title:'Status',
      key:'status',
      render:(record)=>(
        <div className='column'>
          {record.status?<Tag>{record.status}</Tag>:null}
        </div>
      )
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '7vw',
      render: (text, record) => (
        <div className='row align-center justify-evenly'>
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              setEditingId(record.id);
              setLead(record.lead_no);
              dispatch({ type:ADD_PFEP_DATA,data:record })
              e.stopPropagation();
            }}>
            <Edit />
          </Button>

          <Popconfirm
            title='Confirm Delete'
            onCancel={(e) => e.stopPropagation()}
            onConfirm={deleteHOC({
              record,
              reload,
              api: deletePFEP,
              success: 'Deleted PFEP Successfully',
              failure: 'Error in deleting PFEP',
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
      name: 'ALL PFEP',
      key: 'allPFEP',
      data: filteredData,
      columns,
      loading,
    },
  ];

  const cancelEditing = () => setEditingId(null);

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
        title='PFEP Creation '
        editingId={editingId}
        cancelEditing={()=>{cancelEditing();}}
        onCancelButton={()=>{
          dispatch({ type:CLEAN_PFEP_DATA })}}
        hideRightButton
        modalWidth={80}
        modalBody={PFEPMainForm}
        formParams={{ lead }}
        // expandHandleKey='person'
        // ExpandBody={PersonTable}
        // expandParams={{ loading }}
        scroll={{ x: 2000 }}
        csvdata={csvData}
        csvname={`PFEP${  searchVal  }.csv`}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(PFEPEmployeeScreen);
