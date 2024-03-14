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
  React.useEffect(() => {
    if (!waline) {
      waline = init({
        ...props,
        el: containerRef.current,
        serverURL: siteConfig('COMMENT_WALINE_SERVER_URL'),
        lang: siteConfig('LANG'),
        dark: 'html.dark',
        emoji: [
          'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/tw-emoji',
          'https://cdn.jsdelivr.net/gh/norevi/waline-blobcatemojis@1.0/blobs',
          'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/bilibili'
        ],
        reaction: [
          'https://cdn-icons-png.flaticon.com/128/8208/8208784.png',
          'https://cdn-icons-png.flaticon.com/128/8208/8208813.png',
          'https://cdn-icons-png.flaticon.com/128/8208/8208756.png',
          'https://cdn-icons-png.flaticon.com/128/8208/8208902.png',
          'https://cdn-icons-png.flaticon.com/128/8208/8208766.png'
        ],
        locale: {
          nick: '昵称 Name',
          mail: '邮箱 Email',
          mailError: '请填写正确的邮件地址',
          link: '您的网址 Link',
          optional: '可选',
          login: '登录 Login',
          submit: '发送 Send',
          meta: ['nick', 'mail', 'link'], //  评论者相关属性，默认['nick', 'mail', 'link']
          requiredMeta: ['nick', 'mail'], //  设置评论者属性必填项，默认[]（即匿名）
          placeholder: '何事沉吟？发一条友善的评论见证当下。（您的电子邮箱地址不会被公开。）\nBe nice and play well with others. (Your email address will remain private and will not be displayed publicly.)',
          sofa: '你好探险家，这里是人迹罕至的评论区大陆。\nBe the first to comment!',
          reactionTitle: '一键心情\nOne-Click Mood',
          reaction0: '喜歡\nLike',
          reaction1: '击掌\nHigh Five',
          reaction2: '鼓掌\nCheers',
          reaction3: '不贊成\nDisagree',
          reaction4: '祝好運\nGood luck'
        }
      })
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
