import { useLoaderData, Outlet, Link } from "@remix-run/react"
import type { V2_MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare"
import stylesUrl from "../style/index.css"

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
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
}

export const loader = async () => {
  const combinedJson = {
    myname: "Daisuke Yamamoto",
    githubProfile: "https://github.com/danny-yamamoto",
  };
  return json(combinedJson);
}

export default function Index() {
  const data: CombinedJson = useLoaderData();
  console.log(data);
  return (
    <div>
      {/* Introduction Section */}
      <section id="intro">
        <h1>{data.myname}</h1>
        <Outlet />
        <p>Welcome to my portfolio</p>
      </section>

      <footer>
        <p>&copy; 2023 {data.myname}. All rights reserved.</p>
        <div className="social-links">
          <Link target="_blank" to={data.githubProfile}><i className="fab fa-github"></i></Link>
        </div>
      </footer>
    </div>
  );
}
