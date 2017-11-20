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
     //this.searchParameter = "";
     this.currentData;
     this.state = {value: 'people', searchParameter: ''};

     var self = this;

      $.get( "https://swapi.co/api/"+this.state.value+"/?search="+this.state.searchParameter+"&format=json&page="+this.currentPage, function( data ) {
          //setheader(Object.keys(data.results[0]));
          //displayData(Object.keys(data.results[0]), data);
        
          //currentData = data.results;
          var keys = Object.keys(data.results[0]);
          keys.unshift(''); // add an empty column for the save button

          self.headerProps = keys.map((key) =>
            <th>{key}</th>
          );

          console.log(data);

          self.bodyProps = data.results.map((result, index) =>
            <tr><td><button type={'submit'} id={index} className={'save btn btn-primary'} onClick={self.saveClick}>{'Save'}</button></td>{Object.keys(result).map((key) => <td>{result[key]}</td>)}</tr>
          );
          console.log(self.bodyProps);

          data.table = self.state.value;
          self.currentData = data;
          console.log('data', data);

          var N = (data.count - (data.count % 10)) / 10;
          var arrN = Array.apply(null, {length: N}).map(Number.call, Number);
          console.log(arrN);

          self.count = arrN.map((number) =>
            <li><a href={'#'}>{number}</a></li>
          );
          self.setState({value: 'people'});
      });

     this.headerProps;
     this.bodyProps;
     this.count;


     this.handleChange = this.handleChange.bind(this);
     this.submitClick = this.submitClick.bind(this);

     this.prevClick = this.prevClick.bind(this);
     this.nextClick = this.nextClick.bind(this);

     this.saveClick = this.saveClick.bind(this);
   }

   submitClick(e) {
      e.preventDefault();
      var self = this;

      $.get( "https://swapi.co/api/"+this.state.value+"/?search="+this.state.searchParameter+"&format=json&page="+this.currentPage, function( data ) {
          //setheader(Object.keys(data.results[0]));
          //displayData(Object.keys(data.results[0]), data);
        
          //currentData = data.results;
          var keys = Object.keys(data.results[0]);
          keys.unshift(''); // add an empty column for the save button

          self.headerProps = keys.map((key) =>
            <th>{key}</th>
          );

          console.log(data);

          self.bodyProps = data.results.map((result, index) =>
            <tr><td><button type={'submit'} id={index} className={'save btn btn-primary'} onClick={self.saveClick}>{'Save'}</button></td>{Object.keys(result).map((key) => <td>{result[key]}</td>)}</tr>
          );
          console.log(self.bodyProps);

          data.table = self.state.value;
          self.currentData = data;
          console.log('data', data);

          var N = (data.count - (data.count % 10)) / 10;
          var arrN = Array.apply(null, {length: N}).map(Number.call, Number);
          console.log(arrN);

          self.count = arrN.map((number) =>
            <li><a href={'#'}>{number}</a></li>
          );
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

   saveClick(e) {
     e.preventDefault();
     //console.log(e.target.getAttribute('id'));
     var targetId = e.target.getAttribute('id');
     var postData = this.currentData.results[targetId];
     postData.table = this.currentData.table;
     //console.log(selectedData);
     $.post( '/saveToFavorites', postData, function( data ) {
        console.log(data);
     });
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
                      <input className='form-control' type='text' value={this.state.searchParameter} ref='searchStringInput' onchange={this.handleChange} id='search'></input>
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
              <div className='col-md-12 searchTable' style={{overflowY: "scroll"}}>
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
                  <ul className='pagination' style={{float: 'right'}}>
                    {this.count}
                  </ul>
              </div>
          </div>
        </div>
      )
   }
}

export class Carousel extends React.Component {
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
                      <select value={'people'} className='custom-select' onChange={''}>
                        <option value='people'>People</option>
                        <option value='films'>Films</option>
                        <option value='starships'>Starships</option>
                        <option value='vehicles'>Vehicles</option>
                        <option value='species'>Species</option>
                        <option value='planets'>Planets</option>
                      </select>
                  </div>
                  <button type='submit' id='submit' className='submit btn btn-primary' onClick={''}>Submit</button>
              </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <div id="myCarousel" class="carousel slide" data-ride="carousel">

                <ol class="carousel-indicators">
                  <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                  <li data-target="#myCarousel" data-slide-to="1"></li>
                  <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>

                <div class="carousel-inner">
                  <div class="item active">
                    
                  </div>

                  <div class="item">
                    
                  </div>

                  <div class="item">

                  </div>  
                </div>

                <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                  <span class="glyphicon glyphicon-chevron-left"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#myCarousel" data-slide="next">
                  <span class="glyphicon glyphicon-chevron-right"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )
   }
}

export class Favorites extends React.Component {
    constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);


    this.tables;

    var self = this;

    $.get('/getFavorites', function(data) {

      var itemObj = {};
      data.forEach(function(item) {
        itemObj[item[0].table] = item;
      });
      console.log('itemObj', itemObj);
      
      var itemObjKeys = Object.keys(itemObj);

      self.tables = itemObjKeys.map((item) =>
        <FavoritesTable header={Object.keys(itemObj[item][0])} body={itemObj[item]} onChange={self.changeHandler}></FavoritesTable>
      );

      self.setState({});
    });
   }

   changeHandler(value) {
    console.log('called', value);
   }

   render() {
      return (
        <div className='container'>
         <div className='row'>
              <div className='col-md-12'>
                  {this.tables}
              </div>
          </div>
        </div>
      )
   }
}

export class FavoritesTable extends React.Component {
   constructor(props) {
    super(props);
    this.deleteClick = this.deleteClick.bind(this);
    this.saveClick = this.saveClick.bind(this);
    this.testClick = this.testClick.bind(this);

    var self = this;
    
    var keys = props.header;
    keys.unshift('');

    this.header = keys.map((key) =>
       <th>{key}</th>
    );

    var self = this;

    this.body = [];
    var colspan = props.header.length;
    var style = {width: '100%'};
    /*props.body.forEach(function(result, index) {
       self.body.push(<tr><td><button type={'button'} id={result['_id']} index={index} className={'delete btn btn-primary'} onClick={self.deleteClick}>{'Delete'}</button></td>{Object.keys(result).map((key) => <td>{result[key]}</td>)}</tr>);
       self.body.push(<tr><td>Notes:<button type={'button'} id={result['_id']} className={'save btn btn-primary'} onClick={self.saveClick}>{'Save'}</button></td><td colSpan={colspan}><textarea style={{width: '100%'}}></textarea></td></tr>);
    });*/
    
    this.body = props.body.map((result, index) =>
       <tr><td><button type={'button'} id={result['_id']} index={index} className={'delete btn btn-primary'} onClick={self.deleteClick}>{'Delete'}</button></td>{Object.keys(result).map((key) => <td>{result[key]}</td>)}</tr>
    );

    /*map((item) =>
      item + <tr><td>Notes:<button type={'button'} id={result['_id']} className={'save btn btn-primary'} onClick={self.saveClick}>{'Save'}</button></td><td colSpan={colspan}><textarea style={{width: '100%'}}></textarea></td></tr>
    );*/

    console.log('this.body', this.body);

    this.state = {
                    body : this.body,
                    header: this.header
                 };

    this.props = props;

    /*this.deleteClick = this.deleteClick.bind(this);
    this.saveClick = this.saveClick.bind(this);
    this.testClick = this.testClick.bind(this);*/
   }

   testClick(e) {
    console.log(this);
   }

   deleteClick(e) {

    console.log('this', this);
    var targetIndex = e.target.getAttribute('index');

    var newBody = this.body.splice(targetIndex, 1);

    this.setState({ body: newBody,
                      header: this.state.header });
   
    this.props.onChange(e.target.value);

    /*e.preventDefault();
    var self = this;
    console.log('this', this);
    console.log('self', self);

    var targetId = e.target.getAttribute('id');
    var targetIndex = e.target.getAttribute('index');*/
    //console.log('this', this);
    //var self = this;

    /*$.get('/deleteFavorite/'+targetId, function() {
      var newBody = self.body.split(index,1);
      this.setState({ body: newBody,
                      header: self.state.header });

      //console.log('self', self);
      //self.props.update();
      //self.setState({});
    });*/

    //this.setState();
   }

   saveClick(e) {
    var id = e.target.getAttribute('id');

    var postData = {};
    postData.id = id;
    postData.notes = "";

    console.log(this);

    /*$.post('/saveNotes', postData, function() {
      console.log('self', self);
      self.props.update();
      self.setState({});
    });*/
   }

   render() {
      return (
        <table className='table' id='table'>
          <thead>
            <tr>
              {this.state.header}
            </tr>
          </thead>
          <tbody>
              {this.state.body}
           </tbody>
        </table>
      )
   }
}

