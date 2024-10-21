/**
 * @generated SignedSource<<466fe5ba54255a7baf5fa19ac4369f02>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SalesSummary_data$data = {
  readonly sales: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly products: ReadonlyArray<{
          readonly description: string;
          readonly id: string;
        }>;
        readonly quantity: number;
        readonly saleDate: any;
        readonly salePrice: number;
      };
    }> | null | undefined;
    readonly totalCount: number;
  } | null | undefined;
  readonly " $fragmentType": "SalesSummary_data";
};
export type SalesSummary_data$key = {
  readonly " $data"?: SalesSummary_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"SalesSummary_data">;
};

import SalesSummaryPagePaginationQuery_graphql from './SalesSummaryPagePaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "sales"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "count"
    },
    {
      "kind": "RootArgument",
      "name": "endDate"
    },
    {
      "kind": "RootArgument",
      "name": "productName"
    },
    {
      "kind": "RootArgument",
      "name": "startCursor"
    },
    {
      "kind": "RootArgument",
      "name": "startDate"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "startCursor",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "count",
          "cursor": "startCursor"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": SalesSummaryPagePaginationQuery_graphql
    }
  },
  "name": "SalesSummary_data",
  "selections": [
    {
      "alias": "sales",
      "args": [
        {
          "kind": "Variable",
          "name": "endDate",
          "variableName": "endDate"
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
      "concreteType": "SalesConnection",
      "kind": "LinkedField",
      "name": "__SalesSummaryPage_sales_connection",
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
                (v1/*: any*/),
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
                    (v1/*: any*/),
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "c1063bed632358a51dad24779e65579d";

export default node;
