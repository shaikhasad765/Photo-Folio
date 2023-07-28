import loadingImage from "../image/loading.gif"
import css from "../CSS/LoadingPage.module.css"
export default function LoadingPage() {
    return (
        <div className={css.loadingPage}>
            <img src="{loadingImage}" alt="" />
            <p className={css.loadingText}>Loading...</p>
        </div>
    )
}