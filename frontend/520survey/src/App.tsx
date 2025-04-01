
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import LoginPage from './pages/loginsignup'; // Assuming loginsignup.tsx is in a 'pages' folder

function App() {
  return (
    <>
      <Router>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />

            <Routes>
              <Route path="/frontend/520survey/src/pages/loginsignup.tsx" element={<LoginPage />} />
              {/* Add other routes here */}
            </Routes>
          </div>
      </Router>
    </>
  );
}

export default App;