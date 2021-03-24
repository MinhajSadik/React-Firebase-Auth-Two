import React from 'react';

const Facebook = () => {

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
    }

    const handleSubmit = () => {
        console.log('submit click');
    }
    return (
        <div>
            <h1>This Is Facebook Login</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" onBlur={handleChange} name="email" id="" placeholder="Write Your Email Address! " required />
                <br />
                <input type="password" onBlur={handleChange} name="password" id="" placeholder="Enter Your Password" required />
                <br />
                <input type="submit" value="Submit" />
            </form>
            
        </div>
    );
};

export default Facebook;