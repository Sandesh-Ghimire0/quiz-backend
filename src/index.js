import { app } from "./app.js";
import prisma from "./config/db.js";

await prisma.user.create({
  data: {
    name: 'sandesh',
    email: 'san@gmail.com',
    password: '1234567',
    role: 'USER',
  }
});


app.listen(process.env.PORT || 8000, ()=>{
    console.log("Server is running on Port ", process.env.PORT)
})