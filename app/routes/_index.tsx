import { useLoaderData, Outlet, Link } from "@remix-run/react"
import type { V2_MetaFunction } from "@remix-run/cloudflare";
import { getRepositories } from "../utils/repository.server";
import { getArticles } from "../utils/articles.server";
import { getExperience } from "../utils/experience.server"
import { getCertificates } from "../utils/certificates.server";
import { json } from "@remix-run/cloudflare"
import stylesUrl from "../style/index.css"
import type { LoaderArgs } from "@remix-run/node";
import { Introduction } from "../components/Introduction";
import { Experience } from "../components/Experience";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Daisuke Yamamoto" },
    { name: "description", content: "danny's portfolio" },
  ];
};

export const links = () => {
  return [
    { rel: "stylesheet", href: stylesUrl },
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"}
  ];
};

type CombinedJson = {
  myname: string;
  githubProfile: string;
  twitterProfile: string;
  displayExperience: any[];
  displayArticles: any[];
  displayRepositories: any[];
  displayCertificates: any[];
}

export const loader = async ({ context }: LoaderArgs) => {
  const vars: any = context.env;
  const ghEndpoint: string = vars.GRAPHQL_API;
  const ghToken: string = vars.GH_TOKEN;
  const experience = await getExperience();
  const articles = await getArticles(20);
  const repositories = await getRepositories(ghEndpoint, ghToken);
  const certificates = await getCertificates();
  const combinedJson = {
    myname: "Daisuke Yamamoto",
    displayExperience: experience,
    displayArticles: articles,
    displayRepositories: repositories,
    displayCertificates: certificates,
    githubProfile: "https://github.com/danny-yamamoto",
    twitterProfile: "https://twitter.com/dai_s_a_n",
  };
  return json(combinedJson);
}

export default function Index() {
  const data: CombinedJson = useLoaderData();
  const experience = data.displayExperience;
  const repositories = data.displayRepositories;
  const articles = data.displayArticles;
  const certificates = data.displayCertificates;
  return (
    <div>
      {/* Introduction Section */}
      <Introduction titile="Daisuke Yamamoto" description="Welcome to my portfolio" />

      {/** Experience Section */}
      <Experience titile="Experience" detail={experience} />
      <Outlet />

      {/** Arricles Section */}
      <section  id="articles">
        <h2>Top 20 Article</h2>
        <ul>
        {articles.map(({ title, url, id }) => (
          <li key={id}>
            <Link key={id} to={url} target="_blank">{title}</Link>
          </li>
        ))}
        </ul>
      </section>

      {/* Repositories Section */}
      <section>
        <h1>Repositories</h1>
        <div className="repo-container">
        {repositories.map(({ name, description, url }) => (
          <div key={name} className="repo-tile">
            <h3 className="repo-name">{name}</h3>
            <p className="repo-description">{description}</p>
            <Link key={name} to={url} target="_blank" className="repo-link">View on GitHub</Link>
          </div>
        ))}
        </div>
      </section>

      {/** Certificates Section */}
      <section>
        <h2>Certificates</h2>
        <ul>
        {certificates.map(({ blockchainId, title }) => (
          <li key={blockchainId}>{title}</li>
        ))}
        </ul>
      </section>

      <footer>
        <p>&copy; 2023 {data.myname}. All rights reserved.</p>
        <div className="social-links">
          <Link target="_blank" to={data.githubProfile}><i className="fab fa-github"></i></Link>
          <Link target="_blank" to={data.twitterProfile}><i className="fab fa-twitter"></i></Link>
        </div>
      </footer>
    </div>
  );
}
