---
title: What Cognitive Load Theory Taught Me About Design
description: Building Marginalia forced me to take HCI theory seriously as a set of testable claims about users — not just design vocabulary.
tags: [HCI, Language Education, Design]
date: 2024-08-20
---

Before Marginalia, "cognitive load" was a term I knew. After Marginalia, it was a design constraint I could feel.

## The Theory, Briefly

Cognitive load theory (Sweller, 1988) proposes that working memory has a limited capacity. When a task demands more than that capacity, performance degrades — not because the person isn't trying, but because they literally can't hold all the pieces at once.

For instructional design, this translates into a distinction between:

- **Intrinsic load** — the inherent complexity of the material itself
- **Extraneous load** — complexity introduced by poor design (unnecessary clicks, confusing layouts, irrelevant information)
- **Germane load** — the cognitive work that actually contributes to learning

Good design minimizes extraneous load so users can spend their cognitive budget on germane load.

## How This Shaped Marginalia

My design goal was to help ESL readers maintain reading flow while handling unfamiliar language. The tension: surfacing language information necessarily adds cognitive load. How do you provide help without making the helping itself a burden?

Several decisions came directly from this framing:

**Inline positioning over sidebars.** Sidebars require eye movement to a different part of the screen, then back. That's extraneous load. Placing annotations adjacent to the anchor text keeps everything in a tighter visual field.

**Progressive disclosure.** The first layer of information is a brief gloss — just enough to unblock comprehension. Deeper etymology, usage examples, and grammar notes are one click away, not always visible. Users in flow don't have to process information they don't need.

**Persistence across sessions.** When a reader has looked up a word before, the system remembers. Repeat encounters feel lighter — a subtle visual indicator rather than a full annotation. This reduces extraneous load for familiar vocabulary while maintaining support for new words.

## Where Theory Meets Friction

The honest version: theory told me what to aim for, but not always how to get there.

The annotation positioning engine was technically hard — I needed to place annotations close to their anchors without overlapping each other or running off the viewport. I ended up writing a constraint-satisfaction algorithm, but getting there involved a lot of iteration that theory couldn't shortcut.

There were also genuine design tensions that didn't resolve cleanly. More context is almost always more useful for comprehension — but more context is also more cognitive load. I ended up making judgment calls that I couldn't fully justify from first principles.

## The Takeaway

Building a tool that takes a theory seriously is a good way to test whether you actually believe the theory. In Marginalia's case, I ended up more convinced — not because the design was perfect, but because the places where the design failed were often the places where I'd departed from the theory's predictions without a good reason.

That's a useful kind of feedback that you don't get from building in pure intuition mode.
