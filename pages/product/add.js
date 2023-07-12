import {useContext, useState} from "react";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "@/firebase.config";
import {getSession, signOut} from "next-auth/react";
import ShopHeader from "@/layout/headers/shopHeader";
import AddProductFragment from "@/layout/fragments/addProduct";
import NotificationContext from "@/store/notification-context";
export default function (props)
{
  const notificationContext = useContext(NotificationContext)
  const [product,setProduct] = useState(
    {
      productId: '',
      productName: '',
      productDescription: '',
      productPrice: '',
      productUnit: '',
      productImage: '',
      shopID: '',
    }
  )
  const [file, setFile] = useState(undefined)
  const [isUsedFile, setIsUsedFile] = useState(true)

  const addHandler = async (data) =>
  {
    if(isUsedFile) {
      notificationContext.showNotification({
        isLoading: true,
        isSuccess: false,
        successMessage: '',
        isError: false,
        errorMessage: '',
      })
      if (!file) {
        alert("Please upload an image first!");
      }
      const storageRef = ref(storage, `/files/${file.name}${new Date}`);
      await uploadBytesResumable(storageRef, file)
      const newUrl = await getDownloadURL(storageRef)
      await fetch(`http://localhost:3000/api/product`,
        {
          method: 'POST',
          body: JSON.stringify({
              productName: data.productName,
              productDescription: data.productDescription,
              productPrice: data.productPrice,
              productUnit: data.productUnit,
              productImage: newUrl,
              shopId: props.session.dispatchToken.user._id
            }
          )
        })
    } else
    {
      notificationContext.showNotification({
        isLoading: true,
        isSuccess: false,
        successMessage: '',
        isError: false,
        errorMessage: '',
      })
      await fetch(`http://localhost:3000/api/product`,
        {
          method: 'POST',
          body: JSON.stringify({
              productName: data.productName,
              productDescription: data.productDescription,
              productPrice: data.productPrice,
              productUnit: data.productUnit,
              productImage: data.link
            }
          )
        })
    }
    notificationContext.showNotification({
      isLoading: false,
      isSuccess: true,
      successMessage: 'Tải lên thành công',
      isError: false,
      errorMessage: '',
    })
  }

  return (
    <>
      <ShopHeader logoUrl={'/'} logoSrc={'/logo.png'} productUrl={'/product'} signOutHandler={signOut}/>
      <AddProductFragment product={product} addHandler={addHandler} file={file} setFile={setFile} isUsedFile={isUsedFile} setIsUsedFile={setIsUsedFile}/>
    </>
  )
}

export async function getServerSideProps({req})
{
  const session = await getSession({req})

  if(!session)
  {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}