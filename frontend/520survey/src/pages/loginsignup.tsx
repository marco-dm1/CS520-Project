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

  const [nameErrors, setNameErrors] = useState<string[]>([]);
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  
  const handleInputFocus = (fieldName: string) => {
    setFocusedInput(fieldName);
  };

  const navigate = useNavigate();
  const toggleMode = () => setIsLogin(!isLogin);


  const validateName = () => {
    const errors: string[] = [];
    if (!isLogin && !name.trim()) {
      errors.push("Please enter your full name");
    }
    setNameErrors(errors);
    setIsNameValid(errors.length === 0);
    return errors.length === 0;
  };

  const validateEmail = () => {
    const errors: string[] = [];
    if (!email.trim()) {
      errors.push("Please enter your email address");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push("Please enter a valid email address");
    }
    setEmailErrors(errors);
    setIsEmailValid(errors.length === 0);
    return errors.length === 0;
  };

  const validatePassword = () => {
    const errors: string[] = [];
    if (!password.trim()) {
      errors.push("Please enter your password");
    }
    if (password.length < 6 && password.trim()) {
      errors.push("Password must be at least 6 characters long");
    }
    if (!/[A-Z]/.test(password) && password.trim()) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[^a-zA-Z0-9\s]/.test(password) && password.trim()) {
      errors.push("Password must contain at least one special character");
    }
    setPasswordErrors(errors);
    setIsPasswordValid(errors.length === 0);
    return errors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isNameValid = isLogin || validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isNameValid && isEmailValid && isPasswordValid) {
      const userProfile = {
        fullName: name,
        email: email,
      };
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      navigate('/profile');
    }
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
                  errorMessages={nameErrors} // Use errorMessages (array)
                  onBlur={validateName}
                  isValid={isNameValid}
                  onFocus={() => handleInputFocus("name")}
                  showBubble={focusedInput === "name" && (!isNameValid || nameErrors.length > 0)}
                  />
                )}
                <InputField
                 icon={Mail}
                 placeholder="Email"
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 errorMessages={emailErrors} // Use errorMessages (array)
                 onBlur={validateEmail}
                 isValid={isEmailValid}
                 onFocus={() => handleInputFocus("email")}
                 showBubble={focusedInput === "email" && (!isEmailValid || emailErrors.length > 0)}
                />
                <InputField
                icon={Lock}
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                errorMessages={passwordErrors} // Use errorMessages (array)
                onBlur={validatePassword}
                isValid={isPasswordValid}
                onFocus={() => handleInputFocus("password")}
                showBubble={focusedInput === "password" && (!isPasswordValid || passwordErrors.length > 0)}
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