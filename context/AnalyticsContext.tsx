import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const AnalyticsContext = createContext("");
const UpdateAnalyticsContext = createContext<Dispatch<SetStateAction<string>>>(
  () => {}
);

export const useAnalytics = () => useContext(AnalyticsContext);
export const useUpdateAnalytics = () => useContext(UpdateAnalyticsContext);

const AnalyticsContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAnalytics, setIsAnalytics] = useState("");
  return (
    <AnalyticsContext.Provider value={isAnalytics}>
      <UpdateAnalyticsContext.Provider value={setIsAnalytics}>
        {children}
      </UpdateAnalyticsContext.Provider>
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsContextProvider;
