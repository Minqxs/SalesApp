import React, { useState } from 'react';
import {
    Container,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Paper,
    Typography,
    Grid,
    TableFooter,
    TablePagination,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { graphql, useLazyLoadQuery, usePaginationFragment } from 'react-relay';
import { SalesSummary_data$key } from './__generated__/SalesSummary_data.graphql';
import { SalesSummaryQuery } from './__generated__/SalesSummaryQuery.graphql';

const query = graphql`
  query SalesSummaryQuery(
        $startDate: DateTime
        $endDate: DateTime
        $count: Int = 50
        $startCursor: String
        $productName: String
  ) {
    ...SalesSummary_data
  }`;

const fragment = graphql`
  fragment SalesSummary_data on Query
  @refetchable(queryName: "SalesSummaryPagePaginationQuery") {
    sales(
        productName: $productName
        startDate: $startDate
        endDate: $endDate
        first: $count
        after: $startCursor
    ) @connection(key: "SalesSummaryPage_sales") {
        __id
        edges {
          node {
            id
            quantity
            saleDate
            salePrice
            products {
              id
              description
            }
          }
        }
        totalCount
      }
 }`;

interface Props {
    queryRef: SalesSummary_data$key
}

function InnerSalesSummary({ queryRef }: Props) {
    const {
        data,
        hasNext,
        hasPrevious,
        loadNext,
        loadPrevious,
        refetch,
    } = usePaginationFragment<
        SalesSummaryQuery,
        SalesSummary_data$key
    >(fragment, queryRef);
    // State for managing pagination
    const [page, setPage] = useState(1);
    const rowsPerPage = 50;
    const sales = data.sales?.edges?.slice((page - 1) * 50, page * 50);;



    // Handle page change for the MUI TablePagination
    const handleChangePage = (event: unknown, newPage: number) => {
        const direction = newPage > page ? 'next' : 'previous';
        setPage(newPage);

        if (direction === 'next' && hasNext) {
            loadNext(rowsPerPage); // Use Relay's built-in loadNext function
        } else if (direction === 'previous' && hasPrevious) {
            loadPrevious(rowsPerPage); // Use Relay's built-in loadPrevious function
        }
    };


    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Summary Screen
            </Typography>
            <Grid container alignItems={'center'}>
                <Grid container spacing={2} justifyContent="space-between">
                    <Grid item xs={12} sm={6} md={4}>
                        <DatePicker label="Start Date Range" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <DatePicker label="End Date Range" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <TextField
                            label="Filter by description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ width: '100%', marginTop: '20px' }}>
                <Table sx={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel>
                                    ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>
                                <TableSortLabel>
                                    Price
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel>
                                    Sale Date
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sales?.map(({ node }) => {
                            const products = node.products.map((product) => product.description).join(', ');
                            return (
                                <TableRow key={node.id}>
                                    <TableCell>{node.id}</TableCell>
                                    <TableCell>{products}</TableCell>
                                    <TableCell>${node.salePrice}</TableCell>
                                    <TableCell>{node.saleDate}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[50]}
                                colSpan={4}
                                count={data.sales?.totalCount || 0}  // Total count of records for pagination
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default function SalesSummary() {
    const data = useLazyLoadQuery<SalesSummaryQuery>(
        query,
        {},
        { fetchPolicy: 'network-only' },
    );
    return (
        <InnerSalesSummary
            queryRef={data}
        />
    );
}
