import {getSession, signOut, useSession} from "next-auth/react";
import {useState} from "react";
import ShopHeader from "@/layout/headers/shopHeader";
import ProductFragment from "@/layout/fragments/productList";
export default function (props)
{
  const {data: session} = useSession()
  const [productList, setProductList] = useState([...props.productList])
  return(
    <>
      <ShopHeader logoUrl={'/'} logoSrc={'/logo.png'} productUrl={'/product'} signOutHandler={signOut}/>
      <ProductFragment productList={productList} addUrl={`/product/add`}/>
    </>
  )
}

export async function getServerSideProps({req}){
  const session = await getSession({req})
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: true
      },
    }
  }

  if (session.dispatchToken.user.role === 'admin' || session.dispatchToken.user.role === 'customer') {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }
  const res = await fetch(`http://localhost:3000/api/shop?shopId=${session.dispatchToken.user._id}`)

  const data = await res.json()

  return {
    props: {
      session,
      productList: data.productList
    }
  }
}