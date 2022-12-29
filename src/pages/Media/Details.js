import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Details = () => {
    const detail = useLoaderData();
    const { name, caption, img, likes, comments } = detail;

    console.log(name)

    return (
        <div>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src={img} className="w-80 " alt="Album" /></figure>
                <div className="card-body">
                    <h2 className="card-title font-bold">User: {name}</h2>
                    <p className='font-bold'>Caption: {caption}</p>
                    <p className='font-bold'>Total Liked:{likes.length}</p>
                    <div className='font-bold'>Likes:
                        {
                            likes.map((like, i) => <h1>{i + 1}:{like}</h1>)
                        }
                    </div>
                    <div className='font-bold'>Comments:
                        {
                            comments.map(({ mail, comment }) => <div><h1>Mail:{mail}</h1>
                                <p>{comment}</p></div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;