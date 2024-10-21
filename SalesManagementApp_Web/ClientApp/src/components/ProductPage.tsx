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
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { graphql, useLazyLoadQuery, usePaginationFragment } from 'react-relay';
import { SalesSummary_data$key } from './__generated__/SalesSummary_data.graphql';
import { SalesSummaryQuery } from './__generated__/SalesSummaryQuery.graphql';
import { ProductPage_products$key } from './__generated__/ProductPage_products.graphql';
import { ProductPageQuery } from './__generated__/ProductPageQuery.graphql';
import { useEditParcelPlan } from './useEditProductMutation';

const query = graphql`
  query ProductPageQuery(
        $count: Int = 50
        $startCursor: String
        $productName: String
  ) {
    ...ProductPage_products
  }`;

const fragment = graphql`
  fragment ProductPage_products on Query
  @refetchable(queryName: "ProductPagePaginationQuery") {
    products(
        productName: $productName
        first: $count
        after: $startCursor
    ) @connection(key: "ProductPage_products") {
        __id
        edges {
          node {
            id
            description
            price
            image
          }
        }
        totalCount
      }
 }`;

graphql` fragment ProductPage_Product on Product{
 id
            description
            price
            image
}`;

interface Props {
    queryRef: ProductPage_products$key
}

type Product = {
    id: string;
    description: string;
    price: number;
    image: string | null;
}

function InnerProductPage({ queryRef }: Props) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editProduct, isLoading] = useEditParcelPlan();
    const [startTransition] = React.useTransition();
    const {
        data,

        refetch,
    } = usePaginationFragment<
        ProductPageQuery,
        ProductPage_products$key
    >(fragment, queryRef);
    const products = data.products;



    const handleEditClick = (product: Product) => {
        setSelectedProduct(product);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedProduct(null);
    };


    const handleSaveChanges = () => {
        editProduct({
            variables: {
                input: {
                    productId: selectedProduct?.id ?? '',
                    price: selectedProduct?.price ?? 0,
                    description: selectedProduct?.description ?? '',
                    image: selectedProduct?.image,
                },
            },
            onCompleted: () => {
                alert('Product updated successfully');
                handleDialogClose();
            },
            onError: (e) => {
                alert(e);
            },
        })

    };


    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Products
            </Typography>

            <TextField
                label="Filter by description"
                variant="outlined"
                fullWidth
                margin="normal"
            // onChange={handleProductNameChange}  // Debounced product filter
            />

            <Grid2 container spacing={4} sx={{ marginTop: '20px' }}>
                {products?.edges?.map(({ node }) => {
                    return (
                        <Grid2 size={3} key={node.id}>
                            <Card>
                                {node.image && (  // Conditionally render if image is present
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={node.image}  // Image URL or fallback
                                        alt={node.description}
                                    />
                                )}
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {node.description}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: ${node.price.toFixed(2)}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={() => handleEditClick(node as Product)} >
                                        Edit
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid2>
                    );

                })}
            </Grid2>
            <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    {selectedProduct && (
                        <>
                            <TextField
                                margin="dense"
                                label="Description"
                                fullWidth
                                value={selectedProduct.description}
                                onChange={(e) =>
                                    setSelectedProduct({
                                        ...selectedProduct,
                                        description: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                margin="dense"
                                label="Price"
                                fullWidth
                                type="number"
                                value={selectedProduct.price}
                                onChange={(e) =>
                                    setSelectedProduct({
                                        ...selectedProduct,
                                        price: parseFloat(e.target.value),
                                    })
                                }
                            />
                            <TextField
                                margin="dense"
                                label="Image URL"
                                fullWidth
                                value={selectedProduct.image || ''}
                                onChange={(e) =>
                                    setSelectedProduct({
                                        ...selectedProduct,
                                        image: e.target.value,
                                    })
                                }
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveChanges} color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </Container >
    );

}

export default function ProductPage() {
    const data = useLazyLoadQuery<ProductPageQuery>(
        query,
        {},
        { fetchPolicy: 'network-only' },
    );
    return (
        <InnerProductPage
            queryRef={data}
        />
    );
}
