import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContactsServices from '../../services/ContactsServices';

import toast from '../../services/utils/toast';
import useIsMounted from '../../hooks/useIsMounted';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function useEditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [contactName, setContactName] = useState('');
  const navigate = useNavigate();
  const contactRef = useRef(null);
  const isMounted = useIsMounted();
  const safeAsyncAction = useSafeAsyncAction();
  useEffect(() => {
    const abortController = new AbortController();
    async function loadContact(abortSignal) {
      try {
        const contactData = await ContactsServices.getContactById(id, abortSignal);
        safeAsyncAction(() => {
          contactRef.current.setFieldsValues(contactData);
          setContactName(contactData.name);
          setIsLoading(false);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        safeAsyncAction(() => {
          navigate('/');
          toast({ type: 'danger', text: 'Contato não encontrado' });
        });
      }
    }
    loadContact(abortController.signal);

    return () => abortController.abort();
  }, [id, navigate, isMounted]);

  async function handleSubmit(contact) {
    try {
      const updatedContactData = await ContactsServices.updateContact(id, contact);

      setContactName(updatedContactData.name);
      toast({ type: 'success', text: 'Contato editado com sucesso!', duration: 3000 });
    } catch (err) {
      toast({ type: 'danger', text: 'Ocorreu um erro ao editar contato!' });
    }
  }

  return {
    isLoading,
    contactName,
    contactRef,
    handleSubmit,
  };
}
