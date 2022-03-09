import React, {useCallback, useEffect, useState} from 'react';
import {Form, Col, Row, Button, Divider, Spin, message} from 'antd';
import {useHandleForm} from 'hooks/form';
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

export const TicketUploadForm = ({
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
    id: isReUpload ? newID : id,
  });

  // function toFormData(obj) {
  //   const FD = new FormData();
  //   Object.keys(obj).map((property) => {
  //     return FD.append(property, obj[property]);
  //   });
  //   return FD;
  // }
  const toFormData = useCallback((data) => {
    const req = new FormData();
    for (const key in data) {
      if (key === 'document') {
        if (data[key]) {
          let c = 0;
          req.append(key.toString(), data[key]);
          data[key].forEach((el) => {
            req.append(`document${c}`, el);
            c = c + 1;
          });
          req.set('no_of_document_files', c);
        }
      } else {
        req.append(key.toString(), data[key]);
      }
    }
    return req;
  }, []);

  const preProcess = (data) => {

    let failed = false;
    const {document} = data;
    if (document) {
      try {
        const {fileList} = data.document;
        if (fileList) {
          const newFileList = fileList.map((f) => {
            if (f.status !== 'done') {
              message.error(`${f.name} has not been uploaded yet!`);
              failed = true;
            } else {
              return f.originFileObj;
            }
          });
          data.document = newFileList;
          if (!failed) {
            const finalData = toFormData(data);
            finalData.append(varName, lead)
            submit(finalData);
          }
        } else {
          if (!failed) {
            const finalData = toFormData(data);
            finalData.append(varName, lead)
            submit(finalData);
          }
        }
      } catch (err) {
        alert(err);
        message.error(`Something went wrong!`);
      }
    } else {
      const finalData = toFormData(data);
      finalData.append(varName, lead)
      finalData.append('no_of_document_files', 0);
      submit(finalData);
    }
  };

  // const preProcess = (data) => {
  //   console.log(data.document)
  //   if (reqFile) {
  //     data.document = reqFile.originFileObj;
  //   } else delete data.document;
  //   const req = toFormData({...data, [varName]: lead});
  //   for(var values of req.values()) console.log(values)
  //   for(var pair of req.entries()) {
  //     console.log(pair[0]+ ', '+ pair[1]);
  //   }
  //   // submit(req);
  // };

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Upload</Divider>
      <Form onFinish={preProcess} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row>
          <Col span={24}>
            {formItem({
              ...item,
              kwargs: {
                multiple: true,
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
