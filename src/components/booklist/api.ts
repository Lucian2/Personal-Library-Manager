import axios from '../../api/axios';
import ENDPOINTS from '../../constants/urls';
import { BookType } from '../../models/common';

export const fetchBooks = async (): Promise<BookType[]> => {
  const response = await axios.get<BookType[]>(`${ENDPOINTS.BOOKS}`);
  return response.data;
};
