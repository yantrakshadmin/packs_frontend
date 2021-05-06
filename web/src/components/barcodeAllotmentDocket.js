import React, {useState, useEffect, useCallback} from 'react';
import {Row, Col, Input, Typography, notification, Table, Tag, Button, Spin} from 'antd';
import {loadAPI} from 'common/helpers/api';
import {postAltBarcodes, patchAltBarcodes} from 'common/api/auth';
import {useAPI} from 'common/hooks/api';
import _ from 'lodash';

const {Title} = Typography;

const tableFields = [
  {
    title: 'Product Name',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Scanned Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Alloted Quantity',
    dataIndex: 'total_limit',
    key: 'total_limit',
  },
];

export const BarcodeAllotmentDocket = ({transaction, allot, setVisible}) => {
  const [editId, setEditId] = useState(null);

  const [barcodes, setBarcodes] = useState([]);

  const [productDetails, setProductDetails] = useState({});

  const {data: fetchedBarcodes, error: altError, loading: altLoading} = useAPI(
    `dispatch-allotment-fetch/?allot=${allot}`,
  );

  const {data: limitsData, error: limError, loading: limLoading} = useAPI(
    `dispatch-allotment-validate/?id=${allot}`,
  );

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!altLoading && !limLoading && fetchedBarcodes && limitsData) {
      setEditId(fetchedBarcodes.id);

      const {bar_details} = fetchedBarcodes;
      const tempA = fetchedBarcodes.barcodes.map((b, idx) => ({
        barcode: b,
        name: bar_details[idx],
      }));
      setBarcodes(tempA);

      const tempB = {};
      Object.keys(limitsData).forEach((ld) => {
        tempB[ld] = 0;
      });

      bar_details.forEach((bd, idx) => {
        tempB[bd] = tempB[bd] + 1;
      });

      setProductDetails(tempB);
    } else if (!altLoading && !limLoading && limitsData) {
      const tempB = {};
      Object.keys(limitsData).forEach((ld) => {
        tempB[ld] = 0;
      });
      setProductDetails(tempB);
    }
  }, [altLoading, limLoading]);

  const addItem = useCallback(
    async (value) => {
      const filtered = barcodes.filter((i) => i.barcode === (value || inputValue));
      const {data} = await loadAPI(`check-bar/?code=${value || inputValue}`);

      if (filtered.length === 0 && !!data) {
        const shouldAdd =
          limitsData[data.name] >= 1 + (productDetails[data.name] ? productDetails[data.name] : 0);
        if (shouldAdd) {
          setBarcodes([...barcodes, {barcode: value || inputValue, name: data.name}]);
          setProductDetails({
            ...productDetails,
            [data.name]: (productDetails[data.name] ? productDetails[data.name] : 0) + 1,
          });
        } else {
          notification.warning({
            message: `Limit Exceed`,
            description: `Sorry! No More ${data.name} can be added`,
          });
        }
      } else {
        notification.warning({
          message: 'Barcode Already Exist or Invalid',
          description: 'The item you are trying to add is already exist or it is invalid',
        });
      }
      setInputValue('');
    },
    [barcodes, inputValue, limitsData, productDetails],
  );

  const onChange = useCallback(
    (e) => {
      const {value} = e.target;
      setInputValue(value);
    },
    [inputValue],
  );

  const getTableArray = useCallback(() => {
    const newArr = [];
    Object.keys(productDetails).map((key) =>
      newArr.push({
        product: key,
        quantity: productDetails[key],
        total_limit: limitsData[key],
      }),
    );
    return newArr;
  }, [productDetails]);

  const removeItem = useCallback(
    (value, name) => {
      if (barcodes.length) {
        setBarcodes([...barcodes.filter((i) => i.barcode !== value)]);
        if (productDetails[name] <= 1) {
          setProductDetails({...productDetails, [name]: 0});
        } else {
          setProductDetails({...productDetails, [name]: productDetails[name] - 1});
        }
      }
    },
    [barcodes, productDetails],
  );

  const getReqBarcodeArray = useCallback(() => {
    return barcodes.map((i) => i.barcode);
  }, [barcodes]);

  const reqSubmit = useCallback(async () => {
    let allotSum = 0;
    let limitSum = 0;

    getTableArray().forEach((i) => {
      allotSum = allotSum + i.quantity;
    });

    _.values(limitsData).forEach((i) => {
      limitSum = limitSum + i;
    });

    const status = allotSum === limitSum ? 'complete' : 'incomplete';

    if (editId) {
      var {error} = await patchAltBarcodes(
        {
          barcodes: getReqBarcodeArray(),
          status,
          transaction,
          allot,
        },
        editId,
      );
    } else {
      var {error} = await postAltBarcodes({
        barcodes: getReqBarcodeArray(),
        status,
        transaction,
        allot,
      });
    }

    if (error !== undefined) {
      notification.warning({
        message: 'Unknown Error in Submission.',
      });
    } else {
      notification.success({
        message: 'Successfully Submitted.',
      });
      setVisible(false);
    }
  }, [editId, getTableArray]);

  return (
    <Spin spinning={altLoading}>
      <Row align="middle">
        <Col span={6}>
          <Input
            value={inputValue}
            onChange={onChange}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                addItem();
              }
            }}
            placeholder="Enter Barcode"
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={10}>
          <Title level={4}>Barcode Details</Title>
        </Col>
        <Col span={10}>
          <Title level={4}>Product Details</Title>
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <div className={barcodes.length > 0 ? 'barcode-tag-container' : null}>
            {barcodes.length > 0
              ? barcodes.map((item, index) => (
                  <Col className="my-1" span={23} key={index.toString()}>
                    <Tag
                      closable
                      onClose={(e) => {
                        e.preventDefault();
                        removeItem(item.barcode, item.name);
                      }}>
                      {item.barcode}
                    </Tag>
                    <text>{item.name}</text>
                  </Col>
                ))
              : null}
          </div>
        </Col>
        <Col span={14} className="row justify-between h-100">
          {Object.keys(productDetails).length > 0 ? (
            <Table bordered size="small" dataSource={getTableArray()} columns={tableFields} />
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            type="primary"
            disabled={Object.keys(productDetails).length === 0}
            onClick={reqSubmit}>
            Dispatch
          </Button>
        </Col>
      </Row>
    </Spin>
  );
};
