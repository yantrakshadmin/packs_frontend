import React,{useState} from 'react';
import {Row,Col,Input,Button,Typography,notification} from 'antd';

const {Title} = Typography;

export const BarcodeAllotmentDocket = () =>{
    const [barcodes,setBarcodes] = useState([]);
    const [inputValue,setInputValue] = useState('')

    
    const addItem=()=>{
        const filtered = barcodes.filter((i)=>(i.barcode === inputValue));
        if(filtered.length==0){
            setBarcodes([...barcodes,{barcode:inputValue,name:'Kuch hai'}])
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

    const onChange = e => {
        const { value } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
          setInputValue(value);
        }
      };
    
      // '.' at the end or only '-' in the input box.
      const onBlur = (e) => {
        const { value } = e.target;
        let valueTemp = value;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
          valueTemp = value.slice(0, -1);
        }
        setInputValue(valueTemp.replace(/0*(\d+)/, '$1'));
        
      };
    const removeItem=(value)=>{
        if(barcodes.length){
            setBarcodes([...barcodes.filter(i=>(i.barcode !== value))])
        }      
       
    
    }
    return (
    <div>
        <Row>
            <Col span={6}>
                <Input
                    value={inputValue}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Enter Barcode"
                 />
            </Col>
            <Col span={4}>
                <Button type='primary' onClick={addItem}>
                     Submit
                </Button>
            </Col>
        </Row>
        <br/>
        <Row >
            <Col span={10}>
                <Title level={4}>
                    Barcode
                </Title>
            </Col>
            <Col span={10}>
                <Title level={4}>
                    Product Name
                </Title>
            </Col>
            <Col span={4}>
                <Title level={4}>
                  Action
                </Title>
            </Col>
        </Row>
        {barcodes.length > 0?barcodes.map((item,index)=>(
            <Row key={index.toString()}>
               <Col span={10}>
                    <text>
                        {item.barcode}
                    </text>
                </Col>
                <Col span={10}>
                    <text>
                        {item.name}
                    </text>
                </Col>
                <Col span={4}>
                   <Button type={'primary m-2'} onClick={()=>removeItem(item.barcode)}>
                       Delete
                   </Button>
                </Col>
            </Row>
        )):null}
    </div>)
}