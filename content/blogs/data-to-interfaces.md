---
title: From Data Pipelines to Human Interfaces
description: My internship at Shanghai AI Lab taught me to work at massive scale. Building Marginalia taught me that scale isn't everything. Here's what I took from both.
tags: [AI, Full-Stack, Reflection]
date: 2025-01-15
---

For three months last year, I helped maintain large-scale data processing pipelines for LLM pre-training at Shanghai AI Lab. The scale was unlike anything I'd worked with before — hundreds of thousands of data entries, cleaned and deduplicated with Python and Spark, clusters that took hours to process a single run.

Then I came home and built a reading interface for individual ESL learners.

The contrast was jarring in a useful way.

## What Large Scale Teaches You

At the Lab, correctness at scale is the whole game. A deduplication bug that silently keeps 0.5% of near-duplicates doesn't surface obviously — but it shows up eventually in model behavior in ways that are hard to attribute. You learn to think carefully about pipeline stages, test on small samples before running on large ones, and build in observability.

I implemented hierarchical clustering on high-dimensional embeddings and visualized the results with t-SNE and TensorBoard. That workflow — transform, cluster, inspect, revise the transform — is deeply iterative. You're trying to understand what structure exists in data that's too large to look at directly. It requires building tools to help yourself see.

I also refactored the parameter-loading code for their parallel training architectures. The codebase was large, sparsely commented, and initially overwhelming. I got through it by working module by module, adding documentation as I understood each part — and by eventually asking the original author questions I should have asked sooner.

That last lesson was harder to learn than any technical skill.

## What Small Scale Teaches You

Building for a single user — or imagining a single user, in the case of Marginalia — forces a different kind of attention. You can't average over a distribution of users. You have to ask: what does *this person*, with *this goal*, in *this moment*, actually need?

That question doesn't show up in data pipeline work. The pipeline doesn't have a user experience; it has a correctness criterion and a runtime.

When I was designing the annotation positioning algorithm for Marginalia, the constraint was: don't cover the text the user is reading. Not "don't cover text in general." The specific spatial relationship between annotation and anchor, on a specific viewport, for a reader in the middle of a sentence — that's the problem.

It's a smaller problem than "clean 500k documents," but it requires a different kind of thinking: embodied, contextual, almost theatrical.

## Where These Meet

The work I find most interesting sits where both sets of skills matter.

Emotion detection from wearable data — my capstone — has scale problems (population-level model training, signal noise at volume) and individual problems (physiological baselines vary; a model that works on the average user may fail for a specific person).

Personalization in language learning tools has similar structure: you need enough data to train useful models, but the value the tool delivers happens one reader at a time.

I think the engineers who will do the most interesting work in the next decade are the ones who can move between these levels — who understand both the data infrastructure and the individual user experience, and who can reason about how changes at one level affect the other.

I'm working on being that kind of engineer.
