---
title: Brain Signal Visualization (Ruijin Hospital)
description: Python tooling for visualizing EEG signals across frequency bands as part of a clinical research paradigm for detecting negative-emotion bias in patients.
tags: [Psychology, AI, Research]
date: 2023-09
---

## Overview

During a research collaboration at Ruijin Hospital, I built Python-based tools for a visual-stimuli paradigm designed to detect negative-emotion bias in patients. My work focused on two things: implementing the stimulus presentation and response logging pipeline, and building visualization code for EEG signals across frequency bands.

## What I Built

**Stimulus paradigm:** A Python script using PsychoPy to present visual stimuli (images with varying emotional valence) in a controlled sequence, logging reaction time and accuracy. Timing precision was critical — stimulus onset needed to be accurate to within a few milliseconds for the EEG data to be interpretable.

**Signal visualization:** After sessions, EEG data was processed and visualized across the standard frequency bands (delta, theta, alpha, beta, gamma). I wrote plotting routines using MNE-Python and matplotlib that the research team could run without programming knowledge, producing publication-quality figures.

## What I Learned

This was my first sustained exposure to neuroscience research methods and the data acquisition constraints they impose. Signal-to-noise in EEG data is genuinely brutal — most of what you record is artifact — and I gained real respect for the preprocessing steps that make the signal usable.

It also reinforced something I believe more strongly now: meaningful clinical research requires real collaboration between technical and domain experts. I could write the pipeline code, but understanding *which* frequency bands were theoretically relevant required the clinical team's knowledge.

This experience directly informs my interest in interdisciplinary AI research — systems that produce interpretable outputs that non-engineers can actually use.
