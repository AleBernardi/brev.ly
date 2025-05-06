import { Copy, Trash } from "@phosphor-icons/react";
import axios from "axios";
import { toast } from "sonner";

const apiUrl = import.meta.env.VITE_API_URL;

interface LinkWidgetProps {
    link: {
        id: string;
        shortUrl: string;
        originalUrl: string;
        accessCount: number;
    };
    loading?: boolean;
    searchLinks: () => void;
}

export function LinkWidget({ link, searchLinks }: LinkWidgetProps) {

    const url = window.location;

    function copyShortLink() {
        navigator.clipboard.writeText(url + link.shortUrl)
            .then(() => {
                toast.success("Link copiado com sucesso", {
                    description: `O link ${link.shortUrl} foi copiado para a área de transferência.`
                });
            })
            .catch(() => {
                toast.error("Erro ao copiar o link.");
            });
    }

    async function deleteLink() {
        const confirmacao = window.confirm('Você tem certeza que deseja deletar este link?');

        if (confirmacao) {
            await axios.delete(apiUrl + "/links", {
                headers: {
                    "Content-Type": "application/json"
                },
                params: {
                    shortUrl: link.shortUrl
                }
            }).then((response) => {
                toast.success(response?.data?.message);
                searchLinks();
            }).catch((error) => {
                toast.error(`Erro ao deletar o link "${link.shortUrl}".`, {
                    description: error?.response?.data?.message || "Ocorreu um erro inesperado. Por favor, tente novamente em instantes."
                });

            });
        }
    }

    return (
        <div className="border-t py-4 flex items-start justify-between">
            <div className="flex flex-col">
                <a
                    onClick={() => {
                        setTimeout(() => {
                            searchLinks();
                        }, 1000);
                    }}
                    href={url + link.shortUrl + `?urlOriginal=${link.originalUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-700 hover:underline"
                >
                    {'brev.ly/' + link.shortUrl}
                </a>
                <span className="text-xs text-gray-500">
                    {link.originalUrl}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{link.accessCount} acessos</span>
                <button
                    onClick={copyShortLink}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
                    title="Copiar link"
                >
                    <Copy size={16} className="text-gray-600" />
                </button>
                <button
                    onClick={deleteLink}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
                    title="Excluir link"
                >
                    <Trash size={16} className="text-gray-600" />
                </button>
            </div>
        </div>
    );
}