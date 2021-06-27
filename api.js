import { API_ROUTE } from "../config/api";
import Category from "../models/category";
import Product from "../models/product"

const ApiClient = {
  get: (url, headers = {}) => {
    return ApiClient.makeRequest(`${API_ROUTE}/${url}`, "GET", {}, headers);
  },
  post:(url,data)=>{
    return ApiClient.makeRequest(`${API_ROUTE}/${url}`,"POST",data)
     },
     delete:(url,id,headers = {})=>{
       return ApiClient.makeRequest(`${API_ROUTE}/${url}`,"DELETE",id,headers)
     },
     put:(url,id,data)=>{
  return ApiClient.makeRequest(`${API_ROUTE}/${url}`,"PUT",id,data)
     },
  makeRequest: async (url, type, params = {}, headers = {}) => {
    try {
      type = type.toUpperCase();
      const request = {
        method: type,
        headers: headers,
      };
      if (type === "POST" || type === "PUT") {
        request.body = JSON.stringify(params);
      }

      const result = await fetch(url, request);
      return await result.json();
    } catch (error) {
      throw error.message;
    }
  },
};
const ProductCategories = {
  all: async () => {
    const { categories } = await ApiClient.get("Category");

    return categories.map((c) => new Category(c.categoryId, c.name));
  },
  postMethod:async (params) =>{
      return  await ApiClient.post("Category",params);
  },
  deleteCategory:async(id)=>{
    return await ApiClient.delete(`Category/${id}`);
  },
  updateCategory:async(id,params)=>{
    return await ApiClient.put(`Category/${id}`,params)
  }
};
const Products={
  getImage:async(id)=>{
    return await ApiClient.get(`product/${id}`);
   
  },
  getAll:async()=>{
    const { products } = await ApiClient.get("product");

    return products.map((p) => new Product(p.productId,p.name,p.price,p.basePrice,p.description,p.categoryId,p.image)); 
  },
  postProduct:async (params)=>{
    return await ApiClient.post("Product",params)
  },
  postImage:async (params,id)=>{
    return await  ApiClient.post(`product/image/${id}`,params);
  },
  deleteProduct:async (id)=>{
    return await ApiClient.delete(`product/${id}`);
  }
};

const ApiHelper = {
  ProductCategories,
  Products
};
export default ApiHelper;
