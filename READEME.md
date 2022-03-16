# TypeScript課題3

## 開発環境の立ち上げ

1. 設定ファイル（.env）を生成する
```
cp api/.env.example api/.env
```

2. dockerイメージを生成する
```
docker-compose build 
``` 

3. dockerコンテナを起動する
```
docker-compose up -d
```

## マイグレーション
※開発環境が立ち上がっている必要があります。
```
docker-compose run api yarn migration:run
```

### 環境構築
- Docker buildコマンドmysqlの処理でエラーを吐いた
  - エラーメッセージ：`load metadata for docker.io/library/mysql:5.7:`
  <br>
  - 調査結果
    - m1チップのCPUアーキテクチャであるarm64に未だ対応していないimageがいくつかあるらしい
    > ARM64 アーキテクチャー向けのイメージがすべて利用可能となっているわけではありません。Intel イメージの実行には、エミュレーションのもとで--platform linux/amd64をつけて実行することが必要です。 特に mysql イメージは ARM64 向けには利用できません。 これに対する当面の対処としては mariadb イメージを利用してください。（Docker公式より引用：https://matsuand.github.io/docs.docker.jp.onthefly/desktop/mac/apple-silicon/#known-issues）
  - 対応策
    - platformをlinux/x64に指定してbuildする必要があるみたいなので、指定


- Dockerコンテナ立ち上げ時にvolumeのpathの箇所でエラー吐いた
  - エラーメッセージ：`mount path must be absolute`
    - 相対パスで指定していたnode_modulesのpathを絶対パスに編集