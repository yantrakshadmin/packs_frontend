import React, {useState, useCallback} from 'react';
import {useAPI} from 'common/hooks/api';
import {Button, Col, Form, Input, Popconfirm, Row} from 'antd';
import formItem from 'hocs/formItem.hoc';
import {FORM_ELEMENT_TYPES} from 'constants/formFields.constant';
import {MasterHOC} from 'hocs/Master.hoc';
import {createTestInv, deleteTestInv, retrieveTestInv} from 'common/api/auth';
import {loadAPI} from 'common/helpers/api';
import {TestInventoryDetailColumn} from 'common/columns/testInventoryDetail.column';
import {useHandleForm} from '../../hooks/form';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import {useTableSearch} from '../../hooks/useTableSearch';
import {CSVLink} from 'react-csv';

const {Search} = Input;

export const TestInventoryScreen = () => {
  const {data: products} = useAPI('/products/', {});
  const [details, setDetails] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [searchVal, setSearchVal] = useState(null);

  const {filteredData: invData, loading: invLoading, reload} = useTableSearch({
    searchVal,
    retrieve: retrieveTestInv,
  });

  const generateCSVData = useCallback(() => {
    if (!invLoading) {
      const temp = invData.map((i) => {
        return {
          quantity: i.quantity,
          product: i.product.short_code,
          product_info: i.product.description || '-',
        };
      });
      return {
        headers: [
          {label: 'Product', key: 'product'},
          {label: 'Product Info', key: 'product_info'},
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
        <CSVLink filename={'warehouse-inventory.csv'} data={t.data} headers={t.headers}>
          Download CSV
        </CSVLink>
      </Button>
    );
  }, [invData, generateCSVData]);

  console.log(invData, 'Ggg');
  const {form, submit, loading} = useHandleForm({
    create: createTestInv,
    success: 'Inventory created/edited successfully.',
    failure: 'Error in creating/editing Inventory.',
    done: () => {
      reload();
    },
    close: () => null,
  });

  const column = [
    {
      title: 'Product',
      key: 'product',
      dataIndex: 'product',
      render: (product) => <div>{product.short_code}</div>,
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Product Info',
      key: 'product_info',
      dataIndex: 'product',
      render: (product) => <div>{product.description}</div>,
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
              setSelectedProduct(record.product.short_code);
              setDetailsLoading(true);
              const {data} = await loadAPI(`/ledger-items/?id=${record.product.short_code}`, {
                method: 'GET',
              });
              setDetails(data);
              setDetailsLoading(false);
              e.stopPropagation();
            }}>
            Details
          </Button>
          <Popconfirm
            title="Confirm Delete"
            onCancel={(e) => e.stopPropagation()}
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteTestInv,
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
          </Popconfirm>
        </div>
      ),
    },
  ];
  const columnDetails = [
    {
      title: 'Transaction No',
      key: 'transaction_no',
      dataIndex: 'transaction_no',
    },
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'date',
      render: (date) => <div>{date.slice(0, 10)}</div>,
    },
    ...TestInventoryDetailColumn,
  ];
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div style={{width: '15vw', display: 'flex', alignItems: 'flex-end'}}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder="Search" enterButton />
        </div>
      </div>
      <Form onFinish={submit} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row align="middle" gutter={32}>
          <Col span={8}>
            {formItem({
              key: 'product',
              kwargs: {
                placeholder: 'Select',
                showSearch: true,
                filterOption: (input, option) =>
                  option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
              },
              others: {
                selectOptions: products || [],
                key: 'id',
                dataKeys: ['name', 'description', 'category'],
                customTitle: 'short_code',
              },
              type: FORM_ELEMENT_TYPES.SELECT,
              customLabel: 'Product',
            })}
          </Col>
          <Col span={8}>
            {formItem({
              key: 'quantity',
              kwargs: {
                placeholder: 'Quantity',
              },
              type: FORM_ELEMENT_TYPES.INPUT,
              customLabel: 'Quantity',
            })}
          </Col>
          <Col span={4}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>

      <Row gutter={32}>
        <Col lg={12}>
          <MasterHOC
            refresh={reload}
            size="small"
            data={invData}
            columns={column}
            title="Inventory"
            ExtraButtonNextToTitle={DownloadCSVButton}
            hideRightButton
            loading={loading || invLoading}
          />
        </Col>
        <Col lg={12}>
          <MasterHOC
            size="small"
            data={details}
            title={`${selectedProduct} Details`}
            hideRightButton
            loading={detailsLoading}
            columns={columnDetails}
          />
        </Col>
      </Row>
    </div>
  );
};
export default TestInventoryScreen;
