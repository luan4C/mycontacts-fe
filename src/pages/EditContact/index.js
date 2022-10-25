import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

import Loader from '../../components/Loader';
import useEditContact from './useEditContact';

export default function EditContact() {
  const {
    contactName, contactRef, handleSubmit, isLoading,
  } = useEditContact();
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading === true ? 'Carregando...' : `Editar ${contactName}`} />
      <ContactForm buttonLabel="Salvar Alterações" onSubmit={handleSubmit} ref={contactRef} />
    </>
  );
}
