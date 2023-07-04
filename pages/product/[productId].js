import {getSession} from "next-auth/react";
import {get, set, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import { storage } from "@/firebase.config";
import { ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {warn} from "next/dist/build/output/log";

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

  // const uploadHandler = async () => {
  //   if (!file) {
  //     alert("Please upload an image first!");
  //   }
  //   setUploadName(`${file.name}${new Date}`)
  //   const storageRef = ref(storage, `/files/${uploadName}`);
  //   await uploadBytesResumable(storageRef, file)
  //     .then( () => {
  //       getDownloadURL(storageRef).then( (url) => {setUrl(url)})
  //     } )
  // }

  const saveChangeHandler = async (data) =>
  {
    if(isUsedFile) {
      if (!file) {
        alert("Please upload an image first!");
      }
      setUploadName(`${file.name}${new Date}`)
      const storageRef = ref(storage, `/files/${uploadName}`);
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

  const deleteHandler = (data) =>
  {
    console.log(data)
  }

  useEffect( () =>
    {
      // console.log(isUsedFile)
      setIsUsedFile(watch('option'))
    }
  , [watch('option')])
  useEffect( () =>
    {
      console.log(watch('file')[0])
      setFile(watch('file')[0])
      console.log(file)
    }
    , [watch('file')])
  const submitHandler = (data) =>
  {
    console.log(data)
  }
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
        <button onClick={handleSubmit((data) =>{console.log(data)})}>Delete</button>
      </div>
      <img src={url} alt={'alt'}/>
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