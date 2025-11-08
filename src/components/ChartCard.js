import { Component, xml, useRef, onMounted, onWillUnmount } from "@odoo/owl";
import Card from "./Card.js";
import { Chart } from "chart.js/auto";

export default class ChartCard extends Component {
  static components = { Card };
  static props = {
    title: { type: String },
    type: { type: String },
    data: { type: Object },
    options: { type: Object, optional: true },
    height: { type: Number, optional: true },
  };
  setup() {
    this.canvasRef = useRef("canvas");
    this.chart = null;
    onMounted(() => {
      const ctx = this.canvasRef.el.getContext("2d");
      this.chart = new Chart(ctx, {
        type: this.props.type,
        data: this.props.data,
        options: this.props.options || {},
      });
    });
    onWillUnmount(() => {
      if (this.chart) this.chart.destroy();
    });
  }
  static template = xml/* xml */`
    <Card t-props="{ title: props.title }">
      <div class="relative" t-attf-style="height: {{ props.height || 240 }}px">
        <canvas t-ref="canvas"></canvas>
      </div>
    </Card>
  `;
}
