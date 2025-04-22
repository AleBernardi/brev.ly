import logo from "/Logo.svg"

export function LinkWidget() {
    return (
        <div className="min-h-screen flex flex-col md:items-start items-center">
            <div className="py-6">
                <img src={logo} className="h-6" alt="Logo" />
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-start">
                <div className="bg-white sm:p-8 p-6 rounded-lg shadow w-full md:w-96">
                    <h2 className="text-lg font-semibold md:mb-6 mb-5">Novo link</h2>
                    <form className="flex flex-col">
                        <div className="mb-4">
                            <label className="text-xxs text-gray-600 block mb-1">LINK ORIGINAL</label>
                            <input
                                type="text"
                                placeholder="www.exemplo.com.br"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="text-xxs text-gray-600 block mb-1">LINK ENCURTADO</label>
                            <input
                                type="text"
                                placeholder="brev.ly/"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <button
                            type="submit"
                            className="sm:mt-6 mt-5 bg-primary h-12 text-white py-2 rounded-lg opacity-50 hover:opacity-100 transition-opacity duration-100"
                        >
                            Salvar link
                        </button>
                    </form>
                </div>

                <div className="bg-white sm:p-8 p-6 rounded-lg shadow w-full md:flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Meus links</h2>
                        <button className="text-sm bg-gray-100 px-3 py-1 rounded-md border hover:bg-gray-200 transition">
                            Exportar CSV
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center text-gray-400 h-40 border-2 border-dashed border-gray-200 rounded-lg">
                        <span className="text-2xl mb-2">🔗</span>
                        <p>Ainda não há links cadastrados</p>
                    </div>
                </div>

            </div>
        </div>
    )
}