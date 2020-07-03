import React, {useState, useEffect} from 'react';
import {GRNForm} from '../../forms/GRN.form';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import GRNColumns from 'common/columns/GRN.column';
import {ProductTable} from '../../components/GRNProductsTable';
import {Popconfirm, Button, Input} from 'antd';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {useAPI} from 'common/hooks/api';

const {Search} = Input;

const KitEmployeeScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [reqData, setReqData] = useState(null);

  const {data: grns, loading} = useAPI('/grns/', {});

  const {filteredData, reload} = useTableSearch({
    searchVal,
    reqData: reqData,
  });

  useEffect(() => {
    if (grns) {
      const fetchData = async () => {
        const newData = grns.map((grn) => ({
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
  }, [grns]);

  const cancelEditing = () => {
    setEditingId(null);
  };

  const columns = [
    ...GRNColumns,
    {
      title: 'Action',
      key: 'operation',
      width: '7vw',
      render: (text, record) => (
        <div className="row justify-evenly">
          <a href={record.document}>
            <Button>View Document</Button>
          </a>
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
        title="GRNs"
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={GRNForm}
        modalWidth={45}
        expandHandleKey="products"
        expandParams={{loading}}
        ExpandBody={ProductTable}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(KitEmployeeScreen);
