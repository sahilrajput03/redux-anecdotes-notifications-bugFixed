import React from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";

import {clearNotification} from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();

  // setTimeout(() => {
  //   throw new Error("Haha, infinite render hell DECODED!!");
  // }, 5000);

  const {notification} = useSelector((s) => s);

  let timeIdRef = React.useRef(notification);

  React.useEffect(() => {
    if (notification) {
      timeIdRef.current = setTimeout(() => {
        dispatch(clearNotification());
        console.log("::useeffect::DISPATCH successful for clearing notification.");
        timeIdRef.current = null; /*BONUS: This will prevent un-necessary execution clearUp function. */
      }, 3 * 1000);
      console.log("::useeffect::SCHEDULED async call with id =>", timeIdRef.current);
      return () => {
        if (timeIdRef.current) {
          clearTimeout(timeIdRef.current);
          console.log("::cleanUpFunction:: CLEARED async call for id => ", timeIdRef.current);
        }
      };
    }
  }, [notification, dispatch]);

  if (notification === null) {
    return null;
  }

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  };
  return <div style={style}>{notification.message}</div>;
};

export default Notification;
