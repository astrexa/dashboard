/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import Logo from '../assets/img/MMC-Logo.jpg';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


export default function Singin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const navigate = useNavigate();


  const playErrorSound = () => {
  const audio = new Audio("https://res.cloudinary.com/dtxqdxnrt/video/upload/v1755838550/notification_i02rom.mp3");
  audio.play();
};
 const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (email === "admin@mmc.ae" && password === "12345678") {
        navigate("/dashboard");
      } else {
       toast.error("Invalid email or password. Please try again.");
        playErrorSound();
      }
    }, 1000);
  };

  return (
   <>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
            <Toaster position="top-center" reverseOrder={false} />

      <div className="absolute inset-0 opacity-30"></div>
      
      
      <div className="relative w-full max-w-md">
       
        <div className="bg-white/80 backdrop-blur-xl rounded-sm border border-white/50 p-8 transform transition-all duration-500 hover:shadow-3xl">
          
          {/* Logo Section */}
          <div className="text-center mb-0">  
              <img src={Logo} alt="Logo" className="mx-auto mb-4 h-25" />
            {/* <h3 className="text-gray-600 font-bold text-xl">Sign in to your account</h3> */}
          </div>

          <div className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-normal text-gray-700">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-sm focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-300 font-medium focus:ring-1 focus:outline-none focus:ring-[#0477BF]"
                  placeholder="Enter your email"
                  required
                />
              
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-normal text-gray-700">Password</label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-3 pr-12 bg-gray-50/50 border-2 border-gray-200 rounded-sm  focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-300 font-medium focus:ring-1 focus:outline-none focus:ring-[#0477BF]"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#0477BF] cursor-pointer transition-colors duration-200 p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Options Row */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#0477BF] border-2 border-gray-300 rounded focus:ring-0 transition-all duration-200"
                />
                <span className="ml-3 text-sm font-normal text-gray-600 group-hover:text-gray-800 transition-colors">
                  Remember me
                </span>
              </label>
              <a href="#" className="text-sm font-normal text-[#0477BF] hover:text-[#0477BF] transition-colors duration-200">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full group bg-[#0477BF] text-white relative font-normal py-3 px-6 rounded-sm duration-300 hover:cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed active:translate-y-0"
            >
              <div className="flex items-center justify-center space-x-3">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing you in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    {/* <ArrowRight className="w-5 h-5 " /> */}
                  </>
                )}
              </div>
              <div className="absolute inset-0 rounded-sm bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

          
          </div>
        </div>
      </div>
    </div>
   </>
  );
}