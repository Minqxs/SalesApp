import {graphql, useMutation} from 'react-relay';
import {useCreateProductMutation} from './__generated__/useCreateProductMutation.graphql';

export const useCreateParcelPlan = () =>
  useMutation<useCreateProductMutation>(graphql`
    mutation useCreateProductMutation(
      $input: CreateProductInput!
    ) {
      createProduct(input: $input) {
          id
            description
            price
            image
        ...ProductPage_Product
      }
    }
  `);
