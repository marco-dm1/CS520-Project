
interface InputFieldProps {
    icon?: object;
    placeholder?: string;
    type?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const InputField = ({ icon, placeholder, type = "text", value, onChange }: InputFieldProps) => (
    <div className="flex items-center bg-gray-100 p-3 rounded-lg">
        {icon && <div className="text-gray-500 mr-3"></div>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-transparent outline-none flex-1 text-gray-800"
      />
    </div>
  );
  
  export default InputField;