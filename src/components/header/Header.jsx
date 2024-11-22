import { useSelector } from "react-redux"
import { Logo, Container, LogoutBtn} from "../index"
import { Link, useNavigate } from "react-router-dom"

export default function Header(){

    const authStatus = useSelector((state)=> (state.status))

    const Navigate = useNavigate()

    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
        },
        {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
        },
        {
          name: "All Posts",
          slug: "/all-posts",
          active: authStatus,
        },
        {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
        }
    ]
    return (
        <header className="py-3 shadow bg-black">
            <Container>
                <nav className="flex justify-between flex-row ">
                    <div className="mx-2 my-auto min-w-[101px]">
                        <Link to="/">
                            <Logo width="101px" height='101px'/>
                        </Link>
                    </div>
                    <ul className='flex flex-wrap items-right flex-col sm:flex-row sm:justify-between ' >
                        {
                            navItems.map((item) => (
                                item.active ? ( <li key={item.name} >
                                    <button
                                    onClick={ () => Navigate(item.slug) }
                                    className= 'mx-4 px-8 py-4 duration-1000 bg-transparent hover:bg-blue-500 rounded-full text-xl '
                                    > {item.name}
                                    </button>
                                    </li> ) : null
                            )
                        )}
                        {authStatus && (<li> <LogoutBtn /> </li>)}
                    </ul >
                </nav>
            </Container>
        </header>
    )
}