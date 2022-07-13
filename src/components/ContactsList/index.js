import {
  Container, Header, ListContainer, Card,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';

export default function ContactsList() {
  return (
    <Container>
      <Header>
        <strong>3 Contatos</strong>
        <a href="/">Novo contato</a>
      </Header>
      <ListContainer>
        <header>
          <butto type="button">
            <span>
              Nome
            </span>
            <img src={arrow} alt="Arrow" />
          </butto>
        </header>
        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Mateus Silva</strong>
              <small>instagram</small>
            </div>
            <span>matesu@devacademy.com.br</span>
            <span>(41) 99999-9999</span>
          </div>
          <div className="actions">
            <a href="/" />
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
