import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { IoLogoGoogle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import InputField from "./inputfields";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const toggleMode = () => setIsLogin(!isLogin);

  const handleClientLogon = (fullname: string, email: string, id: string) => {
    // Change sidebar name to the new Full Name
    if(document.getElementById("user_fullname_here")){
      document.getElementById("user_fullname_here").textContent=fullname;
    }

    // Store user data to local storage
    const info = {
      fullName: name,
      email: email,
      id: id
    };
    localStorage.setItem('accountInfo', JSON.stringify(info));

  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && !name) {
      alert("Please enter your full name");
      return;
    }
    
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if(isLogin){
      // LOGIN

      console.log("we are logging in");
      fetch("http://localhost:3000/api/user/login",
        {
          method: "GET",
          body: JSON.stringify({ email: email, pass: password}),
        }
      ).then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(data);

        if(data["status"]){
          console.log("Successful logon");

          let capturedName = "";
          let capturedEmail = "";
          fetch("http://localhost:3000/api/user/login",
            {
              method: "GET",
              body: JSON.stringify({ email: email, pass: password}),
            }
          ).then(function(res2) {
            return res2.json();
          }).then(function(data2) {
            console.log(data2);
    
            if(data2["status"]){
              capturedName = data2[1];
              capturedEmail = data2[2];
            }else{
              alert("Error occured when fetching account info! (" + data2[1] + ")");
            }
          }).catch(function(err) {
            console.log('Fetch Error 2', err);
          });

          handleClientLogon(capturedName, capturedEmail, data[1]);
        }else{
          console.log("Failed logon");
          alert("Incorrect! Password or email are wrong.");
        }
      }).catch(function(err) {
        console.log('Fetch Error 1', err);
      });
    }else{
      // SIGN UP

      console.log("we are signing up");
    }
    
    // Navigate to profile page after successful login/signup
    navigate('/profile');
  };

  const formVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 w-full">
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "signup"}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={formVariants}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
                {isLogin ? "Welcome back" : "Create account"}
              </h1>
              <div className="space-y-4">
                {!isLogin && (
                  <InputField
                    icon={User}
                    placeholder="Full Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
                <InputField
                  icon={Mail}
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                  icon={Lock}
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className={`text-white px-6 py-3 rounded-lg w-full flex items-center justify-center ${
                    isLogin ? "bg-blue-600" : "bg-green-600"
                  }`}
                >
                  {isLogin ? "Sign In" : "Sign Up"}{" "}
                  <ArrowRight className="ml-2" size={20} />
                </button>
              </div>
              {isLogin && (
                <div className="mt-6 flex justify-center space-x-4">
                  <button className="p-2 bg-gray-200 rounded-full">
                  <IoLogoGoogle
                      className="text-gray-700 hover:text-white"
                      size={24}
                    />
                  </button>
                  {/* <button className="p-2 bg-gray-200 rounded-full">
                    <Twitter
                      className="text-gray-700 hover:text-white"
                      size={24}
                    />
                  </button> */}
                </div>
              )}
            </motion.form>
          </AnimatePresence>
        </div>
      </div>
      <div
        className={`w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 ${
          isLogin ? "bg-blue-600" : "bg-green-600"
        }`}
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            {isLogin ? "New here?" : "Already have an account?"}
          </h2>
          <p className="text-gray-200 mb-8">
            {isLogin
              ? "Sign up and discover a great amount of new opportunities!"
              : "Sign in to access your account and continue your journey!"}
          </p>
          <button
            className="bg-white px-6 py-3 rounded-lg"
            style={{ color: isLogin ? "#2563EB" : "#059669" }}
            onClick={toggleMode}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;