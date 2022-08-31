import { useCallback, useState } from 'react';
import useIsMounted from './useIsMounted';

export default function useSafeAsynState(intialState) {
  const [state, setState] = useState(intialState);
  const isMounted = useIsMounted();

  const setAsyncState = useCallback((data) => {
    if (isMounted) {
      setState(data);
    }
  }, []);

  return [state, setAsyncState];
}
