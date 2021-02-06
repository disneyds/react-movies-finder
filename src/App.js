import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Header from 'components/Header/Header';
import './App.css';
import Container from './components/Container/Container';
import Routes from './components/Routes/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header />
      <Container className="Container">
        <Routes />
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
