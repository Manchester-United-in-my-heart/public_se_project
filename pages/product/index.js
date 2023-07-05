import {getSession, signOut, useSession} from "next-auth/react";
import {useState} from "react";

export default function (props)
{
  console.log(props)
  const {data: session} = useSession()
  const [productList, setProductList] = useState([...props.productList])
  const shopId = session.dispatchToken.user._id
  return(
    <>
      <div className={'p-4 flex justify-around'}>
        <div className={'text-2xl'}>
          {shopId} ({session.dispatchToken.user.role})
        </div>
        <div className={'flex'}>
          <div>
            <button onClick={async () => {
              await signOut()
            }}>Sign Out
            </button>
          </div>
        </div>
      </div>
      <div>
        {productList && productList.map(product => (
          <div key={product._id} className={'flex justify-around'}>
            <div>
              {product.productName}
            </div>
            <div>
              {product.productPrice}
            </div>
            <div>
              {product.productDescription}
            </div>
            <div>
              <img src={product.productImage} alt={'product image'}/>
            </div>
            <div>
              <a href={'/product/' + product._id}> View </a>
            </div>
          </div>))}
      </div>

      <div>
        <a href={'/product/add'}> Add </a>
      </div>
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