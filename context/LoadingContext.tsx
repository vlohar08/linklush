import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const LoadingContext = createContext(false);
const UpdateLoadingContext = createContext<Dispatch<SetStateAction<boolean>>>(
  () => {}
);

export const useLoading = () => useContext(LoadingContext);
export const useUpdateLoading = () => useContext(UpdateLoadingContext);

const LoadingContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsloading] = useState(true);
  return (
    <LoadingContext.Provider value={isLoading}>
      <UpdateLoadingContext.Provider value={setIsloading}>
        {children}
      </UpdateLoadingContext.Provider>
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
