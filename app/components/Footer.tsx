export interface FooterProps {
    titile: string;
}

export const Footer = (props: FooterProps) => {
    const { titile } = props;

    return (
        <footer>
            <p>&copy; 2023 {titile}. All rights reserved.</p>
        </footer>
    );
};
