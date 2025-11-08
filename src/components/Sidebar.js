import { Component, xml } from "@odoo/owl";

export default class Sidebar extends Component {
  static template = xml/* xml */`
    <aside class="w-64 hidden lg:flex lg:flex-col bg-white border-r border-gray-200">
      <div class="h-16 flex items-center px-6 text-xl font-semibold">Brand</div>
      <nav class="flex-1 px-3 space-y-1">
        <a href="#" class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Dashboard</a>
        <a href="#" class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Analytics</a>
        <a href="#" class="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Settings</a>
      </nav>
    </aside>
  `;
}
