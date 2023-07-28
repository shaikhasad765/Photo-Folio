import css from "../CSS/NavBar.module.css"
import logo from "../image/logo.png"
import home from "../image/home.png"

export default function NavBar(props) {
    const { helper, homeBtnHandler } = props;

    return <div className={css.navBar}>
        <div className={css.logo}>
            <img src={logo} alt="" />
            <span>Photo-Folio</span>
        </div>
        {helper ?
            <div children={css.albumNameContainer} onClick={homeBtnHandler}>
                <span className={css.albumName}>{helper.name} </span>
                <img className={css.home} src={home} alt="" />
            </div>
            : ""}

    </div>
}