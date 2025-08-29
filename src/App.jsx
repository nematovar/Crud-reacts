import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import i18n from "i18next" ;
import { initReactI18next } from "react-i18next"
import translationEng from "./i18n/translationEng";
import translationRus from "./i18n/translationRus";
import { useEffect, useState } from "react";
import Item from "./Home/Item";

i18n.use(initReactI18next).init({
  resources: {
   eng: {
    translation: translationEng , 
   } ,
   rus: {
    translation: translationRus ,
   },
  },
  lng: "eng" ,
  fallbackL: "eng" ,
})

export default function App() {
  const [them, setThem] = useState('lighte')

  useEffect(() => {
    document.body.className = them;
  }, )

 const LanguageChange = (e) => {
  i18n.changeLanguage(e.target.value);
 }

  return (
    <>
     <Header LanguageChange={LanguageChange} them={them} setThem={setThem}/>
     <Item />
     <Footer />
    </>
  )
}
