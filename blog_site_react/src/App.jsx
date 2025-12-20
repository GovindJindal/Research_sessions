import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import BlogList from './components/BlogList.jsx'
import BlogPost from './components/BlogPost.jsx'
import NotFound from './components/NotFound.jsx'
import './App.css'

function App() {
  return (
    <>
      <div className="app-container">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App