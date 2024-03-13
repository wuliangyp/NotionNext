import React, { createRef } from 'react'
import { init } from '@waline/client'
import { useRouter } from 'next/router'
import '@waline/client/dist/waline.css'
import { siteConfig } from '@/lib/config'

const path = ''
let waline = null
/**
 * @see https://waline.js.org/guide/get-started.html
 * @param {*} props
 * @returns
 */
const WalineComponent = (props) => {
  const containerRef = createRef() 
  const router = useRouter()

  const updateWaline = url => {
    if (url !== path && waline) {
      waline.update(props)
    }
  }
  const locale = {
    nick: '昵称',
    nickError: '昵称不能少于3个字符哦...',
    mail: '邮箱',
    mailError: '请填写正确的邮件地址',
    link: '您的网址',
    optional: '可选',
    placeholder: "何事沉吟？", //评论框占位提示符，默认'欢迎评论'
    sofa: "你好探险家，这里是人迹罕至的评论区大陆。",
    reactionTitle: '击掌！',
    reaction0: "give me five",
    reaction1: "鼓个掌",
    reaction2: "不赞成",
    reaction3: "祝好运",
  }

  React.useEffect(() => {
    if (!waline) {
      waline = init({
        ...props,
        el: containerRef.current,
        serverURL: siteConfig('COMMENT_WALINE_SERVER_URL'),
        lang: siteConfig('LANG'),
        locale,
        reaction: true,
        reaction: [ // 评论区反应功能，默认为reaction: true,
          'https://cdn-icons-png.flaticon.com/128/8208/8208813.png', // give me five
          'https://cdn-icons-png.flaticon.com/128/8208/8208756.png', // 鼓个掌
          'https://cdn-icons-png.flaticon.com/128/8208/8208902.png', // 不赞成
          'https://cdn-icons-png.flaticon.com/128/8208/8208766.png', // 祝好运
        ],
        dark: 'html.dark',
        login: "enable", //# 登录模式状态，默认值enable，force可以强制登录
        wordLimit: 800, //# 评论字数限制，0为不限制，默认值为0
        pageSize: 10, //# 评论列表分页，数字为条数，默认值10
        highlight: true, //# 代码高亮，默认true
        meta: ["nick", "mail", "link"], //# 评论者相关属性，默认['nick', 'mail', 'link']
        requiredMeta: ["nick", "mail"], //设置评论者属性必填项，默认[]（即匿名）
        copyright: false, //是否显示页脚版权信息
        emoji: [
          "https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/tw-emoji",
          "https://cdn.jsdelivr.net/gh/norevi/waline-blobcatemojis@1.0/blobs",
          "https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/bilibili",
          '//file.66619.eu.org/beluga-emoji',
        ], //自定义表情包
      });
    }

    // 跳转评论
    router.events.on('routeChangeComplete', updateWaline)
    const anchor = window.location.hash
    if (anchor) {
      // 选择需要观察变动的节点
      const targetNode = document.getElementsByClassName('wl-cards')[0]

      // 当观察到变动时执行的回调函数
      const mutationCallback = (mutations) => {
        for (const mutation of mutations) {
          const type = mutation.type
          if (type === 'childList') {
            const anchorElement = document.getElementById(anchor.substring(1))
            if (anchorElement && anchorElement.className === 'wl-item') {
              anchorElement.scrollIntoView({ block: 'end', behavior: 'smooth' })
              setTimeout(() => {
                anchorElement.classList.add('animate__animated')
                anchorElement.classList.add('animate__bounceInRight')
                observer.disconnect()
              }, 300)
            }
          }
        }
      }

      // 观察子节点 变化
      const observer = new MutationObserver(mutationCallback)
      observer.observe(targetNode, { childList: true })
    }

    return () => {
      if (waline) {
        waline.destroy()
        waline = null
      }
      router.events.off('routeChangeComplete', updateWaline)
    }
  }, [])

  return <div ref={containerRef} />
}

export default WalineComponent
