import {useEffect} from 'react';

const Redirect = ({navigate, user}) => {
  useEffect(() => {
    navigate(`/${user.type}/`);
  }, [user.type, navigate]);
  return null;
};

export default Redirect;
