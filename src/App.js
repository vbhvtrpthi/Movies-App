import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourites from './Components/Favourites';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact render={(props) => (
          <>
          {/* Using render & passing inbuilt props in our mulitple component to enable routing on a single route which is '/' here*/}
            <Banner {...props} />
            <Movies {...props}/>

            {/* With the below syntax we can also send the props while routing */}
            {/* <Movies {...props} name="The SKy"/> */}
          </>
        )} />
        <Route path='/favourites' component={Favourites} />
      </Switch>
      {/* <Banner />
      <Movies />
      <Favourites /> */}
    </Router>
  );
}

export default App;
