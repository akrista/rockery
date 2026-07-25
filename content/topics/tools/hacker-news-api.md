---
title: Hacker News API
date: 2026-07-25
tags:
  - tools
  - apis
---

The **Hacker News API** is a read-only Firebase Realtime Database API provided by Y Combinator for fetching stories, comments, users, and top story feeds.

## Base URL

`https://hacker-news.firebaseio.com/v0/`

## Core Endpoints

### 1. Item Details

Fetch specific items (stories, comments, jobs, polls) by numeric ID.

```http
GET https://hacker-news.firebaseio.com/v0/item/44840013.json?print=pretty
```

### 2. Top & Category Stories

Fetch an array of up to 500 item IDs representing current rankings.

```http
GET https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty
```

**Other Feeds:**

- `/v0/newstories.json`
- `/v0/beststories.json`
- `/v0/askstories.json`
- `/v0/showstories.json`
- `/v0/jobstories.json`
