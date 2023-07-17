import NextAuth from "next-auth";
import {MongoClient} from "mongodb";
import Credentials from "next-auth/providers/credentials"


export default NextAuth({
  providers: [
    Credentials(
      {
        name: "Credential",
        async authorize(credentials, req){

          let result = undefined

          const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@office.9dnkbti.mongodb.net/seproject?retryWrites=true&w=majority`)

          const db = client.db()

          if (credentials.role === "admin")
          {
            const collection = db.collection('admin')
            const foundItem =await collection.findOne({email: credentials.email, password: credentials.password})
            if (foundItem)
            {
              result = {...foundItem, role: "admin"}
            }
            else {
              throw new Error("Can't find admin account")
            }
          } else if (credentials.role === "shop")
          {
            const collection = db.collection('shop')
            const foundItem =await collection.findOne({email: credentials.email, password: credentials.password})
            if (foundItem)
            {
              result = {...foundItem, role: "shop"}
            }
            else {
              throw new Error("Can't find shop account")
            }
          } else if (credentials.role === "customer")
          {
            const collection = db.collection('customer')
            const foundItem =await collection.findOne({email: credentials.email, password: credentials.password})
            if (foundItem)
            {
              result = {...foundItem, role: "customer"}
            }
            else {
              throw new Error("Can't find customer account")
            }
          }
          await client.close()

          return result
        }
      },
    )
  ],
  secret: process.env.SECRET,
  callbacks : {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.user = user
      }
      return token;
    },

    async session ({session, token})
    {
      session.dispatchToken = token
      return session
    }
  }
})