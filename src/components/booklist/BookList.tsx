import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FunctionComponent, useEffect } from 'react';
import { fetchBooks } from './api';
import BOOK_TABLE_HEADERS from '../../constants/tableHeaders';
import { mapBookToRow } from './helpers';
import ENDPOINTS from '../../constants/urls';
import useSWR from 'swr';
import { Box, CircularProgress, Typography } from '@mui/material';
import messages from '../../constants/messages';
import { BookType } from '../../models/common';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface BookListProps {
  genreFilter: string;
  onGenresExtracted: (books: BookType[]) => void;
  onEditIconClick: (book: BookType) => void;
  onDeleteIconClick: (bookId: number) => void;
}

const BookList: FunctionComponent<BookListProps> = ({
  genreFilter,
  onGenresExtracted,
  onEditIconClick,
  onDeleteIconClick,
}) => {
  const { data: bookList, error } = useSWR<BookType[]>(
    ENDPOINTS.BOOKS,
    fetchBooks
  );
  const filteredBooks = genreFilter
    ? bookList?.filter((book) => book.genre.toLocaleLowerCase() === genreFilter)
    : bookList;
  const tableRows = filteredBooks?.map((el: BookType) => mapBookToRow(el));

  useEffect(() => {
    if (bookList) {
      onGenresExtracted(bookList);
    }
  }, [bookList]);

  if (error) {
    console.error('Error fetching books:', error);
    return (
      <Box display='flex' justifyContent='center'>
        <Typography>{messages.errorFetchingBooks}</Typography>
      </Box>
    );
  }

  if (!bookList)
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress />
      </Box>
    );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {BOOK_TABLE_HEADERS.map((header) => (
              <TableCell
                sx={{ fontWeight: 'bold' }}
                key={header}
                align='center'
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!!tableRows?.length ? (
            tableRows?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center'>{row.title}</TableCell>
                <TableCell align='center'>{row.author}</TableCell>
                <TableCell align='center'>{row.genre}</TableCell>
                <TableCell align='center'>{row.description}</TableCell>
                <TableCell align='center'>
                  <IconButton
                    aria-label='edit'
                    color='secondary'
                    onClick={() => onEditIconClick(row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    color='error'
                    onClick={() => onDeleteIconClick(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={BOOK_TABLE_HEADERS.length} align='center'>
                <Typography>{messages.noBooksAdded}</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookList;
