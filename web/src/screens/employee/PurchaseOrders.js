import React, {useState, useEffect} from 'react';
import {DEFAULT_BASE_URL} from 'common/constants/enviroment';
import GRNColumns from 'common/columns/GRN.column';
import {Popconfirm, Button, Input, Space} from 'antd';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {useAPI} from 'common/hooks/api';
import Edit from 'icons/Edit';
import Delete from 'icons/Delete';
import Document from 'icons/Document';
import Download from 'icons/Download';
import Print from 'icons/Print';
import moment from 'moment';
import { deleteGRN, retrieveGRNBars, retrivePurchaseTable } from 'common/api/auth';
import {deleteHOC} from '../../hocs/deleteHoc';
import {ProductTable} from '../../components/GRNProductsTable';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import {PurchaseOrderForm} from '../../forms/PurchaseOrderForms';
import {GRNForm} from 'forms/GRN.form';
import {GetUniqueValue} from 'common/helpers/getUniqueValues';
import TableWithTabHoc from '../../hocs/TableWithTab.hoc';
import {Select} from 'antd';
import DeleteWithPassword from '../../components/DeleteWithPassword';
import {DEFAULT_PASSWORD} from 'common/constants/passwords';
import NoPermissionAlert from 'components/NoPermissionAlert';
import {Popover} from 'antd';
import {FileAddOutlined} from '@ant-design/icons';

const {Search} = Input;
const {Option} = Select;

const KitEmployeeScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [reqData, setReqData] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [barLoading, setBarLoading] = useState(false);
  const [barID, setBarID] = useState(null);
  const [createGrn, setCreateGrn] = useState(null);

  // const {data: pos, loading, reload, status} = useAPI('/purchaseorders/', {});

  const { filteredData, loading, reload, status, paginationData } = useTableSearch({
    retrieve: retrivePurchaseTable,
    usePaginated: true
    // searchVal,
    // reqData,
  });

  useEffect(() => {
    if (filteredData) {
      const fetchData = async () => {
        const newData = filteredData.map((po) => ({
          id: po.id,
          delivered_to: po.delivered_to.name,
          material_vendor: po.material_vendor.name,
          expected_delivery: po.expected_delivery,
          payment_terms: po.payment_terms,
          po_number: po.po_number,
          billing_gst: po.billing_gst,
          amount: po.amount,
          gst: po.gst,
        }));
        setReqData(newData);
      };
      fetchData();
    }
  }, [filteredData]);

  const download = (filename, data) => {
    const blob = new Blob([data], {type: 'text/csv'});
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, filename);
    } else {
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
  };
  const cancelEditing = () => {
    setEditingId(null);
    setCreateGrn(false);
  };

  const columns = [
    {
      title: 'PO ID',
      key: 'id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Material Vendor',
      key: 'material_vendor',
      dataIndex: 'material_vendor',
    },
    {
      title: 'Delivered to',
      key: 'delivered_to',
      dataIndex: 'delivered_to',
      filters: GetUniqueValue(filteredData || [], 'delivered_to'),
      onFilter: (value, record) => record.warehouse === value,
    },
    {
      title: 'Expected Delivery',
      key: 'expected_delivery',
      sorter: (a, b) => moment(a.expected_delivery).unix() - moment(b.expected_delivery).unix(),
      render: (text, record) => {
        return moment(record.expected_delivery).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Payment Terms',
      key: 'payment_terms',
      dataIndex: 'payment_terms',
    },
    {
      title: 'PO Number',
      key: 'po_number',
      dataIndex: 'po_number',
    },
    {
      title: 'Billing GST',
      key: 'billing_gst',
      dataIndex: 'billing_gst',
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
    },
    {
      title: 'GST',
      key: 'gst',
      dataIndex: 'gst',
    },
    {
      title: 'Action',
      key: 'operation',
      width: '7vw',
      render: (text, record) => (
        <div className="row justify-evenly">
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
          <a
            // href={`${DEFAULT_BASE_URL}print-barcodes/${record.id}/`}
            href={`../purchase-order/${record.id}`}
            target="_blank"
            rel="noopener noreferrer">
            <Button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: '1px',
              }}
              onClick={(e) => e.stopPropagation()}>
              <Print />
            </Button>
          </a>
          <Button
            type="primary"
            shape="circle"
            style={{
              fontSize: '12px',
              // backgroundColor: 'transparent',
              // border: 'none',
              // boxShadow: 'none',
              // padding: '1px',
            }}
            onClick={(e) => {
              setEditingId(record.id);
              setCreateGrn(true);
              e.stopPropagation();
            }}>
            GRN
          </Button>
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All Purchase Orders',
      key: 'allGRNs',
      data: filteredData,
      columns,
      loading,
    },
  ];

  return (
    <NoPermissionAlert hasPermission={status === 403 ? false : true}>
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
        title="Purchase Orders  "
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={createGrn ? GRNForm : PurchaseOrderForm}
        modalWidth={60}
        createGrnWithPO={createGrn}
        totalRows={paginationData?.count}
        // expandHandleKey="products"
        // expandParams={{loading}}
        // ExpandBody={ProductTable}
        // csvdata={csvData}
        // downloadLink={`${DEFAULT_BASE_URL}grn-download/`}

        // csvname={`GRNs${  searchVal  } .csv`}
      />
    </NoPermissionAlert>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(KitEmployeeScreen);
