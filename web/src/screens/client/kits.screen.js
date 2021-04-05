import React, {useState, useEffect} from 'react';
import kitsColumns from 'common/columns/Kits.column';
import {Input} from 'antd';
import {retrieveKitsClients} from 'common/api/auth';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import ExpandTable from '../../components/KitExpandTable';

const {Search} = Input;

const KitsScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  //const [csvData, setCsvData] = useState(null);

  const {filteredData, loading, reload} = useTableSearch({
    searchVal,
    retrieve: retrieveKitsClients,
  });

  // useEffect(() => {
  //   if (filteredData) {
  //     const csvd = [];
  //     filteredData.forEach((d) => {
  //       const temp = {...d};
  //       delete temp.products;
  //       delete temp.owner;
  //       csvd.push(temp);
  //       d.products.forEach((prod) => {
  //         csvd.push({
  //           ShortCode: prod.product.short_code,
  //           Name: prod.product.name,
  //           Quantity: prod.quantity,
  //           Category: prod.product.category,
  //           PricePerUnit: prod.product.priceperunit,
  //         });
  //       });
  //     });
  //     setCsvData(csvd);
  //   }
  // }, [filteredData]);

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
        title="Kits"
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalWidth={45}
        //expandHandleKey='products'
        //expandParams={{ loading }}
        ExpandBody={ExpandTable}
        //csvdata={csvData}
        //csvname={`Kits${searchVal}.csv`}
        hideRightButton
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(KitsScreen);
