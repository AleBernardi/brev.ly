import { Link } from "@phosphor-icons/react";

export function ListLinksWidget() {
    return (
        <div className="bg-white sm:p-8 p-6 rounded-lg shadow md:w-[580px] w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Meus links</h2>
                <button className="text-sm bg-gray-100 px-3 py-1 rounded-md border hover:bg-gray-200 transition">
                    Exportar CSV
                </button>
            </div>
            <div className="flex flex-col items-center justify-center text-gray-400 h-40 border-2 border-dashed border-gray-200 rounded-lg">
                <Link size={50} />
                <p className="text-sm">AINDA NÃO EXISTEM LINKS CADASTRADOS</p>
            </div>
        </div>
    )
}