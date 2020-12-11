import React, { useState, useEffect } from 'react';
import { Popconfirm, Tag, Button, Input, Modal } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { useTableSearch } from 'hooks/useTableSearch';
import { retrievePFEP, deletePFEP,  tpFileUpload } from 'common/api/auth';
import Delete from 'icons/Delete';
import { PFEPColumn } from 'common/columns/PFEP.column';
import { utcDateFormatter } from 'common/helpers/dateFomatter';
import {
  ADD_CREATE_CP_BASIC_DATA,
  ADD_PFEP_DATA,
  CLEAN_PFEP_DATA,
} from 'common/actions';
import { DiffOutlined, ToTopOutlined } from '@ant-design/icons';
import { deleteHOC } from '../../hocs/deleteHoc';
import Edit from '../../icons/Edit';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import { PFEPMainForm } from '../../forms/PFEP/PFEPMain.form';
import { ActionsPopover } from '../../components/ActionsPopover';
import { MainCreateCPForm } from '../../forms/CreateCP/mainCreateCP.form';
import { UploadLeadForm } from '../../forms/uploadLead.form';

const { Search } = Input;

// average_dispatchlotsize: 21
// breadth: 12.56
// contact_no: "956"
// contact_person: "Anil"
// cp_approved: false
// cp_shared: true
// critical_area: "no"
// current_packaging: "Returnable"
// date: "2020-11-09T08:07:07.838000Z"
// designation: "-"
// dispatch_frequency: "monthly"
// email: "anil@lumax.com"
// emitter_inv: 45
// esa_signed: false
// flow_started: false
// greasy_oily: true
// height: 21.65
// highest_mv: 21
// id: 9
// inserts_pm: 5
// lead_no: 2007
// length: 12.65
// lowest_mv: 21
// matrix_details: "5"
// max_cycle_days: 54
// min_cycle_days: 54
// min_max_margin: "45"
// mul_parts_single_pocket: "45"
// not_qualified: false
// np_ef: "New Part"
// on_hold: false
// other_spec: "cvsd"
// other_storage: 45
// p2p_contact: "yes"
// packaging_breadth: 12
// packaging_height: 21
// packaging_length: 12
// packaging_type: "New Part"
// palletized_sol_details: ""
// part_cad_data: "no"
// part_name: "test213"
// part_number: "test122"
// parts_orientation: "vertical"
// parts_per_layer: 5
// parts_per_pocket: 5
// parts_pm: 45
// pfep_dropped: false
// pfep_no: 2001
// pm_loaded_weight: 5
// pocket_breadth: 21
// pocket_breadth1: 21
// pocket_height: 21
// pocket_height1: 21
// pocket_length: 21
// pocket_length1: 21
// price_per_unit: 5
// receiver_inv: 0
// receivers: (2) [{…}, {…}]
// remarks: "---"
// remarks1: "none"
// remarks2: null
// sender_client: "test"
// sender_location: "test"
// solution_crate: true
// solution_flc: true
// solution_fsc: true
// solution_palletized_box: false
// solution_palletized_crate: false
// solution_pp: false
// solution_ppbox: false
// solution_stacking_nesting: false
// solution_wp: false
// special_measure: "nothing"
// spesheet_pm: 5
// stacking_nesting: "nested"
// total_parts_per_pm: 5
// tp: [{…}]
// tp_approved: true
// tp_shared: true
// transit_time: 45
// transportation_mode: "PTL"
// trials_approved: false
// trials_done: false
// trips_per_pm: "5"
// volume_pm: 12
// wastage_pm: "none"
// weight: 12.256
// wh_emitter: 45
// wh_receiver: 45
// yantra_cycle: 45


const PFEPEmployeeScreen = ({ currentPage }) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [lead, setLead] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [createCPVisible, setCreateCPVisible] = useState(false);
  const [uploadTPVisible, setUploadTP] = useState(false);
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
      width: '7vw',
      render: (text) => (<div>{utcDateFormatter(text)}</div>),
    },
    {
      title: 'Emitter',
      key: 'emitter',
      width: '5vw',
      render: (record) => (
        <div>
          {record.emitter_inv}
          {' - '}
          {
            record.wh_emitter
          }
        </div>
      ),
    },
    {
      title: 'Receiver',
      key: 'receiver',
      width: '6vw',
      render: (record) => (
        <div>
          {record.receiver_inv}
          {' - '}
          {
            record.wh_receiver
          }
        </div>
      ),
    }, {
      title: 'Contact Person',
      key: 'contact_person',
      width: '8vw',
      render: (record) => (
        <div>
          {record.contact_person}
          <br />
          {
            record.contact_no
          }
          <br />
          {record.email}
        </div>
      ),
    },
    {
      title: 'Solution Required',
      key: 'solution_required',
      width: '10vw',
      render: (record) => (
        <div className='column'>
          {record.solution_flc ? <Tag>FLC</Tag> : null}
          {record.solution_fsc ? <Tag>FSC</Tag> : null}
          {record.solution_crate ? <Tag>Crate</Tag> : null}
          {record.solution_ppbox ? <Tag>PP Box</Tag> : null}
          {record.solution_palletized_box ? <Tag>Solution Palletized Box</Tag> : null}
          {record.solution_palletized_crate? <Tag>Solution Palletized Crate</Tag> : null}
          {record.solution_pp ? <Tag>Solution PP</Tag> : null}
          {record.solution_stacking_nesting ? <Tag>Solution Stacking Nesting</Tag> : null}
          {record.solution_wp ? <Tag>Solution WP</Tag> : null}
        </div>
      ),
    }, {
      title: 'Status',
      key: 'status',
      width: '8vw',
      render: (record) => (
        <div className='column'>
          {record.tp_shared ? <Tag>TP shared</Tag> : null}
          {record.cp_shared ? <Tag>CP shared</Tag> : null}
          {record.tp_approved ? <Tag>TP Approved</Tag> : null}
          {record.cp_approved ? <Tag>CP Approved</Tag> : null}
          {record.trials_done ? <Tag>Trials Done</Tag> : null}
          {record.trials_approved ? <Tag>Trials Approved</Tag> : null}
          {record.esa_signed ? <Tag>Esa Signed</Tag> : null}
          {record.flow_started ? <Tag>Flow Started</Tag> : null}
          {record.on_hold ? <Tag>On hold</Tag> : null}
          {record.pfep_dropped ? <Tag>PFEP Dropped</Tag> : null}
          {record.not_qualified ? <Tag>Not Qualified</Tag> : null}
          {record.solution_remark ? <Tag>Solution Remark</Tag> : null}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '8vw',
      render: (text, record) => (
        <div className='row align-center justify-evenly'>
          <ActionsPopover
            // popover={popover}
            // setPopover={setPopover}
            triggerTitle='Options'
            buttonList={
              [{
                Icon: DiffOutlined,
                title: 'Create CP',
                onClick:async (e) => {
                  setCreateCPVisible(true);
                  console.log(record,'pfep')
                  await dispatch({
                    type: ADD_CREATE_CP_BASIC_DATA, data: {
                      ...record,
                      receiver: record.receivers[0]?record.receivers[0].name:'',
                      receiver_location: record.receivers[0]?record.receivers[0].location:'',
                      component_perkit: record.parts_pm,
                      total_comp_weight_perkit: record.weight,
                      pfep:record.id,
                      solution_crate:record.solution_crate,
                      solution_flc: record.solution_flc,
                      solution_fsc: record.solution_fsc,
                      solution_palletized_box:record.solution_palletized_box,
                      solution_palletized_crate: record.solution_palletized_crate,
                      solution_pp: record.solution_pp,
                      solution_ppbox: record.solution_ppbox,
                      solution_stacking_nesting: record.solution_stacking_nesting,
                      solution_wp: record.solution_wp,
                    },
                  });
                  e.stopPropagation();
                },
              },
              {
                Icon: ToTopOutlined,
                title: 'Upload TP',
                onClick: (e) => {
                  // setPopover(false);
                  setUploadTP(true);
                  e.stopPropagation();
                },
              },
              ]
            } />
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
              dispatch({ type: ADD_PFEP_DATA, data: record });
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
  const createCPCancel = () => {
    setEditingId(null);
    setLead(null);
    setCreateCPVisible(false);
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ width: '15vw', display: 'flex', alignItems: 'flex-end' }}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder='Search' enterButton />
        </div>
      </div>
      <br />
      <Modal
        maskClosable={false}
        visible={createCPVisible}
        destroyOnClose
        style={{ minWidth: `80vw` }}
        title='Create CP'
        onCancel={() => {
          setCreateCPVisible(false);
        }}
        footer={null}>
        <MainCreateCPForm
          id={editingId}
          lead={lead}
          onCancel={createCPCancel}
          onDone={createCPCancel}
        />
      </Modal>
      <Modal
        maskClosable={false}
        visible={uploadTPVisible}
        destroyOnClose
        style={{ minWidth: `80vw` }}
        title='Upload TP'
        onCancel={() => {
          setUploadTP(false);
        }}
        footer={null}>
        <UploadLeadForm
          onCancel={()=>{setUploadTP(false)}}
          onDone={()=>{setUploadTP(false)}}
          lead={lead}
          create={tpFileUpload}
        />
      </Modal>
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size='middle'
        title='PFEP Creation '
        editingId={editingId}
        cancelEditing={() => {
          cancelEditing();
        }}
        onCancelButton={() => {
          dispatch({ type: CLEAN_PFEP_DATA });
        }}
        hideRightButton
        modalWidth={80}
        modalBody={PFEPMainForm}
        formParams={{ lead }}
        // expandHandleKey='person'
        // ExpandBody={PersonTable}
        // expandParams={{ loading }}
        scroll={{ x: 1200 }}
        csvdata={csvData}
        csvname={`PFEP${searchVal}.csv`}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(PFEPEmployeeScreen);
