import {
  useState, useMemo, useCallback, useEffect,
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

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()))), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsServices.listContacts(sortOrder);
      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [sortOrder]);
  useEffect(
    () => {
      loadContacts();
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
  function handleDeleteModalTogge(contact) {
    setContactBeingDeleted(contact);
    setisDeleteModalVisible(true);
  }
  function handleDeleteModalCancel() {
    setisDeleteModalVisible(false);
  }

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
