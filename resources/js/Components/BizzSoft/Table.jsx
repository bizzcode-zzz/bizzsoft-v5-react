export default function Table({
    headers,
    children,
    className = '',
}) {
    return (
        <div className={`overflow-x-auto ${className}`}>

            <table className="min-w-full overflow-hidden rounded-xl">

                <thead className="bg-blue-50">

                    <tr>

                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-[#102a56]"
                            >
                                {header}
                            </th>
                        ))}

                    </tr>

                </thead>


                <tbody className="bg-white">

                    {children}

                </tbody>

            </table>

        </div>
    );
}