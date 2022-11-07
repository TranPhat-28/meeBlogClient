import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const Comment = () => {

    const history = useHistory()
    const {id} = useParams()
    const [ error, setError ] = useState(null)

    const submitComment = () => {
        var comment = document.getElementById('comment').value;
        if (comment === '') {
            window.alert('Fill in before submitting');
        }
        else{
            fetch(`https://mee-blog-server.herokuapp.com/blogs/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({comment: comment})
            }).then(() => {
                history.go(0)
            })
            .catch(e => {
                setError(e)
            })
        }
    }

    return(
        <div>
            <input className="form-control mb-2" placeholder="Leave your comment" id="comment"></input>
            <button className="btn btn-outline-primary" onClick={submitComment}>Submit</button>

            {error && <div>Cannot submit comment! Error: {error}</div>}
        </div>
    );
}

export default Comment;