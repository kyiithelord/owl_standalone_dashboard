import { Component, xml } from "@odoo/owl";

export default class Topbar extends Component {
  static props = {
    title: { type: String, optional: true },
  };
  toggleTheme() {
    const root = document.documentElement;
    const isDark = root.classList.toggle('dark');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {}
  }
  static template = xml/* xml */`
    <header class="h-16 flex items-center justify-between px-4 sm:px-6 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div class="flex items-center gap-3">
        <button class="lg:hidden p-2 rounded-md border border-gray-200">☰</button>
        <h1 class="text-lg sm:text-xl font-semibold"><t t-esc="props.title || 'Dashboard'"/></h1>
      </div>
      <div class="flex items-center gap-3">
        <input class="hidden sm:block w-64 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:border-gray-700" placeholder="Search"/>
        <button class="p-2 rounded-md border border-gray-200 text-sm dark:border-gray-700" title="Toggle theme" t-on-click="toggleTheme">🌙</button>
        <div class="w-8 h-8 rounded-full bg-indigo-500 text-white grid place-content-center text-sm">U</div>
      </div>
    </header>
  `;
}
