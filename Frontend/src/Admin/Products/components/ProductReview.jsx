import React from "react";

import ProductFullSpecs from "../../../Pages/Apparel/ProductFullSpecs";
import ProductDetails from "../../../Pages/Apparel/ProductDetails";
import ApparelProductOptions from "../../../Pages/Apparel/ApparelProductOptions";
import ProductGallery from "../../../Pages/CorporateGifts/Productgallery";



export default function ProductPreview({ product, details, specs, carousels }) {
    if (!product) return null;
    const previewProduct = {
        name: product.name,
        data: {
            ...product,
        },
        details,
        specifications: specs,
        carousels
    };
    console.log("preview product -----> ", specs);

    return (
        <div className="bg-white text-neutral-900 rounded-lg overflow-hidden">
            <div className="p-6 border-b font-semibold">
                Customer Preview
            </div>

            <div className="p-6">
                <div className="grid grid-cols-2 gap-8">
                    <ProductGallery images={carousels} />
                    <ApparelProductOptions />
                </div>

                <div className="mt-8">
                    <ProductDetails details={details} />
                </div>

                <div className="mt-8">
                    <ProductFullSpecs specs={specs} />
                </div>
            </div>
        </div>
    );
}
