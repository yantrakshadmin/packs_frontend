import {Form, notification} from 'antd';
import {useEffect, useState} from 'react';

import moment from 'moment';

export const useHandleForm = ({
  create,
  edit,
  retrieve,
  id,
  success,
  failure,
  done,
  close,
  dates,
}) => {
  const isEdit = !!id;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(isEdit);
  const [apiData, setApiData] = useState(undefined);

  const successMessage = (isEdit ? success.edit : success.create) || success || 'Done';
  const failureMessage = (isEdit ? failure.edit : failure.create) || failure || 'Error';

  const submit = async (data) => {
    try {
      let api;
      if (isEdit) api = () => edit(id, data);
      else api = () => create(data);

      const {error} = await api();
      if (error) {
        throw Error(Object.values(error));
      }

      notification.success({message: successMessage});
      done();
    } catch (e) {
      notification.error({message: failureMessage, description: e.toString()});
      close();
    }
  };

  const loader = async () => {
    setLoading(true);
    // form.resetFields();

    try {
      if (isEdit && retrieve) {
        const {data} = await retrieve(id);
        if (dates) dates.map((date) => (data[date] = moment(data[date])));
        if (data) {
          console.log(data, 'retrive');
          form.setFieldsValue(data);
        }
        setApiData(data);
      }
    } catch (e) {
      notification.error({message: 'Error in getting data', description: e.toString()});
      close();
    }

    setLoading(false);
  };

  useEffect(() => {
    loader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {form, loading, submit, data: apiData};
};
