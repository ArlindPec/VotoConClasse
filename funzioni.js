/* Author: Arlind Pecmarkaj. Note that the variables and the comments are in Italian */

function voto(valore, data, note){
	this.valore = valore;
	this.data = data;
	this.note = note;
}

var a, b;
var media = new Array(0.0, 0.0, 0.0, 0.0, 0.0, 0.0);

function addVoto(){
	var indexMateria = document.getElementById("materia").selectedIndex;
	var tmpMateria = document.getElementById("materia").options.item(indexMateria).text;
	var tmpVoto = parseFloat(document.getElementById("voto").value);
	var tmpData = document.getElementById("data").value;
	var tmpNote = document.getElementById("note").value;
	var i=0, j=0;//materie e voti rispettivamente
	var strTable = "<table class= \"registro\" border=\"1px\">";
	var endStrTable = "</table>";
	
	if(tmpVoto <= 1.0){//controllo se mi passano valori accettabili
		tmpVoto = 1.0;
	}else if(tmpVoto >=10.0){
		tmpVoto = 10.0;
	}
	
	if(voti[indexMateria] == 0){
		voti[indexMateria] = new Array();
		voti[indexMateria].push(tmpMateria);
	} else {
		voti[indexMateria].push(new voto(tmpVoto, tmpData, tmpNote));
	}
	
	for (i=0; i<voti.length; i++){
		for(j=0;j<voti[i].length; j++){
			if(j == 0){
				strTable += "<td class=\"primo\" bgcolor=\"#E5E5E5\" onclick=\"calcolaMedia("+i+","+voti[i].length+");\">" + voti[i][j] + "</td>";
			} else {
				if(voti[i][j].valore <= 5.75 ){
					strTable += "<td class=\"cella\" id=\"cella["+i+"]["+j+"]\" onmouseover=\"showInfo("+i+","+j+");\" onclick=\"showChangeInputBox("+i+","+j+");\" bgcolor=\"#FF0000\">" + voti[i][j].valore + "</td>";
				} else {
					strTable += "<td class=\"cella\" id=\"cella["+i+"]["+j+"]\" onmouseover=\"showInfo("+i+","+j+");\" onclick=\"showChangeInputBox("+i+","+j+");\" bgcolor=\"#00CE00\">" + voti[i][j].valore + "</td>";
				}
				media[indexMateria] += voti[i][j].valore ;
			}	
		}
		strTable += "</tr>";
	}
	document.getElementById("tabella").innerHTML = strTable + endStrTable;
}

function showInfo(a, b){
	var str = "";
	str += "Voto = "+voti[a][b].valore+"<br>";
	str += "Data = "+voti[a][b].data+"<br>";
	str += "Note = "+voti[a][b].note+"<br>";
	document.getElementById("info").innerHTML = str;
}

function showChangeInputBox(a, b){
	var str ="<input type=\"text\" id=\"nuovoVoto\">";
	str +="<button type=\"button\" onclick=\"modificaVoto("+a+","+b+");\">Modifica voto</button>";
	document.getElementById("modifica").innerHTML = str;
}
function modificaVoto(a,b){
	var newVoto = parseFloat(document.getElementById("nuovoVoto").value);
	voti[a][b].valore = newVoto;
	if (newVoto <= 5.75){
		document.getElementById("cella["+a+"]["+b+"]").style.backgroundColor = "#FF0000";
	} else {
		document.getElementById("cella["+a+"]["+b+"]").style.backgroundColor = "#00CE00";
	}
	document.getElementById("cella["+a+"]["+b+"]").innerHTML = newVoto ;
	document.getElementById("modifica").innerHTML = "";
}
