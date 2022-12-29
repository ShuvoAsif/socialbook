import React from 'react';

const Postcard = ({ post }) => {

    const { name, caption, img } = post;

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold  text-black">{name}</h2>
                    <p className='text-3xl text-white'>{caption ? caption : <></>}</p>
                </div>
                <figure><img src={img ? img : <></>} alt="" /></figure>
                <div className="card-actions justify-around">
                    <button className="btn btn-primary">Like</button>
                    <button className="btn btn-primary">Comment</button>
                    <button className="btn btn-primary">Details</button>
                </div>
            </div>
        </div>
    );
};

export default Postcard;