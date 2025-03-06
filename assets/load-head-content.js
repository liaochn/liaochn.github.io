// 动态加载 head-content.html
fetch('./assets/head-content.html')
    .then(response => response.text())
    .then(data => {
        // 将内容插入到 <head> 中
        document.head.insertAdjacentHTML('beforeend', data);
    })
    .catch(error => console.error('加载 head-content.html 失败:', error));