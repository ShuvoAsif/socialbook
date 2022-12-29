import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const NavBar = () => {

    const { user, logOut } = useContext(AuthContext);

    const { data: users = [] } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/oneuser?email=${user.email}`);
            const data = await res.json();
            return data;
        }
    })

    const about = users[0]
    console.log(about)
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    }




    return (
        <div>

            <div className="navbar py-5 bg-base-200">
                <div className="flex-1">
                    <Link to='/' className="btn btn-ghost normal-case text-3xl text-white">SocialBook</Link>
                </div>
                <div className="hidden lg:flex gap-2">
                    <div className="form-control">
                        <Link to='/' className='btn mr-5'>Home</Link>
                    </div>
                    <div className="form-control">
                        <Link to='/media' className='btn mr-5'>Media</Link>
                    </div>
                    <div className="form-control">
                        {user ? <Link to='/about' className='btn mr-5'>About</Link> : <></>}
                    </div>
                    <div className="form-control">
                        <Link to='/login' className='mr-5'>
                            {
                                user ?
                                    <li className="btn" onClick={handleLogOut}><Link to='/login'>Log out</Link></li>
                                    :
                                    <li className="btn"><Link to='/login'>Log in</Link></li>
                            }
                        </Link>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li> <Link to='/' className='btn mr-5'>Home</Link></li>
                        <li> <Link to='/media' className='btn mr-5'>Media</Link></li>
                        <li> <Link to='/about' className='btn mr-5'>About</Link></li>
                    </ul>
                </div>
                <div className="mr-5">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {user ? <img src={about?.image} alt='' /> : <></>}
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default NavBar;