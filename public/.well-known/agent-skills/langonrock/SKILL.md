---
name: langonrock
description: Read and write a langonrock document database through its MCP tools, six by default and three more for transactions, history and restore with --database-tools. Use when an agent needs to answer questions from a knowledge base without crawling raw Markdown, to persist what it learned without overwriting anyone else's edit, or when setting up langonrock as an MCP server for Claude Code or Cursor.
license: MIT
---

# Reading and writing a langonrock database

langonrock is a document database for Markdown. It stores documents in its own engine, commits
changes atomically, keeps a history of revisions, and compiles every commit into a read model an
agent queries by id. The point is token cost: read a dense manifest once, then fetch only the
sections you need, rather than crawling Markdown files until the answer appears.

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
invocation then reuses one process instead of paying cold start. Append `--database-tools` to the
registered command to expose the three database tools described below.

## The six tools

| Tool       | Input                                             | Output                                             |
| ---------- | ------------------------------------------------- | -------------------------------------------------- |
| `manifest` | `bundle?`                                         | The manifest as TSV                                |
| `search`   | `query`, `k?`, `bundle?`                          | Ranked manifest rows and a `pos` cell              |
| `get`      | `ids[]`, `section?`, `offset?`, `limit?`, `find?` | Framed slices, one `@@ id` block each              |
| `snapshot` | none                                              | The current digest                                 |
| `write`    | `bundle`, `path`, `content`, `replaces?`          | The commit's snapshot, plus that file's warnings   |
| `delete`   | `bundle`, `path`, `replaces?`                     | The commit's snapshot                              |

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

`write` creates or replaces one concept and `delete` removes one. Each commits a revision of its own
before answering, so the change is visible to `manifest`, `search` and `get` on your next call. Send the whole document in `content`, not a patch, with frontmatter carrying at least a
`type`.

Replacing needs `replaces`, the hash of the version being replaced. You are not expected to know it:
call without it and the refusal names the hash to retry with. Omit it when creating — its absence is
what asserts the concept is new. `delete` has no create case, so its hash is never optional.

Writing to a store with no knowledge in it yet creates the tenant, and naming a bundle that does not
exist creates the bundle, so persisting a first note needs no setup.

Ids are the shortest unambiguous form of their path, so adding a file can rename a concept nobody
edited. Re-read the manifest after writing instead of reusing ids you saw before.

## Database tools (opt-in)

With `--database-tools` the server adds three more tools. They cost tokens in every session, which
is why they are off by default.

| Tool       | Input                                                          | Output                                      |
| ---------- | -------------------------------------------------------------- | ------------------------------------------- |
| `transact` | `changes` (1 to 1,000 writes and deletes), `expectedRevision?` | The new revision and snapshot, as JSON      |
| `history`  | `before?`, `limit?` (1 to 100)                                 | Revisions newest first, and a `next` cursor |
| `restore`  | `revision`, `expectedRevision`                                 | The new revision and snapshot, as JSON      |

Use `transact` when several documents must change together. A change is
`{operation: "write", bundle, path, content, replaces?}` or
`{operation: "delete", bundle, path, replaces}`, where `replaces` is the 64-character source hash.
No change commits if any precondition fails, so a batch either lands whole or not at all.

To undo, read `history`, pick the revision to return to, and call `restore` with the current
revision as `expectedRevision`; the first entry of `history` is the current one. Restore publishes
the old state as a new revision and rewrites nothing.

If an error says the commit outcome is indeterminate, the change may already be committed. Read
`history` before retrying, and never retry blindly.

## Checking for staleness

`snapshot` returns the current digest. Compare it against the digest you saw earlier to know whether
anything you already read has been invalidated; identical digests mean identical bytes.

## Reference

- Documentation: https://langonrock.com/docs
- MCP server guide: https://langonrock.com/docs/guides/mcp
- Transactions: https://langonrock.com/docs/database/transactions
- Source: https://github.com/langonrock/langonrock
