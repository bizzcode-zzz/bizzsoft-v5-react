import SupplierForm from './Components/SupplierForm';

export default function Edit({ supplier }) {

    return (

        <div>

            <h1>✏️ Edit Supplier</h1>

            <p>Edit your supplier or vendor information.</p>

            <SupplierForm supplier={supplier} />

        </div>

    );
}