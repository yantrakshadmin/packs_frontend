import React, {useState} from 'react';
import {Typography, Button, Divider, Row, Col, Table, Modal, Tabs} from 'antd';
import {connect} from 'react-redux';
import {changePage} from 'common/actions/changePage';
import {CSVLink} from 'react-csv';
import CsvDownload from 'react-json-to-csv';

import './table.styles.scss';

const {Title} = Typography;
const {TabPane} = Tabs;

const TableWithTabHOC = ({
  title,
  modalBody: ModalBody = () => null,
  refresh,
  rowSelection,
  pagination,
  modalWidth,
  rowKey,
  csvdata,
  csvname,
  scroll,
  tableData,
  columns,
  loading,
  size,
  reset,
  editingId,
  pageSize,
  cancelEditing,
  hideRightButton,
  customRowSelectionType,
  expandHandleKey,
  ExpandBody,
  expandParams,
  changePage,
}) => {
  const [modalVisible, setModalVisible] = useState(!!editingId);

  const onCancel = () => {
    setModalVisible(false);
    cancelEditing();
  };

  const onDone = () => {
    refresh();
    onCancel();
  };

  return (
    <div>
      <Modal
        visible={modalVisible || !!editingId}
        destroyOnClose
        style={{minWidth: `${modalWidth}vw`}}
        title={title ? `Add ${title.slice(0, -1)}` : null}
        onCancel={onCancel}
        footer={null}>
        <ModalBody onCancel={onCancel} onDone={onDone} id={editingId} />
      </Modal>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={3}>{title}</Title>
          {csvdata ? (
            <CSVLink
              data={csvdata}
              filename={csvname.replace(' ', '').replace('null', '')}
              className="btn btn-primary">
              Download CSV ({csvname.replace('null', '').replace(' ', '')})
            </CSVLink>
          ) : null}
        </Col>

        <Col>
          {hideRightButton ? null : (
            <Button
              type="primary"
              onClick={() => {
                setModalVisible(true);
              }}>
              Add {title}
            </Button>
          )}
        </Col>
      </Row>
      <Divider style={{margin: 0, padding: 0}} />
      <Row />
      <Row>
        <Col span={24}>
          <Table
            id="mastertable"
            bordered
            rowKey={rowKey}
            expandRowByClick
            expandIconColumnIndex={-1}
            pagination={
              pagination
                ? {
                    position: ['bottomRight'],
                    onChange(current) {
                      changePage(current);
                    },
                  }
                : false
            }
            size={size}
            scroll={scroll}
            rowClassName="no-vertical"
            expandIcon={({expanded, onExpand, record}) => null}
            expandable={
              ExpandBody
                ? {
                    expandedRowRender: (record) => (
                      <p style={{margin: 0}}>
                        <ExpandBody {...expandParams} {...record} />
                      </p>
                    ),
                    rowExpandable: (record) =>
                      expandHandleKey ? (record[expandHandleKey].length ? true : false) : true,
                    expandRowByClick: true,
                  }
                : null
            }
            dataSource={tableData}
            loading={loading}
            columns={columns}
          />
        </Col>
      </Row>
    </div>
  );
};

export default connect(null, {changePage})(TableWithTabHOC);
