import React, {useState, useCallback} from 'react';
import {Row, Col, Form, Button} from 'antd';
import {connect} from 'react-redux';
import {useAPI} from 'common/hooks/api';
import {getReformattedData} from 'common/helpers/inventory';
import {transitInventoryColumn} from 'common/columns/transitInventory.column';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import formItem from '../../hocs/formItem.hoc';
import {FORM_ELEMENT_TYPES} from '../../constants/formFields.constant';
import {CSVLink} from 'react-csv';

const TransitInventoryScreen = ({currentPage}) => {
  const [cid, setCid] = useState(null);

  const {data: clients} = useAPI('/clients/', {});

  const {data: clientInv, loading, reload} = useAPI(`/client-inv/?id=${cid}`, {
    method: 'GET',
    secure: true,
  });

  console.log(clientInv, 'Client');

  const tabs = [
    {
      name: 'Sender Client',
      key: 'clientInventory',
      data: getReformattedData(clientInv),
      columns: transitInventoryColumn,
      loading,
    },
  ];
  const [form] = Form.useForm();
  const onSubmit = async (data) => {
    setCid(data.cid);
  };

  const generateCSVData = useCallback(() => {
    if (clientInv) {
      const temp = getReformattedData(clientInv).map((i) => {
        console.log(i);
        return {
          quantity: i.quantity || '-',
          product: i.short_code || '-',
          product_info: i.description || '-',
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
  }, [clientInv]);

  const DownloadCSVButton = useCallback(() => {
    const t = generateCSVData();
    return (
      <Button disabled={clientInv ? false : true}>
        <CSVLink filename={'sender-client-inventory.csv'} data={t.data} headers={t.headers}>
          Download CSV
        </CSVLink>
      </Button>
    );
  }, [clientInv, generateCSVData]);

  return (
    <>
      <Form onFinish={onSubmit} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row align="middle" gutter={32}>
          <Col span={8}>
            {formItem({
              key: 'cid',
              kwargs: {
                placeholder: 'Select',
                showSearch: true,
                filterOption: (input, option) =>
                  option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
              },
              others: {
                selectOptions: clients || [],
                key: 'user',
                customTitle: 'client_name',
                dataKeys: ['client_shipping_address'],
              },
              type: FORM_ELEMENT_TYPES.SELECT,
              customLabel: 'Client',
            })}
          </Col>
          <Col span={4}>
            <Button type="primary" htmlType="submit">
              Get Inventory
            </Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col span={12}>
          <TableWithTabHOC
            refresh={reload}
            ExtraButtonNextToTitle={DownloadCSVButton}
            tabs={tabs}
            size="small"
            title="Sender Client"
            hideRightButton
          />
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(TransitInventoryScreen);
