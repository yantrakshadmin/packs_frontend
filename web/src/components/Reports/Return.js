import React, { useState ,useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { DEFAULT_BASE_URL } from 'common/constants/enviroment';
import { useAPI } from 'common/hooks/api';
import { Row, Col, Form, Button } from 'antd';
import { retrieveReturnReport } from 'common/api/auth';
import returnColumns from 'common/columns/Return.column';
import TableWithTabHoc from 'hocs/TableWithTab.hoc';
import { FORM_ELEMENT_TYPES } from '../../constants/formFields.constant';
import { RetKitTable } from '../RetKitExp';

import formItem from '../../hocs/formItem.hoc';

const AllotmentReport = ({ currentPage }) => {
  const [all, setAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [csvData, setCsvData] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [reqReturns, setReqAllotments] = useState(null);
  const [to, setTo] = useState(null);
  const [from, setFrom] = useState(null);
  const [form] = Form.useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    data.to = moment(data.to).format('YYYY-MM-DD HH:MM');
    data.from = moment(data.from).format('YYYY-MM-DD HH:MM');
    setTo(data.to);
    setFrom(data.from);
    const { data: report } = await retrieveReturnReport(data);
    if (report) {
      console.log(report);
      setLoading(false);
      setReportData(report);
    }
  };

  useEffect(() => {
    if (reportData) {
      const reqD = reportData.map((ret) => ({
        ...ret,
      }));
      setReqAllotments(reqD);
    }
  }, [reportData]);

  // useEffect(() => {
  //   if (reqReturns) {
  //     let csvd = [];
  //     reqReturns.forEach((d) => {
  //       let temp = {...d, ['is_delivered']: [d['is_delivered'] ? 'Yes' : 'No']};
  //       delete temp['flows'];
  //       csvd.push(temp);
  //       d.flows.forEach((f) => {
  //         let kit = f['kit'].kit_name,
  //           aq = f.alloted_quantity;
  // let s = '';
  // for (let i = 1; i <= aq; i++) {
  //   s += `${d.transaction_no}-${kit}-${i}, `;
  // }
  // s = s.slice(0, -2);
  // let temp1 = {
  // ...f,
  // ['kit']: f['kit'].kit_name,
  // 'kits assigned': s
  //         };
  //         csvd.push(temp1);
  //         f.kit.products.forEach((p) => {
  //           let temp2 = {...p, ['quantity']: p['quantity'] * aq};
  //           csvd.push(temp2);
  //         });
  //       });
  //     });
  //     setCsvData(csvd);
  //   }
  // }, [reqReturns]);

  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
    },
    ...returnColumns,
  ];

  const tabs = [
    {
      name: 'Return Dockets',
      key: 'Return Dockets',
      data: reqReturns || [],
      columns,
      loading,
    },
  ];

  return (
    <>
      <Form onFinish={onSubmit} form={form} layout='vertical' hideRequiredMark autoComplete='off'>
        <Row>
          <Col span={3}>
            {formItem({
              key: 'from',
              rules: [{ required: true, message: 'Please select From date!' }],
              kwargs: {
                placeholder: 'Select',
                type: 'number',
              },
              type: FORM_ELEMENT_TYPES.DATE,
              others: null,
              customLabel: 'From',
            })}
          </Col>
          <Col span={4} />
          <Col span={3}>
            {formItem({
              key: 'to',
              rules: [{ required: true, message: 'Please select To date!' }],
              kwargs: {
                placeholder: 'Select',
                type: 'number',
              },
              type: FORM_ELEMENT_TYPES.DATE,
              others: null,
              customLabel: 'To',
            })}
          </Col>
        </Row>
        <Row>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Row>
      </Form>
      <br />
      <TableWithTabHoc
        tabs={tabs}
        size='middle'
        title='Return Dockets'
        hideRightButton
        downloadLink={`${DEFAULT_BASE_URL}/return-reportsdownload/?to=${to}&from=${from}`}
        rowKey='id'
        expandHandleKey='kits'
        ExpandBody={RetKitTable}
        expandParams={{ loading }}
        // csvdata={csvData}
        // csvname={'Allotments' + clientName + '.csv'}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(AllotmentReport);
