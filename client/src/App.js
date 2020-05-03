import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'reactstrap';
import './App.css';
import AppNavbar from './components/AppNavbar';
import MovieList from './components/MovieList';
import { loadUser } from './Actions/authActions';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import ItemModal from './components/ItemModal';



class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <MovieList />
          </Container>
          <div className="flex-container">
           
          </div>
          
        </div>
      </Provider>
    );
  }
  
}

export default App;
