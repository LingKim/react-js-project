import  React from 'react'
import  ReactDom from 'react-dom'
import App from "./App"

ReactDom.render(<App/>,document.getElementById('app'));

if (module.hot) {
	module.hot.dispose(function () {
		// 模块即将被替换时
		console.log('module will be replaced')
	});

	module.hot.accept(function () {
		// 模块或其依赖项之一刚刚更新时
		console.log('module update')
	})
}
