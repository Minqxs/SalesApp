/**
 * @generated SignedSource<<e581e22ab28a4ccc6885f734521feb5a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SalesSummaryPagePaginationQuery$variables = {
  count?: number | null | undefined;
  endDate?: any | null | undefined;
  productName?: string | null | undefined;
  startCursor?: string | null | undefined;
  startDate?: any | null | undefined;
};
export type SalesSummaryPagePaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SalesSummary_data">;
};
export type SalesSummaryPagePaginationQuery = {
  response: SalesSummaryPagePaginationQuery$data;
  variables: SalesSummaryPagePaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "endDate"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "productName"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "startCursor"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "startDate"
  }
],
v1 = [
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SalesSummaryPagePaginationQuery",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SalesSummaryPagePaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                  (v2/*: any*/),
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
                      (v2/*: any*/),
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
        "args": (v1/*: any*/),
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
    "cacheID": "e34168ca4e9c76f50b465f436c0d9317",
    "id": null,
    "metadata": {},
    "name": "SalesSummaryPagePaginationQuery",
    "operationKind": "query",
    "text": "query SalesSummaryPagePaginationQuery(\n  $count: Int\n  $endDate: DateTime\n  $productName: String\n  $startCursor: String\n  $startDate: DateTime\n) {\n  ...SalesSummary_data\n}\n\nfragment SalesSummary_data on Query {\n  sales(productName: $productName, startDate: $startDate, endDate: $endDate, first: $count, after: $startCursor) {\n    edges {\n      node {\n        id\n        quantity\n        saleDate\n        salePrice\n        products {\n          id\n          description\n        }\n        __typename\n      }\n      cursor\n    }\n    totalCount\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c1063bed632358a51dad24779e65579d";

export default node;
