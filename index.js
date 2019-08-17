#!/usr/bin/env node
/**
 * 修正UTF-7 エンコード・デコード関数
 * 
 * https://qiita.com/tkooler_lufar/items/66b01f1a88c9e018f76e
 * https://smdn.jp/programming/netfx/tips/modified_utf7/
 */

'use strict';

const iconv = require('iconv-lite');
const program = require('commander');

// コマンドライン引数処理
program.version('0.0.1')
       .usage('文字列')
       .description("与えられた文字列について、修正UTF7によるエンコード／デコードを行います")
       .option("-d, --decode","修正UTF7文字列をデコードします");

program.parse(process.argv);
//console.log("optons: " + program.opts());

var args = program.args
if (!args || args.length == 0) {
    console.log("no target string");
    process.exit(1);
    return;
}
//console.log("args: " + program.args);

if (program.decode) {
	var decoded = decode(args[0]);
	console.log(decoded);
	return;
}
var encoded = encode(args[0])
console.log(encoded)
return;

/////////////////////////////////////
// 以下、関数

function encode(str) {
	var encoded = str
	    .replace(/&/g, "&-")
	    .replace(/[\u0000-\u0019\u007f-\uffff]+/g, modifiedBase64Encode);

	//console.log(encoded)
	return encoded;
}
function decode(str) {
	var decoded = str
	    .replace(/&([A-Za-z0-9\+\,]+)-/g, modifiedBase64Decode)
	    .replace(/&-/g, "&");

	//console.log(decoded)
	return decoded;
}

function modifiedBase64Encode(str) {
	const buf = iconv.encode(str, "utf16-be");
	//console.log(str);
	//console.log(buf);
	return "&"+ buf.toString("base64").replace(/\//g, ",").replace(/=/g, "") + "-";
}
function modifiedBase64Decode(str, substr) {
	const buf = Buffer.from(substr.replace(/,/g, "/"), "base64")
	//console.log(str);
	//console.log(substr);
	//console.log(buf);
	const decoded = iconv.decode(buf, "utf16-be");
	//console.log(decoded);
	return decoded;
}

