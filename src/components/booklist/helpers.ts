import { BookType } from './api';

export const mapBookToRow = ({
  title,
  author,
  genre,
  description,
}: BookType) => ({
  title,
  author,
  genre,
  description,
});
