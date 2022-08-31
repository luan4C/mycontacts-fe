import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsServices from '../../services/ContactsServices';
import Loader from '../../components/Loader';
import toast from '../../services/utils/toast';
import useIsMounted from '../../hooks/useIsMounted';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [contactName, setContactName] = useState('');
  const navigate = useNavigate();
  const contactRef = useRef(null);
  const isMounted = useIsMounted();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsServices.getContactById(id);
        safeAsyncAction(() => {
          contactRef.current.setFieldsValues(contactData);
          setContactName(contactData.name);
          setIsLoading(false);
        });
      } catch {
        safeAsyncAction(() => {
          navigate('/');
          toast({ type: 'danger', text: 'Contato não encontrado' });
        });
      }
    }

    loadContact();
  }, [id, navigate, isMounted]);

  async function handleSubmit(formData) {
    try {
      const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };
      const updatedContactData = await ContactsServices.updateContact(id, data);

      setContactName(updatedContactData.name);
      toast({ type: 'success', text: 'Contato editado com sucesso!', duration: 3000 });
    } catch (err) {
      toast({ type: 'danger', text: 'Ocorreu um erro ao editar contato!' });
    }
  }
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading === true ? 'Carregando...' : `Editar ${contactName}`} />
      <ContactForm buttonLabel="Salvar Alterações" onSubmit={handleSubmit} ref={contactRef} />
    </>
  );
}
