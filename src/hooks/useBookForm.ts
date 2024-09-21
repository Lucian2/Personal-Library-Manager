import * as Yup from 'yup';
import { useFormik } from 'formik';
import { BookFormValues } from '../models/common';
import messages from '../constants/messages';

export const useBookForm = (
  onSubmit: (values: BookFormValues) => void,
  initialValues: BookFormValues = {
    title: '',
    author: '',
    genre: '',
    description: '',
  }
) => {
  return useFormik({
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, messages.validation.title.minLength)
        .required(messages.validation.title.required),
      author: Yup.string()
        .min(3, messages.validation.author.minLength)
        .required(messages.validation.author.required),
      genre: Yup.string()
        .min(3, messages.validation.genre.minLength)
        .required(messages.validation.genre.required),
      description: Yup.string()
        .min(10, messages.validation.description.minLength)
        .required(messages.validation.description.required),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
};
