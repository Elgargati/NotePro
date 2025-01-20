import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import modulesReducer, { modulesSlice } from "./store/modulesSlice";
import ModuleForm from "./components/ModuleForm";
import ModuleTable from "./components/ModuleTable";
import AverageCalculator from "./components/AverageCalculator";
import { Sun, Moon, Menu } from "lucide-react";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("modulesSlice");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("modulesSlice", serializedState);
  } catch {
    // Ignore write errors
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    modules: modulesReducer,
  },
  preloadedState: preloadedState ? { modules: preloadedState } : undefined,
});

store.subscribe(() => {
  saveState(store.getState().modules);
});

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Provider store={store}>
      <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
        {/* Wrapper global */}
        <div className="flex">
          {/* Barre latérale */}
          <aside
            className={`fixed top-0 left-0 h-full w-64 bg-gray-800 dark:bg-gray-900 text-white shadow-lg transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 transition-transform duration-300 z-50`}
          >
            <div className="px-4 py-6">
              <h1 className="text-2xl font-bold text-center">NotePro </h1>
            </div>
            <nav className="flex-1 px-4 space-y-2">
              <a
                href="#ajouter-module"
                className="block px-3 py-2 rounded-md hover:bg-gray-700"
              >
                Ajouter un Module
              </a>
              <a
                href="#liste-modules"
                className="block px-3 py-2 rounded-md hover:bg-gray-700"
              >
                Liste des Modules
              </a>
              <a
                href="#moyennes"
                className="block px-3 py-2 rounded-md hover:bg-gray-700"
              >
                Moyennes
              </a>
            </nav>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="m-4 p-2 rounded-md bg-gray-700 text-white flex items-center justify-center"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </aside>

          {/* Bouton hamburger pour mobiles */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md shadow-lg"
          >
            <Menu size={24} />
          </button>

          {/* Contenu principal */}
          <main className="ml-0 md:ml-64 flex-1 bg-gray-100 dark:bg-gray-800 p-8">
            <section id="ajouter-module">
              <ModuleForm />
            </section>
            <section id="liste-modules" className="mt-8">
              <ModuleTable />
            </section>
            <section id="moyennes" className="mt-8">
              <AverageCalculator />
            </section>
          </main>
        </div>
      </div>
    </Provider>
  );
}
export default App;
