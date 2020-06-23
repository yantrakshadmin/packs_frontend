import React from 'react';
import {Form, Input, Upload, Select, Radio, DatePicker, Checkbox, InputNumber, message} from 'antd';
import SelectOptions from '../forms/selectOptions';
import {Icon} from '@ant-design/compatible';
import {FORM_ELEMENT_TYPES} from 'constants/formFields.constant';
// import {useState, useEffect} from 'react';

const {Option} = Select;
const CheckboxGroup = Checkbox.Group;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const {status} = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const FormItem = ({key, rules, kwargs, type, others, customLabel, noLabel}) => {
  let uppercase = false;
  if (others)
    if (others.uppercase) uppercase = true;
    else uppercase = false;

  let formOptions = {};
  if (others) {
    if (others.formOptions) {
      formOptions = others.formOptions;
    }
  }

  switch (type) {
    case FORM_ELEMENT_TYPES.INPUT: {
      console.log('again');

      return (
        <Form.Item
          key={key}
          label={noLabel ? null : customLabel || key.charAt(0).toUpperCase() + key.slice(1)}
          name={key}
          rules={rules}
          {...formOptions}>
          {uppercase ? <Input {...kwargs} size="middle" /> : <Input {...kwargs} size="middle" />}
        </Form.Item>
      );
    }

    case FORM_ELEMENT_TYPES.INPUT_NUMBER:
      return (
        <Form.Item
          key={key}
          label={noLabel ? null : customLabel || key.charAt(0).toUpperCase() + key.slice(1)}
          name={key}
          rules={rules}
          {...formOptions}>
          <InputNumber {...kwargs} size="middle" />
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
          <Upload.Dragger {...kwargs} {...props} style={{maxHeight: '70px'}}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            {others ? (
              <>
                <p className="ant-upload-text p-1">{others.p1}</p>
                <p className="ant-upload-hint p-1">{others.p2}</p>
              </>
            ) : null}
          </Upload.Dragger>
        </Form.Item>
      );

    case FORM_ELEMENT_TYPES.SELECT:
      return (
        <Form.Item
          shouldUpdate
          key={key}
          label={noLabel ? null : customLabel || key.charAt(0).toUpperCase() + key.slice(1)}
          name={key}
          rules={rules}
          {...formOptions}>
          {!kwargs.showSearch ? (
            <Select {...kwargs}>
              {others.selectOptions.map((item, index) => (
                <Option
                  key={index.toString()}
                  value={
                    others.uppercase
                      ? item[others.key].toUpperCase() ||
                        item.toUpperCase() ||
                        item.value.toUpperCase()
                      : item.value || item[others.key] || item
                  }>
                  {others.customTitle ? (
                    <text style={{fontSize: 13, fontWeight: 'bold'}}>
                      {item[others.customTitle]}
                    </text>
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
              ))}
            </Select>
          ) : (
            <SelectOptions others={others} />
          )}
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
          <Radio.Group value="Ggg">
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

export default FormItem;
