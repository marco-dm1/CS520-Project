import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import LoginPage from './pages/loginsignup';
import FormBuilder from './pages/FormBuilder';
import Profile from './pages/Profile';
import Welcome from './components/Welcome';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-none">
              <Welcome />
            </div>
            <div className="flex-1 overflow-auto">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create-survey" element={<FormBuilder />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
