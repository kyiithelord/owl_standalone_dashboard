import { reactive } from "@odoo/owl";

export function createFiltersStore() {
  const params = new URLSearchParams(window.location.search);
  const initialRange = params.get("range");
  const state = reactive({
    range: initialRange === "7d" || initialRange === "90d" ? initialRange : "30d",
  });

  function setRange(range) {
    if (state.range === range) return;
    state.range = range;
    const url = new URL(window.location.href);
    url.searchParams.set("range", range);
    window.history.pushState({ range }, "", url);
  }

  window.addEventListener("popstate", (ev) => {
    const r = ev.state?.range || new URLSearchParams(window.location.search).get("range");
    if (r && r !== state.range) state.range = r;
  });

  return { state, setRange };
}

export const filters = createFiltersStore();
