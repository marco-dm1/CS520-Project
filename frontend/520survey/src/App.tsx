import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import LoginPage from './pages/loginsignup'; // Assuming loginsignup.tsx is in a 'pages' folder
import FormBuilder from './pages/FormBuilder';

function App() {
  return (
    <>
      <Router>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/frontend/520survey/src/pages/loginsignup.tsx" element={<LoginPage />} />
              <Route path="/create-survey" element={<FormBuilder />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;