import React, { Suspense } from "react";
import { Route, Switch} from "react-router-dom";
import Header from "./components/Layout/NavHeader";
import Loader from "./components/Layout/Loader";
import { useSelector } from "react-redux";


const UserForm = React.lazy(()=>import("./components/Auth/UserForm"));
const Chats = React.lazy(()=>import("./components/Chats/Chats"));

const App = () => {
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);

  return (
    <div className="app-interface">
      <Header/>
      <Suspense fallback={<Loader/>}>
        <Switch>
          <Route exact path='/auth'>
            {!isLoggedIn&&<UserForm/>}
          </Route>
          <Route exact path='/'>
            {!isLoggedIn&&<UserForm/>}
            {isLoggedIn&&<Chats/>}
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
