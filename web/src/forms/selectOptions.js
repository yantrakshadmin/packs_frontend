import React from 'react';
import {Select} from 'antd';

const {Option} = Select;

class SelectOptions extends React.Component {
  state = {
    filteredData: [],
    value: undefined,
  };

  // componentDidMount() {
  //   const {
  //     others: {selectOptions: data},
  //   } = this.props;
  //   this.setState({filteredData: data || []});
  // }

  componentDidUpdate() {
    console.log(this.state.filteredData);
  }

  handleSearch = (value) => {
    console.log(value);
  };

  handleChange = (value) => {
    // this.setState({value});
    console.log(value);
  };
  render() {
    const {others} = this.props;
    const {
      others: {selectOptions: data},
    } = this.props;
    const options = data.map((item, index) => {
      // console.log(item);
      return (
        <Option key={index.toString()} value={item.value || item[others.key] || item}>
          {/* {others.customTitle ? (
            <text style={{fontSize: 13, fontWeight: 'bold'}}>{item[others.customTitle]}</text>
          ) : (
            item.label || item[others.key] || item
          )} */}
          {/* {others.dataKeys ? (
            <div className="row" style={{flexWrap: 'wrap'}}>
              {others.dataKeys.map((i) => (
                <text style={{fontSize: 11, marginLeft: 5, marginRight: 5}}>{item[i]}</text>
              ))}
            </div>
          ) : null} */}
          {item[others.customTitle]}
        </Option>
      );
    });
    return (
      <Select
        showSearch
        // onSearch={this.handleSearch}
        // value={this.state.value}
        optionFilterProp="children"
        // onChange={this.handleChange}
        // filterOption={(input, option) =>
        //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        // }
      >
        {options}
      </Select>
    );
  }
}

export default SelectOptions;
