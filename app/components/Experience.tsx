export interface ExperienceProps {
    titile: string;
    detail: any[];
}

export const Experience = (props: ExperienceProps) => {
    const { titile, detail } = props;

    return (
        <section>
            <h1>{titile}</h1>
            <ul>
                {detail.map(({ id, company, position }) => (
                <li key={id}>{id}: {position} @ {company}</li>
                ))}
            </ul>
        </section>
    );
};
