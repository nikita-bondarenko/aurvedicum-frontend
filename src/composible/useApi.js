import axios from 'axios'
import { API_URL } from '@/config.js'

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Accept: '*/*'
}

export default function () {
  const getProducts = async (body) => {
    const res = await axios.get(`${API_URL}/api/products`, { params: body }, {
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive'
      }
    }
    )

    return res
  }

  const getProduct = async (body) => {
    const res = await axios.get(`${API_URL}/api/products/${body.id}`,
      {
        Accept: '*/*'
      }
    )
    return res
  }

  const postProduct = async (body) => {
    const res = await axios.post(`${API_URL}/api/products`, body, headers)
    return res
  }

  const deleteProduct = async (id) => {
    const res = await axios.delete(`${API_URL}/api/products/${id}`, headers)
    return res
  }

  const patchProduct = async (body) => {
    const res = await axios.patch(
      `${API_URL}/api/products/${body.id}`,
      body,
      headers
    )
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

  const postImage = async (file) => {
    const res = await axios.post(`${API_URL}/images`,
      file,
      {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data'

      })
    return res
  }

  const deleteImage = async (filename) => {
    const res = await axios.delete(`${API_URL}/images`,
      {
        params: {
          filename
        }
      },
      {
        'Content-Type': 'application/json',
        Accept: '*/*'
      }
    )
    return res
  }

  return {
    getProduct,
    deleteImage,
    postImage,
    // searchProducts,
    patchProduct,
    deleteProduct,
    postProduct,
    getBrands,
    getCategories,
    getProducts
  }
}
