import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const Addpost = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [Error, setError] = useState('');


    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const handlePost = (data) => {


        const image = data.image;
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    savePost(data.caption, imgData.data.url);
                }
            })
        console.log(data);
        setError('');
        toast('Your Post Uploaded Successfully.')
    }


    const savePost = (caption, image) => {
        const user = { caption, image };
        fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
            })

    }
    return (
        <div>
            <div className='h-[800px] flex justify-center items-center'>
                <div className='w-96 p-7'>
                    <h2 className='text-xl text-center'>Add A Post</h2>
                    <form onSubmit={handleSubmit(handlePost)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Caption</span></label>
                            <input type="text"
                                {...register("caption")}
                                className="input input-bordered w-full max-w-xs" />
                            {errors.email && <p className='text-red-700'>{errors.email?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Photo</span></label>
                            <input type="file" {...register("image")} className="input input-bordered w-full max-w-xs" />
                            {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                        </div>
                        <input className='btn w-full' value="Login" type="submit" />
                        <div>
                            {Error && <p className='text-red-700'>{Error}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Addpost;