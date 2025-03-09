// 动态加载 head-content.html
fetch('./assets/head-content.html')
    .then(response => response.text())
    .then(data => {
        // 将内容插入到 <head> 中
        document.head.insertAdjacentHTML('before end', data);
    })
    .catch(error => console.error('Fail to load head-content.html', error));