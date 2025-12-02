import { app } from "./app.js";
import prisma from "./config/db.js";



// await prisma.user.create({
//     data: {
//         name: "admin",
//         email: "admin@exp.com",
//         password: "admin", 
//         role: "ADMIN",
//     },
// });

app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running on Port ", process.env.PORT)
})