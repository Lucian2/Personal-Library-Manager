import { Container } from '@mui/material';
import BookList from './components/booklist/BookList';

function App() {
  return (
    <Container sx={{ mt: 5 }}>
      <BookList />
    </Container>
  );
}

export default App;
