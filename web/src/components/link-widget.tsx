import { Copy, Trash } from "@phosphor-icons/react";
import { toast } from "sonner";

interface LinkWidgetProps {
    link: {
        id: string;
        shortUrl: string;
        originalUrl: string;
        accessCount: number;
    };
    onClick: () => void;
}

interface LinkWidgetProps {
}

export function LinkWidget({ link, onClick }: LinkWidgetProps) {

    const url = window.location;

    function copyShortLink() {
        console.log(url + link.shortUrl);
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

    return (
        <div className="border-t py-4 flex items-start justify-between">
            <div className="flex flex-col">
                <a
                    onClick={() => {
                        setInterval(() => {
                            onClick();
                        }, 1000);
                    }}
                    href={url + link.shortUrl + `?urlOriginal=${link.originalUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-700 hover:underline"
                >
                    {url + link.shortUrl}
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
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
                    title="Excluir link"
                >
                    <Trash size={16} className="text-gray-600" />
                </button>
            </div>
        </div>
    );
}