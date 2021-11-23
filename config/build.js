/**
 * @author Harry Kim
 * @name mysql_improve_build_script
 */

const fs = require('fs');
const path = require('path');

function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;

            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

function copyFileRecursive(src, dest) {
    if (fs.lstatSync(src).isDirectory()) {
        fs.readdirSync(src).forEach((file, index, arr) => {
            var curPath = src + file + "/";
            if (fs.lstatSync(src + file).isDirectory()) {
                if (!fs.existsSync(dest + file)) {
                    fs.mkdirSync(dest + file);
                }
                copyFileRecursive(curPath, dest + file + "/");
            } else {
                fs.copyFileSync(curPath, dest + file);
            }
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

function build() {
    var root = path.resolve();
    var target = root + "/dist";

    // 배포 폴더 존재 유무 확인
    if (fs.existsSync(root + "/dist")) {
        deleteFolderRecursive(root + "/dist");
        fs.mkdirSync(root + "/dist");
    } else {
        fs.mkdirSync(root + "/dist");
    }

    // env 폴더 생성
    fs.mkdirSync(root + "/dist/env");
    copyFileRecursive(root + "/env/", target + "/env/");

    // lib 폴더 생성
    fs.mkdirSync(root + "/dist/lib");
    copyFileRecursive(root + "/lib/", target + "/lib/");

    // node_modules 폴더 생성
    fs.mkdirSync(root + "/dist/node_modules");
    copyFileRecursive(root + "/node_modules/", target + "/node_modules/");

    // 루트 파일 복사
    copyFileRecursive(root + "/index.js", target + "/index.js");
    copyFileRecursive(root + "/package.json", target + "/package.json");
    copyFileRecursive(root + "/package-lock.json", target + "/package-lock.json");
    copyFileRecursive(root + "/readme.md", target + "/readme.md");
}

build();