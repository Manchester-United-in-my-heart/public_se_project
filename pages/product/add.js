import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "@/firebase.config";
import {getSession} from "next-auth/react";
export default function (props)
{
  console.log(props.session.dispatchToken.user._id)
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
  const {handleSubmit, register, watch} = useForm()
  const [file, setFile] = useState(undefined)
  const [url, setUrl] = useState('')
  const [percent, setPercent] = useState(0)
  const [uploadName, setUploadName] = useState('')

  const [isUsedFile, setIsUsedFile] = useState(true)

  const addHandler = async (data) =>
  {
    if(isUsedFile) {
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
      await fetch(`http://localhost:3000/api/product`,
        {
          method: 'POST',
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
            <label htmlFor="name">Tên sản phẩm</label>
          </div>
          <div>
            <input type="text" id={'email'} defaultValue={product.productName} {...register('productName', {required: true})}/>
          </div>
        </div>
        <div className={'flex justify-around'}>
          <div>
            <label htmlFor="description">Mô tả</label>
          </div>
          <div>
            <input type="text" id={'description'} defaultValue={product.productDescription} {...register('productDescription', {required: true})}/>
          </div>
        </div>
        <div className={'flex justify-around'}>
          <div>
            <label htmlFor="price">Giá</label>
          </div>
          <div>
            <input type="text" id={'price'} defaultValue={product.productPrice} {...register('productPrice', {required: true})}/>
          </div>
        </div>
        <div className={'flex justify-around'}>
          <div>
            <label htmlFor="unit">Đơn vị tính</label>
          </div>
          <div>
            <input type="text" id={'unit'} defaultValue={product.productUnit} {...register('productUnit', {required: true})}/>
          </div>
        </div>
        <div className={'flex justify-around'}>
          <div>
            <label htmlFor="option">Tải lên ảnh?</label>
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
        <button onClick={handleSubmit(addHandler)}>Thêm sản phẩm</button>
      </div>
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