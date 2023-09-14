import { Link } from "@remix-run/react";

export interface ArticlesProps {
    titile: string;
    detail: any[];
}

export const Articles = (props: ArticlesProps) => {
    const { titile, detail } = props;

    return (
        <section  id="articles">
            <h1>{titile}</h1>
            <ul>
                {detail.map(({ title, url, id }) => (
                <li key={id}>
                    <Link key={id} to={url} target="_blank">{title}</Link>
                </li>
                ))}
            </ul>
        </section>
    );
};
