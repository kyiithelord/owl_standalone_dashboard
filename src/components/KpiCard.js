import { Component, xml } from "@odoo/owl";

export default class KpiCard extends Component {
  static props = {
    title: { type: String },
    value: { type: [String, Number] },
    subtitle: { type: String, optional: true },
    delta: { type: Number, optional: true }, // percent change, e.g., 5.2 means +5.2%
  };
  _fmtDelta(d) {
    if (d === undefined || d === null || isNaN(d)) return null;
    const up = d >= 0;
    const sign = up ? "+" : "";
    return { text: `${sign}${d.toFixed(1)}%`, up };
  }
  static template = xml/* xml */`
    <div class="rounded-lg border border-gray-200 bg-white p-4 sm:p-5 dark:bg-gray-800 dark:border-gray-700">
      <div class="text-sm text-gray-500"><t t-esc="props.title"/></div>
      <div class="mt-2 text-2xl font-semibold"><t t-esc="props.value"/></div>
      <div class="mt-1 flex items-center gap-2 text-xs">
        <t t-if="props.subtitle">
          <span class="text-gray-500"><t t-esc="props.subtitle"/></span>
        </t>
        <t t-set="d" t-value="_fmtDelta(props.delta)"/>
        <t t-if="d">
          <span t-att-class="'inline-flex items-center gap-1 px-2 py-0.5 rounded-full ' + (d.up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')">
            <t t-esc="d.up ? '▲' : '▼'"/> <t t-esc="d.text"/>
          </span>
        </t>
      </div>
    </div>
  `;
}
