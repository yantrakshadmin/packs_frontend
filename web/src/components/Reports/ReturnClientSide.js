import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {DEFAULT_BASE_URL} from 'common/constants/enviroment';
import {useAPI} from 'common/hooks/api';
import {loadAPI} from 'common/helpers/api';
import {Row, Col, Form, Button, notification} from 'antd';
import returnColumns from 'common/columns/Return.column';
import TableWithTabHoc from 'hocs/TableWithTab.hoc';
import {FORM_ELEMENT_TYPES} from '../../constants/formFields.constant';
import {RetKitTable} from '../RetKitExp';

import formItem from '../../hocs/formItem.hoc';

const AllotmentReport = ({currentPage, user}) => {
  const [to, setTo] = useState(null);
  const [from, setFrom] = useState(null);
  const [form] = Form.useForm();

  const [btnLoading, setBtnLoading] = useState(false);

  const DownloadCSVButton = useCallback(() => {
    return (
      <Button
        onClick={async () => {}}
        rel="noopener noreferrer"
        target="blank"
        loading={btnLoading}>
        Download Reports
      </Button>
    );
  }, [btnLoading, user]);

  const onSubmit = useCallback(
    async (data) => {
      // data.to = moment(data.to).endOf('date').format('YYYY-MM-DD HH:MM');
      // data.from = moment(data.from).startOf('date').format('YYYY-MM-DD HH:MM');
      // setTo(data.to);
      // setFrom(data.from);

      await setBtnLoading(true);
      const d = await loadAPI(
        `/client-return-reportsdownload/?cname=${user.id}&to=${moment(data.to)
          .endOf('date')
          .format('YYYY-MM-DD HH:MM')}&from=${moment(data.from)
          .startOf('date')
          .format('YYYY-MM-DD HH:MM')}`,
      );
      if (d.status === 403) {
        notification.error({
          message: 'Access Denied',
          description: 'You do not have permissions to access this module.',
        });
      } else {
        let hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(d.data);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'return-report.csv';
        hiddenElement.click();
      }
      setBtnLoading(false);
    },
    [to, from, btnLoading, user],
  );

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

  return (
    <>
      <Form onFinish={onSubmit} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row>
          <Col span={3}>
            {formItem({
              key: 'from',
              rules: [{required: true, message: 'Please select From date!'}],
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
              rules: [{required: true, message: 'Please select To date!'}],
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
          <Button loading={btnLoading} type="primary" htmlType="submit">
            Download Reports
          </Button>
        </Row>
      </Form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {user: state.user.userMeta};
};

export default connect(mapStateToProps)(AllotmentReport);
