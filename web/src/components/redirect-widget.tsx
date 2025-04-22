import { Link } from "react-router-dom";
import BackgroundWidget from './background-widget';
import icon from "/Logo_Icon.svg";

const RedirectWidget = ({ url }: { url?: string | null }) => {
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
                        {url ? (
                            <a href={url} className="pl-1 text-primary underline hover:text-primary-dark transition-colors duration-200">
                                Acesse aqui
                            </a>
                        ) : (
                            <Link
                                to="/"
                                className="pl-1 text-primary underline hover:text-primary-dark transition-colors duration-200"
                            >
                                Acesse aqui
                            </Link>
                        )
                        }

                    </p>
                </>
            }
            component={
                <img className='h-12' src={icon} alt="Not Found" />
            }
        />
    )
}

export default RedirectWidget