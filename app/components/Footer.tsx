import { Link } from "@remix-run/react";

export interface FooterProps {
    titile: string;
    github: string;
    twitter: string;
}

export const Footer = (props: FooterProps) => {
    const { titile, github, twitter } = props;

    return (
        <footer>
            <p>&copy; 2023 {titile}. All rights reserved.</p>
            <div className="social-links">
                <Link target="_blank" to={github}><i className="fab fa-github"></i></Link>
                <Link target="_blank" to={twitter}><i className="fab fa-twitter"></i></Link>
            </div>
        </footer>
    );
};
