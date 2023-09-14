import { Link } from "@remix-run/react";

export interface RepositoriesProps {
    titile: string;
    detail: any[];
}

export const Repositories = (props: RepositoriesProps) => {
    const { titile, detail } = props;

    return (
        <section>
            <h1>{titile}</h1>
            <div className="repo-container">
                {detail.map(({ name, description, url }) => (
                <div key={name} className="repo-tile">
                    <p className="repo-name">{name}</p>
                    <p className="repo-description">{description}</p>
                    <Link key={name} to={url} target="_blank" className="repo-link">View on GitHub</Link>
                </div>
                ))}
            </div>
        </section>
    );
};
