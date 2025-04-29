import React from 'react';
import { AnimatePresence } from 'framer-motion';
import ErrorBubble from '../components/errorBubble'; 

interface InputFieldProps {
  icon?: object;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessages?: string[]; // Prop to receive an array of error messages
  onBlur?: () => void;
  isValid?: boolean;
  onFocus?: () => void;
  showBubble?: boolean | undefined;
}

const InputField = ({ icon, placeholder, type = "text", value, onChange, errorMessages = [], onBlur, isValid, onFocus, showBubble }: InputFieldProps) => (
  <div className="relative flex items-center bg-gray-100 p-3 rounded-lg">
    {icon && <div className="text-gray-500 mr-3"></div>}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-transparent outline-none flex-1 text-gray-800"
      onBlur={onBlur}
      onFocus={onFocus}
    />
    <AnimatePresence>
      {showBubble && !isValid && errorMessages.length > 0 && <ErrorBubble messages={errorMessages} isValid={false} />}
      {showBubble && isValid && <ErrorBubble messages={["Valid"]} isValid={true} />}
    </AnimatePresence>
  </div>
);

export default InputField;