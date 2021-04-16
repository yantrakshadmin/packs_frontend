import React, {useState} from 'react';
import relocationColumn from 'common/columns/relocation.column';
import {Popconfirm, Button, Input} from 'antd';
import {deleteRelocation, retrieveRelocations} from 'common/api/auth';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {useAPI} from 'common/hooks/api';
import {mergeArray} from 'common/helpers/mrHelper';
import {RelocationForm} from 'forms/relocation.form';
import TableWithTabHOC from 'hocs/TableWithTab.hoc';
import ExpandTable from 'components/ExpenseExpandTable';
import {deleteHOC} from 'hocs/deleteHoc';
import Delivery from 'icons/Delivery';
import Edit from 'icons/Edit';
import Download from 'icons/Download';
import {yantraColors} from '../../helpers/yantraColors';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import FilesViewModal from '../../components/FilesViewModal';
import DeleteWithPassword from '../../components/DeleteWithPassword';
import {DEFAULT_PASSWORD} from 'common/constants/passwords';
import NoPermissionAlert from 'components/NoPermissionAlert';
import {DeliveredForm} from 'forms/relocationDelivered.form';

import _ from 'lodash';

const {Search} = Input;

const ExpenseEmployeeScreen = ({currentPage, isEmployee}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [deliveryId, setDeliveryId] = useState(null);
  const [TN, setTN] = useState(null);

  const {filteredData, loading, reload, hasPermission} = useTableSearch({
    searchVal,
    retrieve: retrieveRelocations,
  });
  //const {data: mrStatusData} = useAPI('list-mrstatus/');
  const cancelEditing = () => {
    setEditingId(null);
    setDeliveryId(null);
  };

  const columns = [
    ...relocationColumn,
    {
      title: 'Docket',
      key: 'docket',
      render: (text, record) => {
        return (
          <div className="row align-center justify-evenly">
            <a
              href={`../relocation-docket/${record.transaction_no}`}
              target="_blank"
              rel="noreferrer">
              <Download />
            </a>
          </div>
        );
      },
    },
    {
      title: 'Action',
      key: 'operation',
      width: '7vw',
      render: (text, record) => (
        <div className="row justify-evenly">
          <FilesViewModal
            documentAvail={record.bill ? (record.bill.length > 0 ? true : false) : false}
            getDocuments={() => record.bill}
          />
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              setEditingId(null);
              setTN(record.transaction_no);
              setDeliveryId(record.id);
              e.stopPropagation();
            }}
            disabled={record.is_delivered ? true : false}>
            <Delivery color={record.is_delivered ? '#7CFC00' : null} />
          </Button>
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              setDeliveryId(null);
              setEditingId(record.id);
              e.stopPropagation();
            }}>
            <Edit />
          </Button>
          <DeleteWithPassword
            password={DEFAULT_PASSWORD}
            deleteHOC={deleteHOC({
              record,
              reload,
              api: deleteRelocation,
              success: 'Deleted Relocation successfully',
              failure: 'Error in deleting Relocation',
            })}
          />
          {/* <Popconfirm
            title="Confirm Delete"
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteRelocation,
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
      name: 'All Relocation Dockets',
      key: 'allRelocations',
      data: filteredData || [],
      columns,
      loading,
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
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size="middle"
        title="Relocation Docket"
        editingId={editingId || deliveryId}
        cancelEditing={cancelEditing}
        modalBody={deliveryId ? DeliveredForm : RelocationForm}
        modalWidth={80}
        formParams={{isEmployee, transaction_no: TN}}
        //expandHandleKey="transactions"
        //expandParams={{loading}}
        //ExpandBody={ExpandTable}
      />
    </NoPermissionAlert>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(ExpenseEmployeeScreen);
