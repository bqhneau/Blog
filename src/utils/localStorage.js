// 持久化存储

// 1、存储
export const saveData = (key, value) => {
    localStorage.setItem(key,JSON.stringify(value))
}

// 2、获取
export const getData = (key) => {
    return JSON.parse(key)  // 返回获取到的value
}

// 3、删除
export const deleteData = (key) => {
    return localStorage.removeItem(key)  // 返回是否删除成功
}