import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import authService from "../appwrite/auth"
import { logIn as authlogIn } from "../redux/authSlice"
import { Button, Input, Logo, Loader} from "./index"

function SignUp(){
    const [loading,setLoading]=useState(false);
    const [userId,setuserId]=useState("");
    const [OTPtime,setOTPtime]=useState(false);
    const [createtime,setcreatetime]=useState(true);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const {register, handleSubmit, getValues} = useForm()

    const create = async(data) => {

        setLoading(true);
        setError("")
        
        try {
            const someData = await authService.createAccount({...data});
            
            if(someData){
                setuserId(someData.$id);
                
                setcreatetime(false);
                setOTPtime(true);
                setLoading(false);
                
                // navigate("/");
                // window.location.reload()
            }
        } catch (error) {
            setError(error.message)
            throw(error)
        }
    }
    
    const otpHandler = async(data) =>{
        try {
            setLoading(true);
            const OTP = getValues("OTP")
            const verifyotp = await authService.OTPverify({userId, ...data, secret:OTP})
            if(verifyotp) {
                const userData = await authService.getUser();
                if(userData) dispatch(authlogIn(userData)); //971046
                setLoading(false)
                // navigate("/");
                window.location.reload();
            }
        } catch (error) {
            setError(error.message)
            throw(error) 
        }
    }
    // const otpHandler = async(Email) =>{
    //     try {
    //         const getotp = await authService.OTPsend(Email);
    //         if(getotp) {
    //             const id = getotp.userId;
    //             setUserID(id);
    //         }
    //     } catch (error) {
    //         setError(error.message)
    //         throw(error) 
    //     }
    // }

    return !loading ? (
        <div className="flex items-center justify-center px-2">
            <div className={`mx-auto  w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-black">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                
                <form onSubmit={ (createtime) ? (handleSubmit(create)) : (handleSubmit(otpHandler))}>
                    <div className="space-y-5 text-black">
                    { createtime && <div className="space-y-5 capsule"> 
                    <Input
                        label = "Name : "
                        type = "text"
                        placeholder = "Enter your full name "
                        {...register("name",{
                            required : true
                        })}
                        />

                        <Input
                        label = "Email : "
                        placeholder = "Enter your Email"
                        type = "email"
                        {...register("email",{
                            required : true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />

                        <Input
                        label = "Password : "
                        type = "password"
                        placeholder = "enter your password"
                        {...register("password",{
                            required : true
                        })}
                        />


                        <Button type="submit" className="w-full bg-blue-500"> Create Account </Button>
                        </div>
                        }

                        {/* <Button type="button" onClick = { () => { 
                            const Email = getValues("email")
                            otpHandler(Email)
                             } } > Get OTP </Button> */}

                        { OTPtime && <div className="space-y-5">
                            <Input
                            label = "OTP : "
                            type = "text"
                            placeholder = " enter the OTP"
                            {...register("OTP",{
                                required : true 
                            })}
                            />
                            <Button type="submit" className="w-full bg-blue-500" 
                            // onClick = { () => { 
                            //     const OTP = getValues("OTP");
                            //     const email = getValues("email");
                            //     const password = getValues("password");
                            //     otpHandler(OTP, email, password) } } 
                            >Verify OTP </Button>
                        </div>
                        }
                    </div>
                </form>
            </div>
        </div>
    ) : (<Loader/>)
}

export default SignUp