import { useNavigate, useActionData, useLoaderData } from "react-router-dom";
import { getClient } from "../data/Clientes";
export async function loader({ params }) {
    const { clientId } = params;
    const client = await getClient(clientId);
    if (Object.values(client).length === 0) {
        throw new Response("", {
            status: 404,
            statusText: "El cliente no fue encontrado :(",
        });
    }
    // console.log(params);
    const { id, name, phone, email, company } = client;
    return client;
}

export async function action() {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const email = formData.get("email");

    // Validacion
    const errors = [];
    if (Object.values(data).includes("")) {
        errors.push("Todos los campos son obligatorios");
    }

    let regex = new RegExp(
        "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );

    if (!regex.test(email)) {
        errors.push("El email no es válido");
    }

    // Retornar datos si hay errores
    if (Object.keys(errors).length) {
        return errors;
    }

    // Actualiza el cliente
    await updateClient(params.id, data);
    return redirect("/");
}

function EditClient() {
    const navigate = useNavigate();
    const { id, name, phone, email, company } = useLoaderData();
    const errors = useActionData();
    return (
        <>
            <tr className="border-b">
                <td className="p-6 space-y-2">
                    <p className="text-2xl text-gray-800">{name}</p>
                    <p>{company}</p>
                </td>

                <td className="p-6">
                    <p className="text-gray-600">
                        <span className="text-gray-800 uppercase font-bold">
                            Email: {""}
                        </span>
                        {email}
                    </p>
                    <p className="text-gray-600">
                        <span className="text-gray-800 uppercase font-bold">
                            Teléfono: {""}
                        </span>
                        {phone}
                    </p>
                </td>
                <td className="p-6 flex gap-3 justify-center">
                    <button
                        type="button"
                        className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
                        onClick={() => navigate(`/clients/${id}/editClient`)}
                    >
                        Editar
                    </button>
                    <button
                        type="button"
                        className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
                    >
                        Eliminar
                    </button>
                </td>
            </tr>
        </>
    );
}

export default EditClient;
