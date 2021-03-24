import React, {useState, useEffect} from 'react';
import leadColumns from 'common/columns/Leads.colums';
import {Popconfirm, Button, Input, Modal} from 'antd';
import {connect, useDispatch} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {retrieveLeads, deleteLead, leadFileUpload} from 'common/api/auth';
import Delete from 'icons/Delete';
import PersonTable from 'components/PersonTable';
import {DiffOutlined, ToTopOutlined} from '@ant-design/icons';
import {CLEAN_PFEP_DATA} from 'common/actions';
import {deleteHOC} from 'hocs/deleteHoc';
import Edit from 'icons/Edit';
import TableWithTabHOC from 'hocs/TableWithTab.hoc';
import {LeadsForm} from 'forms/leads.form';
import {PFEPMainForm} from 'forms/PFEP/PFEPMain.form';
import {UploadLeadForm} from 'forms/uploadLead.form';
import {ActionsPopover} from 'components/ActionsPopover';
import NoPermissionAlert from 'components/NoPermissionAlert';

const {Search} = Input;

const WarehouseEmployeeScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visibleUpload, setVisibleUpload] = useState(false);
  const [lead, setLead] = useState(null);
  const [popover, setPopover] = useState(false);

  const {filteredData, loading, reload, hasPermission} = useTableSearch({
    searchVal,
    retrieve: retrieveLeads,
  });
  const dispatch = useDispatch();

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
    ...leadColumns,
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '12vw',
      render: (text, record) => (
        <div className="row align-center justify-evenly">
          <ActionsPopover
            popover={popover}
            setPopover={setPopover}
            triggerTitle="Options"
            buttonList={[
              {
                Icon: DiffOutlined,
                title: 'Create PFEP',
                onClick: (e) => {
                  setPopover(false);
                  setLead(record.lead_no);
                  setVisible(true);
                  e.stopPropagation();
                },
              },
              {
                Icon: ToTopOutlined,
                title: 'Upload PFEP',
                onClick: (e) => {
                  setPopover(false);
                  setLead(record.lead_no);
                  setVisibleUpload(true);
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
              api: deleteLead,
              success: 'Deleted Lead successfully',
              failure: 'Error in deleting Lead',
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
      name: 'All Leads',
      key: 'allLeads',
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
      <Modal
        maskClosable={false}
        visible={visible}
        destroyOnClose
        style={{minWidth: `80vw`}}
        title=""
        onCancel={() => {
          dispatch({type: CLEAN_PFEP_DATA});
          setVisible(false);
        }}
        footer={null}>
        <PFEPMainForm
          onCancel={() => {
            setVisible(false);
          }}
          onDone={() => {
            setVisible(false);
          }}
          lead={lead}
        />
      </Modal>
      <Modal
        maskClosable={false}
        visible={visibleUpload}
        destroyOnClose
        style={{minWidth: `80vw`}}
        title=""
        onCancel={() => {
          setVisibleUpload(false);
        }}
        footer={null}>
        <UploadLeadForm
          onCancel={() => {
            setVisibleUpload(false);
          }}
          onDone={() => {
            setVisibleUpload(false);
          }}
          lead={lead}
          create={leadFileUpload}
          varName="lead_no"
        />
      </Modal>
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size="middle"
        title="Leads"
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={LeadsForm}
        modalWidth={60}
        expandHandleKey="person"
        ExpandBody={PersonTable}
        expandParams={{loading}}
        scroll={{x: 1200}}
        csvdata={csvData}
        csvname={`Leads${searchVal}.csv`}
      />
    </NoPermissionAlert>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(WarehouseEmployeeScreen);
