import { ListLinksWidget } from "./list-links-widget";
import { NewLinkWidget } from "./new-link-widget";
import logo from "/Logo.svg";

export function LinkWidget() {

    return (
        <div className="min-h-screen flex flex-col md:items-start items-center md:mt-24 p-2">
            <div className="py-6">
                <img src={logo} className="h-6" alt="Logo" />
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch">
                <NewLinkWidget />

                <ListLinksWidget />
            </div>

        </div>
    )
}