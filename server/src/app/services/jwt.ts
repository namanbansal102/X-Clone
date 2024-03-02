import { prismaClient } from "../../clients/db";

const JWT=require('jsonwebtoken');
// import JWT from "jsonwebtoken";
class JWTService{

    public static async getService(userId:string){
        console.log("Get Service Function is Running");
        
        console.log(userId);
        const user=await prismaClient.user.findUnique({
            where:{id:userId}
        })
        const payload={
            id:user?.id,
            email:user?.email
        }
        const jwtToken=JWT.sign(payload,"salt123343nama");
        return jwtToken;

    
        
        
    }
}
export default JWTService