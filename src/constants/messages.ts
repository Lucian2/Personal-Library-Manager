const messages = {
  errorFetchingBooks:
    'An error occurred while fetching books. Please try again later.',
  noBooksAdded: 'No books have been added yet. You can add one!',
  addBook: 'Add book',
  addNewBook: 'Add new book',
  editBook: 'Edit book',
  addBookSuccess: 'Book added successfully',
  addBookError: 'Error adding book. Please try again.',
  editBookSuccess: 'Book updated successfully!',
  editBookError: 'Error updating book. Please try again.',
  deleteBookSuccess: 'Book deleted successfully',
  deleteBookError: 'Error deleting book. Please try again.',
  validation: {
    title: {
      minLength: 'Title must be at least 3 characters long',
      required: 'Title is required',
    },
    author: {
      minLength: 'Author must be at least 3 characters long',
      required: 'Author is required',
    },
    genre: {
      minLength: 'Genre must be at least 3 characters long',
      required: 'Genre is required',
    },
    description: {
      minLength: 'Description must be at least 10 characters long',
      required: 'Description is required',
    },
  },
};

export default messages;
