const CONFIG = {
  FUKASAWA_MAILCHIMP_FORM: false, // 邮件订阅表单

  FUKASAWA_POST_LIST_COVER: true, // 文章列表显示图片封面
  FUKASAWA_POST_LIST_COVER_FORCE: false, // 即使没有封面也将站点背景图设置为封面
  FUKASAWA_POST_LIST_PREVIEW: false, // 显示文章预览
  FUKASAWA_POST_LIST_ANIMATION: false, // 博客列表淡入动画

  // 菜单
  FUKASAWA_MENU_CATEGORY: true, // 显示分类
  FUKASAWA_MENU_TAG: true, // 显示标签
  FUKASAWA_MENU_ARCHIVE: true, // 显示归档
  FUKASAWA_MENU_SEARCH: true, // 显示搜索

  FUKASAWA_SIDEBAR_COLLAPSE_BUTTON: true, // 侧边栏折叠按钮
  FUKASAWA_SIDEBAR_COLLAPSE_SATUS_DEFAULT: false, // 侧边栏默认折叠收起
  FUKASAWA_SIDEBAR_COLLAPSE_ON_SCROLL: false, // 侧边栏滚动时折叠 仅文章阅读页有效

  waline: {
    visitor: true, //# 文章访问量统计
    reaction: false, // 是否开启反应，默认true
    lang: "zh-CN",
    login: "enable", //# 登录模式状态，默认值enable，force可以强制登录
    wordLimit: 800, //# 评论字数限制，0为不限制，默认值为0
    pageSize: 10, //# 评论列表分页，数字为条数，默认值10
    highlight: true, //# 代码高亮，默认true
    meta: ["nick", "mail", "link"], //# 评论者相关属性，默认['nick', 'mail', 'link']
    requiredMeta: ["nick", "mail"], //设置评论者属性必填项，默认[]（即匿名）
    placeholder: "何事沉吟？", //评论框占位提示符，默认'欢迎评论'
    copyright: false, //是否显示页脚版权信息
    emoji: [
      "https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/tw-emoji",
      "https://cdn.jsdelivr.net/gh/norevi/waline-blobcatemojis@1.0/blobs",
      "https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/bilibili"
    ] //自定义表情包
  }
};

export default CONFIG


