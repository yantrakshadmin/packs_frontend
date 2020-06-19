import { useEffect, useState } from 'react';

import { loadAPI } from '../helpers/api';

const defaultAPIResponse = {
  loading: true,
  data: undefined,
  error: null,
  status: 0,
};

export const useAPI = (url, opts={}) => {
  const { defaultData, ...options } = opts;
  const [response, setResponse] = useState(defaultAPIResponse);
  const [refresh, setRefresh] = useState(0);
  const reload = () => setRefresh(refresh + 1);
  
  const ox = JSON.stringify(options);

  useEffect(() => {
    setResponse(defaultAPIResponse);
    const load = async () => {
      setResponse({ data: undefined, status: 200, error: undefined, loading: true });
      if (defaultData)
        setResponse({ data: defaultData, status: 200, error: undefined, loading: false });
      // noinspection JSCheckFunctionSignatures
      setResponse(await loadAPI(url, options));
    };

    load().then();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ox, refresh]);

  return { ...response, reload };
};
