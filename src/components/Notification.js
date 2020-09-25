import React from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

import {clearNotification} from '../reducers/notificationReducer';

const Notification = () => {
  const dispatch = useDispatch();

  const { notification } = useSelector((s) => s);

  let [timeId, setTimeId] = React.useState(null);

  React.useEffect(() => {
    if (timeId) {
      clearTimeout(timeId); /* Toggle😁😁 commenting this line to see, buggy notifications. */
      console.log("::useeffect::Cleared async call for resetting `notification message` with id =>", timeId);
    }
    let timeIdTemp = setTimeout(() => {
      dispatch(clearNotification());
    }, 3 * 1000);
    setTimeId(timeIdTemp);
    console.log("::useeffect::Async call for resetting `notification message` scheduled with id =>", timeId);
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
