import { Component, xml } from "@odoo/owl";
import ChartCard from "./ChartCard.js";
import { getTimeseries } from "../services/charts/index.js";
import { filters } from "../store/filters.js";

export default class TimeSeriesCard extends Component {
  static components = { ChartCard };
  setup() {
    this.filters = filters;
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
  static template = xml/* xml */`
    <div class="rounded-lg border border-gray-200 bg-white p-4 sm:p-5 dark:bg-gray-800 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-500">Traffic (Time Series)</div>
        <div class="text-xs text-gray-500">Range: <t t-esc="filters.state.range"/></div>
      </div>
      <div class="mt-4">
        <t t-set="dataset" t-value="_makeDataset(filters.state.range)"/>
        <ChartCard t-props="{ title: '', type: 'line', data: dataset, height: 260 }"/>
      </div>
    </div>
  `;
}
