import {logOut} from '../../redux/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom'

function LogoutBtn(){
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return <button 
    className='mx-4 px-8 py-4 duration-1000 bg-transparent hover:bg-blue-500 rounded-full text-xl'
    onClick={ () => authService.logOut().then(
        () => { dispatch( logOut() )
            window.location.reload()
        }
        
     ) }>Logout</button>;
}

export default LogoutBtn