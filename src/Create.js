import { useHistory } from 'react-router-dom';

const Create = () => {

    // useHistory for redirecting
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();
        const newBlog = { 
            title: document.querySelector('[name="title"]').value,
            author: document.querySelector('[name="author"]').value,
            content: document.querySelector('[name="content"]').value };

        fetch('https://mee-blog-server.herokuapp.com/blogs', {
            method: 'POST',
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(newBlog)
        })
        .then(() => {
            history.push('/');
        })
        .catch(e => {
            console.log(e.message);
        })
    }

    return(
        <div>
            <h2 className="mt-3">Post a new blog</h2>
            <form className="mt-4" onSubmit={handleSubmit}>
                <label className="form-label m-0">Title</label>
                <input 
                    type='text' 
                    className="form-control" 
                    name='title' 
                    placeholder='An interesting title' 
                    required></input><br></br>

                <label className="form-label m-0">Author</label>
                <input 
                    type='text' 
                    className="form-control" 
                    name='author' 
                    placeholder='The author name' 
                    required></input><br></br>

                <label className="form-label m-0">Content</label>
                <textarea 
                    className="form-control" 
                    name='content' 
                    rows='7' 
                    required></textarea><br></br>

                <input type='submit' value='Post' className="btn btn-primary"></input>
            </form>
        </div>
    )
}

export default Create;