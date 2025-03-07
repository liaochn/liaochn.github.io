// 汉堡菜单交互
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    // 监听 menu-icon 的点击事件
    menuIcon.addEventListener('click', function (event) {
        event.stopPropagation(); // 阻止事件冒泡
        navLinks.classList.toggle('active'); // 切换导航栏的显示/隐藏
    });

    // 点击文档其他区域时隐藏导航栏
    document.addEventListener('click', function (event) {
        if (!navLinks.contains(event.target) && !menuIcon.contains(event.target)) {
            navLinks.classList.remove('active'); // 隐藏导航栏
        }
    });
});

// 个人信息菜单交互
// 获取 bio-icon 和侧边栏元素
const bioIcon = document.getElementById('bio-icon');
const sidebar = document.getElementById('sidebar');

// 监听 bio-icon 的点击事件
bioIcon.addEventListener('click', () => {
    event.stopPropagation(); // 阻止事件冒泡
    sidebar.classList.toggle('active'); // 切换侧边栏的显示/隐藏
});

// 点击侧边栏外部时隐藏侧边栏
document.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && !bioIcon.contains(event.target)) {
        sidebar.classList.remove('active'); // 隐藏侧边栏
    }
});


//动态渲染网页
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
                document.title = "Li Ao 's personal website";
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