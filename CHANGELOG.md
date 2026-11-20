# Changelog

## Unreleased

### Added
- `zernio_sync_external_post` (`POST /v1/posts/sync-external`) and `zernio_get_post_metrics` (`GET /v1/metrics/posts`): pull a post made outside Zernio, such as a Facebook reel shared by hand, and read its metrics, which `zernio_get_post_analytics` did not show (#31).

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
