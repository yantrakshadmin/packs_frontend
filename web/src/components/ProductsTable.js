import React from 'react';
import {Table, Row, Col} from 'antd';
// import {useAPI} from 'common/hooks/api';
import productsColumns from 'common/columns/Products.column';
import {retrieveProduct} from 'common/api/auth';
import {useEffect} from 'react';
import {useState} from 'react';

// export const ProductTable = ({products}) => {
//   const [requiredData, setRequiredData] = useState([]);

//   useEffect(() => {
//     const getData = () => {
//       let required = [];
//       console.log(products);
//       products.map(async ({product}) => {
//         const {data} = await retrieveProduct(product);
//         console.log(data);
//         required.push(data);
//       });
//       console.log(required);
//       return required;
//     };

//     const req = getData();
//     console.log(req);
//     setRequiredData(req);
//   }, [products]);

class ProductTable extends React.Component {
  state = {required: []};

  getData = (products) => {
    const reqData = [];
    products.map(async ({product}) => {
      const {data} = await retrieveProduct(product);
      console.log(data);
      reqData.push(data);
    });
    console.log(reqData);
    return reqData;
  };

  componentDidMount() {
    const {products} = this.props;
    const data = this.getData(products);
    this.setState({required: data});
  }

  render() {
    return (
      <Row>
        <Col span={12}>
          {/* <div className="m-2"> */}
          <Table
            size="small"
            dataSource={this.state.required}
            //   loading={loading}
            columns={productsColumns}
          />
          {/* </div> */}
        </Col>
      </Row>
    );
  }
}

export default ProductTable;
