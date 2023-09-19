import { useLoaderData } from "react-router-dom";
import { getClients } from "../data/Clientes";
import Client from "../components/Client";

export function loader() {
    // console.log(import.meta.env);
    const clients = getClients();

    return clients; // Siempre tiene que tener un return
}

function Index() {
    const clients = useLoaderData();

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
            <p className="mt-3">Administra tus Clientes</p>

            {clients.length ? (
                <table className="w-full bg-white shadow mt-5 table-auto">
                    <thead className="bg-blue-800 text-white">
                        <tr>
                            <th className="p-2">Cliente</th>
                            <th className="p-2">Contacto</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <Client key={client.id} client={client} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center mt-10">Aun no hay Clientes</p>
            )}
        </>
    );
}

export default Index;
