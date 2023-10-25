import {
  useState, useMemo, useCallback, useEffect, useDeferredValue,
} from 'react';
import ContactsServices from '../../services/ContactsServices';
import toast from '../../services/utils/toast';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setisDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredContacts = useMemo(
    () => contacts.filter((contact) => (
      contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()))),
    [contacts, deferredSearchTerm],
  );

  const loadContacts = useCallback(async (abortSignal) => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsServices.listContacts(abortSignal, sortOrder);
      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [sortOrder]);
  useEffect(

    () => {
      const abortController = new AbortController();
      loadContacts(abortController.signal);
      return () => abortController.abort();
    },
    [loadContacts],
  );

  function handleSort() {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }
  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }
  function handleTryAgain() {
    loadContacts();
  }
  const handleDeleteModalTogge = useCallback((contact) => {
    setContactBeingDeleted(contact);
    setisDeleteModalVisible(true);
  }, []);
  const handleDeleteModalCancel = useCallback(() => {
    setisDeleteModalVisible(false);
  }, []);

  async function handleDeleteModalConfirm() {
    try {
      setIsDeleting(true);
      await ContactsServices.deleteContact(contactBeingDeleted.id);
      handleDeleteModalCancel();
      setContacts((prev) => prev.filter((contact) => contact.id !== contactBeingDeleted.id));
      toast({ type: 'success', text: `Contato deletado "${contactBeingDeleted.name}" com sucesso!`, duration: 4000 });
    } catch {
      handleDeleteModalCancel();
      toast({ type: 'danger', text: `Erro ao deletar contato "${contactBeingDeleted.name}"`, duration: 4000 });
    } finally {
      setIsDeleting(false);
    }
  }
  return {
    contacts,
    sortOrder,
    searchTerm,
    isLoading,
    hasError,
    isDeleteModalVisible,
    isDeleting,
    filteredContacts,
    handleSort,
    handleChangeSearchTerm,
    handleTryAgain,
    handleDeleteModalTogge,
    handleDeleteModalConfirm,
    handleDeleteModalCancel,
    contactBeingDeleted,
  };
}
