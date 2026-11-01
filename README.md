# Personal Network Rules

自用网络分流与业务服务规则，提供 Surge 和 Clash/Mihomo 两种格式。规则集只定义匹配条件，实际出口由各设备配置中的策略决定。

## 规则分类

| 分类 | 内容 | Surge | Clash/Mihomo |
| --- | --- | --- | --- |
| 金融交易 | 富途及相关服务 | [futu.list](surge/futu.list) | [futu.yaml](clash/futu.yaml) |
| 商业服务 | Judge.me 及其子域 | [judgeme.list](surge/judgeme.list) | [judgeme.yaml](clash/judgeme.yaml) |
| 数据分析 | Google Analytics 后台主机 | [google-analytics-ui.list](surge/google-analytics-ui.list) | [google-analytics-ui.yaml](clash/google-analytics-ui.yaml) |

Analytics 规则仅匹配 `analytics.google.com`，不全局放行 `google-analytics.com` 或 `googletagmanager.com`。Judge.me 使用域名后缀匹配，覆盖其子域。规则需要放在广告拦截规则之前；如其他必要资源被拦截，应先确认具体域名和影响。

## Surge

将需要的规则放到 `[Rule]` 中、广告拦截规则之前，并将策略名称替换为设备实际存在的策略组：

```ini
RULE-SET,https://github.com/aliantech/personal-network-rules/raw/refs/heads/main/surge/futu.list,DIRECT
RULE-SET,https://github.com/aliantech/personal-network-rules/raw/refs/heads/main/surge/judgeme.list,Proxy
RULE-SET,https://github.com/aliantech/personal-network-rules/raw/refs/heads/main/surge/google-analytics-ui.list,Google
```

## Clash / Mihomo

使用 `classical` 类型的 YAML rule provider，并按需引用。策略名称必须在本机配置中存在。

```yaml
rule-providers:
  futu:
    type: http
    behavior: classical
    url: https://github.com/aliantech/personal-network-rules/raw/refs/heads/main/clash/futu.yaml
    path: ./ruleset/futu.yaml
    interval: 86400
  judgeme:
    type: http
    behavior: classical
    url: https://github.com/aliantech/personal-network-rules/raw/refs/heads/main/clash/judgeme.yaml
    path: ./ruleset/judgeme.yaml
    interval: 86400
  google-analytics-ui:
    type: http
    behavior: classical
    url: https://github.com/aliantech/personal-network-rules/raw/refs/heads/main/clash/google-analytics-ui.yaml
    path: ./ruleset/google-analytics-ui.yaml
    interval: 86400

rules:
  - RULE-SET,judgeme,Proxy
  - RULE-SET,google-analytics-ui,Google
  - RULE-SET,futu,DIRECT
```

其他客户端需要支持上述格式或自行转换；其兼容性未验证。

## 维护与验证

- `surge/` 与 `clash/` 按文件名对应；现有路径不得随意移动，以免影响已接入设备。
- 不提交代理凭据、订阅地址、私人端点或账户标识。
- 修改规则后运行 `node scripts/validate-rules.mjs`，检查规则格式及跨格式一致性。
