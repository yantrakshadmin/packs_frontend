import React, {useState, useEffect, useCallback} from 'react';
import {Popconfirm, Tag, Button, Input, Modal} from 'antd';
import {PlusCircleOutlined, MinusCircleOutlined} from '@ant-design/icons';
import {connect, useDispatch} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {retrieveSCSs, deleteSCS, tpFileUpload, tpFileReUpload} from 'common/api/auth';
import Delete from 'icons/Delete';
import {SCSColumn} from 'common/columns/PFEP.column';

import {ADD_CREATE_CP_BASIC_DATA, ADD_PFEP_DATA, CLEAN_PFEP_DATA} from 'common/actions';
import {DiffOutlined, ToTopOutlined} from '@ant-design/icons';
import {deleteHOC} from '../../hocs/deleteHoc';
import Edit from '../../icons/Edit';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import {SCSMainForm} from '../../forms/PFEP/SCSMain.form';
import {ActionsPopover} from '../../components/ActionsPopover';
import {MainCreateCPForm} from '../../forms/CreateCP/mainCreateCP.form';
import {UploadLeadForm} from '../../forms/uploadLead.form';

import FilesViewModal from '../../components/FilesViewModal';
import NoPermissionAlert from 'components/NoPermissionAlert';

const {Search} = Input;

export const HideShowTag = ({children}) => {
  const [show, setShow] = useState(false);

  const handClick = useCallback(
    (ev) => {
      setShow(!show);
    },
    [show, setShow],
  );

  return (
    <div className="column">
      <Tag
        style={{cursor: 'pointer'}}
        icon={show ? <MinusCircleOutlined /> : <PlusCircleOutlined />}
        color="processing"
        onClick={handClick}>
        {show ? 'Hide' : 'Show'}
      </Tag>
      {show ? children : null}
    </div>
  );
};

const PFEPEmployeeScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [lead, setLead] = useState(null);
  const [cpSCSid, setCpSCSid] = useState(null);
  const [isReUpload, setIsReUpload] = useState(false);
  const [csvData, setCsvData] = useState(null);
  const [createCPVisible, setCreateCPVisible] = useState(false);
  const [uploadTPVisible, setUploadTP] = useState(false);
  const dispatch = useDispatch();

  const {filteredData, loading, reload, hasPermission} = useTableSearch({
    searchVal,
    retrieve: retrieveSCSs,
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
    ...SCSColumn,
    // {
    //   title: 'Created Date',
    //   key: 'date',
    //   dataIndex: 'date',
    //   width: '7vw',
    //   sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    //   showSorterTooltip: false,
    //   render: (text) => <div>{utcDateFormatter(text)}</div>,
    // },
    // {
    //   title: 'Emitter',
    //   key: 'emitter',
    //   width: '5vw',
    //   render: (record) => (record.sender_client ? record.sender_client : '-'),
    //   // sorter: (a, b) =>
    //   //   ifNotStrReturnA(a.sender_client).localeCompare(ifNotStrReturnA(b.sender_client)),
    //   // showSorterTooltip: false,
    //   filters: GetUniqueValue(filteredData || [], 'sender_client'),
    //   onFilter: (value, record) => record.sender_client === value,
    // },
    // {
    //   title: 'Receiver',
    //   key: 'receiver',
    //   width: '6vw',
    //   render: (record) => {
    //     if (record.receivers) {
    //       if (record.receivers[0]) {
    //         return record.receivers[0]['name'];
    //       }
    //     }
    //     return '-';
    //   },
    //   sorter: (a, b) =>
    //     ifNotStrReturnA(a.receivers[0]['name']).localeCompare(
    //       ifNotStrReturnA(b.receivers[0]['name']),
    //     ),
    //   showSorterTooltip: false,
    // },
    // {
    //   title: 'Contact Person',
    //   key: 'contact_person',
    //   width: '8vw',
    //   render: (record) => (
    //     <div>
    //       {record.contact_person}
    //       <br />
    //       {record.contact_no}
    //       <br />
    //       {record.email}
    //     </div>
    //   ),
    //   sorter: (a, b) =>
    //     ifNotStrReturnA(a.contact_person).localeCompare(ifNotStrReturnA(b.contact_person)),
    //   showSorterTooltip: false,
    // },
    {
      title: 'Solution Required',
      key: 'solution_required',
      width: '12vw',
      render: (record) => (
        <HideShowTag>
          {record.solution_flc ? <Tag>FLC</Tag> : null}
          {record.solution_fsc ? <Tag>FSC</Tag> : null}
          {record.solution_crate ? <Tag>Crate</Tag> : null}
          {record.solution_ppbox ? <Tag>PP Box</Tag> : null}
          {record.solution_palletized_box ? <Tag>Solution Palletized Box</Tag> : null}
          {record.solution_palletized_crate ? <Tag>Solution Palletized Crate</Tag> : null}
          {record.solution_pp ? <Tag>Solution PP</Tag> : null}
          {record.solution_stacking_nesting ? <Tag>Solution Stacking Nesting</Tag> : null}
          {record.solution_wp ? <Tag>Solution WP</Tag> : null}
        </HideShowTag>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: '8vw',
      render: (record) => (
        <HideShowTag>
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
        </HideShowTag>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '12vw',
      render: (text, record) => (
        <div className="row align-center justify-evenly">
          <FilesViewModal
            documentAvail={
              record.form1files.length > 0 || record.form3files.length > 0 ? true : false
            }
            getDocuments={async () => {
              return record.form1files.concat(record.form3files);
            }}
          />
          {/* <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={async (e) => {
              const {data: req} = await loadAPI(`${DEFAULT_BASE_URL}/tp-file/?id=${record.id}`, {});
              if (req) {
                if (req[0]) {
                  if (req[0].document) {
                    window.open(req[0].document);
                  }
                }
              }
              e.stopPropagation();
            }}>
            <FontAwesomeIcon
              icon={record.tp_uploaded ? faEye : faEyeSlash}
              style={{fontSize: 20, color: '#20a8d8'}}
            />
          </Button> */}
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
                  setCpSCSid(record.id);
                  await dispatch({
                    type: ADD_CREATE_CP_BASIC_DATA,
                    data: {
                      ...record,
                      remarks: '',
                      scs_id: record.id,
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
                title: record.tp_uploaded ? 'Re-Upload TP' : 'Upload TP',
                onClick: (e) => {
                  // setPopover(false);
                  setUploadTP(true);
                  setLead(record.id);
                  setIsReUpload(!!record.tp_uploaded);
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
              setLead(record.id);
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
              api: deleteSCS,
              success: 'Deleted SCS Successfully',
              failure: 'Error in deleting SCS',
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
      name: 'ALL SCS',
      key: 'allSCS',
      data: filteredData,
      columns,
      loading,
    },
  ];

  const cancelEditing = () => setEditingId(null);
  const createCPCancel = () => {
    setEditingId(null);
    setLead(null);
    setCpSCSid(null);
    setCreateCPVisible(false);
  };
  return (
    <NoPermissionAlert hasPermission={hasPermission}>
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
          scs={cpSCSid}
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
            reload();
          }}
          lead={lead}
          isReUpload={isReUpload}
          recreate={tpFileReUpload}
          create={tpFileUpload}
          varName="scs"
        />
      </Modal>
      <TableWithTabHOC
        modelTitle={`Lead Number : ${lead}`}
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size="middle"
        title="SCS"
        editingId={editingId}
        cancelEditing={() => {
          cancelEditing();
        }}
        onCancelButton={() => {
          dispatch({type: CLEAN_PFEP_DATA});
        }}
        hideRightButton
        modalWidth={80}
        modalBody={SCSMainForm}
        formParams={{lead}}
        // expandHandleKey='person'
        // ExpandBody={PersonTable}
        // expandParams={{ loading }}
        scroll={{x: 1200}}
        csvdata={csvData}
        csvname={`SCS${searchVal}.csv`}
      />
    </NoPermissionAlert>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(PFEPEmployeeScreen);
