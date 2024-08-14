
import './App.css';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import OpenRoute from './components/core/Auth/OpenRoute';
import { Route , Routes } from 'react-router-dom';

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-700 flex flex-col font-inter">

      
      <Routes>
        <Route path='/' element={<Login  />} />


        <Route path='verify-email'
      element={
        <OpenRoute>
          {/* <VerifyEmail /> */}
        </OpenRoute>
      } />

      </Routes>
      
    
      
    </div>
  );
}

export default App;