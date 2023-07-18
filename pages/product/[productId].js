import {getSession, signOut} from "next-auth/react";
import {useContext, useState} from "react";
import { storage } from "@/firebase.config";
import { ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import ShopHeader from "@/layout/headers/shopHeader";
import EditProductFragment from "@/layout/fragments/editProduct";
import NotificationContext from "@/store/notification-context";
export default function (props)
{
  const baseUrl = props.baseUrl
  const notificationContext = useContext(NotificationContext)
  const [product,setProduct] = useState(
    {
      productId: props._id,
      productName: props.productName,
      productDescription: props.productDescription,
      productPrice: props.productPrice,
      productUnit: props.productUnit,
      productImage: props.productImage,
      shopID: props.shopID
    }
  )
  const [file, setFile] = useState(undefined)
  const [isUsedFile, setIsUsedFile] = useState(true)

  const saveChangeHandler = async (data) =>
  {
    if(isUsedFile) {
      if (!file) {
        alert("Please upload an image first!");
      }
      notificationContext.showNotification({
        isLoading: true,
        isSuccess: false,
        successMessage: '',
        isError: false,
        errorMessage: '',
      })
      const storageRef = ref(storage, `/files/${file.name}${new Date}`);
      await uploadBytesResumable(storageRef, file)
      const newUrl = await getDownloadURL(storageRef)
      await fetch(`${baseUrl}/api/product?productId=${product.productId}`,
        {
          method: 'PUT',
          body: JSON.stringify({
              productName: data.productName,
              productDescription: data.productDescription,
              productPrice: data.productPrice,
              productUnit: data.productUnit,
              productImage: newUrl
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
      await fetch(`${baseUrl}/api/product?productId=${product.productId}`,
        {
          method: 'PUT',
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
      successMessage: 'Lưu thành công',
      isError: false,
      errorMessage: '',
    })
  }

  const deleteHandler = async (data) =>
  {
    await fetch(`${baseUrl}/api/product?productId=${product.productId}`,
      {
        method: 'DELETE',
      })
  }

  return (
    <>
      <ShopHeader logoUrl={baseUrl} logoSrc={'/logo.png'} productUrl={`${baseUrl}/product`} signOutHandler={signOut}/>
      <EditProductFragment product={product} saveChangeHandler={saveChangeHandler} deleteHandler={deleteHandler} file={file} setFile={setFile} isUsedFile={isUsedFile} setIsUsedFile={setIsUsedFile}/>
    </>
  )
}

export async function getServerSideProps({req, params})
{
  const baseUrl = process.env.BASE_URL
  const session = await getSession({req})

  const res = await fetch(`${baseUrl}/api/product?productId=${params.productId}`)

  const data = await res.json()

  return {
    props: data.product,
    baseUrl: baseUrl,
  }
}