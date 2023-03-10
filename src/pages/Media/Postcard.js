import React from 'react';
import { Link } from 'react-router-dom';

const Postcard = ({ post, setId, islikes }) => {

    const { _id, name, caption, img } = post;


    return (
        <div className='py-5 pl-3'>
            <div className="card w-96 bg-sky-700 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold  text-black">{name}</h2>
                    <p className='text-3xl text-white'>{caption ? caption : <></>}</p>
                </div>
                <figure><img src={img ? img : <></>} alt="" /></figure>
                <div className="card-actions justify-around py-3">
                    {islikes?.liked === false ? <button className="btn btn-primary font-bold">Like</button> : <></>}
                    {islikes?.liked === true ? <button className="btn btn-primary font-bold">Liked</button> : <></>}
                    <label
                        onClick={() => setId(_id)}
                        htmlFor="booking-modal"
                        className="btn btn-primary font-bold"
                    >Comment</label>
                    <Link to={`/details/${_id}`} className="btn btn-primary font-bold">Details</Link>
                </div>
            </div>
        </div>
    );
};

export default Postcard;