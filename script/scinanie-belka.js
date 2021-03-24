//Ścinanie w belce
//Definicja zmiennych - odwoływać się do obiektu, a nie od razu do właściwości
function angleDegree(degree) {
  let angle = 2 * Math.PI * degree / 360;
  return angle;
}

let numberOfVariables = document.querySelectorAll(".calculationData").length;
const variables = document.querySelectorAll("input.calculationData");
let heightOfBeam_h = document.querySelector("[name=heightOfBeam_h]");
let widthOfBeam_bw = document.querySelector("[name=widthOfBeam_bw]");
let distanceToReinforcement_a = document.querySelector("[name=distanceToReinforcement_a]");
let areaOfTensionReinforcement_As1 = document.querySelector("[name=areaOfTensionReinforcement_As1]");
let designValueOfShearForce = document.querySelector("[name=designValueOfShearForce]");
let capacityOfLoad = document.querySelector("[name=capacityOfLoad]");
let thetaAngle = document.querySelector("[name=thetaAngle]");
const index_Crdc = 0.18 / 1.4;
let calculationResult=document.querySelector(".calculationResult p");
const selectCharCylinderCompressiveStrength = {
  "C12/15": 12,
  "C16/20": 16,
  "C20/25": 20,
  "C25/30": 25,
  "C30/37": 30,
  "C35/45": 35,
  "C40/50": 40,
  "C45/55": 45,
  "C50/60": 50,
}

for (let i = 0; i < numberOfVariables; i++) {
  variables[i].addEventListener("change", function() {
    variables[i].setAttribute("value", variables[i].value);
    // console.log("Zmienna o nazwie: " + variables[i].name + " zmieniła się na: " + variables[i].value);
  })
}

//Wybieranie wartości z selecta
const optionsDiameterStirrup = document.querySelector('select.dataDiameterStirrup');
let diameterStirrup = optionsDiameterStirrup.options[optionsDiameterStirrup.selectedIndex].innerHTML;
optionsDiameterStirrup.addEventListener("change", function() {
  diameterStirrup = optionsDiameterStirrup.options[optionsDiameterStirrup.selectedIndex].innerHTML;
})

const optionsPlaneShearing = document.querySelector('select.dataPlaneShearing');
let countOfPlaneShearing = optionsPlaneShearing.options[optionsPlaneShearing.selectedIndex].innerHTML;
optionsPlaneShearing.addEventListener("change", function() {
  countOfPlaneShearing = optionsPlaneShearing.options[optionsPlaneShearing.selectedIndex].innerHTML;
})

const classesOfConcrete = document.querySelector('select.classesOfConcrete');
let classOfConcrete = classesOfConcrete.options[classesOfConcrete.selectedIndex].innerHTML;
let charCylinderCompressiveStrength = selectCharCylinderCompressiveStrength[classOfConcrete];
let designCylinderCompressiveStrength = charCylinderCompressiveStrength / 1.4;
classesOfConcrete.addEventListener("change", function() {
  classOfConcrete = classesOfConcrete.options[classesOfConcrete.selectedIndex].innerHTML;
  charCylinderCompressiveStrength = selectCharCylinderCompressiveStrength[classOfConcrete];
  designCylinderCompressiveStrength = charCylinderCompressiveStrength / 1.4;
})

const classesOfSteel = document.querySelector("select.classesOfSteel");
let classOfSteel = classesOfSteel.options[classesOfSteel.selectedIndex].value;
let designClassOfSteel = parseFloat(classOfSteel / 1.15);
console.log('Wytrzymałość obliczeniowa stali wynosi: ' + designClassOfSteel);
classesOfSteel.addEventListener("change", function() {
  classOfSteel = classesOfSteel.options[classesOfSteel.selectedIndex].value;
  designClassOfSteel = parseFloat(classOfSteel / 1.15);
  console.log('Wytrzymałość obliczeniowa stali wynosi: ' + designClassOfSteel);


})

//Aktualizowanie parametrów obliczeniowych ze strony
const allDocument = document.querySelector("body");
allDocument.addEventListener("change", function() {
  let effectiveHeight_d = parseInt(heightOfBeam_h.value) - parseInt(distanceToReinforcement_a.value);
  let index_k = Math.min(2, 1 + Math.sqrt(200 / effectiveHeight_d));
  let index_ro_l = parseInt(100 * areaOfTensionReinforcement_As1.value) / (effectiveHeight_d * parseInt(widthOfBeam_bw.value));
  let index_v_min = 0.035 * Math.pow(index_k, 1.5) * Math.sqrt(charCylinderCompressiveStrength);
  let index_V_Rd_c = Math.max(index_Crdc * index_k * Math.pow(100 * index_ro_l * charCylinderCompressiveStrength, 1 / 3) * parseInt(widthOfBeam_bw.value) * effectiveHeight_d / 1000, index_v_min * parseInt(widthOfBeam_bw.value) * effectiveHeight_d / 1000);


  //sprawdzenie wszystkich wprowadzonych danych
  // console.log("Sprawdzenie wprowadzonych danych:");
  // console.log("Wysokość belki wynosi: "+heightOfBeam_h.value );
  // console.log("Szerokość belki wynosi: "+widthOfBeam_bw.value );
  // console.log("Odległość od środką zbrojenia \"a\" wynosi: "+distanceToReinforcement_a.value );
  // console.log("Powierzchnia zbrojenia As1 wynosi: "+areaOfTensionReinforcement_As1.value );
  // console.log("Siła tnąca obliczeniowa wynosi: "+designValueOfShearForce.value );
  // console.log("Wytężenie przekroju wynosi: "+capacityOfLoad.value );
  // console.log("Kąt teta wynosi: "+thetaAngle.value );
  // console.log("Średnica strzemienia wynosi " + diameterStirrup);
  // console.log("Strzemiona " + countOfPlaneShearing + " cięte");
  // console.log("Klasa betonu wynosi " + classOfConcrete);
  // console.log("Wytrzymałość charakterystyczna betonu wynosi " + charCylinderCompressiveStrength);
  // console.log("Wytrzymałość charakterystyczna stali wynosi " + classOfSteel);
  // console.log("Efektywna wysokość przekroju wynosi: "+ effectiveHeight_d);
  // console.log("Współczynnik k wynosi: "+ index_k);
  // console.log("Stopień zbrojenia ro_l wynosi:"+index_ro_l);
  // console.log("Współczynnik v_min wynosi: "+index_v_min);
  // console.log("Nośność betonu na ścinanie wynosi: "+index_V_Rd_c);
  // console.log('Wytrzymałość obliczeniowa betonu wynosi: '+ designCylinderCompressiveStrength);
  // console.log('Wytrzymałość obliczeniowa stali wynosi: '+ designClassOfSteel);
  // console.log("----------do tego momentu sprawdzone obliczenia-----------------------------------------------------");

  //Obliczenia zbrojenia i nośności przekroju betonowego
  let index_z = 0.9 * effectiveHeight_d;
  const index_alfa_cw = 1;
  let index_v_1 = 0.6 * (1 - charCylinderCompressiveStrength / 250); //sprawdzić wartość z normą
  let index_ro_w_min = 0.08 * Math.sqrt(charCylinderCompressiveStrength) / classOfSteel;
  let index_A_sw = parseInt(countOfPlaneShearing) * Math.PI * Math.pow(parseInt(diameterStirrup) / 10, 2) / 4;

  //maksymalny rozstaw prętów z normy
  let index_s_max = Math.min(40, Math.floor(0.75 * effectiveHeight_d / 10));
  //minimalny rozstaw prętów z normy i wykonastwa
  let index_s_min = 5;
  let index_V_Rd_max = index_alfa_cw * parseInt(widthOfBeam_bw.value) / 10 * index_z / 10 * index_v_1 * designCylinderCompressiveStrength / 10 / (1 / Math.tan(angleDegree(parseInt(thetaAngle.value))) + Math.tan(angleDegree(parseInt(thetaAngle.value))));
  let index_V_Rd=0;

//Od tego miejsca poprawić żeby pokazywało dobry rozstaw i dobry wynik w HTML
  for (index_s_max; index_s_max > index_s_min; index_s_max--) {
    //Stopień zbrojenia na ścinanie
    let index_ro_w = index_A_sw / (index_s_max * parseInt(widthOfBeam_bw.value));
    //Nośność na ścinanie ze strzemionami
    let index_V_Rd_s = index_A_sw / index_s_max * index_z / 10 * designClassOfSteel / 10 / Math.tan(angleDegree(parseInt(thetaAngle.value)));
    index_V_Rd = Math.min(index_V_Rd_max, index_V_Rd_s);
    console.log(index_s_max);

    if (index_s_max===index_s_min+1 && (200 - parseInt(capacityOfLoad.value)) / 100*parseInt(designValueOfShearForce.value) >= index_V_Rd){
      calculationResult.innerText="Przekrój jest za mały. Należy zwiększyć jego wymiary lub klasę betonu.";
      break;
    }

    if ((200 - parseInt(capacityOfLoad.value)) / 100*parseInt(designValueOfShearForce.value) <= index_V_Rd) {
      break;
    } else if (index_s_max===index_s_min){
      calculationResult.innerText=("pies");
    }
  }
//dodac warunek na ro_w_min

  // calculationResult.innerHTML="kot"+index_V_Rd;


//Stopień zbrojenia strzemionami ρw=0.0025.
// Minimalny stopień zbrojenia strzemionami ρw,min=0.0008.
// Przyjęto strzemiona Φ6, 2-cięte w rozstawie 9 cm!

//Drugi warunek jak przekrój jest za mały i należy zwiększyć wymiary, lub zwiększyć klasę betonu
  console.log("Wyniki obliczeń:")
  console.log("Rozstaw prętów wynosi: "+index_s_max);
  console.log("V_Rd wynosi: "+index_V_Rd.toFixed(2));







})
