import { BookFormValues } from '../models/common';

const fields: Array<{
  id: keyof BookFormValues;
  name: keyof BookFormValues;
  label: string;
}> = [
  { id: 'title', name: 'title', label: 'Title' },
  { id: 'author', name: 'author', label: 'Author' },
  { id: 'genre', name: 'genre', label: 'Genre' },
  { id: 'description', name: 'description', label: 'Description' },
];

export default fields;
