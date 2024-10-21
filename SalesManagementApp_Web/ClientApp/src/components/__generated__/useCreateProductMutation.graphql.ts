/**
 * @generated SignedSource<<60f7c822a28beb08eb52bd576e11dcb4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateProductInput = {
  description: string;
  image?: string | null | undefined;
  price: number;
};
export type useCreateProductMutation$variables = {
  input: CreateProductInput;
};
export type useCreateProductMutation$data = {
  readonly createProduct: {
    readonly description: string;
    readonly id: string;
    readonly image: string | null | undefined;
    readonly price: number;
    readonly " $fragmentSpreads": FragmentRefs<"ProductPage_Product">;
  };
};
export type useCreateProductMutation = {
  response: useCreateProductMutation$data;
  variables: useCreateProductMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "image",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateProductMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "createProduct",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProductPage_Product"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutations",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useCreateProductMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "createProduct",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "92afc1488c047025d95f27e33f1d63f9",
    "id": null,
    "metadata": {},
    "name": "useCreateProductMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateProductMutation(\n  $input: CreateProductInput!\n) {\n  createProduct(input: $input) {\n    id\n    description\n    price\n    image\n    ...ProductPage_Product\n  }\n}\n\nfragment ProductPage_Product on Product {\n  id\n  description\n  price\n  image\n}\n"
  }
};
})();

(node as any).hash = "e3658165b0874886d6d041370de21a15";

export default node;
