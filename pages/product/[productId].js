import {getSession} from "next-auth/react";
import {get, set, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import { storage } from "@/firebase.config";
import { ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

export default function (props)
{
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
  const {handleSubmit, register, watch} = useForm()
  const [file, setFile] = useState(undefined)
  const [url, setUrl] = useState('')
  const [percent, setPercent] = useState(0)
  const [uploadName, setUploadName] = useState('')

  const [isUsedFile, setIsUsedFile] = useState(true)

  const saveChangeHandler = async (data) =>
  {
    if(isUsedFile) {
      if (!file) {
        alert("Please upload an image first!");
      }
      const storageRef = ref(storage, `/files/${file.name}${new Date}`);
      await uploadBytesResumable(storageRef, file)
      const newUrl = await getDownloadURL(storageRef)
      await fetch(`http://localhost:3000/api/product?productId=${product.productId}`,
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
      await fetch(`http://localhost:3000/api/product?productId=${product.productId}`,
        {
          method: 'PUT',
          body: JSON.stringify({
              productName: data.productName,
              productDescription: data.productDescription,
              productPrice: data.productPrice,
              productUnit: data.productUnit,
              productImage: watch('link')
            }
          )
        })
    }

  }

  const deleteHandler = async (data) =>
  {
    await fetch(`http://localhost:3000/api/product?productId=${product.productId}`,
      {
        method: 'DELETE',
      })
  }

  useEffect( () =>
    {
      setIsUsedFile(watch('option'))
    }
  , [watch('option')])
  useEffect( () =>
    {
      setFile(watch('file')[0])
    }
    , [watch('file')])
  return (
    <>
      <form>
        <div className={'flex justify-around'}>
          <div>
            <label htmlFor="name">Name</label>
          </div>
          <div>
            <input type="text" id={'email'} defaultValue={product.productName} {...register('productName', {required: true})}/>
          </div>
        </div>
        <div className={'flex justify-around'}>
          <div>
            <label htmlFor="description">Description</label>
          </div>
          <div>
            <input type="text" id={'description'} defaultValue={product.productDescription} {...register('productDescription', {required: true})}/>
          </div>
        </div>
        <div className={'flex justify-around'}>
          <div>
            <label htmlFor="price">Price</label>
          </div>
          <div>
            <input type="text" id={'price'} defaultValue={product.productPrice} {...register('productPrice', {required: true})}/>
          </div>
        </div>
        <div className={'flex justify-around'}>
          <div>
            <label htmlFor="unit">Unit</label>
          </div>
          <div>
            <input type="text" id={'unit'} defaultValue={product.productUnit} {...register('productUnit', {required: true})}/>
          </div>
        </div>
        <div className={'flex justify-around'}>
          <div>
            <label htmlFor="option">Upload File ?</label>
          </div>
          <div>
            <input type="checkbox" id={'option'} {...register('option')}/>
          </div>
        </div>
        {isUsedFile ?
          <div className={'flex justify-around'}>
            <div>
              <label htmlFor="uploadfile">Upload</label>
            </div>
            <div>
              <input id={'uploadfile'} type={'file'} {...register('file')}/>
            </div>
          </div>:
          <div className={'flex justify-around'}>
            <div>
              <label htmlFor="link">Link</label>
            </div>
            <div>
              <input id={'link'} defaultValue={product.productImage} {...register('link')}/>
            </div>
          </div>
        }
      </form>
      <div>
        <button onClick={handleSubmit(saveChangeHandler)}>Save Changes</button>
      </div>
      <div>
        <button onClick={handleSubmit(deleteHandler)}>Delete</button>
      </div>
    </>
  )
}

export async function getServerSideProps({req, params})
{
  const session = await getSession({req})

  const res = await fetch(`http://localhost:3000/api/product?productId=${params.productId}`)

  const data = await res.json()

  return {
    props: data.product
  }
}