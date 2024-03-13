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
  const containerRef = createRef() //原本无React.，据【https://github.com/lifeafter619/NotionNext/blob/6062ddd6b6b3fc7e3901e7edec65e4ff116208e1/components/WalineComponent.js#L30】改
  const router = useRouter()

  const updateWaline = url => {
    if (url !== path && waline) {
      waline.update(props)
    }
  }
  const locale = {
    placeholder: "何事沉吟？", //评论框占位提示符，默认'欢迎评论'
    sofa: "你好探险家，这里是人迹罕至的评论区大陆。",
    nickError: '昵称不能少于3个字符',
    reaction0: "喜歡",
    reaction1: "歡呼",
    reaction2: "疑惑",
    reaction3: "震驚",
    reaction4: "傷心",
  }

  React.useEffect(() => {
    if (!waline) {
      waline = init({
        ...props,
        el: containerRef.current,
        serverURL: siteConfig('COMMENT_WALINE_SERVER_URL'),
        lang: siteConfig('LANG'),
        locale: {
          placeholder: "何事沉吟？", //评论框占位提示符，默认'欢迎评论'
          sofa: "你好探险家，这里是人迹罕至的评论区大陆。",
          reaction0: "喜歡",
          reaction1: "歡呼",
          reaction2: "疑惑",
          reaction3: "震驚",
          reaction4: "傷心",
        },
        reaction: [
          'https://chojugiga.com/c/choju93_0020/choju93_0020.png', // 评论区反应功能，默认为reaction: true,
          'https://chojugiga.com/c/choju71_0014/choju71_0014.png',
          'https://chojugiga.com/c/choju74_0006/choju74_0006.png',
          'https://chojugiga.com/c/choju89_0030/choju89_0030.png',
          'https://chojugiga.com/c/choju28_0015/choju28_0015.png',
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
