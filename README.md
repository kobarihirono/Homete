# 20240408_4th_appdev

## Homete!

Todo リストのタスクを完了すると、自分好みの AI が褒めてくれるタスク管理アプリです。

ログインの際には以下のユーザー情報をご利用ください。 
メールアドレス：test1234@test.com 
パスワード：test1234

## 機能一覧

- **認証機能**

  - 新規会員登録
  - ログイン
  - ログアウト
  - パスワードの変更

- **リスト管理**

  - リストの表示
  - 新規登録
  - 更新
  - 削除

- **タスク管理**

  - タスクの表示
  - 新規登録
  - 更新
  - 削除
  - 完了
  - 完了時はAIからのコメント表示

- **マイページ**

  - ユーザー情報の確認
  - AI の性格設定
  - AI のキャラクター設定
  - AI のアイコン設定

## 使用技術

このプロジェクトでは以下の技術を使用しています

- **使用言語**

  - HTML
  - Typescript

- **ライブラリ**

  - Tailwind CSS
  - React Hook Form
  - Zod

- **フレームワーク**

  - React
  - Next.js

- **DB**

  - Json server

- **認証**

  - Firebase Authentication

- **ツール**

  - Storybook
  - figma

- **テスト**

  - Jest
  - React Testing Library

- **エディタ**

  - VisualStudio Code

## ファイル構成

本プロジェクトでは以下のファイル構成を採用しています。

```plaintext
src/
|
|-- app/ # サイト全体のページ構造
|   |
|   |-- auth/ # 認証関連ページ
|   |    |-- login/
|   |        |-- page.tsx
|   |
|   |-- components/ # グローバルに使用するコンポーネント
|       |-- elements/
|       |   |-- button/
|       |       |-- Button.module.css
|       |       |-- Button.stories.tsx
|       |       |-- Button.test.tsx
|       |       |-- Button.tsx
|       |
|       |-- layouts/
|           |-- header/
|               |-- Header.module.css
|               |-- Header.stories.tsx
|               |-- Header.test.tsx
|               |-- Header.tsx
|
|-- features/ # ページごとに特有な要素
|   |-- Todo
|       |-- hooks/ #カスタムフック
|       |-- types/ # 型指定
|       |-- components/ # コンポーネント
|           |-- index.ts # 全てのコンポーネントをimportし、名前付きexportする
|           |-- TodoItem/
|           |-- TodoList/
|               |-- TodoList.module.css
|               |-- TodoList.stories.tsx
|               |-- TodoList.test.tsx
|               |-- TodoList.tsx
|
|-- context/ # グローバルに使用する値
|   |-- AuthContext.tsx # 認証関連
|
|-- api/ # 外部APIとの接続処理
|   |-- getTalk
|       |-- route.ts
|
|-- hooks/ # グローバルなカスタムフック
|
|-- types/ # グローバルに使用する型指定
|
|-- lib/ # apiデータの処理
|
|-- utils/ # ユーティリティ関数
|
|-- public/ # ローカルで使用する画像
|   |-- images
|   |-- icons
|
`-- ...
```
