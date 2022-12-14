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

import { deleteGRN, retrieveGRNBars, retriveGRNTable } from 'common/api/auth';
import {deleteHOC} from '../../hocs/deleteHoc';
import {ProductTable} from '../../components/GRNProductsTable';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import {GRNForm} from '../../forms/GRN.form';
import {GetUniqueValue} from 'common/helpers/getUniqueValues';
import TableWithTabHoc from '../../hocs/TableWithTab.hoc';
import {Select} from 'antd';
import DeleteWithPassword from '../../components/DeleteWithPassword';
import {DEFAULT_PASSWORD} from 'common/constants/passwords';
import NoPermissionAlert from 'components/NoPermissionAlert';
import {Popover} from 'antd';

const {Search} = Input;
const {Option} = Select;

const KitEmployeeScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [reqData, setReqData] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [barLoading, setBarLoading] = useState(false);
  const [barID, setBarID] = useState(null);
  const [pageValue, setPageValue] = useState(7);

  // const {data: grns, loading, reload, status} = useAPI('/grns/', {});

  const { filteredData, loading, reload, status, paginationData } = useTableSearch({
    retrieve: retriveGRNTable
    // searchVal,
    // reqData,
  });
  console.log({ filteredData });

  useEffect(() => {
    if (filteredData) {
      const fetchData = async () => {
        const newData = filteredData.map((grn) => ({
          id: grn.id,
          warehouse: grn.warehouse.name,
          material_vendor: grn.material_vendor.name,
          transport_vendor: grn.transport_vendor.name,
          reference_no: grn.reference_no,
          invoice_no: grn.invoice_no,
          inward_date: grn.inward_date,
          products: grn.items,
          document: grn.document,
        }));
        setReqData(newData);
      };
      fetchData();
    }
  }, [filteredData]);

  useEffect(() => {
    if (filteredData) {
      const csvd = [];
      (filteredData || []).forEach((d) => {
        const temp = {...d};
        delete temp.products;
        csvd.push(temp);
        (d.products || []).forEach((prod) => {
          csvd.push({
            ShortCode: prod.item.short_code,
            Name: prod.item.name,
            Quantity: prod.item_quantity,
            Price: prod.item_price,
          });
        });
      });
      setCsvData(csvd);
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
  };

  // 7 8 10 12 16
  const popContent = (x) => {
    return (
      <Space direction="vertical">
        <Select
          defaultValue="7"
          style={{width: 150}}
          onChange={(value) => setPageValue(parseInt(value))}>
          <Option value="4">4 X 2</Option>
          <Option value="6">6 X 2</Option>
          <Option value="7">7 X 2</Option>
          <Option value="8">8 X 2</Option>
          <Option value="10">10 X 2</Option>
        </Select>
        <a
          // href={`${DEFAULT_BASE_URL}print-barcodes/${record.id}/`}
          href={`../print-rebarcodes/${x}/${pageValue}`}
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
            {/* <Print /> */}
            Proceed
          </Button>
        </a>
      </Space>
    );
  };

  const columns = [
    {
      title: 'GRN ID',
      key: 'id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Warehouse',
      key: 'warehouse',
      dataIndex: 'warehouse',
      filters: GetUniqueValue(filteredData || [], 'warehouse'),
      onFilter: (value, record) => record.warehouse === value,
    },
    ...GRNColumns,
    {
      title: 'Action',
      key: 'operation',
      width: '7vw',
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
              <Document />
            </Button>
          </a>
          {/* <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            loading={record.id === barID ? barLoading : false}
            onClick={async (e) => {
              e.stopPropagation();
              setBarLoading(true);
              setBarID(record.id);
              const {data} = await retrieveGRNBars(record.id);
              if (data) {
                download(`${record.id}.txt`, data.join('\n \n'));
                setBarLoading(false);
              }
            }}>
            <Download />
          </Button> */}
          {/* <a
            // href={`${DEFAULT_BASE_URL}print-barcodes/${record.id}/`}
            href={`../print-rebarcodes/${record.id}`}
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
          </a> */}
          <Popover content={() => popContent(record.id)} title="Select Layout" trigger="click">
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
          </Popover>
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
          {/* <Popconfirm
            title='Confirm Delete'
            onCancel={(e) => e.stopPropagation()}
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteGRN,
              success: 'Deleted GRN successfully',
              failure: 'Error in deleting GRN',
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
          {/* <DeleteWithPassword
            password={DEFAULT_PASSWORD}
            deleteHOC={deleteHOC({
              record,
              reload,
              api: deleteGRN,
              success: 'Deleted GRN successfully',
              failure: 'Error in deleting GRN',
            })}
          /> */}
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All GRNs',
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
        title="GRNs"
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={GRNForm}
        modalWidth={60}
        // expandHandleKey="products"
        expandParams={{loading}}
        // ExpandBody={ProductTable}
        // csvdata={csvData}
        downloadLink={`${DEFAULT_BASE_URL}grn-download/`}
        totalRows={paginationData?.count}

        // csvname={`GRNs${  searchVal  } .csv`}
      />
    </NoPermissionAlert>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(KitEmployeeScreen);
