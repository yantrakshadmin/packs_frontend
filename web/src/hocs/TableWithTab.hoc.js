import React, {useState} from 'react';
import {Typography, Button, Divider, Row, Col, Table, Modal, Tabs} from 'antd';

const {Title} = Typography;
const {TabPane} = Tabs;

export const TableWithTabHOC = ({
  title,
  tabs,
  modalBody: ModalBody = () => null,
  refresh,
  rowSelection,
  modalWidth,
  rowKey,
  size,
  reset,
  editingId,
  cancelEditing,
  hideRightButton,
  showModal,
  customRowSelectionType,
  expandHandleKey,
  ExpandBody,
  expandParams,
}) => {
  const [modalVisible, setModalVisible] = useState(!!editingId);
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const callback = (key) => {
    if (reset) reset();
    setActiveTab(key);
  };

  const onCancel = () => {
    cancelEditing();
  };

  const onDone = () => {
    refresh();
    cancelEditing();
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
      {!hideRightButton || showModal ? (
        <Modal
          visible={modalVisible || !!editingId}
          destroyOnClose
          style={{minWidth: `${modalWidth}vw`}}
          title={`Add ${title}`}
          onCancel={onCancel}
          footer={null}>
          <ModalBody onCancel={onCancel} onDone={onDone} id={editingId} />
        </Modal>
      ) : null}
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={3}>{title}</Title>
        </Col>
        <Col>
          {
            // eslint-disable-next-line no-nested-ternary
            tabs[getIndex()] ? (
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
            ) : null
          }
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
          {tabs ? (
            <Tabs defaultActiveKey={tabs[0].key} onChange={callback}>
              {tabs.map((tab) => (
                <TabPane tab={tab.name} key={tab.key}>
                  <Table
                    bordered
                    rowKey={rowKey}
                    size={size}
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
                              expandHandleKey ? record[expandHandleKey] : null,
                            expandRowByClick: true,
                          }
                        : null
                    }
                    dataSource={tab.data}
                    loading={tab.loading}
                    columns={tab.columns}
                  />
                </TabPane>
              ))}
            </Tabs>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};
