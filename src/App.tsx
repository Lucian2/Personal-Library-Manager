import { Container } from '@mui/material';
import BookManagement from './components/book-management/BookManagement';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Container>
        <BookManagement />
      </Container>
      <ToastContainer position='top-center' autoClose={2000} hideProgressBar />
    </>
  );
}

export default App;
