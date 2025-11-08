import { Component, xml, useState } from "@odoo/owl";
import Card from "../components/Card.js";
import ChartCard from "../components/ChartCard.js";

export default class Dashboard extends Component {
  static components = { Card, ChartCard };
  setup() {
    this.state = useState({
      lineData: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Sessions',
            data: [120, 190, 150, 220, 180, 230, 210],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      barData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Revenue',
            data: [12, 15, 13, 17, 19, 22, 25, 23, 24, 26, 28, 30],
            backgroundColor: '#22c55e',
            borderRadius: 6,
          },
        ],
      },
      pieData: {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [
          {
            label: 'Share',
            data: [35, 25, 20, 20],
            backgroundColor: ['#6366f1', '#22c55e', '#f97316', '#ef4444'],
          },
        ],
      },
    });
  }
  static template = xml/* xml */`
    <div class="space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="'Revenue'" value="'$24,300'" subtitle="'Last 30 days'"/>
        <Card title="'Orders'" value="'1,204'" subtitle="'Last 30 days'"/>
        <Card title="'Customers'" value="867" subtitle="'Active'"/>
        <Card title="'Conversion'" value="'3.1%'" subtitle="'Last 30 days'"/>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2">
          <ChartCard t-props="{ title: 'Traffic (Line)', type: 'line', data: state.lineData, height: 260 }"/>
        </div>
        <ChartCard t-props="{ title: 'Sales by Category (Pie)', type: 'pie', data: state.pieData, height: 260 }"/>
      </div>
      <ChartCard t-props="{ title: 'Monthly Revenue (Bar)', type: 'bar', data: state.barData, height: 280 }"/>
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
