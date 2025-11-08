import { Component, xml } from "@odoo/owl";
import Sidebar from "./Sidebar.js";
import Topbar from "./Topbar.js";

export default class Layout extends Component {
  static components = { Sidebar, Topbar };
  static props = {
    title: { type: String, optional: true },
  };
  static template = xml/* xml */`
    <div class="min-h-screen flex bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Sidebar/>
      <div class="flex-1 flex flex-col min-w-0">
        <Topbar t-props="{ title: props.title }"/>
        <main class="flex-1 p-6">
          <t t-slot="default"/>
        </main>
      </div>
    </div>
  `;
}
