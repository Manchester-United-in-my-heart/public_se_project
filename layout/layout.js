import Loading from "@/components/loading";
import {useContext} from "react";
import NotificationContext from "@/store/notification-context";

export default function Layout(props) {
  const notificationCtx = useContext(NotificationContext)

  const activeNotification = notificationCtx.notification

  return (
    <>
      {props.children}
      {activeNotification &&
        <Loading isLoading={activeNotification.isLoading}
                 isError={activeNotification.isError}
                 errorMessage={activeNotification.errorMessage}/>}
    </>
  )
}