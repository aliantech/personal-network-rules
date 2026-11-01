# Personal Network Rules Agent Protocol

## Operating Principles

### Think Before Coding

不要假设，不要隐藏不确定性，要说明权衡。

- 实现前明确假设；如果不确定，先问。
- 如果存在多种解释，说明差异，不要静默选择。
- 如果有更简单方案，直接说；必要时推回过度设计。
- 如果需求不清楚，停下来说明卡点并提问。

### Simplicity First

用能解决问题的最少代码，不做投机性扩展。

- No features beyond what was asked.
- No abstractions for single-use code.
- No flexibility or configurability that was not requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

### Surgical Changes

只改必须改的地方，只清理自己造成的影响。

- Do not improve adjacent code, comments, or formatting.
- Do not refactor things that are not broken.
- Match existing style, even if you would do it differently.
- If you notice unrelated dead code, mention it; do not delete it.
- Remove imports, variables, and functions that your changes made unused.
- Do not remove pre-existing dead code unless asked.

### Goal-Driven Execution

把任务转成可验证目标，循环到完成验证。

- Add validation -> write or run the rule validation before changing rules.
- Fix a bad rule -> reproduce the validation failure, then make it pass.

## Project Identity

- Existing runtime checkout: `/home/yasin/workspace/ftrading` (legacy directory name; verify before use).
- GitHub: `https://github.com/aliantech/personal-network-rules`.
- Purpose: Personal network routing and business-service rule sets for Surge and Clash-compatible clients.

## Boundaries

- This repo is network routing rules only; do not add trading logic, broker automation, credentials, or account operations.
- Do not add secrets, API keys, tokens, proxy credentials, private endpoints, or personal account identifiers.
- Keep Surge rule sets in `surge/` and corresponding Clash provider payloads in `clash/`.
- Preserve published file paths and verify existing client URLs when changing the repository or branch.

## Verification

Run before committing rule changes:

```bash
node scripts/validate-rules.mjs
```

## Logging

For rule changes, update `README.md` only when usage changes. For operational governance changes, record the summary in Yasin Brain monthly logs.

<!-- BEGIN YASIN BRAIN EXPERIENCE REVIEW -->
## End-of-Task Experience Gate

- substantial engineering task 完成前必须执行 Yasin Brain 根 `AGENTS.md` 的 End-of-Task Protocol；触发条件只由根协议维护，本文件不复制。
- 项目专属经验优先更新本仓库现有 known issues、decision、runbook、test 或 schema guardrail；跨项目候选才进入 Yasin Brain。没有新知识时报告 `no_op`，不得为了完成 gate 创建 Markdown。
<!-- END YASIN BRAIN EXPERIENCE REVIEW -->
