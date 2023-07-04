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

    const {data, isLoading, error} = useSWR('/api/admin', (url) => fetch(url).then(res => res.json()))
    useEffect(() => {
      if (data) {
        setListShop(data.list_shop);
        setIsShownAddModal(false);
        setIsShownEditModal(false)
      }
    }, [data])

    const deleteApi = async (id) => {
      const res = await fetch(`http://localhost:3000/api/admin?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    const editApi = async (id, name, email) => {
      const res = await fetch(`http://localhost:3000/api/admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, name, email})
      })
    }
    const addApi = async (name, email) => {
      const res = await fetch(`http://localhost:3000/api/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email})
      })
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
          {isLoading && <div>Loading...</div>}

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
  return (
    session.dispatchToken.user.role === 'shop' ?
      <>
        <div>
          <button onClick={async () => {
            await signOut()
          }}>Sign Out
          </button>
        </div>
      </> :
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


  const res = await fetch('http://localhost:3000/api/admin')

  const data = await res.json()

  return {
    props: {
      session,
      shop: data
    }
  }
}