import "../components/page-panel.js";
import "../components/page-body.js";
import "../components/action-card.js";
import "../components/account-widget.js";
import "../components/text-widget.js";
import "../components/number-widget.js";
import "../components/switch-widget.js";
import "../components/array-widget.js";
import "../components/dictionary-widget.js";

import DappLib from "@decentology/dappstarter-dapplib";
import { LitElement, html, customElement, property } from "lit-element";

@customElement("togethr-harness")
export default class KittyItemsHarness extends LitElement {
  @property()
  title;
  @property()
  category;
  @property()
  description;

  createRenderRoot() {
    return this;
  }

  constructor(args) {
    super(args);
  }

  render() {
    let content = html`
      <page-body
        title="${this.title}"
        category="${this.category}"
        description="${this.description}"
      >
        <!-- Flow Token -->
        <action-card
          title="Get Balance"
          description="Get the Flow Token balance of an account"
          action="getFlowBalance"
          method="get"
          fields="account"
        >
          <account-widget field="account" label="Account"> </account-widget>
        </action-card>

        <!-- Togethr Projects -->
        ipfsHash: String, tokenPrice: UFix64, tokenCount: UInt32,
        profitSharePercent: UInt32
        <action-card
          title="Create a new project"
          description="Create a new project"
          action="createProject"
          method="post"
          fields="creator name ipfsHash tokenPrice tokenCount profitSharePercent"
        >
          <account-widget field="creator" label="Creator" placeholder="Creator">
          </account-widget>
          <text-widget
            field="name"
            label="Project name"
            placeholder="Project name"
          ></text-widget>
          <text-widget
            field="ipfsHash"
            label="IPFS Hash"
            placeholder="IPFS Hash"
          ></text-widget>
          <text-widget
            field="tokenPrice"
            label="Token Price"
            placeholder="Token Price"
          ></text-widget>
          <text-widget
            field="tokenCount"
            label="Token Count"
            placeholder="Token Count"
          ></text-widget>
          <text-widget
            field="profitSharePercent"
            label="Profit Share Percent"
            placeholder="Profit Share Percent"
          ></text-widget>
        </action-card>

        <action-card
          title="Get project"
          description="Get project"
          action="getProject"
          method="get"
          fields="projectId"
        >
          <text-widget
            field="projectId"
            label="Project ID"
            placeholder="Project ID"
          ></text-widget>
        </action-card>

        <action-card
          title="Get project remaining token count"
          description="Get project remaining token count"
          action="getProjectRemainingTokenCount"
          method="get"
          fields="projectId"
        >
          <text-widget
            field="projectId"
            label="Project ID"
            placeholder="Project ID"
          ></text-widget>
        </action-card>

        <action-card
          title="Get all project"
          description="Get all project"
          action="getAllProjects"
          method="get"
          fields=""
        >
        </action-card>

        <action-card
          title="Fund a new project"
          description="Fund a new project"
          action="fundProject"
          method="post"
          fields="funder projectId tokenCount"
        >
          <account-widget field="funder" label="Funder" placeholder="Funder">
          </account-widget>
          <text-widget
            field="projectId"
            label="Project ID"
            placeholder="Project ID"
          ></text-widget>
          <text-widget
            field="tokenCount"
            label="Token Count"
            placeholder="Token Count"
          ></text-widget>
        </action-card>

        <action-card
          title="Get all funded project"
          description="Get all funded project by a user"
          action="getFundedProjects"
          method="get"
          fields="address"
        >
          <account-widget field="address" label="Address" placeholder="Address">
          </account-widget>
        </action-card>

        <action-card
          title="Get list of funders"
          description="Get addresses of funders funded a project"
          action="getFunders"
          method="get"
          fields="projectId"
        >
          <text-widget
            field="projectId"
            label="Project ID"
            placeholder="Project ID"
          ></text-widget>
        </action-card>

        <!-- Togethr Market -->

        <action-card
          title="Mint project as NFT"
          description="Mint project as NFT"
          action="mintProject"
          method="post"
          fields="creator projectId"
        >
          <account-widget field="creator" label="Creator" placeholder="Creator">
          </account-widget>
          <text-widget
            field="projectId"
            label="Project ID"
            placeholder="Project ID"
          ></text-widget>
        </action-card>

        <action-card
          title="Get all project for sale"
          description="Get all project for sale"
          action="getProjectsOnSale"
          method="get"
          fields=""
        >
        </action-card>

        <action-card
          title="List project for sale"
          description="List project for sale"
          action="listProject"
          method="post"
          fields="creator nftId"
        >
          <account-widget field="creator" label="Creator" placeholder="Creator">
          </account-widget>
          <text-widget
            field="nftId"
            label="NFT ID"
            placeholder="NFT ID"
          ></text-widget>
        </action-card>

        <action-card
          title="Buy NFT"
          description="Buy NFT"
          action="buyProject"
          method="post"
          fields="seller buyer nftId"
        >
          <account-widget field="seller" label="Seller" placeholder="Seller">
          </account-widget>

          <account-widget field="buyer" label="Buyer" placeholder="Buyer">
          </account-widget>
          <text-widget
            field="nftId"
            label="NFT ID"
            placeholder="NFT ID"
          ></text-widget>
        </action-card>
      </page-body>
      <page-panel id="resultPanel"></page-panel>
    `;

    return content;
  }
}
