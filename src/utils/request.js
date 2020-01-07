import axios from 'axios' // 引入axios
import jsonBig from 'json-bigint' // 引入json-bigint处理js无法处理大数字

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

request.defaults.transformRequest = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    return {}
  }
}]

export default request
