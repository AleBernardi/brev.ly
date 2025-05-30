import { Link } from 'react-router-dom';
import BackgroundWidget from './background-widget';
import notFound from '/404.svg';

export function NotFoundWidget() {
    return (
        <BackgroundWidget
            title='Link não encontrado'
            message={
                <p>
                    O link que você está tentando acessar não existe, foi removido ou é uma URL inválida.
                    Saiba mais em
                    <Link
                        to="/"
                        className="pl-1 text-primary underline hover:text-primary-dark transition-colors duration-200"
                    >
                        brev.ly
                    </Link>.
                </p>
            }
            component={
                <img className='h-20' src={notFound} alt="Not Found" />
            }
        />
    )
}