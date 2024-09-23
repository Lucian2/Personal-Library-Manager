import { Container } from '@mui/material';
import BooksManagement from './components/books-management/BooksManagement';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Container>
        <BooksManagement />
      </Container>
      <ToastContainer position='top-center' autoClose={2000} hideProgressBar />
    </>
  );
}

export default App;
