import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import useNewContact from './useNewContact';

export default function NewContact() {
  const { contactRef, handleSubmit } = useNewContact();

  return (
    <>
      <PageHeader title="Novo Contato" />
      <ContactForm ref={contactRef} buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  );
}
