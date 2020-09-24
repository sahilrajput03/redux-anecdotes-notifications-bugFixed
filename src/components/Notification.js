import React from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

import {clearNotification} from '../reducers/notificationReducer';

const Notification = () => {
  const dispatch = useDispatch();

  const { notification } = useSelector((s) => s);

  let timeIdRef = React.useRef();

  React.useEffect(() => {
    console.log("::useeffect::Cleared async call with id =>", timeIdRef.current);
    clearTimeout(timeIdRef.current);
    timeIdRef.current = setTimeout(() => {
      dispatch(clearNotification());
    }, 3 * 1000);
  }, [notification]);

  if (notification === null) {
    return null;
  }

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification.message}</div>;
};

export default Notification;
