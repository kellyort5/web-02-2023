import { useForm } from 'react-hook-form'
import { useProducts } from '../context/ProductContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';

function ProductFormPage() {
    const { register, handleSubmit, setValue, } = useForm();
    const { createProduct, getProduct, updateProduct } = useProducts();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadProduct(){
            if(params.id){
                const product = await getProduct(params.id);
                console.log(product)
                setValue('title', product.title);
                setValue('price', product.price);
                setValue('description', product.description);

            }
        }
        loadProduct()
    }, [])

    const onSubmit = handleSubmit((data) => {
        if (params.id){
            updateProduct(params.id, data);
        } else{
            createProduct(data);
        }
        navigate ('/products')
    })

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">

            <div className="rounded-md text-center"> PRODUCT

                <form onSubmit={onSubmit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder="Title"
                        {...register("title")}
                        className="w-full bg-transparent border-2 border-blue-950 text-black px-4 py-2 rounded-md my-2"
                        autoFocus
                    />
                    <label htmlFor="price">Price</label>
                    <input type="text" placeholder="Price"
                        {...register("price")}
                        className="w-full bg-transparent border-2 border-blue-950 text-black px-4 py-2 rounded-md my-2 "
                    />
                    <label htmlFor="description">Description</label>
                    <textarea rows="3" placeholder="Description"
                        {...register("description")}
                        className="w-full bg-transparent border-2 border-blue-950 text-black px-4 py-2 rounded-md my-2"
                    ></textarea>
                    <button className="bg-indigo-500 px-3 py-2 rounded-md">
                        Save
                    </button>
                </form>

            </div>

        </div>
    );
}

export default ProductFormPage;