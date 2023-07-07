import { createContext, useState } from "react";
import {set} from "react-hook-form";

const NotificationContext = createContext({
  notification : null, // {title, message, status}
  showNotification : function () {},
  hideNotification : function () {}
})

export function NotificationContextProvider(props) {

  const [activeNotification, setActiveNotification] = useState();

  const showNotificationHandler = (notificationData) => {
    setActiveNotification(notificationData)
  }

  const hideNotificationHandler = () => {
    setActiveNotification(null)
  }

  const context =
    {
      notification: activeNotification,
      showNotification: showNotificationHandler,
      hideNotification: hideNotificationHandler
    }

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>

  )

}

export default NotificationContext;