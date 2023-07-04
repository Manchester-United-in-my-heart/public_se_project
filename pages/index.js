import {get, useForm} from "react-hook-form";
import EditModal from "@/components/editModal";
import AddModal from "@/components/addModal";
import {useEffect, useState} from "react";
import {getSession, useSession, signOut} from "next-auth/react";
import useSWR from "swr";

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
          <div className={'text-2xl'}>
            Logo's Place ({session.dispatchToken.user.role})
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
          {listShop && listShop.map(shop => (
            <div key={shop._id} className={'flex justify-around'}>
              <div>
                {shop.name}
              </div>
              <div>
                {shop.email}
              </div>
              <div>
                {shop.password}
              </div>
              <div>
                {shop.address}
              </div>
              <div>
                {shop.phone}
              </div>
              <div>
                <button onClick={() => {
                  editModalHandler(
                    {
                      id: shop._id,
                      name: shop.name, email: shop.email,
                      password: shop.password,
                      address: shop.address,
                      phone: shop.phone
                    })
                }}>
                  Edit
                </button>
              </div>
            </div>
          ))}
          {isLoadingListShop && <div>Loading...</div>}

          <div className={'flex justify-center'}>
            <div className={'w-1/2'}>
              <button onClick={() => {
                addModalHandler(
                  {
                    name: '',
                    email: '',
                    password: '',
                    address: '',
                    phone: ''
                  }
                )
              }}>Add
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
  else if (session.dispatchToken.user.role === 'shop') {
    return(
      <>
        This Page's Purpose is showing the shop's order
        <button onClick={async () => {
          await signOut()
        }}>Sign Out
        </button>
      </>
    )
  }
  return (
      session.dispatchToken.user.role === 'customer' ?
        <>
          <button onClick={async () => {
            await signOut()
          }}>Sign Out
          </button>
        </> :
        <>
          <button onClick={async () => {
            await signOut()
          }}>Sign Out
          </button>
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

    return {
      props: {
        session,
        productList: data.productList
      }
    }
  }
}