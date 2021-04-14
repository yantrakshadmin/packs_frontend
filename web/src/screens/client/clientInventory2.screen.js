import React, {useState, useCallback} from 'react';
import {useAPI} from 'common/hooks/api';
import {Button, Col, Form, Input, Popconfirm, Row} from 'antd';
import {FORM_ELEMENT_TYPES} from 'constants/formFields.constant';
import {MasterHOC} from 'hocs/Master.hoc';
import {createSC2TestInv, deleteSC2TestInv, retrieveSC2TestInvClientSide} from 'common/api/auth';
import {loadAPI} from 'common/helpers/api';
import {TestSC2InventoryDetailColumn} from 'common/columns/testInventoryDetail.column';
import {useHandleForm} from '../../hooks/form';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import {useTableSearch} from '../../hooks/useTableSearch';
import {CSVLink} from 'react-csv';
import {ifNotStrReturnA} from 'common/helpers/mrHelper';
import {GetUniqueValueNested} from 'common/helpers/getUniqueValues';
import {connect} from 'react-redux';

const {Search} = Input;

export const TestInventoryScreen = ({user}) => {
  const [details, setDetails] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({short_code: '', client: ''});
  const [searchVal, setSearchVal] = useState(null);

  const {filteredData: invData, loading: invLoading, reload} = useTableSearch({
    searchVal,
    retrieve: retrieveSC2TestInvClientSide,
    retrieveParams: {id: user.id},
  });

  const generateCSVData = useCallback(() => {
    if (!invLoading) {
      const temp = invData.map((i) => {
        return {
          client: i.client.client_name,
          quantity: i.quantity,
          product: i.product.short_code,
        };
      });
      return {
        headers: [
          {label: 'Client', key: 'client'},
          {label: 'Product', key: 'product'},
          {label: 'Quantity', key: 'quantity'},
        ],
        data: temp,
      };
    }
    return {
      headers: [],
      data: [],
    };
  }, [invData, invLoading]);

  const DownloadCSVButton = useCallback(() => {
    const t = generateCSVData();
    return (
      <Button>
        <CSVLink filename={'client-inventory.csv'} data={t.data} headers={t.headers}>
          Download CSV
        </CSVLink>
      </Button>
    );
  }, [invData, generateCSVData]);

  // const {form, submit, loading} = useHandleForm({
  //   create: createSC2TestInv,
  //   success: 'Inventory created/edited successfully.',
  //   failure: 'Error in creating/editing Inventory.',
  //   done: () => {
  //     form.setFieldsValue({
  //       client: null,
  //       product: null,
  //       quantity: null,
  //     });
  //     reload();
  //   },
  //   close: () => null,
  // });

  const column = [
    // {
    //   title: 'Client',
    //   key: 'client',
    //   dataIndex: 'client',
    //   render: (text, record) => record.client.client_name,
    //   filters: GetUniqueValueNested(invData || [], 'client', 'client_name'),
    //   onFilter: (value, record) => record.client.client_name === value,
    // },
    {
      title: 'Product',
      key: 'product',
      dataIndex: 'product',
      render: (text, record) => record.product.short_code,
      sorter: (a, b) =>
        ifNotStrReturnA(a.product.short_code).localeCompare(ifNotStrReturnA(b.product.short_code)),
      showSorterTooltip: false,
    },
    {
      title: 'Product Info',
      key: 'description',
      dataIndex: 'description',
      render: (text, record) => record.product.description,
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
      showSorterTooltip: false,
    },
    {
      title: 'Action',
      key: 'operation',
      width: '9vw',
      render: (text, record) => (
        <div className="row justify-evenly">
          <Button
            type="primary"
            onClick={async (e) => {
              setSelectedProduct({
                short_code: record.product.short_code,
                client: record.client.client_name,
              });
              setDetailsLoading(true);
              const {data} = await loadAPI(
                `/sc-ledger-items/?id=${
                  record.product.short_code
                }&cname=${record.client.client_name.replaceAll('&', '%26')}`,
                {
                  method: 'GET',
                },
              );
              setDetails(data);
              setDetailsLoading(false);
              e.stopPropagation();
            }}>
            Details
          </Button>
          {/* <Popconfirm
            title="Confirm Delete"
            onCancel={(e) => e.stopPropagation()}
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteSC2TestInv,
              success: 'Deleted Inventory Successfully',
              failure: 'Error in deleting Inventory',
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

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div style={{width: '15vw', display: 'flex', alignItems: 'flex-end'}}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder="Search" enterButton />
        </div>
      </div>
      <br />
      <Row gutter={10}>
        <Col lg={12}>
          <MasterHOC
            refresh={reload}
            size="small"
            data={invData}
            columns={column}
            title="Inventory"
            ExtraButtonNextToTitle={DownloadCSVButton}
            hideRightButton
            loading={invLoading}
          />
        </Col>
        <Col lg={12}>
          <MasterHOC
            size="small"
            data={details}
            title={`${selectedProduct.short_code} - ${selectedProduct.client}`}
            hideRightButton
            loading={detailsLoading}
            columns={TestSC2InventoryDetailColumn}
          />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {user: state.user.userMeta};
};

export default connect(mapStateToProps)(TestInventoryScreen);
