import {Header, Footer, Loader} from './components/index'
import './App.css'
import { useEffect, useState } from 'react'
import {logIn, logOut} from './redux/authSlice'
import authService from './appwrite/auth'
import {useDispatch} from 'react-redux'
import { Outlet, useLocation} from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoggedin, setIsLoggedin] = useState(false)

  useEffect(()=>{
    authService.getUser()
    .then((userData)=>{
      if(userData) {
        dispatch(logIn({userData}));
        setIsLoggedin(true);
      }
      else dispatch(logOut());
    })
    .catch(()=> console.log('Sorry, No user found') )
    .finally(()=> setLoading(false) )
  },[])
  
  return !loading ? (
    <div className='sm:px-1 min-h-screen flex flex-wrap content-between items-center justify-center bg-black'>
      <div className='w-full block'>
        {
          location.pathname !== '/' || isLoggedin ? <Header /> : null
        }
        <hr />
        <main>
          <Outlet />
        </main>
        <hr className='mx-1' />
        {
          location.pathname !== '/' || isLoggedin ? <Footer /> : null
        }
      </div>
    </div>
  ) : ( <Loader /> )
  // ) : ( <h1>Loading...</h1> )
  
}

export default App


//   useEffect(() => {
//     const fetchUser = async () => {
//         try {
//             const userData = await authService.getUser();
//             if (userData) {
//                 dispatch(logIn({ userData }));
//             } else {
//                 dispatch(logOut());
//             }
//         } catch (error) {
//           console.error("Error fetching user:", error);
//           navigate('/signup')
//           dispatch(logOut());
//         } finally {
//             setLoading(false); // Stop loading
//         }
//     };
    
//     fetchUser();
// }, []);

// return !loading ? (
//     <>
//       <Header />
//       <h2>Hello Baka, ready for appwrite project🙃</h2>
//       <main >
//         <Outlet />
//       </main>
//       <Footer />
//     </>
//   ) : (
//         <h1>Loading...</h1>
//     );

    
    