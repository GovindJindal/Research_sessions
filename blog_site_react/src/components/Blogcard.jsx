import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card" style={{ border: '1px solid #ddd', padding: '20px', margin: '10px 0', borderRadius: '8px' }}>
      
      <h3>{blog.title}</h3>
      <small style={{ color: '#666' }}>{blog.date} | By {blog.author}</small>
      <p>{blog.summary}</p>

      <Link to={`/blog/${blog.id}`} className="read-more-btn">
        Read More →
      </Link>
      
    </div>
  );
};

export default BlogCard;