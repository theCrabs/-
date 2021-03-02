import request from '../service/network'

// const baseURL = 'http://123.207.32.32:8000';
const baseURL = 'http://152.136.185.210:8000/api/w6';
export function getMultiData(){
 return request({
    url: baseURL+'/home/multidata'
  })
}

export function getGoodsData(type,page) {
  return request({
    url:baseURL+'/home/data',
    data:{
      type,
      page
    }
  })
}