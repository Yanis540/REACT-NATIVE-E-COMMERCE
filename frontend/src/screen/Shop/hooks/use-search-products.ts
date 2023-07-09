import { useProducts } from "../../../hooks/use-products";
import { Category } from "@/types";
import { SeacrhProductFormType } from "../types";

const useSearchProducts = ()=>{
    const {data,isLoading,getProducts,error} = useProducts()

    
    
    const onSubmit = async(data:SeacrhProductFormType)=>{
        const {name,categorie} = data
        getProducts({name,categories:categorie?[categorie]:[]});
    }  


    const watched_categories =undefined //watch('categories')
    return {
        watched_categories, 
        onSubmit,
        isLoading,
        data,error,
    }
}

export default useSearchProducts