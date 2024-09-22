import { useState } from 'react';
import { mutate } from 'swr';
import { BookFormValues } from '../models/common';
import {
  addBook,
  deleteBook,
  updateBook,
} from '../components/book-management/api';
import ENDPOINTS from '../constants/urls';
import messages from '../constants/messages';
import { toast } from 'react-toastify';

const useBookActions = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddBook = async (
    bookData: BookFormValues,
    onSuccess?: () => void
  ) => {
    try {
      setIsLoading(true);
      await addBook(bookData);
      mutate(ENDPOINTS.BOOKS);
      toast.success(messages.addBookSuccess);
      if (onSuccess) onSuccess(); // Callback pentru închiderea modalului
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || messages.addBookError;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBook = async (
    bookData: BookFormValues,
    bookId: number,
    onSuccess?: () => void
  ) => {
    try {
      setIsLoading(true);
      await updateBook(bookId, bookData);
      mutate(ENDPOINTS.BOOKS);
      toast.success(messages.editBookSuccess);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || messages.editBookError;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBook = async (bookId: number, onSuccess?: () => void) => {
    try {
      await deleteBook(bookId);
      mutate(ENDPOINTS.BOOKS);
      toast.success(messages.deleteBookSuccess);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || messages.deleteBookError;
      toast.error(errorMessage);
    }
  };

  return {
    handleAddBook,
    handleUpdateBook,
    handleDeleteBook,
    isLoading,
  };
};

export default useBookActions;
