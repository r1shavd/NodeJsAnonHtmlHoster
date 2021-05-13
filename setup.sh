# ----
# Setup script - Anonymous Html Hoster
#
# The script for automating certain regular tasks for the repository/project. The script is written in bash scripting (shell scripting). The script can serve to automate the following functions : (1) Setting up the directory (repository) for pushing to a remote GIT server or production deployment, (2) Setting up the entire repository on a new environment.
# Dependencies : git cli tool (package), nodejs, express.js (framework for web app backend), ejs (for frontend template).
#
# Author : Rishav Das (https://github.com/rdofficial/)
# Created on : May 12, 2021
#
# Last modified by : -
# Last modified on : -
#
# ----

# Defining the ANSII color code variables for colored output
RED="\033[91m"
GREEN="\033[92m"
YELLOW="\033[93m"
BLUE="\033[94m"
RED_REV="\033[07;91m"
YELLOW_REV="\033[07;93m"
DEFCOL="\033[00m"

# Getting the directory location for the current execution of the script
DIR=$( dirname $0 )

# Checking the user entered arguments
if [[ $1 == "for-push" ]] || [[ $1 == "for-deploy" ]] || [[ $1 == "for-deployment" ]]; then
	# If the user entered the argument to setup the project / repository for a push, then we continue doing it

	# Displaying the current task on the console screen
	echo -e "\n==========${RED}[ ${YELLOW}SETTING THE REPOSITORY FOR A PUSH / DEPLOYMENT ${RED}]${DEFCOL}==========\n"

	# Removing the contents of the data.json file
	echo -e "==========[ ${BLUE}Cleaning the data.json file${DEFCOL} ]=========="
	if [[ -f $DIR/data.json ]]; then
		# If the data.json file exists, then we continue

		echo "[]" > data.json
		echo -e "${GREEN}[${DEFCOL} Cleaned data.json file ${GREEN}]${DEFCOL}"
	else
		# If the data.json is not found at the current active directory, then we display the error on the console screen

		echo -e "\n${RED_REV}[ Error : data.json file not found, either at wrong location or file not created yet ]${DEFCOL}"

		# Asking the user wheter to create a blank data.json file here or not
		echo -e ""
		read -p "Create a blank data.json file in the current working directory ($( pwd )). Enter your choice (yes/no) : " choice
		if [[ $choice == "yes" ]] || [[ $choice == "y" ]] || [[ $choice == "YES" ]] || [[ $choice == "Y" ]]; then
			# If the user entered the choice for creating a blank data.json file, then we continue

			echo "[]" > data.json
			echo -e "${GREEN}[${DEFCOL} Created a new blank file data.json ${GREEN}]${DEFCOL}"
		else
			# If the user entered the choice for not creating a blank data.json file

			echo -e "${RED}[${DEFCOL} Skipped creating / cleaning data.json file ${RED}]${DEFCOL}"
		fi
	fi

	# Removing the user uploaded files in the media/html/ directory (These files are dummy files that are uploaded on the application during the tests and debugging).
	echo -e "==========[ ${BLUE}Cleaning the media/html/ sub-directory${DEFCOL} ]=========="
	if [[ -d $DIR/media/html ]]; then
		# If the media/html/ directory exists in the current working directory, then we continue

		rm -f $DIR/media/html/* && touch $DIR/media/html/.gitkeep
		echo -e "${GREEN}[${DEFCOL} Cleaned the media/html/ sub-directory ${GREEN}]${DEFCOL}"
	else
		# If the media/html/ directory does not exists in the current working directory, then we display the error message on the console screen

		echo -e "\n${RED_REV}[ Error : media/html/ file not found, either at wrong location or directory not created yet ]${DEFCOL}"

		# Asking the user wheter to create a blank data.json file here or not
		echo -e ""
		read -p "Create a blank sub-directory (media/html/) in the current working directory ($( pwd )). Enter your choice (yes/no) : " choice
		if [[ $choice == "yes" ]] || [[ $choice == "y" ]] || [[ $choice == "YES" ]] || [[ $choice == "Y" ]]; then
			# If the user entered the choice for creating a blank data.json file, then we continue

			# Creating the media/html/ sub-directory as per the existence of the media/ directory
			if [[ -d $DIR/media/ ]]; then
				# If the media/ directory exists, then we create the media/html/ sub-directory directly

				mkdir media/html/ && touch media/html/.gitkeep
			else
				# If the media/ directory does not exists, then we first create a media/ directory and then proceed to create the media/html/ sub-directory

				mkdir media media/html/ && touch media/html/.gitkeep
			fi
			echo -e "${GREEN}[${DEFCOL} Created a new empty media/html/ sub-directory ${GREEN}]${DEFCOL}"
		else
			# If the user entered the choice for not creating a blank data.json file

			echo -e "${RED}[${DEFCOL} Skipped creating / cleaning media/html/ sub-directory ${RED}]${DEFCOL}"
		fi

	# Displaying the task executed message on the console screen
	echo -e "${YELLOW}[ ${GREEN}Repository set for push / deployment${DEFCOL} : Cleaned the unrequired items and now the repository is ready to be pushed for a commit, or deployment ${YELLOW}]${DEFCOL}"
	fi
elif [[ $1 == "for-developement" ]] || [[ $1 == "for-dev" ]] || [[ $1 == "set-environment" ]] || [[ $1 == "set-env" ]]; then
	# If the user entered the argument to setup the environment for this repository / project either for developement, then we continue

	# Displaying the current task on the console screen
	echo -e "\n==========${RED}[ ${YELLOW}SETTING THE ENVIRONMENT FOR DEVELOPEMENT ${RED}]${DEFCOL}==========\n"

	# Checking wheter nodejs and npm is installed or not
	echo -e "==========[ ${BLUE}Checking nodejs and npm${DEFCOL} ]=========="
	if [[ -z $( which nodejs ) ]]; then
		# If the nodejs package is not installed, then we continue to install it

		apt install nodejs
		echo -e "${GREEN}[${DEFCOL} Installed nodejs package ($( which nodejs ))${GREEN}]${DEFCOL}"
	fi
	if [[ -z $( which npm ) ]]; then
		# If the npm package is not installed, then we continue to install it

		apt install npm
		echo -e "${GREEN}[${DEFCOL} Installed npm package ($( which npm ))${GREEN}]${DEFCOL}"
	fi

	# Installing all the required npm dependencies listed in the package.json file
	echo -e "==========[ ${BLUE}Installing all the npm dependencies${DEFCOL} ]=========="
	if [[ -f $DIR/package.json ]]; then
		# If the package.json file exists in the present working directory, then we continue to install all the required dependencies

		npm install
		echo -e "${GREEN}[${DEFCOL} All the required npm dependencies are installed ${GREEN}]${DEFCOL}"
	else
		# If the package.json file exists in the present working directory, then we display the error message on the console screen

		echo -e "\n${RED_REV}[ Error : package.json configuration file does not exist in the current working directory ($( pwd )) ]${DEFCOL}"
		exit 1
	fi

	# Displaying the task executed message on the console screen
	echo -e "${YELLOW}[ ${GREEN}Environment set for developement${DEFCOL} : Checked / installed all the required packages (nodejs, npm, etc) and the dependencies ${YELLOW}]${DEFCOL}"
else
	# If the user entered argument is not recognized, then display the help menu on the console screen

	echo -e "
==========[ HELP - Setup script for Anonymous Html Hoster ]==========

This script serves the feature to set up the repository (directory) for certain tasks like pushing to a remote repository, production deployment, or for developement purposes. This script is written in bash (shell) scripting language. To use the script, launch the script with specifying the tasks through certain arguments. The arguments that are accepted by the script are listed below :

[ Syntax : bash setup.sh <argument> ]

1. for-push / for-deployment / for-deploy - The argument for setting the repository for a GIT push / production deployment.
2. for-developement / for-dev / set-environment / set-env - The argument for setting the developement environment of the repository.

For more information, check out the docs of this repository (project)."
fi