import { CircleNotch, DownloadSimple, Link } from "@phosphor-icons/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { LinkWidget } from "./link-widget";

const apiUrl = import.meta.env.VITE_API_URL;

type LinkData = {
    id: string;
    shortUrl: string;
    originalUrl: string;
    accessCount: number;
};

interface ListLinksWidgetProps {
    links?: LinkData[];
    loading?: boolean;
    searchLinks: () => void;
}

export function ListLinksWidget({ links = [], loading, searchLinks }: ListLinksWidgetProps) {

    const [loadingExport, setLoadingExport] = useState(false);

    async function exportCSV() {
        setLoadingExport(true);
        await axios.post(apiUrl + "/links/exports", {
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => {
            const download = response?.data?.reportUrl;
            if (download) {
                window.location.href = download;
            }
        }).catch((error) => {
            toast.error(`Erro ao baixar o csv.`, {
                description: error?.response?.data?.message || "Ocorreu um erro inesperado. Por favor, tente novamente em instantes."
            });
        }).finally(() => {
            setLoadingExport(false);
        });
    }

    return (
        <div className="bg-white rounded-lg shadow md:w-[580px] w-full">
            {loading && (
                <div className="relative h-1 w-full overflow-hidden rounded-t-lg">
                    <div className="absolute h-full w-[10rem] bg-primary-dark animate-loading-bar" />
                </div>
            )}
            <div className="sm:p-8 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Meus links</h2>
                    <button disabled={loadingExport} className="text-sm bg-gray-200 px-3 py-1 rounded-md border hover:bg-gray-300 transition" onClick={exportCSV}>
                        <div className="flex justify-start align-middle">
                            {loadingExport ? (
                                <CircleNotch size={18} className="text-gray-600 animate-spin" />
                            ) : (
                                <DownloadSimple size={18} className="text-gray-600" />
                            )}
                            <p className="pl-1 text-gray-500">Baixar CSV</p>
                        </div>
                    </button>
                </div>
                {loading ? (
                    <div className="flex flex-col items-center justify-center text-gray-400 h-40 border-2 border-dashed border-gray-200 rounded-lg">
                        <CircleNotch size={42} className="animate-spin" />
                        <p className="text-sm">CARREGANDO LINKS</p>
                    </div>
                ) : (
                    <>
                        {links.length === 0 ? (
                            <div className="flex flex-col items-center justify-center text-gray-400 h-40 border-2 border-dashed border-gray-200 rounded-lg">
                                <Link size={50} />
                                <p className="text-sm">AINDA NÃO EXISTEM LINKS CADASTRADOS</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 md:max-h-[70dvh] max-h-[40dvh] overflow-y-auto">
                                {links.map((link) => (
                                    <LinkWidget link={link} key={link.id} loading={loading} searchLinks={searchLinks} />
                                ))}
                            </div>
                        )
                        }
                    </>
                )
                }
            </div>
        </div>
    )
}