/**
 * @generated SignedSource<<c308f09aad6838ecedd7db3b90e93fb3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SalesSummaryQuery$variables = {
  count?: number | null | undefined;
  endDate?: any | null | undefined;
  productName?: string | null | undefined;
  startCursor?: string | null | undefined;
  startDate?: any | null | undefined;
};
export type SalesSummaryQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SalesSummary_data">;
};
export type SalesSummaryQuery = {
  response: SalesSummaryQuery$data;
  variables: SalesSummaryQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": 50,
  "kind": "LocalArgument",
  "name": "count"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "endDate"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productName"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "startCursor"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "startDate"
},
v5 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "startCursor"
  },
  {
    "kind": "Variable",
    "name": "endDate",
    "variableName": "endDate"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  {
    "kind": "Variable",
    "name": "productName",
    "variableName": "productName"
  },
  {
    "kind": "Variable",
    "name": "startDate",
    "variableName": "startDate"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SalesSummaryQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "SalesSummary_data"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v4/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "SalesSummaryQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "SalesConnection",
        "kind": "LinkedField",
        "name": "sales",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SalesEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Sale",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "quantity",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "saleDate",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "salePrice",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Product",
                    "kind": "LinkedField",
                    "name": "products",
                    "plural": true,
                    "selections": [
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "description",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "ClientExtension",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__id",
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "filters": [
          "productName",
          "startDate",
          "endDate"
        ],
        "handle": "connection",
        "key": "SalesSummaryPage_sales",
        "kind": "LinkedHandle",
        "name": "sales"
      }
    ]
  },
  "params": {
    "cacheID": "be66b3f08cd0c06dcc4cebd40041ce26",
    "id": null,
    "metadata": {},
    "name": "SalesSummaryQuery",
    "operationKind": "query",
    "text": "query SalesSummaryQuery(\n  $startDate: DateTime\n  $endDate: DateTime\n  $count: Int = 50\n  $startCursor: String\n  $productName: String\n) {\n  ...SalesSummary_data\n}\n\nfragment SalesSummary_data on Query {\n  sales(productName: $productName, startDate: $startDate, endDate: $endDate, first: $count, after: $startCursor) {\n    edges {\n      node {\n        id\n        quantity\n        saleDate\n        salePrice\n        products {\n          id\n          description\n        }\n        __typename\n      }\n      cursor\n    }\n    totalCount\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3df2333be6bb955dce2d2392756af8bc";

export default node;
