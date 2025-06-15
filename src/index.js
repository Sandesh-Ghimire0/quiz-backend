import { app } from "./app.js";
import prisma from "./config/db.js";





app.listen(process.env.PORT || 8000, ()=>{
    console.log("Server is running on Port ", process.env.PORT)
})