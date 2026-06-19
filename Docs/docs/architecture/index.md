---
title: "Architecture"
description: "pyComputer architecture overview"
---

## Architecture

pyComputer is organized into several subsystems that initialize in sequence at boot.

### Subsystems

```mermaid
flowchart TB
    Boot["Boot"] --> Kernel["Kernel"]
    Kernel --> VFS["VFS"]
    Kernel --> Shell["Shell"]
    Kernel --> SDK["SDK"]
    Shell --> Pkg["Package Manager"]
    SDK --> Net["Network"]

    Boot -.->|Logo, hardware init, data disk setup| Boot
    Kernel -.->|Scheduler, IO, Loader, Registry| Kernel
    VFS -.->|Virtual filesystem, path mapping| VFS
    Shell -.->|Command loop, built-in commands, app launcher| Shell
    SDK -.->|Public API for app development| SDK
    Net -.->|HTTP client, JSON helpers| Net
    Pkg -.->|Manager, bundler, manifest validation| Pkg

    style Boot fill:#1c1917,stroke:#fbbf24,color:#fafaf9
    style Kernel fill:#1c1917,stroke:#fbbf24,color:#fafaf9
    style VFS fill:#1c1917,stroke:#fbbf24,color:#fafaf9
    style Shell fill:#1c1917,stroke:#fbbf24,color:#fafaf9
    style SDK fill:#1c1917,stroke:#fbbf24,color:#fafaf9
    style Net fill:#1c1917,stroke:#fbbf24,color:#fafaf9
    style Pkg fill:#1c1917,stroke:#fbbf24,color:#fafaf9
```

### Initialization Order

1. `ensure_data_dir()` — copies `root/` to `data/` if `data/` does not exist (atomic staging)
2. `_load_settings()` — loads theme and user preferences
3. `Kernel()` — creates all subsystems
4. `kernel.initialize()` — prints init messages
5. `kernel.boot_sequence()` — renders logo and hardware logs
6. `kernel.launch_shell()` — starts shell event loop
7. `asyncio.run(kernel.run())` — main async event loop
