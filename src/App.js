import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from "./Home";
import Create from "./Create";
import View from "./View";

function App() {
    return (
        <Router>
            <div className="h-100 w-100">
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route path='/create'>
                            <Create />
                        </Route>
                        <Route path='/view/:id'>
                            <View />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}
  
export default App;
  