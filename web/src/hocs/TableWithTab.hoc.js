import React, {useState} from 'react';
import {Link} from '@reach/router';
import {Typography, Button, Divider, Row, Col, Table, Modal, Tabs, Form, message} from 'antd';
import {connect} from 'react-redux';
import {changePage} from 'common/actions/changePage';
import {CSVLink} from 'react-csv';
import CsvDownload from 'react-json-to-csv';
import formItem from './formItem.hoc';
import {useHandleForm} from 'hooks/form';

import './table.styles.scss';

const {Title} = Typography;
const {TabPane} = Tabs;

const UploadFormBody = ({uploadLinkFunc, onDone, onCancel}) => {
  const {form, submit, loading} = useHandleForm({
    create: uploadLinkFunc,
    success: 'Document Uploaded successfully',
    failure: 'Something went wrong',
    done: onDone,
    close: onCancel,
  });

  const onFinish = (data) => {
    const {file} = data.document;
    const newFile = file.originFileObj;
    data.document = newFile;
    const req = new FormData();
    for (const key in data) {
      if (key === 'document') {
        req.append(key.toString(), data[key]);
      }
    }
    submit(req);
  };

  const onFinishFailed = (errorInfo) => {
    message.error(`Something went wrong. Please try again`);
  };

  return (
    <Form
      name="basic"
      initialValues={{remember: true}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}>
      {formItem({
        key: 'document',
        kwargs: {
          placeholder: 'Upload',
        },
        rules: [{required: true, message: 'Please upload File!'}],
        type: 'file-drag-drop',
        customLabel: 'Upload File',
      })}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const TableWithTabHOC = ({
  title,
  ExtraButtonNextToTitle,
  newPage,
  tabs,
  modelTitle,
  noNewPageCSV,
  modalBody: ModalBody = () => null,
  refresh,
  rowSelection,
  onCancelButton,
  modalWidth,
  rowKey,
  csvdata,
  csvname,
  formParams,
  scroll,
  size,
  uploadLink,
  uploadLinkTitle,
  uploadLinkFunc,
  downloadLink,
  downloadLink2,
  downloadLinkButtonTitle,
  downloadLink2ButtonTitle,
  reset,
  separate,
  editingId,
  pageSize,
  RightBody,
  cancelEditing,
  hideRightButton,
  customRowSelectionType,
  expandHandleKey,
  ExpandBody,
  expandParams,
  changePage,
}) => {
  const [modalVisible, setModalVisible] = useState(!!editingId);
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const callback = (key) => {
    if (reset) reset();
    setActiveTab(key);
  };

  const onCancel = () => {
    setModalVisible(false);
    cancelEditing();
    if (onCancelButton) {
      onCancelButton();
    }
  };

  const onDone = () => {
    refresh();
    onCancel();
  };

  const [modalVisible2, setModalVisible2] = useState(false);

  const onCancel2 = () => {
    setModalVisible2(false);
  };

  const onDone2 = () => {
    refresh();
    onCancel2();
  };

  const getIndex = () => {
    let activeIndex = 0;
    tabs.filter((i, index) => {
      if (i.key === activeTab) {
        activeIndex = index;
      }
      return null;
    });
    return activeIndex;
  };

  return (
    <div>
      <Modal
        maskClosable={false}
        visible={(modalVisible || !!editingId) && !separate}
        destroyOnClose
        style={{minWidth: `${modalWidth}vw`}}
        title={modelTitle || `Add ${title}`}
        onCancel={onCancel}
        footer={null}>
        <ModalBody onCancel={onCancel} onDone={onDone} id={editingId} {...formParams} />
      </Modal>

      {uploadLink ? (
        <Modal
          maskClosable={false}
          visible={modalVisible2}
          destroyOnClose
          style={{minWidth: `30vw`}}
          title={uploadLinkTitle}
          onCancel={onCancel2}
          footer={null}>
          <UploadFormBody uploadLinkFunc={uploadLinkFunc} onDone={onDone2} onCancel={onCancel2} />
        </Modal>
      ) : null}

      <Row justify="space-between" align="middle">
        <Col>
          <Title level={3}>
            {title} {ExtraButtonNextToTitle ? <ExtraButtonNextToTitle /> : null}
          </Title>
          {csvdata ? (
            <>
              <CSVLink
                data={csvdata}
                filename={csvname.replace(' ', '').replace('null', '')}
                className="btn btn-primary">
                Download CSV ({csvname.replace('null', '').replace(' ', '')})
              </CSVLink>
              <br />
            </>
          ) : null}
          {downloadLink ? (
            <>
              <Button
                href={downloadLink}
                rel="noopener noreferrer"
                target={noNewPageCSV ? null : 'blank'}>
                {downloadLinkButtonTitle ? downloadLinkButtonTitle : 'Download CSV'}
              </Button>
              {downloadLink2 ? (
                <>
                  {' '}
                  <Button
                    href={downloadLink2}
                    rel="noopener noreferrer"
                    target={noNewPageCSV ? null : 'blank'}>
                    {downloadLink2ButtonTitle ? downloadLink2ButtonTitle : 'Download Annexure'}
                  </Button>
                </>
              ) : null}
              <br /> <br />
            </>
          ) : null}
        </Col>
        <Col>
          {tabs[getIndex()] ? (
            tabs[getIndex()].menu ? (
              <Row>
                <Col span={24}>
                  {tabs[getIndex()].menu.map((i) => (
                    <Button
                      className="m-2 "
                      type={i.type || 'primary'}
                      key={i.title}
                      onClick={i.onClick}>
                      {i.title}
                    </Button>
                  ))}
                </Col>
              </Row>
            ) : null
          ) : null}
        </Col>
        <Col>
          {hideRightButton && RightBody ? <RightBody /> : null}
          {hideRightButton ? null : newPage ? (
            <Link to={newPage}>
              <Button type="primary">{`Add ${title}`}</Button>
            </Link>
          ) : (
            <>
              {uploadLink ? (
                <>
                  <Button
                    type="primary"
                    onClick={() => {
                      setModalVisible2(true);
                    }}>
                    {uploadLinkTitle}
                  </Button>{' '}
                </>
              ) : null}
              <Button
                type="primary"
                onClick={() => {
                  if (!newPage) setModalVisible(true);
                }}>
                {`Add ${title}`}
              </Button>
            </>
          )}
        </Col>
      </Row>
      <Divider style={{margin: 0, padding: 0}} />
      <Row />
      <Row>
        <Col span={24}>
          {tabs ? (
            <Tabs defaultActiveKey={tabs[0].key} onChange={callback}>
              {tabs.map((tab) => (
                <TabPane tab={tab.name} key={tab.key}>
                  {tab.hasCustomModel ? (
                    <tab.CustomModel {...tab.customModelProps} />
                  ) : (
                    <Table
                      id="mastertable"
                      bordered
                      rowKey={rowKey}
                      expandRowByClick
                      expandIconColumnIndex={-1}
                      pagination={{
                        // pageSize: pageSize || 10,
                        position: ['bottomRight'],
                        onChange(current) {
                          changePage(current);
                        },
                      }}
                      size={size}
                      scroll={scroll}
                      rowClassName="no-vertical"
                      expandIcon={({expanded, onExpand, record}) => null}
                      rowSelection={
                        customRowSelectionType
                          ? {...rowSelection, type: customRowSelectionType[tab.key]}
                          : rowSelection
                      }
                      expandable={
                        ExpandBody
                          ? {
                              expandedRowRender: (record) => (
                                <p style={{margin: 0}}>
                                  <ExpandBody {...expandParams} {...record} />
                                </p>
                              ),
                              rowExpandable: (record) =>
                                expandHandleKey ? !!record[expandHandleKey].length : true,
                              expandRowByClick: true,
                            }
                          : null
                      }
                      dataSource={tab.data}
                      loading={tab.loading}
                      columns={tab.columns}
                    />
                  )}
                </TabPane>
              ))}
            </Tabs>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

export default connect(null, {changePage})(TableWithTabHOC);
