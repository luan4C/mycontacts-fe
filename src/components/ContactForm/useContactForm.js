import {
  useEffect, useState, useImperativeHandle,
} from 'react';
import isEmailValid from '../../utils/isEmailValid';
import useErrors from '../../hooks/useError';
import formatPhone from '../../utils/formatPhone';
import CategoriesServices from '../../services/CategoriesServices';

import useSafeAsynState from '../../hooks/useSafeAsyncState';

export default function useContactForm(onSubmit, ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [isCategoriesLoading, setIsCategoriesLoading] = useSafeAsynState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useSafeAsynState([]);
  const {
    errors, setError, removeError, getErrosMensageByFieldName,
  } = useErrors();

  const isFormInvalid = !(name && errors.length === 0);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório!' });
    } else {
      removeError('name');
    }
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido!' });
    } else {
      removeError('email');
    }
  }
  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    const data = {
      name, email, phone, categoryId,
    };

    await onSubmit(data);

    setIsSubmitting(false);
  }
  useImperativeHandle(ref, () => (
    {
      setFieldsValues: (contacts) => {
        setName(contacts.name ?? '');
        setEmail(contacts.email ?? '');
        setPhone(formatPhone(contacts.phone ?? ''));
        setCategoryId(contacts.category.id ?? '');
      },
      resetFields: () => {
        setName('');
        setEmail('');
        setPhone('');
        setCategoryId('');
      },
    }), []);

  useEffect(() => {
    const abortController = new AbortController();
    async function getCategoreis(abortSignal) {
      try {
        const data = await CategoriesServices.getCategories(abortSignal);
        setCategories(data);
      } catch {} finally {
        setIsCategoriesLoading(false);
      }
    }
    getCategoreis(abortController.signal);

    return () => abortController.abort();
  }, []);

  return {
    handleOnSubmit,
    name,
    handleEmailChange,
    handleNameChange,
    getErrosMensageByFieldName,
    isSubmitting,
    email,
    phone,
    handlePhoneChange,
    isCategoriesLoading,
    categoryId,
    setCategoryId,
    categories,
    isFormInvalid,

  };
}
