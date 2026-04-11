---
title: "Stop Coding Everything Yourself — Hire an AI Junior Developer Instead"
description: "A case study on using AI coding agents as junior developers, replacing implementation work while you focus on architecture, product, and outcomes."
---

If you’ve been paying attention to AI in software development, you’ve probably seen the usual takes:

* “It writes boilerplate faster”
* “It helps with autocomplete”
* “It’s like a smarter StackOverflow”

All of that is true — and all of it completely misses the point.

There is a fundamentally different way to work emerging.

One where you stop using AI as a tool…

…and start treating it like a **junior developer on your team**.

---

# The Shift: From Assistant → Engineer

Most developers are still here:

> “Help me write this function.”

But there’s a different level:

> “Here’s a feature. Go implement it.”

That’s the shift.

Not faster typing.
Not better snippets.

**Delegation.**

---

# The Workflow That Actually Works

After a lot of experimentation, I landed on a workflow that feels eerily close to managing a real team.

It looks like this:

## 1. Ideation (Chat)

Start in a conversational loop:

* explore ideas
* refine requirements
* challenge assumptions
* shape the feature

This is messy, iterative, and fluid — just like whiteboarding with another engineer.

## 2. Formalize as a GitHub Issue

This is the most important step.

Once the idea is clear, it gets written up as a proper GitHub issue:

* context
* constraints
* acceptance criteria
* expected behavior

That issue becomes the **contract**.

Why this matters:

AI context is ephemeral.
Issues are not.

The issue survives:

* context compaction
* long-running work
* multiple iterations

It becomes the single source of truth.

## 3. Assign It to the Agent

Now the agent gets the task:

> “Implement this issue on a new branch and open a PR.”

At this point, you’re no longer coding.

You’re delegating.

## 4. Review Like a Senior Engineer

When the PR comes back:

* review architecture
* check edge cases
* validate correctness
* suggest improvements

If needed, send it back with feedback.

Exactly like you would with a junior developer.

---

# A Real Case Study: ActionWatch

I put this workflow to the test building **[ActionWatch.dev](https://actionwatch.dev)**.

ActionWatch is a full product:

* backend services
* frontend UI
* Kubernetes infrastructure
* authentication
* billing

From concept to production, it was built in roughly **two weeks**.

That includes:

* a polished UI
* working infrastructure
* real billing integration
* production deployment

And here’s the key detail:

> I did not write the implementation code.

The agent did.

---

# What the Agent Did

The agent handled:

* feature implementation
* UI changes
* bug fixes
* refactors
* wiring up services
* writing glue code

Entire features were delivered from a single issue.

Roughly **95% of the time**, the implementation was correct on the first pass.

The remaining 5%?

* minor corrections
* small steering adjustments
* edge case fixes

That’s not “autocomplete.”

That’s a junior developer.

---

# What I Actually Did

This is the important part.

The agent did not build the system alone.

I was responsible for:

* architecture decisions
* system boundaries
* data modeling direction
* security considerations
* product decisions
* reviewing and approving changes

In other words:

> I operated as a senior engineer.

---

# Why This Works

This model works because it separates concerns cleanly.

## The Agent

* executes
* implements
* iterates quickly

## The Human

* decides
* designs
* evaluates

The bottleneck shifts from:

> “How fast can I write code?”

To:

> “How well can I define and review systems?”

---

# The Hidden Unlock: Issues as Memory

One of the biggest challenges with AI is context loss.

The solution is not bigger prompts.

It’s **externalizing memory**.

Durable artifacts become:

* requirements
* shared context
* execution contracts

This does not have to be GitHub issues specifically.

Early on, I was just tracking features in a markdown file. The key is not the tool — it’s that the artifact is:

* persistent
* structured
* accessible to the agent

It can be:

* GitHub issues
* markdown files
* docs in your repo
* even a simple task list

As long as the agent can reliably read it, it works.

These artifacts allow the agent to operate reliably over time.

Without them, things drift.

With them, things compound.

With them, things compound.

---

# Steering the Agent: `agents.md`

One piece that made a *huge* difference in consistency is a simple file at the root of the repo: `agents.md`.

Think of it as your **team handbook for AI**.

It answers the questions a junior dev would normally ask:

* How do we branch?
* Where does this code go?
* What are the guardrails?
* What are the non-negotiables?


## What goes in `agents.md`

### Workflow rules

Be explicit about how work should flow:

* branch from `develop`
* create a feature branch per issue
* keep commits scoped and meaningful
* push when complete
* open a PR with a clear summary

This removes ambiguity and prevents the agent from inventing its own process.

### Architecture rules

Define boundaries clearly:

* integrations with external systems (e.g., GitHub API) live in dedicated libraries
* top-level apps stay thin
* business logic belongs in shared/domain libraries
* avoid leaking infrastructure concerns into core logic

This keeps the codebase coherent even when the agent is doing most of the writing.

### Product constraints

Spell out non-negotiables:

* required GitHub permissions and scopes
* security expectations
* performance considerations
* API usage limits

The agent won’t infer these correctly unless you tell it.

### Conventions and patterns

* naming conventions
* error handling patterns
* logging expectations
* testing requirements

The more you standardize here, the more consistent the output becomes.

## Why this matters

Without `agents.md`, the agent is guessing.

With it, the agent is:

* aligned with your architecture
* consistent across features
* predictable in behavior

It’s the difference between:

> “an AI that writes code”

and

> “an AI that works *your way*.”

---

# Not All “AI Coding Tools” Are Equal

There’s a big difference between:

* tools that help you write code
* tools that **do the work for you**

Most tools today are still in the first category.

True agents — the kind that can take a ticket and return a PR — are still rare.

That gap becomes obvious the moment you try to delegate real work.

---

# This Doesn’t Replace Engineers

It amplifies them.

Without guidance, the agent:

* makes poor architectural decisions
* drifts in implementation
* misses important constraints

Without the agent, you:

* spend time on boilerplate
* get slowed down by implementation
* lose momentum

Together:

> You operate at a completely different level.

---

# The New Development Loop

This is what development starts to look like:

1. Think
2. Specify
3. Delegate
4. Review
5. Iterate

Not:

1. Think
2. Type
3. Debug
4. Repeat

---

# Final Thoughts

What surprised me most wasn’t that the agent could write code.

It was that:

> Implementation is no longer the limiting factor.

Ideas, architecture, and judgment are.

And that’s a much more interesting problem to have.

---

If you’re still using AI as autocomplete, you’re leaving most of the value on the table.

Try treating it like a junior developer instead.

You might find yourself shipping entire products in weeks.
