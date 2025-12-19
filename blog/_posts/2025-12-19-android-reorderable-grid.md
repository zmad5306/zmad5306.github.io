---
title: "Reorderable Grids in Jetpack Compose — Shipping What the Samples Don’t"
description: "Why reorderable grids are deceptively hard in Jetpack Compose, the edge cases that break naïve implementations, and how a production-ready solution finally emerged."
---

If you’ve ever tried to build a **reorderable grid** in Jetpack Compose, you probably thought:

> “This should be easy. I’ll just add drag gestures and move items around.”

And at first… it _kind of_ works.

- A long-press starts a drag.
- You move your finger.
- Something animates.
- Indices update.

But then reality shows up.

- Items flicker or overlap.
- Gestures cancel halfway through a drag.
- Scrolling while dragging feels sluggish or outright broken.
- Items snap back to the wrong place.
- Everything works on the emulator and falls apart on a real device.

Reordering is one of those interactions that looks trivial in a demo GIF and turns into a **death-by-a-thousand-edge-cases** in production.

I know, because I shipped one.

---

## The Gap Between Samples and Shipping Apps

Jetpack Compose gives you incredible primitives:

- `pointerInput`
- `LazyVerticalGrid`
- animation APIs
- state and recomposition tools

What it _doesn’t_ give you is a **reorderable grid** that:

- scrolls correctly while dragging
- maintains gesture continuity
- behaves predictably across recompositions
- holds up under real user interaction

There are blog posts and sample repos that show _something_ working—but most of them quietly assume:

- small lists
- no auto-scroll
- no fast dragging
- no configuration changes
- no layout instability

Those assumptions don’t survive contact with real users.

---

## The First Version (a.k.a. “Why Is This Janky?”)

My initial implementation followed the usual path:

- Track the dragged item index
- Apply an offset while dragging
- Swap indices when crossing thresholds

It looked fine… until it didn’t.

### Problems appeared immediately:

- **Pointer input restarting mid-drag**  
  Recomposition would cancel the gesture and drop the item.

- **Grid reflow chaos**  
  Items changing size or position caused the entire grid to reshuffle while dragging.

- **Unpredictable drop targets**  
  Items didn’t always land where the user expected—especially when padding was involved.

- **Auto-scroll edge hugging**  
  You had to drag _just right_ near the edge to get the grid to scroll.

Each fix introduced another subtle bug somewhere else.

This wasn’t a Compose problem.  
It was a _naïve mental model_ problem.

---

## The Shift: Treat Dragging as a First-Class Interaction

The breakthrough came when I stopped thinking in terms of “moving items” and started thinking in terms of **maintaining a continuous interaction**.

Some hard-earned lessons:

### 1. Pointer input must never restart mid-drag

If a drag gesture restarts, the interaction is already broken.

That meant:

- Using `pointerInput(Unit)`
- Combining it with `rememberUpdatedState`
- Avoiding captured lambdas and stale references

Once the gesture starts, it _must stay alive_.

---

### 2. Layout stability matters more than animation

Early versions let item sizes fluctuate during drag.

Bad idea.

Freezing item heights during a drag eliminated:

- layout thrashing
- grid re-measurement storms
- visual jitter

The grid became boring—and that was a good thing.

---

### 3. Drop targets must be obvious and debuggable

If _you_ can’t reason about why an item dropped where it did, users never will.

The solution:

- padding-aware hit testing
- center-based calculations
- explicit math instead of “close enough” heuristics

Predictable beats clever every time.

---

### 4. Auto-scroll has to feel fast

Dragging while scrolling isn’t optional—it’s expected.

But Compose doesn’t hand this to you.

Getting it right meant:

- explicit scroll control
- aggressive but smooth scrolling
- no reliance on edge-only triggers

When it finally worked, it felt invisible—which is exactly the goal.

---

## From App Code to a Library

At some point, I realized something important:

> This code had stopped changing.

Not because it was perfect—but because everything fragile had already been removed.

What was left was:

- boring
- explicit
- stable
- predictable

That’s when it became a library.

**Compose Reorderable Grid** is not a flashy abstraction.  
It’s the result of repeatedly breaking something _until nothing fragile remained_.

---

## What the Library Gives You

- Long-press drag-and-drop grids
- Smooth auto-scroll while dragging
- Stable gestures that survive recomposition
- Predictable drop behavior
- Minimal API surface

No adapters.  
No controllers.  
No “magic”.

Just behavior that holds up under real usage.

---

## Why I’m Writing This

Frameworks evolve fast.  
Blog posts age poorly.

But **interaction bugs** are timeless.

If you’re building serious Compose UIs, you will eventually hit the same problems I did. My hope is that this library—and the lessons behind it—save you from rediscovering them the hard way.

Sometimes the most valuable code isn’t the cleverest.

It’s the code that _stops surprising you_.

---

If you want to explore it yourself:

- 📦 **Maven Central:** [https://central.sonatype.com/artifact/dev.zachmaddox.compose/compose-reorderable-grid](https://central.sonatype.com/artifact/dev.zachmaddox.compose/compose-reorderable-grid)
- 💻 **GitHub:** [https://github.com/zmad5306/compose-reorderable-grid](https://github.com/zmad5306/compose-reorderable-grid)

Smooth is not optional.  
Predictable is not negotiable.  
Jank is a bug.
