import Bill from "@/components/bill";
export default function BillFragment(props)
{
  const {billList, fulfillHandler, setIsCartModalOn, setCartModalProps} = {...props}

  return(
    <>
      <div className={'flex justify-center text-2xl font-bold mb-10'}>
        Danh sách đơn hàng
      </div>
      <div className={'flex gap-4 flex-wrap mb-10'}>
        {billList.map(bill => (
          <div key={bill._id}>
            <Bill cart={bill.cart} customerEmail={bill.customerEmail} address={bill.address} phone={bill.phone} totalPaid={bill.totalPaid} isFulfilled={bill.isFulfilled} fulfillTrigger={async ()=>{await fulfillHandler(bill._id)}} setIsCartModalOn={setIsCartModalOn} setCartModalProps={setCartModalProps} />
          </div>
        ))}
      </div>
    </>
  )
}