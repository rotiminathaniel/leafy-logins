
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle, LeafyGreen, Sun, Tractor } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-50 via-[#F2FCE2] to-[#D3E4FD] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485833077593-4278bba3f11f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-50/90"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-12 text-center">
          <Tractor className="h-16 w-16 text-primary mb-6" />
          <h1 className="text-4xl font-bold text-primary mb-4">Agrisiti Farm Management</h1>
          <p className="text-lg text-gray-700 mb-8 max-w-md">
            Smart monitoring solutions for modern agriculture. Track your farm's performance from anywhere.
          </p>
          
          <div className="grid grid-cols-2 gap-6 w-full max-w-md">
            <div className="flex flex-col items-center p-4 bg-white/80 rounded-xl shadow-sm">
              <LeafyGreen className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold text-gray-800">Crop Monitoring</h3>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/80 rounded-xl shadow-sm">
              <Sun className="h-8 w-8 text-warning mb-2" />
              <h3 className="font-semibold text-gray-800">Weather Tracking</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8 fade-in">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img
                className="h-16 w-auto object-contain bg-gray-900 p-2 rounded-lg"
                src="https://agrisiti.com/wp-content/uploads/2022/05/Agrisiti-Logo-on-black-1-cropped.svg"
                alt="Agrisiti"
              />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Access your farm monitoring dashboard
            </p>
          </div>
          
          {error && (
            <div className="p-4 text-sm bg-red-50 border border-red-200 rounded-md flex items-start animate-pulse">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-red-800">{error}</span>
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary/80">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LogIn className="h-5 w-5 text-primary-foreground" />
                </span>
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
            
            <div className="text-center text-sm bg-green-50 p-3 rounded-md border border-green-100">
              <p className="text-gray-700">
                <span className="font-medium">Demo credentials:</span><br />
                admin@agrisiti.com / password
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
