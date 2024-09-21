import {
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CustomTextField from '../common/CustomTextField';
import { FunctionComponent, useEffect } from 'react';
import { BookFormValues } from '../../models/common';
import CloseIcon from '@mui/icons-material/Close';
import fields from '../../constants/fields';
import { closeModalIconStyle, modalStyle } from '../../constants/modalStyles';
import { useBookForm } from '../../hooks/useBookForm';

interface AddBookModalProps {
  title: string;
  btnLabel: string;
  initialBookValues?: BookFormValues;
  isLoading: boolean;
  open: boolean;
  handleClose: () => void;
  onSubmit: (values: BookFormValues) => void;
}

const AddEditBookModal: FunctionComponent<AddBookModalProps> = ({
  title,
  btnLabel,
  initialBookValues,
  isLoading,
  open,
  handleClose,
  onSubmit,
}) => {
  const formik = useBookForm(onSubmit, initialBookValues);

  useEffect(() => {
    if (!open && formik.dirty) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={closeModalIconStyle}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant='h6' component='h2'>
          {title}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {fields.map((field) => (
            <CustomTextField
              key={field.id}
              id={field.id}
              name={field.name}
              label={field.label}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              error={
                formik.touched[field.name] && Boolean(formik.errors[field.name])
              }
              helperText={
                formik.touched[field.name] && formik.errors[field.name]
              }
            />
          ))}
          <Button
            sx={{ mt: 3, minWidth: '5.65rem' }}
            variant='contained'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : btnLabel}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddEditBookModal;
