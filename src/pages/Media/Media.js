import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import PrivateRoute from '../../PrivateRoute/PrivateRoute';
import CommentModal from './CommentModal';
import Postcard from './Postcard';

const Media = () => {
    const [id, setId] = useState(null);
    const { user } = useContext(AuthContext);

    const { data: posts = [] } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('https://socialbook-server.vercel.app/posts');
            const data = await res.json();
            return data;
        }
    });
    const mail = user?.email
    const { data: users = [], refetch } = useQuery({
        queryKey: ['mail', mail],
        queryFn: async (user) => {
            const res = await fetch(`https://socialbook-server.vercel.app/islike?email=${mail}`);
            const data = await res.json();
            return data;
        }
    })
    console.log(users)
    const islikes = users[0]
    console.log(islikes)
    refetch(user);

    return (
        <section>
            <div className='grid mt-8 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    posts.map(post => <Postcard
                        key={post._id}
                        islikes={islikes}
                        post={post}
                        setId={setId}
                    ></Postcard>)
                }
            </div>
            {
                id &&
                <PrivateRoute>
                    <CommentModal
                        id={id}
                        setId={setId}
                    ></CommentModal>
                </PrivateRoute>
            }
        </section>
    );
};

export default Media;