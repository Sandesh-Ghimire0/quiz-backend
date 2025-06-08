import { app } from "./app.js";
import prisma from "./config/db.js";


// await prisma.user.create({
//   data: {
//     name: 'admin1',
//     email: 'admin1@exp.com',
//     password: 'sandesh123',
//     role: 'ADMIN',
//   },
// });



app.listen(process.env.PORT || 8000, ()=>{
    console.log("Server is running on Port ", process.env.PORT)
})