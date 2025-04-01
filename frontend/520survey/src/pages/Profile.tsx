import { useState, useEffect } from 'react';
import { User, Mail, Calendar, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    fullName: '',
    email: '',
    joinDate: new Date().toLocaleDateString()
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('userProfile');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserProfile({
        ...userData,
        joinDate: userData.joinDate || new Date().toLocaleDateString()
      });
      setEditedName(userData.fullName);
    } else {
      // If no user profile exists, redirect to login
      navigate('/frontend/520survey/src/pages/loginsignup.tsx');
    }
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedProfile = {
      ...userProfile,
      fullName: editedName
    };
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setUserProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(userProfile.fullName);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 p-3 rounded-full">
              <User size={40} className="text-white" />
            </div>
            <div>
              {isEditing ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={handleSave}
                    className="text-green-500 hover:text-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-red-500 hover:text-red-700"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-gray-800">{userProfile.fullName}</h1>
                  <button
                    onClick={handleEdit}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit2 size={20} />
                  </button>
                </div>
              )}
              <p className="text-gray-600 flex items-center">
                <Mail size={16} className="mr-2" />
                {userProfile.email}
              </p>
            </div>
          </div>
          <div className="text-gray-500 flex items-center">
            <Calendar size={16} className="mr-2" />
            Member since {userProfile.joinDate}
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Your Forms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Placeholder for forms */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">No forms created yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 