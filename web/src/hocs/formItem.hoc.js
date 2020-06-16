import React from 'react';
import { Form, Input, Upload, Select, Radio, DatePicker, Checkbox } from 'antd';
import { Icon } from '@ant-design/compatible';
import { FORM_ELEMENT_TYPES } from 'constants/formFields.constant';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

export const formItem = (key, rules, kwargs, type, others, customLabel, noLabel) => {
  let formOptions = {};
  if (others) {
    if (others.formOptions) {
      formOptions = others.formOptions;
    }
  }
  switch (type) {
    case FORM_ELEMENT_TYPES.INPUT:
      return (
        <Form.Item
          key={key}
          label={noLabel ? null : customLabel || key.charAt(0).toUpperCase() + key.slice(1)}
          name={key}
          rules={rules}
          {...formOptions}>
          <Input {...kwargs} />
        </Form.Item>
      );

    case FORM_ELEMENT_TYPES.FILE_DRAG_DROP:
      return (
        <Form.Item
          key={key}
          label={noLabel ? null : customLabel || key.charAt(0).toUpperCase() + key.slice(1)}
          name={key}
          rules={rules}
          {...formOptions}>
          <Upload.Dragger {...kwargs}>
            <p className='ant-upload-drag-icon'>
              <Icon type='inbox' />
            </p>
            <p className='ant-upload-text p-1'>{others.p1}</p>
            <p className='ant-upload-hint p-1'>{others.p2}</p>
          </Upload.Dragger>
        </Form.Item>
      );

    case FORM_ELEMENT_TYPES.SELECT:
      return (
        <Form.Item
          key={key}
          label={noLabel ? null : customLabel || key.charAt(0).toUpperCase() + key.slice(1)}
          name={key}
          rules={rules}
          {...formOptions}>
          <Select {...kwargs}>
            {others.selectOptions.map((item, index) => (
              <Option
                key={index.toString()}
                value={others.valueIndex ? index : item.value || item[others.key] || item}>
                {others.customTitle ? (
                  <text style={{ fontSize: 13, fontWeight: 'bold' }}>{item[others.customTitle]}</text>
                ) : (
                  item.label || item[others.key] || item
                )}
                {others.dataKeys ? (
                  <div className='row' style={{ flexWrap: 'wrap' }}>
                    {others.dataKeys.map((i) => (
                      <text style={{ fontSize: 11, marginLeft: 5, marginRight: 5 }}>{item[i]}</text>
                    ))}
                  </div>
                ) : null}
              </Option>
            ))}
          </Select>
        </Form.Item>
      );

    case FORM_ELEMENT_TYPES.RADIO:
      return (
        <Form.Item
          key={key}
          label={noLabel ? null : customLabel || key.charAt(0).toUpperCase() + key.slice(1)}
          name={key}
          rules={rules}
          {...formOptions}>
          <Radio.Group value='Ggg'>
            {others.radioOptions.map((item) => (
              <Radio key={item.value} value={item.value}>
                {item.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      );

    case FORM_ELEMENT_TYPES.DATE:
      return (
        <Form.Item
          key={key}
          {...formOptions}
          label={noLabel ? null : customLabel || key.charAt(0).toUpperCase() + key.slice(1)}
          name={key}
          rules={rules}>
          <DatePicker />
        </Form.Item>
      );
    case FORM_ELEMENT_TYPES.MULTIPLE_CHECKBOX:
      return (
        <Form.Item
          key={key}
          label={noLabel ? null : customLabel || key.charAt(0).toUpperCase() + key.slice(1)}
          name={key}
          rules={rules}
          {...formOptions}>
          <CheckboxGroup onChange={others.onChange}>
            {others.checkOptions.map((i) => (
              <Checkbox value={i.value}>{i.label}</Checkbox>
            ))}
          </CheckboxGroup>
        </Form.Item>
      );
    default:
      return null;
  }
};
