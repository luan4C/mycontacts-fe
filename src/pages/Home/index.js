import {
  Container,

} from './styles';
import Loader from '../../components/Loader';

import useHome from './useHome';
import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';
import Modal from '../../components/Modal';

export default function Home() {
  const {
    contacts, filteredContacts,
    handleChangeSearchTerm, handleDeleteModalConfirm,
    handleDeleteModalTogge, handleSort, handleTryAgain,
    hasError, isDeleteModalVisible, isDeleting, isLoading, searchTerm, sortOrder,
    handleDeleteModalCancel, contactBeingDeleted,
  } = useHome();
  const hasContacts = contacts.length > 0;
  const isListEmpty = (contacts.length < 1 && !isLoading) && !hasError;
  const isSearchEmpty = (hasContacts > 0 && filteredContacts.length === 0) && !hasError;
  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts > 0
      && (
      <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} placeholder="Pesquisas Contato" />
      ) }
      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />
      {
        hasError && (
        <ErrorStatus onTryAgain={handleTryAgain} />
        )
      }
      {isListEmpty && (

        <EmptyList />
      )}

      {isSearchEmpty
        && (
        <SearchNotFound searchTerm={searchTerm} />
        )}
      {hasContacts && (
      <>

        <ContactsList
          filteredContacts={filteredContacts}
          sortOrder={sortOrder}
          onSort={handleSort}
          onDeleteContact={handleDeleteModalTogge}
        />

        <Modal
          danger
          title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
          cancelLabel="cancelar"
          confirmLabel="Deletar"
          oncancel={handleDeleteModalCancel}
          onConfirm={handleDeleteModalConfirm}
          visible={isDeleteModalVisible}
          isLoading={isDeleting}
        >
          <p>Esta ação não podera ser desfeita</p>
        </Modal>
      </>
      )}

    </Container>
  );
}
