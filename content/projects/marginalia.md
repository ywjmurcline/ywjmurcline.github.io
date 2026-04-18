---
title: Marginalia
description: An annotation interface designed for advanced ESL readers, built around cognitive load theory to support smooth transitions between language learning and general reading.
tags: [HCI, Language Education, React, Design]
date: 2024-06
---

## Overview

Marginalia is a web-based annotation interface for advanced ESL readers. The core insight behind it: existing reading tools either treat the reader as a language student (overwhelming them with grammar notes) or as a native reader (offering no scaffolding at all). Marginalia tries to occupy the space in between.

The project grew out of my experience tutoring ESL students, where I noticed that the friction of looking up an unfamiliar word or phrase would break reading flow entirely — and that broken flow made it harder to return to comprehension mode.

## Design Principles

The interface is guided by **cognitive load theory**. The goal is to reduce extraneous load (friction from the tool itself) so readers can direct more cognitive resources toward genuine comprehension.

Key design decisions:
- Annotations appear inline, adjacent to the selected text, rather than in a sidebar — minimizing eye movement
- Vocabulary lookups are tiered: a quick gloss appears first, with deeper linguistic context one click away
- The system tracks annotation history so repeat words feel lighter on subsequent encounters

## Technical Stack

- **Frontend:** React with a custom annotation layer built on the Selection API
- **Backend:** FastAPI, handling dictionary lookups and annotation persistence
- **Database:** PostgreSQL for user annotation history
- **Styling:** Custom CSS with careful attention to typography and reading ergonomics

## Challenges

The trickiest part was the annotation positioning engine. Inline annotations need to appear close to their anchor text without overlapping other annotations or running off the viewport. I wrote a constraint-satisfaction algorithm that places annotations in a priority queue, resolving overlaps by cascading downward.

## What I Learned

Building Marginalia pushed me to take UI/UX theory seriously, not just aesthetically but as a set of cognitive claims about users. Concepts like **mental models** and **affordances** stopped feeling abstract once I had to design against them.

It also revealed real tensions between completeness and usability. The more information I could surface, the more cognitive load I risked adding — the opposite of the goal.

---

*Source code available on GitHub.*
