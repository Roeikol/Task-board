(function() {

	var arrayOfNotes = [];

	addEventListener('load', function(e){
		loadLocalStorage();
		getForm();									
	});

	function loadLocalStorage(){
		notes = JSON.parse(localStorage.getItem('notes'));
		if(notes!==null){
			buileNotesFromStroage(notes);
		}
	}

	function buileNotesFromStroage(notes){
		for(var i = 0; i < notes.length; i++){
			addNote(notes[i]);
			saveToBackup(notes[i]);
		}
	}

	function getForm(){
		var form = document.querySelector('#form');
		form.addEventListener('submit', formSubmit);
	}

	function formSubmit(e){
		e.preventDefault();
		saveNote(e);
	}

	function saveNote(e){
		var task = event.target.querySelector('#input-text').value;
		if(task == "" || DateValidation(date)){
			createErrorText(); 
		}else{
			ErrorTextChecker();
			var date = dateReverse(e);
			var time = event.target.querySelector('input#time').value;
	    	document.querySelector("#form").reset();
			var noteObj = {
				task : task,
				date : date,
				time : time
			}
			saveToBackup(noteObj);
			addNote(noteObj);				
		}
	}

	function DateValidation(e){
		var date = event.target.querySelector('input#date').value;
		var DateArray = date.split("-");
		var year = DateArray[0];
		var month = DateArray[1];
		var day = DateArray[2];
		var userDate = new Date();
		userDate.setFullYear(year, month-1, day);
		var currentDate = new Date();
		currentDate.getFullYear();
		if(currentDate>userDate){
			return true; 
		}
	}

	function dateReverse(e){
		var date = event.target.querySelector('input#date').value;
		var tempArray = date.split("-");
		var tempYear = tempArray[0]
		var tempMonth = tempArray[1]
		var tempDay = tempArray[2]
		tempArray[0] = tempMonth;
		tempArray[1] = tempDay;
		tempArray[2] = tempYear;
		newDate = tempArray.join("/")
		return newDate;
	}

	function ErrorTextChecker(){
		if(document.querySelector('#error-text') !== null){
			var parent = document.querySelector('#date-time-stamp');
			parent.removeChild(document.querySelector('#error-text'));
			return;
		}
	}

	function createErrorText(){
		if(!ErrorTextChecker()){
			var newElement = document.createElement('p');
			newElement.setAttribute("id","error-text");
			newElement.textContent = "Oops something is wrong";
			printErrorText(newElement);
		}
	}

	function printErrorText(element){
		document.querySelector('#date-time-stamp').appendChild(element);
	}

	function buildNote(noteContent){

		var noteWrapper = document.createElement('div');
		noteWrapper.setAttribute('class', 'note-wrapper-invisible');

		var outputNote = document.createElement('div');
		outputNote.setAttribute('class', 'output-note');

		var noteDelete = document.createElement('div')
		noteDelete.setAttribute('class', 'note-delete');
		noteDelete.addEventListener('click', deleteNote);

		var noteBody = document.createElement('p');
		noteBody.setAttribute('class', 'note-body');
		noteBody.textContent = noteContent.task;

		var noteFooter = document.createElement('footer');
		noteFooter.setAttribute('class', 'note-footer');

		var noteDate = document.createElement('div');
		noteDate.setAttribute('class', 'note-date');
		noteDate.textContent = noteContent.date;

		var noteTime = document.createElement('div');
		noteTime.setAttribute('class', 'note-time');
		noteTime.textContent = noteContent.time;

		noteWrapper.appendChild(outputNote);
		outputNote.appendChild(noteDelete);
		outputNote.appendChild(noteBody);
		outputNote.appendChild(noteFooter);
		noteFooter.appendChild(noteDate);
		noteFooter.appendChild(noteTime);

		return noteWrapper;
	}

	function addNote(noteContent){
		var note = buildNote(noteContent);
		var notesContainer = document.querySelector('.notes-container');
		notesContainer.appendChild(note);
		setTimeout(function(){  
		  	note.classList.add("note-wrapper-visible");
		  	},0);
	}

	function saveToBackup(note){
		arrayOfNotes.push(note);
		localStorage.setItem('notes', JSON.stringify(arrayOfNotes));
	}

	function deleteNote(e){
		var note = e.target.parentNode.parentNode;
		note.classList.remove("note-wrapper-visible");
		setTimeout(function(){
	  	note.remove();
	    },1500);
		deleteNoteFromStorage(note);
	}

	function deleteNoteFromStorage(note){
		var index = Array.from(document.querySelectorAll('.note-wrapper-invisible')).indexOf(note);
		arrayOfNotes.splice(index,1);
		updateLocalStorage();
	}

	function updateLocalStorage(){
		localStorage.setItem('notes', JSON.stringify(arrayOfNotes));
	}
})();