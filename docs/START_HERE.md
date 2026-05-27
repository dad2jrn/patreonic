# Start Here

This file defines the standard new-project startup workflow for Cline.

When beginning work in this project, Cline should first read:

- AGENTS.md
- .clinerules/
- docs/START_HERE.md
- docs/CONTEXT.md
- docs/TASKS.md
- docs/DECISIONS.md

## New Project Startup Workflow

Do not write application code immediately.

First, build project context and project memory.

Follow this sequence:

1. Summarize the project structure and workflow you detect.
2. Identify empty or incomplete context fields in `docs/CONTEXT.md`.
3. Ask focused questions one at a time to complete the missing context.
4. After enough context is gathered, update:
   - `docs/CONTEXT.md`
   - `docs/TASKS.md`
   - `docs/DECISIONS.md`
5. Replace relevant `TBD` placeholders in `docs/CONTEXT.md`.
6. Create a practical first task list in `docs/TASKS.md`.
7. Record meaningful project setup decisions in `docs/DECISIONS.md`.
8. Do not create or modify application code until an implementation plan is approved.
9. After updating the docs, propose the first small vertical slice of work.

## Skill Usage

Use AI Hero skills when useful:

- Use `grill-me` when requirements are unclear.
- Use `grill-with-docs` when existing project docs should guide the questions.
- Use `to-prd` when the project needs a formal PRD.
- Use `to-issues` when the plan should become task tickets.
- Use `tdd` when implementation begins and behavior can be tested.
- Use `diagnose` when debugging.
- Use `handoff` when ending a long session or when project context becomes large.
