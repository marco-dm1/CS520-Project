import { useState } from 'react';
import { Plus, Trash2, Type, List, CheckSquare, Star } from 'lucide-react';

interface Question {
  id: string;
  type: 'text' | 'multiple-choice' | 'checkbox' | 'rating';
  question: string;
  options?: string[];
  required: boolean;
}

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = (type: Question['type']) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      question: '',
      required: false,
      options: type === 'multiple-choice' || type === 'checkbox' ? [''] : undefined,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, ...updates } : q
    ));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        return { ...q, options: [...q.options, ''] };
      }
      return q;
    }));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const deleteOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        const newOptions = q.options.filter((_, index) => index !== optionIndex);
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Form Title"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="text-2xl font-bold w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Form Description"
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          className="text-gray-600 w-full p-2 mt-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                placeholder="Question"
                value={q.question}
                onChange={(e) => updateQuestion(q.id, { question: e.target.value })}
                className="text-lg font-medium w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={q.required}
                    onChange={(e) => updateQuestion(q.id, { required: e.target.checked })}
                    className="mr-2"
                  />
                  Required
                </label>
                <button
                  onClick={() => deleteQuestion(q.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            {q.type === 'text' && (
              <input
                type="text"
                disabled
                placeholder="Text answer"
                className="w-full p-2 bg-gray-100 rounded"
              />
            )}

            {(q.type === 'multiple-choice' || q.type === 'checkbox') && (
              <div className="space-y-2">
                {q.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type={q.type === 'multiple-choice' ? 'radio' : 'checkbox'}
                      disabled
                      className="mr-2"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(q.id, index, e.target.value)}
                      placeholder="Option"
                      className="flex-1 p-2 border rounded"
                    />
                    <button
                      onClick={() => deleteOption(q.id, index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addOption(q.id)}
                  className="text-blue-500 hover:text-blue-700 flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add Option
                </button>
              </div>
            )}

            {q.type === 'rating' && (
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className="text-gray-300 cursor-pointer"
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="flex space-x-4">
          <button
            onClick={() => addQuestion('text')}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Type size={20} className="mr-2" />
            Add Text Question
          </button>
          <button
            onClick={() => addQuestion('multiple-choice')}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <List size={20} className="mr-2" />
            Add Multiple Choice
          </button>
          <button
            onClick={() => addQuestion('checkbox')}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <CheckSquare size={20} className="mr-2" />
            Add Checkbox
          </button>
          <button
            onClick={() => addQuestion('rating')}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Star size={20} className="mr-2" />
            Add Rating
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder; 