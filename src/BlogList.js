import { Link } from 'react-router-dom';

const BlogList = (props) => {

    const blogs = props.blogs;

    // Help format date
    const formatDate = (date) => {
        const mydate = new Date(date);
        
        const day = mydate.getDate(); //Date of the month: 2 in our example
        const month = mydate.getMonth(); //Month of the Year: 0-based index, so 1 in our example
        const year = mydate.getFullYear();

        return(day + '/' + month + '/' + year);
    }

    return (
        <div>
            {
                blogs.map(item => (
                    <div key={item._id} className='blog-preview p-2 m-3 rounded'>
                        <Link to={`/view/${item._id}`}>
                            <h4 className="m-0 fw-bold">{item.title}</h4>
                            <p className="m-0">Author: {item.author}</p>
                            <p className="m-0">Posted on: {formatDate(item.datePosted)}</p>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
}

export default BlogList;