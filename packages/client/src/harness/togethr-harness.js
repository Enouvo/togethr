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
        <!-- Togethr Projects -->

        <action-card
          title="Create a new project"
          description="Create a new project"
          action="createProject"
          method="post"
          fields="creator name"
        >
          <account-widget field="creator" label="Creator" placeholder="Creator">
          </account-widget>
          <text-widget
            field="name"
            label="Project name"
            placeholder="Project name"
          ></text-widget>
        </action-card>

        <action-card
          title="All projects"
          description="Get all projects"
          action="getAllProjects"
          method="get"
        >
        </action-card>

        <action-card
          title="Fund a new project"
          description="Fund a new project"
          action="fundProject"
          method="post"
          fields="funder projectId amount"
        >
          <account-widget field="funder" label="Funder" placeholder="Funder">
          </account-widget>
          <text-widget
            field="projectId"
            label="Project ID"
            placeholder="Project ID"
          ></text-widget>
          <text-widget
            field="amount"
            label="Amount"
            placeholder="Amount"
          ></text-widget>
        </action-card>

        <action-card
          title="Get all funded project"
          description="Get all funded project by a user"
          action="getFundedProjects"
          method="get"
          fields="funder"
        >
          <account-widget field="funder" label="Funder" placeholder="Funder">
          </account-widget>
        </action-card>

        <action-card
          title="Get list of funders"
          description="Get list of funders funded a project"
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

        <!-- Togethr Market -->
      </page-body>
      <page-panel id="resultPanel"></page-panel>
    `;

    return content;
  }
}
