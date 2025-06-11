import { useState } from "react";
import styles from "./../styles/UploadImageModal.module.css"
export default function UploadImageModal(){
    return(
        <div className={styles.modalArea}>
            <div className={styles.modal}>
                <h1>Upload a photo</h1>
                <input type="file" accept="image/*"></input>
            </div>
        </div>
    );
}