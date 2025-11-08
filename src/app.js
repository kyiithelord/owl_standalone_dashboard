import { Component, xml } from "@odoo/owl";
import Layout from "./components/Layout.js";
import Dashboard from "./pages/Dashboard.js";

export default class App extends Component {
  static components = { Layout, Dashboard };
  static template = xml/* xml */`
    <Layout title="Dashboard">
      <Dashboard/>
    </Layout>
  `;
}
