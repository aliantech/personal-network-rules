# 自定义规则审查

本清单记录规则的用途和证据；候选项不自动放行，也不改变设备配置。共享规则不得包含私人域名、设备标识、订阅地址或凭据。

| 分类 | 服务 | 状态 | 判断 |
| --- | --- | --- | --- |
| 金融 | 富途 | 已维护 | Surge 与 Clash 规则保持一致；出口由设备配置决定。 |
| 行情与图表 | TradingView Desktop | 候选，待客户端验证 | 基于 Surge 面板 2026-11-04 可见请求，使用精确主机匹配；记录有限，不能保证覆盖所有功能。排除被拦截的 `snowplow-pixel.tradingview.com`，不改变既有广告或统计拦截。官方帮助确认 `pricealerts.tradingview.com` 用于警报服务。 |
| 商业 | Judge.me | 已维护 | `judge.me` 及子域用于业务服务；Judge.me 官方文档确认其组件使用该域名下的 CDN。 |
| 分析 | Google Analytics 后台 | 已维护 | 只匹配 `analytics.google.com` 主机，不全局放行数据采集或标签管理域名。 |
| 分析 | Google Marketing Platform | 待验证 | `marketingplatform.google.com` 是 Google 官方管理入口，公开 anti-AD 列表包含该主机。仅在实际后台受阻并确认需要时考虑精确 `DOMAIN` 例外。 |
| 商业 | Shopify 后台 | 使用现有规则 | 官方后台已有明确入口；如实际请求被误拦，再按必要主机单独评估，避免放行整个 CDN 或所有商家域名。 |
| AI / 开发 | AI 服务、GitHub | 使用现有规则 | 现有上游规则和设备策略组可用时不复制；有明确漏项或不同出口需求时再独立维护。 |
| 私有网络 | 私域、设备及 Ponte | 仅设备本地配置 | 网络标识、私人端点和设备信息不放入公开仓库；设备内规则需分别验证。 |

## 加入新规则的条件

1. 记录具体服务、失败现象和实际需要的主机；不上传请求完整 URL、身份信息或令牌。
2. 核对官方文档和当前生效规则，优先使用精确 `DOMAIN`；需要覆盖子域时说明原因。
3. 分流用途不同的服务分开维护，由设备配置选择策略，放行例外应排在相关拦截规则之前。
4. 同步维护 Surge 与 Clash 对应格式，运行 `node scripts/validate-rules.mjs`；分别在目标客户端验证加载与业务功能。

## 参考

- [TradingView 警报连接排查](https://www.tradingview.com/support/solutions/43000732768-errors-when-creating-loading-alerts/)
- [Judge.me 集成与 CDN](https://judge.me/help/en/articles/8278390-build-integrations-with-judge-me)
- [Google Marketing Platform 登录](https://support.google.com/marketingplatform/answer/9013750?hl=en)
- [Shopify 后台](https://help.shopify.com/en/manual/shopify-admin)
- [anti-AD Surge DOMAIN-SET](https://github.com/privacy-protection-tools/anti-AD/blob/master/anti-ad-surge2.txt)
