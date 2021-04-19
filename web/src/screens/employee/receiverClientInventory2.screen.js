import React, {useState, useCallback} from 'react';
import {useAPI} from 'common/hooks/api';
import {Button, Col, Form, Input, Popconfirm, Row} from 'antd';
import formItem from 'hocs/formItem.hoc';
import {FORM_ELEMENT_TYPES} from 'constants/formFields.constant';
import {MasterHOC} from 'hocs/Master.hoc';
import {createRC2TestInv, deleteRC2TestInv, retrieveRC2TestInv} from 'common/api/auth';
import {loadAPI} from 'common/helpers/api';
import {TestSC2InventoryDetailColumn} from 'common/columns/testInventoryDetail.column';
import {useHandleForm} from '../../hooks/form';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import {useTableSearch} from '../../hooks/useTableSearch';
import {CSVLink} from 'react-csv';
import {ifNotStrReturnA} from 'common/helpers/mrHelper';
import {GetUniqueValueNested} from 'common/helpers/getUniqueValues';

const {Search} = Input;

export const TestInventoryScreen = () => {
  const {data: products} = useAPI('/products/', {});
  const {data: rClients} = useAPI('/receiverclients/', {});
  const [details, setDetails] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({short_code: '', client: ''});
  const [searchVal, setSearchVal] = useState(null);

  const {filteredData: invData, loading: invLoading, reload} = useTableSearch({
    searchVal,
    retrieve: retrieveRC2TestInv,
  });

  const generateCSVData = useCallback(() => {
    if (!invLoading) {
      const temp = invData.map((i) => {
        return {
          client: i.client.name,
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
        <CSVLink filename={'rc-inventory.csv'} data={t.data} headers={t.headers}>
          Download CSV
        </CSVLink>
      </Button>
    );
  }, [invData, generateCSVData]);

  console.log(invData, 'Ggg');
  const {form, submit, loading} = useHandleForm({
    create: createRC2TestInv,
    success: 'Inventory created/edited successfully.',
    failure: 'Error in creating/editing Inventory.',
    done: () => {
      form.setFieldsValue({
        client: null,
        product: null,
        quantity: null,
      });
      reload();
    },
    close: () => null,
  });

  const column = [
    {
      title: 'Receiver Client',
      key: 'client',
      dataIndex: 'client',
      render: (text, record) => record.client.name,
      filters: GetUniqueValueNested(invData || [], 'client', 'name'),
      onFilter: (value, record) => record.client.name === value,
    },
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
                client: record.client.name,
              });
              setDetailsLoading(true);
              const {data} = await loadAPI(
                `/rc-ledger-items/?id=${
                  record.product.short_code
                }&cname=${record.client.name.replaceAll('&', '%26')}`,
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
              api: deleteRC2TestInv,
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
      {/* <Form onFinish={submit} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row align="middle" gutter={10}>
          <Col span={8}>
            {formItem({
              key: 'client',
              kwargs: {
                placeholder: 'Select',
                showSearch: true,
                filterOption: (input, option) =>
                  option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
              },
              others: {
                selectOptions: rClients || [],
                key: 'id',
                dataKeys: ['city'],
                customTitle: 'name',
              },
              type: FORM_ELEMENT_TYPES.SELECT,
              customLabel: 'Receiver Client',
            })}
          </Col>
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
          <Col span={4}>
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
      </Form> */}

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
            loading={loading || invLoading}
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
export default TestInventoryScreen;
