export default function ShopHeader(props)
{
  const {logoUrl, logoSrc, productUrl, signOutHandler} = {...props}
  return(
    <div className={'w-full flex justify-around items-center'}>
      <a href={logoUrl} className={'px-4'}>
        <img src={logoSrc} alt="logo" className={'w-20 h-20'}/>
      </a>
      <div className={'flex items-center gap-12'}>
        <a href={productUrl} className={'hover:text-blue-600 transition-all duration-300'}>
          Product
        </a>
        <div className={'px-4 py-2 border-black rounded-2xl border-[1px] hover:bg-blue-600 transition-all duration-300'}>
          <button onClick={async ()=>{await signOutHandler()}}>Sign Out</button>
        </div>
      </div>

    </div>
  )
}