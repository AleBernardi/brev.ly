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
        }).catch(() => {
            toast.error('Erro ao consultar os links.', {
                description: "Ocorreu um erro inesperado. Por favor, tente novamente em instantes."
            });

        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className="h-full w-full flex flex-col items-center md:py-8 py-4 px-3">
            <div>
                <div className="md:py-6 py-4 md:justify-items-start justify-items-center">
                    <img src={logo} className="h-6" alt="Logo" />
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-center items-start">
                    <NewLinkWidget onSuccess={searchLinks} />

                    <ListLinksWidget loading={loading} links={links} onClick={searchLinks} />
                </div>
            </div>
        </div >
    )
}