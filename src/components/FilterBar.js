import { Component, xml } from "@odoo/owl";
import { filters } from "../store/filters.js";

export default class FilterBar extends Component {
  setup() {
    this.filters = filters;
  }
  static template = xml/* xml */`
    <div class="flex items-center gap-2">
      <div class="text-xs text-gray-500">Range</div>
      <div class="inline-flex rounded-md border border-gray-200 overflow-hidden dark:border-gray-700">
        <button t-on-click="() => filters.setRange('7d')" t-att-class="'px-3 py-1.5 text-sm ' + (filters.state.range==='7d' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700')">7d</button>
        <button t-on-click="() => filters.setRange('30d')" t-att-class="'px-3 py-1.5 text-sm border-l border-gray-200 dark:border-gray-700 ' + (filters.state.range==='30d' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700')">30d</button>
        <button t-on-click="() => filters.setRange('90d')" t-att-class="'px-3 py-1.5 text-sm border-l border-gray-200 dark:border-gray-700 ' + (filters.state.range==='90d' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700')">90d</button>
      </div>
    </div>
  `;
}
