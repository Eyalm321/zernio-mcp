# Changelog

## Unreleased

### Added
- `zernio_sync_external_post` (`POST /v1/posts/sync-external`) and `zernio_get_post_metrics` (`GET /v1/metrics/posts`): pull a post made outside Zernio, such as a Facebook reel shared by hand, and read its metrics, which `zernio_get_post_analytics` did not show (#31).

### Changed
- `zernio_create_post` refuses a facebook.com / fb.watch link in the text of a Facebook target before publishing. Facebook rejects such posts (Graph 1609008) and has no reshare API, so the post used to fail after counting against usage; the tool description now says so (#30).

## 2.4.0 (2026-11-22)

### Changed
- Requires Node 22 or later (`engines.node >=22`); Node 20 reached end of life in April 2026. CI tests Node 22 and 24; the publish workflow's build and GitHub Packages jobs run on Node 22 (the npm job stays on Node 24 for trusted publishing). `@types/node` follows the lowest supported major (^22).

### Fixed
- `zernio_get_post_comments` pages: it takes `limit` (1-100, default 25) and `cursor`, so threads longer than one page can be read in full (#32). It also takes the API's `commentId` (replies to one comment), `subreddit` and `view` (`summary`) parameters.

### Maintenance
- `vitest` 4.1.12 → 5.1.0 (dev only, #20).

## 2.3.1 (2026-11-18)

### Fixed
- `zernio_list_ad_accounts` takes the `accountId` the API requires (`GET /v1/ads/accounts`), so it no longer always fails with 400 `accountId is required`. It also takes the optional `adAccountId`, `limit`, `inScopeOnly` and `live` filters.

## 2.3.0 (2026-11-17)

### Fixed
- `zernio_update_gmb_location_details` now matches Zernio's `PUT /v1/accounts/{accountId}/gmb-location-details` (Google `locations.patch`): `locationId` goes in the query string, `updateMask` is built from the fields given (or passed explicitly), and the fields use Google's shapes: `title`, `description` (sent as `profile.description`), `websiteUri`, `phoneNumbers`, `regularHours.periods[]`, `specialHours.specialHourPeriods[]`, `storefrontAddress` and `categories`. Times are checked as HH:MM and days as MONDAY..SUNDAY. The old `name`, `address`, `phone`, `hours` and `website` arguments are gone: the API never accepted them, so no call that used them could succeed (#25). A call with no fields is rejected before any request.

### Added
- `zernio_get_gmb_location_details` takes an optional `readMask` (e.g. `regularHours,specialHours`) to return only those fields.

## 2.2.1 (2026-11-16)

### Security
- `hono` 4.13.14 → 4.13.16 and `@hono/node-server` 1.19.17 → 2.1.6. Both come in through `@modelcontextprotocol/sdk`, whose declared range for `@hono/node-server` (`^1.19.9 || ^2.0.5`) includes 2.x, so the 1.19.17 override is removed. This clears the remaining moderate advisories in the SDK's HTTP transport (which this stdio server never loads anyway). `npm audit` reports 0 vulnerabilities, with and without `--omit=dev`.

## Earlier versions

See the [GitHub releases](https://github.com/Eyalm321/zernio-mcp/releases).
