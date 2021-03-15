import React, {useState, useCallback, useEffect} from 'react';
import {Row, Col, Form, Button} from 'antd';
import {connect} from 'react-redux';
import {useAPI} from 'common/hooks/api';
import {getReformattedData, getReformattedProductInfoData} from 'common/helpers/inventory';
import {transitInventoryColumn} from 'common/columns/transitInventory.column';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import formItem from '../../hocs/formItem.hoc';
import {FORM_ELEMENT_TYPES} from '../../constants/formFields.constant';
import {CSVLink} from 'react-csv';
import _ from 'lodash';

const TransitInventoryScreen = ({currentPage}) => {
  const [cid, setCid] = useState(null);
  const [cliendInvFormatted, setCliendInvFormatted] = useState([]);
  const [productsInfo, setProductsInfo] = useState({});

  const {data: clients} = useAPI('/clients/', {});
  const {data: allKits} = useAPI('/kits/', {});

  const {data: clientInv, loading, reload} = useAPI(`/client-inv/?id=${cid}`, {
    method: 'GET',
    secure: true,
  });

  useEffect(() => {
    if (clientInv) {
      setProductsInfo({});
      setCliendInvFormatted(getReformattedData(clientInv));
    }
  }, [clientInv]);

  useEffect(() => {
    console.log(productsInfo);
  }, [productsInfo]);

  useEffect(() => {
    if (cliendInvFormatted && allKits) {
      const piTEMP = {...productsInfo};
      cliendInvFormatted.forEach((cif) => {
        const thisKitInfo = _.find(allKits, (i) => i.kit_name === cif.short_code);
        if (thisKitInfo) {
          thisKitInfo.products.forEach((p) => {
            const code = String(p.product.short_code);
            piTEMP[code] =
              (code in piTEMP ? Number(piTEMP[code]) : 0) +
              Number(p.quantity) * Number(cif.quantity);
          });
        }
      });
      setProductsInfo(piTEMP);
    }
  }, [cliendInvFormatted, allKits]);

  const tabs = [
    {
      name: 'Sender Client',
      key: 'clientInventory',
      data: cliendInvFormatted,
      columns: transitInventoryColumn,
      loading,
    },
  ];

  const productInfoTabs = [
    {
      name: 'Product Info',
      key: 'productInfo',
      data: getReformattedProductInfoData(productsInfo),
      columns: transitInventoryColumn.slice(0, 2),
      loading,
    },
  ];

  const [form] = Form.useForm();
  const onSubmit = async (data) => {
    setCid(data.cid);
  };

  const generateCSVData = useCallback(() => {
    if (clientInv) {
      const temp = cliendInvFormatted.map((i) => {
        return {
          quantity: i.quantity || 0,
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
  }, [clientInv, cliendInvFormatted]);

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
      <Row gutter={10}>
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
        <Col span={12}>
          <TableWithTabHOC
            tabs={productInfoTabs}
            size="small"
            title="Product Info"
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
