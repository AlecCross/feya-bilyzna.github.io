import {gql, useQuery} from "@apollo/client";
import {GridView} from "../index";
import React from "react";
import { LoadingAnimation } from '..'
import { alertsData } from "../../data"


const ProductSubcategoryPage = ({subcategory}) => {
    const ProductsQuery = gql`
        query ProductsQuery($categoryName: String!) {
             categoryProducts(categoryName: $categoryName) {
                description
                id
                name
                images {
                  url           
                }
            }
        }
    `
    const {loading, error, data} = useQuery(ProductsQuery, {
        variables: {categoryName: subcategory.name},
    })

    if (loading) return <LoadingAnimation style={{height: "50vh"}} />
    if (error) return <h5 style={{ textAlign: "center" }}>{alertsData.serverRequestFailed}</h5>
    
    return (
        <div>
            <h3 style={{"textAlign": "center"}}>{subcategory.name}</h3>
            <GridView apiPatterns cardItems={data.categoryProducts} route = {subcategory.route}/>
        </div>
    )
}

export default ProductSubcategoryPage
