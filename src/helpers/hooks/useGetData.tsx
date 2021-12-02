import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface PropTypes {
  getDataAction: Function,
  resetState: Function,
  LIMIT?: number,
  resetOnUnmount?: boolean
}

const useGetData = ({
  getDataAction, resetState, LIMIT = 10, resetOnUnmount,
}: PropTypes) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const handleSearch = (val: string) => {
    if (val?.length > 0) {
      setSearchValue(val);
    } else {
      dispatch(resetState());
      setSearchValue(null);
    }
    dispatch(getDataAction({
      limit: LIMIT,
      offset: 0,
      searchWord: val || null,
    }));
  };

  const handlePageChange = (val: number) => {
    dispatch(resetState());
    dispatch(getDataAction({
      limit: LIMIT,
      offset: (val - 1) * LIMIT,
      searchWord: searchValue,
    }));
  };

  useEffect(() => {
    dispatch(getDataAction({
      limit: LIMIT,
      offset: 0,
      searchWord: searchValue,
    }));
    return resetOnUnmount ? () => dispatch(resetState()) : undefined;
  }, []);

  return {
    searchValue,
    handleSearch,
    handlePageChange,
  };
};

export default useGetData;
