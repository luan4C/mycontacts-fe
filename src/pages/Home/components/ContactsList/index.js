import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import arrow from '../../../../assets/images/icons/arrow.svg';
import edit from '../../../../assets/images/icons/edit.svg';
import trash from '../../../../assets/images/icons/trash.svg';
import { Card, Header } from './styles';

export default function ContactsList({
  filteredContacts,
  sortOrder,
  onSort,
  onDeleteContact,

}) {
  return (
    <>
      {filteredContacts.length > 1 && (
      <Header sortOrder={sortOrder}>
        <header>
          <button onClick={onSort} type="button" className="sort-button">
            <span>
              Nome
            </span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>
      </Header>
      )}
      {/* map returns new array  */}

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category.name && <small>{contact.category.name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>
          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit" />
            </Link>
            <button type="button" onClick={() => onDeleteContact(contact)}>
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
      ))}

    </>
  );
}

ContactsList.propTypes = {
  filteredContacts: Proptypes.arrayOf(Proptypes.shape({
    id: Proptypes.string.isRequired,
    name: Proptypes.string.isRequired,
    email: Proptypes.string,
    phone: Proptypes.string,
    category: Proptypes.shape({
      name: Proptypes.string,
    }),
  })).isRequired,
  sortOrder: Proptypes.string.isRequired,
  onSort: Proptypes.func.isRequired,
  onDeleteContact: Proptypes.func.isRequired,
};
