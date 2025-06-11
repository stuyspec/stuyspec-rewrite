import Head from "next/head";
import styles from "./../../../styles/NewAdvertise.module.css";
import { generateMetaTags } from "../../../utils/generateMetaTags";
import Banner from "../../../components/Banner";
import { useEffect, useState } from "react";
import UploadImageModal from "../../../components/UploadImageModal";
import Link from "next/link";
import GetPurchaseOptions from "./purchaseOptions";

interface ChangingText {
  text: string;
  color: string;
}
function NewAdvertise() {
  const page_title = "Advertise - The Stuyvesant Spectator";
  const meta_url = `https://stuyspec.com/about/advertise`;
  const meta_description = `How to advertise in The Stuyvesant Spectator.`;

  const [changingTextNumber, setChangingTextNumber] = useState<number>(0);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const changingTextOptions: ChangingText[] = [
    {
      text: "Student Jounalism",
      color: "var(--ae-color)",
    },
    {
      text: "Student Artists",
      color: "var(--EIC-color)",
    },
    {
      text: "Future Scientists",
      color: "var(--science-color)",
    },
    {
      text: "Student Photographers",
      color: "var(--photos-color)",
    },
    {
      text: "Future Thinkers",
      color: "var(--sports-color)",
    },
  ];
  useEffect(() => {
    const timer = setTimeout(() => {
      if (changingTextNumber >= changingTextOptions.length - 1) {
        setChangingTextNumber(0);
      } else {
        setChangingTextNumber(changingTextNumber + 1);
      }
      setAnimationKey(animationKey + 1);
      console.log(changingTextNumber);
    }, 5000);
    return () => clearTimeout(timer);
  }, [changingTextNumber]);

  const [printOption, setPrintOption] = useState<boolean>(true);
  const [advertisementChoice, setAdvertisementChoice] = useState<number>(-1);
  const purchaseOptions = GetPurchaseOptions();
  const [isUploadImageModalOpen, setIsUploadImageModalOpen] =
    useState<boolean>(false);

  const getWindowDimensions = () => {
    if (typeof window === "undefined") {
      return { width: 0, height: 0 };
    }
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };
  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    setWindowWidth(getWindowDimensions().width);
    const handleResize = () => {
      setWindowWidth(getWindowDimensions().width);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <Head>{generateMetaTags(page_title, meta_description, meta_url)}</Head>
      {windowWidth <= 1000 ? (
        <Banner
          type="warning"
          message="On small screens not all content is displayed."
        />
      ) : null}
      <main className={styles.mainBody}>
        <section className={styles.heroContainer}>
          <article className={styles.hero}>
            <div className={styles.heroText}>
              <h1>
                Advertise on the{" "}
                <span
                  id={styles.NAME}
                  style={{
                    textDecoration: `${changingTextOptions[changingTextNumber].color} wavy underline`,
                  }}
                >
                  Stuyvesant Specator
                </span>
              </h1>
              <p>
                And Support{" "}
                <span
                  key={animationKey}
                  id={styles.changingTextOptions}
                  style={{
                    color: changingTextOptions[changingTextNumber].color,
                  }}
                >
                  {changingTextOptions[changingTextNumber].text}
                </span>
              </p>
            </div>
            <div
              className={styles.heroSide}
              style={{
                backgroundColor: changingTextOptions[changingTextNumber].color,
              }}
            ></div>
          </article>
        </section>
        <section className={styles.advertisementLocations}>
          <h1>See Your Ad:</h1>
          <div className={styles.advertisementContainer}>
            <div className={styles.advertisementButtonContainer}>
              <div className={styles.advertisementMainButtonContainer}>
                <div id={styles.PRINT}>
                  {printOption ? (
                    <button
                      onClick={() => {
                        setPrintOption(true);
                        setAdvertisementChoice(0);
                      }}
                      style={{
                        backgroundColor: "var(--secondary)",
                        color: "var(--primary)",
                      }}
                    >
                      Print
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setPrintOption(true);
                        setAdvertisementChoice(0);
                      }}
                    >
                      Print
                    </button>
                  )}

                  {printOption ? (
                    <div className={styles.advertisementChoicesContainer}>
                      <LoadChoices
                        advertisementChoice={advertisementChoice}
                        setAdvertisementChoice={setAdvertisementChoice}
                        printOption={printOption}
                      />
                    </div>
                  ) : null}
                </div>
                <div id={styles.WEB}>
                  {!printOption ? (
                    <button
                      onClick={() => {
                        setPrintOption(false);
                        setAdvertisementChoice(4);
                      }}
                      style={{
                        backgroundColor: "var(--secondary)",
                        color: "var(--primary)",
                      }}
                    >
                      Web
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setPrintOption(false);
                        setAdvertisementChoice(4);
                      }}
                    >
                      Web
                    </button>
                  )}

                  {!printOption ? (
                    <div className={styles.advertisementChoicesContainer}>
                      <LoadChoices
                        advertisementChoice={advertisementChoice}
                        setAdvertisementChoice={setAdvertisementChoice}
                        printOption={printOption}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
              <div id={styles.ADDYOURMEDIA}>
                <button disabled>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-image-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                  </svg>
                </button>
              </div>
            </div>
            <div className={styles.advertisementDisplayContainer}>
              {purchaseOptions[advertisementChoice] ? (
                <div className={styles.advertisementDisplay}>
                  <div className={styles.advertisementDisplayText}>
                    <h2>{purchaseOptions[advertisementChoice].title}</h2>
                    {purchaseOptions[advertisementChoice].width &&
                    purchaseOptions[advertisementChoice].height &&
                    purchaseOptions[advertisementChoice].unit ? (
                      <h3>
                        Dimensions:{" "}
                        {purchaseOptions[advertisementChoice].width +
                          purchaseOptions[advertisementChoice].unit}{" "}
                        x{" "}
                        {purchaseOptions[advertisementChoice].height +
                          purchaseOptions[advertisementChoice].unit}
                      </h3>
                    ) : null}
                    <p>{purchaseOptions[advertisementChoice].description}</p>
                  </div>
                  <div className={styles.advertisementPictureContainer}>
                    {purchaseOptions[advertisementChoice].width &&
                    purchaseOptions[advertisementChoice].height ? (
                      <div
                        className={styles.advertisementPicture}
                        style={{
                          width: `50%`,
                          aspectRatio: `1/${purchaseOptions[advertisementChoice].height / purchaseOptions[advertisementChoice].width}`,
                        }}
                      >
                        {" "}
                      </div>
                    ) : null}
                  </div>
                  {/*                  <div className={styles.advertisementCostOptionsContainer}>
                    {advertisementChoice >= 0 ? (
                      <div className={styles.advertisementCostOptions}>
                        {purchaseOptions[advertisementChoice].cost.map(
                          (items, _) => {
                            if (items.sizeUpperBound == undefined) {
                              return (
                                <button>
                                  {items.sizeLowerBound} issue
                                  {items.sizeLowerBound == 1 ? null : "s"}
                                </button>
                              );
                            } else {
                              return (
                                <button>{`${items.sizeLowerBound}-${items.sizeUpperBound} issues`}</button>
                              );
                            }
                          }
                        )}
                      </div>
                    ) : (
                      <p>NO OPTION SELECTED YET</p>
                    )}
                  </div> */}
                </div>
              ) : null}
            </div>
          </div>
        </section>
        <section className={styles.costCalculator}>
          <h1>Ready to build your advertisement campaign?</h1>
          <Link href="/about/advertise/advertisementcheckout">
            <button>Start Building...</button>
          </Link>
        </section>
      </main>
    </div>
  );
}
interface LoadChoicesProps {
  advertisementChoice: number;
  setAdvertisementChoice: React.Dispatch<React.SetStateAction<number>>;
  printOption: boolean;
}
function LoadChoices({
  advertisementChoice,
  setAdvertisementChoice,
  printOption,
}: LoadChoicesProps) {
  return (
    <>
      {printOption ? (
        <div className={styles.advertisementChoices}>
          <button
            onClick={() => {
              setAdvertisementChoice(0);
            }}
          >
            Full Page
          </button>
          <button
            onClick={() => {
              setAdvertisementChoice(1);
            }}
          >
            Half Page
          </button>
          <button
            onClick={() => {
              setAdvertisementChoice(2);
            }}
          >
            Quarter Page
          </button>
          <button
            onClick={() => {
              setAdvertisementChoice(3);
            }}
          >
            Eigth Page
          </button>
        </div>
      ) : (
        <div className={styles.advertisementChoices}>
          <button
            onClick={() => {
              setAdvertisementChoice(4);
            }}
          >
            Box
          </button>
          <button
            onClick={() => {
              setAdvertisementChoice(5);
            }}
          >
            Banner
          </button>
        </div>
      )}
    </>
  );
}
export default NewAdvertise;
