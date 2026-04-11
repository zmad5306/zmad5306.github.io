---
title: "Stop Using N-Tier — Structure Your Monorepo Around Reality Instead"
description: "Why n-tier architecture breaks down in modern monorepos, and a better way to organize your code around deployables, capabilities, and boundaries."
---

If you’ve worked on more than a few codebases, you’ve seen it:

* `UI/`
* `Business/`
* `Data/`

Or some variation of it.

This is **n-tier architecture**, and for a long time, it was treated as the “correct” way to structure applications.

But here’s the uncomfortable truth:

> **n-tier is optimized for diagrams — not for real systems.**

And in modern monorepos, it actively works against you.

---

## 🔥 The Problem with N-Tier

At first glance, n-tier feels clean:

* Separate concerns
* Keep layers independent
* Enforce structure

In practice, it creates a different set of problems.

### **1. It Organizes by Technical Layer, Not by Reality**

Real systems are not built around “UI vs Business vs Data.”

They are built around:

* Deployables
* Features
* Integrations
* Workflows

N-tier ignores all of that.

So you end up with code that is technically separated… but **logically scattered everywhere**.

---

### **2. It Scales Poorly in Monorepos**

As soon as your system grows beyond a single application, n-tier starts to fall apart.

You add:

* Background workers
* APIs
* Webhooks
* CLI tools
* Batch processors

Where do they go?

Everything ends up reaching into the same:

* “Business layer”
* “Data layer”

Now every deployable depends on everything else.

You’ve created a **shared coupling engine**.

---

### **3. The “Business Layer” Becomes a Dumping Ground**

This is the biggest one.

Over time, the “business” project turns into:

* Domain logic
* Orchestration
* Random helpers
* External integrations
* Half of your infrastructure

It becomes impossible to reason about.

And worse — everything depends on it.

---

### **4. It Hides the Most Important Boundary: Deployables**

When you ship software, you don’t deploy “layers.”

You deploy:

* APIs
* Workers
* Services
* Web apps

N-tier buries that reality under a structure that doesn’t reflect how your system actually runs.

---

## ✨ A Better Approach: Organize Around What You Ship

Instead of structuring your repo around layers…

> **Structure it around deployables and capabilities.**

At the top level, your repo should answer a simple question:

> “What do we actually run?”

That usually looks like this:

```
apps/
  api/
  worker/
  webhook-processor/
  cli/
  web/
```

Each of these is a **real, deployable unit**.

No guessing.
No abstraction.
No indirection.

---

## 🧠 The Core Layer (The Part N-Tier Got Wrong)

Instead of a vague “business layer,” introduce a **Core**.

This is the heart of your system.

It contains:

* Domain logic
* Use-case orchestration
* Entities and value objects
* Business rules
* Interfaces for external dependencies

And critically:

> **Core does not depend on infrastructure.**

No database code.
No HTTP clients.
No vendor SDKs.

Just pure, portable logic.

---

## 🧩 Capabilities and Integrations

Next, organize everything else by **what it actually does**, not where it sits in a stack.

Examples:

```
src/
  core/
  contracts/
  persistence/
  billing/
  communications/
  github/
  stripe/
```

Each module has a clear purpose:

* **core** → business logic
* **contracts** → shared schemas and DTOs
* **persistence** → database implementation
* **github / stripe / etc.** → external integrations
* **billing / communications** → product capabilities

This structure mirrors how your system actually behaves.

---

## 🔁 Dependency Flow (The Rule That Matters)

Once you structure things this way, the dependency rules become obvious:

```
apps → core → contracts
     ↘ integrations
     ↘ persistence
```

Not this:

```
core → persistence ❌
core → external APIs ❌
```

Core defines **what needs to happen**.
Other modules define **how it happens**.

That separation is what keeps your system from collapsing into a ball of mud.

---

## ⚡ Why This Works Better

### **1. It Matches How Systems Actually Evolve**

You don’t add “a new data layer.”

You add:

* a new worker
* a new integration
* a new feature

This structure makes those changes natural.

---

### **2. It Keeps Boundaries Honest**

Each module has a reason to exist.

It’s much harder to sneak unrelated code into:

* `github/`
* `billing/`
* `persistence/`

Than into a vague “business” project.

---

### **3. It Scales with Your System**

Need another deployable?

Add it to `apps/`.

Need another integration?

Add a new module.

No refactoring the entire repo just to grow.

---

### **4. It Makes Extraction Possible**

If you ever decide to split services later:

* your core logic is already isolated
* your integrations are already modular

You’re not untangling a giant layered mess.

---

## 🚫 What to Avoid

Even with this structure, there are a few traps:

* Don’t let **core** depend on infrastructure
* Don’t create a new “misc” or “shared” dumping ground
* Don’t let every app depend on every module
* Don’t recreate n-tier inside each module

If you do, you’re just rebuilding the same problem with different names.

---

## 🎯 Final Thoughts

N-tier had its moment.

It made sense when applications were:

* single deployables
* tightly coupled
* relatively small

But modern systems are none of those things.

If you’re working in a monorepo — especially one with multiple executables — you need a structure that reflects reality.

> **Organize around what you deploy, and what your system does — not around abstract layers.**

Once you make that shift, everything gets easier:

* reasoning about code
* adding new features
* scaling the system
* enforcing boundaries

And most importantly:

You stop fighting your architecture… and start using it.
