import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Postcard from './Postcard';

const Media = () => {

    const { data: posts = [] } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/posts');
            const data = await res.json();
            return data;
        }
    });

    return (
        <div className='grid mt-8 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                posts.map(post => <Postcard
                    key={post._id}
                    post={post}
                ></Postcard>)
            }
        </div>
    );
};

export default Media;