import React,{ useState } from 'react';
import { Row,Col,Input,Typography,notification,Switch,Tag } from 'antd';
import { useAPI } from 'common/hooks/api';
import { loadAPI } from 'common/helpers/api';

const { Title } = Typography;



export const BarcodeAllotmentDocket = () =>{
  const [barcodes,setBarcodes] = useState([]);
  const [productDetails,setProductDetails] = useState({
  });
  const [inputValue,setInputValue] = useState('')
  const [useScanner,setUseScanner] = useState(true)

  const addItem= async (value)=>{
    const filtered = barcodes.filter((i)=>(i.barcode === (value || inputValue)));
    const { data ,error } = await loadAPI(`check-bar/?code=${value || inputValue}`);
    console.log('da',data);
    if(filtered.length===0 && data === 0){
      setBarcodes([...barcodes,{ barcode:value || inputValue,name:data }])
      setProductDetails({ ...productDetails,
        [data]:((productDetails[data]?productDetails[data]:0)+1) })
    }
    else{
      notification.warning({
        message: 'Barcode Already Exist',
        description:
                  'The item you are trying to add is already',
      });
    }
    setInputValue('');
  }

  const onChange =async e => {
    const { value } = e.target;
    setInputValue(value);
    if(useScanner){
      addItem(value);
    }
  };
  const removeItem=(value,name)=>{
    if(barcodes.length){
      setBarcodes([...barcodes.filter(i=>(i.barcode !== value))])
      if(productDetails[name] === 1){
        delete productDetails[name];
      }else{
        setProductDetails({ ...productDetails,[name]:productDetails[name]-1 })
      }
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
        <Col span={4}>
          <div className='mx-2'>
            <Switch
              checkedChildren='Scanner'
              unCheckedChildren='Manual'
              value={useScanner}
              defaultChecked
              onChange={()=>{setUseScanner(!useScanner)}}
            />
          </div>
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
          {Object.keys(productDetails).length > 0?Object.keys(productDetails).map((item,index)=>(
            <Col span={24} className='my-2'>
              <text>
                {item}
                {' '}
                *
                {' '}
              </text>
              <text>
                {productDetails[item]}
              </text>
            </Col>
          )):null}
        </Col>
      </Row>
    </div>
  )
}
