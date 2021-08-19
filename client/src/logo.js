import { useMediaQuery } from "react-responsive";

export function Logo() {
    return <img src="/logo.png" alt="logo" className="logo" />;
}

export function LogoSmall() {
    const changeLogo = useMediaQuery({ query: "(max-width: 565px)" });
    return (
        <>
            {changeLogo && (
                <img src="/logo-smallest.png" alt="logo" className="logo" />
            )}
            {!changeLogo && (
                <img src="/logo-small.png" alt="logo" className="logo" />
            )}
        </>
    );
}
