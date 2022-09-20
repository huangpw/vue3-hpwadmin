import { TOKEN_TIME, TOKEN_TIME_VALUE } from './constant'

// 登录时设置时间
export const setTokenTime = () => {
    localStorage.setItem(TOKEN_TIME, Date.now())
}

// 获取时间
export const getTokenTime = () => {
    return localStorage.getItem(TOKEN_TIME)
}

// Token是否已经过期
export const diffTokenTime = () => {
    const currentTime = Date.now() //当前时间
    const tokenTime = getTokenTime() //设置时间
    return currentTime - tokenTime > TOKEN_TIME_VALUE
}