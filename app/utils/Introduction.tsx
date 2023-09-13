export interface IntroductionProps {
    titile: string;
    description: string;
}

/**
 * @name Introduction
 * @param props 
 * @returns 
 */
export const Introduction = (props: IntroductionProps) => {
    const { titile, description } = props;

    return (
        <section id="intro">
            <h1>{titile}</h1>
            <p>{description}</p>
        </section>
    );
};
