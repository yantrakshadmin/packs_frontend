import React from 'react';
// import {useState} from 'react';
import {Select} from 'antd';
import {connect} from 'react-redux';
import {fetchProductsAsync} from 'common/actions/fetchData';

const {Option} = Select;

class SelectOptions extends React.Component {
  state = {
    filteredData: [],
    value: undefined,
  };

  componentDidMount() {
    const {fetchProductsAsync} = this.props;
    fetchProductsAsync();
    const {products} = this.props;
    this.setState({filteredData: products || []});
  }

  componentDidUpdate() {
    console.log(this.state.filteredData);
  }

  filterData = (value) => {
    const {products} = this.props;
    const filData = products.filter((prod) => {
      return prod.name.includes(value);
    });
    // console.log(filData);
    this.setState({filteredData: filData});
  };

  handleSearch = (value) => {
    const {products} = this.props;
    if (value) {
      // this.setState({value});
      this.filterData(value);
      // console.log('yes');
    } else {
      console.log('empty');
      this.setState({filteredData: products});
      this.forceUpdate();
    }
  };

  handleChange = (value) => {
    // console.log(value);
    this.setState({value});
  };
  render() {
    const {others} = this.props;
    // console.log(this.state.filteredData);
    const options = this.state.filteredData.map((item, index) => {
      console.log(item);
      return (
        <Option key={index.toString()} value={item.value || item[others.key] || item}>
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
      );
    });
    return (
      <Select
        showSearch
        onSearch={this.handleSearch}
        // placeholder="Select"
        // key={this.state.filteredData.length}
        value={this.state.value}
        onChange={this.handleChange}>
        {options}
      </Select>
    );
  }
}

const mapStateToProps = (state) => {
  return {products: state.data.products || []};
};

export default connect(mapStateToProps, {fetchProductsAsync})(SelectOptions);
