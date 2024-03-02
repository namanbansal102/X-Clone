import axios from "axios";
import { prismaClient } from "../../clients/db";
import   JWTService  from "../services/jwt";
 const queries={
    verifyGoogleToken:async (parent:any,{token}:{token:string})=>{
        console.log("verifyGoogleToken is Running");
        
        const tokenInfo:string=token;
        console.log(tokenInfo);
        
        const googleAuthUrl=new URL("https://www.googleapis.com/oauth2/v3/tokeninfo");
        googleAuthUrl.searchParams.set("id_token",tokenInfo);
        const {data}=await axios.get(googleAuthUrl.toString(),{
            responseType:"json",
        });
        const user=await prismaClient.user.findUnique({
            where:{email:data.email}
        });
        if (!user) {
            await prismaClient.user.create({
                data:{
                    email:data.email,
                    firstName:data.given_name,
                    lastName:data.family_name,
                    profileImageUrl:data.picture
                }
            })
        }
        const userInDb=await prismaClient.user.findUnique({
            where:{email:data.email}
        })
        console.log("userInDb is::::::",userInDb);
        if (!userInDb) {
            throw new Error("Not Found");
            
        }
        const mytoken=JWTService.getService(userInDb?.email);
        return mytoken;
    }
 }
 export const resolvers={queries}