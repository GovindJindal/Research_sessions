import { useParams, Link } from 'react-router-dom';
import { blogs } from '../blogdata';

const BlogPost = () => {
  const { id } = useParams();
  const post = blogs.find((b) => b.id === parseInt(id));

  if (!post) {
    return (
      <div className="post-not-found">
        <h2>Post not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <Link to="/" className="back-link">← Back to Home</Link>

      <article>
        <h1>{post.title}</h1>
        <div className="post-meta" style={{ color: '#666', marginBottom: '20px' }}>
          <span>Written by {post.author}</span> | <span>{post.date}</span>
        </div>
        
        <div className="post-content">
          <p>{post.content}</p>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;