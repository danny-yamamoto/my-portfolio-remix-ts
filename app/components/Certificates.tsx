export interface CertificatesProps {
    titile: string;
    detail: any[];
}

export const Certificates = (props: CertificatesProps) => {
    const { titile, detail } = props;

    return (
        <section>
            <h2>{titile}</h2>
            <ul>
                {detail.map(({ blockchainId, title }) => (
                <li key={blockchainId}>{title}</li>
                ))}
            </ul>
        </section>
    );
};
