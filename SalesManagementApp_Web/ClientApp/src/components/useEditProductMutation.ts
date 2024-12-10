import {graphql, useMutation} from 'react-relay';
import {useEditProductMutation} from './__generated__/useEditProductMutation.graphql';

export const useEditParcelPlan = () =>
  useMutation<useEditProductMutation>(graphql`
    mutation useEditProductMutation(
      $input: EditProductInput!
    ) {
      editProduct(input: $input) {
          id
            description
            price
            image
           
      }
    }
  `);
