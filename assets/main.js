// 汉堡菜单交互
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    menuIcon.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });
});

// 解析 URL 参数
const getPageFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('page') || 'home'; // 如果没有参数，默认加载 "home"
};

// 根据 URL 参数加载对应的 Markdown 文件
const loadContent = () => {
    const page = getPageFromURL();
    fetch(`./${page}.md`)       //匹配.md文件
        .then(response => {
            if (!response.ok) {
                throw new Error('File does not exist');
            }
            return response.text();
        })
        .then(markdown => {
            // 解析 Markdown 并插入到页面
            document.getElementById('content').innerHTML = marked.parse(markdown);
            // 提取 Markdown 标题（第一行的 # 标题）
            const firstLine = markdown.split('\n').find(line => line.startsWith('# '));
            if (firstLine) {
                const title = firstLine.replace('# ', '').trim();
                document.title = title + ' - LI AO personal website';
            } else {
                document.title = 'LI AO personal website';
            }
        })
        .catch(error => {
            console.error('Failed to load:', error);
            document.getElementById('content').innerHTML = '<p style="color: red;">Failed to load, please check the console</p>';
            document.title = 'Error - LI AO personal website';
        });
};

// 页面加载时初始化内容
loadContent();
