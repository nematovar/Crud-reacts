import "./header.css"
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function Header({LanguageChange , them , setThem}) {

    const { t } = useTranslation()

  return  <header className={them}>
     <div className="container">
      <div className="header_wrapper">
        <div className="header_content">
        <h1 className="title">{t('title')}</h1>
        </div>
        <div className="header_content">
         <div className="icons">
          <div className="content">
          {them === "light" ? (
                  <CiLight
                    className="light"
                    style={{
                      width: "25px",
                      height: "25px",
                    }}
                  />
                ) : (
                  <MdOutlineDarkMode
                    className="dark"
                    style={{
                      width: "25px",
                      height: "25px",
                      color: "white",
                      background: "none"
                    }}
                  />
                )}
           </div>
           <div className="content">
           <select className="select" value={them} onChange={((evt) => setThem(evt.target.value))}>
            <option value="light">light</option>
            <option value="dark">dark</option>
           </select>
           </div>
           <div className="content">
           <select onChange={LanguageChange} className="translate">
            <option value="eng">Англиский</option>
            <option value="rus">Русский</option>
           </select>
          </div>
         </div>
        </div>
      </div>
     </div>
    </header>
}
