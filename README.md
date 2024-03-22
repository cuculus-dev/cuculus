<p align="center">
<img src="https://raw.githubusercontent.com/cuculus-dev/.github/main/profile/cuculus.png" alt="Meilisearch" width="200" height="200" />
</p>

<h1 align="center">Cuculus</h1>


当リポジトリはCuculusのWebアプリになります。

Cuculusに関する情報は[こちら](https://github.com/cuculus-dev)

## 🤝️ Contributing

当リポジトリはオープンソースであり、コミュニティによるコントリビュートを歓迎しています！  
詳しくは[CONTRIBUTING.md](./CONTRIBUTING.md)を参照してください。

## 環境構築

プロジェクトの実行には以下の環境が必要です：

- [Node.js](https://nodejs.org/en)
- npm

※後述のVoltaが入っている場合は自動で構築されるためインストール不要です

### ⚡ Voltaによる環境構築

Cuculusは[Volta](https://volta.sh/)の使用を推奨しています。  
Voltaを使用した場合、`pckages.json`に記載されたバージョンの`npm`と`Node.js`が自動的にインストールされます。

## 実行方法

プロジェクトを実行するには、以下のコマンドを実行してください：

```bash
npm install
npm run dev:proxy
```

[http://localhost:3000](http://localhost:3000) をブラウザからアクセスして動作を確認してください。

### localhost:3000以外で実行したい場合
`.env.local`を作成することで環境変数を上書きできます。  

例：`192.168.0.X:4000`で実行したい場合
```env
NEXT_PUBLIC_API_URL=http://192.168.0.X:8080
SITE_URL=http://192.168.0.X:4000
```


### 開発環境アカウントについて

[takecchi](https://twitter.com/CureDotTyphoon)宛に連絡頂ければ開発環境用の招待コードを発行致します！
