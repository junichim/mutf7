# mutf7
修正UTF-7（IMAP のフォルダ名で使われる方式）のエンコード・デコードを行うツール

## インストール

```
$ git clone https://github.com/junichim/mutf7.git
$ cd mutf7
$ npm install
$ npm link
```

## 使い方

エンコード
```
$ mutf7 日本語
&ZeVnLIqe-
$
```

デコード
```
$ mutf7 -d "&ZeVnLIqe-"
日本語
$ 
```

## アンインストール

```
$ npm unlink -g mutf7
```

## 詳細

ブログ記事

を参照

## ライセンス

Apache License 2.0 です
