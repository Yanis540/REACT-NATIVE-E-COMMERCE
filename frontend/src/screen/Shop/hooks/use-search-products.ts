import { useProducts } from "../../../hooks/use-products";
import { Category } from "@/types";
import { SeacrhProductFormType } from "../types";

const useSearchProducts = ()=>{
    const {data,isLoading,getProducts,error,getAsyncProducts} = useProducts()

    
    
    const search = async(data:SeacrhProductFormType)=>{
        const {name,categorie} = data; 
        getProducts({name,categories:categorie?[categorie]:[]});
    }  
    const refresh = ()=>getProducts({})


    const watched_categories =undefined //watch('categories')
    return {
        watched_categories, 
        search,
        searchAsync : getAsyncProducts, 
        isLoading,
        data,error,
        refresh
    }
}

export default useSearchProducts