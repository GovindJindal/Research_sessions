import { blogs } from '../blogdata';
import BlogCard from './BlogCard';

const BlogList = () => {
  return (
    <div className="blog-list-container">
      
      <h1>Latest Posts</h1>
      <div className="blog-grid">

        {blogs.map((blog) => (
          <BlogCard 
            key={blog.id} 
            blog={blog}    
          />
          
        ))}
      </div>

    </div>
  );
};

export default BlogList;