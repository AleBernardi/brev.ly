import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from 'sonner';
import BackgroundWidget from './background-widget';
import icon from "/Logo_Icon.svg";

const apiUrl = import.meta.env.VITE_API_URL;

const RedirectWidget = () => {

    const { link } = useParams();
    const [loading, setLoading] = useState(false);
    const [urlOriginal, setUrlOriginal] = useState('');
    const previousLink = useRef<string | null>(null);

    useEffect(() => {
        if (link && link !== previousLink.current) {
            searchLink();
            previousLink.current = link;
        }

        const params = new URLSearchParams(window.location.search);
        const urlOriginal = params.get('urlOriginal');
        if (urlOriginal) {
            setUrlOriginal(urlOriginal);

            params.delete("urlOriginal");

            const newUrl =
                window.location.pathname + (params.toString() ? `?${params.toString()}` : '');
            window.history.replaceState({}, '', newUrl);
        }

    }, [link]);

    async function searchLink() {

        if (loading) return;

        setLoading(true);
        await axios.get(apiUrl + "/" + link, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => {
            if (response.data && response.data.link && response.data.link.originalUrl) {
                let redirectUrl = response.data.link.originalUrl;

                if (!/^https?:\/\//i.test(redirectUrl)) {
                    redirectUrl = `https://${redirectUrl}`;
                }

                window.location.replace(redirectUrl);
            }
        }).catch((error) => {
            if (error.response.status === 404) {
                window.location.replace('not-found');
                return;
            }

            toast.error('Erro ao consultar o link.', {
                description: "Ocorreu um erro inesperado. Por favor, tente novamente em instantes."
            });

        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <BackgroundWidget
            title='Redirecionando...'
            message={
                <>
                    <p>
                        O link será aberto automáticamente em alguns instantes.
                    </p>
                    <p>
                        Não foi redirecionado?
                        {urlOriginal !== '' ? (
                            <a href={urlOriginal} className="pl-1 text-primary underline hover:text-primary-dark transition-colors duration-200">
                                Acesse aqui
                            </a>
                        ) : (
                            <Link
                                to="/"
                                className="pl-1 text-primary underline hover:text-primary-dark transition-colors duration-200"
                            >
                                Acesse aqui
                            </Link>
                        )}
                    </p>
                </>
            }
            component={
                <img className='h-12' src={icon} alt="Not Found" />
            }
        />
    );
}

export default RedirectWidget;