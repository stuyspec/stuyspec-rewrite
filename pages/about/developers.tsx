import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Developers.module.css";
import Sidebar from "../../components/Sidebar";

const DevelopersPage = () => {
  const developers: Array<{
    name: string;
    role: string;
    year: string;
    image: string;
    github: string;
  }> = [
    {
      name: "David Chen",
      role: "Editor",
      year: "2023",
      github: "dchen278",
      image:
        "https://cdn.discordapp.com/attachments/854398680835948544/925432531959054346/unknown.png",
    },
    {
      name: "Leonid Metlitsky",
      role: "Developer",
      year: "2025",
      github: "leomet07",
      image:
        "https://cdn.discordapp.com/avatars/426703074157920266/b48738825b6be755d98be7b97af3d449.png?size=256",
    },
    {
      name: "Ivan Chen",
      role: "Developer",
      year: "2024",
      github: "anivanchen",
      image:
        "https://cdn.discordapp.com/avatars/695729168343629844/fb8e8f749485685fa9f5c62f56f330f2.png?size=256",
    },
  ];

  const maintainers: Array<{
    name: string;
    role: string;
    year: string;
    github: string;
  }> = [
    { name: "John Doe", github: '', role: "Editor", year: "2027" },
    { name: "Jane Doe", github: '', role: "Developer", year: "2027" },
  ];

  function truncateYear(year: string) {
    return " '" + year.slice(2);
  }

  return (
    <>
      <Head>
        <title>Developers | The Spectator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id={styles.pageBody}>
        <div id={styles.sidebar}><Sidebar /></div>
        <div id={styles.body}>
          <h1>Primary Developers</h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {developers.map((developer, key) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "1rem",
                }}
                key={key}
              >
                <div id={styles.profileImage}>
                  <Image
                    src={developer.image}
                    width={128}
                    height={128}
                    alt={developer.name}
                  />
                </div>
                <h3>
                  <a href={`https://github.com/${developer.github}`} className="discrete-link">
                    {developer.name}
                    {truncateYear(developer.year)}
                  </a>
                </h3>
                <h4 style={{ marginTop: "8px"}}>{developer.role}</h4>
              </div>
            ))}
          </div>

          <h1>Maintainers</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {maintainers.map((maintainer, key) => (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "0",
                  }}
                  key={key}
                >
                  <h3>
                    <a href={`https://github.com/${maintainer.github}`}  className="discrete-link">
                      {maintainer.name}
                      {truncateYear(maintainer.year)}
                    </a>
                  </h3>
                  <h4>{maintainer.role}</h4>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DevelopersPage;
