---
name: langonrock
description: Read an Open Knowledge Format store through langonrock's four MCP tools. Use when an agent needs to answer questions from a compiled knowledge base without crawling raw Markdown, or when setting up langonrock as an MCP server for Claude Code or Cursor.
license: MIT
---

# Reading a langonrock store

langonrock compiles a folder of Open Knowledge Format bundles into a read model an agent queries by
id. The point is token cost: read a dense manifest once, then fetch only the sections you need,
rather than crawling Markdown files until the answer appears.

## Connect

```sh
claude mcp add langonrock -- langonrock mcp "okf:///abs/path/to/data?tenant=acme"
```

The connection string picks the backend, and the tool surface is identical across all of them:

| Scheme       | Where the data is                                    |
| ------------ | ---------------------------------------------------- |
| `okf:`       | a directory on this machine, opened directly         |
| `okf+unix:`  | a local daemon over a unix socket, indexes stay warm |
| `okf+http:`  | a remote server, tenant resolved from the token      |
| `okf+https:` | the same over TLS                                    |

Point it at a daemon rather than a path when several agent sessions share one machine — every
invocation then reuses one process instead of paying cold start.

## The four tools

| Tool       | Input                                             | Output                                    |
| ---------- | ------------------------------------------------- | ----------------------------------------- |
| `manifest` | `bundle?`                                         | The manifest as TSV                       |
| `search`   | `query`, `k?`, `bundle?`                          | Ranked manifest rows and a `pos` cell     |
| `get`      | `ids[]`, `section?`, `offset?`, `limit?`, `find?` | Framed slices, one `@@ id` block each     |
| `snapshot` | none                                              | The current digest                        |

`search` never returns bodies. `k` is capped at 50. `get` needs at least one id and reports ids it
could not resolve as a trailing `@@ missing` block instead of failing the call.

## The session to have

1. **Read the manifest first.** Every row is `id, bundle, kind, status, grain, summary, links`. Ids
   are never guessed — they come from manifest rows you already hold. If the client preloads MCP
   resources, take it from `okf://manifest` instead of calling the tool: that lands it in the
   cacheable prompt prefix, where it costs roughly a tenth as much on every later turn.
2. **Pick ids from those rows.**
3. **Call `get` once with all of them.** A batch costs one round trip regardless of size, so
   collecting ids and making a single call beats calling per id.

On a store too large to read whole, replace step 1 with `search`, or with `manifest` narrowed to one
`bundle`. The `manifest` tool's own description says which applies — the server measures the store
at startup and writes the verdict into the description.

## Fetching less than a whole concept

`get` returns at most 15,000 characters per concept. Three arguments narrow it further, and one of
them almost always applies:

- `section` when you only need a named part, such as a schema.
- `find` with a literal case-insensitive phrase, when the answer is quoted in the text. It returns a
  window around the first occurrence plus the offset of every one — the cheap way to answer "where
  does this say X" without paying for the document.
- `offset` with the `pos` value from a search hit, when the answer is described rather than quoted.
  `pos` is the character offset where the query's words cluster densest. `{offset: pos, limit: 2000}`
  gives a located passage instead of a truncated document.

A partial slice frames itself as `@@ id [start..end of total]`, so raise `limit` or move `offset`
only when that framing shows you are missing something.

## Reading the status column

A `status` cell other than `-` means the concept is deprecated, draft, or stale — the reader demotes
a concept past its `stale_after` date at read time. Say so when you answer from one anyway.

## Writing

There is no `put` tool, deliberately. The source folder is the truth and a watcher recompiles from
it, so a snapshot written through MCP would be silently replaced within about 30 seconds. Change
knowledge by editing the source Markdown — directly, or through the source API at
https://langonrock.com/docs/guides/editing — and let the watcher pick it up.

## Checking for staleness

`snapshot` returns the current digest. Compare it against the digest you saw earlier to know whether
anything you already read has been invalidated; identical digests mean identical bytes.

## Reference

- Documentation: https://langonrock.com/docs
- MCP server guide: https://langonrock.com/docs/guides/mcp
- Source: https://github.com/langonrock/langonrock
