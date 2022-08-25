import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsServices from '../../services/ContactsServices';
import Loader from '../../components/Loader';
import toast from '../../services/utils/toast';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsServices.getContactById(id);

        console.log(contactData);
        setIsLoading(false);
      } catch {
        navigate('/');
        toast({ type: 'danger', text: 'Contato não encontrado' });
      }
    }

    loadContact();
  }, [id, navigate]);

  function handleSubmit() {
    //
  }
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title="Edição de Contato" />
      <ContactForm buttonLabel="Salvar Alterações" onSubmit={handleSubmit} />
    </>
  );
}
