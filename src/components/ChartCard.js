import { Component, xml, useRef, onMounted, onWillUnmount, onWillUpdateProps } from "@odoo/owl";
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
    const getVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const resolveColor = (val) => {
      if (typeof val === 'string') {
        const s = val.trim();
        if (s.startsWith('var(') && s.endsWith(')')) {
          const name = s.slice(4, -1).trim();
          const v = getVar(name);
          return v || s;
        }
        return s;
      }
      if (Array.isArray(val)) {
        return val.map((v) => resolveColor(v));
      }
      return val;
    };
    const resolveDataColors = (data) => {
      if (!data) return data;
      const ds = (data.datasets || []).map((d) => ({
        ...d,
        borderColor: resolveColor(d.borderColor),
        backgroundColor: resolveColor(d.backgroundColor),
      }));
      return { ...data, datasets: ds };
    };
    this._resolveDataColors = resolveDataColors;
    // no dynamic theme updates to avoid scriptable option edge-cases

    onMounted(() => {
      const ctx = this.canvasRef.el.getContext("2d");
      const baseOptions = this.props.options || {};
      const resolvedData = this._resolveDataColors(this.props.data);
      this.chart = new Chart(ctx, {
        type: this.props.type,
        data: resolvedData,
        options: {
          maintainAspectRatio: false,
          ...baseOptions,
        },
      });
    });
    onWillUpdateProps((nextProps) => {
      if (!this.chart) return;
      const nextData = this._resolveDataColors(nextProps.data);
      this.chart.data = nextData;
      if (nextProps.options) {
        this.chart.options = { ...(nextProps.options || {}) };
      }
      this.chart.update();
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
