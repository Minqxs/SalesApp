/**
 * @generated SignedSource<<c92272119aefa694f8e701df488cc9d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditProductInput = {
  description: string;
  image?: string | null | undefined;
  price: number;
  productId: string;
};
export type useEditProductMutation$variables = {
  input: EditProductInput;
};
export type useEditProductMutation$data = {
  readonly editProduct: {
    readonly description: string;
    readonly id: string;
    readonly image: string | null | undefined;
    readonly price: number;
    readonly " $fragmentSpreads": FragmentRefs<"ProductPage_Product">;
  };
};
export type useEditProductMutation = {
  response: useEditProductMutation$data;
  variables: useEditProductMutation$variables;
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
    "name": "useEditProductMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "editProduct",
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
    "name": "useEditProductMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "editProduct",
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
    "cacheID": "3d8d16eeafb5ffb08c0c7581e3d33198",
    "id": null,
    "metadata": {},
    "name": "useEditProductMutation",
    "operationKind": "mutation",
    "text": "mutation useEditProductMutation(\n  $input: EditProductInput!\n) {\n  editProduct(input: $input) {\n    id\n    description\n    price\n    image\n    ...ProductPage_Product\n  }\n}\n\nfragment ProductPage_Product on Product {\n  id\n  description\n  price\n  image\n}\n"
  }
};
})();

(node as any).hash = "5d8b57b6effcafb55feb67d220a26fec";

export default node;
