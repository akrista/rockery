---
title: "ClicData API"
date: 2026-10-01
tags:
  - topics
  - tools
  - clicdata
  - api
---

ClicData's REST API can read and manage almost everything the UI does: dashboards, tables, rows, data flows, schedules, users, and more. Source: the official OpenAPI spec (published version **2026.3**, 157 operations in 24 groups), cross-checked with real read-only calls.

> [!info] Scope
> There are two access paths: the **REST API** and the **MCP server** (see below).

> [!warning] Keys do not belong in this note
> This note lives in a public repo. Keep keys in an untracked `.env` (e.g. `CLICDATA_TOKEN`) or in the Claude Code user config, never here.

## Official sources

- Interactive reference: `https://help.clicdata.com/api`
- OpenAPI/Swagger spec per version: `https://api.clicdata.com/help/api/swagger/user/{version}_USER/openapi`
  - Versions: `2021.08`, `2022.01`, `2024.06`, `2025.2`, `2025.3`, `2026.3`
- Importable into Postman/Insomnia.

## Standards

| Topic      | Detail                                                                    |
| ---------- | ------------------------------------------------------------------------- |
| Base URL   | `https://api.clicdata.com/{resource}` (always singular)                   |
| Version    | `api_version=` is **required**; each endpoint accepts its own version (see table below) |
| Body       | JSON, with `Content-Type: application/json`                               |
| Verbs      | GET read · POST create · PUT update · DELETE delete                       |
| Dates      | ISO 8601 in **UTC** (`2019-01-22 08:55:59`)                               |
| Pagination | `page` (from 1) and `page_size` (**max 100**)                             |
| Quota      | Calls per month depending on plan; a throttling setting exists to avoid exhausting it |

### Responses

List: `{ success, pagination: { result_count, result_total_count, current_page, page_size, has_more_results }, result: [...] }`. Single object: `{ success, result: {...} }`.

> [!warning] Errors come back as HTTP 200
> A failure arrives as `200` with `{ "success": false, "error": { "code", "description" } }`. `raise_for_status()` does **not** catch it: always check `success`. Common codes: `XXXXNotFound`, `PermissionInsufficient`. An invalid `page`/`page_size` also returns 200 with `success: false`.

## Authentication

Create an *API App* under **Menu → Account → API Apps** and pick the mode:

| Mode                      | Usage                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------- |
| **API Key**               | Header `CLICDATA-API-KEY` or `X-Api-Key`. Simplest option.                                       |
| OAuth2 Client Credentials | `POST /oauth20/token` with `grant_type=client_credentials`, `client_id`, `client_secret` |
| OAuth2 Authorization Code | `GET /oauth20/authorize` → `code` (valid 60 s) → `POST /oauth20/token`                 |
| Basic Auth                | `client_id` + username/password                                                        |

- OAuth: header `Authorization: Bearer <access_token>`; the token lasts **60 min** (Client Credentials: request a new one; Authorization Code: use the `refresh_token`).
- OAuth scopes (pattern `<resource>_read` / `<resource>_write`): `account`, `apiapps`, `connection`, `data`, `dataloader`, `dashboard`, `binder`, `schedule` (+ `schedule_trigger`), `role`, `folder`, `insight`, `object`, `user`, `table`, `task`, `dataflow`, `report_read`, `mediadocument`, `filestorage`, `datastream`, `datascript`, `menu`.

```bash
curl -H "CLICDATA-API-KEY: $CLICDATA_TOKEN" \
  "https://api.clicdata.com/table?api_version=2025.3&page=1&page_size=100"
```

## Version per endpoint

> [!warning] "The latest version" (2026.3) is not valid everywhere
> It is the published spec version, not a globally valid value. Sending `api_version=2026.3` to `/account` or `/table` returns `InvalidVersion` ("no longer available or supported"). Tested live: `/account` accepts `2022.01`; `/table` accepts `2022.01` and `2025.3`.

The version the spec declares per group (use that one):

| `api_version` | Groups |
| ------------- | ------ |
| `2022.01` | account, apiapps, binder, bulkdata, connection, dashboard, data, dataflow, dataloader, datastream, folder, livelink, object, role, schedule, task, team, view, and `user` (except the rows below) |
| `2024.06` | datascript, files |
| `2025.2` | menu, and 6 `user` operations |
| `2025.3` | table |
| `2026.3` | insight |

## Endpoints (spec 2026.3)

Standard CRUD = `GET /x` (list), `POST /x` (create), `GET|PUT|DELETE /x/{id}`. Only the extra routes are listed.

| Group | Base | Extras |
| ----- | ---- | ------ |
| Account | `/account` | `GET` only (usage and limits) |
| ApiApplication | `/apiapps` | `POST /apiapps/{id}/token/revoke`, `/token/{token_id}/revoke` |
| Binder | `/binder` | `POST /binder/{id}/tab`, `PUT|DELETE /binder/{id}/tab/{tab_id}` |
| Connection | `/connection` | CRUD |
| Dashboard | `/dashboard` | `/{id}/filter`, `/{id}/formula`, `/{id}/widget` (CRUD each) · `GET /{id}/snapshot` · `GET /{id}/thumbnail` |
| Table | `/table` | `POST /{id}/refresh` · `GET|PUT /{id}/schema` |
| Data (rows) | `/data/{table_id}` | `POST /select` · `/insert` · `/update` · `/delete` |
| BulkData (async) | `/bulkdata/{table_id}` | `POST|PUT|DELETE` on `/csv` and `/json` (append, update/append, delete) |
| DataFlow | `/dataflow` | `/{id}/nodes`, `/{id}/annotations` (CRUD) · `POST /{id}/run` |
| DataLoader | `/dataloader` | CRUD |
| DataScript | `/datascript` | `POST /run/{id}` · `GET /{id}/run` · `GET /{id}/run/{run_id}` |
| DataStream | `/datastream` | `POST /run/{id}` |
| Files | `/files` | `GET /{id}/download` · `POST /{id}/upload` |
| Folder | `/folder` | CRUD |
| Insights | `/insight` | `POST /{id}/copy` |
| LiveLink | `/livelink` | `POST /session` · `GET|DELETE /session/{token}` · `GET|POST /user/{user_id}/token` · `DELETE /user/{user_id}/token/{token}` |
| Menu | `/menu` | `GET` only |
| Object | `/object` | `GET /object`, `GET /object/{thumbprint}` |
| Role | `/role` | CRUD |
| Schedule | `/schedule` | `POST /trigger/{id}` |
| Task | `/task` | `GET` only (status of async tasks) |
| Team | `/team` | `POST|DELETE /{id}/user` · `POST|DELETE /{id}/parameter` |
| User | `/user` | `GET /user/me` · `POST /{id}/logout` · `PUT /{id}/password` |
| View | `/view` | `GET|PUT|DELETE` (no create) · `POST /{id}/cache` |

### Notes across versions

- `/media` (media documents) exists in `2022.01` but **not** in `2026.3`; `/files` replaces it.
- `/data/{id}/select` takes a `RowFilterModel` in the body and honors `page`/`page_size`; column names come back as-is (they may contain odd characters).
- `/bulkdata/*` creates an **async task**; check the result at `/task/{id}`. Accepts `error_handling` in the query.

## Useful read endpoints

| Endpoint | Purpose |
| -------- | ------- |
| `GET /dashboard` | Dashboard inventory |
| `GET /table` | Freshness: `last_refresh_date`, `last_data_update_date`, `last_process_status` |
| `GET /dashboard/{id}/widget` | Metrics: `ID2` (KPI) and `CH1`–`CH8` (chart) widgets |

Filtering by name or folder is **local** (on `name`/`folder_path`); the API does not do it.

## Ideas to explore

> [!todo]
> - Detect failed tables with `GET /task` instead of inferring it from the table fields.
> - Trigger a refresh with `POST /table/{id}/refresh` or `POST /schedule/trigger/{id}` after a load.
> - Read data with `POST /data/{id}/select` to validate numbers against SQL.
> - Check `success` on every response (errors arrive as HTTP 200).
> - Dashboard writes (`POST|PUT|DELETE` on `/dashboard`, widgets, filters, formulas) exist in the spec but are **untested**; the key acts with the permissions of the user who created the API App. Safe test: create an empty throwaway dashboard, add/edit/delete a widget, then delete it.
> - Verify the remaining endpoints live; verified so far: `/account`, `/table` (GET).
> - Keep an eye on the quota (see [[#Limits and usage]]); automate reading `GET /account`.

## Limits and usage

`GET /account?api_version=2022.01` returns `limits` (plan caps) and `usage` (consumption for the period), e.g. `api_calls`, `data_refreshes`, `datahook_calls`, `ai_credits`, `email_outbound`, `licenses`, `storage_bytes`, `file_bytes`. Values depend on the plan.

Observed behavior:

- **Monthly call quota**: the cap is per account (shared by every API App and key), not per key.
- **Only accepted calls count**: after about 20 test requests `api_calls` only grew by 4; the ones that returned `InvalidVersion` did not add up.
- **No documented per-second/minute limit**, and the API sends no `X-RateLimit-*` or `Retry-After` headers. If throttling applies, it is configured on the API App.
- **The MCP does not seem to consume `api_calls`**: after `initialize`, `tools/list`, and `get_me` the counter did not move, and `ai_credits` stayed at 0. Not a guarantee: heavy `query_data` calls might count differently, so re-read `usage` after real use.
- The API does not expose the reset period; the docs say "per month".

> [!tip] Quick check
> `curl -s -H "CLICDATA-API-KEY: $CLICDATA_TOKEN" "https://api.clicdata.com/account?api_version=2022.01"` and compare `usage.api_calls` with `limits.api_calls`.

## MCP server

ClicData exposes an MCP server that gives an agent **read-only** access to the account, with the permissions of the authenticated user.

| Field    | Value                                                          |
| -------- | -------------------------------------------------------------- |
| URL      | `https://api.clicdata.com/mcp` (streamable HTTP)               |
| Auth     | Header `CLICDATA-API-KEY` (or `X-Api-Key`); `Authorization: Bearer` returns 401 |
| Protocol | MCP `2025-03-26`, server `2026.4.198.0`                        |
| Key      | From an API App in API Key mode (**Menu → Account → API Apps**) |

Install in Claude Code (user scope, so the key stays out of any repo):

```bash
claude mcp add --scope user --transport http clicdata https://api.clicdata.com/mcp \
  --header "CLICDATA-API-KEY: <MCP api key>"
```

### Tools (14)

| Type | Tools |
| ---- | ----- |
| Discovery (`describe_*`) | `describe_dashboard_fields`, `describe_table_fields`, `describe_schedule_fields`, `describe_user_fields`, `describe_query_data_parameters` |
| Dashboards | `list_dashboards`, `get_dashboard` (config, live link, usage, widgets) |
| Tables | `list_tables`, `get_table`, `get_table_schema`, `query_data` (paged rows with `columns`, `groupByColumns`, `aggregations`, `filters`, `sortOrders`) |
| Schedules | `list_schedules`, `get_schedule` |
| User | `get_me` |

> [!important] Mandatory server rule
> Before any `list_*` / `get_*` / `query_data` call for a resource, call its `describe_*` tool and **wait** for the result (not in the same batch). `list`/`get` accept `fields` (dot notation, `*` for everything): request only what you need.

### MCP vs REST API

| I need to… | Use |
| ---------- | --- |
| Explore, query rows, review dashboards/tables from Claude | MCP |
| Write data, refresh tables, trigger schedules, manage users | REST API (the MCP is read-only) |
| Scripted automation | REST API |
