
// 1、封装 请求基本路径
const baseUrl = 'http://localhost:8000/api/v1'

// 请求方法
const method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE:'DELETE'
}

// 数据格式
const contentType = {
    JSON: "application/json;charset=UTF-8",
    FORM:"application/x-www-form-urlencoded;charset=UTF-8"
}

// 2、封装 请求头
const getHeaders = () => {
    const token = ''

    const headers = {
        // 告诉服务器，客户端正在发送的数据是什么格式
        'Content-type': contentType.JSON,
        // 向服务器提供认证信息
        'Authorization':`Token${token}`
    }

    return headers
}

// 3、封装了四种请求
// get
const getRequest = async (url) => {
    let response = await fetch(baseUrl + url, {
        method: method.GET,
        headers:getHeaders()
    })

    return response.json()
}

// post
const postRequest = async (url, body) => {
    let response = await fetch(baseUrl + url, {
        method: method.POST,
        headers: getHeaders(),
        body:JSON.stringify(body)
    })

    return response.json()
}

// put
const putRequest = async (url, body) => {
    let response = await fetch(baseUrl + url, {
        method: method.PUT,
        headers: getHeaders(),
        body:JSON.stringify(body)
    })

    return response.json()
}

// delete
const deleteRequest = async (url) => {
    let response = await fetch(baseUrl + url, {
        method: method.DELETE,
        headers:getHeaders()
    })
}

// 暴漏出去 方便使用
export default {
    get: getRequest,
    post: postRequest,
    put: putRequest,
    delete:deleteRequest
}