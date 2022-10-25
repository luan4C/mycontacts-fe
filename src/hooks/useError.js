import { useCallback, useState } from 'react';

export default function useErrro() {
  const [errors, setErrors] = useState([]);

  const setError = useCallback(({ field, message }) => {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (errorAlreadyExists) {
      return;
    }

    setErrors((prev) => (
      [...prev, { field, message }]
    ));
  }, [errors]);

  const removeError = useCallback((field) => {
    setErrors((prev) => (
      prev.filter((error) => error.field !== field)
    ));
  }, []);

  const getErrosMensageByFieldName = useCallback((fieldName) => (

    errors.find((error) => error.field === fieldName)?.message
  ), [errors]);

  return {
    errors, setError, removeError, getErrosMensageByFieldName,
  };
}
