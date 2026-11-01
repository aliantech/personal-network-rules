# ftrading

Futu trading and personal business network rules for Surge and Clash.

## Files

- `surge/futu.list`: Surge rule set.
- `clash/futu.yaml`: Clash provider payload.
- `surge/judgeme.list`: Judge.me business services.
- `surge/google-analytics-ui.list`: Google Analytics administration UI.

## Surge

Use `surge/futu.list` as a remote rule set, then route the rule set to your target policy in Surge.

```ini
RULE-SET,https://github.com/aliantech/ftrading/raw/refs/heads/main/surge/futu.list,DIRECT
```

The business lists are independent so that each can use its own policy. Place
them before ad-blocking rules and replace the policy names with groups present
in the profile:

```ini
RULE-SET,https://github.com/aliantech/ftrading/raw/refs/heads/main/surge/judgeme.list,Proxy
RULE-SET,https://github.com/aliantech/ftrading/raw/refs/heads/main/surge/google-analytics-ui.list,Google
```

The Analytics list covers exactly `analytics.google.com`. It
does not globally allow `google-analytics.com` or `googletagmanager.com`;
individual features may still require further investigation.

## Clash

Use `clash/futu.yaml` as a classical rule provider:

```yaml
rule-providers:
  futu:
    type: http
    behavior: classical
    url: https://github.com/aliantech/ftrading/raw/refs/heads/main/clash/futu.yaml
    path: ./ruleset/futu.yaml
    interval: 86400

rules:
  - RULE-SET,futu,DIRECT
```

## Validate

```bash
node scripts/validate-rules.mjs
```
