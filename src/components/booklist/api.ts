import axios from '../../api/axios';
import ENDPOINTS from '../../constants/urls';

export interface BookType {
  title: string;
  author: string;
  genre: string;
  description: string;
}

export const fetchBooks = async (): Promise<BookType[]> => {
  const response = await axios.get<BookType[]>(`${ENDPOINTS.BOOKS}`);
  return response.data;
};
