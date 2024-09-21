import { BookType } from '../../models/common';

export const mapBookToRow = ({
  id,
  title,
  author,
  genre,
  description,
}: BookType) => ({
  id,
  title,
  author,
  genre,
  description,
});
