import axios from '../../api/axios';
import ENDPOINTS from '../../constants/urls';
import { BookFormValues, BookType } from '../../models/common';

export const addBook = async (bookData: BookFormValues): Promise<BookType> => {
  const response = await axios.post<BookType>(`${ENDPOINTS.BOOKS}`, bookData);
  return response.data;
};

export const updateBook = async (
  id: number,
  bookData: BookFormValues
): Promise<BookType> => {
  const response = await axios.put<BookType>(
    `${ENDPOINTS.BOOKS}/${id}`,
    bookData
  );
  return response.data;
};

export const deleteBook = async (id: number): Promise<void> => {
  await axios.delete(`${ENDPOINTS.BOOKS}/${id}`);
};
