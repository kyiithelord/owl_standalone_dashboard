import { Component, xml } from "@odoo/owl";

export default class Card extends Component {
  static props = {
    title: { type: String, optional: true },
    value: { type: [String, Number], optional: true },
    subtitle: { type: String, optional: true },
  };
  static template = xml/* xml */`
    <div class="rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
      <div class="text-sm text-gray-500"><t t-esc="props.title"/></div>
      <div class="mt-2 text-2xl font-semibold"><t t-esc="props.value"/></div>
      <div class="mt-1 text-xs text-gray-500"><t t-esc="props.subtitle"/></div>
      <div class="mt-4">
        <t t-slot="default"/>
      </div>
    </div>
  `;
}
