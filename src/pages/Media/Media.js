import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import PrivateRoute from '../../PrivateRoute/PrivateRoute';
import CommentModal from './CommentModal';
import Postcard from './Postcard';

const Media = () => {
    const [id, setId] = useState(null);

    const { data: posts = [] } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/posts');
            const data = await res.json();
            return data;
        }
    });

    return (
        <section>
            <div className='grid mt-8 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    posts.map(post => <Postcard
                        key={post._id}
                        post={post}
                        setId={setId}
                    ></Postcard>)
                }
            </div>
            {
                id &&
                <PrivateRoute>
                    <CommentModal
                        setId={setId}
                    ></CommentModal>
                </PrivateRoute>
            }
        </section>
    );
};

export default Media;