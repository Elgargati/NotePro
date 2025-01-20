import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const AverageCalculator = () => {
  const modules = useSelector((state) => state.modules.modules);

  const calculateModuleAverage = (module) => {
    if (module.controls.length === 0) return 0;
    const totalGrade = module.controls.reduce(
      (sum, control) => sum + control.grade,
      0
    );
    return totalGrade / module.controls.length;
  };

  const calculateOverallAverage = () => {
    const totalWeightedGrade = modules.reduce((sum, module) => {
      return sum + calculateModuleAverage(module) * module.coefficient;
    }, 0);

    const totalCoefficient = modules.reduce(
      (sum, module) => sum + module.coefficient,
      0
    );

    return totalCoefficient ? totalWeightedGrade / totalCoefficient : 0;
  };

  const overallAverage = calculateOverallAverage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="dark:bg-gray-800 rounded-lg p-4 "
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Moyennes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-medium mb-2 text-white">
            Moyenne Générale
          </h3>

          <p className="text-3xl font-bold text-white">
            {overallAverage.toFixed(2)}
          </p>
        </div>
        {modules.map((module) => (
          <div
            key={module.id}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-md"
          >
            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
              {module.name}
            </h3>
            <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
              {module.controls.length === 0
                ? "Aucun contrôle"
                : calculateModuleAverage(module).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Coefficient: {module.coefficient}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AverageCalculator;
