import React, { useState, createContext, useEffect } from "react";

// Create a context
export const DataContext = createContext();

// Define the provider component
function DataProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Load the cart from localStorage when the component mounts
    const localStorageCart = JSON.parse(localStorage.getItem("seemlyCart"));
    return localStorageCart || [];
  });

  useEffect(() => {
    // Save the cart to localStorage whenever it changes
    localStorage.setItem("semmlyCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <DataContext.Provider value={{ cart, setCart }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
