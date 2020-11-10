import React,{ useState } from 'react';
import { Form, Col, Row, Button, Divider, Spin, message } from 'antd';
import { useHandleForm } from 'hooks/form';
import { createVendor, editVendor, leadFileUpload, retrieveVendor } from 'common/api/auth';
import formItem from '../hocs/formItem.hoc';
import { FORM_ELEMENT_TYPES } from '../constants/formFields.constant';

const item = {
  key: 'document',
  rules: [{ required: true, message: 'File is Required!' }],
  type: FORM_ELEMENT_TYPES.FILE_DRAG_DROP,
  others: null,
  customLabel: 'Upload Your File',
};

export const UploadLeadForm = ({ id, onCancel,lead, onDone }) => {
  const [reqFile, setFile] = useState(null);

  const { form, submit, loading } = useHandleForm({
    create: async (data)=>{
      const response = await leadFileUpload({ ...data,load_no:lead });
      console.log(response,'data : ',data)},
    edit: ()=>{},
    retrieve: ()=>{},
    success: 'Uploaded successfully.',
    failure: 'Error in Uploading.',
    done: onDone,
    close: onCancel,
    id,
  });

  function toFormData(obj, form, namespace) {
    const fd = form || new FormData();
    let formKey;
    for (const property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          formKey = `${namespace  }[${  property  }]`;
        } else {
          formKey = property;
        }
        // nested
        if (property === 'items') fd.append('items', JSON.stringify(obj.items));
        // if the property is an object, but not a File, use recursivity.
        else if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        } else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          toFormData(obj[property], fd, formKey);
        } else {
          // if it's a string or a File object
          fd.append(formKey, obj[property]);
        }
      }
    }
    return fd;
  }

  const preProcess = (data) => {
    submit(data);
  };

  return (
    <Spin spinning={loading}>
      <Divider orientation='left'>Upload</Divider>
      <Form
        onFinish={preProcess}
        form={form}
        layout='vertical'
        hideRequiredMark
        autoComplete='off'>
        <Row>
          <Col span={24}>
            {formItem({
              ...item,
              kwargs: {
                multiple:false,
                onChange(info) {
                  const { status } = info.file;
                  if (status === 'done') {
                    setFile(info.file);
                    message.success(`${info.file.name} file uploaded successfully.`);
                  } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                  }
                },
              },
            })}
          </Col>
        </Row>
        <Row>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
          <div className='p-2' />
          <Button type='primary' onClick={onCancel}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};
