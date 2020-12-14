import React, { useState, useEffect } from 'react';
import kitsColumns from 'common/columns/Kits.column';
import { Popconfirm, Button, Input } from 'antd';
import { deleteKit, retrieveKits } from 'common/api/auth';
import { connect } from 'react-redux';
import { useTableSearch } from 'hooks/useTableSearch';
import { KitForm } from '../../forms/createKit.form';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import ProductTable from '../../components/ProductsTable';
import { deleteHOC } from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';
import { GetUniqueValueNested } from 'common/helpers/getUniqueValues';

const { Search } = Input;

const KitEmployeeScreen = ({ currentPage }) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [csvData, setCsvData] = useState(null);

  const { filteredData, loading, reload } = useTableSearch({ searchVal, retrieve: retrieveKits });

  useEffect(() => {
    if (filteredData) {
      const csvd = [];
      filteredData.forEach((d) => {
        const temp = { ...d, 'kit_client': d.kit_client.client_name };
        delete temp.products;
        delete temp.owner;
        csvd.push(temp);
        d.products.forEach((prod) => {
          csvd.push({
            ShortCode: prod.product.short_code,
            Name: prod.product.name,
            Quantity: prod.quantity,
            Category: prod.product.category,
            PricePerUnit: prod.product.priceperunit,
          });
        });
      });
      setCsvData(csvd);
    }
  }, [filteredData]);

  const cancelEditing = () => {
    setEditingId(null);
  };

  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
    },
    ...kitsColumns,
    {
      title: 'Components Per Kit',
      key: 'components_per_kit',
      dataIndex: 'components_per_kit',
      sorter: (a, b) => a.components_per_kit - b.components_per_kit,
    },
    {
      title: 'Kit Client',
      key: 'kit_client',
      filters: GetUniqueValueNested(filteredData || [],'kit_client','client_name'),
      onFilter: (value, record) => record.kit_client.client_name === value,
      render: (text, record) => record.kit_client.client_name,
    },
    {
      title: 'Action',
      key: 'operation',
      width: '7vw',
      render: (text, record) => (
        <div className='row justify-evenly'>
          <Button
            // disabled
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
            // disabled
            title='Confirm Delete'
            onCancel={(e) => e.stopPropagation()}
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteKit,
              success: 'Deleted kit successfully',
              failure: 'Error in deleting kit',
            })}>
            <Button
              // disabled
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
      name: 'All Kits',
      key: 'allKits',
      data: filteredData,
      columns,
      loading,
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ width: '15vw', display: 'flex', alignItems: 'flex-end' }}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder='Search' enterButton />
        </div>
      </div>
      <br />
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size='middle'
        title='Kits'
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={KitForm}
        modalWidth={45}
        expandHandleKey='products'
        expandParams={{ loading }}
        ExpandBody={ProductTable}
        csvdata={csvData}
        csvname={`Kits${  searchVal  }.csv`}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(KitEmployeeScreen);
