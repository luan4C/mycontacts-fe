import PropTypes from 'prop-types';
import { useState } from 'react';
import FormGroup from '../FormGroup';
import { Form, ButtonContainer } from './styles';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import isEmailValid from '../../utils/isEmailValid';

export default function ContactForm({ buttonLabel }) {
  const [name, SetName] = useState('');
  const [email, SetEmail] = useState('');
  const [phone, SetPhone] = useState('');
  const [social, SetSocial] = useState('');
  const [errors, SetErrors] = useState([]);

  function handleNameChange(event) {
    SetName(event.target.value);

    if (!event.target.value) {
      SetErrors((prev) => [...prev, {
        field: 'name', message: 'Nome é obrigatório!',
      }]);
    } else {
      SetErrors((prev) => prev.filter((err) => err.field !== 'name'));
    }
  }
  function handleEmailChange(event) {
    SetEmail(event.target.value);
    if (event.target.value && !isEmailValid(event.target.value)) {
      if (!errors.find((err) => err.field === 'email')) {
        SetErrors((prev) => [...prev, {
          field: 'email', message: 'Email inválido!',
        }]);
      }
    } else {
      SetErrors((prev) => prev.filter((err) => err.field !== 'email'));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log({
      name, email, phone, social,
    });
  }

  function getErrosMensageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message;
  }
  console.log(errors);
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup error={getErrosMensageByFieldName('name')}>
        <Input
          placeholder="Nome"
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>
      <FormGroup error={getErrosMensageByFieldName('email')}>
        <Input
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={(event) => SetPhone(event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Select
          value={social}
          onChange={(event) => SetSocial(event.target.value)}
        >
          <option value="">Selecione</option>
          <option value="instagram">Instagram</option>
          <option value="discord">Discord</option>
        </Select>
      </FormGroup>
      <ButtonContainer>

        <Button>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
