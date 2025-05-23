import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import authService from "../appwrite/auth"
import { logIn as authlogIn } from "../redux/authSlice"
import { Button, Input, Logo, Loader} from "./index"


function Login(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading,setLoading] = useState(false)
    const {register, handleSubmit} = useForm()

    const login = async(data) => {
        setLoading(true);
        setError("");
        try {
            const session = await authService.logIn(data);
            if(session){
                const userData = await authService.getUser();
                if(userData){
                    dispatch(authlogIn(userData));
                    navigate("/");
                    window.location.reload();
                }
            } else setError("Please Enter Valid Credentials...")
            setLoading(false);
        } catch (error) {
            setError(error.message)
        }
    }
    return !loading ? (
        <div className='flex items-center justify-center w-full px-2' >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-black">Log in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-5 text-black">
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

                        <Button type="submit" className="w-full bg-blue-500"> LogIn here </Button>
                    </div>
                </form>
            </div>
        </div>
    ) : ( <Loader /> )

}

export default Login