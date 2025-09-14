import { createContext, useState } from "react";

const GlobalState = createContext(null);
function GlobalContext({ children }) {
  const [localJobs, setLocalJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [filters, setFilters] = useState({ title: "", location: "" });
  return (
    <GlobalState.Provider
      value={{
        localJobs,
        setLocalJobs,
        savedJobs,
        setSavedJobs,
        filters,
        setFilters,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
}

export default GlobalContext;

export { GlobalState };
