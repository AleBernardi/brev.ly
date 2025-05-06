import { Warning } from "@phosphor-icons/react";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL;

interface FormData {
    originalUrl: string;
    shortUrl: string;
}

interface NewLinkWidgetProps {
    onSuccess: () => void;
}

export function NewLinkWidget({ onSuccess }: NewLinkWidgetProps) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

    async function onSubmit(data: FormData) {
        await axios.post(apiUrl + "/links", data, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then(() => {
            toast.success('Novo link salvo com sucesso!');
            reset();
            onSuccess();
        }).catch((error) => {
            toast.error('Erro ao salvar o link.', {
                description: error?.response?.data?.message || "Ocorreu um erro inesperado. Por favor, tente novamente em instantes."
            });
        });
    }

    return (

        <div className="bg-white sm:p-8 p-6 rounded-lg shadow md:w-[380px] w-full">
            <h2 className="text-lg font-semibold md:mb-6 mb-5">Novo link</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div className="mb-4">
                    {!errors.originalUrl ? (
                        <label className="text-xxs text-gray-600 block mb-1">LINK ORIGINAL</label>
                    ) : (
                        <label className="text-xxs text-danger block mb-1">LINK ORIGINAL</label>
                    )}
                    <input
                        type="text"
                        placeholder="www.exemplo.com.br"
                        className={`w-full px-4 py-2 border ${errors.originalUrl ? 'border-danger' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                        {...register('originalUrl', {
                            required: 'O link original é obrigatório.',
                            pattern: {
                                value: /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/\S*)?$/,
                                message: 'Informe uma URL válida.'
                            }
                        })}
                    />
                    {errors.originalUrl && (
                        <div className="flex items-center p-1">
                            <Warning size={18} className="text-danger" /> <span className="pl-1 text-gray-500 text-xs">{errors.originalUrl.message}</span>
                        </div>
                    )}
                </div>
                <div>
                    {!errors.shortUrl ? (
                        <label className="text-xxs text-gray-600 block mb-1">LINK ENCURTADO</label>
                    ) : (
                        <label className="text-xxs text-danger block mb-1">LINK ENCURTADO</label>
                    )
                    }
                    <input
                        type="text"
                        placeholder="brev.ly/"
                        className={`w-full px-4 py-2 border ${errors.shortUrl ? 'border-danger' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                        {...register('shortUrl', {
                            required: 'Informe uma URL minúscula e sem espaço/caracteres especiais.',
                            pattern: {
                                value: /^[a-z0-9\-]+$/,
                                message: 'Use apenas letras minúsculas, números e hífens.'
                            }
                        })}
                    />
                    {errors.shortUrl && (
                        <div className="flex items-center p-1">
                            <Warning size={18} className="text-danger" /> <span className="pl-1 text-gray-500 text-xs">{errors.shortUrl.message}</span>
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="sm:mt-6 mt-5 bg-primary hover:bg-primary-dark transition duration-200 h-12 text-white py-2 rounded-lg"
                >
                    Salvar link
                </button>
            </form>
        </div>
    )
}