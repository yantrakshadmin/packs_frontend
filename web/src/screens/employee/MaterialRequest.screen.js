import React, {useState, useEffect} from 'react';
import materialEmployeecolumns from 'common/columns/materialEmployee.column';
import {Link} from '@reach/router';
import {
  Button,
  Col,
  Input,
  Modal,
  notification,
  Popconfirm,
  Popover,
  Row,
  Space,
  Typography,
} from 'antd';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {deleteAddMr, retrieveEmployeeMrsEfficient} from 'common/api/auth';
import moment from 'moment';
import {ALLOTMENT_DOCKET_PASSWORD} from 'common/constants/allotmentDocketPassword';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import {loadAPI} from 'common/helpers/api';
import {useAPI} from 'common/hooks/api';
import {mergeArray, statusCheck} from 'common/helpers/mrHelper';
import ExpandTable from '../../components/MaterialRequestsTable';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import {AddMaterialRequestForm} from '../../forms/addMaterialRequest.form';
import Edit from '../../icons/Edit';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import {ActionsPopover} from '../../components/ActionsPopover';
import {MRRejectionForm} from '../../forms/MRRejection.form';

const {Search} = Input;
const {Title} = Typography;

const ReceiverClientEmployeeScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);
  const [materialReqVisible, setMaterialReqVisible] = useState(false);
  const [rejectionVisible, setRejectionVisible] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverEditVisible, setPopoverEditVisible] = useState(false);
  const {filteredData, loading, reload} = useTableSearch({
    searchVal,
    retrieve: retrieveEmployeeMrsEfficient,
  });

  const {data: mrStatusData} = useAPI('list-mrstatus/');

  const [userData, setUserData] = useState({password: ''});

  const PasswordPopUp = (
    <Space direction="vertical">
      <Input.Password
        value={userData.password}
        onChange={(e) => {
          setUserData({...userData, password: e.target.value});
        }}
        placeholder="input password"
        iconRender={(show) => (show ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <Button
        onClick={() => {
          if (userData.password === ALLOTMENT_DOCKET_PASSWORD) {
            setUserData({password: ''});
            if (editingId) {
              setPopoverEditVisible(false);
            } else {
              setPopoverVisible(false);
            }
            setMaterialReqVisible(true);
          } else {
            notification.error({
              message: 'Invalid Password',
            });
          }
        }}>
        Proceed
      </Button>
    </Space>
  );
  const getFilterOptions = () => {
    const arr = [...new Set((filteredData || []).map((item) => item.owner))];
    return arr.map((item) => ({text: item, value: item}));
  };
  useEffect(() => {
    if (filteredData) {
      // const csvd = [];
      // filteredData.forEach((d) => {
      //   const temp = {
      //     ...d,
      //     owner: d.owner.first_name + d.owner.last_name,
      //     delivery_required_on: d.delivery_required_on.slice(0, 10),
      //   };
      //   delete temp.flows;
      //   csvd.push(temp);
      //   d.flows.forEach((flo) => {
      //     csvd.push({
      //       FlowName: flo.flow.flow_name,
      //       KitName: flo.kit.kit_name,
      //       Quantity: flo.quantity,
      //     });
      //   });
      // });
      setFilterOptions(getFilterOptions());
      //setCsvData(csvd);
    }
  }, [filteredData]);

  const columns = [
    ...materialEmployeecolumns,
    {
      title: 'Owner',
      key: 'owner',
      filters: filterOptions || [],
      onFilter: (value, record) => record.owner === value,
      render: (text, record) => {
        return record.owner;
      },
    },
    {
      title: 'Delivery Required On',
      key: 'delivery_required_on',
      sorter: (a, b) =>
        moment(a.delivery_required_on).unix() - moment(b.delivery_required_on).unix(),
      render: (text, record) => {
        return moment(record.delivery_required_on).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Status',
      key: 'status',
      className: 'align-center',
      filters: [
        {
          text: 'Allocated',
          value: 'Allocated',
        },
        {
          text: 'Pending',
          value: 'Pending',
        },
        {
          text: 'Rejected',
          value: 'Rejected',
        },
      ],
      onFilter: (value, record) => statusCheck(record.is_allocated, record.is_rejected) === value,
      render: (text, record) => {
        if (record.is_allocated && !record.is_rejected)
          return (
            <Button
              type="primary"
              style={{
                backgroundColor: '#00FF00',
                outline: 'none',
                border: 'none',
                borderRadius: '7%',
              }}
              onClick={(e) => e.stopPropagation()}>
              Allocated
            </Button>
          );
        if (!record.is_allocated && !record.is_rejected) {
          return (
            <Button
              type="primary"
              style={{
                backgroundColor: 'red',
                outline: 'none',
                border: 'none',
                borderRadius: '7%',
                color: 'rgba(255,255,255,0.9)',
              }}
              onClick={(e) => e.stopPropagation()}>
              Pending
              {'  '}
            </Button>
          );
        }
        if (!record.is_allocated && record.is_rejected) {
          return (
            <Popover
              content={
                <div style={{width: '20rem'}}>
                  <text>
                    <b>Reason : </b>
                    {record.reason}
                  </text>
                  <br />
                  {record.remarks ? (
                    <text>
                      <b>Remarks : </b>
                      {record.remarks}
                    </text>
                  ) : null}
                </div>
              }>
              <Button type="primary" danger>
                Rejected
              </Button>
            </Popover>
          );
        }
        return <div />;
      },
    },
    {
      title: 'Raised By',
      key: 'raised_by',
      dataIndex: 'raised_by',
    },
    {
      title: 'Options',
      key: 'options',
      width: '10vw',
      render: (text, record) => (
        <ActionsPopover
          triggerTitle="Options"
          buttonList={[
            {
              Component: () => (
                <Button
                  type="primary"
                  disabled={record.is_allocated || record.is_rejected}
                  onClick={async (e) => {
                    const response = await loadAPI('reate-mrstatus/', {
                      method: 'Post',
                      data: {mr: record.id},
                    });
                    e.stopPropagation();
                  }}>
                  <Link to="../create-allotment/" state={{id: record.id}} key={record.id}>
                    Create Allotment Docket
                  </Link>
                </Button>
              ),
            },
            {
              Component: () => (
                <Button
                  className="mx-2"
                  type="primary"
                  disabled={record.is_allocated || record.is_rejected}
                  onClick={(e) => {
                    setEditingId(record.id);
                    setRejectionVisible(true);
                    e.stopPropagation();
                  }}>
                  Reject
                </Button>
              ),
            },
          ]}
        />
      ),
    },
    //     {
    //       title:'Request Status',
    //       key:'is_rejected',
    //       render:(row)=>(
    //         <div>
    //
    //           {/* eslint-disable-next-line no-nested-ternary */}
    //           {row.is_rejected?(
    //             <Popover content={(
    //               <div style={{ width:'20rem' }}>
    //                 <text>
    //                   <b>Reason : </b>
    //                   {row.reason}
    //                 </text>
    //                 <br />
    //                 {row.remarks?(
    //                   <text>
    //                     <b>Remarks : </b>
    //                     {row.remarks}
    //                   </text>
    //                 ):null}
    //               </div>
    // )}>
    //               <Button type='primary' danger>Rejected</Button>
    //             </Popover>
    //           ):row.is_rejected === undefined?(
    //             <Button>Not Created</Button>
    //           ):<div><Button type='primary'>Approved</Button></div>}
    //         </div>
    //       )
    //     },

    {
      title: 'Action',
      key: 'operation',
      width: '9vw',
      render: (text, record) => (
        <div className="row justify-evenly">
          <Popover
            content={PasswordPopUp}
            title="Verify"
            trigger="click"
            visible={popoverEditVisible && record.id === editingId}
            onVisibleChange={(e) => {
              setPopoverEditVisible(e);
            }}>
            <Button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: '1px',
              }}
              onClick={(e) => {
                setEditingId(record.id);
                setPopoverEditVisible(true);
                e.stopPropagation();
              }}>
              <Edit />
            </Button>
          </Popover>
          <Popconfirm
            title="Confirm Delete"
            onCancel={(e) => e.stopPropagation()}
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteAddMr,
              success: 'Deleted Material Request Successfully',
              failure: 'Error in deleting Material Request',
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
      name: 'All Material Requests',
      key: 'allMaterialRequests',
      data: mergeArray(filteredData || [], mrStatusData || []),
      columns,
      loading,
    },
  ];

  const cancelEditing = () => {
    setEditingId(null);
    reload();
  };

  return (
    <>
      <Modal
        maskClosable={false}
        visible={materialReqVisible}
        destroyOnClose
        style={{minWidth: `80vw`}}
        title="Add Material Request"
        onCancel={(e) => {
          setMaterialReqVisible(false);
          cancelEditing();
          e.stopPropagation();
        }}
        footer={null}>
        <AddMaterialRequestForm
          id={editingId}
          onDone={() => {
            reload();
            setMaterialReqVisible(false);
          }}
          onCancel={() => {
            reload();
            setMaterialReqVisible(false);
          }}
        />
      </Modal>
      <Modal
        maskClosable={false}
        visible={rejectionVisible}
        destroyOnClose
        style={{minWidth: `80vw`}}
        title="Reject Material Request"
        onCancel={(e) => {
          setRejectionVisible(false);
          cancelEditing();
          e.stopPropagation();
        }}
        footer={null}>
        <MRRejectionForm
          mr={editingId}
          onDone={() => {
            setRejectionVisible(false);
          }}
          onCancel={() => {
            setRejectionVisible(false);
          }}
        />
      </Modal>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div style={{width: '15vw', display: 'flex', alignItems: 'flex-end'}}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder="Search" enterButton />
        </div>
      </div>
      <br />
      <Row justify="space-between">
        <Col>
          <Title level={3}>Material Requests</Title>
        </Col>
        <Col>
          <Popover
            content={PasswordPopUp}
            title="Verify"
            trigger="click"
            visible={popoverVisible}
            onVisibleChange={(e) => {
              setPopoverVisible(e);
            }}>
            <Button type="primary">Add Material Request</Button>
          </Popover>
        </Col>
      </Row>
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size="middle"
        title=""
        //editingId={editingId}
        //cancelEditing={cancelEditing}
        ExpandBody={ExpandTable}
        hideRightButton
        //expandParams={{loading}}
        //csvdata={csvData}
        //csvname={`MRs${searchVal}.csv`}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(ReceiverClientEmployeeScreen);
