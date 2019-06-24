var btnSubm=document.querySelector("#getData");
btnSubm.onclick=GetMap;


function GetMap() {
	var xhr = new XMLHttpRequest();
	 var lat=document.querySelector("#coordinatLat").value;
	var lon=document.querySelector("#coordinatLon").value;
	xhr.open("GET","https://static-maps.yandex.ru/1.x/?ll=" + lat + "," + lon + "&size=650,450&z=13&l=map", true);
xhr.responseType = 'blob';
xhr.onload = function(e) {
  if (this.status == 200) {
var blob = this.response;
document.getElementById("imageMap").src = window.URL.createObjectURL(blob);
  }
};
xhr.send();
	GetWeather();
}
function GetWeather() {
	 var lat=document.querySelector("#coordinatLat").value;
	var lon=document.querySelector("#coordinatLon").value;
    var xhr=new XMLHttpRequest();
    xhr.open("GET","http://api.openweathermap.org/data/2.5/find?lat=" + lon + "&lon=" + lat + "&units=metric&lang=ru&APPID=1cdbc21da91ce9eca0904dc17dd5aa66", true);
	xhr.onload=function(){
					
        var data=JSON.parse(xhr.responseText);
        var forHtml=data.list;
		
        if(forHtml.length>0){
            for(var i=0; i<forHtml.length; i++)
            {
                var newTr=document.createElement("tr");

                var newTh=document.createElement("th");
                newTh.setAttribute("scope","row");
                newTh.innerText=i+1;
                newTr.appendChild(newTh);

                var newTd1=document.createElement("td");
                newTd1.innerText=forHtml[i].name;
                newTr.appendChild(newTd1);

                var newTd2=document.createElement("td");
                newTd2.innerText=forHtml[i].weather[0].description;
                newTr.appendChild(newTd2);
													
				var newTd3=document.createElement("td");
                newTd3.innerText=forHtml[i].main.temp;
                newTr.appendChild(newTd3);

                var htmlTable=document.querySelector(".cityInfo");
                htmlTable.appendChild(newTr);
            }
        }
    }
    xhr.send();
};
