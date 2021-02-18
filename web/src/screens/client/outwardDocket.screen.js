import React, {useState, useEffect} from 'react';
import {Input, Button, Popconfirm} from 'antd';
import {connect, useSelector} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {Link} from '@reach/router';
import {useAPI} from 'common/hooks/api';
import {deleteOutward} from 'common/api/auth';
import {outwardDocketColumn} from 'common/columns/outwardDocket.column';
import {GetUniqueValueNested} from 'common/helpers/getUniqueValues';
import {loadAPI} from 'common/helpers/api';
import {DEFAULT_BASE_URL} from 'common/constants/enviroment';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import {OutwardDocketForm} from '../../forms/OutwardDocket.form';
import Edit from '../../icons/Edit';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import Delivery from '../../icons/Delivery';
import Download from '../../icons/Download';
import {OutwardDeliveredDocketForm} from '../../forms/OutwardDeliveredDocket.form';
import Document from '../../icons/Document';
import TableWithTabHoc from '../../hocs/TableWithTab.hoc';
import moment from 'moment';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBarcode, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {yantraColors} from '../../helpers/yantraColors';

const {Search} = Input;

const OutwardDocketScreen = ({currentPage, isEmployee}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [reqData, setReqData] = useState(null);
  const [deliveryId, setDeliveryId] = useState(null);
  const [TN, setTN] = useState(null);
  const user = useSelector((s) => s.user.userMeta.id);
  console.log(user, isEmployee, 'Props');

  const {data: outwards, loading, reload} = useAPI(isEmployee ? 'emp-outwards/' : '/outwards/', {});
  const {filteredData} = useTableSearch({
    searchVal,
    reqData,
  });

  useEffect(() => {
    if (outwards) {
      const reqD = outwards.map((ret) => ({
        ...ret,
      }));
      setReqData(reqD);
    }
  }, [outwards]);
  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: 'Transaction Date',
      dataIndex: 'transaction_date',
      key: 'transaction_date',
      sorter: (a, b) => moment(a.transaction_date).unix() - moment(b.transaction_date).unix(),
      showSorterTooltip: false,
      render: (text) => <div>{text.slice(0, 10)}</div>,
    },
    {
      title: 'Dispatch Date',
      dataIndex: 'dispatch_date',
      key: 'dispatch_date',
      sorter: (a, b) => moment(a.dispatch_date).unix() - moment(b.dispatch_date).unix(),
      showSorterTooltip: false,
      render: (text) => <div>{text.slice(0, 10)}</div>,
    },
    {
      title: 'Receiver Client',
      dataIndex: 'sending_location',
      key: 'sending_location',
      width: 400,
      render: (location) => (
        <div>
          {location.name} - {location.address}
        </div>
      ),
      filters: GetUniqueValueNested(filteredData || [], 'sending_location', 'name'),
      onFilter: (value, record) => record.sending_location.name === value,
    },
    // {
    //   title: 'Sender Client',
    //   dataIndex: 'owner',
    //   key: 'owner',
    //   width: 400,
    //   render: (i) => <div>{i.client_name}</div>,
    //   filters: GetUniqueValueNested(filteredData || [], 'owner', 'client_name'),
    //   onFilter: (value, record) => record.owner.client_name === value.client_name,
    // },
    ...outwardDocketColumn,
    // {
    //   title:'kit',
    //   dataIndex:'kit',
    //   key:'kit',
    //   render:(kit)=>(
    //     <div>
    //       {kit.kit_name}
    //       {' '}
    //       -
    //       {' '}
    //       {kit.kit_info}
    //     </div>
    //   )
    //
    // },
    {
      title: 'Docket',
      key: 'docket',
      render: (text, record) => {
        return (
          // <a href={`../return-docket/${record.transaction_no}`} target="_blank" rel="noreferrer">
          //     <Download />
          //   </a>
          <div className="row align-center justify-evenly">
            <Link
              to={`../outward-docket/${record.id}`}
              target="_blank"
              state={{id: record.id}}
              key={record.id}
              style={{textDecoration: 'none'}}>
              <Download />
            </Link>
          </div>
        );
      },
    },
    {
      title: 'Action',
      key: 'operation',
      width: '7vw',
      render: (text, record) => (
        // <div className="row justify-evenly">
        //   <Button
        //     style={{
        //       backgroundColor: 'transparent',
        //       border: 'none',
        //       boxShadow: 'none',
        //       padding: '1px',
        //     }}
        //     // disabled={!record.document}
        //     onClick={async (e) => {
        //       const {data: req} = await loadAPI(`${DEFAULT_BASE_URL}/inward/?pk=${record.id}`, {});
        //       if (req) {
        //         if (req[0]) {
        //           if (req[0].document) {
        //             window.open(req[0].document);
        //           }
        //         }
        //       }
        //       e.stopPropagation();
        //     }}>
        //     <FontAwesomeIcon
        //       icon={record.is_delivered ? faEye : faEyeSlash}
        //       style={{fontSize: 20, color: yantraColors['primary']}}
        //     />
        //   </Button>
        //   <Button
        //     style={{
        //       backgroundColor: 'transparent',
        //       border: 'none',
        //       boxShadow: 'none',
        //       padding: '1px',
        //     }}
        //     disabled>
        //     <Delivery color={record.is_delivered ? '#7CFC00' : null} />
        //   </Button>
        //   <Button
        //     style={{
        //       backgroundColor: 'transparent',
        //       border: 'none',
        //       boxShadow: 'none',
        //       padding: '1px',
        //     }}
        //     disabled>
        //     <Edit />
        //   </Button>
        //   <Button
        //     style={{
        //       backgroundColor: 'transparent',
        //       boxShadow: 'none',
        //       border: 'none',
        //       padding: '1px',
        //     }}
        //     disabled>
        //     <Delete />
        //   </Button>
        // </div>
        <div className="row justify-evenly">
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            // disabled={!record.document}
            onClick={async (e) => {
              const {data: req} = await loadAPI(`${DEFAULT_BASE_URL}/inward/?pk=${record.id}`, {});
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
              icon={record.is_delivered ? faEye : faEyeSlash}
              style={{fontSize: 20, color: yantraColors['primary']}}
            />
          </Button>
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              setTN(record.transaction_no);
              setDeliveryId(record.id);
              e.stopPropagation();
            }}
            disabled={isEmployee ? true : false}>
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
            }}
            disabled={isEmployee ? true : false}>
            <Edit />
          </Button>
          <Popconfirm
            title="Confirm Delete"
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteOutward,
              success: 'Deleted Outward Docket Successfully',
              failure: 'Error in deleting Outward Docket',
            })}>
            <Button
              style={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: 'none',
                padding: '1px',
              }}
              onClick={(e) => e.stopPropagation()}
              disabled={isEmployee ? true : false}>
              <Delete />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All Outward Dockets',
      key: 'allOutwardDockets',
      data: filteredData,
      columns,
      loading,
    },
  ];

  const cancelEditing = () => {
    setEditingId(null);
    setTN(null);
    setDeliveryId(null);
  };

  const handleDone = () => {
    cancelEditing();
    reload();
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
        loading={loading}
        size="middle"
        noNewPageCSV
        downloadLink={isEmployee ? null : `${DEFAULT_BASE_URL}outward-reportClient/?c_id=${user}`}
        editingId={editingId || deliveryId}
        title={deliveryId ? 'Delivered Docket ' : 'Outward Docket '}
        modalBody={deliveryId ? OutwardDeliveredDocketForm : OutwardDocketForm}
        modalWidth={98}
        formParams={{transaction_no: TN}}
        cancelEditing={cancelEditing}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(OutwardDocketScreen);
