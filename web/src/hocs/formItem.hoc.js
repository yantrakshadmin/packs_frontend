import React from 'react';
import {
  Form,
  Input,
  Upload,
  Select,
  Radio,
  DatePicker,
  Checkbox,
  InputNumber,
  message,
  Switch,
} from 'antd';
import {Icon} from '@ant-design/compatible';
import {FORM_ELEMENT_TYPES} from 'constants/formFields.constant';

const {Option} = Select;
const CheckboxGroup = Checkbox.Group;

// const handleUplaod = (file) => {
//   return new Promise(async (resolve, reject) => {
//     const fileName = `nameThatIwant.type`;
//     const url = await S3Fetcher.getPresignedUrl(fileName);
//     resolve(url);
//   });

const getFinalStringForSearch = (searchKeys, customTitle, item) => {
  let s = '';
  if (item[customTitle]) s = s.concat(item[customTitle]);
  searchKeys.forEach((i) => {
    if (item[i]) {
      s = s.concat(' ');
      s = s.concat(item[i]);
    }
  });
  return s;
};

const onCustomRequest = (file) => {
  return new Promise((resolve, reject) => {
    const ajaxResponseWasFine = true;

    setTimeout(() => {
      if (ajaxResponseWasFine) {
        const reader = new FileReader();

        reader.addEventListener(
          'load',
          () => {
            resolve(reader.result);
          },
          false,
        );

        if (file) {
          reader.readAsDataURL(file);
        }
      } else {
        reject('error');
      }
    }, 1000);
  });
};

const props = {
  name: 'file',
  action: onCustomRequest,
  // onChange(info) {
  //   const {status} = info.file;
  //   if (status !== 'uploading') {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (status === 'done') {
  //     message.success(`${info.file.name} file uploaded successfully.`);
  //   } else if (status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // },
};

const FormItem = ({key, rules, kwargs, type, others, customLabel, noLabel}) => {
  let formOptions = {};
  if (others) {
    if (others.formOptions) {
      formOptions = others.formOptions;
    }
  }

  switch (type) {
    case FORM_ELEMENT_TYPES.INPUT: {
      return (
        <Form.Item
          key={key}
          label={noLabel ? null : customLabel || key.charAt(0).toUpperCase() + key.slice(1)}
          name={key}
          rules={rules}
          {...formOptions}>
          <Input size="middle" {...kwargs} />
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
          <InputNumber size="middle" {...kwargs} />
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
          <Upload.Dragger {...kwargs} {...props} style={{maxHeight: '75px', width: '150px'}}>
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
          <Select {...kwargs}>
            {others.selectOptions.map((item, index) => (
              <Option
                key={index.toString()}
                search={
                  others.searchKeys
                    ? getFinalStringForSearch(others.searchKeys, others.customTitle, item)
                    : item[others.customTitle]
                }
                value={item.value || item[others.key] || item}>
                {others.customTitle ? (
                  <text style={{fontSize: 13, fontWeight: 'bold'}}>
                    {item[others.customTitle]}
                    {others.customTitleInfo ? ` - ${item[others.customTitleInfo]}` : null}
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
          <DatePicker
            onChange={(date) => console.log(date)}
            style={others ? (others.style ? others.style : null) : null}
          />
        </Form.Item>
      );

    case FORM_ELEMENT_TYPES.MONTH_PICKER:
      return (
        <Form.Item
          key={key}
          {...formOptions}
          label={noLabel ? null : customLabel || key.charAt(0).toUpperCase() + key.slice(1)}
          name={key}
          rules={rules}>
          <DatePicker onChange={(date) => console.log(date)} picker="month" />
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
    case FORM_ELEMENT_TYPES.SWITCH:
      return (
        <Form.Item
          key={key}
          valuePropName="checked"
          {...formOptions}
          label={noLabel ? null : customLabel || key.charAt(0).toUpperCase() + key.slice(1)}
          name={key}
          rules={rules}>
          <Switch {...kwargs} />
        </Form.Item>
      );
    default:
      return null;
  }
};

export default FormItem;
