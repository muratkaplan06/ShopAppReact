import axios from 'axios'

const apiUrl = 'https://localhost:7123'
const jwtKeyAccess = 'accessToken'
const jwtKeyRefresh = 'refreshToken'

axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url)
    const allowedOrigins = [apiUrl]
    const accessToken = localStorage.getItem(jwtKeyAccess)
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${accessToken}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

export const fetchProductList = async (name, page) => {
  const { data } = await axios.get(
    `https://localhost:7123/api/Product/GetProductList?Name=${name}&page=${page}`,
  )
  return data
}
export const fetchProductsByCategory = async (categoryId, page) => {
  const { data } = await axios.get(
    `https://localhost:7123/api/Category/GetAll?CategoryId=${categoryId}&Page=${page}`,
  )
  return data
}

export const fetchProductById = async (id) => {
  const { data } = await axios.get(
    `https://localhost:7123/api/Product/GetProductById/${id}`,
  )
  return data
}

export const fetchRegister = async (input) => {
  const { data } = await axios.post(
    'https://localhost:7123/api/Authentication/Register',
    input,
  )

  return data
}
export const fetchLogin = async (input) => {
  const { data } = await axios.post(
    'https://localhost:7123/api/Authentication/Login',
    input,
  )

  return data
}

export const fetchMe = async () => {
  const { data } = await axios.get(
    'https://localhost:7123/api/Authentication/Me',
  )

  return data
}

export const fetchOut = async () => {
  const { data } = await axios.post(
    'https://localhost:7123/api/Authentication/Logout',
    {
      refreshToken: localStorage.getItem(jwtKeyRefresh),
    },
  )

  return data
}

export const fetchAddBasket = async (input) => {
  const { data } = await axios.post(
    'https://localhost:7123/api/ShopAppUser/AddBasketProduct',
    {
      ProductId: input,
    },
  )
  return data
}
export const fetchIsAdded = async (productId) => {
  const { data } = await axios.get(
    `https://localhost:7123/api/ShopAppUser/IsAddedBasketProduct?id=${productId}`,
  )
  return data
}
export const fetchDeleteinBasket = async (productId) => {
  const { data } = await axios.delete(
    `https://localhost:7123/api/ShopAppUser/DelBasketProductById?id=${productId}`,
  )
  return data
}
export const fetchBasketProductList = async (page = 1) => {
  const { data } = await axios.get(
    `https://localhost:7123/api/ShopAppUser/GetBasketProductList?Page=${page}`,
  )
  return data
}
