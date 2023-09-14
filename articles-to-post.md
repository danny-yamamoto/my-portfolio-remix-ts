# Query GraphQL endpoints using the Fetch API in Remix.

このメモは、Remix[^6] で Web 標準 API で GraphQL Query 処理を実装した時にまとめたものです。

[^6]: https://remix.run/

Apollo Client[^5] などの Client Side の操作ではなく、Server Side で操作します。

```mermaid
flowchart LR
    client["`Clinet`"]
    server0["`Server
    Fetch`"]
    server1["`Qiita`"]
    server2["`GitHUb`"]
    client --> server0
    server0 -->|REST| server1
    server0 -->|GraphQL| server2
```

Topic は以下のとおりです。
- Remix
- TypeScript
- GraphQL
- Cloudflare Pages

さらに詳しく見たい方は読み続けてください。

---

2023年9月2回目です。


Remix は、Server Side も Web 標準の Web Fetch API で実装することを目指しています。developer の学習コストを抑えるために。

今回、Apollo Client[^5] などを使わず、標準 API（Fetch）で通信する方法で実装します。

[^5]: https://www.apollographql.com/docs/react/

今回作成したサイトは[こちら](https://my-portfolio-remix-ts.pages.dev/)です。

「Repositories」が GraphQL、「Top 20 Article」が REST です。

https://my-portfolio-remix-ts.pages.dev/

## GraphQL Server
- GitHub から自分が Owner のリポジトリを取得して表示します。
- Endpoint は、GitHub の GrahpQL Server です。 `https://api.github.com/graphql`

## Environment
- GitHub Personal Access Token（Token）を使います。
- Endpoint URI と Token を環境変数に定義します。
   - Local 環境
      - environmetは `.dev.vars` に定義します。[^4]
         - Remix を Cloudflare に Hosting する場合。

```bash
.
└── app
    └── .dev.vars
```

![65ffc63efda8c42d4b3f-b.jpg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/569971/150ec387-3e59-61e6-2732-59039e7d5305.jpeg)

[^4]: https://remix.run/docs/en/1.19.3/guides/envvars#server-environment-variables

## GitHub GraphQL API[^2]
- `User-Agent` が必須です。
- Requirement
   - Header
      - User-Agent
      - Authorization
         - Personal Access Token[^1]

[^1]: https://docs.github.com/ja/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

[^2]: https://docs.github.com/ja/graphql

- User-Agent がない場合、エラーとなります。
```bash
SyntaxError: Unexpected token 'R', "
Request fo"... is not valid JSON
    at async getRepositories (cc79nj3l2mn.js:16068:11)
    at async loader (cc79nj3l2mn.js:16141:168)
    at async callRouteLoaderRR (cc79nj3l2mn.js:3329:16)
    at async callLoaderOrAction (cc79nj3l2mn.js:2434:16)
    at async Promise.all (index 0)
    at async loadRouteData (cc79nj3l2mn.js:2168:19)
    at async queryImpl (cc79nj3l2mn.js:2048:20)
    at async Object.query (cc79nj3l2mn.js:2000:18)
    at async handleDocumentRequestRR (cc79nj3l2mn.js:3480:15)
    at async cc79nj3l2mn.js:3599:228 {
  stack: SyntaxError: Unexpected token 'R', "
Request fo".….js:3480:15)
    at async cc79nj3l2mn.js:3599:228,
  message: Unexpected token 'R', "
Request fo"... is not valid JSON
```

## Cloudflare Pages
- `.dev.vars` と同じ変数を定義します。
- Settings > Environment variables[^3]

[^3]: https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables

![65ffc63efda8c42d4b3f-a.jpg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/569971/705f9fa8-1c4a-f5d2-90c3-0c664c2f31aa.jpeg)

## 実装

https://github.com/danny-yamamoto/my-portfolio-remix-ts/blob/4549f3fe0806bf2b14e5379b6d53de135e6bc479/app/utils/repository.server.tsx#L26-L54

## Summary
- Web 標準 API での GraphQL Query 処理について書きました。
- 単純にやると、毎回 API からデータを取得することになるため、cache させて高速化させる必要があると思います。
- Largest Contentful Paint（LCP）を向上させるには、CDN で処理させるのが現状最善だと思います。SEO を考慮した場合。
- 弊社の 2C 向けのサイトの今後を想定して、最適な構成について考えたいと思います。

この投稿をみて何か得られた方は、いいね ❤️ をお願いします。

それでは、また別の話でお会いしましょう。👋
