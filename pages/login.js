import {getSession,signIn} from "next-auth/react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {redirect} from "next/navigation";

export default function ()
{
  const {register,handleSubmit} = useForm()
  const router = useRouter()
  const onSubmit = async (data) =>
  {
    const status =  await signIn('credentials',
        {
          redirect: false,
          email: data.email,
          password: data.password,
          role: data.role,
          callbackUrl: "http://localhost:3000"
        })

    if (!status.ok)
    {
      console.log(status.error)
    } else
    {
      await router.push(status.url)
    }
  }

 return (
   <>
     <form onSubmit={handleSubmit(onSubmit)}>
       <div>
          <input type={'text'} className={'border-2'} {...register('email')}/>
       </div>
       <div>
         <input type={'password'} className={'border-2'} {...register('password')}/>
       </div>
       <div>
         <select {...register('role')}>
           <option value={'customer'}>Customer</option>
           <option value={'admin'}>Admin</option>
           <option value={'shop'}>Shop</option>
         </select>
       </div>
       <div>
         <input type={'submit'}/>
       </div>
     </form>
   </>
 )
}

export async function getServerSideProps({req}){
  const session = await getSession({req})

  if (session) {
    return {
      redirect:{
        destination: 'http://localhost:3000',
        permanent: true
      }
    }
  }

  return {
    props: {}
  }

}