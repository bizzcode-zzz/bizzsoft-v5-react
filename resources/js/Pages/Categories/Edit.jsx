import CategoryForm from './Components/CategoryForm';

export default function Edit({ category }) {

    return (
        <div>

            <h1>✏️ Edit Category</h1>

            <p>Edit your category information.</p>

            <CategoryForm
                category={category}
            />

        </div>
    );
}