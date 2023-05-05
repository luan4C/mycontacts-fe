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
  return (
    <Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0
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
      {!hasError && (
      <>
        {(contacts.length < 1 && !isLoading) && (

        <EmptyList />
        )}

        {(contacts.length > 0 && filteredContacts.length === 0)
        && (
        <SearchNotFound searchTerm={searchTerm} />
        )}
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
          onCancel={handleDeleteModalCancel}
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
