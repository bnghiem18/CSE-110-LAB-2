import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";

export function ToggleTheme() {
    const [currentTheme, setCurrentTheme] = useState(themes.light);
   
    const toggleTheme = () => {
      setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };
   
    return (
      <ThemeContext.Provider value={currentTheme}>
        <button onClick={toggleTheme}> Toggle Theme </button>
      </ThemeContext.Provider>
    );
   }