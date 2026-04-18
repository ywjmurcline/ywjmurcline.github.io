---
title: Emotion Detection via Wearable Devices
description: Undergraduate capstone — building a real-time emotion recognition system using physiological signals from consumer wearables, with applications in mental health monitoring.
tags: [AI, Psychology, Research]
date: 2025-01
---

## Overview

My undergraduate capstone project explores real-time emotion detection using physiological signals from consumer-grade wearable devices. The system processes signals like heart rate variability, galvanic skin response, and accelerometer data to infer emotional states, with potential applications in mental health monitoring and adaptive learning environments.

## Research Question

Can consumer wearables — not lab-grade biosensors — provide sufficient signal quality for meaningful emotion classification? And if so, what signal processing and modeling approaches work best under real-world noise conditions?

## Approach

**Signal acquisition:** Data is collected from a wrist-worn device, sampling HRV, GSR, and motion at 50Hz. Raw signals are preprocessed with a bandpass filter and segmented into fixed-length windows.

**Feature extraction:** Time-domain and frequency-domain features are extracted per window. For HRV, this includes RMSSD, pNN50, and LF/HF ratio. GSR features include tonic level, phasic component amplitude, and response latency.

**Classification:** I compared several approaches — SVM with hand-crafted features, LSTM over raw signal windows, and a hybrid CNN-LSTM. The hybrid approach performs best on held-out data, suggesting that both local (convolutional) and temporal (recurrent) structure matter.

## Connection to Prior Work

This project draws on my earlier work at Ruijin Hospital, where I wrote Python scripts for a visual-stimuli paradigm detecting negative-emotion bias in patients and developed code to visualize brain signals across frequency bands. The hospital work was lab-controlled; the capstone asks whether similar results are achievable at scale, in the wild.

## Current Status

The system achieves reasonable accuracy on a 3-class valence classification task (positive / neutral / negative). Ongoing work focuses on personalization — individual physiological baselines vary significantly, and a purely population-level model underperforms for many users.

My thesis proposal received strongly positive feedback from my advisor, and I'm continuing to refine the personalization approach through the remainder of the academic year.
