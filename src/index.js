import { app } from "./app.js";
import prisma from "./config/db.js";

// await prisma.user.create({
//   data: {
//     name: 'sandesh',
//     email: 'san@gmail.com',
//     password: '1234567',
//     role: 'USER',
//   }
// });

// const user = await prisma.user.findMany({
//     where:{name:'sandesh'}
// })
// console.log(user)

// await prisma.user.create({
//   data: {
//     name: 'Admin User',
//     email: 'admin@gmail.com',
//     password: 'securepassword',
//     role: 'ADMIN',
//     questions: {
//       create: [
//         {
//           title: 'What is 2 + 2?',
//           answer: '4',
//           options: {
//             create: [
//               { text: '3' },
//               { text: '4' },
//               { text: '5' },
//             ],
//           },
//         },
//       ],
//     },
//   },
// });




app.listen(process.env.PORT || 8000, ()=>{
    console.log("Server is running on Port ", process.env.PORT)
})