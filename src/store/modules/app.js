import { login as loginApi } from "@/api/login";
import router from "@/router";
import { setTokenTime } from '@/utils/auth'

export default {
    namespaced: true,
    state:() => ({
        token: localStorage.getItem('token') || '',
        siderType: true,
        lang: localStorage.getItem('lang') || 'zh'
    }),
    mutations: {
        // 设置Token
        setToken(state, token) {
            state.token = token
            localStorage.setItem('token', token)
        },
        // headers - 汉堡伸缩
        changeSiderType(state) {
            state.siderType = !state.siderType
        },
        // 中英切换
        changeLang(state, lang) {
            state.lang = lang
        }
    },
    actions: {
        // 登录
        login({commit}, userInfo){
            return new Promise((resolve, reject) => {
                loginApi(userInfo).then(res => {
                    commit('setToken', res.token)
                    setTokenTime()
                    router.replace('/')
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 退出
        logout({commit}) {
            commit('setToken', '')
            localStorage.clear()
            router.replace('/login')
        }
    }
}