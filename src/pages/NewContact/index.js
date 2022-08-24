import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsServices from '../../services/ContactsServices';
import toast from '../../services/utils/toast';

export default function NewContact() {
  async function handleSubmit(formData) {
    try {
      const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };
      await ContactsServices.createContact(data);

      toast({ type: 'success', text: 'Contato Criado' });
    } catch (err) {
      toast({ type: 'danger', text: 'Erro ao cadastrar' });
    }
  }

  return (
    <>
      <PageHeader title="Novo Contato" />
      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  );
}
