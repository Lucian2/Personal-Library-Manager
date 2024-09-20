import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FunctionComponent } from 'react';
import { BookType, fetchBooks } from './api';
import BOOK_TABLE_HEADERS from '../../constants/tableHeaders';
import { mapBookToRow } from './helpers';
import ENDPOINTS from '../../constants/urls';
import useSWR from 'swr';
import { Box, CircularProgress, Typography } from '@mui/material';
import messages from '../../constants/messages';

const BookList: FunctionComponent = () => {
  const { data: bookList, error } = useSWR<BookType[]>(
    ENDPOINTS.BOOKS,
    fetchBooks
  );
  const tableRows = bookList?.map((el: BookType) => mapBookToRow(el));

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
              <TableCell key={header} align='center'>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!!tableRows?.length ? (
            tableRows?.map((row) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center'>{row.title}</TableCell>
                <TableCell align='center'>{row.author}</TableCell>
                <TableCell align='center'>{row.genre}</TableCell>
                <TableCell align='center'>{row.description}</TableCell>
                <TableCell align='center'>{messages.edit}</TableCell>
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
