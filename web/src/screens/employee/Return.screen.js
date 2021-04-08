import React, {useState, useEffect} from 'react';
import returnColumns from 'common/columns/Return.column';
import ReturnForm from 'forms/return.form';
import {ReceivedForm} from 'forms/received.form';
import {Popconfirm, Input, Button, Row, Col, Modal} from 'antd';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {deleteReturn} from 'common/api/auth';
import {Link, useNavigate} from '@reach/router';
import Delete from 'icons/Delete';
import Edit from 'icons/Edit';
import Delivery from 'icons/Delivery';
import Download from 'icons/Download';
import Document from 'icons/Document';
import {useAPI} from 'common/hooks/api';
import {GetUniqueValue} from 'common/helpers/getUniqueValues';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faMoneyCheck,
  faTruckLoading,
  faBarcode,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import {BarcodeReturnDocket} from 'components/barcodeReturnDocket';
import {loadAPI} from 'common/helpers/api';
import {DEFAULT_BASE_URL} from 'common/constants/enviroment';
import {deleteHOC} from '../../hocs/deleteHoc';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import {LineGraph} from '../../components/graphComponent/lineGraph';
import {yantraColors} from '../../helpers/yantraColors';
import ExpandTable from '../../components/ReturnsExpandTable';

import DeleteWithPassword from '../../components/DeleteWithPassword';
import {DEFAULT_PASSWORD} from 'common/constants/passwords';
import NoPermissionAlert from 'components/NoPermissionAlert';

const {Search} = Input;

const ReturnDocketsScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [reqData, setReqData] = useState(null);
  const [deliveryId, setDeliveryId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [returnNo, setReturnNo] = useState(null);
  const [TN, setTN] = useState(null);
  const navigate = useNavigate();

  const {data: returns, loading, reload: reloadFull, status} = useAPI('/return-table/', {});

  const {filteredData, reload} = useTableSearch({
    searchVal,
    reqData,
  });

  useEffect(() => {
    if (returns) {
      const reqD = returns.map((ret) => ({
        ...ret,
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
    {
      title: 'Transaction No.',
      key: 'transaction_no',
      dataIndex: 'transaction_no',
      sorter: (a, b) => a.transaction_no - b.transaction_no,
    },
    {
      title: 'Receiver Client',
      key: 'receiver_client',
      dataIndex: 'receiver_client',
      filters: GetUniqueValue(filteredData || [], 'receiver_client'),
      onFilter: (value, record) => record.receiver_client === value,
    },
    ...returnColumns,
    {
      title: 'Docket',
      key: 'docket',
      render: (text, record) => {
        return (
          <div className="row align-center justify-evenly">
            <a href={`../return-docket/${record.transaction_no}`} target="_blank" rel="noreferrer">
              <Download />
            </a>
            <FontAwesomeIcon
              className="mx-2 icon-bg"
              icon={faBarcode}
              onClick={() => {
                setTN(record.transaction_no);
                setReturnNo(record.id);
                setVisible(true);
              }}
              style={{fontSize: 20}}
            />
          </div>
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
              // disabled={!record.document}
              onClick={async (e) => {
                e.stopPropagation();
                const {data: req} = await loadAPI(
                  `${DEFAULT_BASE_URL}/received-docket/?pk=${record.id}`,
                  {},
                );
                if (req)
                  if (req.document) {
                    window.open(req.document);
                  }
                try {
                  if (req.pod.length > 0) {
                    req.pod.forEach((f) => {
                      window.open(f.document);
                    });
                  }
                } catch (err) {}
              }}>
              <FontAwesomeIcon
                icon={record.is_delivered ? faEye : faEyeSlash}
                style={{fontSize: 20, color: yantraColors['primary']}}
              />
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
              navigate('./return/', {
                state: {
                  id: record.id,
                  // onCancel: cancelEditing,
                  // onDone: handleDone,
                },
              });
              e.stopPropagation();
            }}>
            <Edit />
          </Button>
          {/* <Popconfirm
            title="Confirm Delete"
            onCancel={(e) => e.stopPropagation()}
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteReturn,
              success: 'Deleted Return successfully',
              failure: 'Error in deleting return',
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
          <DeleteWithPassword
            password={DEFAULT_PASSWORD}
            deleteHOC={deleteHOC({
              record,
              reloadFull,
              api: deleteReturn,
              success: 'Deleted Return successfully',
              failure: 'Error in deleting Return',
            })}
          />
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

  const handleDone = () => {
    cancelEditing();
    reloadFull();
  };

  let deliveredCount = 0;
  // eslint-disable-next-line array-callback-return
  (reqData || []).map((alt) => {
    if (alt.is_delivered) deliveredCount += 1;
  });
  const pendingCount = (reqData || []).length - deliveredCount;

  return (
    <NoPermissionAlert hasPermission={status === 403 ? false : true}>
      <Row className="mr-auto ml-auto" gutter={24}>
        <Col span={6}>
          <LineGraph {...{tagName: 'Total Return', count: (reqData || []).length, width: 230}} />
        </Col>
        <Col span={6}>
          <LineGraph {...{tagName: 'Total Received', count: deliveredCount, width: 230}} />
        </Col>
        <Col span={6}>
          <LineGraph {...{tagName: 'In-transit', count: pendingCount, width: 230}} />
        </Col>
        <Col span={6}>
          <LineGraph
            {...{
              tagName: 'DEPS Reported',
              count: 5,
              width: 230,
            }}
          />
        </Col>
      </Row>
      <br />
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div style={{width: '15vw', display: 'flex', alignItems: 'flex-end'}}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder="Search" enterButton />
        </div>
      </div>
      <br />
      <br />
      <Modal
        maskClosable={false}
        visible={visible}
        destroyOnClose
        style={{minWidth: `80vw`}}
        title={TN}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}>
        <BarcodeReturnDocket transaction={TN} returnNo={returnNo} setVisible={setVisible} />
      </Modal>
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reloadFull}
        tabs={tabs}
        size="middle"
        title="Return Dockets"
        modalBody={deliveryId ? ReceivedForm : ReturnForm}
        ExpandBody={ExpandTable}
        newPage="./return/"
        separate={!deliveryId}
        modalWidth={60}
        editingId={editingId || deliveryId}
        cancelEditing={cancelEditing}
      />
    </NoPermissionAlert>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(ReturnDocketsScreen);
