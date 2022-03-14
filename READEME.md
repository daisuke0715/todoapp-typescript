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