# Documentation - Anonymous HTML Hoster (NodeJs)

_This folder of this project contains the documentation of the entire application along with its working tutorials and screenshot images._

Anonymous HTML Hoster is a web application written in NodeJs (A Backend Javascript framework). The main purpose of this application is to serve people with a feature in which they can freely share their one page HTML files over the internet freely and also with a server or a required domain.

Some points about the hosting HTML files in this app are listed below, Kindly read through them :

* The application currently can host only single page HTML files, means we cannot get you a project root or a cloud folder-like server. The only thing this app does is that it can render the typed HTML codes into a web browser anonymously and remotely. We just need to type in the HTML codes in the textarea input field, and then click the upload button. After clicking the upload button, the specified HTML code is uploaded to the server. The web page then made by us can be available at the specified file-id URL.

* _fileId :_ Our app does not give the location of the new page in random, instead it asks for the fileId by the user. The file Id after being specified by the user is then verified by the backend, and if it is unique then the process of uploading is continued. The file Id is then used to check where is our file being hosted at. You can access your HTML document at the address _http://websitedomain/fileId_.

* Type proper HTML codes otherwise there might be errors in the working of the web page you create. Also note that the application can currenytly host a single page HTML document. So, make sure that the application you create is a single page HTML document and also the Javascript and CSS if included, then must be inside the main HTML document only.