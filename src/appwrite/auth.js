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
    
    // async OTPsend({userId, email}){
    //     try {
    //         return await this.account.createEmailToken(userId, email);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // async OTPverify({userId, secret, email, password}){
    //     try {
    //         return await this.account.createSession(userId, secret);
    //         // const tempSession = await this.account.createSession(userId, secret);
    //         // if(tempSession){
    //         //     console.log("otp verified and session created")
    //         //     const noSession = await this.logOut();
    //         //     if (noSession) console.log("session deleted");
    //         //     if (noSession) return this.logIn( { email, password } );
    //         // } else {
    //         //     console.log(" Please Input a Email or OTP, you fool", secret);
    //         // }

    //         // .then( () =>  )
    //         // .catch( () => 
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    async createAccount({email, password, name}){
        try{
                // Email Password Method
            // const userAccount = await this.account.create(ID.unique(), email, password, name );
            // if(userAccount){
            //     return this.logIn({email, password})
            // } else {
            //     return userAccount;
            // }
            


            const userAccount = await this.account.create(ID.unique(), email, password, name );
            if (userAccount) return await this.logIn({email, password});

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
            return false;
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