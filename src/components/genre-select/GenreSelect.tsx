import { FormControl, MenuItem, Select } from '@mui/material';
import { FunctionComponent } from 'react';
import messages from '../../constants/messages';

interface GenreSelectProps {
  genres: string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

const GenreSelect: FunctionComponent<GenreSelectProps> = ({
  genres,
  selectedGenre,
  onGenreChange,
}) => {
  return (
    <FormControl className='form-control-genre'>
      <Select
        className='select-genre'
        displayEmpty
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
      >
        <MenuItem value=''>
          <em>{messages.allGenres}</em>
        </MenuItem>
        {genres.map((genre) => (
          <MenuItem
            sx={{ textTransform: 'capitalize' }}
            key={genre}
            value={genre}
          >
            <em>{genre}</em>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GenreSelect;
