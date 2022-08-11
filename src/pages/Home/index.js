/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from 'react-router-dom';
import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import {
  Container, Header, ListHeader, Card, InputSearchContainer, ErrorContainer, EmptyListContainer,
  NoContactFoundContainer,
} from './styles';
import Loader from '../../components/Loader';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import emptyBox from '../../assets/images/icons/empty-box.svg';
import magnifierQuestion from '../../assets/images/icons/magnifier-question.svg';
import sad from '../../assets/images/sad.svg';
import ContactsServices from '../../services/ContactsServices';
import Button from '../../components/Button';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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
  return (
    <Container>
      <Loader isLoading={isLoading} />
      {contacts.length > 0
      && (
      <InputSearchContainer>
        <input type="text" value={searchTerm} onChange={handleChangeSearchTerm} placeholder="Pesquisar contato" />
      </InputSearchContainer>
      ) }
      <Header
        justifyContent={
            // eslint-disable-next-line no-nested-ternary
            hasError ? 'flex-end' : (contacts.length > 0 ? 'space-between' : 'center')
        }
      >
        { (!hasError && contacts.length > 0)
        && (
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        )}

        <Link to="/new">Novo contato</Link>
      </Header>
      {
        hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos</strong>
            <Button onClick={handleTryAgain}>Tentar novamente</Button>
          </div>
        </ErrorContainer>
        )
      }
      {!hasError && (
      <>
        {(contacts.length < 1 && !isLoading) && (

        <EmptyListContainer>
          <img src={emptyBox} alt="empty-box" />

          <p>Você ainda não tem nenhum contato cadastrado!
            Clique no botão <strong>”Novo contato”</strong> à cima para cadastrar o seu primeiro!
          </p>
        </EmptyListContainer>
        )}

        {(contacts.length > 0 && filteredContacts.length === 0)
        && (
        <NoContactFoundContainer>
          <img src={magnifierQuestion} alt="magnifier" />
          <span>Nenhum contato encontrado para  <strong>&ldquo;{searchTerm}&ldquo;</strong></span>
        </NoContactFoundContainer>
        )}

        {filteredContacts.length > 1 && (
        <ListHeader sortOrder={sortOrder}>
          <header>
            <button onClick={handleSort} type="button" className="sort-button">
              <span>
                Nome
              </span>
              <img src={arrow} alt="Arrow" />
            </button>
          </header>
        </ListHeader>
        )}
        {/* map returns new array  */}

        {filteredContacts.map((contact) => (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {contact.category_name && <small>{contact.category_name}</small>}
              </div>
              <span>{contact.email}</span>
              <span>{contact.phone}</span>
            </div>
            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <img src={edit} alt="Edit" />
              </Link>
              <button type="button">
                <img src={trash} alt="Delete" />
              </button>
            </div>
          </Card>
        ))}
      </>
      )}

    </Container>
  );
}
