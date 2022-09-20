import request from './request'

// 获取用户列表
export const getUser = (params) => {
    return request({
        url: '/users',
        params
    })
}

// 修改状态
export const changeUserState = (uId, type) => {
    return request({
        url: `/users/${uId}/state/${type}`,
        method: 'put'
    })
}

// 添加用户
export const addUser = (data) => {
    return request({
        url: '/users',
        method: 'post',
        data
    })
}

// 修改用户
export const editUser = (data) => {
    return request({
        url: `users/${data.id}`,
        method: 'put',
        data
    })
}

// 删除用户
export const deleteUser = (id) => {
    return request({
        url: `users/${id}`,
        method: 'delete'
    })
}