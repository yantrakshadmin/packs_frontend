import React, {useState, useEffect} from 'react';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import returnColumns from 'common/columns/Return.column';
import ReturnForm from 'forms/return.form';
import {ReceivedForm} from 'forms/received.form';
import {Popconfirm, Input, Button} from 'antd';
import {deleteHOC} from '../../hocs/deleteHoc';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {deleteReturn} from 'common/api/auth';
import {Link} from '@reach/router';
import Delete from 'icons/Delete';
import Edit from 'icons/Edit';
import Delivery from 'icons/Delivery';
import Document from 'icons/Document';
import {useAPI} from 'common/hooks/api';

const {Search} = Input;

const ReturnDocketsScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [reqData, setReqData] = useState(null);
  const [deliveryId, setDeliveryId] = useState(null);

  const {data: returns, loading} = useAPI('/returndockets/', {});

  const {filteredData, reload} = useTableSearch({
    searchVal,
    reqData,
  });

  useEffect(() => {
    if (returns) {
      const reqD = returns.map((ret) => ({
        ...ret,
        transport_by: ret.transport_by.name,
      }));
      setReqData(reqD);
    }
  }, [returns]);

  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
    },
    ...returnColumns,
    {
      title: 'Docket',
      key: 'docket',
      render: (text, record) => {
        console.log(record);
        return (
          <Button type="primary">
            <Link
              to="../return-docket/"
              state={{id: record.id}}
              key={record.id}
              style={{textDecoration: 'none'}}>
              View Docket
            </Link>
          </Button>
        );
      },
    },
    {
      title: 'Action',
      key: 'operation',
      width: '9vw',
      render: (text, record) => (
        <div className="row justify-evenly">
          <a href={record.document} target="_blank" rel="noopener noreferrer">
            <Button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: '1px',
              }}
              disabled={!record.document}
              onClick={(e) => e.stopPropagation()}>
              <Document color={record.document ? '#7CFC00' : null} />
            </Button>
          </a>
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              setDeliveryId(record.id);
              e.stopPropagation();
            }}>
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
              api: deleteReturn,
              success: 'Deleted kit successfully',
              failure: 'Error in deleting kit',
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
      name: 'All Return Dockets',
      key: 'allReturnDockets',
      data: filteredData,
      columns,
      loading,
    },
  ];

  const cancelEditing = () => {
    setEditingId(null);
    setDeliveryId(null);
  };

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
        title="Return Dockets"
        modalBody={deliveryId ? ReceivedForm : ReturnForm}
        newPage="./return/"
        modalWidth={60}
        editingId={editingId || deliveryId}
        cancelEditing={cancelEditing}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(ReturnDocketsScreen);
