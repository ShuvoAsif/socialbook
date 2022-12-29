import React from 'react';

const Comments = ({ props }) => {
    console.log(props)
    return (
        <div>
            <h1>{props}</h1>
        </div>
    );
};

export default Comments;