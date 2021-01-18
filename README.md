# react-ts-project
react+ts+webpack搭建项目

## 配置 prettier
### 1.安装 yarn add --dev --exact prettier
### 2.生成配置文件 echo {}> .prettierrc.json
### 3.生成 .prettierignore 文件  eslint-config-prettier
### 4.配置git提交代码自动格式化文件，使用 npx mrm lint-staged 命令

## 配置 comminlint
### 1. yarn add @commitlint/{config-conventional,cli}
### 2.echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

### https://github.com/conventional-changelog/commitlint