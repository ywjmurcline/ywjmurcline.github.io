---
title: ESL Progressive Web App
description: A full-stack PWA that gives ESL learners a distraction-free, annotation-ready reading environment. Built with React, FastAPI, and PostgreSQL.
tags: [Full-Stack, Language Education, PWA]
date: 2024-10
---

## Overview

A full-stack Progressive Web App for ESL learners, designed to make sustained reading feel accessible rather than intimidating. The app works offline-first, so readers aren't dependent on network connectivity — important for users in contexts where connectivity is intermittent.

## Motivation

This project followed Marginalia as a more complete product attempt. Where Marginalia was an interface prototype, this was a full application: authentication, document management, reading state persistence, and a backend designed to scale.

It also forced me to confront architectural decisions I'd previously read about but never had to make for real — how to design a database schema for user-specific annotation data, how to handle optimistic UI updates when writes fail, what CDN caching strategy makes sense for document assets.

## Architecture

```
Frontend (React + Vite)
  └── Service Worker for offline caching
  └── IndexedDB for local annotation sync

Backend (FastAPI)
  └── PostgreSQL (user data, annotations, reading progress)
  └── S3-compatible storage (document assets)

Auth: JWT with refresh token rotation
```

## Key Features

- **Offline reading** — documents and annotations sync when connectivity returns
- **Reading progress tracking** — resume exactly where you left off
- **Vocabulary notebook** — words you've annotated are collected for review
- **Adjustable reading settings** — font size, line spacing, column width, for readers who need more visual control

## Lessons

Database design was the unexpected education here. Getting the schema right for user-specific annotations on shared documents took several iterations. I learned to think carefully about ownership semantics and query patterns before writing a single `CREATE TABLE`.

The cloud architecture choices also sharpened my sense of what I want to learn in graduate study — I made reasonable decisions but often from instinct rather than principle.
