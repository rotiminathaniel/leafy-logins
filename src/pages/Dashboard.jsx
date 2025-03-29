
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Tractor, Sun, CloudSun, Wheat } from 'lucide-react';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F2FCE2]">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="https://agrisiti.com/wp-content/uploads/2022/05/Agrisiti-Logo-on-black-1-cropped.svg" 
              alt="Agrisiti" 
              className="h-10 w-auto mr-3"
            />
            <h1 className="text-2xl font-semibold text-gray-900">Farm Dashboard</h1>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-sm font-medium text-gray-700">
              Welcome, {currentUser?.name || 'User'}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary/90"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="dashboard-grid">
          <div className="bg-white rounded-lg shadow p-6 card-hover">
            <div className="flex items-center mb-4">
              <Tractor className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold">Equipment Status</h2>
            </div>
            <p className="text-gray-600 mb-4">All farm equipment operating normally</p>
            <div className="bg-green-100 text-green-800 text-sm rounded-md p-2 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Systems operational
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 card-hover">
            <div className="flex items-center mb-4">
              <Sun className="h-6 w-6 text-warning mr-2" />
              <h2 className="text-xl font-semibold">Weather Conditions</h2>
            </div>
            <div className="flex items-center justify-center mb-4">
              <CloudSun className="h-16 w-16 text-warning" />
              <div className="text-3xl font-bold ml-4">72°F</div>
            </div>
            <p className="text-gray-600">Partly cloudy, light breeze from SW</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 card-hover">
            <div className="flex items-center mb-4">
              <Wheat className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold">Crop Status</h2>
            </div>
            <p className="text-gray-600 mb-2">Current growth stage: Flowering</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-sm text-gray-500">65% to harvest</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
