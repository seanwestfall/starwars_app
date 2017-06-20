$( document ).ready(function() {
	var currentPage = 1;
	var searchParameter;

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
				});
				break;
			case '2':
				$.get( "https://swapi.co/api/films/?search="+searchParameter+"&format=json&page="+currentPage, function( data ) {
				  setheader(Object.keys(data.results[0]));
				  displayData(Object.keys(data.results[0]), data);
				});
				break;
			case '3':
				$.get( "https://swapi.co/api/starships/?search="+searchParameter+"&format=json&page="+currentPage, function( data ) {
				  setheader(Object.keys(data.results[0]));
				  displayData(Object.keys(data.results[0]), data);
				});
				break;
			case '4':
				$.get( "https://swapi.co/api/vehicles/?search="+searchParameter+"&format=json&page="+currentPage, function( data ) {
				  setheader(Object.keys(data.results[0]));
				  displayData(Object.keys(data.results[0]), data);
				});
				break;
			case '5':
				$.get( "https://swapi.co/api/species/?search="+searchParameter+"&format=json&page="+currentPage, function( data ) {
				  setheader(Object.keys(data.results[0]));
				  displayData(Object.keys(data.results[0]), data);
				});
				break;
			case '6':
				$.get( "https://swapi.co/api/planets/?search="+searchParameter+"&format=json&page="+currentPage, function( data ) {
				  setheader(Object.keys(data.results[0]));
				  displayData(Object.keys(data.results[0]), data);
				});
				break;
			default:
		}
	}
	$( '#submit' ).on('click', submitClick);

	$( '#next' ).on('click', function() {
		currentPage++;
		submitClick();
	});


	$( '#prev' ).on('click', function() {
		currentPage--;
		submitClick();
	});


	function returnJson(cat) {
		$.get( "http://swapi.co/api/"+cat+"/?format=json", function( data ) {
			setheader(["name","climate","diameter","gravity","population"]);
			displayData(["name","climate","diameter","gravity","population"], data);
		});
	}

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
		data.results.forEach(function(val) {
			$('#table > tbody').append('<tr></tr>');
			$tr = $('#table > tbody > tr:last');
			$tr.append("<td class='saveBtn'><button type='submit' id='save' class='submit btn btn-primary' style='float:left'>Save</button></td>");
			headers.forEach(function(header) {
					$tr.append("<td class="+ header+ ">" + val[header] + "</td>");
			});
		});
	}
});
