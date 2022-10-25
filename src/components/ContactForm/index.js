import PropTypes from 'prop-types';
import {
  forwardRef,
} from 'react';
import FormGroup from '../FormGroup';
import { Form, ButtonContainer } from './styles';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import useContactForm from './useContactForm';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    handleOnSubmit,
    name, handleEmailChange,
    handleNameChange,
    getErrosMensageByFieldName,
    isSubmitting, email,
    phone, handlePhoneChange, isCategoriesLoading,
    categoryId,
    setCategoryId,
    categories,
    isFormInvalid,

  } = useContactForm(onSubmit, ref);
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
