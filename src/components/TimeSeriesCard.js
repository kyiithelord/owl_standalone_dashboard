import { Component, xml, useState } from "@odoo/owl";
import ChartCard from "./ChartCard.js";
import { getTimeseries } from "../services/charts/index.js";

export default class TimeSeriesCard extends Component {
  static components = { ChartCard };
  setup() {
    this.state = useState({
      range: '30d',
      data: this._makeDataset('30d'),
    });
  }
  _makeDataset(range) {
    const { labels, data } = getTimeseries(range);
    return {
      labels,
      datasets: [
        {
          label: 'Sessions',
          data,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.15)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }
  onChangeRange(range) {
    this.state.range = range;
    this.state.data = this._makeDataset(range);
  }
  static template = xml/* xml */`
    <div class="rounded-lg border border-gray-200 bg-white p-4 sm:p-5 dark:bg-gray-800 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-500">Traffic (Time Series)</div>
        <div class="inline-flex rounded-md border border-gray-200 overflow-hidden dark:border-gray-700">
          <button t-on-click="() => onChangeRange('7d')" t-att-class="'px-3 py-1.5 text-sm ' + (state.range==='7d' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700')">7d</button>
          <button t-on-click="() => onChangeRange('30d')" t-att-class="'px-3 py-1.5 text-sm border-l border-gray-200 dark:border-gray-700 ' + (state.range==='30d' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700')">30d</button>
          <button t-on-click="() => onChangeRange('90d')" t-att-class="'px-3 py-1.5 text-sm border-l border-gray-200 dark:border-gray-700 ' + (state.range==='90d' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700')">90d</button>
        </div>
      </div>
      <div class="mt-4">
        <ChartCard t-props="{ title: '', type: 'line', data: state.data, height: 260 }"/>
      </div>
    </div>
  `;
}
