import { Component, xml } from "@odoo/owl";
import ChartCard from "../components/ChartCard.js";
import TimeSeriesCard from "../components/TimeSeriesCard.js";
import FilterBar from "../components/FilterBar.js";
import KpiCard from "../components/KpiCard.js";
import { filters } from "../store/filters.js";
import { getTimeseries } from "../services/charts/index.js";

export default class Dashboard extends Component {
  static components = { ChartCard, TimeSeriesCard, FilterBar, KpiCard };
  setup() {
    this.filters = filters;
  }
  _series(range) {
    return getTimeseries(range);
  }
  _kpis(range) {
    const ts = this._series(range);
    const first = ts.data[0] || 1;
    const last = ts.data[ts.data.length - 1] || first;
    const deltaPct = ((last - first) / Math.max(1, first)) * 100;
    const sum = ts.data.reduce((a, b) => a + b, 0);
    return {
      revenue: { value: `$${(sum * 10).toLocaleString()}`, delta: deltaPct },
      orders: { value: Math.round(sum / 5).toLocaleString(), delta: deltaPct - 1.2 },
      customers: { value: Math.round(last * 3.2).toLocaleString(), delta: deltaPct / 2 },
      conversion: { value: `${(3 + deltaPct / 50).toFixed(1)}%`, delta: deltaPct / 3 },
    };
  }
  _line(range) {
    const ts = this._series(range);
    return {
      labels: ts.labels,
      datasets: [
        {
          label: 'Sessions',
          data: ts.data,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.15)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }
  _bar(range) {
    const ts = this._series(range);
    const step = Math.max(1, Math.floor(ts.data.length / 12));
    const months = Array.from({ length: Math.min(12, Math.ceil(ts.data.length / step)) }, (_, i) => `M${i + 1}`);
    const sums = [];
    for (let i = 0; i < ts.data.length; i += step) {
      const slice = ts.data.slice(i, i + step);
      sums.push(slice.reduce((a, b) => a + b, 0) / slice.length);
    }
    return {
      labels: months,
      datasets: [
        {
          label: 'Revenue',
          data: sums.map((v) => Math.round(v / 10)),
          backgroundColor: '#22c55e',
          borderRadius: 6,
        },
      ],
    };
  }
  _pie(range) {
    const ts = this._series(range);
    const total = ts.data.reduce((a, b) => a + b, 0) || 1;
    const a = Math.round((total * 0.35) / total * 100);
    const b = Math.round((total * 0.25) / total * 100);
    const c = 20;
    const d = 100 - a - b - c;
    return {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [
        {
          label: 'Share',
          data: [a, b, c, d],
          backgroundColor: ['#6366f1', '#22c55e', '#f97316', '#ef4444'],
        },
      ],
    };
  }
  static template = xml/* xml */`
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div></div>
        <FilterBar/>
      </div>
      <t t-set="k" t-value="_kpis(filters.state.range)"/>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="'Revenue'" value="k.revenue.value" subtitle="'Current period'" delta="k.revenue.delta"/>
        <KpiCard title="'Orders'" value="k.orders.value" subtitle="'Current period'" delta="k.orders.delta"/>
        <KpiCard title="'Customers'" value="k.customers.value" subtitle="'Active'" delta="k.customers.delta"/>
        <KpiCard title="'Conversion'" value="k.conversion.value" subtitle="'Current period'" delta="k.conversion.delta"/>
      </div>
      <TimeSeriesCard/>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2">
          <t t-set="line" t-value="_line(filters.state.range)"/>
          <ChartCard t-props="{ title: 'Traffic (Line)', type: 'line', data: line, height: 260 }"/>
        </div>
        <t t-set="pie" t-value="_pie(filters.state.range)"/>
        <ChartCard t-props="{ title: 'Sales by Category (Pie)', type: 'pie', data: pie, height: 260 }"/>
      </div>
      <t t-set="bar" t-value="_bar(filters.state.range)"/>
      <ChartCard t-props="{ title: 'Revenue Trend (Bar)', type: 'bar', data: bar, height: 280 }"/>
      <div class="rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
        <div class="text-sm text-gray-500">Table</div>
        <div class="mt-3 overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead>
              <tr class="text-left text-gray-500">
                <th class="py-2 pr-4">Name</th>
                <th class="py-2 pr-4">Status</th>
                <th class="py-2 pr-4">Amount</th>
                <th class="py-2 pr-4">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-t">
                <td class="py-2 pr-4">Order #1324</td>
                <td class="py-2 pr-4"><span class="inline-flex px-2 py-1 rounded-md text-xs bg-green-100 text-green-700">Paid</span></td>
                <td class="py-2 pr-4">$120.00</td>
                <td class="py-2 pr-4">2025-11-01</td>
              </tr>
              <tr class="border-t">
                <td class="py-2 pr-4">Order #1323</td>
                <td class="py-2 pr-4"><span class="inline-flex px-2 py-1 rounded-md text-xs bg-yellow-100 text-yellow-700">Pending</span></td>
                <td class="py-2 pr-4">$89.50</td>
                <td class="py-2 pr-4">2025-10-31</td>
              </tr>
              <tr class="border-t">
                <td class="py-2 pr-4">Order #1322</td>
                <td class="py-2 pr-4"><span class="inline-flex px-2 py-1 rounded-md text-xs bg-red-100 text-red-700">Failed</span></td>
                <td class="py-2 pr-4">$42.00</td>
                <td class="py-2 pr-4">2025-10-30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
