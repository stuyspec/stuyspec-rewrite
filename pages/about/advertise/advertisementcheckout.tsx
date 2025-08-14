import { useEffect, useState } from "react";
import styles from "./../../../styles/AdvertisementCheckout.module.css";
import GetPurchaseOptions from "./purchaseOptions";
export default function AdvertisementCheckout() {
  const [tab, setTab] = useState<number>(0);
  const SUBTEXT = "per issue";
  const purchaseOptions = GetPurchaseOptions();
  return (
    <div className={styles.mainArea}>
      <main>
        <div className={styles.mainText}>
          <h1>Finalize Your Order</h1>
        </div>
        {/*<div className={styles.choosen}>
          <OptionGridRadio
            options={[
              {
                title: "Print",
                description:
                  "Advertise your brand on The Spectator's newspapers",
              },
              {
                title: "Website",
                description: "Advertise your brand on stuyspec.com",
              },
              {
                title: "Both",
                description: "Advetise your brand on stuyspec.com and on print",
              },
            ]}
            back={false}
            next={true}
            setTab={setTab}
            tab={tab}
          />
          <OptionGridRadio
            options={[
              {
                title: "Banner",
                description: "Your advertisement will show up randomly above articles on stuyspec.com",
              },
            ]}
            next={true}
            back={true}
            setTab={setTab}
            tab={tab}
          />
        </div>*/}
      </main>
    </div>
  );
}

//TO BE MODULARIZED
interface OptionGridProps {
  options: Card[];
  next: boolean;
  back: boolean;
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
}
interface Card {
  title: string;
  description?: string;
  cost?: number;
  costSubText?: string;
}
function OptionGridRadio(props: OptionGridProps) {
  const [chosenOption, setChosenOption] = useState<number>(-1);
  return (
    <section className={styles.optionGridContainer}>
      <div className={styles.optionGrid}>
        {props.options.map((item, number) => {
          let borderColor = "";
          if (number == chosenOption) {
            borderColor = "var(--primary)";
          }
          return (
            <div
              id={styles.option}
              onClick={() => setChosenOption(number)}
              style={{ borderColor: borderColor }}
            >
              {chosenOption == number ? (
                <RadioButton checked={true} />
              ) : (
                <RadioButton checked={false} />
              )}
              <h1>{item.title}</h1>
              <p>{item.description}</p>

              {item.cost ? (
                <div id={styles.cost}>
                  <p>${item.cost} </p>
                  {item.costSubText ? (
                    <p id={styles.SUBTEXT}>{item.costSubText}</p>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div id={styles.nextButtonContainer}>
        {props.back ? (
          <button
            id={styles.BACKBUTTON}
            onClick={() => props.setTab(props.tab - 1)}
          >
            Back
          </button>
        ) : null}
        {props.next ? (
          chosenOption >= 0 ? (
            <button
              id={styles.NEXTBUTTON}
              onClick={() => props.setTab(props.tab + 1)}
            >
              Next
            </button>
          ) : (
            <button id={styles.NEXTBUTTONDISABLED} disabled>
              Next
            </button>
          )
        ) : null}
      </div>
    </section>
  );
}
function RadioButton({ checked }: { checked: boolean }) {
  return (
    <div id={styles.BUTTON}>
      {!checked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-check-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
      )}
    </div>
  );
}
