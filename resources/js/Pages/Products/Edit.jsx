import ProductForm from './Components/ProductForm';

export default function Edit({ product, categories }) {

    return (
        <div>

            <h1>✏️ Edit Product</h1>

            <p>Edit your product information.</p>

            <ProductForm
                categories={categories}
                product={product}
            />

        </div>
    );
}