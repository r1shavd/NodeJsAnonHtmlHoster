/*
Javascript for the Index page - Anonymous HTML Hoster (NodeJs)

Things done here are listed below :
1. Verification of the user entered file Id and the uploaded Html input data.
2. Sending of the POST request to the server and returning back the output result of the process back to the user.
3. Adding the onclick form submission for the contact form.

Author : Rishav Das
*/

// Adding an onclick event listener to the upload button
const uploadBtn = document.getElementById('upload-btn');
uploadBtn.addEventListener('click' ,(e) => {
	/* The function to be called when the user clicks on the upload button, the function reads the user inputs and then verifies them and finally sends a POST request to the server. */

	e.preventDefault();

	// Getting the input HTML elements from the document
	const fileIdInput = document.querySelector('input[name="file-id"]');
	const htmlDataInput = document.querySelector('textarea[name="html-input"]');
	const uploadFormErrorText = document.getElementById('uploaduploadFormErrorText');

	// Verifying the fileIdInput
	if (/[a-zA-Z0-9]{5,30}/.test(fileIdInput.value) && fileIdInput.value.includes(' ') == false) {
		// If the user entered file Id passes the regex test and also does not contains whitespaces, then we continue to verify it on the server side

		// Sending a POST request to check wheter the same fileId exists or not
		let data = JSON.stringify({fileId : fileIdInput.value, reason : 'check'});
		fetch('/', {body : data, method : 'post',  headers : {'Accept': 'application/json', 'Content-Type' : 'application/json'}}).then(response => response.text()).then(response => {
			// Checking the response from the server
			if (response == 'true') {
				// If the response from the server states 'true', then we can assume that the same file Id exists at the server

				throw Error('Same file Id exists, please choose another one');
			} else if (response == 'false') {
				// If the response from the server states 'false', then we can assume that the file Id is valid and now we continue the process

				// Checking the HTML input text area field
				if (htmlDataInput.value.length > 10) {
					// If the user entered HTML data is valid and long enough, then we continue to upload the HTML data

					// Creating the data for the POST request
					data = JSON.stringify({fileId : fileIdInput.value, htmlData : htmlDataInput.value, reason : 'upload'});

					// Sending a POST request to the server in order to upload the user written HTML document
					fetch('/', {body : data, method : 'post',  headers : {'Accept': 'application/json', 'Content-Type' : 'application/json'}}).then(response => response.text()).then(response => {
						// Checking the response from the server

						if (response == 'success') {
							// If the response from the server states 'success', then we continue to show the user that the file has been uploaded

							alert(`Success : The specified HTML is uploaded at /${fileIdInput.value}`);
							fileIdInput.value = '';
							htmlDataInput.value = '';
						} else {
							// If the response from the server states anything other than 'success', then we assume that the operation of the uploading HTML data resulted in failure, and we say by raising an error

							throw Error('Failed to upload the HTML data, please try again later')
						}
					}).catch(error => {
						// If there are errors in the process, then we display the error back to the user using the uploadFormErrorText field

						uploadFormErrorText.innerText = `Error : ${error.message}`;
						uploadFormErrorText.style.display = 'block';
					});
				} else {
					// If there is an error in writting the required HTML data by the user, then we return an error

					alert('Error : Please enter proper HTML data in the input field');
					return 0;
				}
			} else {
				// If the response from the server is anything else than true or false, then we raise an error

				console.log(response);
				throw Error('There was an error response from the server, please check the console')
			}
		}).catch(error => {
			/* If there are any errors in the process, then we write it in the uploadFormErrorText */
			
			uploadFormErrorText.innerText = `Error : ${error.message}`;
			uploadFormErrorText.style.display = 'block';
		});
	} else {
		// If the user entered file Id does not passes the regex test, then we tell the error back to the user

		uploadFormErrorText.innerText = 'Error : Please choose a proper alphanumeric file Id ranging from 5 to 30 characters';
		uploadFormErrorText.style.display = 'block';
	}
});

// Adding an onclick event listener to the contact-submit-btn
const contactFormSubmitBtn = document.getElementById('contact-submit-btn');
contactFormSubmitBtn.addEventListener('click', (e) => {
	/* The function to be called when the user clicks the contact submit button. The function first reads the user inputs and then sends a POST request to the backend at /contact */

	e.preventDefault();

	// Getting the input HTML elements
	const titleInput = document.querySelector('input[name="contact-request-title"]');
	const contentInput = document.querySelector('textarea[name="contact-request-content"]');
	const userEmailInput = document.querySelector('input[name="contact-request-email');
	const contactFormErrorText = document.getElementById('contactFormErrorText');

	// Verifying the user entered data
	if (/[a-zA-Z0-9]{5,30}/.test(titleInput.value)) {
		// If the contact request title entered by the user is verified by the regex test, then we proceed to check the content entered by the user

		if (contentInput.value.length > 10) {
			// If the user entered content for the contact request contains more than 10 characters, then we proceed for the POST request

			// Sending the POST request
			let data = JSON.stringify({title : titleInput.value, content : contentInput.value, email : userEmailInput.value, reason : 'contact'});
			fetch('/', {body : data, method : 'post',  headers : {'Accept': 'application/json', 'Content-Type' : 'application/json'}}).then(response => response.text()).then(response => {
				/* Checking the response from the server after the POST request is successfully sent */

				if (response == 'success') {
					// If the response states 'success', then we can assume that the POST request resulted in success

					alert('Contact request sent successfully!');
					location.reload();  // Refreshing the page after the alert message is closed by the user
				} else {
					// If the response from the server states anything other than the success term, then we throw an error

					throw Error(response);
				}
			}).catch(error => {
				/* If there is an error in the process, then we display the error using the contactFormErrorText */

				contactFormErrorText.innerText = `Error : ${error.message}`;
				contactFormErrorText.style.display = 'block';
			});
		} else {
			// If the user entered content for the contact request is not of specified character length, then we display the error to the user via the contactFormErrorText

			contactFormErrorText.innerText = `Error : Please enter proper description (content) for your contact request`;
			contactFormErrorText.style.display = 'block';
		}
	} else {
		// If the user entered title for the contact request does not passes the regext test, then we display the error to the user via the contactFormErrorText

		contactFormErrorText.innerText = `Error : Please provide title for your contact request`;
		contactFormErrorText.style.display = 'block';
	}
});