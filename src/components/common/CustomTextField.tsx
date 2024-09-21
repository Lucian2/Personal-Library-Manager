import { TextField } from '@mui/material';
import { FunctionComponent } from 'react';

interface CustomTextFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText: string | false | undefined;
}

const CustomTextField: FunctionComponent<CustomTextFieldProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <TextField
      fullWidth
      margin='normal'
      id={id}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  );
};

export default CustomTextField;
