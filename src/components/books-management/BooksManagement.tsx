import { Box, Button } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import BookList from '../booklist/BookList';
import AddEditBookModal from '../modals/AddEditBookModal';
import { BookType } from '../../models/common';
import messages from '../../constants/messages';
import useBookActions from '../../hooks/useBookActions';
import GenreSelect from '../genre-select/GenreSelect';

const BooksManagement: FunctionComponent = () => {
  const [openAddBookModal, setOpenAddBookModal] = useState(false);
  const [openEditBookModal, setOpenEditBookModal] = useState(false);
  const [currentBook, setCurrentBook] = useState<BookType | null>(null);
  const [genre, setGenre] = useState<string>('');
  const [genres, setGenres] = useState<string[]>([]);

  const { handleAddBook, handleUpdateBook, handleDeleteBook, isLoading } =
    useBookActions();

  const handleEditIconClick = (book: BookType) => {
    setCurrentBook(book);
    setOpenEditBookModal(true);
  };

  const resetEditModal = () => {
    setOpenEditBookModal(false);
    setCurrentBook(null);
  };

  const extractGenres = (bookList: BookType[]) => {
    const allGenres = bookList?.map((book) => book?.genre.toLocaleLowerCase());
    const uniqueGenres = Array.from(new Set(allGenres));
    setGenres(uniqueGenres);
  };

  return (
    <Box>
      <Box
        className='books-management-header'
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        sx={{ mb: 3, mt: 5 }}
      >
        <Button
          variant='contained'
          size='large'
          onClick={() => setOpenAddBookModal(true)}
        >
          {messages.addNewBook}
        </Button>
        {genres.length > 1 && (
          <GenreSelect
            genres={genres}
            selectedGenre={genre}
            onGenreChange={setGenre}
          />
        )}
      </Box>
      <BookList
        genreFilter={genre}
        onGenresExtracted={extractGenres}
        onEditIconClick={handleEditIconClick}
        onDeleteIconClick={(id) => {
          handleDeleteBook(id, () => setGenre(''));
        }}
      />

      {/* modals */}

      {/* Add modal */}
      <AddEditBookModal
        title={messages.addNewBook}
        btnLabel={messages.addBook}
        open={openAddBookModal}
        handleClose={() => setOpenAddBookModal(false)}
        onSubmit={(data) =>
          handleAddBook(data, () => {
            setOpenAddBookModal(false);
            setGenre('');
          })
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
          handleClose={resetEditModal}
          onSubmit={(data) =>
            handleUpdateBook(data, currentBook.id, () => {
              resetEditModal();
              setGenre('');
            })
          }
          isLoading={isLoading}
        />
      )}
    </Box>
  );
};

export default BooksManagement;
