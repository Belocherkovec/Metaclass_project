import { ReactNode, useEffect, createContext, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryStore from 'store/QueryStore';

const QueryStoreContext = createContext<typeof queryStore | null>(null);

type QueryStoreInitializerProps = {
  children?: ReactNode;
};

export const QueryStoreProvider: React.FC<QueryStoreInitializerProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    queryStore.setRouter(navigate, location);
  }, []);

  return <QueryStoreContext.Provider value={queryStore}>{children}</QueryStoreContext.Provider>;
};

export const useQueryStore = () => {
  const queryStore = useContext(QueryStoreContext);
  if (!queryStore) {
    throw new Error('useQueryStore must be used within a QueryStoreProvider');
  }
  return queryStore;
};
