import styles from './../../styles/button.module.css'
interface ButtonProps{
    text: string,
    buttonStyles?: {},
}
export default function Button(props:ButtonProps){
    return(
        <button style={props.buttonStyles} className={styles.mainContainer}>
            {props.text}
        </button>
    );
}