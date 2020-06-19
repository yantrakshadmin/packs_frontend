import React, {useEffect} from 'react';

const Redirect = ({navigate, user}) => {
  useEffect(() => {
    navigate(`/${user.type}/`);
  }, []);
  return null;
};

export default Redirect;
