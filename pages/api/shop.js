import {MongoClient, ObjectId} from "mongodb";

export default async function (req,res){
  if (req.method === 'GET')
  {
    const shopId = req.query.shopId

    const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@office.9dnkbti.mongodb.net/seproject?retryWrites=true&w=majority`)


    const db = client.db()

    let collection = db.collection('productpool')

    const productList = await collection.find({shopId: shopId}).toArray()

    collection = db.collection('shop')

    const shop = await collection.findOne({_id: new ObjectId(shopId)})

    await client.close()

    res.status(200).json(
      {
        productList: productList,
        shopName: shop.name
      }
    )
  }
}