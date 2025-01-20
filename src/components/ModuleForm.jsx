import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addModule } from "../store/modulesSlice";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const ModuleForm = () => {
  const dispatch = useDispatch();
  const [moduleName, setModuleName] = useState("");
  const [moduleCoefficient, setModuleCoefficient] = useState(1);
  const [controls, setControls] = useState([{ grade: 0 }]);

  const handleAddControl = () => {
    setControls([...controls, { grade: 0 }]);
  };

  const handleRemoveControl = (index) => {
    if (controls.length > 1) {
      setControls(controls.filter((_, i) => i !== index));
    }
  };

  const handleControlChange = (index, value) => {
    const newControls = [...controls];
    newControls[index] = { grade: value };
    setControls(newControls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addModule({
        id: uuidv4(),
        name: moduleName,
        coefficient: moduleCoefficient,
        controls,
      })
    );
    setModuleName("");
    setModuleCoefficient(1);
    setControls([{ grade: 0 }]);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className=" dark:bg-gray-900 rounded-lg p-4 "
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Ajouter un Module
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            htmlFor="moduleName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Nom du Module
          </label>
          <input
            type="text"
            id="moduleName"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="moduleCoefficient"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Coefficient du Module
          </label>
          <input
            type="number"
            id="moduleCoefficient"
            value={moduleCoefficient}
            onChange={(e) => setModuleCoefficient(Number(e.target.value))}
            min="1"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
      </div>
      <div className="space-y-4">
        {controls.map((control, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-grow">
              <label
                htmlFor={`controlGrade${index}`}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Note du Contrôle {index + 1}
              </label>
              <input
                type="number"
                id={`controlGrade${index}`}
                value={control.grade}
                onChange={(e) =>
                  handleControlChange(index, Number(e.target.value))
                }
                min="0"
                max="20"
                step="0.25"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveControl(index)}
              className="mt-6 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
              disabled={controls.length === 1}
            >
              <Minus size={20} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          onClick={handleAddControl}
          className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
        >
          <Plus size={20} className="mr-2" />
          Ajouter un Contrôle
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
        >
          Ajouter le Module
        </button>
      </div>
    </motion.form>
  );
};

export default ModuleForm;
