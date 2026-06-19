export default {
  title: "pyComputer",
  url: "https://nisoku.org/pyComputer",
  logo: { alt: "pyComputer", href: "./" },
  favicon: "",
  theme: {
    name: "ruby",
    defaultMode: "system",
    enableModeToggle: true,
    positionMode: "top",
    codeHighlight: true,
    copyWidgets: {
      enabled: true,
      raw: true,
      context: true,
    },
  },
  layout: {
    footer: {
      style: "complete",
      description: "A virtual computer in your terminal.",
      branding: true,
      columns: [
        {
          title: "Resources",
          links: [
            { text: "Quick Start", url: "./getting-started/quickstart" },
            { text: "SDK Reference", url: "./sdk/" },
            { text: "Shell Commands", url: "./shell/" },
          ],
        },
        {
          title: "Community",
          links: [
            { text: "GitHub", url: "https://github.com/NellowTCS/pyComputer" },
            { text: "Issues", url: "https://github.com/NellowTCS/pyComputer/issues" },
            { text: "Discussions", url: "https://github.com/NellowTCS/pyComputer/discussions" },
          ],
        },
      ],
    },
  },
  plugins: {
    search: {
      semantic: true,
      showConfidence: true,
    },
    seo: {
      defaultDescription:
        "pyComputer is a virtual computer in your terminal. Boot, shell, apps, and SDK for building TUI applications in Python.",
      openGraph: { defaultImage: "" },
      twitter: { cardType: "summary_large_image" },
    },
    sitemap: {
      defaultChangefreq: "weekly",
      defaultPriority: 0.8,
    },
    analytics: {},
    mermaid: {},
    git: {},
    llms: {
      fullContext: true,
    },
  },
  search: true,
  minify: true,
  autoTitleFromH1: true,
  copyCode: true,
  pageNavigation: true,
  navigation: [
    { title: "Home", path: "/", icon: "home" },
    {
      title: "Getting Started",
      icon: "rocket",
      collapsible: false,
      children: [
        { title: "Quick Start", path: "/getting-started/quickstart", icon: "play" },
        { title: "Installation", path: "/getting-started/installation", icon: "download" },
        { title: "Core Concepts", path: "/getting-started/concepts", icon: "book" },
      ],
    },
    {
      title: "Apps",
      icon: "package",
      path: "/apps/",
      collapsible: false,
      children: [
        { title: "Built-in Apps", path: "/apps/builtin", icon: "box" },
        { title: "Building Apps", path: "/apps/building", icon: "code" },
        { title: ".pycapp Format", path: "/apps/pycapp", icon: "archive" },
      ],
    },
    {
      title: "SDK Reference",
      icon: "code",
      path: "/sdk/",
      collapsible: false,
      children: [
        { title: "Renderer", path: "/sdk/renderer", icon: "monitor" },
        { title: "Input", path: "/sdk/input", icon: "keyboard" },
        { title: "Std Library", path: "/sdk/stdlib", icon: "book-open" },
        { title: "VFS", path: "/sdk/vfs", icon: "folder" },
      ],
    },
    {
      title: "Shell",
      icon: "terminal",
      path: "/shell/",
      collapsible: false,
      children: [
        { title: "Commands", path: "/shell/commands", icon: "list" },
        { title: "Package Manager", path: "/shell/pkg", icon: "package" },
      ],
    },
    {
      title: "Architecture",
      icon: "git-commit",
      path: "/architecture/",
      collapsible: false,
      children: [
        { title: "Kernel", path: "/architecture/kernel", icon: "cpu" },
        { title: "VFS Layer", path: "/architecture/vfs", icon: "hard-drive" },
        { title: "Boot Sequence", path: "/architecture/boot", icon: "power" },
      ],
    },
    {
      title: "GitHub",
      path: "https://github.com/NellowTCS/pyComputer",
      icon: "github",
      external: true,
    },
  ],
  footer: "Built with [docmd](https://docmd.io). [View on GitHub](https://github.com/NellowTCS/pyComputer).",
  editLink: {
    enabled: true,
    baseUrl: "https://github.com/NellowTCS/pyComputer/edit/main/",
    text: "Edit this page",
  },
};
