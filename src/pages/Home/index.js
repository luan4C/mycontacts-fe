import { Link } from 'react-router-dom';
import {
  Container, Header, ListContainer, Card, InputSearchContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  return (
    <>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato" />
      </InputSearchContainer>
      <Container>
        <Header>
          <strong>3 Contatos</strong>
          <Link to="/new">Novo contato</Link>
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
              <Link to="/edit/123">
                <img src={edit} alt="Edit" />
              </Link>
              <button type="button">
                <img src={trash} alt="Delete" />
              </button>
            </div>
          </Card>
        </ListContainer>
      </Container>
    </>
  );
}
