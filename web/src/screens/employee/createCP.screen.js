import React, {useState, useEffect} from 'react';
import {Popconfirm, Button, Input} from 'antd';
import {connect, useDispatch} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {deleteCP, retrieveCP} from 'common/api/auth';
import Delete from 'icons/Delete';
import {ADD_CREATE_CP_BASIC_DATA, CLEAN_PFEP_DATA} from 'common/actions';
import _ from 'lodash';

import {CreateCPColumns} from 'common/columns/createCP.column';
import {useNavigate} from '@reach/router';
import {getSolutionProposal} from 'common/constants/solutionproposalCreateCP';
import {deleteHOC} from '../../hocs/deleteHoc';
import Edit from '../../icons/Edit';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import {MainCreateCPForm} from '../../forms/CreateCP/mainCreateCP.form';
import Document from '../../icons/Document';

const {Search} = Input;

const CreateCPScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [selectedCP, setSelectedCP] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {filteredData, loading, reload} = useTableSearch({
    searchVal,
    retrieve: retrieveCP,
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
    {
      title: 'Lead No.',
      key: 'lead_no',
      render: (record) => <div>{record.pfep.lead_no}</div>,
    },
    {
      title: 'PFEP No.',
      key: 'pfep_no',
      render: (record) => <div>{record.pfep.pfep_no}</div>,
    },
    {
      title: 'Emitter',
      key: 'emitter',
      render: (record) => <div>{record.pfep.sender_client}</div>,
    },
    {
      title: 'Emitter Location',
      key: 'emitter_location',
      render: (record) => <div>{record.pfep.sender_location}</div>,
    },
    {
      title: 'Receiver',
      key: 'receiver',
      render: (record) => (
        <div>{record.pfep.receivers.length > 0 ? record.pfep.receivers[0].name : ''}</div>
      ),
    },
    {
      title: 'Receiver Location',
      key: 'receiver_location',
      render: (record) => (
        <div>{record.pfep.receivers.length > 0 ? record.pfep.receivers[0].location : ''}</div>
      ),
    },
    ...CreateCPColumns,
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      render: (text, record) => (
        <div className="row align-center justify-evenly">
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              navigate(`../print-cp/${record.id}`, {
                state: {
                  ...record,
                  receiverDetails: [
                    {
                      part_name: record.pfep.part_name,
                      receiver_name:
                        record.pfep.receivers.length > 0 ? record.pfep.receivers[0].name : '',
                      receiver_location:
                        record.pfep.receivers.length > 0 ? record.pfep.receivers[0].location : '',
                      proposed_solution_proposal: getSolutionProposal(record),
                      component_per_solution: record.component_perkit,
                      price_per_component: _.round(record.trip_cost / record.component_perkit, 2),
                      trip_cost: record.trip_cost,
                      parts_volume_per_month: record.volume_pm,
                      cycle_days: record.pfep.min_cycle_days,
                    },
                  ],
                },
              });
              e.stopPropagation();
            }}>
            <Document />
          </Button>
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              setEditingId(record.id);
              dispatch({
                type: ADD_CREATE_CP_BASIC_DATA,
                data: {
                  ...record,
                  part_name: record.pfep.part_name ? record.pfep.part_name : '',
                  sender_client: record.pfep.sender_client ? record.pfep.sender_client : '',
                  sender_location: record.pfep.sender_location ? record.pfep.sender_location : '',
                  receiver: record.pfep.receivers[0] ? record.pfep.receivers[0].name : '',
                  receiver_location: record.pfep.receivers[0]
                    ? record.pfep.receivers[0].location
                    : '',
                  pfep: record.pfep.id,
                  solution_crate: record.pfep.solution_crate,
                  solution_flc: record.pfep.solution_flc,
                  solution_fsc: record.pfep.solution_fsc,
                  solution_palletized_box: record.pfep.solution_palletized_box,
                  solution_palletized_crate: record.pfep.solution_palletized_crate,
                  solution_pp: record.pfep.solution_pp,
                  solution_ppbox: record.pfep.solution_ppbox,
                  solution_stacking_nesting: record.pfep.solution_stacking_nesting,
                  solution_wp: record.pfep.solution_wp,
                },
              });
              e.stopPropagation();
            }}>
            <Edit />
          </Button>
          <Popconfirm
            title="Confirm Delete"
            onCancel={(e) => e.stopPropagation()}
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteCP,
              success: 'Deleted CP Successfully',
              failure: 'Error in deleting CP',
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
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedCP(selectedRows);
    },
    hideSelectAll: true,
    getCheckboxProps: (record) => ({
      disabled:
        selectedCP.length <= 0
          ? false
          : record.pfep.sender_client !== selectedCP[0].pfep.sender_client,
    }),
  };
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button
          className="mx-2"
          type="primary"
          disabled={selectedCP.length <= 0}
          onClick={(e) => {
            const receiverDetails = selectedCP.map((record) => ({
              part_name: record.pfep.part_name,
              receiver_name: record.pfep.receivers.length > 0 ? record.pfep.receivers[0].name : '',
              receiver_location:
                record.pfep.receivers.length > 0 ? record.pfep.receivers[0].location : '',
              proposed_solution_proposal: getSolutionProposal(record),
              component_per_solution: record.component_perkit,
              price_per_component: _.round(record.trip_cost / record.component_perkit, 2),
              trip_cost: record.trip_cost,
              parts_volume_per_month: record.volume_pm,
              cycle_days: record.pfep.min_cycle_days,
            }));
            navigate(`../print-cp/${selectedCP[0].id}`, {
              state: {...selectedCP[0], receiverDetails},
            });
            e.stopPropagation();
          }}>
          Merge CP
        </Button>
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
        title="CP"
        rowSelection={rowSelection}
        editingId={editingId}
        cancelEditing={() => {
          cancelEditing();
        }}
        onCancelButton={() => {
          dispatch({type: CLEAN_PFEP_DATA});
        }}
        hideRightButton
        modalWidth={80}
        modalBody={MainCreateCPForm}
        csvdata={csvData}
        csvname={`CP${searchVal}.csv`}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(CreateCPScreen);
