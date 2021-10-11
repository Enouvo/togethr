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
          description="Read all projects"
          action="getAllProjects"
          method="get"
        >
        </action-card>

        <!-- Togethr Market -->
      </page-body>
      <page-panel id="resultPanel"></page-panel>
    `;

    return content;
  }
}
