import {getSession, signOut, useSession} from "next-auth/react";
import {useState} from "react";
import ShopHeader from "@/layout/headers/shopHeader";
import ProductFragment from "@/layout/fragments/productList";
export default function (props)
{
  const baseUrl = props.baseUrl
  const {data: session} = useSession()
  const [productList, setProductList] = useState([...props.productList])
  return(
    <>
      <ShopHeader logoUrl={baseUrl} logoSrc={'/logo.png'} productUrl={`${baseUrl}/product`} signOutHandler={signOut}/>
      <ProductFragment productList={productList} addUrl={`${baseUrl}/product/add`} baseUrl={baseUrl}/>
    </>
  )
}

export async function getServerSideProps({req}){
  const baseUrl = process.env.BASE_URL
  const session = await getSession({req})
  if (!session) {
    return {
      redirect: {
        destination: `${baseUrl}/login`,
        permanent: true
      },
    }
  }

  if (session.dispatchToken.user.role === 'admin' || session.dispatchToken.user.role === 'customer') {
    return {
      redirect: {
        destination: `${baseUrl}/`,
        permanent: true
      }
    }
  }
  const res = await fetch(`${baseUrl}/api/shop?shopId=${session.dispatchToken.user._id}`)

  const data = await res.json()

  return {
    props: {
      session,
      productList: data.productList,
      baseUrl: baseUrl
    }
  }
}