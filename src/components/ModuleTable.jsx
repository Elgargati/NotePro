import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteModule } from "../store/modulesSlice";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const ModuleTable = () => {
  const modules = useSelector((state) => state.modules.modules);
  const dispatch = useDispatch();

  const handleDeleteModule = (id) => {
    dispatch(deleteModule(id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8 p-4"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Liste des Modules
      </h2>
      {modules.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-center py-4">
          Aucun module ajouté pour le moment.
        </p>
      ) : (
        <div className="overflow-x-auto  dark:bg-gray-800 rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Module
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Coefficient
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Contrôles
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-300 dark:divide-gray-700">
              {modules.map((module) => (
                <tr
                  key={module.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {module.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {module.coefficient}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                    <ul className="list-disc list-inside">
                      {module.controls.map((control, index) => (
                        <li key={index}>
                          Contrôle {index + 1}: {control.grade}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleDeleteModule(module.id)}
                      className="text-red-600 hover:text-red-900 dark:hover:text-red-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-full p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default ModuleTable;
