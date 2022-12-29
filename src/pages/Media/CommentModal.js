import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/AuthProvider';

const CommentModal = ({ id, setId }) => {
    const { user } = useContext(AuthContext);

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const com = form.com.value;
        const comment = {
            email,
            com,
            id
        }


        fetch('https://5000/comment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setId(null);
                    toast.success('Booking confirmed');
                }
                else {
                    toast.error(data.message);
                }
            })


    }


    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label onClick={() => setId(null)}
                        htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-3xl font-bold text-center text-sky-900">Add Your Comment</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input name="email" type="email" defaultValue={user.email} disabled placeholder="Email Address" className="input w-full input-bordered" />
                        <input name="com" type="text" placeholder="Write Your Comment" className="input w-full input-bordered" required />
                        <br />
                        <input className='btn btn-primary w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default CommentModal;