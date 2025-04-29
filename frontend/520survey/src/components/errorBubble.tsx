
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ErrorBubbleProps {
  messages: string[]; // Expect an array of messages
  isValid?: boolean;
}

const ErrorBubble = ({ messages, isValid }: ErrorBubbleProps) => (
  <motion.div
    initial={{ opacity: 0, y: -10, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10, scale: 0.8 }}
    className={`absolute left-full top-0 ml-2 rounded py-1 px-10 z-10 ${
      isValid ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    } flex flex-col items-start text-sm`}
    style={{ transform: 'translateY(-50%)' }}
  >
    {isValid ? (
      <div className="flex text-left">
        <Check className="mr-2" size={16} /> <span>Valid</span>
      </div>
    ) : (
      <ul className=" mr-0 text-left">
        {messages.map((msg, index) => (
          <li key={index} className="list-disc ml-4">
            {msg}
          </li>
        ))}
      </ul>
    )}
  </motion.div>
);

export default ErrorBubble;