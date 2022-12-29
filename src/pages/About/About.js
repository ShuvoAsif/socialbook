import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const About = () => {
    const { user } = useContext(AuthContext);

    const { data: users = [] } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000//oneuser?email=${user.email}`);
            const data = await res.json();
            return data;
        }
    })

    const about = users[0]
    console.log(about)
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={about?.image ? about.image : <></>} className="max-w-sm rounded-lg shadow-2xl" alt='' />
                    <div>
                        <h1 className="text-5xl font-bold">Name: {about?.name ? about.name : <>registered without name</>}</h1>
                        <p className="py-6 text-3xl">Email: {user.email}</p>
                        <p className="py-6 text-3xl">University: {about?.university ? about.university : <>unknown</>}</p>
                        <p className="py-6 text-3xl">Address: {about?.address ? about.address : <>unknown</>}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;