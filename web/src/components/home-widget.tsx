import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ListLinksWidget } from "./list-links-widget";
import { NewLinkWidget } from "./new-link-widget";
import logo from "/Logo.svg";

const apiUrl = import.meta.env.VITE_API_URL;

export function HomeWidget() {

    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            searchLinks();
        }
    }, []);

    async function searchLinks() {
        if (loading) return;
        setLoading(true);
        await axios.get(apiUrl + "/links", {
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => {
            if (response?.data?.links) {
                setLinks(response.data.links);
            }
        }).catch((error) => {
            toast.error('Erro ao consultar os links.', {
                description: "Ocorreu um erro inesperado. Por favor, tente novamente em instantes."
            });

        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className="min-h-screen flex flex-col md:items-start items-center md:mt-24 p-2">
            <div className="py-6">
                <img src={logo} className="h-6" alt="Logo" />
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch">
                <NewLinkWidget onSuccess={searchLinks} />

                <ListLinksWidget links={links} onClick={searchLinks} />
            </div>

        </div>
    )
}