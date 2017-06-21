import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import {Search,Carousel,Favorites} from './app.jsx';
import { HashRouter, BrowserRouter, Switch, Link, Route } from 'react-router-dom';

ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('app'))

$( document ).ready(function() {
	var currentPage = 1;
	var searchParameter;
	var currentData;

	function submitClick() {
		var selectVal = $('.custom-select').val();
		
		var swapiMap = {
			1: 'people',
			2: 'films',
			3: 'starships',
			4: 'vehicles',
			5: 'species',
			6: 'planets'
		}

		var searchParameter = $('#search').val();

		switch(selectVal) {
			case '1':
				$.get( "https://swapi.co/api/people/?search="+searchParameter+"&format=json&page="+currentPage, function( data ) {
				  setheader(Object.keys(data.results[0]));
				  displayData(Object.keys(data.results[0]), data);

				  currentData = data.results;
				});
				break;
			case '2':
				$.get( "https://swapi.co/api/films/?search="+searchParameter+"&format=json&page="+currentPage, function( data ) {
				  setheader(Object.keys(data.results[0]));
				  displayData(Object.keys(data.results[0]), data);
				
				  currentData = data.results;
				});
				break;
			case '3':
				$.get( "https://swapi.co/api/starships/?search="+searchParameter+"&format=json&page="+currentPage, function( data ) {
				  setheader(Object.keys(data.results[0]));
				  displayData(Object.keys(data.results[0]), data);
				
				  currentData = data.results;
				});
				break;
			case '4':
				$.get( "https://swapi.co/api/vehicles/?search="+searchParameter+"&format=json&page="+currentPage, function( data ) {
				  setheader(Object.keys(data.results[0]));
				  displayData(Object.keys(data.results[0]), data);
				
				  currentData = data.results;
				});
				break;
			case '5':
				$.get( "https://swapi.co/api/species/?search="+searchParameter+"&format=json&page="+currentPage, function( data ) {
				  setheader(Object.keys(data.results[0]));
				  displayData(Object.keys(data.results[0]), data);
				
				  currentData = data.results;
				});
				break;
			case '6':
				$.get( "https://swapi.co/api/planets/?search="+searchParameter+"&format=json&page="+currentPage, function( data ) {
				  setheader(Object.keys(data.results[0]));
				  displayData(Object.keys(data.results[0]), data);
				
				  currentData = data.results;
				});
				break;
			default:
		}
	}
	//$( '#submit' ).on('click', submitClick);

	// $( 'body' ).on('click', '#submit', submitClick);

	$( '#next' ).on('click', function() {
		currentPage++;
		submitClick();
	});


	$( '#prev' ).on('click', function() {
		currentPage--;
		submitClick();
	});

	$( 'body' ).on('click', '.save', function(event) {
		var targetId = $(event.currentTarget).attr('data-id');
		console.log(currentData[targetId]);
		var postData = currentData[targetId]
		$.post( '/saveToFavorites', postData, function( data ) {
			console.log(data);
		});
	});

	$( '#favorites' ).on('click', function() {
		$.get('/getFavorites', function(data) {
			console.log(data);
		});
	});

	function setheader(headers) {
		$('#table').prev().remove();
		$('#table').before("<div style='float:left'>Page: "+currentPage+"</div>");
		$('#table').empty();
		$('#table').append('<thead><tr></tr></thead>');
		$thead = $('#table > thead > tr:first');
		$thead.append("<th>" + "" + "</th>");
		headers.forEach(function(val) {
			//var row = header.insertRow(0);
			//var cell = row.insertCell(0);
			$thead.append("<th>" + val + "</th>");
    	});
	}

	function displayData(headers, data) {
		console.log(data);
		$('#table').append('<tbody></tbody>');
		data.results.forEach(function(val, index) {
			$('#table > tbody').append('<tr></tr>');
			$tr = $('#table > tbody > tr:last');
			$tr.append("<td class='saveBtn'><button type='submit' class='save submit btn btn-primary' style='float:left' data-id="+index+">Save</button></td>");
			headers.forEach(function(header) {
					$tr.append("<td class="+ header+ ">" + val[header] + "</td>");
			});
		});
	}
});
