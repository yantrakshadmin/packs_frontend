import React, {useState, useEffect} from 'react';
import {Popconfirm, Tag, Button, Input, Modal} from 'antd';
import {connect, useDispatch} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {retrievePFEP, deletePFEP, tpFileUpload} from 'common/api/auth';
import Delete from 'icons/Delete';
import {PFEPColumn} from 'common/columns/PFEP.column';
import {utcDateFormatter} from 'common/helpers/dateFomatter';
import {ADD_CREATE_CP_BASIC_DATA, ADD_PFEP_DATA, CLEAN_PFEP_DATA} from 'common/actions';
import {DiffOutlined, ToTopOutlined} from '@ant-design/icons';
import {deleteHOC} from '../../hocs/deleteHoc';
import Edit from '../../icons/Edit';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import {PFEPMainForm} from '../../forms/PFEP/PFEPMain.form';
import {ActionsPopover} from '../../components/ActionsPopover';
import {MainCreateCPForm} from '../../forms/CreateCP/mainCreateCP.form';
import {UploadLeadForm} from '../../forms/uploadLead.form';

const {Search} = Input;

const PFEPEmployeeScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [lead, setLead] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [createCPVisible, setCreateCPVisible] = useState(false);
  const [uploadTPVisible, setUploadTP] = useState(false);
  const dispatch = useDispatch();

  const {filteredData, loading, reload} = useTableSearch({
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
      render: (text) => <div>{utcDateFormatter(text)}</div>,
    },
    {
      title: 'Emitter',
      key: 'emitter',
      width: '5vw',
      render: (record) => (record.sender_client ? record.sender_client : '-'),
    },
    {
      title: 'Receiver',
      key: 'receiver',
      width: '6vw',
      render: (record) => {
        if (record.receivers) {
          if (record.receivers[0]) {
            return record.receivers[0]['name'];
          }
        }
        return '-';
      },
    },
    {
      title: 'Contact Person',
      key: 'contact_person',
      width: '8vw',
      render: (record) => (
        <div>
          {record.contact_person}
          <br />
          {record.contact_no}
          <br />
          {record.email}
        </div>
      ),
    },
    {
      title: 'Solution Required',
      key: 'solution_required',
      width: '12vw',
      render: (record) => (
        <div className="column">
          {record.solution_flc ? <Tag>FLC</Tag> : null}
          {record.solution_fsc ? <Tag>FSC</Tag> : null}
          {record.solution_crate ? <Tag>Crate</Tag> : null}
          {record.solution_ppbox ? <Tag>PP Box</Tag> : null}
          {record.solution_palletized_box ? <Tag>Solution Palletized Box</Tag> : null}
          {record.solution_palletized_crate ? <Tag>Solution Palletized Crate</Tag> : null}
          {record.solution_pp ? <Tag>Solution PP</Tag> : null}
          {record.solution_stacking_nesting ? <Tag>Solution Stacking Nesting</Tag> : null}
          {record.solution_wp ? <Tag>Solution WP</Tag> : null}
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: '8vw',
      render: (record) => (
        <div className="column">
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
        <div className="row align-center justify-evenly">
          <ActionsPopover
            // popover={popover}
            // setPopover={setPopover}
            triggerTitle="Options"
            buttonList={[
              {
                Icon: DiffOutlined,
                title: 'Create CP',
                onClick: async (e) => {
                  setCreateCPVisible(true);
                  await dispatch({
                    type: ADD_CREATE_CP_BASIC_DATA,
                    data: {
                      ...record,
                      remarks: '',
                      receiver: record.receivers[0] ? record.receivers[0].name : '',
                      receiver_location: record.receivers[0] ? record.receivers[0].location : '',
                      component_perkit: record.parts_pm,
                      //total_comp_weight_perkit: record.weight,
                      pfep: record.id,
                      solution_crate: record.solution_crate,
                      solution_flc: record.solution_flc,
                      solution_fsc: record.solution_fsc,
                      solution_palletized_box: record.solution_palletized_box,
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
            ]}
          />
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
              dispatch({type: ADD_PFEP_DATA, data: record});
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
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div style={{width: '15vw', display: 'flex', alignItems: 'flex-end'}}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder="Search" enterButton />
        </div>
      </div>
      <br />
      <Modal
        maskClosable={false}
        visible={createCPVisible}
        destroyOnClose
        style={{minWidth: `80vw`}}
        title="Create CP"
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
        style={{minWidth: `80vw`}}
        title="Upload TP"
        onCancel={() => {
          setUploadTP(false);
        }}
        footer={null}>
        <UploadLeadForm
          onCancel={() => {
            setUploadTP(false);
          }}
          onDone={() => {
            setUploadTP(false);
          }}
          lead={lead}
          create={tpFileUpload}
        />
      </Modal>
      <TableWithTabHOC
        modelTitle={`Lead Number : ${lead}`}
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size="middle"
        title="PFEP Creation"
        editingId={editingId}
        cancelEditing={() => {
          cancelEditing();
        }}
        onCancelButton={() => {
          dispatch({type: CLEAN_PFEP_DATA});
        }}
        hideRightButton
        modalWidth={80}
        modalBody={PFEPMainForm}
        formParams={{lead}}
        // expandHandleKey='person'
        // ExpandBody={PersonTable}
        // expandParams={{ loading }}
        scroll={{x: 1200}}
        csvdata={csvData}
        csvname={`PFEP${searchVal}.csv`}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(PFEPEmployeeScreen);
