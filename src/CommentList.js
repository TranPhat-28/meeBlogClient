import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CommentList = () => {

    const {id} = useParams();
    const [ commentList, setCommentList ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loadingComment, setLoadingComment ] = useState(true);

    const [ page, setPage ] = useState(1);

    useEffect(() => {
        fetch(`https://mee-blog-server.herokuapp.com/comments/${id}/${page}`)
        .then(res => {
            if (!res.ok) {throw 'Cannot fetch comment'}
            return res.json()
        })
        .then(data => {
            if (data.length === 0){
                setCommentList(['No comment'])
            }
            else {
                setCommentList(data)
            }
            setLoadingComment(false)
        })
        .catch(e => {
            setLoadingComment(false)
            setError(e)
            setCommentList(null)
        })
    }, [page, commentList])

    const nextPage = () => {
        setPage(page + 1)
    }
    


    return(
        <div>
            { loadingComment && <div>Loading comments...</div>}
            { error && <div>Error: {error}</div>}
            { commentList && 
            <div>
                <ul className="list-group mb-2">
                    {commentList.map(item => (
                        <li className="list-group-item">{item}</li>
                    ))}
                </ul>

                <button className="btn btn-outline-primary" onClick={nextPage}>More comment</button>
            </div>
            }
        </div>
    );
}

export default CommentList;