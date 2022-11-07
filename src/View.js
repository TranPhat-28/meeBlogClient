import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Comment from "./Comment";
import CommentList from "./CommentList";

const View = () => {
    const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState(null);
    const [ error, setError] = useState(null);
    const { id } = useParams();

    const history = useHistory();

    // Fetch the blog
    useEffect(() => {
        fetch(`https://mee-blog-server.herokuapp.com/view/${id}`)
        .then(res => { 
            if (!res.ok) {throw 'Cannot fetch data'}
            return res.json()})
        .then(data => {
            setLoading(false)
            if(data === null){
                setError('We cannot find the blog you requested')
                setLoading(false)
                setData(null)
            }
            else{
                setLoading(false)
                setError(false)
                setData(data)
            }
        })
        .catch(e => {
            setError(e)
            setLoading(false)
        })
    }, [])

    // Help format date
    const formatDate = (date) => {
        const mydate = new Date(date);
        
        const day = mydate.getDate(); //Date of the month: 2 in our example
        const month = mydate.getMonth(); //Month of the Year: 0-based index, so 1 in our example
        const year = mydate.getFullYear();

        return(day + '/' + month + '/' + year);
    }

    // Handle delete
    const handleDelete = () => {
        fetch(`https://mee-blog-server.herokuapp.com/blogs/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            history.push('/');
        })
        .catch(e => {
            setError(e)
        })
    }

    return(
        <div>
            { error && <div>Error: {error}</div>}
            { loading && <div>Loading content...</div> }
            { data && (
                <div>
                    <h2 className="mt-3">{data.title}</h2>
                    <p className="m-0">Author: {data.author}</p>
                    <p className="m-0">Posted on: {formatDate(data.datePosted)}</p>
                    <p className="mt-3">{data.content}</p>

                    <button className="btn btn-primary mb-5" onClick={handleDelete}>Delete this blog</button>

                    <Comment />
                    <br></br><br></br>
                    <CommentList />
                </div>
            )}
        </div>
    )
}

export default View;