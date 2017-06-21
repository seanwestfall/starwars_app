import React from 'react';
import ReactDOM from 'react-dom';
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
   constructor(props) {
     super(props);
     
     this.currentPage = 1;
     this.searchParameter = "";
     this.currentData;
     this.state = {value: 'people'};

     this.headerProps;
     this.bodyProps;


     this.handleChange = this.handleChange.bind(this);
     this.submitClick = this.submitClick.bind(this);

     this.prevClick = this.prevClick.bind(this);
     this.nextClick = this.nextClick.bind(this);
   }

   submitClick(e) {
      e.preventDefault();
      var self = this;

      $.get( "https://swapi.co/api/"+this.state.value+"/?search="+this.searchParameter+"&format=json&page="+this.currentPage, function( data ) {
          //setheader(Object.keys(data.results[0]));
          //displayData(Object.keys(data.results[0]), data);
        
          //currentData = data.results;
          self.headerProps = Object.keys(data.results[0]).map((key) =>
            <th>{key}</th>
          );

          console.log(data);

          self.bodyProps = data.results.map((result) =>
            <tr>{Object.keys(result).map((key) => <td>{result[key]}</td>)}</tr>
          );
          console.log(self.bodyProps);

          self.currentData = data.results;
          //console.log(data);

          self.setState({value: 'people'});
      });
   }

   handleChange(e) {
     this.setState({value: e.target.value});
   }

   prevClick(e) {
     e.preventDefault();
   }

   nextClick(e) {
     e.preventDefault();
   }

   render() {
      return (
         <div className='container'>
           <div className='row'>
              <div className='col-md-2 col-md-offset-5'>
                  <h1>Star Wars</h1>
                  <div className='form-group row'>
                    <label for="example-text-input" className='col-2 col-form-label'>Search</label>
                    <div className='col-10'>
                      <input className='form-control' type='text' value='' id='search'></input>
                    </div>
                  </div>
                  <div className='form-group row'>
                      <select value={this.state.value} className='custom-select' onChange={this.handleChange}>
                        <option value='people'>People</option>
                        <option value='films'>Films</option>
                        <option value='starships'>Starships</option>
                        <option value='vehicles'>Vehicles</option>
                        <option value='species'>Species</option>
                        <option value='planets'>Planets</option>
                      </select>
                  </div>
                  <button type='submit' id='submit' className='submit btn btn-primary' onClick={this.submitClick}>Submit</button>
              </div>
          </div>
          <div className='row'>
              <div className='col-md-12'>
                  <table className='table' id='table'>
                    <thead>
                      <tr>
                      {this.headerProps}
                      </tr>
                    </thead>
                    <tbody>
                      {this.bodyProps}
                    </tbody>
                  </table>
                  <button type='submit' id='prev' className='submit btn btn-primary' style={{float:'left'}}>Previous Page</button>
                  <button type='submit' id='next' className='submit btn btn-primary' style={{float:'right'}}>Next Page</button>
              </div>
          </div>
        </div>
      )
   }
}

export class Carousel extends React.Component {
   render() {
      return (
         <div>
         </div>
      )
   }
}

export class Favorites extends React.Component {
   render() {
      return (
         <div>
         </div>
      )
   }
}
