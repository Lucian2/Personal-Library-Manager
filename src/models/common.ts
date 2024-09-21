export interface BookFormValues {
  title: string;
  author: string;
  genre: string;
  description: string;
}

export interface BookType extends BookFormValues {
  id: number;
}
