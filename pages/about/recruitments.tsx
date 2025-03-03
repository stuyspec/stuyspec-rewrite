import Head from "next/head";
import styles from "../../styles/Recruitments.module.css";
import stuyvesantSpectatorpectatorLogo from "./Untitled_design-removebg-preview (1).png";
import { generateMetaTags } from "../../utils/generateMetaTags";

function RecruitmentPage() {
  const departments: Array<{
    department: string;
    description: string;
    applicationForm?: string;
    applicationDueDate?: string;
  }> = [
    {
      department: "News",
      description:
        "The News Department covers school events, administrative changes, student organizations, school and student government policies, and out-of-school news. Besides traditional News articles, we also write mini-articles, graphs & surveys, and spreads. If you are interested in knowing Stuyvesant news before it is released, informing the student body, meeting students, teachers, and administrators, or seeing your work on the front page, apply to our department!",
      applicationForm: "https://forms.gle/r4MP3nq82eR2mHJFA",
      applicationDueDate: "Sunday, November 24th at 11:59PM",
    },
    {
      department: "Features",
      description:
        "Features capture the spirit and mood of the school. At times, Features covers Stuyvesant’s evergreen topics, e.g. what is it about PE uniforms that gets everybody so hot and bothered? Other times, writers might profile a teacher. Other times, writers share creative narratives about experiences they have had in the “Voices” section. There is much to be found in Features, so come hither!",
      applicationForm:
        "https://docs.google.com/document/d/1OzWY4KaVYzMPjK9oKwYiJOfRTGUIztYRkyME1PeZXI4/edit",
      applicationDueDate: "Sunday, November 24th, at 11:59PM",
    },
    {
      department: "Humor",
      description:
        "Do you want to lowkey rant about your life and roast everything? Would you like to have a personality glow up? Do you want to join a low commitment and fun Spec department? Join Spec Humor! We write funny and satirical pieces for The Spec and unlike other departments, everything we publish is libel and slander which means that you'll be in control of what everyone says!",
      applicationForm: "https://forms.gle/kTcaB5jknCkqzLdp6",
      applicationDueDate: "Sunday, November 24rd at 11:59PM",
    },
    {
      department: "Arts & Entertainment",
      description:
        "As the only department with more than three article categories, Arts and Entertainment is notable for its versatility and creative freedom. We review recent cultural topics such as art, fashion, film, food, literature, music, and more! A&E writers are also free to experiment with the thinkpiece category, where one can explore cultural phenomena or trends, gender standards, or race from a cultural standpoint. Whether you are an aspiring music enthusiast or cultural connoisseur, everyone can find (or create!) their own niche in A&E.",
      applicationForm:
        "https://docs.google.com/document/d/1lIYPgWIpJFHYYsix2N_Z9nyfuIdTyz-4XNdP7-v03fY/edit?tab=t.0",
      applicationDueDate: "Sunday, November 24th at 11:59PM",
    },
    {
      department: "Opinions",
      description:
        "The Opinions section lets writers share their views on issues relevant within the country, Stuyvesant, and their personal lives. Writers across all grades give their opinions on subjects ranging from politics and economics to technology and culture and share their personal stories. We try to consistently create engaging, substantive, and relevant content to provide students with a closer look at the world and the Stuyvesant community.",
      applicationForm:
        "https://docs.google.com/document/d/1di7Wot4QdZr6nJDQjnyMB6bIFATpfEi-_MT54iudzfA/edit?tab=t.0",
      applicationDueDate: "Sunday, December 1st at 11:59PM ",
    },
    {
      department: "Sports",
      description:
        "The Sports department covers all things sports, whether it be PSAL sports at Stuyvesant or professional sports. Articles pertaining to Stuyvesant sports range from championship articles and season updates to athlete and coach interviews and opinions. Writers also cover virtually any topic in the larger sports world, from debates on LeBron vs. MJ and college basketball to YouTube boxing and the Champions League. If that’s not enough to convince you to apply, we have an exclusive fantasy football league (with rewards).",
      applicationForm:
        "https://docs.google.com/document/d/1bIBsQHAcnt6jS_80s9f1wvZybTcJBW58zLHgXElFXPE/edit?usp=sharing",
      applicationDueDate: "Friday, November 22nd at 11:59PM",
    },
    {
      department: "Science",
      description:
        "The Science Department covers everything science-related, from pandemics and groundbreaking discoveries to Stuyvesant’s very own fascinating science clubs and events. Our department captures the complexity of science through analytical and often opinion-based writing, and we aim to convey the intricacies of the world around us and beyond to the student body.",
      applicationForm:
        "https://docs.google.com/document/d/1LkSAZMY2yzAOCi85B_KFc0oA7JtUab6ZXUu1w1fuuZo/edit?tab=t.0",
      applicationDueDate: "Saturday, November 30th at 11:59PM",
    },
    {
      department: "Web",
      description:
        "The Web department is responsible for designing and updating The Spectator's website (aka this website), www.stuyspec.com. It also attempts to facilitate the learning of developing and maintaining a web applications. These real-world skills are a great resume builders and provide invaluable experience in working together as a team. This is the perfect department for both computer programming enthusiasts and novices who want to help The Spectator continue to storm the frontier of online journalism.",
      applicationForm: "https://stuyspec.com/apply/web",
      applicationDueDate: "Friday, November 30th at 11:59PM",
    },
    {
      department: "Copy",
      description:
        "Members of the Copy Department ensures that The Spectator produces clear, grammatically correct, and accurate articles. Did you notice both mistakes in the last sentence? If you did, you should join the Copy Department! Members gain early access to articles and sharpen their grammar skills while editing and fact-checking departments of their choice. We are committed to catching grammatical and factual mistakes in articles with attention to detail, and we look for members who want to contribute to maintaining The Spectator’s high-quality content.",
      applicationForm: "https://forms.gle/ATYMCB4FHezC3KDx6",
      applicationDueDate: "Sunday, November 17th at 11:59PM",
    },
    {
      department: "Layout",
      description:
        "A good publication should interest readers before they even pick it up and read it; the Layout department does just that! We are responsible for formatting all of the articles, photos, art, and other media and make sure that the paper is aesthetically appealing and easy to read. After all, no one wants to read ugly and confusing blocks of text. With creativity and a certain magic called InDesign, we present to you what you know as The Spectator. As a staff member, you will be taught how to use InDesign and asked to critique the formatting of each issue as it is released.",
      applicationForm:
        "https://docs.google.com/forms/d/e/1FAIpQLSe1BcGT7yusdtk2C1A2AzSv8SBvEnfbla63lKQoWbdTL7no5w/viewform",
      applicationDueDate: "Friday, November 15th at 11:59PM",
    },
    {
      department: "Photo",
      description:
        "Photo is dedicated to providing interesting and dynamic photographs to support the articles in The Spectator and spearhead photo essay projects. Typical assignments include portraits of students and teachers, photos at school events, and shots of fun things around the city. This department is a good fit for anyone interested in photography, whether you’re just starting out, or you’re an expert looking for a place to practice and refine your skills.",
      applicationForm:
        "https://docs.google.com/forms/d/e/1FAIpQLSd5ON7rReGZ-J6QKoIoxBYbIpfTInb5hDCmtjCBDZnX417uVg/viewform?pli=1",
      applicationDueDate: "Saturday, November 23rd at 11:59PM",
    },
    {
      department: "Art",
      description:
        "It is often difficult to read through dense blocks of text without something to rest your eyes on. In the Art Department, we strive to embellish the newspaper with our unique illustrations, each perfectly suited for its article. In a school where artistic abilities are not seen as a priority, you can easily find your niche as an artist for The Spectator, where your art will be displayed for all of its readers to admire. The limits of your creativity have no bounds; you can explore and develop your art skills by taking on cool and unique requests, from a portrait of Taylor Swift (A&E) to an oily stork (Humor), as well as the occasional thematic spread; the range is infinite. We encourage the use of all media!",
      applicationForm:
        "https://docs.google.com/forms/d/e/1FAIpQLSfd-DE_25-uMFItInXfIbirAl-2SVMbSJRWVrl0cZQ5XC7TBQ/viewform",
      applicationDueDate: "Friday, November 22nd at 11:59PM",
    },
    {
      department: "Business",
      description:
        "The Business department is the backbone of The Spectator. Due to the efforts of this department, The Spectator is able to print all of its issues while still remaining independent. We negotiate and secure deals with businesses all over New York as well as handle the advertisements on the website and in the paper. Members learn skills that can be applied to real life, including talking in formal settings, learning how to negotiate and compromise, and understanding how to manage money.",
      applicationForm:
        "https://docs.google.com/forms/d/1JW1vpqd2FwR4znCaBVTn3DmeipRHc_8hmtNgEUP-xIc/viewform?edit_requested=true",
      applicationDueDate: "Sunday, November 24th at 11:59PM",
    },
  ];

  const page_title = "Recruitments - The Stuyvesant Spectator";
  const meta_url = `https://stuyspec.com/about/recruitments`;
  const meta_description = `Recruitments for The Stuyvesant Spectator.`;

  return (
    <>
      <Head>{generateMetaTags(page_title, meta_description, meta_url)}</Head>
      <main id={styles.main}>
        <article className={styles.hero}>
          <div className={styles.heroText}>
            <div id={styles.status}>
              <div id={styles.offline}></div>
              <p>Applications are currently closed</p>
            </div>
            <div id={styles.mainText}>
              <h1>Stuyvesant Spectator Recruitments</h1>
            </div>
            <div className={styles.descriptionText}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                dignissim enim sit amet mollis auctor. Suspendisse suscipit
                tempus velit ut eleifend. Donec egestas odio lacus. Proin ipsum
                dolor, sodales vel lacinia ac, bibendum et odio. Etiam quis
                massa a mauris condimentum commodo. Nunc condimentum nulla leo,
                vitae aliquam lectus efficitur ac. Ut sem orci, mollis vitae
                feugiat eu, placerat in est.
              </p>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img
              src={stuyvesantSpectatorpectatorLogo.src}
              alt="Stuyvesant Spectator Logo"
            />
          </div>
        </article>
        <section className={styles.departments}>
          {departments.map((department, key) => (
            <div className={styles.department} style={{}} key={key}>
              <div id={styles.overlay}></div>
              {department.applicationDueDate && (
                <p>
                  <b>Due {department.applicationDueDate}</b>
                </p>
              )}
              <div id={styles.departmentheader}>
                <h2>{department.department}</h2>
                {department.applicationForm && (
                  <>
                    <a
                      className="link"
                      href={department.applicationForm}
                      target="_blank"
                      rel="norefferer"
                    >
                      Apply for {department.department}.
                    </a>
                  </>
                )}

            </div>
            </div>
          ))}
        
        
        </section>
      </main>
    </>
  );
}

export default RecruitmentPage;
