# Claw Memory

**The AI that remembers things.**

Gather memories from Gmail, Slack, Dropbox, Apple Notes, and Todoist — and make them available to your Claw.

## Integrations

| Source       | Status |
|--------------|--------|
| Gmail        | ✅     |
| Slack        | ✅     |
| Dropbox      | ✅     |
| Apple Notes  | ✅     |
| Todoist      | ✅     |

## Architecture

Deployed as an AWS Lambda function behind API Gateway. CI/CD via GitHub Actions.

```
feature branch → PR → main → production (Lambda)
```

## Development

```bash
# test locally (Node 18+)
node -e "require('./index.js').handler({}).then(r => console.log(r.statusCode))"
```
<!-- pipeline test Sun Feb 22 06:35:27 UTC 2026 -->
