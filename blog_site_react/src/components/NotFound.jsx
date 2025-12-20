import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist.</p>

      <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;