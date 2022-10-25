import { useRef } from 'react';
import ContactsServices from '../../services/ContactsServices';
import toast from '../../services/utils/toast';

export default function useNewContact() {
  const contactRef = useRef(null);
  async function handleSubmit(contact) {
    try {
      await ContactsServices.createContact(contact);
      contactRef.current.resetFields();
      toast({ type: 'success', text: 'Contato cadastrado com sucesso!', duration: 3000 });
    } catch (err) {
      toast({ type: 'danger', text: 'Ocorreu um erro ao cadastrar contato!' });
    }
  }

  return {
    contactRef,
    handleSubmit,
  };
}
