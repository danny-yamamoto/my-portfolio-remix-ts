import { useLoaderData, Outlet } from "@remix-run/react"
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
import { Articles } from "../components/Articles"
import { Repositories } from "../components/Repositories"
import { Certificates } from "../components/Certificates"
import { Footer } from "../components/Footer"

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
      <Articles titile="Top 20 Article" detail={articles}/>

      {/* Repositories Section */}
      <Repositories titile="Repositories" detail={repositories} />

      {/** Certificates Section */}
      <Certificates titile="Certificates" detail={certificates} />

      <Footer titile="Daisuke Yamamoto" github="https://github.com/danny-yamamoto" twitter="https://twitter.com/dai_s_a_n" />

    </div>
  );
}
