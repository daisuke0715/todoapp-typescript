<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


## 学習メモ
### Nestjs ディレクトリ構成
- main.ts
  - entrypoint
  - bootstrapを実行
  - AppModule（app.module）

- app.module
  - exportクラス
  - @Module（Decorator）
  - Decorator = クラスにmeta情報を付加する
  - 外部とのmoduleの管理に責務を持つ

- controller
  - reqとresの対応関係の定義
  ```
  @GET('url')  // httpメソッド、urlの定義
  gethello() {    // 実行メソッド
    ... 処理
  }
  ```
  - routingの責務を持つ
- service
  - fatcontrollerになるのを防止のため具体の処理はserviceで実装して適切なタイミングでcontrollerからメソッドを呼び出す
  - 呼び出し方 `constructor(private readonly appService: AppService) {}`でcontrollerのコンストラクタ引数にAppServiceが指定されているので、thisで呼び出し可能
  - 毎回インスタンス生成すると、メモリ喰っちゃうからシングルトンにしている感じなのか
  - インスタンス化するクラスをAppModuleの内部にまとめて、main.tsでAppModuleをインスタンス化する際に、紐づくcontrollerやserviceも一緒にインスタンス化しているイメージ？（DIか）
  - 具体的な処理に責務を持つ



### 開発の流れ
- `nest g module <module名>` => module作成
- `nest g controller <controller名>` => controller作成
- `nest g service <service名>` => service作成


<br>
### 動作確認
- サーバーの起動
  - `npm run start:dev`コマンド実行でサーバーが起動




### 参考資料
[NestJS の基礎概念の図解と要約](https://zenn.dev/morinokami/articles/nestjs-overview)
[【NestJS】TODOリストでCRUDの処理を実装](https://zenn.dev/chida/articles/bba2b5346414ed)
[NestJS の @nestjs/swagger でコントローラーから Open API(Swagger) の定義書を生成する](https://qiita.com/odanado/items/60456ab3388f834dc9ca)
[TypeScript +NestJSをプロジェクトで導入したら素晴らしかった件](https://zenn.dev/naonao70/articles/a91d8835f1832b)