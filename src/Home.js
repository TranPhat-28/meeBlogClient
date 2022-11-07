import { useState, useEffect } from "react";
import BlogList from './BlogList';

const Home = () => {

    // Data, error, loading
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    // Fetch blogs initially
    /*
    useEffect(() => {
        fetch('/blogs')
        .then(res => {
            // Other error
            if (!res.ok) { throw 'Something went wrong' }
            return res.json()
        })
        .then(data => {
            setLoading(false)
            setData(data)
        })
        .catch(e => {
            // Network error
            console.log(e.message)
            setLoading(false)
            setError(e)
        })
    }, []);
    */

    useEffect(() => {
        fetch('https://mee-blog-server.herokuapp.com/blogs')
        .then(res => {
            // Other error
            if (!res.ok) { throw 'Something went wrong' }
            return res.json()
        })
        .then(data => {
            //console.log(data)
            setData(data)
            setLoading(false)
            setError(false)
        })
        .catch(e => {
            // Network error
            console.log(e.message)
            setLoading(false)
            setError(e)
        })
    }, []);

    return(
        <div>
            <h1>Welcome to MeeBlog</h1>
            {loading && <p>Loading blogs...</p>}
            {data && <BlogList blogs={data}/>}
        </div>
    );
}

export default Home;