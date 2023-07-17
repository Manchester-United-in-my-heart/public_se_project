import {MongoClient} from "mongodb";

export default async function (req, res) {

  const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@office.9dnkbti.mongodb.net/seproject?retryWrites=true&w=majority`)

    const db = client.db()

    if (req.method === 'GET')
    {
      const collection = db.collection('cartpool')
      const cartId = req.query.cartId

      const result = await collection.findOne({cartId: cartId})

      res.status(200).json(
        {
          cart: result
        }
      )
    }

    if (req.method === 'POST'){
      const resBody = JSON.parse(req.body)

      const  collection = db.collection('customer')

      const result = await collection.findOne({email: resBody.email})


      if (result === null){
        await collection.insertOne(resBody)
        const addAccount = await collection.findOne({email: resBody.email})
        const cartCollection = db.collection('cartpool')
        await cartCollection.insertOne({cartId: addAccount._id.toString(), cart: {}})
        res.status(200).json(
          {
            mess: 'success'
          }
        )
      }
      else {
        res.status(200).json(
          {
            mess: 'same email existed'
          }
        )
      }
    }

    if (req.method === 'PATCH'){

      const collection = db.collection('cartpool')
      const cartId = req.query.cartId

      const resBody = JSON.parse(req.body)

      await collection.updateOne({cartId: cartId}, {$set: resBody})

      res.status(200).json(
        {
          mess: 'test'
        }
      )
    }

    await client.close()
}