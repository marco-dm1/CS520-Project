import { useState, useEffect } from 'react';
import { Layout, List, User, PlusCircle, AlignJustify } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userName, setUserName] = useState('Not Logged In');
  const location = useLocation();

  useEffect(() => {
    // Check localStorage for user info on component mount
    const accountInfo = localStorage.getItem('accountInfo');
    if (accountInfo) {
      const { fullName } = JSON.parse(accountInfo);
      setUserName(fullName);
    }
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    {
      name: 'Create Survey',
      icon: <PlusCircle className="w-5 h-5 mr-2" />,
      path: '/create-survey',
    },
    {
      name: 'Login',
      icon: <User className="w-5 h-5 mr-2" />,
      path: '/login',
    },
  ];

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-64';
  const textVisibility = isCollapsed ? 'hidden' : 'block';

  return (
    <div
      className={`bg-gray-900 text-gray-300 h-screen sticky top-0 transition-all duration-300 ease-in-out ${sidebarWidth}`}
    >
      {/* Collapse Button */}
      <button
        onClick={toggleCollapse}
        className="absolute top-4 right-[-1rem] bg-gray-800 text-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-gray-600 p-1"
      >
        <AlignJustify className={`w-5 h-5 transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Logo Area */}
      <div className={`flex items-center justify-center p-4 ${!isCollapsed && 'mb-8'}`}>
        <span className={`text-xl font-semibold ${textVisibility}`}>FormEase</span>
        {isCollapsed && <Layout className="w-8 h-8" />}
      </div>

      {/* Navigation Items */}
      <nav className="p-4">
        <List className={`text-gray-500 mb-2 ${textVisibility}`}>Menu</List>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                to={item.path}
                className={`flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors duration-200 ${
                  location.pathname === item.path ? 'bg-gray-800 text-white' : ''
                }`}
              >
                {item.icon}
                <span className={`${textVisibility}`}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Optional Bottom Section */}
      <div className={`p-4 mt-auto ${textVisibility}`}>
        <hr className="border-gray-800 mb-2" />
        <div className="flex items-center">
          <User className="w-6 h-6 mr-2" />
<<<<<<< Updated upstream
          <span>User Name</span>
=======
          <span>{userName}</span>
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
};

export default Sidebar;