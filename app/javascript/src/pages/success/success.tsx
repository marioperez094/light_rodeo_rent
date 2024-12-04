//External Imports
import React from "react";

//Components
import HomeLayout from "@components/homeLayout/homeLayout";
import SuccessWidget from "@components/successWidget/successWidget";
import { ListBackground } from "@components/serviceList/ListBackground";

//Context
import { LanguageProvider } from "@context/language";

//Stylesheets
import "./success.scss";

class Success extends React.Component {
  render() {
    return(
      <LanguageProvider>
        <HomeLayout>
          <main
            id="main"
            role="Main"
          >
            <ListBackground>
              <SuccessWidget />
            </ListBackground>
          </main>
        </HomeLayout>
      </LanguageProvider>
    )
  }
};

export default Success;