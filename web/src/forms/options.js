import React, {useState, useEffect} from 'react';
import {Select} from 'antd';
import {connect} from 'react-redux';
import {fetchProductsAsync} from 'common/actions/fetchData';

const {Option} = Select;

const Options = ({value, products, fetchProductsAsync}) => {
  const [filteredData, setFilteredData] = useState([]);

  const filterData = (value) => {
    const {products} = this.props;
    const filData = products.filter((prod) => {
      return prod.name.includes(value);
    });
    // console.log(filData);
    setFilteredData(filData);
  };

  useEffect(() => {
    fetchProductsAsync();
  }, []);

  useEffect(() => {
    filterData();
    console.log('filter');
  }, [value]);

  const others = {
    selectOptions: products || [],
    key: 'id',
    dataKeys: ['short_code', 'description', 'category'],
    customTitle: 'name',
    // formOptions: {
    //   ...field,
    //   name: [field.name, item.key],
    //   fieldKey: [field.fieldKey, item.key],
    // },
  };

  return filteredData.map((item, index) => (
    <Option value={item.value || item[others.key] || item}>
      {others.customTitle ? (
        <text style={{fontSize: 13, fontWeight: 'bold'}}>{item[others.customTitle]}</text>
      ) : (
        item.label || item[others.key] || item
      )}
      {others.dataKeys ? (
        <div className="row" style={{flexWrap: 'wrap'}}>
          {others.dataKeys.map((i) => (
            <text style={{fontSize: 11, marginLeft: 5, marginRight: 5}}>{item[i]}</text>
          ))}
        </div>
      ) : null}
    </Option>
  ));
};

const mapStateToProps = (state) => {
  return {products: state.data.products || []};
};

export default connect(mapStateToProps, {fetchProductsAsync})(Options);
