import { Box, Button } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import BookList from '../booklist/BookList';
import AddEditBookModal from '../modals/AddEditBookModal';
import { BookType } from '../../models/common';
import messages from '../../constants/messages';
import useBookActions from '../../hooks/useBookActions';

const BookManagement: FunctionComponent = () => {
  const [openAddBookModal, setOpenAddBookModal] = useState(false);
  const [openEditBookModal, setOpenEditBookModal] = useState(false);
  const [currentBook, setCurrentBook] = useState<BookType | null>(null);

  const { handleAddBook, handleUpdateBook, handleDeleteBook, isLoading } =
    useBookActions();

  const handleEditIconClick = (book: BookType) => {
    setCurrentBook(book);
    setOpenEditBookModal(true);
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Button
        sx={{ mb: 3 }}
        variant='contained'
        size='large'
        onClick={() => setOpenAddBookModal(true)}
      >
        {messages.addNewBook}
      </Button>
      <BookList
        onEditIconClick={handleEditIconClick}
        onDeleteIconClick={(id) => handleDeleteBook(id)}
      />

      {/* Add modal */}
      <AddEditBookModal
        title={messages.addNewBook}
        btnLabel={messages.addBook}
        open={openAddBookModal}
        handleClose={() => setOpenAddBookModal(false)}
        onSubmit={(data) =>
          handleAddBook(data, () => setOpenAddBookModal(false))
        }
        isLoading={isLoading}
      />

      {/* Edit modal */}
      {currentBook && (
        <AddEditBookModal
          title={messages.editBook}
          btnLabel={messages.editBook}
          initialBookValues={currentBook}
          open={openEditBookModal}
          handleClose={() => {
            setOpenEditBookModal(false);
            setCurrentBook(null);
          }}
          onSubmit={(data) =>
            handleUpdateBook(data, currentBook.id, () =>
              setOpenEditBookModal(false)
            )
          }
          isLoading={isLoading}
        />
      )}
    </Box>
  );
};

export default BookManagement;
