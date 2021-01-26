import "./App.css";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import { Component } from "react";

class App extends Component {
    state = {
        show: true,
    };

    componentDidMount() {
    }

    render() {
        return <Layout>{this.state.show ? <BurgerBuilder /> : null}</Layout>;
    }
}

export default App;
