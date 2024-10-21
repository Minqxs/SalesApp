/**
 * @generated SignedSource<<bbdb4d4028b51771786ccd2bd16e252f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProductPage_Product$data = {
  readonly description: string;
  readonly id: string;
  readonly image: string | null | undefined;
  readonly price: number;
  readonly " $fragmentType": "ProductPage_Product";
};
export type ProductPage_Product$key = {
  readonly " $data"?: ProductPage_Product$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProductPage_Product">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProductPage_Product",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "price",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "image",
      "storageKey": null
    }
  ],
  "type": "Product",
  "abstractKey": null
};

(node as any).hash = "058fc906a852938fc34f2c4d5831c56b";

export default node;
