import React from 'react';
import { HashRouter, BrowserRouter, Switch, Link, Route } from 'react-router-dom';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Search}/>
      <Route path='/carousel' component={Carousel}/>
      <Route path='/favorites' component={Favorites}/>
    </Switch>
  </main>
)

const Header = () => (
  <header>
    <nav className='container'>
      <ul className='nav nav-tabs'>
        <li className='active'><Link to='/'>Search</Link></li>
        <li><Link to='/Carousel'>Carousel</Link></li>
        <li><Link to='/Favorites'>Favorites</Link></li>
      </ul>
    </nav>
  </header>
)

class App extends React.Component {
   render() {
      return (
        <div>
          <Header />
          <Main />
        </div>
      )
   }
}

export default App;

export class Search extends React.Component {
   render() {
      return (
         <div>
            <h1>Search...</h1>
         </div>
      )
   }
}

export class Carousel extends React.Component {
   render() {
      return (
         <div>
            <h1>Carousel...</h1>
         </div>
      )
   }
}

export class Favorites extends React.Component {
   render() {
      return (
         <div>
            <h1>Favorites...</h1>
         </div>
      )
   }
}
