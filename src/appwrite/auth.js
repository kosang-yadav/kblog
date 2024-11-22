import config from "../config/config";
import { Client, Account, ID } from "appwrite"

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.account = new Account(this.client)
    }
    
    async OTPsend({userId, email}){
        try {
            return await this.account.createEmailToken(userId, email);
        } catch (error) {
            throw error;
        }
    }

    async OTPverify({userId, secret, email, password}){
        try {
            const verified = this.account.updateVerification(userId, secret);
            console.log(verified)
            if (verified) return await this.logIn({email, password});
        } catch (error) {
            throw error;
        }
    }

    async createAccount({email, password, name}){
        try{
                // Email Password Method
            // const userAccount = await this.account.create(ID.unique(), email, password, name );
            // if(userAccount){
            //     return this.logIn({email, password})
            // } else {
            //     return userAccount;
            // }
            
                // Email OTP Method

                //otp verifies
            const userId = ID.unique()
            const userAccount = await this.account.create(userId, email, password, name );
            if (userAccount) {
                await this.OTPsend({ userId, email });
                return userAccount;
            }

            // const verified = this.OTPverify({userId, secret});
            // if(verified) {
            //     console.log(userId)
            //     if(deleted) {
            //         console.log("deleted")
            //         console.log("created")
            //     }
            // }
        } catch(error){
            throw error;
        }
    }
        

    async logIn({email, password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        } catch(error) {
            console.error("Error during login : ", error);
            throw error;
        }
    }

    async getUser(){
        try{
            return await this.account.get();
        } catch(error) {
            console.log(" Appwwrite :: getUser :: error ", error)
        }
        return null;
    }
    
    async logOut(){
        try{
            return await this.account.deleteSessions();
        } catch(error){
            console.log(" Appwwrite :: logOut :: error ", error);
        }
    }
}


const authService = new AuthService();

export default authService