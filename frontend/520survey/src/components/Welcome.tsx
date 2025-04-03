import { motion } from 'framer-motion';

const Welcome = () => {
  return (
    <div className="w-full bg-gradient-to-r from-gray-900 to-black text-white p-4 shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto flex items-center justify-between"
      >
        <motion.h1 
          className="text-2xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Welcome to <span style={{ color: '#646cff' }}>FormEase</span>
        </motion.h1>
        <motion.p 
          className="text-sm opacity-90"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Create and share forms with ease
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Welcome; 