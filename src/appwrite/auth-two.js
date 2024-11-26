import config from "../config/config";
// import {Client, Users } from "appwrite"


const sdk = require('node-appwrite');


const userID = "67459db3001ef3cdfe37"
const topicID = ["674452f0003e315859f1"]
const lastEmail = "tomail@gmail.com"



const createContent = () => {
    //creates OTP
    const OTP = Math.floor( 100000 + Math.random()*900000 );
    //creates content to Email
    const content = `Your OTP is ${OTP}.  It will expire in 5 minutes.`;
    return ({OTP, content});
};


export class AuthTwoService {
    client = new sdk.Client();
    users;
    
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        .setKey(config.appwriteApiKey)
        
        this.users = new sdk.Users(this.client)
    }

    // main function   updateEmail --> sends OTP to email --> returns OTP...
    
    
    async newEmail({email}){
        try {
            return await this.users.updateEmail(userID, email);
        } catch (error) {
            console.log("AppWrite :: updateEmail :: error ", error);
            return false;
        }
    }
    
    
    async sendOTP(){
        try {
            const {OTP, content} = createContent();
            const messaging = new sdk.Messaging(this.client);

            await messaging.createEmail(sdk.ID.unique(), 'Your OTP for Verification', content, topicID );

            return OTP;
        } catch (error) {
            console.log("AppWrite :: sendOTP :: error ", error);
        }
    }
    
    async getOTP({email}){
        try {
            const changeEmail = await this.newEmail({email});
            if(changeEmail){
                const OTP = await this.sendOTP();
                if (OTP) this.newEmail({email : lastEmail});
                return OTP;
            }
            else return email;
            
        } catch (error) {
            console.log("AppWrite :: getOTP :: error ", error);
            
        }
    }

}



const authTwoService = new AuthTwoService();

export default authTwoService




// async tempOp(){
//     const users = await this.users.list(
//         [sdk.Query.equal('email', ["lightnoob2001@gmail.com"])]
//     );
//     console.log(users);
//     return users;
// }

// async createAdmin(){
    //     const Admin = await this.users.createSession(userId);

    // } 

    // async deleteTarget(){
        //     try {
            //         await this.users.deleteTarget( userId, targetID);
            //     } catch (error) {
                //         throw error;
                //     }
                // }
    
    // async addTarget({email}){
    //     console.log(targetID)
    //     try {
            // const deletedTarget = await this.deleteTarget();
            // if (deletedTarget) {
                // const target = await this.users.createTarget(userId, targetID, sdk.MessagingProviderType.Email, email);
                // if(target){
                //     console.log("target added : ", target)
                    // const OTP = await this.sendEmail(["6743c620000328fa3e29"]);
                    // console.log(OTP);
                    // return OTP;
                // }
            // }    
        // } catch (error) {
        //     throw error;
        // }
    // }