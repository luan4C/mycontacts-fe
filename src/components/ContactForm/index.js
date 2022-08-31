import PropTypes from 'prop-types';
import {
  forwardRef, useCallback, useEffect, useState, useImperativeHandle,
} from 'react';
import FormGroup from '../FormGroup';
import { Form, ButtonContainer } from './styles';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import isEmailValid from '../../utils/isEmailValid';
import useErrors from '../../hooks/useError';
import formatPhone from '../../utils/formatPhone';
import CategoriesServices from '../../services/CategoriesServices';
import toast from '../../services/utils/toast';
import useSafeAsynState from '../../hooks/useSafeAsyncState';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
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
  const getCategories = useCallback(async () => {
    try {
      const data = await CategoriesServices.getCategories();
      setCategories(data);
    } catch {
      toast({ type: 'danger', text: 'Erro ao buscar categorias' });
    } finally {
      setIsCategoriesLoading(false);
    }
  }, [setCategories, setIsCategoriesLoading]);

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
        setCategoryId(contacts.category_id ?? '');
      },
      resetFields: () => {
        setName('');
        setEmail('');
        setPhone('');
        setCategoryId('');
      },
    }), []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);
  return (
    <Form onSubmit={handleOnSubmit} noValidate>
      <FormGroup error={getErrosMensageByFieldName('name')}>
        <Input
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup error={getErrosMensageByFieldName('email')}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          disabled={isSubmitting}

        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength="15"
          disabled={isSubmitting}

        />
      </FormGroup>
      <FormGroup isLoading={isCategoriesLoading}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isCategoriesLoading || isSubmitting}
        >
          <option value="">Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>
      <ButtonContainer>

        <Button type="submit" disabled={isFormInvalid} isLoading={isSubmitting}>
          {buttonLabel}

        </Button>
      </ButtonContainer>
    </Form>
  );
});

export default ContactForm;

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
