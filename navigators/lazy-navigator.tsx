import SplashScreen from "../shared/components/splash-screen"
import React, { ReactElement } from "react";


export default ({ loading, render }) => {
    if(loading)
      return <SplashScreen />
    else
      return render();
}