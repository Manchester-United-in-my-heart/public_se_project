import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react";
import {NotificationContextProvider} from "@/store/notification-context";
import Layout from "@/layout/layout";
export default function App({ Component, pageProps }) {

  return(
    <SessionProvider session={pageProps.session}>
      <NotificationContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </SessionProvider>
  )
}
