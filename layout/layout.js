import Loading from "@/components/loading";
import {useContext} from "react";
import NotificationContext from "@/store/notification-context";
import Footer from "@/layout/footer";

export default function Layout(props) {
  const notificationCtx = useContext(NotificationContext)

  const activeNotification = notificationCtx.notification

  return (
    <div className={'flex flex-col min-h-full justify-between min-h-screen'}>
      <div className={''}>
        {props.children}
        {activeNotification &&
          <Loading isLoading={activeNotification.isLoading}
                   isSuccess={activeNotification.isSuccess}
                   successMessage={activeNotification.successMessage}
                   isError={activeNotification.isError}
                   errorMessage={activeNotification.errorMessage}/>}
      </div>
      <div className={'mt-auto'}>
          <Footer message={'Software Engineering Final Project By Kham Bui and Hiep Do'}/>
      </div>
    </div>
  )
}