import axios from 'axios'
import { API_URL } from '@/config.js'

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: '*/*'
}

export default function () {
  const getProducts = async () => {
    const res = await axios.get(`${API_URL}/api/products`, {
      headers
    })
    return res
  }

  const postProduct = async (body) => {
    const res = await axios.post(`${API_URL}/api/products`, body, {
      headers
    })
    return res
  }

  const getCategories = async () => {
    const res = await axios.get(`${API_URL}/api/categories`, {
      headers
    })
    return res
  }

  const getBrands = async () => {
    const res = await axios.get(`${API_URL}/api/brands`, {
      headers
    })
    return res
  }

  return {
    postProduct,
    getBrands,
    getCategories,
    getProducts
  }
}
