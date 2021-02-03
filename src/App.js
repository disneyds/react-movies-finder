import Header from 'components/Header/Header';
import './App.css';
import Container from './components/Container/Container';
import Routes from './components/Routes/Routes';

function App() {
  return (
    <>
      <Header />
      <Container className="Container">
        <Routes />
      </Container>
    </>
  );
}

export default App;
