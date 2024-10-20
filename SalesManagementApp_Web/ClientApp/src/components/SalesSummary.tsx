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
    Grid2,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { graphql, useLazyLoadQuery, useRefetchableFragment } from 'react-relay';
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
        products{
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
    const [{ sales }, refetch] = useRefetchableFragment<
        SalesSummaryQuery,
        SalesSummary_data$key
    >(fragment, queryRef);

    return (
        <Container maxWidth='lg' style={{ marginTop: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Summary Screen
            </Typography>
            <Grid2 container alignItems={'center'} >
                <Grid2 container size={7} columnGap={2}>
                    <Grid2 size={4}>
                        <DatePicker label="Start Date Range" />
                    </Grid2>
                    <Grid2 size={4}>
                        <DatePicker label="End Date Range" />
                    </Grid2>

                </Grid2>
                <Grid2 size={5} >
                    <TextField
                        label="Filter by description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    // value={filter}
                    // onChange={(e) => setFilter(e.target.value)}
                    />
                </Grid2>


            </Grid2>
            <TableContainer component={Paper} sx={{ width: '100%' }}>
                <Table sx={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                // active={orderBy === 'id'}
                                // direction={orderBy === 'id' ? order : 'asc'}
                                // onClick={() => handleRequestSort('id')}
                                >
                                    ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                Description
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                // active={orderBy === 'price'}
                                // direction={orderBy === 'price' ? order : 'asc'}
                                // onClick={() => handleRequestSort('price')}
                                >
                                    Price
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                // active={orderBy === 'saleDate'}
                                // direction={orderBy === 'saleDate' ? order : 'asc'}
                                // onClick={() => handleRequestSort('saleDate')}
                                >
                                    Sale Date
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sales?.edges?.map(({ node }) => {
                            const products = node.products.map((product) => product.description);
                            return (
                                <TableRow key={node.id}>
                                    <TableCell>{node.id}</TableCell>
                                    <TableCell>{products}</TableCell>
                                    <TableCell>${node.salePrice}</TableCell>
                                    <TableCell>{node.saleDate}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

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
    )
}
