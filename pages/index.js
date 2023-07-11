import {get, useForm} from "react-hook-form";
import EditModal from "@/components/modals/editModal";
import AddModal from "@/components/modals/addModal";
import {useEffect, useState} from "react";
import {getSession, useSession, signOut} from "next-auth/react";
import CartModal from "@/components/modals/cartModal";
import Bill from "@/components/bill";
import AdminHeader from "@/layout/headers/adminHeader";
import ShopDetail from "@/components/shopDetail";
export default function Home(props) {
  const {data: session} = useSession()
  if (session.dispatchToken.user.role === "admin") {

    const [listShop, setListShop] = useState(props.shop.list_shop)
    const [isLoadingListShop,setIsLoadingListShop] = useState(false)
    const [isShownEditModal, setIsShownEditModal] = useState(false)
    const [editData, setEditData] =
      useState(
        {
          id: '',
          name: '',
          email: '',
          password: '',
          address: '',
          phone: ''
        })
    const editModalHandler = ({id, name, email, password, address, phone}) => {
      setIsShownEditModal(true)
      setEditData(
        {
          id: id,
          name: name,
          email: email,
          password: password,
          address: address,
          phone: phone
        }
      )
    }

    const [isShownAddModal, setIsShownAddModal] = useState(false)
    const [addData, setAddData] =
      useState(
        {
          name: '',
          email: '',
          password: '',
          address: '',
          phone: ''
        })

    const addModalHandler = ({name, email, password, address, phone}) => {
      setIsShownAddModal(true)
      setAddData(
        {
          name: name,
          email: email,
          password: password,
          address: address,
          phone: phone
        }
      )
    }

    const deleteApi = async (id) => {
      setIsLoadingListShop(true)
      const res = await fetch(`http://localhost:3000/api/admin?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setIsLoadingListShop(false)
      setIsShownAddModal(false)
      setIsShownEditModal(false)
      setListShop(listShop.filter((item) => item._id !== id))
    }

    const editApi = async (id, name, email, password, address, phone) => {
      setIsLoadingListShop(true)
      const res = await fetch(`http://localhost:3000/api/admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, name, email, password, address, phone})
      })
      setIsLoadingListShop(false)
      setIsShownAddModal(false)
      setIsShownEditModal(false)
      setListShop(listShop.map((item) => {
        if (item._id === id) {
          item.name = name
          item.email = email
          item.password = password
          item.address = address
          item.phone = phone
        }
        return item
      }))
    }
    const addApi = async (name, email, password, address, phone) => {
      setIsLoadingListShop(true)
      const res = await fetch(`http://localhost:3000/api/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password, address, phone})
      })
      setIsLoadingListShop(false)
      setIsShownAddModal(false)
      setIsShownEditModal(false)
      setListShop([...listShop, {
        id: res.id,
        name: name,
        email: email,
        password: password,
        address: address,
        phone: phone
      }])
      }


    return (
      <>
        {isShownAddModal &&
          <AddModal
            name={''}
            email={''}
            password={''}
            address={''}
            phone={''}
            showHandler={setIsShownAddModal}
            addHandler={addApi}
          />}
        {isShownEditModal &&
          <EditModal
            id={editData.id}
            name={editData.name}
            email={editData.email}
            password={editData.password}
            address={editData.address}
            phone={editData.phone}
            showHandler={setIsShownEditModal}
            deleteHandler={deleteApi}
            editHandler={editApi}
          />}
        <div className={'p-4 flex justify-around'}>
          <AdminHeader logoUrl={'/'} logoSrc={'/logo.png'} signOutHandler={signOut}/>
        </div>

        <div>
          <div>
            <div className={'px-20 columns-6 text-center'}>
              <div>
                Tên Shop
              </div>
              <div>
                Tên người dùng
              </div>
              <div>
                Mật khẩu
              </div>
              <div>
                Địa chỉ
              </div>
              <div>
                Số điện thoại
              </div>
            </div>
          </div>
          <div className={'flex flex-col gap-4 mt-4'}>
            {listShop && listShop.map(shop => (
              <div key={shop._id} className={'px-20 columns-6 break-after-column text-center'}>
                <ShopDetail id={shop._id} name={shop.name} email={shop.email} password={shop.password} address={shop.address} phone={shop.phone} editModalHandler={editModalHandler}/>
              </div>))}
          </div>

          <div className={'flex justify-center mt-20'}>
              <button className={'px-6 py-2 border-[1px] rounded-2xl border-black hover:bg-blue-600 transition-all duration-300'} onClick={() => {addModalHandler({name: '', email: '', password: '', address: '', phone: ''})}}>
                Add
              </button>
          </div>
        </div>
      </>
    )
  }
  else if (session.dispatchToken.user.role === 'shop') {
    return(
      <>
        <button onClick={async () => {
          await signOut()
        }}>Sign Out
        </button>
        {props.billList.map(bill => (
          <div key={bill._id}>
            <Bill cart={bill.cart} customerEmail={bill.customerEmail} address={bill.address} phone={bill.phone} totalPaid={bill.totalPaid} />
          </div>
        ))}
        <div>
          <a href={'/product'}>Product</a>
        </div>
      </>
    )
  }
  const [isCartModalOn, setIsCartModalOn] = useState(false)
  return (
        <>
          <div className={'flex gap-4'}>
            {isCartModalOn && <CartModal cartId={props.session.dispatchToken.user._id} cartList={props.cartList} shopList={props.shopList} setIsCartModalOn={setIsCartModalOn} purchaseHandler={()=>{}}/>}
            <button onClick={()=>{setIsCartModalOn(true)}}> Your Cart</button>
            <button onClick={async () => {
              await signOut()
            }}>Sign Out
            </button>
          </div>

          <div>
            {props.shopList.map(shop => (
              <div key={shop._id}>
                <a href = {`/shop/${shop._id}`}>{shop.name}</a>
              </div>))
            }
          </div>
        </>
  )
}

export async function getServerSideProps({req}) {
  const session = await getSession({req})

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      },
    }
  }

  if (session.dispatchToken.user.role === 'admin') {

  const res = await fetch('http://localhost:3000/api/admin')

  const data = await res.json()

  return {
    props: {
      session,
      shop: data
    }
  }}
  else if (session.dispatchToken.user.role === 'shop') {
    const res = await fetch(`http://localhost:3000/api/shop?shopID=${session.dispatchToken.user._id}`)
    const data = await res.json()

    const resBill = await fetch(`http://localhost:3000/api/bill?shopId=${session.dispatchToken.user._id}`)
    const dataBill = await resBill.json()

    return {
      props: {
        session,
        productList: data.productList,
        billList: dataBill.bills
      }
    }
  }

  else if (session.dispatchToken.user.role === 'customer') {
    const shopRes = await fetch(`http://localhost:3000/api/admin`)
    const shopData = await shopRes.json()
    const cartRes = await fetch(`http://localhost:3000/api/customer?cartId=${session.dispatchToken.user._id}`)
    const cartData = await cartRes.json()
    return {
      props: {
        session:session,
        shopList: shopData.list_shop,
        cartList: cartData.cart.cartList
      }
    }
  }
}