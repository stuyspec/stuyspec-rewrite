import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Developers.module.css";

const DevelopersPage = () => {
  const developers: Array<{
    name: string;
    role: string;
    year: string;
    image: string;
  }> = [
    {
      name: "David Chen",
      role: "Editor",
      year: "2023",
      image:
        "https://cdn.discordapp.com/attachments/854398680835948544/925432531959054346/unknown.png",
    },
    {
      name: "Leonid Metlitsky",
      role: "Developer",
      year: "2025",
      image:
        "https://cdn.discordapp.com/avatars/426703074157920266/b48738825b6be755d98be7b97af3d449.png?size=256",
    },
    {
      name: "Ivan Chen",
      role: "Developer",
      year: "2024",
      image:
        "https://cdn.discordapp.com/avatars/695729168343629844/fb8e8f749485685fa9f5c62f56f330f2.png?size=256",
    },
  ];

  const maintainers: Array<{
    name: string;
    role: string;
    year: string;
  }> = [
    { name: "John Doe", role: "Editor", year: "2027" },
    { name: "Jane Doe", role: "Developer", year: "2027" },
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
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <h1>Major Contributors of The Spectator&apos;s Website</h1>
        {/* image and description are top down */}
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
                {developer.name}
                {truncateYear(developer.year)}
              </h3>
              <h4>{developer.role}</h4>
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
                  margin: "1rem",
                }}
                key={key}
              >
                <h3>
                  {maintainer.name}
                  {truncateYear(maintainer.year)}
                </h3>
                <h4>{maintainer.role}</h4>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default DevelopersPage;
