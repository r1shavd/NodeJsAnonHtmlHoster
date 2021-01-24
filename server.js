/*
Anonymous HTML Hoster (NodeJs)

It is a web application made using the NodeJs framework using express.js, and it serves the purpose of sharing of the HTML documents anonymously and also there is a feature of linking it with another CSS and JS files. We also are no required to login or authenticate ourself for this purpose, we can do it anonymously.

Author : Rishav Das
*/

// Importing the required modules
const FS = require('fs');
const EXPRESS = require('express');
const BODY_PARSER = require('body-parser');

// Creating the express.js powered web app object
const app = EXPRESS();

// Setting the veiw engine (template rendering) to ejs
// Note that the default directory location for the ejs files is 'views/'
app.set('view engine', 'ejs');

// Adding the '/scripts' directory as the static for our express app
app.use(EXPRESS.static('scripts'));

// Defining some of the properties for the POST requests and other body parser properties
app.use(BODY_PARSER.urlencoded({ extended: true }));
app.use(BODY_PARSER.json());

// Defining the endpoints of the web application
//
// For index (/) endpoint
app.get('/', (request, response) => {
	/* The function that serves the response when there is a GET request on the '/' URL of the web app. The function renders the index.ejs file to the client. The index.ejs file contains forms required to upload the HTML docs to the server. */

	return response.render('index');
});
app.post('/', (request, response) => {
	/* The function which serves the response when there is a POST request on the '/' URL of the web app. The function first checks the reason for the request, and then serves the requested work. */

	// Getting the reason of the POST request
	const reason = request.body.reason;

	if (reason == 'check') {
		// If the reason of the POST request is to check wheter the same user specifed file Id exists on the server or not

		// Getting the user specified file Id through the POST request data
		const fileId = request.body.fileId;

		try {
			// Reading the data.json file for checking the data
			let data = FS.readFileSync(__dirname + '/data.json');
			data = JSON.parse(data);
			for (let item of data) {
				// Iterating over each data

				if (item.fileId == fileId) {
					// If the user specified file Id already exists in the server data files, then we return 'true'

					return response.send('true');
				}
			}

			// If we are out of the loop without, then we can say that the user specified file Id does not exists in the datafiles, so we return 'false'
			return response.send('false');
		} catch(error) {
			// If there is any error during the execution of the process, then we return that error back to the user

			return response.send(`${error}`);
		}
	} else if (reason == 'upload') {
		// If the reason for the POST request is to upload the file finally, then we upload it

		// Getting the required POST request data
		const htmlData = request.body.htmlData;
		const fileId = request.body.fileId;

		// Writing the HTML file's data into the server's files
		try {
			FS.writeFileSync(__dirname + `/media/html/${fileId}`, htmlData);

			// Writting data entry into the data.json file
			let data = FS.readFileSync(__dirname + '/data.json');
			data = JSON.parse(data);
			data.push({fileId : fileId});
			FS.writeFileSync(__dirname + '/data.json', JSON.stringify(data));
		} catch(error) {
			// If there is an error during the process, then we return back to the client side

			return response.send('error');
		}

		// If we get out of that try..catch... block, then there are no errors in the process
		return response.send('success');
	} else if (reason == 'contact') {
		// If the reason for the POST request on this endpoint is to submit a new contact request, then we continue to complete the process

		// Getting the required POST request data
		const title = request.body.title;
		const content = request.body.content;
		const email = request.body.email;

		try {
			// Getting the existing data in the contactRequests.json file
			let data = FS.readFileSync(__dirname + '/contactRequests.json');
			data = JSON.parse(data);
			
			// Adding the new contact request data to the main data array
			data.push({
				title : title,
				content : content,
				email : email
			});

			// Saving the data back to the file
			FS.writeFileSync(__dirname + '/contactRequests.json', JSON.stringify(data));

			// If the processes are executed without an error, then we return an 'success' message
			return response.send('success');
		} catch(error) {
			// If there are any errors raised during the process, then we return the error message back to the client side. (Note that on the client side javascript, we need proper handling of the response for this part)

			return response.send(error);
		}
	} else {
		// If there is no reason specified for this purpose, then we return an error to the user as a response

		return response.send('error');
	}
});

// Endpoint to listen at /:fileId
app.get('/:fileId', (request, response) => {
	/* The function to serve the response when there is a GET request at the /:fileId URL of the web app. The function loads the requested file Id (uploaded HTML file) to the web browser as per specified in the URL params. */

	// Getting the data from the URL parameters
	let fileId = request.params.fileId;

	// Checking wheter the fileId exists or not in the server
	try {
		let data = FS.readFileSync(__dirname + '/data.json');
		data = JSON.parse(data);

		// Iterating over each data items
		for (let item of data) {
			if (item.fileId == fileId) {
				// If the file Id matches, then we start serving the HTML document back to the user

				data = FS.readFileSync(__dirname + `/media/html/${fileId}`);
				return response.end(data);
			}
		}

		// If we get out of the loop, this means that the requested file Id doesn not exists in the server database, so we return 404 page back to the user
		return response.render('404');
	} catch(error) {
		// If there are any errors during the process, then we render the server failure page

		return response.render('server-failure');
	}
});

// Making the application to listen at port 8000
app.listen(8000, () => {
	console.log('NodeJsAnonHtmlHoster running and listening to connections at port 8000');
});