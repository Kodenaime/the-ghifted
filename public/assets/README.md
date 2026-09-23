# Assets

Drop the real files here once the client sends them over. The build reads from
these paths, so no code changes are needed to swap in real content.

| Folder | What goes here | Used by |
| --- | --- | --- |
| `videos/` | The 5+ past-collaboration `.mp4` files | "See Past Collaborations" slider |
| `images/` | Hero photo/video + any photography | Hero |
| `logos/` | Past-collaboration brand logos (PNG/SVG) | Logo marquee |

## Expected files

- `videos/` — e.g. `collab-01.mp4`, `collab-02.mp4`, …
- `images/hero.jpg` — hero media (optional; a styled gradient placeholder renders until then)
- `logos/` — transparent/white-background logo images

After dropping files in, update the relevant entries in `src/lib/content.ts`
(`PAST_COLLABORATIONS.videos`, `LOGOS`) to point at the new paths.
