import React, {useEffect, useState} from 'react';
import {Form, Col, Row, Button, Divider, Spin, message} from 'antd';
import {useHandleForm} from 'hooks/form';
import {createVendor, editVendor, leadFileUpload, retrieveVendor} from 'common/api/auth';
import formItem from '../hocs/formItem.hoc';
import {FORM_ELEMENT_TYPES} from '../constants/formFields.constant';
import {DEFAULT_BASE_URL} from 'common/constants/enviroment';
import {loadAPI} from 'common/helpers/api';

const item = {
  key: 'document',
  rules: [{required: true, message: 'File is Required!'}],
  type: FORM_ELEMENT_TYPES.FILE_DRAG_DROP,
  others: null,
  customLabel: 'Upload Your File',
};

export const UploadLeadForm = ({
  id,
  onCancel,
  lead,
  isReUpload,
  onDone,
  recreate,
  create,
  varName,
}) => {
  const [reqFile, setFile] = useState(null);

  const [newID, setNewID] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      if (isReUpload) {
        try {
          const {data: req} = await loadAPI(`${DEFAULT_BASE_URL}/tp-file/?id=${lead}`, {});
          setNewID(req[0].id);
        } catch (err) {}
      }
    };
    getInfo();
  }, [isReUpload]);

  const {form, submit, loading} = useHandleForm({
    create,
    edit: isReUpload ? recreate : () => {},
    retrieve: false,
    success: 'Uploaded successfully.',
    failure: 'Error in Uploading.',
    done: onDone,
    close: onCancel,
    id: isReUpload ? (newID ? newID : id) : id,
  });

  function toFormData(obj) {
    const FD = new FormData();
    Object.keys(obj).map((property) => {
      return FD.append(property, obj[property]);
    });
    return FD;
  }

  const preProcess = (data) => {
    if (reqFile) {
      data.document = reqFile.originFileObj;
    } else delete data.document;
    const req = toFormData({...data, [varName]: lead});
    submit(req);
  };

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Upload</Divider>
      <Form onFinish={preProcess} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row>
          <Col span={24}>
            {formItem({
              ...item,
              kwargs: {
                multiple: false,
                onChange(info) {
                  const {status} = info.file;
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
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <div className="p-2" />
          <Button type="primary" onClick={onCancel}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};
