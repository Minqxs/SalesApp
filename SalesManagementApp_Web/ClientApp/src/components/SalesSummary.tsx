import React, { useMemo, useState } from 'react';
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
    TableFooter,
    TablePagination,
    Grid2,
    debounce,
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
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [productName, setProductName] = useState<string>('');
    const [isLoading, startTransition] = React.useTransition();
    const rowsPerPage = 50;
    const sales = data.sales?.edges?.slice((page - 1) * 50, page * 50);;



    // Handle page change for the MUI TablePagination
    const handleChangePage = (event: unknown, newPage: number) => {
        const direction = newPage > page ? 'next' : 'previous';
        setPage(newPage);

        if (direction === 'next' && hasNext) {
            loadNext(rowsPerPage);
        } else if (direction === 'previous' && hasPrevious) {
            loadPrevious(rowsPerPage);
        }
    };

    const handleRefetch = (newStartDate: Date | null, newOldDate: Date | null, filter: string | null) => {
        startTransition(() => {
            refetch({
                startDate: newStartDate?.toISOString(),
                endDate: newOldDate?.toISOString(),
                productName: filter
            },
                { fetchPolicy: 'network-only' },);
        });
    };

    const handleStartDate = (value: Date | null) => {
        setStartDate(value);
        handleRefetch(
            value,
            endDate,
            null
        );
    };

    const handleEndDate = (value: Date | null) => {
        setEndDate(value);
        handleRefetch(
            startDate,
            value,
            null
        );
    };

    const refetchWithDebounce = useMemo(
        () =>
            debounce((newStartDate, newEndDate, newProductName) => {
                refetch({
                    startDate: newStartDate?.toISOString(),
                    endDate: newEndDate?.toISOString(),
                    productName: newProductName,
                });
            }, 550),
        [refetch]
    );

    const handleProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setProductName(value);
        refetchWithDebounce(startDate, endDate, value);
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Summary Screen
            </Typography>
            <Grid2 container alignItems={'center'} columnGap={2} size={12} >
                <Grid2 container spacing={2} size={7}>
                    <Grid2 size={5}>
                        <DatePicker
                            label="Start Date Range"
                            value={startDate}
                            onChange={(value) => {
                                handleStartDate(value);
                            }}
                        />
                    </Grid2>
                    <Grid2 size={5}>
                        <DatePicker
                            label="End Date Range"
                            value={endDate}
                            onChange={(value) => { handleEndDate(value); }}
                        />
                    </Grid2>
                </Grid2>
                <Grid2 size={3} display='flex' justifyContent={'flex-end'}>
                    <TextField
                        label="Filter by description"
                        variant="outlined"
                        fullWidth
                        value={productName}
                        onChange={handleProductNameChange}
                    />
                </Grid2>

            </Grid2>


            <TableContainer component={Paper} sx={{ width: '100%', marginTop: '20px' }}>
                <Table sx={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>
                                <TableSortLabel>
                                    Price
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel>
                                    Items
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
                                    <TableCell>{products}</TableCell>
                                    <TableCell>${node.salePrice}</TableCell>
                                    <TableCell>{node.quantity}</TableCell>
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
                                count={data.sales?.totalCount || 0}
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
