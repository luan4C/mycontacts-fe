import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactsServices {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:13999');
  }

  async listContacts(abortSignal, orderBy = 'asc') {
    const contacts = await this.httpClient.get(`/contacts?orderBy=${orderBy}`, { signal: abortSignal });
    return contacts.map((contact) => ContactMapper.toDomain(contact));
  }

  async getContactById(id, abortSignal) {
    const contact = await this.httpClient.get(`/contacts/${id}`, { signal: abortSignal });
    return ContactMapper.toDomain(contact);
  }

  createContact(data) {
    return this.httpClient.post('/contacts', { body: ContactMapper.toPersistence(data) });
  }

  updateContact(id, data) {
    return this.httpClient.put(`/contacts/${id}`, { body: ContactMapper.toPersistence(data) });
  }

  deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsServices();
