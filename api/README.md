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


<br>
### コアファイル

```
- app.controller.ts => 簡便なシングルルート用コントローラ
- app.controller.spec.ts => ユニットテスト用コントローラ
- app.module.ts => アプリケーションのルートモジュール
- app.service.ts =>	シングルメソッドの簡便なサービス
- main.ts => NestFactory機能を使い、Nestアプリケーションインスタンスを作る為のファイル
（※ main.tsにはアプリケーションを起動するasync関数が含まれている。）
```
<br>
### main関数の挙動

```jsx
// main.tsのコードでは、HTTPリクエストを待つ簡単なHTTPリスナーを作っている
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

<br>
### Controllerの実装

```jsx
import { Controller, Get } from '@nestjs/common';

@Controller('cats')   // 複数のrootを /catsから始めることができて複数同じpathを記述する手間が省ける
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

- [ ]  例えばcontrollerのパスの接頭辞を`customers`として、デコレータ`@Get('profile')`を組み合わせると、`GET /customers/profile`リクエストへのルートパッティングが作成される
- [ ]  上記のように同一pathはコントローラの接頭辞を記述することでまとめることができる

<br>
### ****リクエストオブジェクト****

- [ ]  ハンドラのシグネイチャに`@Req()`デコレータを追加し、リクエストオブジェクトを注入する事で、リクエストオブジェクトにアクセスすることができる
- [ ]  リクエストオブジェクトはHTTPリクエストを表し、リクエストクエリ文字列、パラメータ、HTTPヘッダ、bodyのプロパティを持っている
- [ ]  多くの場合、これらのプロパティを手動で取得する必要はない。代わりに`@Bosy()`
や`@Query()`のような専用の手軽なデコレータを使用することができる。

[Reqestオブジェクトのプロパティ](https://www.notion.so/3ea5069e21d746a8bf71ce688fcfbce9)

<br>
### 新しいレコード作成

- [ ]  新しいレコードを作成するエンドポイントも用意したい。POSTハンドラを作成する。
- [ ]  シンプルだ。Nestha全ての標準的なHTTPメソッドにデコレータを提供している。※@Get()、 @Post()、 @Put()、 @Delete()、 @Patch()、 @Options()、 そして @Head()。
加えて、@All()はこれら全てを処理するエンドポイントを定義している。

```jsx
import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }
}
```
<br>
### ****ステータスコード****

- [ ]  レスポンスのステータスコードは常に200で、POSTリクエストの場合のみ201となる。ハンドラレベルにおいて`@HttpCode(...)`デコレータを追加すれば、この動作を簡単に変更可能

```jsx
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

<br>
### ****ルートパラメータ****

- [ ]  ルートのパスにパラメータトークンを設定すると、リクエストURLの動的な変数を受け付ける事ができる。以下の`@Get()`デコレータのサンプルの中で、パラメータトークンの使用法を例示する。この方法で宣言されたルートパラメータは`@Param()`デコレータを使用してアクセスすることができ、メソッドシグネイチャに追加する事ができる。

```jsx
@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```

<br>


## Nuxtの基本的な処理まとめ
### コントローラ

- [ ]  コントローラーはリクエストを受け取ってレスポンスを返すもの。
- ルーティングもコントローラーで行う
- 1つのコントローラー内で複数のルートを設定できる（userのコントローラーを作ってuserに関するCRUDはそのコントローラーでルーティングするイメージ）

![https://res.cloudinary.com/zenn/image/fetch/s--mFBX9C4e--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://docs.nestjs.com/assets/Controllers_1.png](https://res.cloudinary.com/zenn/image/fetch/s--mFBX9C4e--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://docs.nestjs.com/assets/Controllers_1.png)

- 何のコントローラーかはデコレーター（`@Controller("foo")`）で宣言
- コントローラー内のアクションもデコレーター（`@メソッド()`）で宣言

```jsx
import { Controller, Get } from '@nestjs/common';

@Controller('cats') // この部分はURLに含まれる
export class CatsController {
  @Get()
  findAll(): string { // メソッド名は自由に決められる
    return 'This action returns all cats';
  }
}
```

↑ 例えばこの場合は/catsにアクセスするとcatsの一覧。もし@post("/bar")とするとPOST /cats/barというエンドポイントが作られるイメージ

<br>
### レスポンスのシリアライズについて

- [ ]  NestJSではビルトインの仕組みでシリアライズを行ってくれる。JSのオブジェクトをreturnすれば自動でJSONに変換してくれる。ただし、string、boolean、numberといったプリミティブな値を返した場合はシリアライズは行われない。

```jsx
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

<br>
### ****レスポンスのHTTPステータス****

- [ ]  これもデコレータで

```jsx
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

<br>
### ****レスポンスヘッダーをカスタマイズ****

- [ ]  これもデコレータで

```jsx
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

<br>
### レスポンスのリダイレクト

- [ ]  これもリダイレクトで

```jsx
@Redirect('https://docs.nestjs.com', 302)
@Post()
create() {
  return 'This action adds a new cat';
}
```

<br>
### URLからパラメーター

```jsx
// CatsController
@Get(':id') // 受け取るパラメーター
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```

- [ ]  この例だと`GET /cats/:id`というエンドポイントになる。`@Param()`
を使うことでパラメーターの値が受け取れる。`@Param('id') id: string`
というように特定のパラメーターだけ受け取ることもできるとのこと。

<br>
### 非同期処理

- [ ]  非同期処理は普通にasyncつけるだけでできる

```jsx
@Get()
async findAll(): Promise<any[]> {
  return [];
}
```

<br>
### リクエストのbodyを受け取る

- [ ]  `@Body()`デコレータを使う

```jsx
@Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }
```

<br>
### リクエストのクエリを受け取る

- [ ]  クエリを受け取る

```jsx
findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }
```

<br>
### ****コントローラーをmoduleに登録****

- [ ]  コントローラーはmoduleファイルで明記しておく必要あり。これをやらないとNestJSはコントローラーを読んでくれない。

```jsx
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';

@Module({
  controllers: [CatsController],
})
export class AppModule {}
```


<br>
### TypeScriptの変数の末尾の"!"(感嘆符)の意味
- Non-null
```jsx
private func(): string {
  let foo = external_func(); // 戻り値の型はstring | undefinedとする

  // return foo; NG。戻り値の型がstringに対してstring | undefinedを返しているため
  return foo!; // OK。"!"によりstring | undefinedをstringにcastしているのと同等
}

```


<br>
### DTOについて
- DataTrasferObjectの略
- **DTO自体は、開発者やAPIを使用するユーザーにとって、リクエストボディがどのような形状を期待するかを知るためのガイドラインであり、実際にはそれ自体で**検証を実行することはありません。
- **値を渡す際のバリデーションを有効するためにDTOを定義する**


<br>
### Interfaceについて

- [ ] クラス、オブジェクトに明確な型を用意して、静的型付けのメリットを享受することができるようにしたのが、interface！！！
- [ ] プリミティブ型は、低レイヤーで確保されるメモリ領域が明確に決まっているが、それ以外のクラスについては、決まっていない
- [ ] メモリ領域を明確にするためにも、interfaceを使って、クラスのインスタンス化の際も、確保されるメモリ領域が明確になっていることがポイント！
- [ ]  具体的な実装を見せずに継承させるオブジェクトの使い方を定義したもの
- [ ]  実装が長くなりそうだったり、様々な機能の実装が見込まれるオブジェクトに先に実装が予定されるものの要素と型を定義しておくことによって、実装漏れがなくなるし、その型を使い回しができるようになるし、どのような構造になっているのかがわかりやすくなって運用がしやすくなる！
- [ ]  可読性が上がる


### Interfaceとは

- [ ]  オブジェクトの型
- [ ]  オブジェクトのみのTypeAlias
- [ ]  ほとんどTypeAliasと一緒
- [ ]  interfaceはオブジェクトのみ、TypeAliasは何でもいける
- [ ]  interfaceがオブジェクトのみを扱うので、それがオブジェクトのことを指し示すから、何を指し示しているのかがめちゃくちゃわかりやすい
- [ ]  あくまでも継承させるクラスから生成されるインスタンスが持っている仕様になるので、staticやクラスメソッドなどは定義できない

### Interfaceはこう使う

```tsx
interface Human {
	name: string;
	age: number;
}
```

<br>
### メソッドをオブジェクトの型に指定する方法

```tsx
interface Human {
	name: string;
	age: number;
	// パターン①
	greeting: (message: string) => void;
	// パターン②
	running(speed: number): void;
}
```

<br>
### implementsを使用してクラスに対してInterfaceの条件を適応させる方法

- [ ]  implementsしたinterfaceの仕様は、少なくとも満たさなければならないクラスになる！

```tsx
interface Human {
	name: string;
	age: number;
	greeting(message: string): void;
}

class Developer implements Human {
	constructor(readonly name: string, readonly age: number,) {}
	
	greeting(message: string): void {
		console.log(message);
	}
}
```

<br>
### abstractクラスとinterfaceの違い

- [ ]  abstractは、内部に実装を含むクラスに必ず実装させたいメソッドの仕様を定義する
- [ ]  interfaceは全く実装を持たない

<br>
### これがTypeScriptの構造的な部分型だ

- [ ]  構造的部分型とは、インスタンス化されたオブジェクトが、interfaceを満たしていれば、インスタンス化することができる

```tsx
interface Human {
	name: string;
	age: number;
	greeting(message: string): void;
}

class Developer implements Human {
	constructor(readonly name: string, readonly age: number, readonly experience: number) {}
	
	greeting(message: string): void {
		console.log(message);
	}
}

// この書き方は、OK（構造的部分型）
const user: Human = new Developer("Quill", 38, 3)
```

<br>
### readonly修飾子をinterfaceに使って読むだけのプロパティを作る方法

- [ ]  書き込みできなくする
- [ ]  読み込みはできる

```tsx
interface Human {
	readonly name: string;
	age: number;
	greeting(message: string): void;
}
```

<br>
### extendsを使ってinterfaceを継承する方法

- [ ]  特定の部分を再利用したい時とかに便利
- [ ]  同じ名前のプロパティは継承することは、条件によっては上書きされるが、基本的に継承元の定義が優先される！

```tsx
// nameを再利用したい
interface Namable {
	name: string;
}

interface Human extends Namable {
	age: number;
	greeting(message: string): void; 
}

// 上記は以下と同じ
interface Human {
	name: string;
	age: number;
	greeting(message: string): void; 
}
```

<br>
### interfaceで関数の型を表現する方法

- [ ]  関数単体でInterfaceを用意することも可能

```tsx
// interfaceを使用しない書き方
type addFunc = (num1: number, num2: number) => number;
let addFunc: addFunc;
addFunc = (n1: number, n2: number) => {
	return n1 + n2
}

// interfaceを使用した書き方（オブジェクトと混同してしまうので、上の方が良さそう）
interface addFunc {
	(num1: number, num2: number): number
}

const addFunc: addFunc = (n1: number, n2: number) => {
	return n1 + n2
}
```

<br>
### ？を使って、あってもなくてもいいオプショナルプロパティとオプショナルパラメータを使用する方法

- [ ]  オプショナル型
- [ ]  nullable
- [ ]  stringとundefiendのunion型になっている
- [ ]  つまり、string | undefiend 型になっている
- [ ]  インスタンス化する際に初期値が設定されるものに関しては、nullableにする必要がない
- [ ]  null、undefinedになる可能性がないから

```tsx
type Namable = {
	name: string;
	nickName?: string;
}

const nameable: Nameable = {
	name: 'Quill',
	// nickNameはあってもなくてもいい
}
```

- [ ]  !の場合、必須で用意する必要あり


<br>
### 今回の構成でのバックエンド開発の手順
1. データベースの作成
- [ ]  フレームワークに搭載されているORMなどを使用して、データベースを作成する
- Entityの用意（データベースDir配下）
- DTOの作成（データをやり取りする際の型を作成 = メソッドごとに必要？）
- データベースの作成（マイグレーションファイルをもとに実体を作成）
- データベース接続設定（ORM）

<br>
2. 各種インターフェースの用意（具体的な実装を持たない）

- [ ]  設計書を作るイメージ（外枠だけ作成して実装に抜け漏れがないようにするのと、要件を満たしているかを実装前から確認することができる、枠組みを他のクラスでも再利用できる）
- 各クラスではどのような性質を持ったプロパティが用意されるか
- 各クラスが持つ機能の仕様はどのようになっているか
- [ ]  バックエンドで作成すべきインターフェースの例
- リクエスト、レスポンス、それぞれのオブジェクト

<br>
3. 各種クラスの作成

- [ ]  全体の処理の流れから、必要なクラスを細かく分けて作成
- レスポンスクラス（考えうるステータスコードの種別にクラスを作成[全てに共通するCommon Responseクラスを継承させる]）
    - （Common Response）全ての処理に共通するステータスコード、タイムスタンプ、データを持ったクラス
    - （okResponse）正常値のレスポンスの場合
    - その他4xx系のリクエスト内容に不備がある際のエラーのクラス
- 全ての処理を網羅する形で、各種処理に応じたDTOクラスの作成

<br>
4. 決定したアーキテクチャの構成でディレクトリを作成

- [ ]  各種ディレクトリの責務を明確にする
- [ ]  具体的な処理を実装


<br>
### 動作確認
- サーバーの起動
  - `npm run start:dev`コマンド実行でサーバーが起動
  - docker-compose 使用時は、`docker-compose run --rm api npm run start:dev`


<br>
### 参考資料
- [NestJS の基礎概念の図解と要約](https://zenn.dev/morinokami/articles/nestjs-overview)
- [【NestJS】TODOリストでCRUDの処理を実装](https://zenn.dev/chida/articles/bba2b5346414ed)
- [NestJS の @nestjs/swagger でコントローラーから Open API(Swagger) の定義書を生成する](https://qiita.com/odanado/items/60456ab3388f834dc9ca)
- [TypeScript +NestJSをプロジェクトで導入したら素晴らしかった件](https://zenn.dev/naonao70/articles/a91d8835f1832b)
- [NestJS 公式ドキュメントver7日本語訳](https://zenn.dev/kisihara_c/books/nest-officialdoc-jp/viewer/overview-controllers)
- [NestJSについて雑多に情報をまとめていく](https://zenn.dev/catnose99/scraps/2920e3b0ea6c82)
- [NestJSデヨクミル@Decoratorって何なのかわからなかったからサクッと試してみた](https://www.rasukarusan.com/entry/2021/03/27/223248)
- [NestJSを触りながら学ぶ(TodoAPI作成)](https://zenn.dev/kobayashiyabako/articles/nestjs-first#dto%E4%BD%9C%E6%88%90)