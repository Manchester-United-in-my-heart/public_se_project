import EditModal from "@/components/modals/editModal";
import AddModal from "@/components/modals/addModal";
import {useContext, useState} from "react";
import {getSession, useSession, signOut} from "next-auth/react";
import AdminHeader from "@/layout/headers/adminHeader";
import ShopDetail from "@/components/shopDetail";
import NotificationContext from "@/store/notification-context";
import ShopHeader from "@/layout/headers/shopHeader";
import BillFragment from "@/layout/fragments/billList";
import ReadOnlyCartModal from "@/components/modals/readOnlyCartModal";
import CartModal from "@/components/modals/cartModal";
import CustomerHeader from "@/layout/headers/customerHeader";
import ShopFragment from "@/layout/fragments/shopList";
export default function Home(props) {
  const {data: session} = useSession()
  const notificationCtx = useContext(NotificationContext)
  if (session.dispatchToken.user.role === "admin") {

    const [listShop, setListShop] = useState(props.shop.list_shop)
    const [isLoadingListShop,setIsLoadingListShop] = useState(false)
    const [isShownEditModal, setIsShownEditModal] = useState(false)
    const [editData, setEditData] = useState({id: '', name: '', email: '', password: '', address: '', phone: ''})
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
    const [addData, setAddData] = useState({ name: '', email: '', password: '', address: '', phone: ''})

    const addModalHandler = ({name, email, password, address, phone}) => {
      setIsShownAddModal(true)
      setAddData({name: name, email: email, password: password, address: address, phone: phone})
    }

    const deleteApi = async (id) => {
      setIsLoadingListShop(true)
      const res = await fetch(`/api/admin?id=${id}`, {
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
      const res = await fetch(`/api/admin`, {
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
      const res = await fetch(`/api/admin`, {
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
        {isShownAddModal && <AddModal name={''} email={''} password={''} address={''} phone={''} showHandler={setIsShownAddModal} addHandler={addApi} notificationContext={notificationCtx} />}
        {isShownEditModal && <EditModal id={editData.id} name={editData.name} email={editData.email} password={editData.password} address={editData.address} phone={editData.phone} showHandler={setIsShownEditModal} deleteHandler={deleteApi} editHandler={editApi} notificationContext={notificationCtx}/>}
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
              <div key={shop._id} className={'px-20 grid grid-cols-6 items-center text-center'}>
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
    const [billList, setBillList] = useState(props.billList)
    const fulfillHandler = async (id) => {

      notificationCtx.showNotification(
        {
          isLoading: true,
          isSuccess: false,
          successMessage: '',
          isError: false,
          errorMessage: '',
        }
      )

      const res = await fetch(`/api/bill?billId=${id}`, {
        method: 'PATCH'})

      if (!res.ok) {
        notificationCtx.showNotification(
          {
            isLoading: false,
            isSuccess: false,
            successMessage: '',
            isError: true,
            errorMessage: 'Đã có lỗi xảy ra',
          }
        )
      } else {
        notificationCtx.showNotification(
          {
            isLoading: false,
            isSuccess: true,
            successMessage: 'Đã hoàn thành đơn hàng',
            isError: false,
            errorMessage: '',
          }
        )
      }

      setBillList(billList.map((item) => {
        if (item._id === id) {
          item.isFulfilled = true
        }
        return item
      }))
    }
    const [isCartModalOn, setIsCartModalOn] = useState(false)
    const [cartModalProps, setCartModalProps] = useState(null)

    return(
      <>
        {isCartModalOn && <ReadOnlyCartModal cartModalProps={cartModalProps} showHandler={setIsCartModalOn}/>}
        <ShopHeader logoUrl={'/'} logoSrc={'/logo.png'} productUrl={'/product'} signOutHandler={signOut} />
        <BillFragment billList={billList} fulfillHandler={fulfillHandler} setIsCartModalOn={setIsCartModalOn} setCartModalProps={setCartModalProps} />
      </>
    )
  }
  const [isCartModalOn, setIsCartModalOn] = useState(false)
  return (
        <>
          {isCartModalOn && <CartModal cartId={props.session.dispatchToken.user._id} cartList={props.cartList} shopList={props.shopList} setIsCartModalOn={setIsCartModalOn} purchaseHandler={()=>{}}/>}
          <CustomerHeader logoUrl={'/'} logoSrc={'/logo.png'} showCartHandler={setIsCartModalOn} signOutHandler={signOut}/>
          <ShopFragment shopList={props.shopList} />
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

  const res = await fetch(`${process.env.BASE_URL}/api/admin`)

  const data = await res.json()

  return {
    props: {
      session,
      shop: data
    }
  }}
  else if (session.dispatchToken.user.role === 'shop') {
    const res = await fetch(`/api/shop?shopID=${session.dispatchToken.user._id}`)
    const data = await res.json()

    const resBill = await fetch(`/api/bill?shopId=${session.dispatchToken.user._id}`)
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
    const shopRes = await fetch(`/api/admin`)
    const shopData = await shopRes.json()
    const cartRes = await fetch(`/api/customer?cartId=${session.dispatchToken.user._id}`)
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