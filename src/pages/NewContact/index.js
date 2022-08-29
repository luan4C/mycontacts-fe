import { useRef } from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsServices from '../../services/ContactsServices';
import toast from '../../services/utils/toast';

export default function NewContact() {
  const contactRef = useRef(null);
  async function handleSubmit(formData) {
    try {
      const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };
      await ContactsServices.createContact(data);
      contactRef.current.resetFields();
      toast({ type: 'success', text: 'Contato cadastrado com sucesso!', duration: 3000 });
    } catch (err) {
      toast({ type: 'danger', text: 'Ocorreu um erro ao cadastrar contato!' });
    }
  }

  return (
    <>
      <PageHeader title="Novo Contato" />
      <ContactForm ref={contactRef} buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  );
}
