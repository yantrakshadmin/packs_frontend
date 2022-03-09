import React, {useEffect, useState} from 'react';
import ticketColumns from 'common/columns/ticket.column';
import { Button, Input, Modal} from 'antd';
import {deleteDEPS, retrieveAllotments, retrieveDEPS, retrieveGRNs, retrieveReturnDocket, ticketFileUpload} from 'common/api/auth';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {TicketForm} from 'forms/ticket.form';
import TableWithTabHOC from 'hocs/TableWithTab.hoc';
import {deleteHOC} from 'hocs/deleteHoc';
import Delete from 'icons/Delete';
import Edit from 'icons/Edit';
import Upload from 'icons/Upload';
import FilesViewModal from '../../components/FilesViewModal';
import NoPermissionAlert from 'components/NoPermissionAlert';
import {TicketUploadForm} from 'forms/ticketUpload.form';
import _ from 'lodash';
import { loadAPI } from 'common/helpers/api';
import ExpandTable from '../../components/TicketExpandTable'

const {Search} = Input;

const TicketsEmployeeScreen = ({currentPage, isEmployee}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [ticketID, setTicketID] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [assignedTicketData, setAssignedTicketData] = useState(null);
  const [unassignedTicketData, setUnassignedTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAssigned, setIsAssigned] = useState(false);
  const [visibleUpload, setVisibleUpload] = useState(false);

  const {filteredData, reload, hasPermission} = useTableSearch({
    searchVal,
    retrieve: retrieveDEPS,
    usePaginated : false
  });
  //const {data: mrStatusData} = useAPI('list-mrstatus/');
  const cancelEditing = () => {
    setEditingId(null);
  };

  useEffect(() => {

    const fetchTN = async () => {

      setTicketData(
        await Promise.all(filteredData.map(async (deps) => {
          if(deps.transaction_type == 'Allotment') {
            const {data: products} = await retrieveAllotments(deps.a_t_no)
            return {...deps, transaction_no: products.transaction_no}
          } else if(deps.transaction_type == 'Return') {
            const {data: products} = await retrieveReturnDocket(deps.r_t_no)
            return {...deps, transaction_no: products.transaction_no}
          } else if(deps.transaction_type == 'GRN') {
            const {data: products} = await retrieveGRNs(deps.g_t_no)
            return {...deps, transaction_no: products.transaction_no}
          }
          return deps
        }))
      )

      setTimeout(() => {
        setLoading(false)
      }, 1000)
      
    }
    if(filteredData) fetchTN()

  }, [filteredData])

  useEffect(() => {

    if(ticketData){

      setAssignedTicketData(ticketData.filter((ticket) => ticket.status == 'Assigned'))
      setUnassignedTicketData(ticketData.filter((ticket) => ticket.status == 'Unassigned'))

    }

  }, [ticketData])

  const columns = [
    ...ticketColumns,
    {
      title: 'Option',
      key: 'option',
      width: '7vw',
      render: (text, record) => (
        <div className="row justify-evenly">
          <Button
            type='primary'
            onClick={(e) => {
              e.stopPropagation();
              setIsAssigned(true)
              setEditingId(record.id);
            }}>
              Assigned To
          </Button>
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      width: '7vw',
      render: (text, record) => (
        <div className="row justify-evenly">
          {/* <FilesViewModal
            documentAvail={record.bill ? (record.bill.length > 0 ? true : false) : false}
            getDocuments={() => record.bill}
          /> */}
          {/* <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={async (e) => {
              e.stopPropagation();
              try {
                if (record.bill.length > 0) {
                  record.bill.forEach((f) => {
                    window.open(f.document);
                  });
                }
              } catch (err) {}
            }}>
            <FontAwesomeIcon
              icon={record.bill ? (record.bill.length > 0 ? faEye : faEyeSlash) : faEyeSlash}
              style={{fontSize: 20, color: yantraColors['primary']}}
            />
          </Button> */}
          <FilesViewModal
            documentAvail={true}
            getDocuments={async () => {
              const { data: req } = await loadAPI(
                `/deps-images/?pk=${record.id}`,
                {},
              );
              if (req)
                if (req.document) {
                  return [{ document: req.document, span: 24 }];
                }
              try {
                if (req.pod.length > 0) {
                  const d = [];
                  req.pod.forEach((f) => {
                    d.push({ document: f.document, span: req.pod.length > 1 ? 12 : 24 });
                  });
                  return d;
                }
              } catch (err) {}
            }}
          />
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              e.stopPropagation();
              setTicketID(record.id);
              setVisibleUpload(true)
            }}>
            <Upload />
          </Button>
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              e.stopPropagation();
              setEditingId(record.id);
              setIsAssigned(false);
            }}>
            <Edit />
          </Button>
          {/* <DeleteWithPassword
            password={DEFAULT_PASSWORD}
            deleteHOC={deleteHOC({
              record,
              reload,
              api: deleteDEPS,
              success: 'Deleted Ticket successfully',
              failure: 'Error in deleting Ticket',
            })}
          /> */}
          <Button
              style={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: 'none',
                padding: '1px',
              }}
              onClick={(e) => {
                e.stopPropagation()
                deleteHOC({
                record,
                reload,
                api: deleteDEPS,
                success: 'Deleted Ticket successfully',
                failure: 'Error in deleting Ticket',
              })()}}>
              <Delete />
          </Button>
          {/* <Popconfirm
            title="Confirm Delete"
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteExpense,
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
          </Popconfirm> */}
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All Tickets',
      key: 'allTickets',
      data: ticketData || [],
      columns,
      loading: loading,
    },
    {
      name: 'Assigned Tickets',
      key: 'assignedTickets',
      data: assignedTicketData || [],
      columns,
      loading: loading,
    },
    {
      name: 'Unassigned Tickets',
      key: 'unassignedTickets',
      data: unassignedTicketData || [],
      columns,
      loading: loading,
    },
  ];

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
        visible={visibleUpload}
        destroyOnClose
        style={{minWidth: `80vw`}}
        title=""
        onCancel={() => {
          setVisibleUpload(false);
        }}
        footer={null}>
        <TicketUploadForm
          onCancel={() => {
            setVisibleUpload(false);
          }}
          onDone={() => {
            setVisibleUpload(false);
          }}
          lead={ticketID}
          create={ticketFileUpload}
          varName="deps"
        />
      </Modal>
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size="middle"
        title="Tickets"
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={TicketForm}
        modalWidth={80}
        formParams={{isAssigned}}
        expandHandleKey="items"
        // expandParams={(record) => record.id}
        ExpandBody={ExpandTable}
      />
    </NoPermissionAlert>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(TicketsEmployeeScreen);
