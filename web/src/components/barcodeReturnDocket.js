import React,{ useState } from 'react';
import _ from 'lodash';
import { Row,Col,Input,Typography,notification,Table,Tag,Button } from 'antd';

import { useAPI } from 'common/hooks/api';
import { loadAPI } from 'common/helpers/api';
import { postReturnBarcodes } from 'common/api/auth';

const { Title } = Typography;

export const BarcodeReturnDocket = ({ transaction,returnNo,setVisible }) =>{
  const [editId, setEditId] = useState(null);
  const [barcodes,setBarcodes] = useState([]);
  const [productDetails,setProductDetails] = useState({
  });

  // const { data:allotments ,error:altError,loading:altLoading } =
  //   useAPI(`dispatch-allotment-fetch/?return_no=${returnNo}`)
  const [inputValue,setInputValue] = useState('');
  const {data: fetchedBarcodes, error: altError, loading: altLoading} = useAPI(
    `dispatch-return-fetch/?ret=${returnNo}`,
  );

  const {data: limitsData, error: limError, loading: limLoading} = useAPI(
    `dispatch-return-validate/?id=${returnNo}`,
  );

  
  React.useEffect(() => {
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

  const addItem= async (value)=>{
    const filtered = barcodes.filter((i)=>(i.barcode === (value || inputValue)));
    const { data } = await loadAPI(`check-bar/?code=${value || inputValue}`);
    console.log(data,'))))((((');
    if (filtered.length === 0 && !!data) {
      console.log(limitsData[data.name],(productDetails[data.name] ? productDetails[data.name] : 0))
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
    // if(filtered.length===0 && data !== 0){
    //   setBarcodes([...barcodes,{ barcode:value || inputValue,name:data }])
    //   setProductDetails({ ...productDetails,
    //     [data]:((productDetails[data]?productDetails[data]:0)+1) })
    }
    else{
      notification.warning({
        message: 'Barcode Already Exist or Invalid',
        description:
          'The item you are trying to add is already exist or it is invalid',
      });
    }
    setInputValue('');
  }
  const onChange =async e => {
    const { value } = e.target;
    setInputValue(value);
  };

  const getTableArray = () =>{
    const newArr = [];
    Object.keys(productDetails).map(key=>(newArr.push({
      product: key,
      quantity: productDetails[key],
      total_limit: limitsData[key],
    })));
    return newArr;
  }

  const tableFields = [

    {
      title: 'Product Name',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Scanned Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Quantity',
      dataIndex: 'total_limit',
      key: 'total_limit',
    }
  ]

  const removeItem=(value,name)=>{
    if(barcodes.length){
      setBarcodes([...barcodes.filter(i=>(i.barcode !== value))])
      if(productDetails[name] === 1){
        setProductDetails({...productDetails, [name]: 0});
      }else{
        setProductDetails({ ...productDetails,[name]:productDetails[name]-1 })
      }
    }
  }
  const getReqBarcodeArray=()=>{
    return barcodes.map(i=>(i.barcode));
  }
  const reqSubmit = async ()=>{
    let allotSum = 0;
    let limitSum = 0;

    getTableArray().forEach((i) => {
      allotSum += i.quantity;
    });

    _.values(limitsData).forEach((i) => {
      limitSum += i;
    });

    const status = allotSum === limitSum ? 'complete' : 'incomplete';
    let error;
    if (editId) {
      const {error: newError } = await postReturnBarcodes(
        {
          barcodes: getReqBarcodeArray(),
          status,
          transaction,
          ret:returnNo,
        },
        editId,
      );
      error = newError
    } else {
      const {error: newError } = await postReturnBarcodes({
        barcodes: getReqBarcodeArray(),
        status,
        transaction,
        ret:returnNo,
      });
      error = newError
    }
    if(error !== undefined){
      notification.warning({
        message: 'Unknown Error in Submission.',
      });
    }
    else{
      notification.success({
        message: 'Successfully Submitted.',
      });
      setVisible(false);
    }
  }

  return (
    <div>
      <Row align='middle'>
        <Col span={6}>
          <Input
            value={inputValue}
            onChange={onChange}
            onKeyUp={(e)=>{
              if(e.key === 'Enter'){
                addItem();
              }
            }}
            placeholder='Enter Barcode'
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={10}>
          <Title level={4}>
            Barcode Details
          </Title>
        </Col>
        <Col span={10}>
          <Title level={4}>
            Product Details
          </Title>
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <div className={barcodes.length > 0?'barcode-tag-container':null}>
            {barcodes.length > 0?barcodes.map((item,index)=>(
              <Col className='my-1' span={23} key={index.toString()}>
                <Tag
                  closable
                  onClose={(e)=>{ e.preventDefault();removeItem(item.barcode,item.name)}}
                >
                  {item.barcode}
                </Tag>
                <text>
                  {item.name}
                </text>
              </Col>
            )):null}
          </div>
        </Col>
        <Col span={14} className='row justify-between h-100'>
          {Object.keys(productDetails).length>0?
            <Table bordered size='small' dataSource={getTableArray()} columns={tableFields} />:null}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            type='primary'
            disabled={Object.keys(productDetails).length===0}
            onClick={reqSubmit}>
            Submit
          </Button>
        </Col>
      </Row>
    </div>
  )
}
