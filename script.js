// Three.js Grundsetup

const container = document.getElementById('gameContainer');
const moneySpan = document.getElementById('money');
const jobBtn = document.getElementById('jobBtn');
const buyBtn = document.getElementById('buyBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const bankMoneySpan = document.getElementById('bankMoney');
const bankBtn = document.getElementById('bankBtn');
const shopPanel = document.getElementById('shopPanel');
const buyAppleBtn = document.getElementById('buyApple');
const buyBreadBtn = document.getElementById('buyBread');
const buyDrinkBtn = document.getElementById('buyDrink');
const buyHouseBtn = document.getElementById('buyHouse');
const closeShopBtn = document.getElementById('closeShop');
const messageBox = document.getElementById('messageBox');
const jobPanel = document.getElementById('jobPanel');
const officeJobBtn = document.getElementById('officeJobBtn');
const officeMathJobBtn = document.getElementById('officeMathJobBtn');
const officeFilingJobBtn = document.getElementById('officeFilingJobBtn');
const cleaningJobBtn = document.getElementById('cleaningJobBtn');
const closeJobBtn = document.getElementById('closeJob');
const dialogPanel = document.getElementById('dialogPanel');
const npcName = document.getElementById('npcName');
const dialogText = document.getElementById('dialogText');
const dialogOption1 = document.getElementById('dialogOption1');
const dialogOption2 = document.getElementById('dialogOption2');
const dialogOption3 = document.getElementById('dialogOption3');
const questPanel = document.getElementById('questPanel');
const questList = document.getElementById('questList');
const closeQuestBtn = document.getElementById('closeQuest');
const questBtn = document.getElementById('questBtn');
const mapSearchInput = document.getElementById('mapSearchInput');
const mapSearchBtn = document.getElementById('mapSearchBtn');
const mapClearBtn = document.getElementById('mapClearBtn');
const mapSearchResult = document.getElementById('mapSearchResult');
const fashionShopPanel = document.getElementById('fashionShopPanel');
const closeFashionShopBtn = document.getElementById('closeFashionShop');
const fashionOptionButtons = document.querySelectorAll('.fashionOption');
const outfitColorButtons = document.querySelectorAll('.outfitColor');
const outfitColorHint = document.getElementById('outfitColorHint');
const prisonElevatorPanel = document.getElementById('prisonElevatorPanel');
const prisonFloorButtons = document.getElementById('prisonFloorButtons');
const prisonReceptionPanel = document.getElementById('prisonReceptionPanel');
const prisonerList = document.getElementById('prisonerList');
const startOverlay = document.getElementById('startOverlay');
const startCharacterPreview = document.getElementById('startCharacterPreview');
const startMoney = document.getElementById('startMoney');
const deviceModeBtn = document.getElementById('deviceModeBtn');
const deviceModeLabel = document.getElementById('deviceModeLabel');
const startGameBtn = document.getElementById('startGameBtn');
const playerNameInput = document.getElementById('playerNameInput');
const roomCodeInput = document.getElementById('roomCodeInput');
const liveRoomsList = document.getElementById('liveRoomsList');
const multiplayerStatus = document.getElementById('multiplayerStatus');
const multiplayerRoomLabel = document.getElementById('multiplayerRoomLabel');
const multiplayerPlayerLabel = document.getElementById('multiplayerPlayerLabel');
const gameChat = document.getElementById('gameChat');
const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatPanel = document.getElementById('chatPanel');
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatUnreadCount = document.getElementById('chatUnreadCount');
let unreadChatMessages = 0;

function getGameData(key) {
	return localStorage.getItem(key);
}

function setGameData(key, value) {
	localStorage.setItem(key, value);
}

// Uhrzeit-System
const timeDisplay = document.getElementById('timeDisplay');
const timePauseBtn = document.getElementById('timePause');
const timeNormalBtn = document.getElementById('timeNormal');
const timeFastBtn = document.getElementById('timeFast');
const timeVeryFastBtn = document.getElementById('timeVeryFast');
const wantedLevelSpan = document.getElementById('wantedLevel');
const policeChaseTimerSpan = document.getElementById('policeChaseTimer');
const healthLabel = document.getElementById('healthLabel');
const healthFill = document.getElementById('healthFill');
let gameTime = 720; // Start bei 12:00 (12 * 60 Minuten)
let timeSpeed = 1; // Minuten pro Sekunde

// Geschwindigkeitsanzeige
const speedDisplay = document.getElementById('speedDisplay');

// Geschwindigkeit in KM/H umrechnen und anzeigen
function updateSpeedDisplay() {
	if (!isInVehicle || !currentVehicle) {
		speedDisplay.style.display = 'none';
		return;
	}
	
	// Three.js Geschwindigkeit in KM/H umrechnen (höhere Geschwindigkeiten)
	// Three.js Geschwindigkeit * 3.6 für m/s zu km/h, dann stärker skalieren für bessere Spielbarkeit
	const speedKmh = Math.abs(vehicleSpeed) * 3.6 * 8; // Faktor 8 für viel höhere Geschwindigkeiten
	const roundedSpeed = Math.round(speedKmh);
	
	// Maximalgeschwindigkeit begrenzen für realistischere Anzeige
	const maxDisplaySpeed = 300; // Max 300 km/h Anzeige (erhöht)
	const displaySpeed = Math.min(roundedSpeed, maxDisplaySpeed);
	
	// Fahrzeug-Icon basierend auf Typ
	let icon = '🚗';
	if (currentVehicleType === 'sports') icon = '🏎️';
	else if (currentVehicleType === 'truck') icon = '🚛';
	else if (currentVehicleType === 'bus') icon = '🚌';
	else if (currentVehicleType === 'van') icon = '🚐';
	else if (currentVehicleType === 'convertible') icon = '🏎️';
	else if (currentVehicleType === 'luxury') icon = '🛡️';
	else if (currentVehicleType === 'suv') icon = '🚙';
	
	speedDisplay.textContent = `${icon} ${displaySpeed} km/h`;
	speedDisplay.style.display = 'inline';
	
	// Geschwindigkeitsbasierte Farbe und Animation (angepasst für höhere Geschwindigkeiten)
	if (displaySpeed >= 200) {
		speedDisplay.style.color = '#ff0000'; // Rot bei sehr hoher Geschwindigkeit
		speedDisplay.style.textShadow = '0 0 12px #ff000040';
		speedDisplay.style.animation = 'speedPulse 0.3s infinite';
	} else if (displaySpeed >= 120) {
		speedDisplay.style.color = '#ffaa00'; // Orange bei hoher Geschwindigkeit
		speedDisplay.style.textShadow = '0 0 10px #ffaa0040';
		speedDisplay.style.animation = 'speedPulse 0.6s infinite';
	} else if (displaySpeed >= 60) {
		speedDisplay.style.color = '#ffff00'; // Gelb bei mittlerer Geschwindigkeit
		speedDisplay.style.textShadow = '0 0 8px #ffff0040';
		speedDisplay.style.animation = 'none';
	} else {
		speedDisplay.style.color = '#00ff00'; // Grün bei niedriger Geschwindigkeit
		speedDisplay.style.textShadow = '0 0 8px #00ff0040';
		speedDisplay.style.animation = 'none';
	}
}

// Zeitsteuerung Event-Listener
timePauseBtn.addEventListener('click', () => setTimeSpeed(0));
timeNormalBtn.addEventListener('click', () => setTimeSpeed(1));
timeFastBtn.addEventListener('click', () => setTimeSpeed(5));
timeVeryFastBtn.addEventListener('click', () => setTimeSpeed(15));

// Autohändler
const carDealerPanel = document.getElementById('carDealerPanel');
const closeCarDealerBtn = document.getElementById('closeCarDealer');
const carColorPicker = document.getElementById('carColorPicker');
const buySmallCarBtn = document.getElementById('buySmallCar');
const buyFamilyVanBtn = document.getElementById('buyFamilyVan');
const buySportsCarBtn = document.getElementById('buySportsCar');
const buyRacingCarBtn = document.getElementById('buyRacingCar');
const buyHypercarBtn = document.getElementById('buyHypercar');
const buyPickupTruckBtn = document.getElementById('buyPickupTruck');
const buySUVBtn = document.getElementById('buySUV');
const buyConvertibleBtn = document.getElementById('buyConvertible');
const buyLuxuryBtn = document.getElementById('buyLuxury');
const buyBusBtn = document.getElementById('buyBus');
const buyHelicopterBtn = document.getElementById('buyHelicopter');
const buyAirplaneBtn = document.getElementById('buyAirplane');

// Bankraub-System
const bankRobberyBtn = document.getElementById('bankRobberyBtn');
const bankRobberyPanel = document.getElementById('bankRobberyPanel');
const closeBankRobberyBtn = document.getElementById('closeBankRobbery');
const robBankBtn = document.getElementById('robBankBtn');
const guaranteedRobBtn = document.getElementById('guaranteedRobBtn');
const hackSecurityBtn = document.getElementById('hackSecurityBtn');
const escapeBtn = document.getElementById('escapeBtn');
const testMoneyBtn = document.getElementById('testMoneyBtn');
const refillNpcBtn = document.getElementById('refillNpcBtn');
const triggerPoliceBtn = document.getElementById('triggerPoliceBtn');
const resetPoliceBtn = document.getElementById('resetPoliceBtn');
const policeStatusBtn = document.getElementById('policeStatusBtn');
const guaranteedJailBtn = document.getElementById('guaranteedJailBtn');
const testPoliceCarsBtn = document.getElementById('testPoliceCarsBtn');
const testFootPoliceBtn = document.getElementById('testFootPoliceBtn');
const bankRobberyMoneySpan = document.getElementById('bankRobberyMoney');
const policeAlertSpan = document.getElementById('policeAlert');
const jailRiskSpan = document.getElementById('jailRisk');

// Polizei-Fahrzeug-System
let policeCars = [];
let policeSpawned = false;
const POLICE_CAR_SPEED = 0.9; // Erhöht von 0.8
const POLICE_CATCH_DISTANCE = 2.5; // Festnahme nur bei Fahrzeugkontakt

// Fuß-Polizisten-System
let footPolice = [];
let footPoliceSpawned = false;
const FOOT_POLICE_SPEED = 0.4; // Erhöht von 0.3
const FOOT_POLICE_CATCH_DISTANCE = 1; // Festnahme nur bei Berührung

// Polizei-Fahrzeug erstellen
function createPoliceCar(x, z) {
	const policeCar = createCar('small', x, z, 0x0000FF); // Blaues Polizeiauto
	
	// Polizei-Attribute hinzufügen
	policeCar.userData = {
		isPolice: true,
		targetX: player.position.x,
		targetZ: player.position.z,
		speed: POLICE_CAR_SPEED,
		rotation: 0
	};
	
	// Blaulicht hinzufügen
	const lightGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 8);
	const lightMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
	const blueLight = new THREE.Mesh(lightGeometry, lightMaterial);
	blueLight.position.set(0, 1.5, 0);
	policeCar.add(blueLight);
	
	// Blaulicht-Animation
	let lightColor = 0xFF0000;
	setInterval(() => {
		lightColor = lightColor === 0xFF0000 ? 0x0000FF : 0xFF0000;
		blueLight.material.color.setHex(lightColor);
	}, 200);
	
	policeCars.push(policeCar);
	return policeCar;
}

function createFootPolice(x, z) {
    const policeGroup = new THREE.Group();
    
    // Körper
    const bodyGeometry = new THREE.BoxGeometry(0.6, 1.8, 0.3);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff }); // Blaue Uniform
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.9;
    policeGroup.add(body);
    
    // Kopf
    const headGeometry = new THREE.SphereGeometry(0.25);
    const headMaterial = new THREE.MeshLambertMaterial({ color: 0xffdbac }); // Hautfarbe
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 2.1;
    policeGroup.add(head);
    
    // Arme
    const armGeometry = new THREE.BoxGeometry(0.2, 1.2, 0.2);
    const armMaterial = new THREE.MeshLambertMaterial({ color: 0xffdbac });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.4, 1.2, 0);
    policeGroup.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.4, 1.2, 0);
    policeGroup.add(rightArm);
    
    // Beine
    const legGeometry = new THREE.BoxGeometry(0.25, 1.5, 0.25);
    const legMaterial = new THREE.MeshLambertMaterial({ color: 0x000088 }); // Dunkle Hose
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.15, -0.75, 0);
    policeGroup.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.15, -0.75, 0);
    policeGroup.add(rightLeg);
    
    // Polizeimütze
    const hatGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1);
    const hatMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
    const hat = new THREE.Mesh(hatGeometry, hatMaterial);
    hat.position.y = 2.35;
    policeGroup.add(hat);
    
    policeGroup.position.set(x, 0, z);
    scene.add(policeGroup);
    
    return {
        mesh: policeGroup,
        targetX: x,
        targetZ: z,
        walking: false
    };
}

// Polizei-Fahrzeuge spawnen
function spawnPoliceCars() {
	if (policeSpawned) return;
	
	policeSpawned = true;
	showMessage('🚔 POLIZEI-FAHRZEUGE WERDEN GESENDET! MEHR ALS ZUVOR!', 4000);
	
	// Mehrere Polizei-Fahrzeuge an verschiedenen Punkten spawnen (erweitert)
	const spawnPoints = [
		{ x: -50, z: -50 },
		{ x: 50, z: -50 },
		{ x: -50, z: 50 },
		{ x: 50, z: 50 },
		{ x: 0, z: -60 },
		{ x: 0, z: 60 },
		{ x: -60, z: 0 },
		{ x: 60, z: 0 },
		{ x: -30, z: -30 },
		{ x: 30, z: 30 },
		{ x: -30, z: 30 },
		{ x: 30, z: -30 }
	];
	
	spawnPoints.forEach((point, index) => {
		setTimeout(() => {
			const policeCar = createPoliceCar(point.x, point.z);
			policeCar.userData.targetX = player.position.x;
			policeCar.userData.targetZ = player.position.z;
			scene.add(policeCar);
			showMessage(`🚔 Polizei-Fahrzeug ${index + 1} ist unterwegs!`, 2000);
		}, index * 700); // Schneller spawnen (700ms statt 1000ms)
	});
	
	// Zweite Welle nach 5 Sekunden
	setTimeout(() => {
		if (policeAlert) {
			showMessage('🚔 ZWEITE POLIZEI-WELLE KOMMT!', 3000);
			const secondWavePoints = [
				{ x: -40, z: -40 },
				{ x: 40, z: -40 },
				{ x: -40, z: 40 },
				{ x: 40, z: 40 }
			];
			
			secondWavePoints.forEach((point, index) => {
				setTimeout(() => {
					const policeCar = createPoliceCar(point.x, point.z);
					policeCar.userData.targetX = player.position.x;
					policeCar.userData.targetZ = player.position.z;
					scene.add(policeCar);
					showMessage(`🚔 Verstärkung ${index + 1} ist da!`, 2000);
				}, index * 500);
			});
		}
	}, 5000);
}

// Polizei-Fahrzeuge entfernen
function removePoliceCars() {
	policeCars.forEach(car => {
		if (car.parent) {
			car.parent.remove(car);
		}
	});
	policeCars = [];
	policeSpawned = false;
}

// Fuß-Polizisten spawnen
function spawnFootPolice() {
	if (footPoliceSpawned) return;
	
	footPoliceSpawned = true;
	showMessage('👮‍♂️ FUß-POLIZISTEN WERDEN GESENDET! MEHR ALS ZUVOR!', 4000);
	
	// Mehrere Fuß-Polizisten an verschiedenen Punkten spawnen (erweitert)
	const spawnPoints = [
		{ x: -30, z: -30 },
		{ x: 30, z: -30 },
		{ x: -30, z: 30 },
		{ x: 30, z: 30 },
		{ x: 0, z: -40 },
		{ x: 0, z: 40 },
		{ x: -40, z: 0 },
		{ x: 40, z: 0 },
		{ x: -20, z: -20 },
		{ x: 20, z: -20 },
		{ x: -20, z: 20 },
		{ x: 20, z: 20 },
		{ x: -10, z: -50 },
		{ x: 10, z: -50 },
		{ x: -10, z: 50 },
		{ x: 10, z: 50 }
	];
	
	spawnPoints.forEach((point, index) => {
		setTimeout(() => {
			const footCop = createFootPolice(point.x, point.z);
			footPolice.push(footCop);
			showMessage(`👮‍♂️ Fuß-Polizist ${index + 1} ist unterwegs!`, 2000);
		}, index * 500); // Schneller spawnen (500ms statt 800ms)
	});
	
	// Zweite Welle nach 4 Sekunden
	setTimeout(() => {
		if (policeAlert) {
			showMessage('👮‍♂️ ZWEITE FUß-POLIZEI-WELLE KOMMT!', 3000);
			const secondWavePoints = [
				{ x: -25, z: -25 },
				{ x: 25, z: -25 },
				{ x: -25, z: 25 },
				{ x: 25, z: 25 },
				{ x: 0, z: -25 },
				{ x: 0, z: 25 }
			];
			
			secondWavePoints.forEach((point, index) => {
				setTimeout(() => {
					const footCop = createFootPolice(point.x, point.z);
					footPolice.push(footCop);
					showMessage(`👮‍♂️ Verstärkung zu Fuß ${index + 1} ist da!`, 2000);
				}, index * 400);
			});
		}
	}, 4000);
}

// Fuß-Polizisten entfernen
function removeFootPolice() {
	footPolice.forEach(cop => {
		if (cop.mesh.parent) {
			cop.mesh.parent.remove(cop.mesh);
		}
	});
	footPolice = [];
	footPoliceSpawned = false;
}

// Fuß-Polizisten bewegen und Kollision prüfen
function updateFootPolice() {
	if (!policeAlert || footPolice.length === 0) return;
	
	footPolice.forEach((cop, index) => {
		// Ziel aktualisieren (Spieler-Position)
		cop.targetX = player.position.x;
		cop.targetZ = player.position.z;
		
		// Richtung zum Ziel berechnen
		const dx = cop.targetX - cop.mesh.position.x;
		const dz = cop.targetZ - cop.mesh.position.z;
		const distance = Math.sqrt(dx * dx + dz * dz);
		
		// Wenn nah genug am Spieler - Festnahme!
		if (distance < FOOT_POLICE_CATCH_DISTANCE) {
			showMessage(`👮‍♂️ POLIZIST HAT DICH GEFASST!`, 3000);
			showMessage(`⏰ Du kommst ins Gefängnis!`, 3000);
			damagePlayer(25, 'Polizei');
			
			// Gefängnisstrafe
			jailTime = Math.floor(Math.random() * 6) + 3; // 3-9 Minuten (kürzer als Fahrzeuge)
			startJailTime();
			
			// Fuß-Polizisten entfernen
			removeFootPolice();
			return;
		}
		
		// Bewegung zur Zielposition
		if (distance > 1) { // Nicht zu nah ranlaufen
			const moveX = (dx / distance) * FOOT_POLICE_SPEED;
			const moveZ = (dz / distance) * FOOT_POLICE_SPEED;
			
			cop.mesh.position.x += moveX;
			cop.mesh.position.z += moveZ;
			
			// Rotation anpassen (Polizist schaut in Laufrichtung)
			cop.mesh.rotation.y = Math.atan2(dx, dz);
			
			// Geh-Animation (einfach)
			cop.walking = !cop.walking;
			if (cop.walking) {
				cop.mesh.position.y = 0.1; // Leichter Hoppel-Effekt
			} else {
				cop.mesh.position.y = 0;
			}
		}
	});
}

// Polizei-Fahrzeuge testen (für Debug)
function testPoliceCars() {
	if (policeCars.length > 0) {
		showMessage(`🚔 ${policeCars.length} Polizei-Fahrzeuge sind aktiv (von bis zu 16 möglich)`, 3000);
	} else {
		showMessage('🚔 Keine Polizei-Fahrzeuge aktiv', 3000);
	}
	console.log('Police cars:', policeCars);
}

function testFootPolice() {
	if (footPolice.length > 0) {
		showMessage(`👮‍♂️ ${footPolice.length} Fuß-Polizisten sind aktiv (von bis zu 22 möglich)`, 3000);
	} else {
		showMessage('👮‍♂️ Keine Fuß-Polizisten aktiv', 3000);
	}
	console.log('Foot police:', footPolice);
}

// Polizei-Fahrzeuge bewegen und Kollision prüfen
function updatePoliceCars() {
	if (!policeAlert || policeCars.length === 0) return;
	
	policeCars.forEach((car, index) => {
		// Ziel aktualisieren (Spieler-Position)
		car.userData.targetX = player.position.x;
		car.userData.targetZ = player.position.z;
		
		// Richtung zum Ziel berechnen
		const dx = car.userData.targetX - car.position.x;
		const dz = car.userData.targetZ - car.position.z;
		const distance = Math.sqrt(dx * dx + dz * dz);
		
		// Wenn nah genug am Spieler - Festnahme!
		if (distance < POLICE_CATCH_DISTANCE) {
			showMessage(`🚔 POLIZEI HAT DICH GEFASST!`, 3000);
			showMessage(`⏰ Du kommst ins Gefängnis!`, 3000);
			damagePlayer(35, 'Polizei');
			
			// Gefängnisstrafe
			jailTime = Math.floor(Math.random() * 8) + 5; // 5-13 Minuten
			startJailTime();
			
			// Polizei-Fahrzeuge entfernen
			removePoliceCars();
			
			// Fuß-Polizisten entfernen
			removeFootPolice();
			return;
		}
		
		// Bewegung zur Zielposition
		if (distance > 2) { // Nicht zu nah ranfahren
			const moveX = (dx / distance) * car.userData.speed;
			const moveZ = (dz / distance) * car.userData.speed;
			
			// Neue Position berechnen
			let newX = car.position.x + moveX;
			let newZ = car.position.z + moveZ;
			
			// Straßen folgen (einfache Logik)
			newX = followRoad(newX, car.position.x);
			newZ = followRoad(newZ, car.position.z);
			
			car.position.x = newX;
			car.position.z = newZ;
			
			// Rotation anpassen
			car.rotation.y = Math.atan2(dx, dz);
		}
		
		// Blaulicht-Position aktualisieren
		const blueLight = car.children.find(child => child.geometry.type === 'CylinderGeometry');
		if (blueLight) {
			blueLight.rotation.y += 0.1; // Blaulicht drehen
		}
	});
}

// Straßen folgen (einfache Implementierung)
function followRoad(targetPos, currentPos) {
	// Straßen sind bei x=0, z=0 und bei Vielfachen von 40
	const roadWidth = 40;
	const snapDistance = 5;
	
	// Prüfe ob nahe an einer Straße
	for (let i = -10; i <= 10; i++) {
		const roadX = i * roadWidth;
		const roadZ = i * roadWidth;
		
		if (Math.abs(targetPos - roadX) < snapDistance) {
			return roadX;
		}
		if (Math.abs(targetPos - roadZ) < snapDistance) {
			return roadZ;
		}
	}
	
	return targetPos; // Keine Straße gefunden, normale Bewegung
}

// Bankraub-Variablen
let policeAlert = false;
let securityHacked = false;
let jailTime = 0;
let wantedLevel = 0;
let policeLoseSightSince = 0;
let policeWarningShownForCurrentAlert = false;
let playerHealth = parseInt(getGameData('playerHealth')) || 100;

// Fahrzeug-System
let ownedCars = JSON.parse(getGameData('ownedCars')) || [];
const airfieldSpawnPositions = {
	helicopter: { x: 500, z: 520, rotation: Math.PI / 2 },
	airplane: { x: 540, z: 520, rotation: Math.PI / 2 }
};
let currentVehicle = null;
let currentVehicleType = null; // Neuer Typ-Tracker
let isInVehicle = false;
let vehicleSpeed = 0;
let vehicleRotation = 0;

// Stelle sicher, dass alle Fahrzeuge einen Typ haben (für Abwärtskompatibilität)
ownedCars.forEach(car => {
	if (!car.type) {
		// Versuche Typ aus dem Namen zu erraten
		if (car.name.includes('Sport')) car.type = 'sports';
		else if (car.name.includes('Van') || car.name.includes('Familien')) car.type = 'van';
		else if (car.name.includes('Truck') || car.name.includes('Pickup')) car.type = 'truck';
		else if (car.name.includes('SUV')) car.type = 'suv';
		else if (car.name.includes('Cabrio') || car.name.includes('Convertible')) car.type = 'convertible';
		else if (car.name.includes('Luxus')) car.type = 'luxury';
		else if (car.name.includes('Bus')) car.type = 'bus';
		else car.type = 'small'; // Fallback
	}
});

// Fahrzeug-Geschwindigkeiten basierend auf Typ (erhöht für bessere Geschwindigkeiten)
function getVehicleMaxSpeed(vehicleType) {
	switch(vehicleType) {
		case 'hypercar':
			return 5.2;
		case 'supercar':
			return 4.4;
		case 'sports':
			return 3.5; // Sportwagen: 3.5 (extrem schnell!)
		case 'small':
			return 2.2; // Kleiner Wagen: 2.2 (schnell)
		case 'van':
			return 1.8; // Van: 1.8 (mittel)
		case 'truck':
			return 1.5; // Truck: 1.5 (langsamer)
		case 'suv':
			return 2.0; // SUV: 2.0 (gut)
		case 'convertible':
			return 2.8; // Cabrio: 2.8 (sehr schnell)
		case 'luxury':
			return 2.1; // Luxus: 2.1 (komfortabel schnell)
		case 'bus':
			return 1.2; // Bus: 1.2 (langsam)
		case 'helicopter':
			return 3.8;
		case 'airplane':
			return 5.8;
		default:
			return 2.2; // Standard
	}
}

function getVehicleReverseSpeed(vehicleType) {
	switch(vehicleType) {
		case 'hypercar':
			return -2.5;
		case 'supercar':
			return -2.1;
		case 'sports':
			return -1.8; // Sportwagen rückwärts auch schneller
		case 'small':
			return -1.2; // Normal rückwärts
		case 'van':
			return -1.0; // Van rückwärts langsamer
		case 'truck':
			return -0.8; // Truck rückwärts sehr langsam
		case 'suv':
			return -1.1; // SUV rückwärts normal
		case 'convertible':
			return -1.4; // Cabrio rückwärts
		case 'luxury':
			return -1.1; // Luxus rückwärts
		case 'bus':
			return -0.6; // Bus rückwärts sehr langsam
		case 'helicopter':
		case 'airplane':
			return 0;
		default:
			return -1.2; // Standard rückwärts
	}
}

// Quest-System
let activeQuests = [];
let completedQuests = [];
let questIdCounter = 0;

const questTypes = {
	collect: {
		name: "Sammeln",
		description: "Sammle Items in der Stadt",
		rewards: { money: 25, exp: 10 }
	},
	deliver: {
		name: "Liefern", 
		description: "Bringe etwas zu einem bestimmten Ort",
		rewards: { money: 40, exp: 15 }
	},
	explore: {
		name: "Erkunden",
		description: "Besuche verschiedene Orte",
		rewards: { money: 30, exp: 12 }
	}
};

const availableQuests = [
	{
		type: 'collect',
		title: "Apfel-Sammler",
		description: "Sammle 3 Äpfel aus dem Supermarkt",
		requirements: { apples: 3 },
		npcDialog: "Könntest du mir helfen? Ich brauche dringend 3 Äpfel für einen Kuchen."
	},
	{
		type: 'deliver',
		title: "Paket-Zustellung",
		description: "Bringe ein Paket zum Park",
		requirements: { delivered: false },
		targetLocation: { x: 0, z: 80 },
		npcDialog: "Könntest du dieses Paket zum Park bringen? Es ist wichtig!"
	},
	{
		type: 'explore',
		title: "Stadt-Erkunder",
		description: "Besuche 3 verschiedene Gebäude",
		requirements: { buildings: 3 },
		npcDialog: "Du siehst aus wie jemand, der die Stadt kennt. Zeig mir, was du gesehen hast!"
	},
	{
		type: 'collect',
		title: "Brot-Sammler",
		description: "Sammle 2 Brote für die Familie",
		requirements: { bread: 2 },
		npcDialog: "Meine Familie braucht Brot. Könntest du 2 Stück besorgen?"
	},
	{
		type: 'deliver',
		title: "Briefträger",
		description: "Bringe einen Brief zur Bank",
		requirements: { delivered: false },
		targetLocation: { x: 160, z: 140 },
		npcDialog: "Dieser Brief muss dringend zur Bank. Hilfst du mir?"
	}
];
let money = parseInt(getGameData('money')) || 0;
let bankMoney = parseInt(getGameData('bankMoney')) || 0;
let npcBankMoney = parseInt(getGameData('npcBankMoney')) || 5000; // NPCs haben 5000€ Startgeld

// Sicherstellen, dass NPC-Bank genug Geld hat
if (npcBankMoney < 1000) {
	npcBankMoney = 5000;
	setGameData('npcBankMoney', npcBankMoney);
}

let houseBought = getGameData('houseBought') === 'true';
let ownedHouses = JSON.parse(getGameData('ownedHouses')) || [];
let playerHouses = [];

const housePlots = [
	{ x: -260, z: 260, name: 'Grundstück 1' },
	{ x: 280, z: 300, name: 'Grundstück 2' },
	{ x: -380, z: 180, name: 'Grundstück 3' },
	{ x: 420, z: -320, name: 'Grundstück 4' },
	{ x: -500, z: -320, name: 'Grundstück 5' },
	{ x: 540, z: 420, name: 'Verstecktes Grundstück' }
];

const houseCatalog = [
	{ id: 'small', name: 'Kleines Haus', price: 12000, color: 0xc58b5a, houseType: 'cottage', description: 'Gemütlich, günstig und perfekt für den Start.' },
	{ id: 'family', name: 'Familienhaus', price: 25000, color: 0x9db4c0, houseType: 'default', description: 'Mehr Platz für Alltag und Familie.' },
	{ id: 'villa', name: 'Villa', price: 65000, color: 0xf0e2c6, houseType: 'villa', description: 'Groß, hell und deutlich luxuriöser.' },
	{ id: 'luxury', name: 'Luxusvilla', price: 120000, color: 0xd9d9d9, houseType: 'modern', description: 'Das teuerste und auffälligste Haus.' },
	{ id: 'mystery', name: 'Mysteriöses Haus', price: 11110, color: 0x2f3640, houseType: 'mystery', description: 'Unheimlich, verborgen und mit einem Keller.' }
];

let mysteryHouseState = null;
let mysteryBasementBox = null;
let mysteryBasementExit = null;
let mysteryBasementRoom = null;
let mysteryBasementEnteredAt = 0;
let mysteryBasementPoliceTriggered = false;
let mysteryBoxRewardCooldown = 0;
let mysteryPoliceUnits = [];
let isInMysteryBasement = false;
const jailPosition = { x: 180, y: 0, z: -255 };
const jailFloorHeight = 9;
let jailRoom = null;
let isInJailInterior = false;
let jailInterval = null;
let currentJailFloor = 0;
let displayedJailFloor = null;
const prisonReceptionPosition = { x: 175, z: -259 };
const prisoners = ['Alex Weber', 'Mira König', 'Jonas Beck', 'Lea Hoffmann', 'Emir Kaya', 'Sofia Brandt', 'Noah Fischer', 'Elena Wolf'];
let selectedPrisoner = null;
let rescuedPrisoner = null;
let rescueEscapeActive = false;

if (houseBought && ownedHouses.length === 0) {
	ownedHouses.push({ id: 'legacy-house', houseId: 'small', plotIndex: 0 });
}
	houseBought = ownedHouses.length > 0;

// Quest-Funktionen
function generateQuest(npc) {
	const available = availableQuests.filter(q => !activeQuests.some(aq => aq.title === q.title));
	if (available.length === 0) return null;
	
	const randomQuest = available[Math.floor(Math.random() * available.length)];
	const quest = {
		id: questIdCounter++,
		...randomQuest,
		npcId: npc.userData.id,
		progress: {},
		started: false,
		completed: false
	};
	
	// Initialisiere Progress basierend auf Requirements
	Object.keys(quest.requirements).forEach(key => {
		quest.progress[key] = 0;
	});
	
	return quest;
}

function startQuest(quest) {
	quest.started = true;
	activeQuests.push(quest);
	showMessage(`Neue Quest gestartet: ${quest.title}`, 3000);
	updateQuestUI();
}

function completeQuest(quest) {
	quest.completed = true;
	activeQuests = activeQuests.filter(q => q.id !== quest.id);
	completedQuests.push(quest);
	
	// Belohnungen geben
	money += questTypes[quest.type].rewards.money;
	showMessage(`Quest abgeschlossen! +${questTypes[quest.type].rewards.money}€`, 3000);
	
	updateQuestUI();
}

function updateQuestProgress(quest, item, amount = 1) {
	if (!quest.progress.hasOwnProperty(item)) return;
	
	quest.progress[item] += amount;
	
	// Prüfe ob Quest abgeschlossen
	const requirements = quest.requirements;
	let isComplete = true;
	
	for (const [key, value] of Object.entries(requirements)) {
		if (quest.progress[key] < value) {
			isComplete = false;
			break;
		}
	}
	
	if (isComplete) {
		completeQuest(quest);
	}
}

function checkQuestCompletion() {
	activeQuests.forEach(quest => {
		if (quest.type === 'deliver' && !quest.requirements.delivered) {
			const distance = Math.sqrt(
				Math.pow(player.position.x - quest.targetLocation.x, 2) + 
				Math.pow(player.position.z - quest.targetLocation.z, 2)
			);
			
			if (distance < 10) {
				quest.requirements.delivered = true;
				updateQuestProgress(quest, 'delivered', 1);
			}
		}
	});
}

function updateQuestUI() {
	// Quest-Liste im Dialog-Panel anzeigen
	const questList = document.getElementById('questList');
	if (questList) {
		questList.innerHTML = '';
		
		activeQuests.forEach(quest => {
			const questItem = document.createElement('div');
			questItem.className = 'quest-item';
			questItem.innerHTML = `
				<div class="quest-title">${quest.title}</div>
				<div class="quest-description">${quest.description}</div>
				<div class="quest-progress">
					${Object.entries(quest.progress).map(([key, value]) => 
						`${key}: ${value}/${quest.requirements[key]}`
					).join(', ')}
				</div>
			`;
			questList.appendChild(questItem);
		});
	}
}

// Szene, Kamera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Schöner blauer Himmel

// Initialisierung
moneySpan.textContent = `Geld: ${money} €`;
bankMoneySpan.textContent = `Bank: ${bankMoney} €`;
updateHealthDisplay();
refreshHouseButtonLabel();

if (houseBought) {
	spawnOwnedHouses();
}

// Autohändler initialisieren
setupCarDealer();

function saveData() {
	setGameData('money', money);
	setGameData('bankMoney', bankMoney);
	setGameData('npcBankMoney', npcBankMoney);
	setGameData('playerHealth', playerHealth);
	setGameData('jobEarnings', JSON.stringify(jobEarnings));
	setGameData('ownedHouses', JSON.stringify(ownedHouses));
	houseBought = ownedHouses.length > 0;
	setGameData('houseBought', houseBought);
}

function showMessage(text, duration = 3000) {
	messageBox.textContent = text;
	messageBox.style.display = 'block';
	setTimeout(() => {
		messageBox.style.display = 'none';
	}, duration);
}

function getAspect() {
	return window.innerWidth / window.innerHeight;
}
const camera = new THREE.PerspectiveCamera(75, getAspect(), 0.1, 2000);

// Kamera-Parameter für Third-Person-Sicht
let camDistance = 9;
let camAngleY = Math.PI / 2; // horizontaler Winkel
let camAngleX = Math.PI / 5; // vertikaler Winkel
const cameraTarget = new THREE.Vector3();

let lastMouseX = null;
let lastMouseY = null;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Minimap Setup
const minimapContainer = document.createElement('div');
minimapContainer.id = 'minimap';
minimapContainer.style.cssText = `
    position: absolute;
    top: 20px;
    left: 20px;
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.7);
    border: 2px solid #fff;
    border-radius: 8px;
    z-index: 100;
    cursor: pointer;
    overflow: hidden;
`;
document.body.appendChild(minimapContainer);

const minimapRenderer = new THREE.WebGLRenderer({ antialias: false });
minimapRenderer.setSize(200, 200);
minimapRenderer.setClearColor(0x000000, 0.5);
minimapContainer.appendChild(minimapRenderer.domElement);

const minimapCamera = new THREE.OrthographicCamera(-240, 240, 240, -240, 0.1, 1000);
minimapCamera.position.set(0, 200, 0);
minimapCamera.lookAt(0, 0, 0);

// Spieler-Marker für Minimap
const playerMarker = new THREE.Group();
const playerMarkerCore = new THREE.Mesh(
	new THREE.BoxGeometry(12, 12, 12),
	new THREE.MeshBasicMaterial({ color: 0xff2a2a })
);
playerMarkerCore.position.y = 6;
playerMarker.add(playerMarkerCore);

const playerMarkerRing = new THREE.Mesh(
	new THREE.TorusGeometry(10, 2, 10, 24),
	new THREE.MeshBasicMaterial({ color: 0xffffff })
);
playerMarkerRing.rotation.x = Math.PI / 2;
playerMarkerRing.position.y = 6;
playerMarker.add(playerMarkerRing);

const playerMarkerGlow = new THREE.Mesh(
	new THREE.SphereGeometry(6, 16, 16),
	new THREE.MeshBasicMaterial({ color: 0xffcc00, transparent: true, opacity: 0.35 })
);
playerMarkerGlow.position.y = 6;
playerMarker.add(playerMarkerGlow);

playerMarker.position.y = 1;
scene.add(playerMarker);

const minimapFocusMarker = new THREE.Group();
const minimapFocusRing = new THREE.Mesh(
	new THREE.TorusGeometry(12, 2.5, 12, 28),
	new THREE.MeshBasicMaterial({ color: 0x00ffd5 })
);
minimapFocusRing.rotation.x = Math.PI / 2;
minimapFocusRing.position.y = 3;
minimapFocusMarker.add(minimapFocusRing);

const minimapFocusBeam = new THREE.Mesh(
	new THREE.CylinderGeometry(2, 2, 18, 12, 1, true),
	new THREE.MeshBasicMaterial({ color: 0x00ffd5, transparent: true, opacity: 0.45 })
);
minimapFocusBeam.position.y = 10;
minimapFocusMarker.add(minimapFocusBeam);

minimapFocusMarker.visible = false;
scene.add(minimapFocusMarker);

let minimapFocusTarget = null;
let minimapFocusLabel = '';
let minimapFocusZoom = 1;

function updateMapNavigatorLayout() {
	if (!mapSearchInput || !mapSearchBtn || !mapClearBtn || !mapSearchResult) return;
	const minimapWidth = minimapContainer.getBoundingClientRect().width || 200;
	const targetWidth = Math.max(160, minimapWidth);
	const navigator = document.getElementById('mapNavigator');
	if (navigator) {
		navigator.style.left = `${32 + minimapWidth}px`;
		navigator.style.top = '20px';
		navigator.style.width = `${targetWidth}px`;
	}
}

updateMapNavigatorLayout();

// Minimap Hover-Effekte
let isHoveringMinimap = false;
let originalCamDistance = camDistance;
let originalCamAngleX = camAngleX;
let originalCamAngleY = camAngleY;

minimapContainer.addEventListener('mouseenter', () => {
    isHoveringMinimap = true;
    minimapContainer.style.borderColor = '#00ff00';
    minimapContainer.style.transform = 'scale(1.1)';

    // Speichere originale Kameraposition
    originalCamDistance = camDistance;
    originalCamAngleX = camAngleX;
    originalCamAngleY = camAngleY;

    // Wechsle zu Vogelperspektive
    camDistance = 200;
    camAngleX = Math.PI / 2 - 0.1; // Fast von oben
    camAngleY = Math.PI / 2; // Norden
});

minimapContainer.addEventListener('mouseleave', () => {
    isHoveringMinimap = false;
    minimapContainer.style.borderColor = '#fff';
    minimapContainer.style.transform = 'scale(1)';

    // Stelle originale Kameraposition wieder her
    camDistance = originalCamDistance;
    camAngleX = originalCamAngleX;
    camAngleY = originalCamAngleY;
});

window.addEventListener('resize', () => {
    camera.aspect = getAspect();
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Minimap responsive machen
    const minimapSize = Math.min(200, window.innerWidth * 0.15);
    minimapRenderer.setSize(minimapSize, minimapSize);
    minimapContainer.style.width = minimapSize + 'px';
    minimapContainer.style.height = minimapSize + 'px';
	updateMapNavigatorLayout();
});// Maussteuerung für Kamera (immer aktiv)

function normalizeMapSearchText(text) {
	return String(text || '').trim().toLowerCase();
}

function getMapSearchTargets() {
	const ownedTargets = ownedHouses.map(houseData => {
		const catalogEntry = houseCatalog.find(item => item.id === houseData.houseId) || houseCatalog[0];
		const plot = housePlots[houseData.plotIndex] || housePlots[0];
		return {
			label: catalogEntry.name,
			x: plot.x,
			z: plot.z
		};
	});

	return [...buildings, ...ownedTargets];
}

function focusMinimapOnHouse(target) {
	if (!target) return;
	minimapFocusTarget = { x: target.x, z: target.z };
	minimapFocusLabel = target.label;
	minimapFocusZoom = 3.6;
	minimapFocusMarker.position.set(target.x, 0, target.z);
	minimapFocusMarker.visible = true;
	if (mapSearchResult) {
		mapSearchResult.textContent = `${target.label} gefunden bei (${Math.round(target.x)}, ${Math.round(target.z)})`;
	}
	showMessage(`${target.label} auf der Karte markiert.`, 2500);
}

function clearMinimapFocus() {
	minimapFocusTarget = null;
	minimapFocusLabel = '';
	minimapFocusZoom = 1;
	minimapFocusMarker.visible = false;
	if (mapSearchResult) {
		mapSearchResult.textContent = 'Kartenfokus zurückgesetzt.';
	}
}

function searchHouseOnMap() {
	const query = normalizeMapSearchText(mapSearchInput ? mapSearchInput.value : '');
	if (!query) {
		if (mapSearchResult) {
			mapSearchResult.textContent = 'Bitte einen Hausnamen eingeben.';
		}
		return;
	}

	const match = getMapSearchTargets().find(target => normalizeMapSearchText(target.label).includes(query));
	if (!match) {
		if (mapSearchResult) {
			mapSearchResult.textContent = `Kein Haus zu "${query}" gefunden.`;
		}
		showMessage('Kein passendes Haus auf der Karte gefunden.', 2500);
		return;
	}

	focusMinimapOnHouse(match);
}

if (mapSearchBtn) {
	mapSearchBtn.addEventListener('click', searchHouseOnMap);
}

if (mapClearBtn) {
	mapClearBtn.addEventListener('click', () => {
		clearMinimapFocus();
		if (mapSearchInput) mapSearchInput.value = '';
	});
}

if (mapSearchInput) {
	mapSearchInput.addEventListener('keydown', event => {
		if (event.key === 'Enter') {
			searchHouseOnMap();
		}
	});
}
window.addEventListener('mousemove', (e) => {
	if (lastMouseX !== null && lastMouseY !== null) {
		const dx = e.clientX - lastMouseX;
		const dy = e.clientY - lastMouseY;
		camAngleY -= dx * 0.008;
		camAngleX -= dy * 0.008;
		camAngleX = Math.max(0.18, Math.min(1.2, camAngleX));
	}
	lastMouseX = e.clientX;
	lastMouseY = e.clientY;
});
// Vollbildfunktion
fullscreenBtn.addEventListener('click', () => {
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		document.body.requestFullscreen();
	}
});

// Boden (noch größer)

const groundGeo = new THREE.BoxGeometry(1800, 0.5, 1800);
const groundMat = new THREE.MeshPhongMaterial({ color: 0x228822 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.position.y = -0.25;
scene.add(ground);

// Straßen (als breite, dunkle Rechtecke)
function createStreet(x, z, width, length, rotation = 0) {
	const streetGeo = new THREE.BoxGeometry(width, 0.3, length);
	const streetMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
	const street = new THREE.Mesh(streetGeo, streetMat);
	street.position.set(x, 0.01, z);
	street.rotation.y = rotation;
	scene.add(street);
}

// Hauptstraßen (horizontal und vertikal)
// Autos
const cars = [];
const carSpeeds = [];
const carDirections = [];
const carIsHorizontal = [];

function createCar(x, z, color = 0xff0000) {
	const car = new THREE.Group();
	// Karosserie
	const bodyGeo = new THREE.BoxGeometry(3, 1.2, 6);
	const bodyMat = new THREE.MeshPhongMaterial({ color });
	const body = new THREE.Mesh(bodyGeo, bodyMat);
	body.position.y = 0.7;
	car.add(body);

	// Fenster (vorne und seitlich)
	const winMat = new THREE.MeshPhongMaterial({ color: 0x99ccff, transparent: true, opacity: 0.7 });
	const frontWinGeo = new THREE.BoxGeometry(2.2, 0.7, 0.1);
	const frontWin = new THREE.Mesh(frontWinGeo, winMat);
	frontWin.position.set(0, 1.1, -2.7);
	car.add(frontWin);
	const sideWinGeo = new THREE.BoxGeometry(0.1, 0.7, 3.2);
	const leftWin = new THREE.Mesh(sideWinGeo, winMat);
	leftWin.position.set(-1.45, 1.1, 0);
	car.add(leftWin);
	const rightWin = new THREE.Mesh(sideWinGeo, winMat);
	rightWin.position.set(1.45, 1.1, 0);
	car.add(rightWin);

	// Räder (größer und schwarz)
	const wheelGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.5, 20);
	const wheelMat = new THREE.MeshPhongMaterial({ color: 0x000000 });
	for (let dx of [-1.2, 1.2]) {
		for (let dz of [-2.3, 2.3]) {
			const wheel = new THREE.Mesh(wheelGeo, wheelMat);
			wheel.position.set(dx, 0.35, dz);
			wheel.rotation.z = Math.PI / 2;
			car.add(wheel);
		}
	}

	// Scheinwerfer
	const lightGeo = new THREE.SphereGeometry(0.18, 8, 8);
	const lightMat = new THREE.MeshPhongMaterial({ color: 0xffffcc, emissive: 0xffffcc });
	const leftLight = new THREE.Mesh(lightGeo, lightMat);
	leftLight.position.set(-0.7, 0.7, -3.1);
	car.add(leftLight);
	const rightLight = new THREE.Mesh(lightGeo, lightMat);
	rightLight.position.set(0.7, 0.7, -3.1);
	car.add(rightLight);

	car.position.set(x, 0, z);
	scene.add(car);
	return car;
}

// Autos werden erst nach Straßendefinition platziert (siehe unten initCars())

// Autos in Bewegung bringen
function animateCars() {
	// Autos fahren exakt auf den Straßen und wenden am Rand
	for (let i = 0; i < cars.length; i++) {
		const car = cars[i];
		const speed = carSpeeds[i];
		const dir = carDirections[i];
		// Finde die Straße, auf der das Auto ist
		let street = null;
		// Horizontale Autos: gleiche z-Position wie Straße
		if (carIsHorizontal[i]) {
			for (const s of streets) {
				if (Math.abs(car.position.z - s.z) < 2 && s.length > s.width) {
					street = s;
					break;
				}
			}
			if (!street) continue;
			car.position.x += speed * dir;
			// Umdrehen am Rand der Straße
			const minX = street.x - street.width / 2 + 1.5;
			const maxX = street.x + street.width / 2 - 1.5;
			if (car.position.x > maxX) carDirections[i] = -1;
			if (car.position.x < minX) carDirections[i] = 1;
			// Fixiere z auf Straßenmittelpunkt
			car.position.z = street.z;
		} else {
			for (const s of streets) {
				if (Math.abs(car.position.x - s.x) < 2 && s.width > s.length) {
					street = s;
					break;
				}
			}
			if (!street) continue;
			car.position.z += speed * dir;
			// Umdrehen am Rand der Straße
			const minZ = street.z - street.length / 2 + 1.5;
			const maxZ = street.z + street.length / 2 - 1.5;
			if (car.position.z > maxZ) carDirections[i] = -1;
			if (car.position.z < minZ) carDirections[i] = 1;
			// Fixiere x auf Straßenmittelpunkt
			car.position.x = street.x;
		}
	}
}
// Straßen-Definitionen für Kollisionslogik
const streets = [
	{ x: 0, z: -420, width: 700, length: 24, rot: 0 },
	{ x: 0, z: 420, width: 700, length: 24, rot: 0 },
	{ x: 420, z: 0, width: 24, length: 700, rot: 0 },
	{ x: -420, z: 0, width: 24, length: 700, rot: 0 },
	{ x: 0, z: 0, width: 700, length: 24, rot: 0 },
	{ x: 0, z: -180, width: 520, length: 18, rot: 0 },
	{ x: 0, z: 180, width: 520, length: 18, rot: 0 },
	{ x: 180, z: 0, width: 18, length: 520, rot: 0 },
	{ x: -180, z: 0, width: 18, length: 520, rot: 0 }
];
for (const s of streets) {
	createStreet(s.x, s.z, s.width, s.length, s.rot);
}

const zebraCrossingPoints = [];
const zebraXCenters = [-420, -180, 180, 420];
const zebraZCenters = [-420, -180, 0, 180, 420];

function createZebraCrossing(x, z) {
	const crossing = new THREE.Group();
	const base = new THREE.Mesh(
		new THREE.BoxGeometry(24, 0.08, 10),
		new THREE.MeshPhongMaterial({ color: 0x2f2f2f })
	);
	base.position.y = 0.06;
	crossing.add(base);

	for (let i = -3; i <= 3; i++) {
		const stripe = new THREE.Mesh(
			new THREE.BoxGeometry(2.2, 0.1, 9),
			new THREE.MeshPhongMaterial({ color: 0xffffff })
		);
		stripe.position.set(i * 3, 0.12, 0);
		crossing.add(stripe);
	}

	crossing.position.set(x, 0.02, z);
	scene.add(crossing);
	zebraCrossingPoints.push({ x, z, width: 24, length: 10, mesh: crossing });
}

for (const x of zebraXCenters) {
	for (const z of zebraZCenters) {
		createZebraCrossing(x, z);
	}
}

function isPointOnZebraCrossing(x, z) {
	for (const crossing of zebraCrossingPoints) {
		const minX = crossing.x - crossing.width / 2;
		const maxX = crossing.x + crossing.width / 2;
		const minZ = crossing.z - crossing.length / 2;
		const maxZ = crossing.z + crossing.length / 2;
		if (x >= minX && x <= maxX && z >= minZ && z <= maxZ) {
			return true;
		}
	}
	return false;
}

function getNearestZebraCrossing(x, z) {
	let nearest = zebraCrossingPoints[0];
	let nearestDistance = Infinity;
	for (const crossing of zebraCrossingPoints) {
		const distance = Math.sqrt(Math.pow(x - crossing.x, 2) + Math.pow(z - crossing.z, 2));
		if (distance < nearestDistance) {
			nearestDistance = distance;
			nearest = crossing;
		}
	}
	return nearest;
}

// Autos initialisieren – jetzt kennen wir die Straßen
function initCars() {
	// Säubern falls reinit
	cars.length = 0; carSpeeds.length = 0; carDirections.length = 0; carIsHorizontal.length = 0;
	// Für jede Straße einige Autos
	for (const st of streets) {
		const horizontal = st.length < st.width; // unsere Definition
		const count = horizontal ? 5 : 4; // etwas weniger auf vertikalen
		for (let i = 0; i < count; i++) {
			if (horizontal) {
				const x = st.x - st.width / 2 + 10 + Math.random() * (st.width - 20);
				const z = st.z; // exakt auf Straße
				const car = createCar(x, z, 0xff0000 + (i * 0x113300));
				cars.push(car);
				carSpeeds.push(0.4 + Math.random() * 0.25);
				carDirections.push(Math.random() < 0.5 ? 1 : -1);
				carIsHorizontal.push(true);
				// Leicht versetzte Spur (optisch) durch minimale z-Anpassung
				car.position.z += (i % 2 === 0 ? -0.8 : 0.8);
			} else {
				const z = st.z - st.length / 2 + 10 + Math.random() * (st.length - 20);
				const x = st.x;
				const car = createCar(x, z, 0x0088ff + (i * 0x220011));
				cars.push(car);
				carSpeeds.push(0.4 + Math.random() * 0.25);
				carDirections.push(Math.random() < 0.5 ? 1 : -1);
				carIsHorizontal.push(false);
				car.position.x += (i % 2 === 0 ? -0.8 : 0.8);
			}
		}
	}
}

initCars();

// Licht
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
dirLight.position.set(10, 20, 10);
scene.add(dirLight);


// Gebäude-Funktion
function createBuilding(x, z, color, label, houseType = 'default') {
	const group = new THREE.Group();
	
	if (houseType === 'mystery') {
		const mainBody = new THREE.Mesh(
			new THREE.BoxGeometry(26, 16, 22),
			new THREE.MeshPhongMaterial({ color: 0x20242c })
		);
		mainBody.position.y = 8;
		group.add(mainBody);

		const roof = new THREE.Mesh(
			new THREE.ConeGeometry(18, 9, 4),
			new THREE.MeshPhongMaterial({ color: 0x0f1115 })
		);
		roof.position.y = 21;
		group.add(roof);

		const windowGlowMat = new THREE.MeshPhongMaterial({ color: 0x9b59ff, emissive: 0x4b2e83 });
		for (let i = -1; i <= 1; i += 2) {
			const windowMesh = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.5, 0.4), windowGlowMat);
			windowMesh.position.set(i * 6, 10, 11);
			group.add(windowMesh);
		}

		const basementHatch = new THREE.Mesh(
			new THREE.BoxGeometry(4, 0.4, 4),
			new THREE.MeshPhongMaterial({ color: 0x111111 })
		);
		basementHatch.position.set(0, 0.2, -6);
		group.add(basementHatch);

		const hatchLight = new THREE.PointLight(0x9b59ff, 0.6, 18);
		hatchLight.position.set(0, 6, -7);
		group.add(hatchLight);

	} else if (houseType === 'villa') {
		// Große Villa mit zwei Flügeln
		const mainBuilding = new THREE.Mesh(
			new THREE.BoxGeometry(32, 18, 24),
			new THREE.MeshPhongMaterial({ color })
		);
		mainBuilding.position.y = 9;
		group.add(mainBuilding);

		const leftWing = new THREE.Mesh(
			new THREE.BoxGeometry(12, 14, 18),
			new THREE.MeshPhongMaterial({ color: 0xffffff })
		);
		leftWing.position.set(-16, 7, 0);
		group.add(leftWing);

		const rightWing = new THREE.Mesh(
			new THREE.BoxGeometry(12, 14, 18),
			new THREE.MeshPhongMaterial({ color: 0xf4f4f4 })
		);
		rightWing.position.set(16, 7, 0);
		group.add(rightWing);

		const roof = new THREE.Mesh(
			new THREE.ConeGeometry(24, 10, 4),
			new THREE.MeshPhongMaterial({ color: 0x7a5c3a })
		);
		roof.position.y = 24;
		group.add(roof);

		const balcony = new THREE.Mesh(
			new THREE.BoxGeometry(18, 1.2, 4),
			new THREE.MeshPhongMaterial({ color: 0xdddddd })
		);
		balcony.position.set(0, 12, 15);
		group.add(balcony);

	} else if (houseType === 'modern') {
		// Moderner Hochhaus-Stil
		const mainBuilding = new THREE.Mesh(
			new THREE.BoxGeometry(15, 60, 15),
			new THREE.MeshPhongMaterial({ color })
		);
		mainBuilding.position.y = 30;
		group.add(mainBuilding);
		
		// Balkone
		for (let i = 0; i < 5; i++) {
			const balcony = new THREE.Mesh(
				new THREE.BoxGeometry(16, 1, 3),
				new THREE.MeshPhongMaterial({ color: 0x666666 })
			);
			balcony.position.set(0, 10 + i * 10, 8);
			group.add(balcony);
		}
		
		// Dach
		const roof = new THREE.Mesh(
			new THREE.ConeGeometry(10, 8, 4),
			new THREE.MeshPhongMaterial({ color: 0x333333 })
		);
		roof.position.y = 66;
		group.add(roof);
		
	} else if (houseType === 'colonial') {
		// Kolonialstil-Haus
		const mainBuilding = new THREE.Mesh(
			new THREE.BoxGeometry(25, 35, 20),
			new THREE.MeshPhongMaterial({ color })
		);
		mainBuilding.position.y = 17.5;
		group.add(mainBuilding);
		
		// Säulen vor der Tür
		for (let i = 0; i < 4; i++) {
			const column = new THREE.Mesh(
				new THREE.CylinderGeometry(0.8, 0.8, 35, 8),
				new THREE.MeshPhongMaterial({ color: 0xFFFFFF })
			);
			column.position.set(-8 + i * 5, 17.5, 11);
			group.add(column);
		}
		
		// Dreieckiges Dach
		const roof = new THREE.Mesh(
			new THREE.ConeGeometry(18, 12, 3),
			new THREE.MeshPhongMaterial({ color: 0x8B4513 })
		);
		roof.position.y = 42;
		group.add(roof);
		
	} else if (houseType === 'tower') {
		// Turm-ähnliches Gebäude
		const tower = new THREE.Mesh(
			new THREE.CylinderGeometry(8, 10, 80, 12),
			new THREE.MeshPhongMaterial({ color })
		);
		tower.position.y = 40;
		group.add(tower);
		
		// Spitze
		const spire = new THREE.Mesh(
			new THREE.ConeGeometry(6, 15, 8),
			new THREE.MeshPhongMaterial({ color: 0xFFD700 })
		);
		spire.position.y = 87;
		group.add(spire);
		
	} else if (houseType === 'flat') {
		// Flaches Bürogebäude
		const building = new THREE.Mesh(
			new THREE.BoxGeometry(30, 25, 15),
			new THREE.MeshPhongMaterial({ color })
		);
		building.position.y = 12.5;
		group.add(building);
		
		// Viele Fenster
		for (let row = 0; row < 4; row++) {
			for (let col = 0; col < 6; col++) {
				const window = new THREE.Mesh(
					new THREE.BoxGeometry(3, 3, 0.5),
					new THREE.MeshPhongMaterial({ color: 0x87CEEB, transparent: true, opacity: 0.7 })
				);
				window.position.set(-12 + col * 4.5, 5 + row * 5, 8);
				group.add(window);
			}
		}
		
	} else if (houseType === 'cottage') {
		// Kleines Cottage
		const cottage = new THREE.Mesh(
			new THREE.BoxGeometry(18, 20, 16),
			new THREE.MeshPhongMaterial({ color })
		);
		cottage.position.y = 10;
		group.add(cottage);
		
		// Schiefes Dach
		const roof1 = new THREE.Mesh(
			new THREE.BoxGeometry(20, 2, 18),
			new THREE.MeshPhongMaterial({ color: 0x8B4513 })
		);
		roof1.position.set(0, 21, 0);
		roof1.rotation.z = Math.PI / 6;
		group.add(roof1);
		
		const roof2 = new THREE.Mesh(
			new THREE.BoxGeometry(20, 2, 18),
			new THREE.MeshPhongMaterial({ color: 0x8B4513 })
		);
		roof2.position.set(0, 21, 0);
		roof2.rotation.z = -Math.PI / 6;
		group.add(roof2);
		
		// Schornstein
		const chimney = new THREE.Mesh(
			new THREE.BoxGeometry(2, 8, 2),
			new THREE.MeshPhongMaterial({ color: 0x666666 })
		);
		chimney.position.set(6, 26, 0);
		group.add(chimney);
		
	} else {
		// Standard Haus (wie vorher)
		const wallMat = new THREE.MeshPhongMaterial({ color, side: THREE.FrontSide });
		const frontWallGeo = new THREE.BoxGeometry(20, 40, 0.5);
		const backWallGeo = new THREE.BoxGeometry(20, 40, 0.5);
		const sideWallGeo = new THREE.BoxGeometry(0.5, 40, 20);
		const frontWall = new THREE.Mesh(frontWallGeo, wallMat);
		const backWall = new THREE.Mesh(backWallGeo, wallMat);
		const leftWall = new THREE.Mesh(sideWallGeo, wallMat);
		const rightWall = new THREE.Mesh(sideWallGeo, wallMat);
		frontWall.position.set(0, 20, 10);
		backWall.position.set(0, 20, -10);
		leftWall.position.set(-10, 20, 0);
		rightWall.position.set(10, 20, 0);
		group.add(frontWall, backWall, leftWall, rightWall);
		
		const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshPhongMaterial({ color: 0x444444 }));
		floor.rotation.x = -Math.PI / 2;
		floor.position.y = 0.01;
		group.add(floor);
		
		// Dach für Standardhaus
		const roof = new THREE.Mesh(
			new THREE.ConeGeometry(15, 8, 4),
			new THREE.MeshPhongMaterial({ color: 0x8B4513 })
		);
		roof.position.y = 46;
		group.add(roof);
	}
	
	group.position.set(x, 0, z);
	scene.add(group);
	
	// Tür für alle Häuser
	const doorGeo = new THREE.BoxGeometry(3, 8, 0.5);
	const doorMat = new THREE.MeshPhongMaterial({ color: 0x663300 });
	const door = new THREE.Mesh(doorGeo, doorMat);
	door.position.set(x, 4, z + 10.3);
	scene.add(door);
	
	// Beschriftung über dem Gebäude
	const canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 64;
	const ctx = canvas.getContext('2d');
	ctx.fillStyle = '#fff';
	ctx.font = 'bold 32px Arial';
	ctx.textAlign = 'center';
	ctx.fillText(label, 128, 40);
	const texture = new THREE.CanvasTexture(canvas);
	const spriteMat = new THREE.SpriteMaterial({ map: texture });
	const sprite = new THREE.Sprite(spriteMat);
	sprite.scale.set(18, 4, 1);
	sprite.position.set(x, houseType === 'tower' ? 100 : houseType === 'modern' ? 75 : houseType === 'villa' ? 70 : 50, z + 12);
	scene.add(sprite);

	// Spezifische Details basierend auf dem Label
	if (label === 'Supermarkt') {
		// Regale im Inneren
		const shelfMat = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
		for (let i = 0; i < 3; i++) {
			const shelf = new THREE.Mesh(new THREE.BoxGeometry(15, 2, 1), shelfMat);
			shelf.position.set(-5 + i * 5, 1 + i * 5, 0);
			group.add(shelf);
		}
		// Produkte auf Regalen
		const productMat = new THREE.MeshPhongMaterial({ color: 0xff0000 });
		for (let i = 0; i < 5; i++) {
			const product = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), productMat);
			product.position.set(-7 + i * 3, 2, 0);
			group.add(product);
		}
	} else if (label === 'Bank') {
		// Tresen
		const counter = new THREE.Mesh(new THREE.BoxGeometry(18, 3, 2), new THREE.MeshPhongMaterial({ color: 0x654321 }));
		counter.position.set(0, 1.5, 8);
		group.add(counter);
		// Geldautomat
		const atm = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 0.5), new THREE.MeshPhongMaterial({ color: 0x333333 }));
		atm.position.set(8, 2, 8);
		group.add(atm);
	} else if (label === 'Krankenhaus') {
		// Rotes Kreuz
		const crossMat = new THREE.MeshPhongMaterial({ color: 0xff0000 });
		const vertical = new THREE.Mesh(new THREE.BoxGeometry(0.5, 4, 0.5), crossMat);
		vertical.position.set(0, 2, 0);
		group.add(vertical);
		const horizontal = new THREE.Mesh(new THREE.BoxGeometry(2, 0.5, 0.5), crossMat);
		horizontal.position.set(0, 2, 0);
		group.add(horizontal);
	} else if (label === 'Polizei') {
		// Polizeischild
		const sign = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 0.1), new THREE.MeshPhongMaterial({ color: 0x0000ff }));
		sign.position.set(0, 3, 10.2);
		group.add(sign);
	} else if (label === 'Feuerwehr') {
		// Feuerwehrschlauch
		const hose = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 10), new THREE.MeshPhongMaterial({ color: 0x000000 }));
		hose.position.set(5, 1, 0);
		hose.rotation.z = Math.PI / 2;
		group.add(hose);
	} else if (label === 'Kino') {
		// Leinwand
		const screen = new THREE.Mesh(new THREE.PlaneGeometry(10, 6), new THREE.MeshPhongMaterial({ color: 0xffffff }));
		screen.position.set(0, 3, -9.9);
		group.add(screen);
	} else if (label === 'Bibliothek') {
		// Bücherregale
		const bookMat = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
		for (let i = 0; i < 4; i++) {
			const shelf = new THREE.Mesh(new THREE.BoxGeometry(15, 1, 1), bookMat);
			shelf.position.set(0, 1 + i * 3, -5 + i * 2);
			group.add(shelf);
		}
	} else if (label === 'Hotel') {
		// Betten (vereinfacht)
		const bedMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
		const bed = new THREE.Mesh(new THREE.BoxGeometry(4, 1, 2), bedMat);
		bed.position.set(0, 0.5, 0);
		group.add(bed);
	} else if (label === 'Büro') {
		// Schreibtische
		const deskMat = new THREE.MeshPhongMaterial({ color: 0x654321 });
		for (let i = 0; i < 2; i++) {
			const desk = new THREE.Mesh(new THREE.BoxGeometry(3, 1, 2), deskMat);
			desk.position.set(-5 + i * 10, 0.5, 0);
			group.add(desk);
		}
	} else if (label === 'Schule') {
		// Tafel
		const board = new THREE.Mesh(new THREE.PlaneGeometry(8, 4), new THREE.MeshPhongMaterial({ color: 0x000000 }));
		board.position.set(0, 2, -9.9);
		group.add(board);
	} else if (label === 'Wohnung') {
		// Sofa
		const sofa = new THREE.Mesh(new THREE.BoxGeometry(4, 1, 2), new THREE.MeshPhongMaterial({ color: 0x8B4513 }));
		sofa.position.set(0, 0.5, 5);
		group.add(sofa);
	} else if (label === 'Bahnhof') {
		// Gleise (vereinfacht)
		const rail = new THREE.Mesh(new THREE.BoxGeometry(20, 0.2, 0.5), new THREE.MeshPhongMaterial({ color: 0x333333 }));
		rail.position.set(0, 0.1, 0);
		group.add(rail);
	}

	return group;
}

function createTree(x, z) {
	const tree = new THREE.Group();
	
	// Stamm
	const trunkGeo = new THREE.CylinderGeometry(1, 1.5, 8, 8);
	const trunkMat = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
	const trunk = new THREE.Mesh(trunkGeo, trunkMat);
	trunk.position.y = 4;
	tree.add(trunk);
	
	// Blätter (mehrere Spheres für volleres Aussehen)
	const leavesMat = new THREE.MeshPhongMaterial({ color: 0x228B22 });
	const leavesGeo = new THREE.SphereGeometry(4, 8, 6);
	const leaves = new THREE.Mesh(leavesGeo, leavesMat);
	leaves.position.y = 10;
	tree.add(leaves);
	
	// Zusätzliche kleine Blätter für Volumen
	const smallLeavesGeo = new THREE.SphereGeometry(2, 6, 4);
	const smallLeaves1 = new THREE.Mesh(smallLeavesGeo, leavesMat);
	smallLeaves1.position.set(2, 9, 1);
	tree.add(smallLeaves1);
	
	const smallLeaves2 = new THREE.Mesh(smallLeavesGeo, leavesMat);
	smallLeaves2.position.set(-2, 11, -1);
	tree.add(smallLeaves2);
	
	tree.position.set(x, 0, z);
	scene.add(tree);
	return tree;
}

function createFountain(x, z) {
	const fountain = new THREE.Group();
	
	// Basis (Stein)
	const baseGeo = new THREE.CylinderGeometry(3, 3, 2, 16);
	const baseMat = new THREE.MeshPhongMaterial({ color: 0x708090 });
	const base = new THREE.Mesh(baseGeo, baseMat);
	base.position.y = 1;
	fountain.add(base);
	
	// Wasserschale
	const bowlGeo = new THREE.CylinderGeometry(4, 3.5, 1, 16);
	const bowlMat = new THREE.MeshPhongMaterial({ color: 0x4682B4 });
	const bowl = new THREE.Mesh(bowlGeo, bowlMat);
	bowl.position.y = 2.5;
	fountain.add(bowl);
	
	// Springbrunnen-Säule
	const columnGeo = new THREE.CylinderGeometry(0.5, 0.5, 3, 8);
	const columnMat = new THREE.MeshPhongMaterial({ color: 0xC0C0C0 });
	const column = new THREE.Mesh(columnGeo, columnMat);
	column.position.y = 4;
	fountain.add(column);
	
	// Wasserstrahl (animierte kleine Spheres)
	const waterMat = new THREE.MeshPhongMaterial({ color: 0x00BFFF, transparent: true, opacity: 0.7 });
	const waterGeo = new THREE.SphereGeometry(0.3, 6, 4);
	const water1 = new THREE.Mesh(waterGeo, waterMat);
	water1.position.set(0, 5.5, 0);
	fountain.add(water1);
	
	const water2 = new THREE.Mesh(waterGeo, waterMat);
	water2.position.set(0, 6.2, 0);
	fountain.add(water2);
	
	fountain.position.set(x, 0, z);
	scene.add(fountain);
	return fountain;
}

function createGrass(x, z) {
	const grass = new THREE.Group();
	
	// Mehrere Grasbüschel
	const grassMat = new THREE.MeshPhongMaterial({ color: 0x32CD32 });
	const grassGeo = new THREE.PlaneGeometry(0.5, 2);
	
	for (let i = 0; i < 8; i++) {
		const blade = new THREE.Mesh(grassGeo, grassMat);
		blade.position.set(
			(Math.random() - 0.5) * 4,
			1,
			(Math.random() - 0.5) * 4
		);
		blade.rotation.x = -Math.PI / 6 + Math.random() * Math.PI / 3;
		grass.add(blade);
	}
	
	grass.position.set(x, 0, z);
	scene.add(grass);
	return grass;
}

function createFlower(x, z) {
	const flower = new THREE.Group();
	
	// Stängel
	const stemGeo = new THREE.CylinderGeometry(0.05, 0.05, 1, 6);
	const stemMat = new THREE.MeshPhongMaterial({ color: 0x228B22 });
	const stem = new THREE.Mesh(stemGeo, stemMat);
	stem.position.y = 0.5;
	flower.add(stem);
	
	// Blüte (mehrere bunte Petalen)
	const colors = [0xFF69B4, 0xFFFF00, 0xFF4500, 0x9370DB, 0x00FF7F];
	const petalMat = new THREE.MeshPhongMaterial({ color: colors[Math.floor(Math.random() * colors.length)] });
	const petalGeo = new THREE.PlaneGeometry(0.3, 0.3);
	
	for (let i = 0; i < 6; i++) {
		const petal = new THREE.Mesh(petalGeo, petalMat);
		petal.position.y = 1;
		petal.rotation.y = (i / 6) * Math.PI * 2;
		petal.position.x = Math.cos((i / 6) * Math.PI * 2) * 0.2;
		petal.position.z = Math.sin((i / 6) * Math.PI * 2) * 0.2;
		flower.add(petal);
	}
	
	flower.position.set(x, 0, z);
	scene.add(flower);
	return flower;
}

function createBench(x, z) {
	const bench = new THREE.Group();
	
	// Sitzfläche
	const seatGeo = new THREE.BoxGeometry(3, 0.3, 1);
	const seatMat = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
	const seat = new THREE.Mesh(seatGeo, seatMat);
	seat.position.y = 0.8;
	bench.add(seat);
	
	// Rückenlehne
	const backGeo = new THREE.BoxGeometry(3, 1.5, 0.2);
	const back = new THREE.Mesh(backGeo, seatMat);
	back.position.set(0, 1.5, -0.4);
	bench.add(back);
	
	// Beine
	const legGeo = new THREE.BoxGeometry(0.2, 0.8, 0.2);
	const leg1 = new THREE.Mesh(legGeo, seatMat);
	leg1.position.set(-1.3, 0.4, 0.4);
	bench.add(leg1);
	
	const leg2 = new THREE.Mesh(legGeo, seatMat);
	leg2.position.set(1.3, 0.4, 0.4);
	bench.add(leg2);
	
	const leg3 = new THREE.Mesh(legGeo, seatMat);
	leg3.position.set(-1.3, 0.4, -0.4);
	bench.add(leg3);
	
	const leg4 = new THREE.Mesh(legGeo, seatMat);
	leg4.position.set(1.3, 0.4, -0.4);
	bench.add(leg4);
	
	bench.position.set(x, 0, z);
	scene.add(bench);
	return bench;
}

function createStreetLamp(x, z) {
	const lamp = new THREE.Group();
	
	// Mast
	const poleGeo = new THREE.CylinderGeometry(0.1, 0.15, 6, 8);
	const poleMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
	const pole = new THREE.Mesh(poleGeo, poleMat);
	pole.position.y = 3;
	lamp.add(pole);
	
	// Lampenkopf
	const headGeo = new THREE.SphereGeometry(0.3, 8, 6);
	const headMat = new THREE.MeshPhongMaterial({ color: 0xFFFF99, emissive: 0x444400 });
	const head = new THREE.Mesh(headGeo, headMat);
	head.position.y = 6.2;
	lamp.add(head);
	
	// Lichtstrahl (unsichtbar, aber für Atmosphäre)
	const light = new THREE.PointLight(0xFFFF99, 0.5, 20);
	light.position.set(0, 6, 0);
	lamp.add(light);
	
	lamp.position.set(x, 0, z);
	scene.add(lamp);
	return lamp;
}

function createPark(x, z, size = 40) {
	const park = new THREE.Group();
	
	// Grasfläche
	const grassGeo = new THREE.PlaneGeometry(size, size);
	const grassMat = new THREE.MeshPhongMaterial({ color: 0x228B22 });
	const grass = new THREE.Mesh(grassGeo, grassMat);
	grass.rotation.x = -Math.PI / 2;
	grass.position.y = 0.01;
	park.add(grass);
	
	// Bäume im Park
	const treeCount = Math.floor(size / 8);
	for (let i = 0; i < treeCount; i++) {
		const treeX = (Math.random() - 0.5) * (size - 10);
		const treeZ = (Math.random() - 0.5) * (size - 10);
		const tree = createTree(treeX, treeZ);
		park.add(tree);
	}
	
	// Bänke im Park
	const benchCount = Math.floor(size / 15);
	for (let i = 0; i < benchCount; i++) {
		const benchX = (Math.random() - 0.5) * (size - 8);
		const benchZ = (Math.random() - 0.5) * (size - 8);
		const bench = createBench(benchX, benchZ);
		park.add(bench);
	}
	
	// Blumen im Park
	const flowerCount = Math.floor(size / 5);
	for (let i = 0; i < flowerCount; i++) {
		const flowerX = (Math.random() - 0.5) * (size - 4);
		const flowerZ = (Math.random() - 0.5) * (size - 4);
		const flower = createFlower(flowerX, flowerZ);
		park.add(flower);
	}
	
	park.position.set(x, 0, z);
	scene.add(park);
	return park;
}
const buildings = [
	{ x: -80, z: -80, color: 0x8888ff, label: 'Jobcenter', houseType: 'flat' },
	{ x: 80, z: -80, color: 0xff8888, label: 'Supermarkt', houseType: 'flat' },
	{ x: 0, z: 80, color: 0x88ff88, label: 'Park', houseType: 'default' },
	{ x: 160, z: 140, color: 0x2266aa, label: 'Bank', houseType: 'colonial' },
	{ x: -160, z: 140, color: 0xaa6622, label: 'Kino', houseType: 'modern' },
	{ x: 200, z: -140, color: 0x44aa44, label: 'Schule', houseType: 'flat' },
	{ x: -200, z: -140, color: 0xaa4444, label: 'Krankenhaus', houseType: 'modern' },
	{ x: 140, z: -220, color: 0x4444aa, label: 'Polizei', houseType: 'colonial' },
	{ x: -140, z: -220, color: 0xaa4444, label: 'Feuerwehr', houseType: 'tower' },
	{ x: 260, z: 60, color: 0x555555, label: 'Büro', houseType: 'modern' },
	{ x: -260, z: 60, color: 0x884488, label: 'Wohnung', houseType: 'flat' },
	{ x: 100, z: 240, color: 0x448888, label: 'Hotel', houseType: 'modern' },
	{ x: -100, z: 240, color: 0x888844, label: 'Bibliothek', houseType: 'colonial' },
	{ x: 0, z: -260, color: 0x336666, label: 'Bahnhof', houseType: 'flat' },
	{ x: -80, z: 200, color: 0xFF6B35, label: 'Autohaus', houseType: 'flat' },
	{ x: 0, z: -80, color: 0xd84d86, label: 'Modeshop', houseType: 'flat' },
	{ x: 360, z: -340, color: 0x9c88ff, label: 'Wohnhaus A', houseType: 'flat' },
	{ x: 420, z: -140, color: 0x7ed6df, label: 'Wohnhaus B', houseType: 'colonial' },
	{ x: 340, z: 260, color: 0xf6e58d, label: 'Wohnhaus C', houseType: 'default' },
	{ x: -360, z: -340, color: 0xffbe76, label: 'Wohnhaus D', houseType: 'flat' },
	{ x: -420, z: 120, color: 0x95afc0, label: 'Wohnhaus E', houseType: 'default' },
	{ x: -320, z: 300, color: 0xeb4d4b, label: 'Wohnhaus F', houseType: 'modern' },
	{ x: 260, z: 380, color: 0x6ab04c, label: 'Wohnhaus G', houseType: 'flat' },
	{ x: -220, z: 420, color: 0x4834d4, label: 'Wohnhaus H', houseType: 'colonial' },
	{ x: 440, z: 360, color: 0x22a6b3, label: 'Wohnhaus I', houseType: 'default' },
	{ x: -440, z: -40, color: 0xf0932b, label: 'Wohnhaus J', houseType: 'flat' }
];
const buildingBounds = [];
let currentBuildingIndex = null; // Spieler aktuell in diesem Gebäude oder null
for (const b of buildings) {
	createBuilding(b.x, b.z, b.color, b.label, b.houseType || 'default');
	buildingBounds.push({
		minX: b.x - 10,
		maxX: b.x + 10,
		minZ: b.z - 10,
		maxZ: b.z + 10,
		doorX: b.x,
		doorZ: b.z + 10.3,
		doorWidth: 3,
		doorHeight: 8
	});
}

// Natur-Elemente hinzufügen
// Bäume
for (let i = 0; i < 30; i++) {
	const x = Math.random() * 1200 - 600;
	const z = Math.random() * 1200 - 600;
	// Vermeide Gebäude-Bereiche
	let valid = true;
	for (const b of buildings) {
		if (Math.abs(x - b.x) < 30 && Math.abs(z - b.z) < 30) {
			valid = false;
			break;
		}
	}
	if (valid) {
		createTree(x, z);
	}
}

// Brunnen
for (let i = 0; i < 10; i++) {
	const x = Math.random() * 1000 - 500;
	const z = Math.random() * 1000 - 500;
	let valid = true;
	for (const b of buildings) {
		if (Math.abs(x - b.x) < 40 && Math.abs(z - b.z) < 40) {
			valid = false;
			break;
		}
	}
	if (valid) {
		createFountain(x, z);
	}
}

// Gras und Blumen
for (let i = 0; i < 60; i++) {
	const x = Math.random() * 1400 - 700;
	const z = Math.random() * 1400 - 700;
	let valid = true;
	for (const b of buildings) {
		if (Math.abs(x - b.x) < 25 && Math.abs(z - b.z) < 25) {
			valid = false;
			break;
		}
	}
	if (valid) {
		if (Math.random() > 0.7) {
			createFlower(x, z);
		} else {
			createGrass(x, z);
		}
	}
}

// Bänke hinzufügen
for (let i = 0; i < 20; i++) {
	const x = Math.random() * 1000 - 500;
	const z = Math.random() * 1000 - 500;
	let valid = true;
	for (const b of buildings) {
		if (Math.abs(x - b.x) < 20 && Math.abs(z - b.z) < 20) {
			valid = false;
			break;
		}
	}
	if (valid) {
		createBench(x, z);
	}
}

// Straßenlaternen hinzufügen
for (let i = 0; i < 32; i++) {
	const x = Math.random() * 1000 - 500;
	const z = Math.random() * 1000 - 500;
	let valid = true;
	for (const b of buildings) {
		if (Math.abs(x - b.x) < 15 && Math.abs(z - b.z) < 15) {
			valid = false;
			break;
		}
	}
	if (valid) {
		createStreetLamp(x, z);
	}
}

// Parks hinzufügen
const parks = [
	{ x: 0, z: 80, size: 50 }, // Beim bestehenden Park-Gebäude
	{ x: 150, z: -200, size: 35 },
	{ x: -200, z: -150, size: 40 },
	{ x: 250, z: 100, size: 45 },
	{ x: 420, z: -260, size: 55 },
	{ x: -420, z: 260, size: 55 },
	{ x: 320, z: 360, size: 48 },
	{ x: -320, z: -360, size: 48 }
];

for (const p of parks) {
	let valid = true;
	for (const b of buildings) {
		if (Math.abs(p.x - b.x) < p.size/2 + 15 && Math.abs(p.z - b.z) < p.size/2 + 15) {
			valid = false;
			break;
		}
	}
	if (valid) {
		createPark(p.x, p.z, p.size);
	}
}

// Hilfsfunktion für Mensch-Modell

function createBird(x, z, y = 10) {
	const bird = new THREE.Group();
	
	// Körper
	const bodyGeo = new THREE.SphereGeometry(0.3, 8, 6);
	const bodyMat = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
	const body = new THREE.Mesh(bodyGeo, bodyMat);
	bird.add(body);
	
	// Flügel
	const wingGeo = new THREE.PlaneGeometry(1, 0.2);
	const wingMat = new THREE.MeshPhongMaterial({ color: 0x654321, side: THREE.DoubleSide });
	const wing1 = new THREE.Mesh(wingGeo, wingMat);
	wing1.position.set(-0.5, 0, 0);
	wing1.rotation.z = Math.PI / 6;
	bird.add(wing1);
	
	const wing2 = new THREE.Mesh(wingGeo, wingMat);
	wing2.position.set(0.5, 0, 0);
	wing2.rotation.z = -Math.PI / 6;
	bird.add(wing2);
	
	// Schnabel
	const beakGeo = new THREE.ConeGeometry(0.1, 0.3, 6);
	const beakMat = new THREE.MeshPhongMaterial({ color: 0xFFA500 });
	const beak = new THREE.Mesh(beakGeo, beakMat);
	beak.position.set(0, 0, 0.3);
	beak.rotation.x = Math.PI / 2;
	bird.add(beak);
	
	// Schwanzfedern
	const tailGeo = new THREE.PlaneGeometry(0.6, 0.15);
	const tailMat = new THREE.MeshPhongMaterial({ color: 0x654321, side: THREE.DoubleSide });
	const tail = new THREE.Mesh(tailGeo, tailMat);
	tail.position.set(0, -0.1, -0.4);
	bird.add(tail);
	
	bird.position.set(x, y, z);
	bird.rotation.y = Math.random() * Math.PI * 2;
	
	// Animationsdaten
	bird.userData = {
		wingSpeed: 0.02 + Math.random() * 0.03,
		wingAngle: 0,
		originalY: y,
		flightSpeed: 0.01 + Math.random() * 0.02,
		flightAngle: Math.random() * Math.PI * 2,
		flightRadius: 5 + Math.random() * 10
	};
	
	scene.add(bird);
	return bird;
}

// Wetter-System
let currentWeather = 'sunny';
let weatherParticles = [];
let weatherChangeTime = Date.now() + 30000; // Wetter ändert sich alle 30 Sekunden

// Initiale Himmel-Farbe setzen
updateSkyColor();

function createRainDrop(x, z, y = 20) {
	const drop = new THREE.Group();
	
	// Regentropfen
	const dropGeo = new THREE.CylinderGeometry(0.02, 0.01, 0.5, 6);
	const dropMat = new THREE.MeshPhongMaterial({ 
		color: 0x87CEEB, 
		transparent: true, 
		opacity: 0.6 
	});
	const rainDrop = new THREE.Mesh(dropGeo, dropMat);
	drop.add(rainDrop);
	
	drop.position.set(x, y, z);
	drop.userData = {
		fallSpeed: 0.3 + Math.random() * 0.2,
		wind: (Math.random() - 0.5) * 0.1
	};
	
	return drop;
}

function createSnowFlake(x, z, y = 20) {
	const flake = new THREE.Group();
	
	// Schneeflocke (einfache Sternform)
	const flakeGeo = new THREE.PlaneGeometry(0.1, 0.1);
	const flakeMat = new THREE.MeshPhongMaterial({ 
		color: 0xFFFFFF, 
		transparent: true, 
		opacity: 0.8,
		side: THREE.DoubleSide
	});
	const snowFlake = new THREE.Mesh(flakeGeo, flakeMat);
	flake.add(snowFlake);
	
	flake.position.set(x, y, z);
	flake.userData = {
		fallSpeed: 0.05 + Math.random() * 0.05,
		wind: (Math.random() - 0.5) * 0.05,
		rotationSpeed: (Math.random() - 0.5) * 0.02
	};
	
	return flake;
}

function createFogParticle(x, z, y = 2) {
	const fog = new THREE.Group();
	
	// Nebel-Partikel
	const fogGeo = new THREE.SphereGeometry(2 + Math.random() * 3, 8, 6);
	const fogMat = new THREE.MeshPhongMaterial({ 
		color: 0xE0E0E0, 
		transparent: true, 
		opacity: 0.1 + Math.random() * 0.1
	});
	const fogParticle = new THREE.Mesh(fogGeo, fogMat);
	fog.add(fogParticle);
	
	fog.position.set(x, y, z);
	fog.userData = {
		floatSpeed: 0.01 + Math.random() * 0.02,
		floatAngle: Math.random() * Math.PI * 2
	};
	
	return fog;
}

function updateWeather() {
	const now = Date.now();
	
	// Wetter zufällig ändern
	if (now > weatherChangeTime) {
		const weathers = ['sunny', 'rainy', 'snowy', 'foggy'];
		const oldWeather = currentWeather;
		currentWeather = weathers[Math.floor(Math.random() * weathers.length)];
		
		// Alte Partikel entfernen
		for (const particle of weatherParticles) {
			if (particle.parent) {
				particle.parent.remove(particle);
			}
		}
		weatherParticles = [];
		
		// Neues Wetter einstellen
		if (currentWeather === 'rainy') {
			showMessage('🌧️ Es regnet!', 3000);
			// Regen-Partikel erstellen
			for (let i = 0; i < 100; i++) {
				const x = Math.random() * 200 - 100;
				const z = Math.random() * 200 - 100;
				const drop = createRainDrop(x, z);
				weatherParticles.push(drop);
				scene.add(drop);
			}
		} else if (currentWeather === 'snowy') {
			showMessage('❄️ Es schneit!', 3000);
			// Schnee-Partikel erstellen
			for (let i = 0; i < 80; i++) {
				const x = Math.random() * 200 - 100;
				const z = Math.random() * 200 - 100;
				const flake = createSnowFlake(x, z);
				weatherParticles.push(flake);
				scene.add(flake);
			}
		} else if (currentWeather === 'foggy') {
			showMessage('🌫️ Es ist nebelig!', 3000);
			// Nebel-Partikel erstellen
			for (let i = 0; i < 15; i++) {
				const x = Math.random() * 150 - 75;
				const z = Math.random() * 150 - 75;
				const fog = createFogParticle(x, z);
				weatherParticles.push(fog);
				scene.add(fog);
			}
		} else if (currentWeather === 'sunny') {
			showMessage('☀️ Sonniges Wetter!', 3000);
		}
		
		weatherChangeTime = now + 30000 + Math.random() * 30000; // 30-60 Sekunden
		
		// Himmel-Farbe aktualisieren
		updateSkyColor();
	}
	
	// Wetter-Partikel animieren
	for (const particle of weatherParticles) {
		if (currentWeather === 'rainy') {
			// Regen fallen lassen
			particle.position.y -= particle.userData.fallSpeed;
			particle.position.x += particle.userData.wind;
			
			// Regen zurücksetzen wenn zu tief
			if (particle.position.y < -5) {
				particle.position.y = 25;
				particle.position.x = Math.random() * 200 - 100;
				particle.position.z = Math.random() * 200 - 100;
			}
		} else if (currentWeather === 'snowy') {
			// Schnee fallen lassen
			particle.position.y -= particle.userData.fallSpeed;
			particle.position.x += particle.userData.wind;
			particle.rotation.z += particle.userData.rotationSpeed;
			
			// Schnee zurücksetzen
			if (particle.position.y < -5) {
				particle.position.y = 25;
				particle.position.x = Math.random() * 200 - 100;
				particle.position.z = Math.random() * 200 - 100;
			}
		} else if (currentWeather === 'foggy') {
			// Nebel schweben lassen
			particle.userData.floatAngle += particle.userData.floatSpeed;
			particle.position.x += Math.cos(particle.userData.floatAngle) * 0.01;
			particle.position.z += Math.sin(particle.userData.floatAngle) * 0.01;
			particle.position.y += Math.sin(particle.userData.floatAngle * 0.5) * 0.005;
		}
	}
}

function updateSkyColor() {
	// Himmel-Farbe je nach Wetter ändern
	if (currentWeather === 'sunny') {
		// Heller, freundlicher blauer Himmel
		scene.background = new THREE.Color(0x87CEEB);
	} else if (currentWeather === 'rainy') {
		// Dunkler, grauer Himmel bei Regen
		scene.background = new THREE.Color(0x4a5568);
	} else if (currentWeather === 'snowy') {
		// Heller, klarer Himmel bei Schnee
		scene.background = new THREE.Color(0xb0c4de);
	} else if (currentWeather === 'foggy') {
		// Nebeliger, grauer Himmel
		scene.background = new THREE.Color(0x708090);
	}
}

// Dialog-System
let currentNPC = null;
let currentDialogState = 0;

const npcDialogs = {
	0: { // Normaler Bürger
		name: "Bürger",
		dialogs: [
			{
				text: "Hallo! Schön dich in unserer Stadt zu sehen. Wie gefällt es dir hier?",
				options: ["Sehr gut!", "Ganz okay", "Auf Wiedersehen"]
			},
			{
				text: "Das freut mich! Die Stadt hat sich in letzter Zeit sehr verändert.",
				options: ["Was hat sich geändert?", "Interessant", "Tschüss"]
			},
			{
				text: "Es gibt jetzt mehr Jobs, Geschäfte und sogar Parks! Schau dich um.",
				options: ["Danke für den Tipp!", "Okay", "Bye"]
			}
		]
	},
	1: { // Geschäftsmann
		name: "Geschäftsmann",
		dialogs: [
			{
				text: "Ah, ein neues Gesicht! Bist du hier, um Geschäfte zu machen?",
				options: ["Ja, ich arbeite hier", "Nein, nur spazieren", "Auf Wiedersehen"]
			},
			{
				text: "Ausgezeichnet! Die Wirtschaft boomt gerade. Viele neue Möglichkeiten!",
				options: ["Was für Möglichkeiten?", "Toll!", "Tschüss"]
			},
			{
				text: "Jobs, Investitionen, Immobilien... Die Stadt wächst jeden Tag!",
				options: ["Interessant!", "Okay", "Bye"]
			}
		]
	},
	2: { // Polizist (spezielle Dialoge)
		name: "Polizist",
		dialogs: [
			{
				text: "Guten Tag! Ich bin hier, um für Sicherheit zu sorgen. Alles in Ordnung?",
				options: ["Ja, alles gut", "Ich brauche Hilfe", "Auf Wiedersehen"]
			},
			{
				text: "Gut zu hören! Bleib aus Schwierigkeiten raus und genieße die Stadt.",
				options: ["Verstanden!", "Okay", "Tschüss"]
			},
			{
				text: "Wenn du Hilfe brauchst, komm jederzeit vorbei. Wir sind für dich da!",
				options: ["Danke!", "Okay", "Bye"]
			}
		]
	},
	3: { // Rentner
		name: "Rentner",
		dialogs: [
			{
				text: "Ah, junger Mensch! Die Stadt war früher viel ruhiger...",
				options: ["Was hat sich geändert?", "Interessant", "Auf Wiedersehen"]
			},
			{
				text: "Früher gab es nur ein paar Häuser. Jetzt ist überall Leben!",
				options: ["Das klingt schön", "Okay", "Tschüss"]
			},
			{
				text: "Aber ich mag die neuen Parks. Da kann man schön spazieren gehen.",
				options: ["Stimmt!", "Okay", "Bye"]
			}
		]
	},
	4: { // Kind
		name: "Kind",
		dialogs: [
			{
				text: "Hallo! Spielst du auch gerne draußen?",
				options: ["Ja, sehr gerne!", "Manchmal", "Auf Wiedersehen"]
			},
			{
				text: "Cool! Die Parks sind super zum Spielen. Und die Tiere sind lustig!",
				options: ["Welche Tiere?", "Toll!", "Tschüss"]
			},
			{
				text: "Vögel, Hunde, Katzen... Manchmal sehe ich sogar Eichhörnchen!",
				options: ["Süß!", "Okay", "Bye"]
			}
		]
	},
	5: { // Tourist
		name: "Tourist",
		dialogs: [
			{
				text: "Wow, diese Stadt ist größer als ich dachte!",
				options: ["Ja, ziemlich groß", "Erst seit kurzem", "Auf Wiedersehen"]
			},
			{
				text: "Ich suche gerade die schönsten Orte für Fotos.",
				options: ["Viel Spaß dabei", "Nimm den Park", "Tschüss"]
			},
			{
				text: "Vielleicht fahre ich später noch zum Bahnhof. Danke!",
				options: ["Gerne", "Okay", "Bye"]
			}
		]
	},
	6: { // Handwerker
		name: "Handwerker",
		dialogs: [
			{
				text: "Ich bin gerade auf dem Weg zu einem Auftrag.",
				options: ["Viel Erfolg", "Was machst du?", "Auf Wiedersehen"]
			},
			{
				text: "Die Stadt wächst schnell. Das hält uns ganz schön auf Trab.",
				options: ["Kann ich glauben", "Interessant", "Tschüss"]
			},
			{
				text: "Wenn du etwas bauen willst, brauchst du gutes Werkzeug.",
				options: ["Stimmt", "Okay", "Bye"]
			}
		]
	},
	7: { // Student
		name: "Student",
		dialogs: [
			{
				text: "Ich muss eigentlich noch lernen, bin aber erstmal spazieren gegangen.",
				options: ["Klassisch", "Wofür lernst du?", "Auf Wiedersehen"]
			},
			{
				text: "Die Bibliothek ist echt praktisch, wenn man Ruhe braucht.",
				options: ["Stimmt", "Ich gehe auch oft hin", "Tschüss"]
			},
			{
				text: "Nach der Prüfung gönne ich mir erstmal was zu essen.",
				options: ["Verdient", "Viel Glück", "Bye"]
			}
		]
	},
	8: { // Verkäuferin
		name: "Verkäuferin",
		dialogs: [
			{
				text: "Willkommen! Heute ist viel los im Laden.",
				options: ["Das glaube ich", "Was verkauft ihr?", "Auf Wiedersehen"]
			},
			{
				text: "Frische Ware geht immer zuerst weg.",
				options: ["Klar", "Interessant", "Tschüss"]
			},
			{
				text: "Wenn du etwas brauchst, schau einfach vorbei.",
				options: ["Mach ich", "Danke", "Bye"]
			}
		]
	},
	9: { // Taxifahrer
		name: "Taxifahrer",
		dialogs: [
			{
				text: "Die besten Fahrten sind die, bei denen niemand zu spät kommt.",
				options: ["Genau", "Fährst du oft?", "Auf Wiedersehen"]
			},
			{
				text: "Ich kenne fast jede Ecke der Stadt.",
				options: ["Praktisch", "Zeig mal", "Tschüss"]
			},
			{
				text: "Am Abend ist hier immer der meiste Verkehr.",
				options: ["Stimmt", "Danke", "Bye"]
			}
		]
	},
	10: { // Sportler
		name: "Sportler",
		dialogs: [
			{
				text: "Ich war gerade joggen. Die Luft hier ist gut!",
				options: ["Cool", "Wie oft?", "Auf Wiedersehen"]
			},
			{
				text: "Ein bisschen Bewegung tut jedem gut.",
				options: ["Stimmt", "Ich sollte auch", "Tschüss"]
			},
			{
				text: "Die Parks sind perfekt zum Trainieren.",
				options: ["Ja", "Danke", "Bye"]
			}
		]
	},
	11: { // Nachbar
		name: "Nachbar",
		dialogs: [
			{
				text: "Na, schon das neue Viertel erkundet?",
				options: ["Ja", "Noch nicht", "Auf Wiedersehen"]
			},
			{
				text: "Hier kennt man sich langsam alle ein bisschen.",
				options: ["Das ist nett", "Scheint so", "Tschüss"]
			},
			{
				text: "Wenn du Fragen hast, frag ruhig rum.",
				options: ["Mach ich", "Danke", "Bye"]
			}
		]
	},
	12: { // Auftraggeber
		name: "Auftraggeber",
		dialogs: [
			{
				text: "Hey! Ich brauche jemanden für einen Auftrag!",
				options: ["Ich helfe", "Was gibt es?", "Später"]
			},
			{
				text: "Wenn du das erledigst, bekommst du direkt Geld.",
				options: ["Klingt gut", "Wie viel?", "Tschüss"]
			},
			{
				text: "Komm näher und ich gebe dir die Aufgabe.",
				options: ["Okay", "Ich bin da", "Bye"]
			}
		]
	}
};

const npcDialogKeys = Object.keys(npcDialogs);

function getNpcDialogData(npcIndex) {
	const npc = npcs[npcIndex];
	const dialogKey = npc && npc.userData ? npc.userData.dialogKey : null;
	return npcDialogs[dialogKey] || npcDialogs[npcIndex % npcDialogKeys.length] || npcDialogs[0];
}

function createRequesterCallout(text) {
	const canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 96;
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgba(255, 220, 80, 0.95)';
	ctx.strokeStyle = '#2b1b00';
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.roundRect(10, 10, 236, 66, 18);
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle = '#1a1a1a';
	ctx.font = 'bold 24px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(text, 128, 43);
	const texture = new THREE.CanvasTexture(canvas);
	const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
	const sprite = new THREE.Sprite(material);
	sprite.scale.set(7, 2.6, 1);
	sprite.position.set(0, 5.2, 0);
	return sprite;
}

function startDialog(npcIndex) {
	currentNPC = npcIndex;
	const npcData = getNpcDialogData(npcIndex);
	currentDialogState = npcs[npcIndex] && npcs[npcIndex].userData && npcs[npcIndex].userData.isRequester ? 'quest' : 0;
	
	npcName.textContent = npcData.name;
	updateDialog();
	
	dialogPanel.style.display = 'block';
}

function updateDialog() {
	const npcData = getNpcDialogData(currentNPC);
	
	// Spezielle Behandlung für Quest-Dialoge
	if (currentDialogState === 'quest') {
		const quest = generateQuest(npcs[currentNPC]);
		if (quest) {
			dialogText.textContent = quest.npcDialog;
			dialogOption1.textContent = "Quest annehmen";
			dialogOption2.textContent = "Mehr erfahren";
			dialogOption3.textContent = "Nein danke";
		} else {
			// Fallback zu normalem Dialog
			currentDialogState = 0;
			const currentDialog = npcData.dialogs[currentDialogState];
			if (currentDialog) {
				dialogText.textContent = currentDialog.text;
				dialogOption1.textContent = currentDialog.options[0] || "Okay";
				dialogOption2.textContent = currentDialog.options[1] || "Verstanden";
				dialogOption3.textContent = currentDialog.options[2] || "Auf Wiedersehen";
			}
		}
		return;
	}
	
	const currentDialog = npcData.dialogs[currentDialogState];
	
	if (currentDialog) {
		dialogText.textContent = currentDialog.text;
		dialogOption1.textContent = currentDialog.options[0] || "Okay";
		dialogOption2.textContent = currentDialog.options[1] || "Verstanden";
		dialogOption3.textContent = currentDialog.options[2] || "Auf Wiedersehen";
	} else {
		closeDialog();
	}
}

function selectDialogOption(optionIndex) {
	const npcData = getNpcDialogData(currentNPC);
	
	// Quest-Dialog Behandlung
	if (currentDialogState === 'quest') {
		const quest = generateQuest(npcs[currentNPC]);
		if (optionIndex === 0 && quest) { // Quest annehmen
			startQuest(quest);
			showMessage(`Quest "${quest.title}" angenommen!`, 3000);
			closeDialog();
		} else if (optionIndex === 1 && quest) { // Mehr erfahren
			showMessage(`Quest: ${quest.description}`, 4000);
		} else { // Nein danke oder andere Option
			closeDialog();
		}
		return;
	}
	
	const currentDialog = npcData.dialogs[currentDialogState];
	
	// Quest-Logik: 30% Chance, dass NPC eine Quest anbietet
	if (currentDialogState === 0 && Math.random() < 0.3) {
		const quest = generateQuest(npcs[currentNPC]);
		if (quest) {
			// Quest-Dialog starten
			currentDialogState = 'quest';
			updateDialog();
			return;
		}
	}
	
	if (optionIndex === 2 || currentDialogState >= npcData.dialogs.length - 1) {
		// Auf Wiedersehen oder letzter Dialog
		closeDialog();
	} else {
		// Nächster Dialog
		currentDialogState++;
		updateDialog();
	}
}

function closeDialog() {
	dialogPanel.style.display = 'none';
	currentNPC = null;
	currentDialogState = 0;
}

function checkNPCInteraction() {
	// Prüfe Distanz zu NPCs
	for (let i = 0; i < npcs.length; i++) {
		const npc = npcs[i];
		const distance = Math.sqrt(
			Math.pow(npc.position.x - player.position.x, 2) +
			Math.pow(npc.position.z - player.position.z, 2)
		);
		
		if (distance < 5 && !dialogPanel.style.display !== 'none') {
			showMessage('Drücke E, um mit NPC zu sprechen', 2000);
			return i; // NPC Index zurückgeben
		}
	}
	return -1;
}

let faceSeedCounter = 0;

function drawDistinctFace(ctx, seed, tone) {
	const variant = seed % 8;
	const faceHue = tone || '#e1b899';
	const grad = ctx.createRadialGradient(32, 32, 10, 32, 32, 32);
	grad.addColorStop(0, '#fff');
	grad.addColorStop(1, faceHue);
	ctx.fillStyle = grad;
	ctx.beginPath();
	ctx.arc(32, 32, 30, 0, 2 * Math.PI);
	ctx.fill();

	ctx.strokeStyle = '#222';
	ctx.lineWidth = 3;

	if (variant === 0) {
		ctx.fillStyle = '#222';
		ctx.beginPath(); ctx.arc(22, 32, 4, 0, 2 * Math.PI); ctx.fill();
		ctx.beginPath(); ctx.arc(42, 32, 4, 0, 2 * Math.PI); ctx.fill();
		ctx.strokeStyle = '#8b0000';
		ctx.lineWidth = 4;
		ctx.beginPath(); ctx.arc(32, 43, 11, 0, Math.PI); ctx.stroke();
	} else if (variant === 1) {
		ctx.fillStyle = '#222';
		ctx.beginPath(); ctx.ellipse(22, 31, 5, 7, -0.1, 0, 2 * Math.PI); ctx.fill();
		ctx.beginPath(); ctx.ellipse(42, 31, 5, 7, 0.1, 0, 2 * Math.PI); ctx.fill();
		ctx.fillStyle = '#fff';
		ctx.beginPath(); ctx.arc(24, 30, 1.8, 0, 2 * Math.PI); ctx.fill();
		ctx.beginPath(); ctx.arc(44, 30, 1.8, 0, 2 * Math.PI); ctx.fill();
		ctx.strokeStyle = '#a52a2a';
		ctx.lineWidth = 4;
		ctx.beginPath(); ctx.arc(32, 45, 10, 0.1 * Math.PI, 0.9 * Math.PI); ctx.stroke();
	} else if (variant === 2) {
		ctx.fillStyle = '#222';
		ctx.beginPath(); ctx.ellipse(22, 30, 4, 6, 0, 0, 2 * Math.PI); ctx.fill();
		ctx.beginPath(); ctx.ellipse(42, 30, 4, 6, 0, 0, 2 * Math.PI); ctx.fill();
		ctx.strokeStyle = '#663300';
		ctx.lineWidth = 3;
		ctx.beginPath(); ctx.moveTo(14, 24); ctx.lineTo(28, 23); ctx.stroke();
		ctx.beginPath(); ctx.moveTo(36, 23); ctx.lineTo(50, 24); ctx.stroke();
		ctx.strokeStyle = '#222';
		ctx.lineWidth = 4;
		ctx.beginPath(); ctx.moveTo(25, 47); ctx.quadraticCurveTo(32, 42, 39, 47); ctx.stroke();
	} else if (variant === 3) {
		ctx.fillStyle = '#222';
		ctx.beginPath(); ctx.arc(22, 31, 3, 0, 2 * Math.PI); ctx.fill();
		ctx.beginPath(); ctx.arc(42, 31, 3, 0, 2 * Math.PI); ctx.fill();
		ctx.strokeStyle = '#444';
		ctx.lineWidth = 3;
		ctx.beginPath(); ctx.moveTo(18, 24); ctx.lineTo(28, 28); ctx.stroke();
		ctx.beginPath(); ctx.moveTo(34, 28); ctx.lineTo(46, 24); ctx.stroke();
		ctx.strokeStyle = '#8b0000';
		ctx.lineWidth = 4;
		ctx.beginPath(); ctx.arc(32, 44, 11, Math.PI, 2 * Math.PI); ctx.stroke();
	} else if (variant === 4) {
		ctx.fillStyle = '#222';
		ctx.beginPath(); ctx.ellipse(20, 31, 4.5, 6.5, -0.15, 0, 2 * Math.PI); ctx.fill();
		ctx.beginPath(); ctx.ellipse(44, 31, 4.5, 6.5, 0.15, 0, 2 * Math.PI); ctx.fill();
		ctx.fillStyle = '#fff';
		ctx.beginPath(); ctx.arc(20, 30, 1.5, 0, 2 * Math.PI); ctx.fill();
		ctx.beginPath(); ctx.arc(44, 30, 1.5, 0, 2 * Math.PI); ctx.fill();
		ctx.fillStyle = '#8b5a2b';
		ctx.beginPath(); ctx.arc(32, 42, 6, 0, 2 * Math.PI); ctx.fill();
	} else if (variant === 5) {
		ctx.fillStyle = '#222';
		ctx.beginPath(); ctx.arc(20, 32, 3.5, 0, 2 * Math.PI); ctx.fill();
		ctx.beginPath(); ctx.arc(44, 32, 3.5, 0, 2 * Math.PI); ctx.fill();
		ctx.fillStyle = '#fff';
		ctx.beginPath(); ctx.arc(20, 31, 1, 0, 2 * Math.PI); ctx.fill();
		ctx.beginPath(); ctx.arc(44, 31, 1, 0, 2 * Math.PI); ctx.fill();
		ctx.strokeStyle = '#a52a2a';
		ctx.lineWidth = 3;
		ctx.beginPath(); ctx.moveTo(24, 45); ctx.lineTo(40, 45); ctx.stroke();
		ctx.fillStyle = '#7f4f24';
		ctx.beginPath(); ctx.arc(12, 32, 2, 0, 2 * Math.PI); ctx.fill();
		ctx.beginPath(); ctx.arc(52, 32, 2, 0, 2 * Math.PI); ctx.fill();
	} else if (variant === 6) {
		ctx.fillStyle = '#222';
		ctx.beginPath(); ctx.ellipse(22, 31, 5, 6, 0.2, 0, 2 * Math.PI); ctx.fill();
		ctx.beginPath(); ctx.ellipse(42, 31, 5, 6, -0.2, 0, 2 * Math.PI); ctx.fill();
		ctx.strokeStyle = '#222';
		ctx.lineWidth = 3;
		ctx.beginPath(); ctx.moveTo(18, 22); ctx.lineTo(29, 24); ctx.stroke();
		ctx.beginPath(); ctx.moveTo(35, 24); ctx.lineTo(46, 22); ctx.stroke();
		ctx.strokeStyle = '#555';
		ctx.lineWidth = 2;
		ctx.beginPath(); ctx.arc(32, 46, 10, 0, Math.PI); ctx.stroke();
		ctx.strokeStyle = '#333';
		ctx.beginPath(); ctx.moveTo(29, 38); ctx.lineTo(35, 38); ctx.stroke();
	} else {
		ctx.fillStyle = '#222';
		ctx.beginPath(); ctx.arc(22, 32, 4, 0, 2 * Math.PI); ctx.fill();
		ctx.beginPath(); ctx.arc(42, 32, 4, 0, 2 * Math.PI); ctx.fill();
		ctx.fillStyle = '#fff';
		ctx.beginPath(); ctx.arc(24, 31, 1, 0, 2 * Math.PI); ctx.fill();
		ctx.beginPath(); ctx.arc(44, 31, 1, 0, 2 * Math.PI); ctx.fill();
		ctx.strokeStyle = '#222';
		ctx.lineWidth = 3;
		ctx.beginPath(); ctx.moveTo(18, 24); ctx.lineTo(28, 25); ctx.stroke();
		ctx.beginPath(); ctx.moveTo(36, 25); ctx.lineTo(46, 24); ctx.stroke();
		ctx.strokeStyle = '#a52a2a';
		ctx.lineWidth = 4;
		ctx.beginPath(); ctx.arc(32, 44, 12, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
	}

	if (variant === 1 || variant === 4) {
		ctx.strokeStyle = '#8b5a2b';
		ctx.lineWidth = 2;
		ctx.beginPath(); ctx.arc(19, 31, 1, 0, 2 * Math.PI); ctx.stroke();
		ctx.beginPath(); ctx.arc(45, 31, 1, 0, 2 * Math.PI); ctx.stroke();
	}
}

function createHuman() {
	const human = new THREE.Group();
	// Zufällige Farben
	const skinTones = [0xffe0b2, 0xfad7b5, 0xe1b899, 0xc68642, 0x8d5524];
	const hairColors = [0x222222, 0x6b4f1d, 0xf5e6c8, 0xdeb887, 0x333333, 0x8b0000];
	const clothesColors = [0x2196f3, 0x4caf50, 0xf44336, 0xffeb3b, 0x9c27b0, 0x795548];
	const skin = skinTones[Math.floor(Math.random() * skinTones.length)];
	const hair = hairColors[Math.floor(Math.random() * hairColors.length)];
	const clothes = clothesColors[Math.floor(Math.random() * clothesColors.length)];

	// Körper (schmaler, länglicher)
	const bodyGeo = new THREE.BoxGeometry(1, 2.8, 0.7);
	const bodyMat = new THREE.MeshPhongMaterial({ color: clothes });
	const body = new THREE.Mesh(bodyGeo, bodyMat);
	body.position.y = 2.1;
	human.add(body);

	// Kopf (etwas kleiner)
	const headGeo = new THREE.SphereGeometry(0.55, 18, 18);
	const headMat = new THREE.MeshPhongMaterial({ color: skin });
	const head = new THREE.Mesh(headGeo, headMat);
	head.position.y = 3.5;
	human.add(head);

	// Gesicht
	const faceCanvas = document.createElement('canvas');
	faceCanvas.width = 64;
	faceCanvas.height = 64;
	const ctx = faceCanvas.getContext('2d');
	drawDistinctFace(ctx, faceSeedCounter++);
	const faceTex = new THREE.CanvasTexture(faceCanvas);
	const faceMat = new THREE.MeshBasicMaterial({ map: faceTex });
	const facePlane = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.38), faceMat);
	facePlane.position.set(0, 3.5, 0.56);
	human.add(facePlane);

	// Haare (Kappe/Halbkugel)
	const hairGeo = new THREE.SphereGeometry(0.57, 18, 18, 0, Math.PI * 2, 0, Math.PI / 2);
	const hairMat = new THREE.MeshPhongMaterial({ color: hair });
	const hairMesh = new THREE.Mesh(hairGeo, hairMat);
	hairMesh.position.y = 3.7;
	human.add(hairMesh);

	// Arme (schmaler, proportional)
	const armGeo = new THREE.BoxGeometry(0.28, 1.5, 0.28);
	const armMat = new THREE.MeshPhongMaterial({ color: skin });
	const leftArm = new THREE.Mesh(armGeo, armMat);
	leftArm.position.set(-0.7, 2.3, 0);
	leftArm.name = 'leftArm';
	human.add(leftArm);
	const rightArm = new THREE.Mesh(armGeo, armMat);
	rightArm.position.set(0.7, 2.3, 0);
	rightArm.name = 'rightArm';
	human.add(rightArm);

	// Beine (schmaler, proportional)
	const legGeo = new THREE.BoxGeometry(0.32, 1.7, 0.32);
	const legMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
	const leftLeg = new THREE.Mesh(legGeo, legMat);
	leftLeg.position.set(-0.3, 0.5, 0);
	human.add(leftLeg);
	const rightLeg = new THREE.Mesh(legGeo, legMat);
	rightLeg.position.set(0.3, 0.5, 0);
	human.add(rightLeg);

	// Optional: T-Shirt-Streifen
	if (Math.random() > 0.5) {
		const stripeGeo = new THREE.BoxGeometry(1, 0.2, 0.71);
		const stripeMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
		const stripe = new THREE.Mesh(stripeGeo, stripeMat);
		stripe.position.y = 2.3;
		human.add(stripe);
	}

	return human;
}

function createPolice() {
	const human = new THREE.Group();
	// Zufällige Farben für Haut und Haare
	const skinTones = [0xffe0b2, 0xfad7b5, 0xe1b899, 0xc68642, 0x8d5524];
	const hairColors = [0x222222, 0x6b4f1d, 0xf5e6c8, 0xdeb887, 0x333333, 0x8b0000];
	const skin = skinTones[Math.floor(Math.random() * skinTones.length)];
	const hair = hairColors[Math.floor(Math.random() * hairColors.length)];

	// Körper (T-Shirt mit Streifen)
	const bodyGeo = new THREE.BoxGeometry(1, 2.8, 0.7);
	const bodyMat = new THREE.MeshPhongMaterial({ color: 0x0000ff }); // Blau
	const body = new THREE.Mesh(bodyGeo, bodyMat);
	body.position.y = 2.1;
	human.add(body);

	// Schwarze Streifen
	const stripeGeo = new THREE.BoxGeometry(1.01, 0.15, 0.71);
	const stripeMat = new THREE.MeshPhongMaterial({ color: 0x000000 });
	const stripe1 = new THREE.Mesh(stripeGeo, stripeMat);
	stripe1.position.y = 2.4;
	human.add(stripe1);
	const stripe2 = new THREE.Mesh(stripeGeo, stripeMat);
	stripe2.position.y = 2.1;
	human.add(stripe2);
	const stripe3 = new THREE.Mesh(stripeGeo, stripeMat);
	stripe3.position.y = 1.8;
	human.add(stripe3);

	// Weiße Streifen
	const whiteStripeGeo = new THREE.BoxGeometry(1.01, 0.1, 0.71);
	const whiteStripeMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
	const whiteStripe1 = new THREE.Mesh(whiteStripeGeo, whiteStripeMat);
	whiteStripe1.position.y = 2.55;
	human.add(whiteStripe1);
	const whiteStripe2 = new THREE.Mesh(whiteStripeGeo, whiteStripeMat);
	whiteStripe2.position.y = 1.65;
	human.add(whiteStripe2);

	// Kopf
	const headGeo = new THREE.SphereGeometry(0.55, 18, 18);
	const headMat = new THREE.MeshPhongMaterial({ color: skin });
	const head = new THREE.Mesh(headGeo, headMat);
	head.position.y = 3.5;
	human.add(head);

	// Gesicht
	const faceCanvas = document.createElement('canvas');
	faceCanvas.width = 64;
	faceCanvas.height = 64;
	const ctx = faceCanvas.getContext('2d');
	drawDistinctFace(ctx, faceSeedCounter++, '#d7b18a');
	const faceTex = new THREE.CanvasTexture(faceCanvas);
	const faceMat = new THREE.MeshBasicMaterial({ map: faceTex });
	const facePlane = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.38), faceMat);
	facePlane.position.set(0, 3.5, 0.56);
	human.add(facePlane);

	// Haare
	const hairGeo = new THREE.SphereGeometry(0.57, 18, 18, 0, Math.PI * 2, 0, Math.PI / 2);
	const hairMat = new THREE.MeshPhongMaterial({ color: hair });
	const hairMesh = new THREE.Mesh(hairGeo, hairMat);
	hairMesh.position.y = 3.7;
	human.add(hairMesh);

	// Arme
	const armGeo = new THREE.BoxGeometry(0.28, 1.5, 0.28);
	const armMat = new THREE.MeshPhongMaterial({ color: skin });
	const leftArm = new THREE.Mesh(armGeo, armMat);
	leftArm.position.set(-0.7, 2.3, 0);
	leftArm.name = 'leftArm';
	human.add(leftArm);
	const rightArm = new THREE.Mesh(armGeo, armMat);
	rightArm.position.set(0.7, 2.3, 0);
	rightArm.name = 'rightArm';
	human.add(rightArm);

	// Beine
	const legGeo = new THREE.BoxGeometry(0.32, 1.7, 0.32);
	const legMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
	const leftLeg = new THREE.Mesh(legGeo, legMat);
	leftLeg.position.set(-0.3, 0.5, 0);
	human.add(leftLeg);
	const rightLeg = new THREE.Mesh(legGeo, legMat);
	rightLeg.position.set(0.3, 0.5, 0);
	human.add(rightLeg);

	return human;
}

// Spieler
const player = createHuman();
player.position.set(0, 0, 0);
player.children[0].name = 'playerBody';
player.children[1].name = 'playerHead';
player.children[4].name = 'playerLeftArm';
player.children[5].name = 'playerRightArm';
player.children[6].name = 'playerLeftLeg';
player.children[7].name = 'playerRightLeg';
scene.add(player);
let multiplayerSocket = null;
let lobbySocket = null;
let remotePlayer = null;
let remotePlayerId = null;
let remotePlayerTarget = null;
let lastMultiplayerUpdate = 0;

const fashionCatalog = {
	outfit: {
		street: { price: 70, color: 0x3567c8, legColor: 0x202531 },
		elegant: { price: 120, color: 0x261c39, legColor: 0x16121e },
		sport: { price: 95, color: 0xd7483f, legColor: 0x303840 }
	},
	skin: {
		light: { price: 40, color: 0xffe0b2 },
		warm: { price: 40, color: 0xc68642 },
		dark: { price: 40, color: 0x8d5524 }
	},
	hat: {
		cap: { price: 80, color: 0x263d78 },
		beanie: { price: 90, color: 0x293232 },
		crown: { price: 150, color: 0xf3c538 }
	}
};

function getFashionState() {
	try {
		return JSON.parse(getGameData('fashionState')) || { owned: [], selected: {} };
	} catch {
		return { owned: [], selected: {} };
	}
}

let fashionState = getFashionState();

function createPlayerHat(type, color) {
	const hat = new THREE.Group();
	hat.name = 'playerHat';
	const material = new THREE.MeshPhongMaterial({ color });
	if (type === 'cap') {
		const cap = new THREE.Mesh(new THREE.SphereGeometry(0.62, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2), material);
		cap.position.y = 4.02;
		hat.add(cap);
		const brim = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.09, 0.45), material);
		brim.position.set(0, 3.93, 0.52);
		hat.add(brim);
	} else if (type === 'beanie') {
		const beanie = new THREE.Mesh(new THREE.SphereGeometry(0.64, 18, 14, 0, Math.PI * 2, 0, Math.PI * 0.72), material);
		beanie.position.y = 3.95;
		hat.add(beanie);
	} else if (type === 'crown') {
		const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.58, 0.35, 6, 1, true), material);
		crown.position.y = 4.12;
		hat.add(crown);
	}
	player.add(hat);
}

function applyFashion() {
	const { selected } = fashionState;
	const outfit = fashionCatalog.outfit[selected.outfit];
	const skin = fashionCatalog.skin[selected.skin];
	const hat = fashionCatalog.hat[selected.hat];
	if (outfit) {
		const outfitColor = fashionState.outfitColor || outfit.color;
		player.getObjectByName('playerBody').material.color.setHex(outfitColor);
		player.getObjectByName('playerLeftLeg').material.color.setHex(outfit.legColor);
		player.getObjectByName('playerRightLeg').material.color.setHex(outfit.legColor);
	}
	if (skin) {
		player.getObjectByName('playerHead').material.color.setHex(skin.color);
		player.getObjectByName('playerLeftArm').material.color.setHex(skin.color);
		player.getObjectByName('playerRightArm').material.color.setHex(skin.color);
	}
	const oldHat = player.getObjectByName('playerHat');
	if (oldHat) player.remove(oldHat);
	if (hat) createPlayerHat(selected.hat, hat.color);
	fashionOptionButtons.forEach(button => {
		button.classList.toggle('selected', fashionState.selected[button.dataset.category] === button.dataset.value);
		button.classList.toggle('owned', fashionState.owned.includes(`${button.dataset.category}:${button.dataset.value}`));
	});
	const hasOutfit = Boolean(selected.outfit);
	outfitColorButtons.forEach(button => {
		const color = Number(button.dataset.color);
		button.disabled = !hasOutfit;
		button.classList.toggle('selected', hasOutfit && (fashionState.outfitColor || outfit.color) === color);
	});
	outfitColorHint.textContent = hasOutfit ? 'Farbe ändern - kostenlos.' : 'Kaufe zuerst ein Outfit.';
}

function buyFashionItem(category, value) {
	const item = fashionCatalog[category]?.[value];
	if (!item) return;
	const itemId = `${category}:${value}`;
	if (!fashionState.owned.includes(itemId)) {
		if (money < item.price) {
			showMessage(`Zu wenig Geld! Du brauchst ${item.price}€.`, 2500);
			return;
		}
		money -= item.price;
		moneySpan.textContent = `Geld: ${money} €`;
		fashionState.owned.push(itemId);
		saveData();
		showMessage(`Gekauft: ${value === 'crown' ? 'Krone' : 'neuer Look'}!`, 2200);
	}
	fashionState.selected[category] = value;
	setGameData('fashionState', JSON.stringify(fashionState));
	applyFashion();
}

function selectOutfitColor(color) {
	if (!fashionState.selected.outfit) {
		showMessage('Kaufe zuerst ein Outfit.', 2000);
		return;
	}
	fashionState.outfitColor = color;
	setGameData('fashionState', JSON.stringify(fashionState));
	applyFashion();
}

applyFashion();

// NPCs
const npcs = [];
const npcSpeeds = [];
const npcTargets = [];
const npcCrosswalkTargets = [];
const npcCrosswalkReturnTargets = [];
const npcCrosswalkCooldowns = [];
const npcIsFalling = [];
const npcFallTime = [];
const npcIsChasing = [];

const NPC_CROSSWALK_CHANCE = 0.18;
const NPC_CROSSWALK_COOLDOWN_MS = 12000;

function getValidSpawn() {
	let x, z;
	let tries = 0;
	do {
		x = Math.random() * 600 - 300; // größeres Gebiet
		z = Math.random() * 600 - 300;
		tries++;
		// nicht in Gebäude
		let inBuilding = false;
		for (const b of buildingBounds) {
			if (x > b.minX && x < b.maxX && z > b.minZ && z < b.maxZ) { inBuilding = true; break; }
		}
		if (inBuilding) continue;
		// nicht auf Straße
		let onStreet = false;
		for (const s of streets) {
			const minX = s.x - s.width / 2;
			const maxX = s.x + s.width / 2;
			const minZ = s.z - s.length / 2;
			const maxZ = s.z + s.length / 2;
			if (x > minX && x < maxX && z > minZ && z < maxZ) { onStreet = true; break; }
		}
		if (onStreet) continue;
		return { x, z };
	} while (tries < 50);
	return { x, z }; // Fallback
}

function addNPCs(count) {
	const civilianDialogKeys = ['0', '1', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
	const policeDialogKeys = ['2', '2', '2', '9'];
	for (let i = 0; i < count; i++) {
		let npc;
		let pos;
		if (i < 3) {
			// Polizisten nahe Polizei
			npc = createPolice();
			pos = { x: 140 + (Math.random() - 0.5) * 20, z: -220 + (Math.random() - 0.5) * 20 };
			npc.userData.dialogKey = policeDialogKeys[i % policeDialogKeys.length];
		} else {
			npc = createHuman();
			pos = getValidSpawn();
			npc.userData.dialogKey = civilianDialogKeys[i % civilianDialogKeys.length];
		}
		npc.position.set(pos.x, 0, pos.z);
		scene.add(npc);
		npcs.push(npc);
		npcSpeeds.push(0.08 + Math.random() * 0.07);
		const tgt = getValidSpawn();
		npcTargets.push({ x: tgt.x, z: tgt.z });
		npcCrosswalkTargets.push(null);
		npcCrosswalkReturnTargets.push(null);
		npcCrosswalkCooldowns.push(0);
		npcIsFalling.push(false);
		npcFallTime.push(0);
		npcIsChasing.push(false);
	}
}

addNPCs(60); // vorher waren es 30

function addRequesterNPCs() {
	const requesterSpots = [
		{ x: -115, z: -96 },
		{ x: 95, z: -96 },
		{ x: 150, z: 108 },
		{ x: -156, z: 108 }
	];

	requesterSpots.forEach((spot, index) => {
		const requester = createHuman();
		requester.position.set(spot.x, 0, spot.z);
		requester.userData.id = `requester_${index}`;
		requester.userData.dialogKey = '12';
		requester.userData.isRequester = true;
		requester.userData.isStationary = true;
		requester.userData.shoutTimer = Date.now() + index * 2500;
		requester.add(createRequesterCallout('AUFTRAG!'));
		scene.add(requester);
		npcs.push(requester);
		npcSpeeds.push(0);
		npcTargets.push({ x: spot.x, z: spot.z });
		npcCrosswalkTargets.push(null);
		npcCrosswalkReturnTargets.push(null);
		npcCrosswalkCooldowns.push(0);
		npcIsFalling.push(false);
		npcFallTime.push(0);
		npcIsChasing.push(false);
	});
}

addRequesterNPCs();

// Vögel hinzufügen
const birds = [];
for (let i = 0; i < 8; i++) {
	const x = Math.random() * 1000 - 500;
	const z = Math.random() * 1000 - 500;
	const y = 8 + Math.random() * 15; // Verschiedene Höhen
	const bird = createBird(x, z, y);
	birds.push(bird);
}

// Steuerung
let keys = {};
document.addEventListener('keydown', e => {
	keys[e.key.toLowerCase()] = true;
});
document.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

const mobileJoystick = document.getElementById('mobileJoystick');
const mobileJoystickKnob = document.getElementById('mobileJoystickKnob');
const mobileInteractBtn = document.getElementById('mobileInteractBtn');
const mobileReceptionBtn = document.getElementById('mobileReceptionBtn');
const mobilePunchBtn = document.getElementById('mobilePunchBtn');
let mobileJoystickPointerId = null;
let mobileCameraPointer = null;
let mobileControlsEnabled = false;
let mobileInputsInitialized = false;

function setMobileMovement(horizontal, vertical) {
	keys['w'] = vertical < -0.25;
	keys['s'] = vertical > 0.25;
	keys['a'] = horizontal < -0.25;
	keys['d'] = horizontal > 0.25;
}

function updateMobileJoystick(event) {
	const bounds = mobileJoystick.getBoundingClientRect();
	const centerX = bounds.left + bounds.width / 2;
	const centerY = bounds.top + bounds.height / 2;
	const maxOffset = bounds.width * 0.3;
	const offsetX = Math.max(-maxOffset, Math.min(maxOffset, event.clientX - centerX));
	const offsetY = Math.max(-maxOffset, Math.min(maxOffset, event.clientY - centerY));
	mobileJoystickKnob.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
	setMobileMovement(offsetX / maxOffset, offsetY / maxOffset);
}

function resetMobileJoystick() {
	mobileJoystickPointerId = null;
	mobileJoystickKnob.style.transform = 'translate(0, 0)';
	setMobileMovement(0, 0);
}

function triggerMobileKey(key) {
	document.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
	document.dispatchEvent(new KeyboardEvent('keyup', { key, bubbles: true }));
}

function initializeMobileInputs() {
	if (mobileInputsInitialized) return;
	mobileInputsInitialized = true;
	mobileJoystick.addEventListener('pointerdown', event => {
		if (!mobileControlsEnabled) return;
		mobileJoystickPointerId = event.pointerId;
		mobileJoystick.setPointerCapture(event.pointerId);
		updateMobileJoystick(event);
	});
	mobileJoystick.addEventListener('pointermove', event => {
		if (mobileControlsEnabled && event.pointerId === mobileJoystickPointerId) updateMobileJoystick(event);
	});
	mobileJoystick.addEventListener('pointerup', resetMobileJoystick);
	mobileJoystick.addEventListener('pointercancel', resetMobileJoystick);

	container.addEventListener('pointerdown', event => {
		if (!mobileControlsEnabled) return;
		if (event.target.closest('#mobileControls') || event.clientX < window.innerWidth * 0.42) return;
		mobileCameraPointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
		container.setPointerCapture(event.pointerId);
	});
	container.addEventListener('pointermove', event => {
		if (!mobileControlsEnabled || !mobileCameraPointer || event.pointerId !== mobileCameraPointer.id) return;
		const deltaX = event.clientX - mobileCameraPointer.x;
		const deltaY = event.clientY - mobileCameraPointer.y;
		camAngleY -= deltaX * 0.01;
		camAngleX = Math.max(0.18, Math.min(1.2, camAngleX - deltaY * 0.01));
		mobileCameraPointer.x = event.clientX;
		mobileCameraPointer.y = event.clientY;
	});
	container.addEventListener('pointerup', event => {
		if (mobileCameraPointer && event.pointerId === mobileCameraPointer.id) mobileCameraPointer = null;
	});
	container.addEventListener('pointercancel', () => { mobileCameraPointer = null; });
	mobileInteractBtn.addEventListener('click', () => triggerMobileKey('e'));
	mobileReceptionBtn.addEventListener('click', () => triggerMobileKey('r'));
	mobilePunchBtn.addEventListener('pointerdown', event => {
		if (!mobileControlsEnabled) return;
		event.preventDefault();
		if (!isPunching) {
			isPunching = true;
			punchTime = Date.now();
		}
	});
}

function setupStartScreen() {
	let phoneMode = false;
	roomCodeInput.value = Math.random().toString(36).slice(2, 8).toUpperCase();
	startMoney.textContent = `Geld: ${money} €`;
	connectToLobby();
	deviceModeBtn.addEventListener('click', () => {
		phoneMode = !phoneMode;
		deviceModeBtn.textContent = phoneMode ? '📱' : '💻';
		deviceModeLabel.textContent = phoneMode ? 'Handy-Steuerung' : 'Computer-Steuerung';
	});

	startGameBtn.addEventListener('click', () => {
		mobileControlsEnabled = phoneMode;
		document.body.classList.toggle('mobile-controls-enabled', phoneMode);
		if (phoneMode) initializeMobileInputs();
		startOverlay.style.display = 'none';
		connectToMultiplayerRoom();
	});

	try {
		const previewScene = new THREE.Scene();
		const previewCamera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
		previewCamera.position.set(0, 2.5, 8);
		previewCamera.lookAt(0, 2, 0);
		const previewLight = new THREE.HemisphereLight(0xeaf7ff, 0x26323d, 2.2);
		previewScene.add(previewLight);
		previewScene.add(player.clone(true));
		const previewRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		previewRenderer.setSize(180, 180);
		previewRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		startCharacterPreview.appendChild(previewRenderer.domElement);
		previewRenderer.render(previewScene, previewCamera);
	} catch (error) {
		console.warn('Character preview could not be created.', error);
	}
}

function createPlayerNameLabel(name) {
	const canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 64;
	const context = canvas.getContext('2d');
	context.fillStyle = 'rgba(8, 18, 28, 0.8)';
	context.fillRect(0, 4, 256, 56);
	context.fillStyle = '#ffffff';
	context.font = 'bold 28px Arial';
	context.textAlign = 'center';
	context.fillText(name, 128, 42);
	const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true }));
	label.scale.set(3.5, 0.9, 1);
	label.position.y = 5.2;
	return label;
}

function showRemotePlayer(playerData) {
	if (!playerData || playerData.id === multiplayerSocket?.id) return;
	if (remotePlayer && remotePlayerId === playerData.id) {
		remotePlayerTarget = playerData;
		return;
	}
	if (remotePlayer?.parent) remotePlayer.parent.remove(remotePlayer);
	remotePlayer = createHuman();
	remotePlayerId = playerData.id;
	remotePlayer.position.set(playerData.x || 0, 0, playerData.z || 0);
	remotePlayer.add(createPlayerNameLabel(playerData.name || 'Freund'));
	remotePlayerTarget = { ...playerData };
	scene.add(remotePlayer);
	multiplayerPlayerLabel.textContent = `${playerData.name || 'Freund'} ist im Raum`;
}

function removeRemotePlayer() {
	if (remotePlayer?.parent) remotePlayer.parent.remove(remotePlayer);
	remotePlayer = null;
	remotePlayerId = null;
	remotePlayerTarget = null;
	multiplayerPlayerLabel.textContent = 'Alleine im Raum';
}

function addChatMessage(message) {
	const line = document.createElement('p');
	line.className = 'chatMessage';
	const author = document.createElement('span');
	author.className = 'chatAuthor';
	author.textContent = `${message.playerName}: `;
	line.append(author, document.createTextNode(message.text));
	chatMessages.appendChild(line);
	chatMessages.scrollTop = chatMessages.scrollHeight;
	if (chatPanel.hidden) {
		unreadChatMessages += 1;
		chatUnreadCount.textContent = unreadChatMessages > 9 ? '9+' : String(unreadChatMessages);
		chatUnreadCount.hidden = false;
	}
}

chatToggleBtn.addEventListener('click', () => {
	const isOpen = chatPanel.hidden;
	chatPanel.hidden = !isOpen;
	chatToggleBtn.setAttribute('aria-expanded', String(isOpen));
	chatToggleBtn.setAttribute('aria-label', isOpen ? 'Chat schliessen' : 'Chat oeffnen');
	chatToggleBtn.title = isOpen ? 'Chat schliessen' : 'Chat oeffnen';
	if (isOpen) {
		unreadChatMessages = 0;
		chatUnreadCount.hidden = true;
		chatInput.focus();
	}
});

chatForm.addEventListener('submit', event => {
	event.preventDefault();
	const text = chatInput.value.trim();
	if (!text || !multiplayerSocket?.connected) return;
	multiplayerSocket.emit('chat-message', { text });
	chatInput.value = '';
});

function renderLiveRooms(rooms) {
	liveRoomsList.replaceChildren();
	if (!rooms.length) {
		liveRoomsList.textContent = 'Im Moment sind keine Raeume offen.';
		return;
	}
	rooms.forEach(room => {
		const button = document.createElement('button');
		button.type = 'button';
		button.className = 'liveRoomButton';
		button.disabled = room.players >= room.maxPlayers;
		button.textContent = room.code;
		const count = document.createElement('span');
		count.className = 'liveRoomCount';
		count.textContent = `${room.players}/${room.maxPlayers}`;
		button.appendChild(count);
		button.addEventListener('click', () => {
			roomCodeInput.value = room.code;
			roomCodeInput.focus();
		});
		liveRoomsList.appendChild(button);
	});
}

function connectToLobby() {
	if (typeof window.io !== 'function') {
		liveRoomsList.textContent = 'Serverliste ist nicht erreichbar.';
		return;
	}
	lobbySocket = window.io('https://free-city.onrender.com', {
		transports: ['polling'],
		upgrade: false
	});
	lobbySocket.on('connect', () => lobbySocket.emit('get-rooms'));
	lobbySocket.on('rooms-updated', renderLiveRooms);
	lobbySocket.on('connect_error', () => {
		liveRoomsList.textContent = 'Serverliste ist nicht erreichbar.';
	});
}

function connectToMultiplayerRoom() {
	if (typeof window.io !== 'function') {
		showMessage('Starte das Spiel über den Multiplayer-Server.', 3500);
		return;
	}
	const playerName = playerNameInput.value.trim().slice(0, 16) || 'Spieler';
	const roomCode = roomCodeInput.value.trim().toUpperCase().slice(0, 12);
	if (!roomCode) {
		showMessage('Bitte gib einen Raumcode ein.', 2500);
		return;
	}

	multiplayerSocket = lobbySocket || window.io('https://free-city.onrender.com', {
		transports: ['polling'],
		upgrade: false
	});
	const joinRoom = () => multiplayerSocket.emit('join-room', { roomCode, playerName });
	if (multiplayerSocket.connected) joinRoom();
	else multiplayerSocket.once('connect', joinRoom);
	multiplayerSocket.on('room-joined', data => {
		multiplayerStatus.style.display = 'flex';
		multiplayerRoomLabel.textContent = `Raum: ${data.roomCode}`;
		gameChat.style.display = 'block';
		data.players.forEach(showRemotePlayer);
	});
	multiplayerSocket.on('chat-message', addChatMessage);
	multiplayerSocket.on('player-joined', data => showRemotePlayer(data.player));
	multiplayerSocket.on('player-moved', data => {
		if (data.id !== multiplayerSocket.id) showRemotePlayer(data);
	});
	multiplayerSocket.on('player-left', data => {
		if (data.id === remotePlayerId) removeRemotePlayer();
	});
	multiplayerSocket.on('room-count', count => {
		if (count < 2) multiplayerPlayerLabel.textContent = 'Alleine im Raum';
	});
	multiplayerSocket.on('room-full', () => {
		showMessage('Dieser Raum ist bereits voll.', 3500);
		multiplayerSocket.disconnect();
		multiplayerSocket = null;
	});
	multiplayerSocket.on('room-error', message => showMessage(message, 3000));
	multiplayerSocket.on('connect_error', () => showMessage('Multiplayer-Server nicht erreichbar.', 3500));
}

function updateMultiplayer() {
	if (remotePlayer && remotePlayerTarget) {
		remotePlayer.position.x += (remotePlayerTarget.x - remotePlayer.position.x) * 0.22;
		remotePlayer.position.z += (remotePlayerTarget.z - remotePlayer.position.z) * 0.22;
		remotePlayer.rotation.y = remotePlayerTarget.rotation || 0;
	}
	if (!multiplayerSocket?.connected || Date.now() - lastMultiplayerUpdate < 75) return;
	multiplayerSocket.emit('player-move', {
		x: player.position.x,
		z: player.position.z,
		rotation: player.rotation.y
	});
	lastMultiplayerUpdate = Date.now();
}

setupStartScreen();

// Punch-System
let isPunching = false;
let punchTime = 0;
document.addEventListener('contextmenu', e => {
	e.preventDefault(); // Verhindert Kontextmenü
	if (!isPunching) {
		isPunching = true;
		punchTime = Date.now();
	}
});







function animate() {
	requestAnimationFrame(animate);
	createJailInterior();
	
	if (isPlayerInJail()) {
		// Verbleibende Haftzeit anzeigen
		if (!document.getElementById('jailOverlay')) {
			const overlay = document.createElement('div');
			overlay.id = 'jailOverlay';
			overlay.innerHTML = `
				<div>
					<strong>GEFÄNGNIS</strong>
					<span>Noch ${jailTime} Minuten</span>
				</div>
			`;
			document.body.appendChild(overlay);
		} else {
			const timeSpan = document.querySelector('#jailOverlay span');
			if (timeSpan) {
				timeSpan.textContent = `Noch ${jailTime} Minuten`;
			}
		}

		if (!isInJailInterior) return;
	} else {
		const overlay = document.getElementById('jailOverlay');
		if (overlay) {
			overlay.parentNode.removeChild(overlay);
		}
	}

	updatePrisonElevatorMenu();
	
	// Polizei-Alarm Check: Warnung während Bewegung
	if (policeAlert) {
		// Höhere Chance für Warnungen
		if (Math.random() < 0.05) { // 5% Chance pro Frame
			showMessage('🚨 POLIZEI SUCHT DICH! Lauf weg!', 2000);
		}
		
		// Zusätzliche visuelle Warnung im UI
		if (!policeWarningShownForCurrentAlert && !document.getElementById('policeWarning')) {
			const warning = document.createElement('div');
			warning.id = 'policeWarning';
			warning.innerHTML = '🚔 POLIZEI-ALARM!<br>DU WIRST GESUCHT!<br>LAUF WEG!';
			warning.style.cssText = `
				position: fixed;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				background: rgba(255, 0, 0, 0.9);
				color: white;
				padding: 20px;
				border-radius: 10px;
				font-size: 24px;
				font-weight: bold;
				z-index: 10000;
				animation: policeBlink 1s infinite;
				border: 3px solid yellow;
				text-align: center;
				line-height: 1.4;
			`;
			document.body.appendChild(warning);
			policeWarningShownForCurrentAlert = true;
			
			// Warnung nach kurzer Zeit entfernen
			setTimeout(() => {
				if (warning.parentNode) {
					warning.parentNode.removeChild(warning);
				}
			}, 2500);
		}
		
		// Wanted-Level-Anzeige aktualisieren
		updateWantedLevelDisplay();
	}
	
	// Automatische Polizei-Verfolgung prüfen
	checkPoliceChase();
	updatePoliceLoseInterest();
	if (isInMysteryBasement && !mysteryBasementPoliceTriggered && Date.now() - mysteryBasementEnteredAt > 15000) {
		startMysteryPoliceSearch();
	}
	
	// Polizei-Fahrzeuge aktualisieren
	updatePoliceCars();
	
	// Fuß-Polizisten aktualisieren
	updateFootPolice();
	updateRescuedPrisoner();
	
	// Geschwindigkeitsanzeige aktualisieren
	updateSpeedDisplay();
	
	if (!isInVehicle) {
		// Bewegung mit Kollisionsabfrage (relativ zur Kameraperspektive)
		let speed = keys['shift'] ? 0.85 : 0.5;
		let nextX = player.position.x;
		let nextZ = player.position.z;
		let isWalking = false;
		let moveX = 0;
		let moveZ = 0;

		// Bewegungsrichtungen relativ zur Kameraperspektive
		const forwardX = Math.sin(camAngleY);
		const forwardZ = Math.cos(camAngleY);
		const rightX = Math.cos(camAngleY);
		const rightZ = -Math.sin(camAngleY);

		if (keys['w'] || keys['arrowup']) {
			// Vorwärts (in Kamerarichtung)
			nextX += forwardX * speed;
			nextZ += forwardZ * speed;
			moveX += forwardX * speed;
			moveZ += forwardZ * speed;
			isWalking = true;
		}
		if (keys['s'] || keys['arrowdown']) {
			// Rückwärts (entgegen Kamerarichtung)
			nextX -= forwardX * speed;
			nextZ -= forwardZ * speed;
			moveX -= forwardX * speed;
			moveZ -= forwardZ * speed;
			isWalking = true;
		}
		if (keys['a'] || keys['arrowleft']) {
			// Links (relativ zur Kamerarichtung)
			nextX -= rightX * speed;
			nextZ -= rightZ * speed;
			moveX -= rightX * speed;
			moveZ -= rightZ * speed;
			isWalking = true;
		}
		if (keys['d'] || keys['arrowright']) {
			// Rechts (relativ zur Kamerarichtung)
			nextX += rightX * speed;
			nextZ += rightZ * speed;
			moveX += rightX * speed;
			moveZ += rightZ * speed;
			isWalking = true;
		}

		// Kollisions- & Gebäude- Eintrittslogik
		let blocked = false;
		let targetBuildingIndex = null;
		if (isInJailInterior) {
			const jailHalfSize = 9;
			blocked = Math.abs(nextX - jailPosition.x) > jailHalfSize ||
				Math.abs(nextZ - jailPosition.z) > jailHalfSize;
		} else {
			for (let i = 0; i < buildingBounds.length; i++) {
				const b = buildingBounds[i];
				const inside = nextX > b.minX && nextX < b.maxX && nextZ > b.minZ && nextZ < b.maxZ;
				if (inside) { targetBuildingIndex = i; break; }
			}
			if (currentBuildingIndex === null) {
				// Spieler ist draußen und möchte evtl. hinein
				if (targetBuildingIndex !== null) {
					const b = buildingBounds[targetBuildingIndex];
					const inDoorX = Math.abs(nextX - b.doorX) < b.doorWidth / 2;
					const inDoorZ = Math.abs(nextZ - b.doorZ) < 2.0; // Tiefe vor/ hinter Tür
					if (inDoorX && inDoorZ) {
						currentBuildingIndex = targetBuildingIndex; // Eintritt erlaubt
					} else {
						blocked = true; // gegen Wand gelaufen
					}
				}
			} else {
				// Spieler ist in einem Gebäude
				if (targetBuildingIndex === currentBuildingIndex) {
					// bleibt drin – ok
				} else {
					// will raus – nur durch Tür
					const b = buildingBounds[currentBuildingIndex];
					const inDoorX = Math.abs(nextX - b.doorX) < b.doorWidth / 2;
					const inDoorZ = Math.abs(nextZ - b.doorZ) < 2.0;
					if (inDoorX && inDoorZ) {
						currentBuildingIndex = null; // verlässt Gebäude
					} else {
						blocked = true;
					}
				}
			}
		}
		if (!blocked) {
			player.position.x = nextX;
			player.position.z = nextZ;
		}

		// Spieler-Rotation basierend auf Laufrichtung
		if (isWalking && (Math.abs(moveX) > 0.01 || Math.abs(moveZ) > 0.01)) {
			// Berechne den Winkel zur Bewegungsrichtung
			const angle = Math.atan2(moveX, moveZ);
			// Setze die Rotation des Spielers (Y-Achse für horizontale Drehung)
			player.rotation.y = angle;
		}

		// Spieler-Bein-Animation
		const leftLeg = player.children.find(obj => obj.position.x === -0.3);
		const rightLeg = player.children.find(obj => obj.position.x === 0.3);
		if (isWalking) {
			const t = Date.now() * 0.008;
			if (leftLeg) leftLeg.rotation.x = Math.sin(t) * 0.7;
			if (rightLeg) rightLeg.rotation.x = -Math.sin(t) * 0.7;
		} else {
			if (leftLeg) leftLeg.rotation.x = 0;
			if (rightLeg) rightLeg.rotation.x = 0;
		}

		// Punch-Animation
		const rightArm = player.getObjectByName('rightArm');
		if (isPunching) {
			const elapsed = Date.now() - punchTime;
			if (elapsed < 300) {
				// Arm nach vorne strecken
				if (rightArm) {
					rightArm.rotation.z = -Math.PI / 2; // 90 Grad nach vorne
					rightArm.position.z = 0.5; // etwas nach vorne schieben
				}
				// Punch-Kollision mit NPCs
				for (let i = 0; i < npcs.length; i++) {
					const npc = npcs[i];
					const dist = Math.sqrt(
						Math.pow(npc.position.x - player.position.x, 2) +
						Math.pow(npc.position.z - player.position.z, 2)
					);
					if (dist < 3) { // Nah genug
						if (i < 3) { // Polizist
							// Polizist verfolgt den Spieler
							npcIsChasing[i] = true;
							npcTargets[i] = {
								x: player.position.x,
								z: player.position.z
							};
							showMessage('Polizist verfolgt dich!', 2000);
						} else {
							// Normaler NPC: zurückstoßen und fallen lassen
							const dx = npc.position.x - player.position.x;
							const dz = npc.position.z - player.position.z;
							const norm = Math.sqrt(dx * dx + dz * dz);
							if (norm > 0) {
								npc.position.x += (dx / norm) * 5; // Stärker zurückstoßen
								npc.position.z += (dz / norm) * 5;
								npc.position.y = 1; // Hochheben für Fall
							}
							// NPC fallen lassen
							npcIsFalling[i] = true;
							npcFallTime[i] = Date.now();
							// NPC neues Ziel setzen, um wegzulaufen
							npcTargets[i] = {
								x: npc.position.x + (dx / norm) * 30,
								z: npc.position.z + (dz / norm) * 30
							};
						}
					}
				}
			} else if (elapsed < 600) {
				// Zurückziehen
				if (rightArm) {
					rightArm.rotation.z = -Math.PI / 4;
					rightArm.position.z = 0.25;
				}
			} else {
				// Zurücksetzen
				if (rightArm) {
					rightArm.rotation.z = 0;
					rightArm.position.z = 0;
				}
				isPunching = false;
			}
		} else {
			// Normal zurücksetzen
			if (rightArm) {
				rightArm.rotation.z = 0;
				rightArm.position.z = 0;
			}
		}
	}

	animateCars();
	// NPC-Bewegung
	for (let i = 0; i < npcs.length; i++) {
		const npc = npcs[i];
		if (npc.userData && npc.userData.isRequester) {
			const callout = npc.children.find(child => child.isSprite);
			if (callout) {
				callout.position.y = 5.2 + Math.sin(Date.now() * 0.003 + i) * 0.15;
			}
			continue;
		}
		// Fall-Animation
		if (npcIsFalling[i]) {
			const elapsed = Date.now() - npcFallTime[i];
			if (elapsed < 500) {
				// Fallen lassen
				npc.position.y = Math.max(0, 1 - (elapsed / 500) * 1); // Von 1 auf 0 fallen
				// Arme und Beine ausstrecken (wie fallen)
				const leftArm = npc.getObjectByName('leftArm');
				const rightArm = npc.getObjectByName('rightArm');
				const leftLeg = npc.children.find(obj => obj.position.x === -0.3);
				const rightLeg = npc.children.find(obj => obj.position.x === 0.3);
				if (leftArm) leftArm.rotation.z = Math.PI / 2;
				if (rightArm) rightArm.rotation.z = -Math.PI / 2;
				if (leftLeg) leftLeg.rotation.x = Math.PI / 4;
				if (rightLeg) rightLeg.rotation.x = -Math.PI / 4;
			} else if (elapsed < 1500) {
				// Am Boden liegen
				npc.position.y = 0;
				// Bleib liegen
			} else {
				// Aufstehen
				npc.position.y = 0;
				npcIsFalling[i] = false;
				// Arme und Beine zurücksetzen
				const leftArm = npc.getObjectByName('leftArm');
				const rightArm = npc.getObjectByName('rightArm');
				const leftLeg = npc.children.find(obj => obj.position.x === -0.3);
				const rightLeg = npc.children.find(obj => obj.position.x === 0.3);
				if (leftArm) leftArm.rotation.z = 0;
				if (rightArm) rightArm.rotation.z = 0;
				if (leftLeg) leftLeg.rotation.x = 0;
				if (rightLeg) rightLeg.rotation.x = 0;
			}
			continue; // Während Fallen keine normale Bewegung
		}

		// Polizist verfolgt Spieler
		if (npcIsChasing[i]) {
			npcTargets[i] = {
				x: player.position.x,
				z: player.position.z
			};
			// Schneller laufen
			const chaseSpeed = 0.15; // Schneller als normal
			const dx = player.position.x - npc.position.x;
			const dz = player.position.z - npc.position.z;
			const dist = Math.sqrt(dx * dx + dz * dz);
			if (dist > 2) {
				npc.position.x += (dx / dist) * chaseSpeed;
				npc.position.z += (dz / dist) * chaseSpeed;
				// Laufanimation
				const t = Date.now() * 0.01 + i * 2;
				const leftLeg = npc.children.find(obj => obj.position.x === -0.3);
				const rightLeg = npc.children.find(obj => obj.position.x === 0.3);
				if (leftLeg) leftLeg.rotation.x = Math.sin(t) * 0.7;
				if (rightLeg) rightLeg.rotation.x = -Math.sin(t) * 0.7;
			} else {
				// Festnehmen!
				money -= 50; // Bußgeld
				if (money < 0) money = 0;
				moneySpan.textContent = `Geld: ${money} €`;
				saveData();
				showMessage('Du wurdest von der Polizei festgenommen!\nBußgeld: 50€\nDu wirst zurückgebracht.', 4000);
				player.position.set(0, 0, 0); // Zurück zur Startposition
				npcIsChasing[i] = false; // Verfolgung beenden
				npcTargets[i] = {
					x: Math.random() * 260 - 130,
					z: Math.random() * 260 - 130
				};
			}
			continue; // Überspringe normale Bewegung
		}

		const target = npcTargets[i];
		const s = npcSpeeds[i];
		const dx = target.x - npc.position.x;
		const dz = target.z - npc.position.z;
		const dist = Math.sqrt(dx * dx + dz * dz);
		// Abstand zum Spieler
		const distToPlayer = Math.sqrt(
			Math.pow(npc.position.x - player.position.x, 2) +
			Math.pow(npc.position.z - player.position.z, 2)
		);
		// Prüfe, ob NPC auf einer Straße wäre
		let onStreet = false;
		for (const s of streets) {
			const minX = s.x - s.width / 2;
			const maxX = s.x + s.width / 2;
			const minZ = s.z - s.length / 2;
			const maxZ = s.z + s.length / 2;
			if (npc.position.x > minX && npc.position.x < maxX && npc.position.z > minZ && npc.position.z < maxZ) {
				onStreet = true;
				break;
			}
		}
		const onZebraCrossing = isPointOnZebraCrossing(npc.position.x, npc.position.z);

		// Normale NPCs dürfen Straßen nur über Zebrastreifen betreten
		if (i >= 3 && onStreet && !onZebraCrossing) {
			if (!npcCrosswalkTargets[i]) {
				const now = Date.now();
				const cooldownReady = now >= npcCrosswalkCooldowns[i];
				if (cooldownReady && Math.random() < NPC_CROSSWALK_CHANCE) {
					const crossing = getNearestZebraCrossing(npc.position.x, npc.position.z);
					npcCrosswalkTargets[i] = { x: crossing.x, z: crossing.z };
					npcCrosswalkReturnTargets[i] = { x: npcTargets[i].x, z: npcTargets[i].z };
					npcTargets[i] = { x: crossing.x, z: crossing.z };
					npcCrosswalkCooldowns[i] = now + NPC_CROSSWALK_COOLDOWN_MS;
				} else {
					npcTargets[i] = getValidSpawn();
					npcCrosswalkCooldowns[i] = now + 3000;
				}
			}
		} else if (i >= 3 && npcCrosswalkTargets[i] && onZebraCrossing) {
			npcTargets[i] = {
				x: npcCrosswalkReturnTargets[i].x,
				z: npcCrosswalkReturnTargets[i].z
			};
			npcCrosswalkTargets[i] = null;
			npcCrosswalkReturnTargets[i] = null;
		}

		// Polizei darf weiter frei laufen; normale NPCs bewegen sich nur auf Straße, wenn sie den Zebrastreifen benutzen
		if (onStreet && i >= 3 && !onZebraCrossing && !npcCrosswalkTargets[i]) {
			continue;
		}
		// Wenn Spieler nahe (<7), NPC bleibt stehen und winkt mit beiden Armen
		const leftArm = npc.getObjectByName('leftArm');
		const rightArm = npc.getObjectByName('rightArm');
		if (distToPlayer < 7) {
			// Winken: beide Arme bewegen sich
			if (leftArm) leftArm.rotation.z = Math.sin(Date.now() * 0.005 + i) * 0.8;
			if (rightArm) rightArm.rotation.z = Math.cos(Date.now() * 0.005 + i) * 0.8;
			// Beine stehen still
			const leftLeg = npc.children.find(obj => obj.position.x === -0.3);
			const rightLeg = npc.children.find(obj => obj.position.x === 0.3);
			if (leftLeg) leftLeg.rotation.x = 0;
			if (rightLeg) rightLeg.rotation.x = 0;
		} else {
			// NPC bewegt sich zum Ziel
			if (dist > 1) {
				npc.position.x += (dx / dist) * s;
				npc.position.z += (dz / dist) * s;
				// Laufanimation Beine
				const t = Date.now() * 0.008 + i * 2;
				const leftLeg = npc.children.find(obj => obj.position.x === -0.3);
				const rightLeg = npc.children.find(obj => obj.position.x === 0.3);
				if (leftLeg) leftLeg.rotation.x = Math.sin(t) * 0.7;
				if (rightLeg) rightLeg.rotation.x = -Math.sin(t) * 0.7;
			} else {
				// Neues Ziel
				npcTargets[i] = {
					x: Math.random() * 260 - 130,
					z: Math.random() * 260 - 130
				};
				// Beine stehen still
				const leftLeg = npc.children.find(obj => obj.position.x === -0.3);
				const rightLeg = npc.children.find(obj => obj.position.x === 0.3);
				if (leftLeg) leftLeg.rotation.x = 0;
				if (rightLeg) rightLeg.rotation.x = 0;
			}
			// Arme zurücksetzen
			if (leftArm) leftArm.rotation.z = 0;
			if (rightArm) rightArm.rotation.z = 0;
		}
	}

	// Kamera folgt dem Spieler von hinten
	const px = player.position.x;
	const pz = player.position.z;
	const py = player.position.y + 1.8;
	camera.fov = 75;
	camera.updateProjectionMatrix();
	const horizontalDistance = camDistance * Math.sin(camAngleX);
	const cameraX = px - Math.sin(camAngleY) * horizontalDistance;
	const cameraZ = pz - Math.cos(camAngleY) * horizontalDistance;
	const cameraY = py + camDistance * Math.cos(camAngleX);
	const cameraLerp = 0.18;
	camera.position.x += (cameraX - camera.position.x) * cameraLerp;
	camera.position.y += (cameraY - camera.position.y) * cameraLerp;
	camera.position.z += (cameraZ - camera.position.z) * cameraLerp;
	cameraTarget.x = px;
	cameraTarget.y = py;
	cameraTarget.z = pz;
	camera.lookAt(cameraTarget);

	// Shop öffnen, wenn nahe am Supermarkt
	const market = { x: 80, z: -80 };
	const distToMarket = Math.sqrt(
		Math.pow(player.position.x - market.x, 2) +
		Math.pow(player.position.z - (market.z + 10.3), 2)
	);
	if (distToMarket < 10) {
		shopPanel.style.display = 'block';
	} else {
		shopPanel.style.display = 'none';
	}

	// Autohändler öffnen, wenn nahe am Autohaus
	const carDealer = { x: -80, z: 200 };
	const distToCarDealer = Math.sqrt(
		Math.pow(player.position.x - carDealer.x, 2) +
		Math.pow(player.position.z - (carDealer.z + 10.3), 2)
	);
	if (distToCarDealer < 10) {
		carDealerPanel.style.display = 'block';
	} else {
		carDealerPanel.style.display = 'none';
	}

	const fashionShop = { x: 0, z: -80 };
	const distToFashionShop = Math.sqrt(
		Math.pow(player.position.x - fashionShop.x, 2) +
		Math.pow(player.position.z - (fashionShop.z + 10.3), 2)
	);
	if (distToFashionShop < 10) {
		fashionShopPanel.style.display = 'block';
	} else {
		fashionShopPanel.style.display = 'none';
	}

	// Vögel animieren
	for (const bird of birds) {
		const data = bird.userData;
		
		// Flügel-Animation
		data.wingAngle += data.wingSpeed;
		const wing1 = bird.children[1]; // Erster Flügel
		const wing2 = bird.children[2]; // Zweiter Flügel
		
		if (wing1 && wing2) {
			wing1.rotation.z = Math.sin(data.wingAngle) * 0.8 + Math.PI / 6;
			wing2.rotation.z = -Math.sin(data.wingAngle) * 0.8 - Math.PI / 6;
		}
		
		// Flugbahn-Animation (kreisförmig)
		data.flightAngle += data.flightSpeed;
		const centerX = bird.userData.centerX || bird.position.x;
		const centerZ = bird.userData.centerZ || bird.position.z;
		
		bird.position.x = centerX + Math.cos(data.flightAngle) * data.flightRadius;
		bird.position.z = centerZ + Math.sin(data.flightAngle) * data.flightRadius;
		bird.position.y = data.originalY + Math.sin(data.flightAngle * 2) * 2; // Auf und ab
		
		// Zufällige Richtungsänderung
		if (Math.random() < 0.005) { // 0.5% Chance pro Frame
			data.flightAngle += (Math.random() - 0.5) * 0.5;
		}
		
		// Speichere Zentrum für kreisförmige Bewegung
		if (!bird.userData.centerX) {
			bird.userData.centerX = bird.position.x;
			bird.userData.centerZ = bird.position.z;
		}
	}

	// Wetter aktualisieren
	updateWeather();

	// Quest-Fortschritt überprüfen
	checkQuestCompletion();

	// Fahrzeug-Bewegung aktualisieren
	updateVehicleMovement();

	// Spieler-Marker für Minimap aktualisieren und rendern
	playerMarker.position.x = player.position.x;
	playerMarker.position.z = player.position.z;
	playerMarker.visible = true;

	if (minimapFocusTarget) {
		minimapCamera.position.x += (minimapFocusTarget.x - minimapCamera.position.x) * 0.2;
		minimapCamera.position.z += (minimapFocusTarget.z - minimapCamera.position.z) * 0.2;
		minimapCamera.position.y = 200;
		minimapCamera.zoom += (minimapFocusZoom - minimapCamera.zoom) * 0.2;
		minimapCamera.updateProjectionMatrix();
		minimapCamera.lookAt(minimapFocusTarget.x, 0, minimapFocusTarget.z);
		minimapFocusMarker.rotation.y += 0.04;
	} else {
		minimapCamera.position.x += (0 - minimapCamera.position.x) * 0.08;
		minimapCamera.position.z += (0 - minimapCamera.position.z) * 0.08;
		minimapCamera.position.y = 200;
		minimapCamera.zoom += (1 - minimapCamera.zoom) * 0.12;
		minimapCamera.updateProjectionMatrix();
		minimapCamera.lookAt(0, 0, 0);
	}

	// Minimap rendern
	minimapRenderer.render(scene, minimapCamera);

	// Marker wieder unsichtbar machen für Hauptkamera
	playerMarker.visible = false;

	// Uhrzeit aktualisieren
	updateTime();

	// NPC-Geld regenerieren (jede Stunde)
	if (Math.floor(gameTime / 60) !== Math.floor((gameTime - timeSpeed * 0.016) / 60)) {
		// Neue Stunde begonnen
		const npcIncome = Math.floor(Math.random() * 100) + 50; // 50-150€ pro Stunde
		npcBankMoney += npcIncome;
		saveData();
		
		if (npcBankMoney > 10000) npcBankMoney = 10000; // Maximum 10000€
		
		showMessage(`👥 NPCs haben gearbeitet: +${npcIncome}€ in ihrer Bank`, 2000);
	}

	updateMultiplayer();
	renderer.render(scene, camera);
}

// Uhrzeit-System
function updateTime() {
	// Zeit fortschreiten lassen
	gameTime += timeSpeed * 0.016; // ca. 60 FPS, also ~1 Sekunde = 1 Minute Spielzeit
	
	// 24-Stunden-Zyklus (1440 Minuten)
	if (gameTime >= 1440) {
		gameTime = 0;
	}
	
	// Stunden und Minuten berechnen
	const hours = Math.floor(gameTime / 60);
	const minutes = Math.floor(gameTime % 60);
	
	// Uhrzeit-Icon basierend auf Tageszeit
	let timeIcon = '🕐';
	if (hours >= 6 && hours < 12) timeIcon = '🌅'; // Morgen
	else if (hours >= 12 && hours < 18) timeIcon = '☀️'; // Tag
	else if (hours >= 18 && hours < 22) timeIcon = '🌇'; // Abend
	else timeIcon = '🌙'; // Nacht
	
	// Uhrzeit formatieren und anzeigen
	const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	timeDisplay.innerHTML = `${timeIcon} ${timeString}`;
	
	// Wanted-Level aktualisieren
	updateWantedLevelDisplay();
	updatePoliceChaseTimerDisplay();
}

function updateWantedLevelDisplay() {
	let wantedIcon = '👤';
	let wantedColor = '#fff';
	
	if (wantedLevel >= 5) {
		wantedIcon = '🚔';
		wantedColor = '#ff0000';
	} else if (wantedLevel >= 3) {
		wantedIcon = '⚠️';
		wantedColor = '#ffaa00';
	} else if (wantedLevel >= 1) {
		wantedIcon = '👀';
		wantedColor = '#ffff00';
	}
	
	wantedLevelSpan.innerHTML = `${wantedIcon} Wanted: ${wantedLevel}`;
	wantedLevelSpan.style.color = wantedColor;
}

function updatePoliceChaseTimerDisplay() {
	if (!policeChaseTimerSpan) return;

	if (!policeAlert || wantedLevel < 1) {
		policeChaseTimerSpan.textContent = 'Polizei: keine Suche';
		policeChaseTimerSpan.style.color = '#bbb';
		return;
	}

	if (!policeLoseSightSince) {
		policeChaseTimerSpan.textContent = 'Polizei: außer Sicht fliehen';
		policeChaseTimerSpan.style.color = '#ffcc00';
		return;
	}

	const loseSightDelay = 30000;
	const elapsed = Date.now() - policeLoseSightSince;
	const remaining = Math.max(0, loseSightDelay - elapsed);
	const remainingSeconds = (remaining / 1000).toFixed(1);

	policeChaseTimerSpan.textContent = `Polizei gibt auf in: ${remainingSeconds}s`;
	policeChaseTimerSpan.style.color = remaining <= 1000 ? '#ff5555' : '#ffcc00';
}

function updateHealthDisplay() {
	if (!healthLabel || !healthFill) return;
	const clampedHealth = Math.max(0, Math.min(100, playerHealth));
	healthLabel.textContent = `Leben: ${clampedHealth}%`;
	healthFill.style.width = `${clampedHealth}%`;
	healthFill.classList.remove('low', 'mid', 'high');
	if (clampedHealth <= 25) {
		healthFill.classList.add('low');
	} else if (clampedHealth <= 60) {
		healthFill.classList.add('mid');
	} else {
		healthFill.classList.add('high');
	}
}

function damagePlayer(amount, reason = 'Schaden') {
	playerHealth = Math.max(0, playerHealth - amount);
	updateHealthDisplay();
	saveData();
	showMessage(`❤️ -${amount}% Leben${reason ? ` durch ${reason}` : ''}`, 2500);
}

function setTimeSpeed(speed) {
	timeSpeed = speed;
	let speedText = '';
	switch(speed) {
		case 0: speedText = 'Pausiert'; break;
		case 1: speedText = 'Normal'; break;
		case 5: speedText = 'Schnell'; break;
		case 15: speedText = 'Sehr schnell'; break;
	}
	showMessage(`⏱️ Zeitgeschwindigkeit: ${speedText}`, 2000);
}

animate();

// Job-System
const jobLocations = [
	{ name: 'Bank', x: 160, z: 140 },
	{ name: 'Supermarkt', x: 80, z: -80 },
	{ name: 'Park', x: 0, z: 180 },
	{ name: 'Autohaus', x: -80, z: 200 },
	{ name: 'Wohngebiet', x: 120, z: 0 },
	{ name: 'Stadtrand', x: -140, z: -140 },
	{ name: 'Platz', x: 0, z: 80 }
];

const jobSalarySteps = {
	officeColors: 10,
	officeMath: 15,
	officeFiling: 15
};

const savedJobEarnings = JSON.parse(getGameData('jobEarnings') || '{}');
let jobEarnings = {
	officeColors: savedJobEarnings.officeColors || savedJobEarnings.office || 30,
	officeMath: savedJobEarnings.officeMath || 45,
	officeFiling: savedJobEarnings.officeFiling || 55
};

let activeJob = null;
let officeJobOverlay = null;
let officeJobPrompt = null;
let officeJobProgress = null;
let officeJobButtonRow = null;
let jobTargetMarker = null;

const officeJobColors = [
	{ name: 'Rot', hex: 0xff5555 },
	{ name: 'Grün', hex: 0x55cc66 },
	{ name: 'Blau', hex: 0x55aaff },
	{ name: 'Gelb', hex: 0xffdd55 }
];

const officeFilingNames = ['Angebot', 'Bericht', 'Dokument', 'Eingang', 'Rechnung', 'Vertrag'];

function refreshJobButtonLabels() {
	officeJobBtn.textContent = `Bürojob: Farben (${jobEarnings.officeColors}€)`;
	officeMathJobBtn.textContent = `Bürojob: Rechnen (${jobEarnings.officeMath}€)`;
	officeFilingJobBtn.textContent = `Bürojob: Akten sortieren (${jobEarnings.officeFiling}€)`;
}

function ensureJobTargetMarker() {
	if (jobTargetMarker) return;
	jobTargetMarker = new THREE.Mesh(
		new THREE.CylinderGeometry(1.2, 1.2, 0.25, 10),
		new THREE.MeshBasicMaterial({ color: 0xffaa00 })
	);
	jobTargetMarker.position.y = 0.4;
	jobTargetMarker.visible = false;
	scene.add(jobTargetMarker);
}

function showJobTargetMarker(target, color) {
	ensureJobTargetMarker();
	jobTargetMarker.position.set(target.x, 0.4, target.z);
	jobTargetMarker.material.color.setHex(color);
	jobTargetMarker.visible = true;
}

function hideJobTargetMarker() {
	if (jobTargetMarker) {
		jobTargetMarker.visible = false;
	}
}

function getRandomJobLocation(excludeName = '') {
	const candidates = jobLocations.filter(location => location.name !== excludeName);
	return candidates[Math.floor(Math.random() * candidates.length)];
}

function ensureOfficeJobOverlay() {
	if (officeJobOverlay) return;
	officeJobOverlay = document.createElement('div');
	officeJobOverlay.id = 'officeJobOverlay';
	officeJobOverlay.style.cssText = `
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 12000;
		background: rgba(20, 20, 24, 0.96);
		color: #fff;
		padding: 24px;
		border-radius: 16px;
		box-shadow: 0 14px 40px rgba(0,0,0,0.45);
		min-width: 360px;
		text-align: center;
		display: none;
	`;
	officeJobOverlay.innerHTML = `
		<h2 style="margin-top:0;">Bürojob</h2>
		<div id="officeJobPrompt" style="font-size: 1.2em; font-weight: bold; margin-bottom: 10px;"></div>
		<div id="officeJobProgress" style="margin-bottom: 16px;"></div>
		<div id="officeJobButtons" style="display:grid; grid-template-columns: repeat(2, minmax(110px, 1fr)); gap: 10px;"></div>
		<p style="margin: 14px 0 0; opacity: 0.8;">Klicke die richtige Farbe. Nach jeder Runde wird das Gehalt höher.</p>
	`;
	document.body.appendChild(officeJobOverlay);
	officeJobPrompt = officeJobOverlay.querySelector('#officeJobPrompt');
	officeJobProgress = officeJobOverlay.querySelector('#officeJobProgress');
	officeJobButtonRow = officeJobOverlay.querySelector('#officeJobButtons');
}

function renderOfficeJobRound() {
	if (!activeJob || activeJob.type !== 'office') return;
	officeJobPrompt.textContent = activeJob.prompt;
	officeJobProgress.textContent = `Runde ${activeJob.round + 1} von ${activeJob.totalRounds} | Fehler: ${activeJob.wrongAttempts}`;
	officeJobButtonRow.innerHTML = '';
	activeJob.options.forEach(option => {
		const button = document.createElement('button');
		button.textContent = option.label;
		button.style.cssText = `
			padding: 14px 10px;
			font-size: 1em;
			border: none;
			border-radius: 10px;
			cursor: pointer;
			font-weight: bold;
			color: ${option.color ? '#111' : '#fff'};
			background: ${option.color ? `#${option.color.toString(16).padStart(6, '0')}` : '#3d6f9e'};
		`;
		button.addEventListener('click', () => handleOfficeChoice(option.value));
		officeJobButtonRow.appendChild(button);
	});
	officeJobOverlay.style.display = 'block';
}

function shuffleOfficeOptions(options) {
	return options.sort(() => Math.random() - 0.5);
}

function prepareNextOfficeRound() {
	if (!activeJob || activeJob.type !== 'office') return;
	if (activeJob.variant === 'colors') {
		const colorIndex = Math.floor(Math.random() * officeJobColors.length);
		const color = officeJobColors[colorIndex];
		activeJob.prompt = `Klicke auf: ${color.name}`;
		activeJob.answer = colorIndex;
		activeJob.options = officeJobColors.map((option, index) => ({
			value: index,
			label: option.name,
			color: option.hex
		}));
	} else if (activeJob.variant === 'math') {
		const firstNumber = Math.floor(Math.random() * 20) + 5;
		const secondNumber = Math.floor(Math.random() * 20) + 5;
		const answer = firstNumber + secondNumber;
		const values = [answer, answer - 2, answer + 3, answer + 5];
		activeJob.prompt = `Rechne: ${firstNumber} + ${secondNumber} = ?`;
		activeJob.answer = answer;
		activeJob.options = shuffleOfficeOptions(values.map(value => ({ value, label: String(value) })));
	} else {
		const names = shuffleOfficeOptions([...officeFilingNames]).slice(0, 4);
		const answer = [...names].sort((first, second) => first.localeCompare(second, 'de'))[0];
		activeJob.prompt = 'Welche Akte kommt alphabetisch zuerst?';
		activeJob.answer = answer;
		activeJob.options = shuffleOfficeOptions(names.map(name => ({ value: name, label: name })));
	}
	renderOfficeJobRound();
}

function completeJob(jobType, successMessage) {
	const reward = jobEarnings[jobType] || 0;
	money += reward;
	moneySpan.textContent = `Geld: ${money} €`;
	jobEarnings[jobType] += jobSalarySteps[jobType];
	refreshJobButtonLabels();
	saveData();
	showMessage(`${successMessage} +${reward}€`, 2500);
	hideJobTargetMarker();
	if (officeJobOverlay) {
		officeJobOverlay.style.display = 'none';
	}
	activeJob = null;
}

function handleOfficeChoice(value) {
	if (!activeJob || activeJob.type !== 'office') return;
	if (value !== activeJob.answer) {
		activeJob.wrongAttempts += 1;
		renderOfficeJobRound();
		showMessage('Falsche Farbe. Versuch es nochmal.', 1500);
		return;
	}

	activeJob.round += 1;
	if (activeJob.round >= activeJob.totalRounds) {
		completeJob(activeJob.rewardType, 'Bürojob erledigt!');
		return;
	}

	prepareNextOfficeRound();
	showMessage('Richtig! Nächste Farbe.', 1000);
}

function startOfficeJob(variant = 'colors') {
	if (activeJob) {
		showMessage('Beende zuerst deinen aktuellen Job.', 2500);
		return;
	}
	jobPanel.style.display = 'none';
	ensureOfficeJobOverlay();
	activeJob = {
		type: 'office',
		variant,
		rewardType: variant === 'math' ? 'officeMath' : variant === 'filing' ? 'officeFiling' : 'officeColors',
		round: 0,
		totalRounds: variant === 'colors' ? 5 : 4,
		wrongAttempts: 0
	};
	prepareNextOfficeRound();
	showMessage('Bürojob gestartet. Löse die Aufgaben auf dem Bildschirm.', 3000);
}

function tryCompleteActiveJob() {
	if (!activeJob) return false;

	return false;
}

function tryEarnMoney() {
	if (activeJob) {
		jobBtn.textContent = 'Job läuft!';
		showMessage('Beende zuerst deinen aktuellen Job.', 2000);
		setTimeout(() => jobBtn.textContent = 'Job machen', 1200);
		return true;
	}

	const jobcenter = { x: -80, z: -80 };
	const distX = Math.abs(player.position.x - jobcenter.x);
	const distZ = Math.abs(player.position.z - (jobcenter.z + 10.3));
	if (distX < 10 && distZ < 8) {
		jobPanel.style.display = 'block';
		refreshJobButtonLabels();
		jobBtn.textContent = activeJob ? 'Job läuft!' : 'Job-Menü geöffnet!';
		setTimeout(() => jobBtn.textContent = 'Job machen', 1200);
		return true;
	}
	jobBtn.textContent = 'Gehe zum Jobcenter!';
	setTimeout(() => jobBtn.textContent = 'Job machen', 1200);
	return false;
}

function doCleaningJob() {
	money += 25;
	moneySpan.textContent = `Geld: ${money} €`;
	saveData();
	showMessage('Reinigungsjob erledigt! +25€', 2000);
	jobPanel.style.display = 'none';
}

function closeJob() {
	jobPanel.style.display = 'none';
}

refreshJobButtonLabels();


function tryBank() {
	// Bank-Check: Spieler muss vor der Bank stehen
	const bank = { x: 160, z: 140 };
	const distX = Math.abs(player.position.x - bank.x);
	const distZ = Math.abs(player.position.z - (bank.z + 10.3));
	if (distX < 15 && distZ < 12) {
		if (money >= 50) {
			money -= 50;
			bankMoney += 50;
			moneySpan.textContent = `Geld: ${money} €`;
			bankMoneySpan.textContent = `Bank: ${bankMoney} €`;
			saveData();
			bankBtn.textContent = 'Eingezahlt!';
			setTimeout(() => bankBtn.textContent = 'Bank', 1200);
		} else {
			bankBtn.textContent = 'Zu wenig Geld!';
			setTimeout(() => bankBtn.textContent = 'Bank', 1200);
		}
		return true;
	} else {
		bankBtn.textContent = 'Gehe zur Bank!';
		setTimeout(() => bankBtn.textContent = 'Bank', 1200);
		return false;
	}
}

function tryWithdraw() {
	// Bank-Check
	const bank = { x: 160, z: 140 };
	const distX = Math.abs(player.position.x - bank.x);
	const distZ = Math.abs(player.position.z - (bank.z + 10.3));
	if (distX < 15 && distZ < 12) {
		if (bankMoney >= 50) {
			bankMoney -= 50;
			money += 50;
			moneySpan.textContent = `Geld: ${money} €`;
			bankMoneySpan.textContent = `Bank: ${bankMoney} €`;
			saveData();
			bankBtn.textContent = 'Abgehoben!';
			setTimeout(() => bankBtn.textContent = 'Bank', 1200);
		} else {
			bankBtn.textContent = 'Bank leer!';
			setTimeout(() => bankBtn.textContent = 'Bank', 1200);
		}
		return true;
	} else {
		bankBtn.textContent = 'Gehe zur Bank!';
		setTimeout(() => bankBtn.textContent = 'Bank', 1200);
		return false;
	}
}

function tryBuy() {
	// Supermarkt-Check: Spieler muss vor dem Supermarkt stehen
	const market = { x: 80, z: -80 };
	const distX = Math.abs(player.position.x - market.x);
	const distZ = Math.abs(player.position.z - (market.z + 10.3));
	if (distX < 10 && distZ < 8) {
		if (money >= 30) {
			money -= 30;
			moneySpan.textContent = `Geld: ${money} €`;
			saveData();
			buyBtn.textContent = 'Gekauft!';
			setTimeout(() => buyBtn.textContent = 'Kaufen', 1200);
		} else {
			buyBtn.textContent = 'Zu wenig Geld!';
			setTimeout(() => buyBtn.textContent = 'Kaufen', 1200);
		}
	} else {
		buyBtn.textContent = 'Gehe zum Supermarkt!';
		setTimeout(() => buyBtn.textContent = 'Kaufen', 1200);
	}
}

function buyApple() {
	if (money >= 10) {
		money -= 10;
		moneySpan.textContent = `Geld: ${money} €`;
		saveData();
		showMessage('Apfel gekauft! Lecker!', 2000);
		
		// Quest-Progress aktualisieren
		activeQuests.forEach(quest => {
			if (quest.type === 'collect' && quest.requirements.apples) {
				updateQuestProgress(quest, 'apples', 1);
			}
		});
	} else {
		showMessage('Zu wenig Geld!', 2000);
	}
}

function buyBread() {
	if (money >= 20) {
		money -= 20;
		moneySpan.textContent = `Geld: ${money} €`;
		saveData();
		showMessage('Brot gekauft! Knusprig!', 2000);
		
		// Quest-Progress aktualisieren
		activeQuests.forEach(quest => {
			if (quest.type === 'collect' && quest.requirements.bread) {
				updateQuestProgress(quest, 'bread', 1);
			}
		});
	} else {
		showMessage('Zu wenig Geld!', 2000);
	}
}

function buyDrink() {
	if (money >= 15) {
		money -= 15;
		moneySpan.textContent = `Geld: ${money} €`;
		saveData();
		alert('Getränk gekauft! Erfrischend!');
	} else {
		alert('Zu wenig Geld!');
	}
}

function buyHouse() {
	openHouseShop();
}

let houseShopPanel = null;
let houseShopList = null;

function getNextFreeHousePlotIndex() {
	for (let i = 0; i < housePlots.length; i++) {
		const plotTaken = ownedHouses.some(house => house.plotIndex === i);
		if (!plotTaken) return i;
	}
	return -1;
}

function getPrimaryHousePlot() {
	if (ownedHouses.length > 0) {
		const plotIndex = ownedHouses[0].plotIndex;
		return housePlots[plotIndex] || housePlots[0];
	}
	return housePlots[0];
}

function spawnOwnedHouses() {
	playerHouses = [];
	if (mysteryBasementRoom && mysteryBasementRoom.parent) {
		mysteryBasementRoom.parent.remove(mysteryBasementRoom);
	}
	mysteryHouseState = null;
	ownedHouses.forEach(houseData => {
		const plot = housePlots[houseData.plotIndex] || housePlots[0];
		const catalogEntry = houseCatalog.find(item => item.id === houseData.houseId) || houseCatalog[0];
		const house = createBuilding(plot.x, plot.z, catalogEntry.color, catalogEntry.name, catalogEntry.houseType);
		house.userData.isPlayerHouse = true;
		house.userData.houseId = houseData.id;
		playerHouses.push(house);
		if (catalogEntry.houseType === 'mystery') {
			mysteryHouseState = { plot, houseData };
			spawnMysteryBasement(plot);
		}
	});
	refreshHouseButtonLabel();
}

function refreshHouseButtonLabel() {
	if (!buyHouseBtn) return;
	buyHouseBtn.textContent = ownedHouses.length > 0 ? `Häuser (${ownedHouses.length})` : 'Häuser kaufen';
}

function ensureHouseShopPanel() {
	if (houseShopPanel) return;
	houseShopPanel = document.createElement('div');
	houseShopPanel.id = 'houseShopPanel';
	houseShopPanel.style.cssText = `
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 40;
		background: rgba(25, 25, 32, 0.96);
		color: #fff;
		padding: 22px;
		border-radius: 16px;
		box-shadow: 0 12px 40px rgba(0,0,0,0.5);
		min-width: 520px;
		max-width: 720px;
		display: none;
	`;
	houseShopPanel.innerHTML = `
		<h2 style="margin-top:0;">Hausmarkt</h2>
		<p style="margin-top:0; opacity:0.85;">Wähle ein Haus aus. Jedes Kaufobjekt wird auf einem freien Grundstück gebaut.</p>
		<div id="houseShopList" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;"></div>
		<button id="closeHouseShop" style="margin-top:16px; padding: 10px 18px; border: none; border-radius: 8px; cursor:pointer;">Schließen</button>
	`;
	document.body.appendChild(houseShopPanel);
	houseShopList = houseShopPanel.querySelector('#houseShopList');
	houseShopPanel.querySelector('#closeHouseShop').addEventListener('click', closeHouseShop);
}

function renderHouseShop() {
	ensureHouseShopPanel();
	houseShopList.innerHTML = '';
	const freePlotIndex = getNextFreeHousePlotIndex();
	houseCatalog.forEach(house => {
		const card = document.createElement('div');
		card.style.cssText = `
			background: rgba(255,255,255,0.06);
			border: 1px solid rgba(255,255,255,0.12);
			border-radius: 14px;
			padding: 14px;
			text-align: left;
		`;
		card.innerHTML = `
			<div style="font-size: 1.15em; font-weight: bold; margin-bottom: 6px;">${house.name}</div>
			<div style="opacity:0.85; margin-bottom: 8px;">${house.description}</div>
			<div style="font-weight:bold; margin-bottom: 12px;">Preis: ${house.price}€</div>
		`;
		const button = document.createElement('button');
		button.textContent = freePlotIndex >= 0 ? 'Kaufen' : 'Keine Grundstücke frei';
		button.disabled = freePlotIndex < 0;
		button.style.cssText = `
			padding: 10px 14px;
			border: none;
			border-radius: 8px;
			cursor: pointer;
			background: ${button.disabled ? '#555' : '#4caf50'};
			color: #fff;
		`;
		button.addEventListener('click', () => buyHouseType(house));
		card.appendChild(button);
		houseShopList.appendChild(card);
	});
	refreshHouseButtonLabel();
}

function openHouseShop() {
	renderHouseShop();
	houseShopPanel.style.display = 'block';
}

function closeHouseShop() {
	if (houseShopPanel) {
		houseShopPanel.style.display = 'none';
	}
}

function buyHouseType(house) {
	const plotIndex = getNextFreeHousePlotIndex();
	if (plotIndex < 0) {
		showMessage('Keine freien Grundstücke mehr verfügbar.', 2500);
		return;
	}
	if (money < house.price) {
		showMessage(`Zu wenig Geld! Du brauchst ${house.price}€ für dieses Haus.`, 2500);
		return;
	}

	money -= house.price;
	moneySpan.textContent = `Geld: ${money} €`;
	const houseData = {
		id: Date.now() + Math.random(),
		houseId: house.id,
		plotIndex
	};
	ownedHouses.push(houseData);
	houseBought = true;
	const plot = housePlots[plotIndex];
	createBuilding(plot.x, plot.z, house.color, house.name, house.houseType);
	if (house.houseType === 'mystery') {
		mysteryHouseState = { plot, houseData };
		spawnMysteryBasement(plot);
	}
	saveData();
	refreshHouseButtonLabel();
	showMessage(`${house.name} gekauft! Es steht auf ${plot.name}.`, 3500);
	renderHouseShop();
}

function spawnMysteryBasement(plot) {
	if (mysteryBasementRoom && mysteryBasementRoom.parent) {
		mysteryBasementRoom.parent.remove(mysteryBasementRoom);
	}

	const basement = new THREE.Group();
	basement.position.set(plot.x, -20, plot.z);

	const floor = new THREE.Mesh(
		new THREE.BoxGeometry(26, 0.4, 26),
		new THREE.MeshPhongMaterial({ color: 0x111111 })
	);
	floor.position.y = 0;
	basement.add(floor);

	const wallMaterial = new THREE.MeshPhongMaterial({ color: 0x262626 });
	const backWall = new THREE.Mesh(new THREE.BoxGeometry(26, 10, 0.4), wallMaterial);
	backWall.position.set(0, 5, -13);
	basement.add(backWall);
	const frontWall = new THREE.Mesh(new THREE.BoxGeometry(26, 10, 0.4), wallMaterial);
	frontWall.position.set(0, 5, 13);
	basement.add(frontWall);
	const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 10, 26), wallMaterial);
	leftWall.position.set(-13, 5, 0);
	basement.add(leftWall);
	const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 10, 26), wallMaterial);
	rightWall.position.set(13, 5, 0);
	basement.add(rightWall);

	const roof = new THREE.Mesh(
		new THREE.BoxGeometry(26, 0.5, 26),
		new THREE.MeshPhongMaterial({ color: 0x0a0a0a })
	);
	roof.position.y = 10;
	basement.add(roof);

	mysteryBasementBox = new THREE.Mesh(
		new THREE.BoxGeometry(2, 2, 2),
		new THREE.MeshPhongMaterial({ color: 0xffd700, emissive: 0x553300 })
	);
	mysteryBasementBox.position.set(0, 1, 0);
	mysteryBasementBox.userData.isMysteryBox = true;
	basement.add(mysteryBasementBox);

	mysteryBasementExit = new THREE.Mesh(
		new THREE.BoxGeometry(3, 4, 0.5),
		new THREE.MeshPhongMaterial({ color: 0x444444 })
	);
	mysteryBasementExit.position.set(-8, 2, 8);
	mysteryBasementExit.userData.isMysteryExit = true;
	basement.add(mysteryBasementExit);

	const glow = new THREE.PointLight(0x9b59ff, 0.9, 30);
	glow.position.set(0, 6, 0);
	basement.add(glow);

	scene.add(basement);
	mysteryBasementRoom = basement;
	mysteryBasementEnteredAt = 0;
	mysteryBasementPoliceTriggered = false;
	mysteryBoxRewardCooldown = 0;
}

function enterMysteryBasement() {
	if (!mysteryHouseState || !mysteryBasementRoom) return;
	isInMysteryBasement = true;
	mysteryBasementEnteredAt = Date.now();
	mysteryBasementPoliceTriggered = false;
	player.position.set(mysteryHouseState.plot.x, -18.5, mysteryHouseState.plot.z);
	showMessage('Du bist im Keller. Drücke E an der Box.', 2500);
}

function exitMysteryBasement() {
	if (!mysteryHouseState) return;
	isInMysteryBasement = false;
	player.position.set(mysteryHouseState.plot.x, 0, mysteryHouseState.plot.z + 12);
	showMessage('Du bist aus dem Keller heraus.', 2000);
}

function collectMysteryBox() {
	const now = Date.now();
	if (now < mysteryBoxRewardCooldown) return;
	const distance = Math.sqrt(
		Math.pow(player.position.x - mysteryBasementBox.position.x - mysteryBasementRoom.position.x, 2) +
		Math.pow(player.position.z - mysteryBasementBox.position.z - mysteryBasementRoom.position.z, 2)
	);
	if (distance > 5) {
		showMessage('Gehe näher an die Box.', 1500);
		return;
	}
	money += 10000;
	moneySpan.textContent = `Geld: ${money} €`;
	mysteryBoxRewardCooldown = now + 250;
	saveData();
	showMessage('10000€ gefunden!', 2000);
	if (!mysteryBasementPoliceTriggered && now - mysteryBasementEnteredAt > 15000) {
		startMysteryPoliceSearch();
	}
}

function startMysteryPoliceSearch() {
	if (mysteryBasementPoliceTriggered) return;
	mysteryBasementPoliceTriggered = true;
	policeAlert = true;
	wantedLevel = Math.max(wantedLevel, 1);
	updateWantedLevelDisplay();
	showMessage('🚔 Jemand hat den Keller bemerkt. Eine kleine Polizei-Suche beginnt.', 4000);

	if (mysteryPoliceUnits.length === 0 && mysteryHouseState) {
		const plot = mysteryHouseState.plot;
		const car = createPoliceCar(plot.x - 35, plot.z - 25);
		scene.add(car);
		mysteryPoliceUnits.push(car);

		setTimeout(() => {
			const cop1 = createFootPolice(plot.x - 20, plot.z - 10);
			const cop2 = createFootPolice(plot.x + 18, plot.z + 8);
			footPolice.push(cop1, cop2);
			mysteryPoliceUnits.push(cop1.mesh, cop2.mesh);
		}, 1200);
	}
}

function closeShop() {
	shopPanel.style.display = 'none';
}

// Autohändler Funktionen
function getSelectedCarColor() {
	return Number.parseInt(carColorPicker.value.slice(1), 16);
}

function buySmallCar() {
	if (money >= 5000) {
		const carColor = getSelectedCarColor();
		money -= 5000;
		moneySpan.textContent = `Geld: ${money} €`;
		saveData();
		showMessage('🚙 Kleiner Wagen gekauft! Er steht neben deinem Haus!', 3000);
		
		// Auto zu ownedCars hinzufügen
		const carId = Date.now() + Math.random(); // Eindeutige ID
		ownedCars.push({
			id: carId,
			type: 'small',
			name: 'Kleiner Wagen',
			color: carColor
		});
		saveVehicleData();
		
		// Neues Auto neben dem Haus spawnen
		const spawnPos = getHouseSpawnPosition();
		const newCar = createCar('small', spawnPos.x, spawnPos.z, carColor);
		newCar.userData.id = carId;
		newCar.userData.name = 'Kleiner Wagen';
		newCar.userData.isOwned = true;
		
		// Grüne Markierung für eigene Autos
		const marker = new THREE.Mesh(
			new THREE.SphereGeometry(0.5, 8, 8),
			new THREE.MeshBasicMaterial({ color: 0x00FF00, transparent: true, opacity: 0.7 })
		);
		marker.position.y = 3;
		newCar.add(marker);
		
		// Zusätzliche Info-Markierung mit Auto-Name
		const infoMarker = new THREE.Mesh(
			new THREE.PlaneGeometry(3, 1),
			new THREE.MeshBasicMaterial({ 
				color: 0xFFFFFF, 
				transparent: true, 
				opacity: 0.8,
				side: THREE.DoubleSide
			})
		);
		infoMarker.position.set(0, 4, 0);
		infoMarker.rotation.x = -Math.PI / 6; // Leicht nach vorne geneigt
		
		newCar.add(infoMarker);
		
		showMessage(`🚗 Dein ${newCar.userData.name} steht bei (${Math.round(spawnPos.x)}, ${Math.round(spawnPos.z)})`, 5000);
		
		scene.add(newCar);
	} else {
		showMessage('Zu wenig Geld! Du brauchst 5000€.', 2000);
	}
}

function buyFamilyVan() {
	if (money >= 8000) {
		const carColor = getSelectedCarColor();
		money -= 8000;
		moneySpan.textContent = `Geld: ${money} €`;
		saveData();
		showMessage('🚐 Familien-Van gekauft! Er steht neben deinem Haus!', 3000);
		
		// Auto zu ownedCars hinzufügen
		const carId = Date.now() + Math.random(); // Eindeutige ID
		ownedCars.push({
			id: carId,
			type: 'van',
			name: 'Familien-Van',
			color: carColor
		});
		saveVehicleData();
		
		// Neues Auto neben dem Haus spawnen
		const spawnPos = getHouseSpawnPosition();
		const newCar = createCar('van', spawnPos.x, spawnPos.z, carColor);
		newCar.userData.id = carId;
		newCar.userData.name = 'Familien-Van';
		newCar.userData.type = 'van'; // Typ hinzufügen
		newCar.userData.isOwned = true;
		
		// Grüne Markierung für eigene Autos
		const marker = new THREE.Mesh(
			new THREE.SphereGeometry(0.5, 8, 8),
			new THREE.MeshBasicMaterial({ color: 0x00FF00, transparent: true, opacity: 0.7 })
		);
		marker.position.y = 3;
		newCar.add(marker);
		
		showMessage(`🚗 Dein ${newCar.userData.name} steht bei (${Math.round(spawnPos.x)}, ${Math.round(spawnPos.z)})`, 5000);
		
		scene.add(newCar);
	} else {
		showMessage('Zu wenig Geld! Du brauchst 8000€.', 2000);
	}
}

function buySportsCar() {
	if (money >= 12000) {
		const carColor = getSelectedCarColor();
		money -= 12000;
		moneySpan.textContent = `Geld: ${money} €`;
		saveData();
		showMessage('🏎️ Sportwagen gekauft! Er steht neben deinem Haus!', 3000);
		
		// Auto zu ownedCars hinzufügen
		const carId = Date.now() + Math.random(); // Eindeutige ID
		ownedCars.push({
			id: carId,
			type: 'sports',
			name: 'Sportwagen',
			color: carColor
		});
		saveVehicleData();
		
		// Neues Auto neben dem Haus spawnen
		const spawnPos = getHouseSpawnPosition();
		const newCar = createCar('sports', spawnPos.x, spawnPos.z, carColor);
		newCar.userData.id = carId;
		newCar.userData.name = 'Sportwagen';
		newCar.userData.type = 'sports'; // Typ hinzufügen
		newCar.userData.isOwned = true;
		
		// Grüne Markierung für eigene Autos
		const marker = new THREE.Mesh(
			new THREE.SphereGeometry(0.5, 8, 8),
			new THREE.MeshBasicMaterial({ color: 0x00FF00, transparent: true, opacity: 0.7 })
		);
		marker.position.y = 3;
		newCar.add(marker);
		
		showMessage(`🚗 Dein ${newCar.userData.name} steht bei (${Math.round(spawnPos.x)}, ${Math.round(spawnPos.z)})`, 5000);
		
		scene.add(newCar);
	} else {
		showMessage('Zu wenig Geld! Du brauchst 12000€.', 2000);
	}
}

function buyPickupTruck() {
	if (money >= 10000) {
		const carColor = getSelectedCarColor();
		money -= 10000;
		moneySpan.textContent = `Geld: ${money} €`;
		saveData();
		showMessage('🚛 Pickup Truck gekauft! Er steht neben deinem Haus!', 3000);
		
		// Auto zu ownedCars hinzufügen
		const carId = Date.now() + Math.random(); // Eindeutige ID
		ownedCars.push({
			id: carId,
			type: 'truck',
			name: 'Pickup Truck',
			color: carColor
		});
		saveVehicleData();
		
		// Neues Auto neben dem Haus spawnen
		const spawnPos = getHouseSpawnPosition();
		const newCar = createCar('truck', spawnPos.x, spawnPos.z, carColor);
		newCar.userData.id = carId;
		newCar.userData.name = 'Pickup Truck';
		newCar.userData.isOwned = true;
		
		// Grüne Markierung für eigene Autos
		const marker = new THREE.Mesh(
			new THREE.SphereGeometry(0.5, 8, 8),
			new THREE.MeshBasicMaterial({ color: 0x00FF00, transparent: true, opacity: 0.7 })
		);
		marker.position.y = 3;
		newCar.add(marker);
		
		showMessage(`🚗 Dein ${newCar.userData.name} steht bei (${Math.round(spawnPos.x)}, ${Math.round(spawnPos.z)})`, 5000);
		
		scene.add(newCar);
	} else {
		showMessage('Zu wenig Geld! Du brauchst 10000€.', 2000);
	}
}

function buySUV() {
	if (money >= 15000) {
		const carColor = getSelectedCarColor();
		money -= 15000;
		moneySpan.textContent = `Geld: ${money} €`;
		saveData();
		showMessage('🚙 SUV gekauft! Er steht neben deinem Haus!', 3000);
		
		// Auto zu ownedCars hinzufügen
		const carId = Date.now() + Math.random(); // Eindeutige ID
		ownedCars.push({
			id: carId,
			type: 'suv',
			name: 'SUV',
			color: carColor
		});
		saveVehicleData();
		
		// Neues Auto neben dem Haus spawnen
		const spawnPos = getHouseSpawnPosition();
		const newCar = createCar('suv', spawnPos.x, spawnPos.z, carColor);
		newCar.userData.id = carId;
		newCar.userData.name = 'SUV';
		newCar.userData.isOwned = true;
		
		// Grüne Markierung für eigene Autos
		const marker = new THREE.Mesh(
			new THREE.SphereGeometry(0.5, 8, 8),
			new THREE.MeshBasicMaterial({ color: 0x00FF00, transparent: true, opacity: 0.7 })
		);
		marker.position.y = 3;
		newCar.add(marker);
		
		showMessage(`🚗 Dein ${newCar.userData.name} steht bei (${Math.round(spawnPos.x)}, ${Math.round(spawnPos.z)})`, 5000);
		
		scene.add(newCar);
	} else {
		showMessage('Zu wenig Geld! Du brauchst 15000€.', 2000);
	}
}

function buyConvertible() {
	if (money >= 18000) {
		const carColor = getSelectedCarColor();
		money -= 18000;
		moneySpan.textContent = `Geld: ${money} €`;
		saveData();
		showMessage('🏎️ Cabriolet gekauft! Er steht neben deinem Haus!', 3000);
		
		// Auto zu ownedCars hinzufügen
		const carId = Date.now() + Math.random(); // Eindeutige ID
		ownedCars.push({
			id: carId,
			type: 'convertible',
			name: 'Cabriolet',
			color: carColor
		});
		saveVehicleData();
		
		// Neues Auto neben dem Haus spawnen
		const spawnPos = getHouseSpawnPosition();
		const newCar = createCar('convertible', spawnPos.x, spawnPos.z, carColor);
		newCar.userData.id = carId;
		newCar.userData.name = 'Cabriolet';
		newCar.userData.isOwned = true;
		
		// Grüne Markierung für eigene Autos
		const marker = new THREE.Mesh(
			new THREE.SphereGeometry(0.5, 8, 8),
			new THREE.MeshBasicMaterial({ color: 0x00FF00, transparent: true, opacity: 0.7 })
		);
		marker.position.y = 3;
		newCar.add(marker);
		
		showMessage(`🚗 Dein ${newCar.userData.name} steht bei (${Math.round(spawnPos.x)}, ${Math.round(spawnPos.z)})`, 5000);
		
		scene.add(newCar);
	} else {
		showMessage('Zu wenig Geld! Du brauchst 18000€.', 2000);
	}
}

function buyLuxury() {
	if (money >= 25000) {
		const carColor = getSelectedCarColor();
		money -= 25000;
		moneySpan.textContent = `Geld: ${money} €`;
		saveData();
		showMessage('🛡️ Luxuslimousine gekauft! Sie steht neben deinem Haus!', 3000);
		
		// Auto zu ownedCars hinzufügen
		const carId = Date.now() + Math.random(); // Eindeutige ID
		ownedCars.push({
			id: carId,
			type: 'luxury',
			name: 'Luxuslimousine',
			color: carColor
		});
		saveVehicleData();
		
		// Neues Auto neben dem Haus spawnen
		const spawnPos = getHouseSpawnPosition();
		const newCar = createCar('luxury', spawnPos.x, spawnPos.z, carColor);
		newCar.userData.id = carId;
		newCar.userData.name = 'Luxuslimousine';
		newCar.userData.isOwned = true;
		
		// Grüne Markierung für eigene Autos
		const marker = new THREE.Mesh(
			new THREE.SphereGeometry(0.5, 8, 8),
			new THREE.MeshBasicMaterial({ color: 0x00FF00, transparent: true, opacity: 0.7 })
		);
		marker.position.y = 3;
		newCar.add(marker);
		
		showMessage(`🚗 Deine ${newCar.userData.name} steht bei (${Math.round(spawnPos.x)}, ${Math.round(spawnPos.z)})`, 5000);
		
		scene.add(newCar);
	} else {
		showMessage('Zu wenig Geld! Du brauchst 25000€.', 2000);
	}
}

function buyBus() {
	if (money >= 30000) {
		const carColor = getSelectedCarColor();
		money -= 30000;
		moneySpan.textContent = `Geld: ${money} €`;
		saveData();
		showMessage('🚌 Bus gekauft! Er steht neben deinem Haus!', 3000);
		
		// Auto zu ownedCars hinzufügen
		const carId = Date.now() + Math.random(); // Eindeutige ID
		ownedCars.push({
			id: carId,
			type: 'bus',
			name: 'Bus',
			color: carColor
		});
		saveVehicleData();
		
		// Neues Auto neben dem Haus spawnen
		const spawnPos = getHouseSpawnPosition();
		const newCar = createCar('bus', spawnPos.x, spawnPos.z, carColor);
		newCar.userData.id = carId;
		newCar.userData.name = 'Bus';
		newCar.userData.isOwned = true;
		
		// Grüne Markierung für eigene Autos
		const marker = new THREE.Mesh(
			new THREE.SphereGeometry(0.5, 8, 8),
			new THREE.MeshBasicMaterial({ color: 0x00FF00, transparent: true, opacity: 0.7 })
		);
		marker.position.y = 3;
		newCar.add(marker);
		
		showMessage(`🚗 Dein ${newCar.userData.name} steht bei (${Math.round(spawnPos.x)}, ${Math.round(spawnPos.z)})`, 5000);
		
		scene.add(newCar);
	} else {
		showMessage('Zu wenig Geld! Du brauchst 30000€.', 2000);
	}
}

function buyPerformanceCar(type, name, color, price) {
	if (money < price) {
		showMessage(`Zu wenig Geld! Du brauchst ${price}€.`, 2000);
		return;
	}

	color = getSelectedCarColor();
	money -= price;
	moneySpan.textContent = `Geld: ${money} €`;
	const carId = Date.now() + Math.random();
	ownedCars.push({ id: carId, type, name, color });
	saveData();
	saveVehicleData();

	const spawnPos = getHouseSpawnPosition();
	const newCar = createCar(type, spawnPos.x, spawnPos.z, color);
	newCar.userData.id = carId;
	newCar.userData.name = name;
	newCar.userData.isOwned = true;

	const marker = new THREE.Mesh(
		new THREE.SphereGeometry(0.5, 8, 8),
		new THREE.MeshBasicMaterial({ color: 0x00FF00, transparent: true, opacity: 0.7 })
	);
	marker.position.y = 3;
	newCar.add(marker);
	scene.add(newCar);
	showMessage(`🏎️ ${name} gekauft! Es steht neben deinem Haus.`, 3500);
}

function buyRacingCar() {
	buyPerformanceCar('supercar', 'Rennwagen GT', 0xE63946, 45000);
}

function buyHypercar() {
	buyPerformanceCar('hypercar', 'Hypercar X', 0x00B8D9, 70000);
}

function getHouseSpawnPosition() {
	// Position neben dem primären Spielerhaus
	const primaryHouse = getPrimaryHousePlot();
	const houseX = primaryHouse.x;
	const houseZ = primaryHouse.z;
	
	// Berechne eine Position neben dem Haus
	// Verschiedene Positionen für verschiedene Autos
	const positions = [
		{ x: houseX + 15, z: houseZ },      // Rechts neben dem Haus
		{ x: houseX - 15, z: houseZ },      // Links neben dem Haus
		{ x: houseX, z: houseZ + 15 },      // Hinter dem Haus
		{ x: houseX, z: houseZ - 15 },      // Vor dem Haus
		{ x: houseX + 10, z: houseZ + 10 }, // Diagonal rechts hinten
		{ x: houseX - 10, z: houseZ + 10 }, // Diagonal links hinten
		{ x: houseX + 10, z: houseZ - 10 }, // Diagonal rechts vorne
		{ x: houseX - 10, z: houseZ - 10 }  // Diagonal links vorne
	];
	
	// Finde eine freie Position (nicht zu nah an anderen Autos)
	let bestPosition = positions[0];
	let minDistance = Infinity;
	
	positions.forEach(pos => {
		let closestDistance = Infinity;
		
		// Prüfe Distanz zu allen vorhandenen Autos
		ownedCars.forEach(carData => {
			// Durchsuche alle Objekte in der Szene nach dem Fahrzeug mit der richtigen ID
			let existingVehicle = null;
			scene.traverse((object) => {
				if (object.userData && object.userData.id === carData.id && object.userData.isOwned) {
					existingVehicle = object;
				}
			});

			if (existingVehicle) {
				const distance = Math.sqrt(
					Math.pow(existingVehicle.position.x - pos.x, 2) +
					Math.pow(existingVehicle.position.z - pos.z, 2)
				);
				if (distance < closestDistance) {
					closestDistance = distance;
				}
			}
		});
		
		// Wähle die Position mit dem größten Abstand zu anderen Autos
		if (closestDistance > minDistance || ownedCars.length === 0) {
			minDistance = closestDistance;
			bestPosition = pos;
		}
	});
	
	return bestPosition;
}

function createFlightVehicle(type, x, z, color) {
	const vehicle = new THREE.Group();
	const material = new THREE.MeshPhongMaterial({ color });
	const darkMaterial = new THREE.MeshPhongMaterial({ color: 0x27323a });
	if (type === 'helicopter') {
		const cabin = new THREE.Mesh(new THREE.SphereGeometry(3.2, 16, 10), material);
		cabin.scale.set(1.35, 0.8, 0.9);
		cabin.position.y = 3.2;
		vehicle.add(cabin);
		const tail = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 8), material);
		tail.position.set(0, 3.2, -6);
		vehicle.add(tail);
		const rotor = new THREE.Mesh(new THREE.BoxGeometry(14, 0.12, 0.45), darkMaterial);
		rotor.position.y = 6.5;
		vehicle.add(rotor);
		const skid = new THREE.Mesh(new THREE.BoxGeometry(5, 0.3, 4), darkMaterial);
		skid.position.y = 0.45;
		vehicle.add(skid);
		vehicle.userData.rotor = rotor;
	} else {
		const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 2.3, 16, 16), material);
		fuselage.rotation.x = Math.PI / 2;
		fuselage.position.y = 3;
		vehicle.add(fuselage);
		const wing = new THREE.Mesh(new THREE.BoxGeometry(24, 0.25, 6), material);
		wing.position.y = 3;
		vehicle.add(wing);
		const tailWing = new THREE.Mesh(new THREE.BoxGeometry(8, 0.2, 3), material);
		tailWing.position.set(0, 4.2, -6);
		vehicle.add(tailWing);
		const fin = new THREE.Mesh(new THREE.BoxGeometry(0.25, 3, 2.5), material);
		fin.position.set(0, 5, -6);
		vehicle.add(fin);
	}
	vehicle.position.set(x, 0, z);
	return vehicle;
}

function createOwnedVehicle(vehicleData, position) {
	const vehicle = vehicleData.type === 'helicopter' || vehicleData.type === 'airplane'
		? createFlightVehicle(vehicleData.type, position.x, position.z, vehicleData.color)
		: createCar(vehicleData.type, position.x, position.z, vehicleData.color);
	vehicle.rotation.y += position.rotation || 0;
	vehicle.userData.id = vehicleData.id;
	vehicle.userData.name = vehicleData.name;
	vehicle.userData.isOwned = true;
	return vehicle;
}

function buyFlightVehicle(type, name, price, color) {
	if (money < price) {
		showMessage(`Zu wenig Geld! Du brauchst ${price}€.`, 2500);
		return;
	}
	money -= price;
	moneySpan.textContent = `Geld: ${money} €`;
	const vehicleData = { id: Date.now() + Math.random(), type, name, color };
	ownedCars.push(vehicleData);
	saveData();
	saveVehicleData();
	const spawn = airfieldSpawnPositions[type];
	const vehicle = createOwnedVehicle(vehicleData, spawn);
	scene.add(vehicle);
	showMessage(`${name} gekauft! Er steht am Flugplatz bei (${spawn.x}, ${spawn.z}).`, 4000);
}

function buyHelicopter() {
	buyFlightVehicle('helicopter', 'Helikopter', 90000, 0x2d8f6b);
}

function buyAirplane() {
	buyFlightVehicle('airplane', 'Flugzeug', 150000, 0x3a78b5);
}

// Fahrzeug-System Funktionen
function enterVehicle(vehicle) {
	if (!isInVehicle && ownedCars.some(car => car.id === vehicle.userData.id)) {
		currentVehicle = vehicle;
		// Fahrzeugtyp aus ownedCars finden
		const carData = ownedCars.find(car => car.id === vehicle.userData.id);
		currentVehicleType = carData ? carData.type : 'small'; // Fallback auf 'small'
		console.log('Fahrzeug betreten - Typ:', currentVehicleType, 'Max Speed:', getVehicleMaxSpeed(currentVehicleType));
		isInVehicle = true;
		player.visible = false; // Spieler ausblenden
		
		// Physik-Variablen für flüssiges Fahren zurücksetzen
		vehicleSpeed = 0;
		vehicleRotation = 0;
		
		// Kamera auf Fahrzeug-Perspektive umstellen
		const maxSpeed = getVehicleMaxSpeed(currentVehicleType);
		const speedMessage = maxSpeed >= 3.0 ? '🏎️ Extrem schnell!' : maxSpeed >= 2.5 ? '🏎️ Sehr schnell!' : maxSpeed >= 2.0 ? '🚗 Schnell!' : maxSpeed >= 1.5 ? '🚗 Normal' : '🐌 Langsam';
		showMessage(`🚗 Du bist ins Auto eingestiegen! (${speedMessage}) Benutze WASD zum Fahren, E zum Aussteigen.`, 4000);
		
		// Geschwindigkeitsanzeige initialisieren
		updateSpeedDisplay();
		
		// Spieler-Position auf Fahrzeug setzen
		player.position.copy(vehicle.position);
		player.position.y += 2; // Etwas über dem Fahrzeug
		
		// Fahrzeug als "aktiv" markieren
		vehicle.userData.isActive = true;
	}
}

function exitVehicle() {
	if (isInVehicle && currentVehicle) {
		isInVehicle = false;
		player.visible = true; // Spieler wieder anzeigen
		
		// Spieler neben dem Fahrzeug positionieren
		player.position.copy(currentVehicle.position);
		player.position.x += 3; // Rechts neben dem Auto
		
		// Fahrzeug als "inaktiv" markieren
		currentVehicle.userData.isActive = false;
		currentVehicle = null;
		currentVehicleType = null; // Typ zurücksetzen
		
		// Geschwindigkeitsanzeige ausblenden
		speedDisplay.style.display = 'none';
		
		// Physik-Variablen zurücksetzen für flüssiges Fahren
		vehicleSpeed = 0;
		vehicleRotation = 0;
		
		showMessage('🚶 Du bist aus dem Auto ausgestiegen.', 2000);
	}
}

function updateVehicleMovement() {
	if (!isInVehicle || !currentVehicle) return;
	if (currentVehicleType === 'helicopter' || currentVehicleType === 'airplane') {
		const maxSpeed = currentVehicleType === 'airplane' ? 5.8 : 3.8;
		if (keys['w'] || keys['arrowup']) vehicleSpeed = Math.min(maxSpeed, vehicleSpeed + 0.12);
		else if (keys['s'] || keys['arrowdown']) vehicleSpeed = Math.max(0, vehicleSpeed - 0.16);
		else vehicleSpeed *= 0.985;
		if (keys['a'] || keys['arrowleft']) currentVehicle.rotation.y += 0.035;
		if (keys['d'] || keys['arrowright']) currentVehicle.rotation.y -= 0.035;
		if (keys[' '] || keys['space']) currentVehicle.position.y = Math.min(180, currentVehicle.position.y + 0.38);
		if (keys['shift']) currentVehicle.position.y = Math.max(0, currentVehicle.position.y - 0.38);
		if (currentVehicleType === 'airplane' && vehicleSpeed > 1.2 && currentVehicle.position.y < 4) {
			currentVehicle.position.y += 0.12;
		}
		currentVehicle.position.x += Math.sin(currentVehicle.rotation.y) * vehicleSpeed;
		currentVehicle.position.z += Math.cos(currentVehicle.rotation.y) * vehicleSpeed;
		if (currentVehicle.userData.rotor) currentVehicle.userData.rotor.rotation.y += 0.55;
		player.position.copy(currentVehicle.position);
		player.position.y += 2;
		const cameraYaw = currentVehicle.rotation.y + (camAngleY - Math.PI / 2);
		const distance = 19;
		camera.position.set(
			currentVehicle.position.x - Math.sin(cameraYaw) * distance,
			currentVehicle.position.y + 10,
			currentVehicle.position.z - Math.cos(cameraYaw) * distance
		);
		cameraTarget.copy(currentVehicle.position);
		cameraTarget.y += 3;
		camera.lookAt(cameraTarget);
		return;
	}

	// Fahrzeug-Physik Variablen
	let targetSpeed = 0;
	let targetRotation = 0;

	// Eingabe verarbeiten
	if (keys['w'] || keys['arrowup']) {
		targetSpeed = getVehicleMaxSpeed(currentVehicleType); // Vorwärts basierend auf Fahrzeugtyp
	}
	if (keys['s'] || keys['arrowdown']) {
		targetSpeed = getVehicleReverseSpeed(currentVehicleType); // Rückwärts basierend auf Fahrzeugtyp
	}
	if (keys['a'] || keys['arrowleft']) {
		targetRotation = 0.04; // Links drehen (erhöht für bessere Steuerung)
	}
	if (keys['d'] || keys['arrowright']) {
		targetRotation = -0.04; // Rechts drehen
	}

	// Flüssige Beschleunigung/Bremsung (basierend auf Fahrzeugtyp - erhöht für schnellere Beschleunigung)
	let acceleration = 0.15; // Erhöht von 0.08
	let deceleration = 0.10; // Erhöht von 0.05
	
	// Sportwagen haben bessere Beschleunigung
	if (currentVehicleType === 'hypercar') {
		acceleration = 0.37;
		deceleration = 0.22;
	} else if (currentVehicleType === 'supercar') {
		acceleration = 0.31;
		deceleration = 0.18;
	} else if (currentVehicleType === 'sports') {
		acceleration = 0.25; // Schnellere Beschleunigung für Sportwagen (erhöht von 0.12)
		deceleration = 0.15; // Schnellere Bremsung für Sportwagen (erhöht von 0.08)
	} else if (currentVehicleType === 'convertible') {
		acceleration = 0.20; // Gute Beschleunigung für Cabrio
		deceleration = 0.12; // Gute Bremsung für Cabrio
	} else if (currentVehicleType === 'truck' || currentVehicleType === 'bus') {
		acceleration = 0.08; // Langsamere Beschleunigung für schwere Fahrzeuge (erhöht von 0.05)
		deceleration = 0.06; // Langsamere Bremsung für schwere Fahrzeuge (erhöht von 0.03)
	}

	if (targetSpeed > vehicleSpeed) {
		vehicleSpeed += acceleration;
		if (vehicleSpeed > targetSpeed) vehicleSpeed = targetSpeed;
	} else if (targetSpeed < vehicleSpeed) {
		vehicleSpeed -= deceleration;
		if (vehicleSpeed < targetSpeed) vehicleSpeed = targetSpeed;
	} else {
		// Natürliche Abbremsung wenn keine Eingabe
		if (Math.abs(vehicleSpeed) > 0.01) {
			vehicleSpeed *= 0.95; // Leichte Trägheit
		} else {
			vehicleSpeed = 0;
		}
	}

	// Geschwindigkeitsabhängige Lenkung
	const steeringSensitivity = Math.max(0.3, 1 - Math.abs(vehicleSpeed) * 0.5);
	const actualRotation = targetRotation * steeringSensitivity;

	// Flüssige Drehung
	const rotationAcceleration = 0.02;
	if (targetRotation > vehicleRotation) {
		vehicleRotation += rotationAcceleration;
		if (vehicleRotation > actualRotation) vehicleRotation = actualRotation;
	} else if (targetRotation < vehicleRotation) {
		vehicleRotation -= rotationAcceleration;
		if (vehicleRotation < actualRotation) vehicleRotation = actualRotation;
	} else {
		// Natürliche Zentrierung der Lenkung
		if (Math.abs(vehicleRotation) > 0.001) {
			vehicleRotation *= 0.9;
		} else {
			vehicleRotation = 0;
		}
	}

	// Bewegung anwenden
	if (Math.abs(vehicleSpeed) > 0.01) {
		// Drift-Effekt bei scharfen Kurven
		const driftFactor = Math.min(1, Math.abs(vehicleRotation) * 2);
		const forwardX = Math.sin(currentVehicle.rotation.y) * vehicleSpeed;
		const forwardZ = Math.cos(currentVehicle.rotation.y) * vehicleSpeed;

		// Seitliche Drift-Komponente
		const sideX = Math.sin(currentVehicle.rotation.y + Math.PI/2) * vehicleSpeed * driftFactor * 0.3;
		const sideZ = Math.cos(currentVehicle.rotation.y + Math.PI/2) * vehicleSpeed * driftFactor * 0.3;

		currentVehicle.position.x += forwardX + sideX;
		currentVehicle.position.z += forwardZ + sideZ;
	}

	// Drehung anwenden
	if (Math.abs(vehicleRotation) > 0.001) {
		currentVehicle.rotation.y += vehicleRotation;
	}

	// Spieler-Position mit dem Fahrzeug synchronisieren
	player.position.copy(currentVehicle.position);
	player.position.y = currentVehicle.position.y + 2;

	// Fahrzeug-Kamera mit derselben Third-Person-Logik wie zu Fuß
	const px = currentVehicle.position.x;
	const pz = currentVehicle.position.z;
	const py = currentVehicle.position.y + 2.4;
	const vehicleCamDistance = 14;
	camera.fov = 82;
	camera.updateProjectionMatrix();
	const cameraYaw = currentVehicle.rotation.y + (camAngleY - Math.PI / 2);
	const horizontalDistance = vehicleCamDistance * Math.sin(camAngleX);
	const cameraX = px - Math.sin(cameraYaw) * horizontalDistance;
	const cameraZ = pz - Math.cos(cameraYaw) * horizontalDistance;
	const cameraY = py + vehicleCamDistance * Math.cos(camAngleX);
	const cameraLerp = 0.18;
	camera.position.x += (cameraX - camera.position.x) * cameraLerp;
	camera.position.y += (cameraY - camera.position.y) * cameraLerp;
	camera.position.z += (cameraZ - camera.position.z) * cameraLerp;
	cameraTarget.x = px;
	cameraTarget.y = py;
	cameraTarget.z = pz;
	camera.lookAt(cameraTarget);
}

function checkVehicleInteraction() {
	if (isInVehicle) return null;

	// Prüfe Distanz zu eigenen Fahrzeugen
	for (const car of ownedCars) {
		// Durchsuche alle Objekte in der Szene nach dem Fahrzeug mit der richtigen ID
		let vehicle = null;
		scene.traverse((object) => {
			if (object.userData && object.userData.id === car.id && object.userData.isOwned) {
				vehicle = object;
			}
		});

		if (vehicle) {
			const distance = Math.sqrt(
				Math.pow(vehicle.position.x - player.position.x, 2) +
				Math.pow(vehicle.position.z - player.position.z, 2)
			);

			// Debug-Ausgabe für bessere Fehlersuche
			console.log(`Fahrzeug ${car.name} bei (${Math.round(vehicle.position.x)}, ${Math.round(vehicle.position.z)}), Spieler bei (${Math.round(player.position.x)}, ${Math.round(player.position.z)}), Distanz: ${Math.round(distance)}`);

			if (distance < 8) { // Erhöhe die Distanz auf 8 für bessere Erreichbarkeit
				showMessage('Drücke E, um ins Auto einzusteigen', 2000);
				return vehicle;
			}
		}
	}
	return null;
}

function saveVehicleData() {
	setGameData('ownedCars', JSON.stringify(ownedCars));
}

// Auto-Funktionen
function createCar(type, x, z, color) {
	const car = new THREE.Group();
	
	if (type === 'small') {
		// Kleiner Wagen
		const body = new THREE.Mesh(
			new THREE.BoxGeometry(4, 1.5, 2),
			new THREE.MeshPhongMaterial({ color: color })
		);
		body.position.y = 0.75;
		car.add(body);
		
		// Dach
		const roof = new THREE.Mesh(
			new THREE.BoxGeometry(2.5, 1, 1.5),
			new THREE.MeshPhongMaterial({ color: color })
		);
		roof.position.y = 1.75;
		car.add(roof);
		
		// Räder
		const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 8);
		const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
		
		const wheels = [
			{ x: -1.5, z: -0.8 }, { x: 1.5, z: -0.8 },
			{ x: -1.5, z: 0.8 }, { x: 1.5, z: 0.8 }
		];
		
		wheels.forEach(pos => {
			const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
			wheel.position.set(pos.x, 0.3, pos.z);
			wheel.rotation.z = Math.PI / 2;
			car.add(wheel);
		});
		
	} else if (type === 'van') {
		// Familien-Van
		const body = new THREE.Mesh(
			new THREE.BoxGeometry(6, 2, 2.5),
			new THREE.MeshPhongMaterial({ color: color })
		);
		body.position.y = 1;
		car.add(body);
		
		// Dach
		const roof = new THREE.Mesh(
			new THREE.BoxGeometry(5, 1.5, 2),
			new THREE.MeshPhongMaterial({ color: color })
		);
		roof.position.y = 2.25;
		car.add(roof);
		
		// Räder
		const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 8);
		const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
		
		const wheels = [
			{ x: -2, z: -1 }, { x: 2, z: -1 },
			{ x: -2, z: 1 }, { x: 2, z: 1 }
		];
		
		wheels.forEach(pos => {
			const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
			wheel.position.set(pos.x, 0.4, pos.z);
			wheel.rotation.z = Math.PI / 2;
			car.add(wheel);
		});
		
	} else if (type === 'sports') {
		// Sportwagen
		const body = new THREE.Mesh(
			new THREE.BoxGeometry(5, 1.2, 2),
			new THREE.MeshPhongMaterial({ color: color })
		);
		body.position.y = 0.6;
		car.add(body);
		
		// Dach (niedriger)
		const roof = new THREE.Mesh(
			new THREE.BoxGeometry(2, 0.8, 1.5),
			new THREE.MeshPhongMaterial({ color: color })
		);
		roof.position.y = 1.4;
		car.add(roof);
		
		// Spoiler
		const spoiler = new THREE.Mesh(
			new THREE.BoxGeometry(2, 0.2, 0.5),
			new THREE.MeshPhongMaterial({ color: 0x333333 })
		);
		spoiler.position.set(0, 1.1, -0.75);
		car.add(spoiler);
		
		// Räder
		const wheelGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.2, 8);
		const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
		
		const wheels = [
			{ x: -1.8, z: -0.7 }, { x: 1.8, z: -0.7 },
			{ x: -1.8, z: 0.7 }, { x: 1.8, z: 0.7 }
		];
		
		wheels.forEach(pos => {
			const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
			wheel.position.set(pos.x, 0.35, pos.z);
			wheel.rotation.z = Math.PI / 2;
			car.add(wheel);
		});
		
	} else if (type === 'supercar' || type === 'hypercar') {
		const isHypercar = type === 'hypercar';
		const body = new THREE.Mesh(
			new THREE.BoxGeometry(isHypercar ? 6.4 : 6, 0.85, 2.25),
			new THREE.MeshPhongMaterial({ color })
		);
		body.position.y = 0.62;
		car.add(body);

		const cabin = new THREE.Mesh(
			new THREE.BoxGeometry(2.6, 0.75, 1.7),
			new THREE.MeshPhongMaterial({ color: 0x17202a, transparent: true, opacity: 0.82 })
		);
		cabin.position.set(-0.25, 1.28, 0);
		car.add(cabin);

		const spoiler = new THREE.Mesh(
			new THREE.BoxGeometry(2.2, 0.16, 0.45),
			new THREE.MeshPhongMaterial({ color: 0x111111 })
		);
		spoiler.position.set(-2.4, 1.18, 0);
		car.add(spoiler);

		const wheelGeometry = new THREE.CylinderGeometry(0.45, 0.45, 0.28, 10);
		const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x151515 });
		const wheelPositions = [
			{ x: -2.25, z: -0.95 }, { x: 2.25, z: -0.95 },
			{ x: -2.25, z: 0.95 }, { x: 2.25, z: 0.95 }
		];
		wheelPositions.forEach(position => {
			const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
			wheel.position.set(position.x, 0.45, position.z);
			wheel.rotation.z = Math.PI / 2;
			car.add(wheel);
		});

		if (isHypercar) {
			const light = new THREE.Mesh(
				new THREE.BoxGeometry(0.15, 0.22, 1.55),
				new THREE.MeshBasicMaterial({ color: 0xb8f7ff })
			);
			light.position.set(3.22, 0.8, 0);
			car.add(light);
		}
	} else if (type === 'truck') {
		// Pickup Truck
		const body = new THREE.Mesh(
			new THREE.BoxGeometry(7, 2.5, 2.5),
			new THREE.MeshPhongMaterial({ color: color })
		);
		body.position.y = 1.25;
		car.add(body);
		
		// Ladefläche
		const bed = new THREE.Mesh(
			new THREE.BoxGeometry(3, 1, 2),
			new THREE.MeshPhongMaterial({ color: 0x8B4513 })
		);
		bed.position.set(1.5, 1.5, 0);
		car.add(bed);
		
		// Räder
		const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 8);
		const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
		
		const wheels = [
			{ x: -2.5, z: -1 }, { x: 2.5, z: -1 },
			{ x: -2.5, z: 1 }, { x: 2.5, z: 1 }
		];
		
		wheels.forEach(pos => {
			const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
			wheel.position.set(pos.x, 0.5, pos.z);
			wheel.rotation.z = Math.PI / 2;
			car.add(wheel);
		});
		
	} else if (type === 'suv') {
		// SUV
		const body = new THREE.Mesh(
			new THREE.BoxGeometry(6, 2.2, 2.3),
			new THREE.MeshPhongMaterial({ color: color })
		);
		body.position.y = 1.1;
		car.add(body);
		
		// Dach
		const roof = new THREE.Mesh(
			new THREE.BoxGeometry(4, 1.2, 1.8),
			new THREE.MeshPhongMaterial({ color: color })
		);
		roof.position.y = 2.2;
		car.add(roof);
		
		// Dachreling
		const roofRack = new THREE.Mesh(
			new THREE.BoxGeometry(4.5, 0.1, 0.1),
			new THREE.MeshPhongMaterial({ color: 0x333333 })
		);
		roofRack.position.y = 2.6;
		car.add(roofRack);
		
		// Räder (größer für SUV)
		const wheelGeometry = new THREE.CylinderGeometry(0.45, 0.45, 0.25, 8);
		const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
		
		const wheels = [
			{ x: -2.2, z: -1 }, { x: 2.2, z: -1 },
			{ x: -2.2, z: 1 }, { x: 2.2, z: 1 }
		];
		
		wheels.forEach(pos => {
			const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
			wheel.position.set(pos.x, 0.45, pos.z);
			wheel.rotation.z = Math.PI / 2;
			car.add(wheel);
		});
		
	} else if (type === 'convertible') {
		// Cabriolet
		const body = new THREE.Mesh(
			new THREE.BoxGeometry(5, 1.3, 2),
			new THREE.MeshPhongMaterial({ color: color })
		);
		body.position.y = 0.65;
		car.add(body);
		
		// Windschutzscheibe
		const windshield = new THREE.Mesh(
			new THREE.BoxGeometry(0.1, 1, 1.8),
			new THREE.MeshPhongMaterial({ color: 0x87CEEB, transparent: true, opacity: 0.7 })
		);
		windshield.position.set(2.2, 1.3, 0);
		car.add(windshield);
		
		// Dach (offen)
		const softTop = new THREE.Mesh(
			new THREE.BoxGeometry(2.5, 0.2, 1.5),
			new THREE.MeshPhongMaterial({ color: 0x000000 })
		);
		softTop.position.set(-0.5, 1.5, 0);
		car.add(softTop);
		
		// Räder
		const wheelGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.2, 8);
		const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
		
		const wheels = [
			{ x: -1.8, z: -0.7 }, { x: 1.8, z: -0.7 },
			{ x: -1.8, z: 0.7 }, { x: 1.8, z: 0.7 }
		];
		
		wheels.forEach(pos => {
			const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
			wheel.position.set(pos.x, 0.35, pos.z);
			wheel.rotation.z = Math.PI / 2;
			car.add(wheel);
		});
		
	} else if (type === 'luxury') {
		// Luxuslimousine
		const body = new THREE.Mesh(
			new THREE.BoxGeometry(7, 1.5, 2.2),
			new THREE.MeshPhongMaterial({ color: color })
		);
		body.position.y = 0.75;
		car.add(body);
		
		// Dach
		const roof = new THREE.Mesh(
			new THREE.BoxGeometry(3, 1, 1.8),
			new THREE.MeshPhongMaterial({ color: color })
		);
		roof.position.y = 1.75;
		car.add(roof);
		
		// Luxus-Details (Chromleisten)
		const chrome1 = new THREE.Mesh(
			new THREE.BoxGeometry(7.2, 0.05, 0.05),
			new THREE.MeshPhongMaterial({ color: 0xC0C0C0 })
		);
		chrome1.position.set(0, 1.1, 1.1);
		car.add(chrome1);
		
		const chrome2 = new THREE.Mesh(
			new THREE.BoxGeometry(7.2, 0.05, 0.05),
			new THREE.MeshPhongMaterial({ color: 0xC0C0C0 })
		);
		chrome2.position.set(0, 1.1, -1.1);
		car.add(chrome2);
		
		// Räder (Luxusfelgen)
		const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 8);
		const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
		
		const wheels = [
			{ x: -2.5, z: -0.8 }, { x: 2.5, z: -0.8 },
			{ x: -2.5, z: 0.8 }, { x: 2.5, z: 0.8 }
		];
		
		wheels.forEach(pos => {
			const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
			wheel.position.set(pos.x, 0.4, pos.z);
			wheel.rotation.z = Math.PI / 2;
			car.add(wheel);
		});
		
	} else if (type === 'bus') {
		// Bus
		const body = new THREE.Mesh(
			new THREE.BoxGeometry(12, 3, 2.8),
			new THREE.MeshPhongMaterial({ color: color })
		);
		body.position.y = 1.5;
		car.add(body);
		
		// Dach
		const roof = new THREE.Mesh(
			new THREE.BoxGeometry(11, 2, 2.5),
			new THREE.MeshPhongMaterial({ color: color })
		);
		roof.position.y = 3;
		car.add(roof);
		
		// Fenster
		for (let i = 0; i < 6; i++) {
			const window = new THREE.Mesh(
				new THREE.BoxGeometry(0.1, 1.5, 1.8),
				new THREE.MeshPhongMaterial({ color: 0x87CEEB, transparent: true, opacity: 0.6 })
			);
			window.position.set(-4 + i * 1.5, 2.2, 1.4);
			car.add(window);
		}
		
		// Räder (mehr Räder für Bus)
		const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 8);
		const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
		
		const wheels = [
			{ x: -4, z: -1.2 }, { x: -1, z: -1.2 }, { x: 1, z: -1.2 }, { x: 4, z: -1.2 },
			{ x: -4, z: 1.2 }, { x: -1, z: 1.2 }, { x: 1, z: 1.2 }, { x: 4, z: 1.2 }
		];
		
		wheels.forEach(pos => {
			const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
			wheel.position.set(pos.x, 0.5, pos.z);
			wheel.rotation.z = Math.PI / 2;
			car.add(wheel);
		});
	}
	
	car.position.set(x, 0, z);
	car.userData = { type: 'car', carType: type };
	return car;
}

function setupCarDealer() {
	// Autos im Autohaus platzieren
	const carDealerX = -80;
	const carDealerZ = 200;
	
	// Kleiner Wagen
	const smallCar = createCar('small', carDealerX - 6, carDealerZ - 3, 0xFF4444);
	smallCar.userData.id = 'showroom_small';
	smallCar.userData.price = 5000;
	smallCar.userData.name = 'Kleiner Wagen';
	smallCar.userData.type = 'small'; // Typ hinzufügen
	smallCar.userData.isShowroom = true; // Markiert als Ausstellungsstück
	
	// Familien-Van
	const familyVan = createCar('van', carDealerX + 6, carDealerZ - 3, 0x4444FF);
	familyVan.userData.id = 'showroom_van';
	familyVan.userData.price = 8000;
	familyVan.userData.name = 'Familien-Van';
	familyVan.userData.type = 'van'; // Typ hinzufügen
	familyVan.userData.isShowroom = true;
	
	// Sportwagen
	const sportsCar = createCar('sports', carDealerX - 6, carDealerZ + 3, 0xFFFF44);
	sportsCar.userData.id = 'showroom_sports';
	sportsCar.userData.price = 12000;
	sportsCar.userData.name = 'Sportwagen';
	sportsCar.userData.type = 'sports'; // Typ hinzufügen
	sportsCar.userData.isShowroom = true;

	const racingCar = createCar('supercar', carDealerX - 18, carDealerZ + 3, 0xE63946);
	racingCar.userData.id = 'showroom_supercar';
	racingCar.userData.price = 45000;
	racingCar.userData.name = 'Rennwagen GT';
	racingCar.userData.type = 'supercar';
	racingCar.userData.isShowroom = true;

	const hypercar = createCar('hypercar', carDealerX + 18, carDealerZ + 3, 0x00B8D9);
	hypercar.userData.id = 'showroom_hypercar';
	hypercar.userData.price = 70000;
	hypercar.userData.name = 'Hypercar X';
	hypercar.userData.type = 'hypercar';
	hypercar.userData.isShowroom = true;
	
	// Pickup Truck
	const pickupTruck = createCar('truck', carDealerX + 6, carDealerZ + 3, 0x44FF44);
	pickupTruck.userData.id = 'showroom_truck';
	pickupTruck.userData.price = 10000;
	pickupTruck.userData.name = 'Pickup Truck';
	pickupTruck.userData.type = 'truck'; // Typ hinzufügen
	pickupTruck.userData.isShowroom = true;
	
	// SUV
	const suv = createCar('suv', carDealerX - 12, carDealerZ - 3, 0xFF8844);
	suv.userData.id = 'showroom_suv';
	suv.userData.price = 15000;
	suv.userData.name = 'SUV';
	suv.userData.type = 'suv'; // Typ hinzufügen
	suv.userData.isShowroom = true;
	
	// Cabriolet
	const convertible = createCar('convertible', carDealerX + 12, carDealerZ - 3, 0xFF44FF);
	convertible.userData.id = 'showroom_convertible';
	convertible.userData.price = 18000;
	convertible.userData.name = 'Cabriolet';
	convertible.userData.type = 'convertible'; // Typ hinzufügen
	convertible.userData.isShowroom = true;
	
	// Luxuslimousine
	const luxury = createCar('luxury', carDealerX - 12, carDealerZ + 3, 0x444444);
	luxury.userData.id = 'showroom_luxury';
	luxury.userData.price = 25000;
	luxury.userData.name = 'Luxuslimousine';
	luxury.userData.type = 'luxury'; // Typ hinzufügen
	luxury.userData.isShowroom = true;
	
	// Bus
	const bus = createCar('bus', carDealerX + 12, carDealerZ + 3, 0xFFFF88);
	bus.userData.id = 'showroom_bus';
	bus.userData.price = 30000;
	bus.userData.name = 'Bus';
	bus.userData.type = 'bus'; // Typ hinzufügen
	bus.userData.isShowroom = true;
	
	// Autos zur Szene hinzufügen
	scene.add(smallCar);
	scene.add(familyVan);
	scene.add(sportsCar);
	scene.add(racingCar);
	scene.add(hypercar);
	scene.add(pickupTruck);
	scene.add(suv);
	scene.add(convertible);
	scene.add(luxury);
	scene.add(bus);
	
	// Gekaufte Autos laden
	loadOwnedCars();
}

function loadOwnedCars() {
	// Gekaufte Autos laden und neben dem Haus platzieren
	ownedCars.forEach((carData, index) => {
		// Berechne Position neben dem Haus basierend auf dem Index
		const primaryHouse = getPrimaryHousePlot();
		const houseX = primaryHouse.x;
		const houseZ = primaryHouse.z;
		
		// Verschiedene Positionen für verschiedene Autos
		const positions = [
			{ x: houseX + 15, z: houseZ },      // Rechts neben dem Haus
			{ x: houseX - 15, z: houseZ },      // Links neben dem Haus
			{ x: houseX, z: houseZ + 15 },      // Hinter dem Haus
			{ x: houseX, z: houseZ - 15 },      // Vor dem Haus
			{ x: houseX + 10, z: houseZ + 10 }, // Diagonal rechts hinten
			{ x: houseX - 10, z: houseZ + 10 }, // Diagonal links hinten
			{ x: houseX + 10, z: houseZ - 10 }, // Diagonal rechts vorne
			{ x: houseX - 10, z: houseZ - 10 }  // Diagonal links vorne
		];
		
		// Verwende Index um Position zu bestimmen, wiederhole bei Bedarf
		const positionIndex = index % positions.length;
		const spawnPos = carData.type === 'helicopter' || carData.type === 'airplane'
			? airfieldSpawnPositions[carData.type]
			: positions[positionIndex];
		
		const ownedCar = createOwnedVehicle(carData, spawnPos);
		
		// Grüne Markierung für eigene Autos
		const marker = new THREE.Mesh(
			new THREE.SphereGeometry(0.5, 8, 8),
			new THREE.MeshBasicMaterial({ color: 0x00FF00, transparent: true, opacity: 0.7 })
		);
		marker.position.y = 3;
		ownedCar.add(marker);
		
		// Zusätzliche Info-Markierung mit Auto-Name
		const infoMarker = new THREE.Mesh(
			new THREE.PlaneGeometry(3, 1),
			new THREE.MeshBasicMaterial({ 
				color: 0xFFFFFF, 
				transparent: true, 
				opacity: 0.8,
				side: THREE.DoubleSide
			})
		);
		infoMarker.position.set(0, 4, 0);
		infoMarker.rotation.x = -Math.PI / 6; // Leicht nach vorne geneigt
		
		ownedCar.add(infoMarker);
		
		showMessage(`🚗 Dein ${ownedCar.userData.name} steht bei (${Math.round(spawnPos.x)}, ${Math.round(spawnPos.z)})`, 3000);
		
		scene.add(ownedCar);
	});
}

jobBtn.addEventListener('click', tryEarnMoney);
buyBtn.addEventListener('click', tryBuy);
bankBtn.addEventListener('click', tryBank);
buyAppleBtn.addEventListener('click', buyApple);
buyBreadBtn.addEventListener('click', buyBread);
buyDrinkBtn.addEventListener('click', buyDrink);
buyHouseBtn.addEventListener('click', buyHouse);
closeShopBtn.addEventListener('click', closeShop);
officeJobBtn.addEventListener('click', startOfficeJob);
officeMathJobBtn.addEventListener('click', () => startOfficeJob('math'));
officeFilingJobBtn.addEventListener('click', () => startOfficeJob('filing'));
cleaningJobBtn.addEventListener('click', doCleaningJob);
closeJobBtn.addEventListener('click', closeJob);
dialogOption1.addEventListener('click', () => selectDialogOption(0));
dialogOption2.addEventListener('click', () => selectDialogOption(1));
dialogOption3.addEventListener('click', () => selectDialogOption(2));
questBtn.addEventListener('click', () => {
	questPanel.style.display = 'block';
	updateQuestUI();
});
closeQuestBtn.addEventListener('click', () => {
	questPanel.style.display = 'none';
});
fashionOptionButtons.forEach(button => {
	button.addEventListener('click', () => buyFashionItem(button.dataset.category, button.dataset.value));
});
outfitColorButtons.forEach(button => {
	button.addEventListener('click', () => selectOutfitColor(Number(button.dataset.color)));
});
closeFashionShopBtn.addEventListener('click', () => {
	fashionShopPanel.style.display = 'none';
});

// Autohändler Event-Listener
buySmallCarBtn.addEventListener('click', buySmallCar);
buyFamilyVanBtn.addEventListener('click', buyFamilyVan);
buySportsCarBtn.addEventListener('click', buySportsCar);
buyRacingCarBtn.addEventListener('click', buyRacingCar);
buyHypercarBtn.addEventListener('click', buyHypercar);
buyPickupTruckBtn.addEventListener('click', buyPickupTruck);
buySUVBtn.addEventListener('click', buySUV);
buyConvertibleBtn.addEventListener('click', buyConvertible);
buyLuxuryBtn.addEventListener('click', buyLuxury);
buyBusBtn.addEventListener('click', buyBus);
buyHelicopterBtn.addEventListener('click', buyHelicopter);
buyAirplaneBtn.addEventListener('click', buyAirplane);
closeCarDealerBtn.addEventListener('click', closeCarDealer);

// Bankraub Event-Listener
bankRobberyBtn.addEventListener('click', openBankRobberyPanel);
closeBankRobberyBtn.addEventListener('click', () => {
	bankRobberyPanel.style.display = 'none';
});

function closeBankRobberyPanel() {
	bankRobberyPanel.style.display = 'none';
}

function runBankRobberyAction(action) {
	action();
	closeBankRobberyPanel();
}

robBankBtn.addEventListener('click', () => runBankRobberyAction(robBank));
guaranteedRobBtn.addEventListener('click', () => runBankRobberyAction(guaranteedRobBank));
hackSecurityBtn.addEventListener('click', () => runBankRobberyAction(hackSecurity));
escapeBtn.addEventListener('click', () => runBankRobberyAction(planEscape));
testMoneyBtn.addEventListener('click', () => runBankRobberyAction(testMoneySystem));
refillNpcBtn.addEventListener('click', () => runBankRobberyAction(refillNpcBank));
triggerPoliceBtn.addEventListener('click', () => runBankRobberyAction(triggerPoliceAlert));
resetPoliceBtn.addEventListener('click', () => runBankRobberyAction(resetPoliceAlert));
policeStatusBtn.addEventListener('click', () => runBankRobberyAction(showPoliceStatus));
guaranteedJailBtn.addEventListener('click', () => runBankRobberyAction(guaranteedJail));
testPoliceCarsBtn.addEventListener('click', () => runBankRobberyAction(testPoliceCars));
testFootPoliceBtn.addEventListener('click', () => runBankRobberyAction(testFootPolice));

document.addEventListener('keydown', e => {
	if (e.key.toLowerCase() === 'e') {
		if (isInMysteryBasement) {
			if (mysteryBasementBox && mysteryBasementRoom) {
				const boxX = mysteryBasementRoom.position.x + mysteryBasementBox.position.x;
				const boxZ = mysteryBasementRoom.position.z + mysteryBasementBox.position.z;
				const boxDistance = Math.sqrt(
					Math.pow(player.position.x - boxX, 2) +
					Math.pow(player.position.z - boxZ, 2)
				);
				if (boxDistance < 5) {
					collectMysteryBox();
					return;
				}
			}

			if (mysteryBasementExit && mysteryBasementRoom) {
				const exitX = mysteryBasementRoom.position.x + mysteryBasementExit.position.x;
				const exitZ = mysteryBasementRoom.position.z + mysteryBasementExit.position.z;
				const exitDistance = Math.sqrt(
					Math.pow(player.position.x - exitX, 2) +
					Math.pow(player.position.z - exitZ, 2)
				);
				if (exitDistance < 6) {
					exitMysteryBasement();
					return;
				}
			}

			showMessage('Suche die Box oder den Ausgang im Keller.', 1500);
			return;
		}

		if (mysteryHouseState && !isInMysteryBasement && !isInVehicle) {
			const houseDistance = Math.sqrt(
				Math.pow(player.position.x - mysteryHouseState.plot.x, 2) +
				Math.pow(player.position.z - mysteryHouseState.plot.z, 2)
			);
			if (houseDistance < 14) {
				enterMysteryBasement();
				return;
			}
		}

		if (tryCompleteActiveJob()) {
			return;
		}
		
		// Fahrzeug-Interaktion zuerst prüfen
		if (isInVehicle) {
			// Aus dem Fahrzeug aussteigen
			exitVehicle();
			return;
		} else {
			// Prüfen, ob nahe bei einem eigenen Fahrzeug
			const nearbyVehicle = checkVehicleInteraction();
			if (nearbyVehicle) {
				enterVehicle(nearbyVehicle);
				return;
			}
		}
		
		// Dialog mit NPC starten, wenn nahe genug
		const npcIndex = checkNPCInteraction();
		if (npcIndex >= 0) {
			startDialog(npcIndex);
			return;
		}
		
	// Wenn Spieler vor Jobcenter: Geld verdienen, sonst vor Supermarkt: kaufen
	if (!tryEarnMoney()) {
		tryBuy();
	}
	}
	if (e.key.toLowerCase() === 'r') {
		if (tryOpenPrisonReception()) return;
		const bank = { x: 160, z: 140 };
		const distX = Math.abs(player.position.x - bank.x);
		const distZ = Math.abs(player.position.z - (bank.z + 10.3));
		if (distX < 15 && distZ < 12) {
			openBankRobberyPanel();
			return;
		}
		// Dialog mit NPC starten, wenn nahe genug
	}
});

// Bankraub-Funktionen
function openBankRobberyPanel() {
	// Bank-Check: Spieler muss vor der Bank stehen
	const bank = { x: 160, z: 140 };
	const distX = Math.abs(player.position.x - bank.x);
	const distZ = Math.abs(player.position.z - (bank.z + 10.3));
	
	if (distX < 15 && distZ < 12) {
		updateBankRobberyInfo();
		bankRobberyPanel.style.display = 'block';
		
		if (npcBankMoney <= 0) {
			showMessage(`🏦 NPC-Bank ist leer! Warte bis NPCs Geld verdienen.`, 3000);
		} else {
			showMessage(`🏦 NPC-Bank-Info: ${npcBankMoney}€ verfügbar zum Stehlen!`, 3000);
		}
	} else {
		showMessage('Du musst vor der Bank stehen, um einen Raub zu planen!', 3000);
	}
}

function updateBankRobberyInfo() {
	bankRobberyMoneySpan.textContent = npcBankMoney + '€';
	policeAlertSpan.textContent = policeAlert ? 'JA - Polizei ist alarmiert!' : 'Nein';
	
	let riskText = 'Niedrig';
	if (wantedLevel >= 3) riskText = 'Hoch';
	else if (wantedLevel >= 1) riskText = 'Mittel';
	jailRiskSpan.textContent = riskText;
	
	// Buttons aktivieren/deaktivieren basierend auf Status
	robBankBtn.disabled = policeAlert;
	hackSecurityBtn.disabled = securityHacked;
	escapeBtn.disabled = !policeAlert;
}

function robBank() {
	if (policeAlert) {
		showMessage('Die Polizei ist bereits alarmiert! Flucht ist die einzige Option.', 3000);
		return;
	}
	
	if (npcBankMoney <= 0) {
		showMessage('❌ Die NPC-Bank ist leer! Kein Geld zum Stehlen verfügbar.', 3000);
		return;
	}
	
	const successChance = securityHacked ? 0.8 : 0.4; // 80% mit gehackter Sicherheit, sonst 40%
	const success = Math.random() < successChance;
	
	console.log('Bankraub-Versuch:', { success, successChance, npcBankMoney, securityHacked });
	
	if (success) {
		const stolenAmount = Math.min(npcBankMoney, Math.floor(Math.random() * 500) + 200);
		const oldMoney = money;
		money += stolenAmount;
		npcBankMoney -= stolenAmount;
		wantedLevel += 2;
		
		console.log('Bankraub erfolgreich:', { stolenAmount, oldMoney, newMoney: money, npcBankMoney });
		
		moneySpan.textContent = `Geld: ${money} €`;
		bankMoneySpan.textContent = `Bank: ${bankMoney} €`;
		saveData();
		
		showMessage(`💰 BANKRAUB ERFOLGREICH! Du hast ${stolenAmount}€ von den NPCs gestohlen!`, 4000);
		showMessage(`💸 Geld erhalten: +${stolenAmount}€`, 2000);
		
		// Sofortige Geldanzeige-Aktualisierung
		setTimeout(() => {
			showMessage(`💰 Aktuelles Geld: ${money}€`, 2000);
		}, 1000);
		
		// Polizei-Alarm auslösen nach kurzer Verzögerung
		setTimeout(() => {
			policeAlert = true;
			showMessage('🚔 POLIZEI-ALARM! Die Polizei ist auf dem Weg! Lauf weg!', 5000);
			updateBankRobberyInfo();
			
			// Polizei-Fahrzeuge spawnen
			spawnPoliceCars();
			
			// Fuß-Polizisten spawnen
			spawnFootPolice();
			
			// Zusätzliche Warnung für bessere Sichtbarkeit
			setTimeout(() => {
				if (policeAlert) {
					showMessage('🚨 DU WIRST GESUCHT! Die Polizei ist hinter dir her!', 3000);
				}
			}, 1000);
		}, 3000);
		
	} else {
		wantedLevel += 1;
		showMessage('❌ Bankraub fehlgeschlagen! Sicherheitssystem hat dich erwischt!', 3000);
		damagePlayer(15, 'Bankraub');
		console.log('Bankraub fehlgeschlagen');
		
		// Sofortiger Polizei-Alarm bei Fehlschlag
		setTimeout(() => {
			policeAlert = true;
			showMessage('🚔 POLIZEI-ALARM! Du wirst gesucht!', 5000);
			updateBankRobberyInfo();
		}, 1000);
	}
}

// Test-Funktion für Geld-System
function testMoneySystem() {
	console.log('=== GELD-SYSTEM TEST ===');
	console.log('Aktuelles Geld:', money);
	console.log('NPC-Bankgeld:', npcBankMoney);
	console.log('Spieler-Bankgeld:', bankMoney);
	
	// Test: Geld hinzufügen
	const testAmount = 100;
	money += testAmount;
	console.log('Nach Test-Geld hinzufügen:', money);
	moneySpan.textContent = `Geld: ${money} €`;
	saveData();
	showMessage(`🧪 TEST: +${testAmount}€ hinzugefügt. Aktuell: ${money}€`, 3000);
}

// Garantierter Bankraub für Testzwecke
function guaranteedRobBank() {
	if (policeAlert) {
		showMessage('Die Polizei ist bereits alarmiert! Flucht ist die einzige Option.', 3000);
		return;
	}
	
	if (npcBankMoney <= 0) {
		showMessage('❌ Die NPC-Bank ist leer! Kein Geld zum Stehlen verfügbar.', 3000);
		return;
	}
	
	const stolenAmount = Math.min(npcBankMoney, 500); // Garantiert 500€ oder weniger
	const oldMoney = money;
	money += stolenAmount;
	npcBankMoney -= stolenAmount;
	wantedLevel += 2;
	
	console.log('Garantiertes Bankraub erfolgreich:', { stolenAmount, oldMoney, newMoney: money });
	
	moneySpan.textContent = `Geld: ${money} €`;
	bankMoneySpan.textContent = `Bank: ${bankMoney} €`;
	saveData();
	
	showMessage(`� GARANTIERTER BANKRAUB! Du hast ${stolenAmount}€ von den NPCs gestohlen!`, 4000);
	showMessage(`💸 Geld erhalten: +${stolenAmount}€`, 2000);
	
	// Polizei-Alarm auslösen
	setTimeout(() => {
		policeAlert = true;
		showMessage('🚔 POLIZEI-ALARM! Die Polizei ist auf dem Weg! Lauf weg!', 5000);
		updateBankRobberyInfo();
		
		// Polizei-Fahrzeuge spawnen
		spawnPoliceCars();
		
		// Fuß-Polizisten spawnen
		spawnFootPolice();
	}, 3000);
}

function hackSecurity() {
	if (securityHacked) {
		showMessage('Das Sicherheitssystem ist bereits gehackt!', 2000);
		return;
	}
	
	const hackChance = 0.6; // 60% Erfolgschance
	const success = Math.random() < hackChance;
	
	if (success) {
		securityHacked = true;
		wantedLevel += 1;
		showMessage('🔓 Sicherheitssystem erfolgreich gehackt! Erfolgschance beim Raub erhöht.', 3000);
	} else {
		wantedLevel += 1;
		showMessage('❌ Hacking fehlgeschlagen! Das System hat dich bemerkt.', 3000);
		damagePlayer(10, 'Hacking');
		
		// Chance auf sofortigen Alarm
		if (Math.random() < 0.3) {
			setTimeout(() => {
				policeAlert = true;
				showMessage('🚔 POLIZEI-ALARM! Dein Hacking-Versuch wurde bemerkt!', 5000);
			}, 2000);
		}
	}
	
	updateBankRobberyInfo();
}

function planEscape() {
	if (!policeAlert) {
		showMessage('Es gibt keinen Grund zur Flucht - die Polizei ist nicht alarmiert.', 2000);
		return;
	}
	
	showMessage('🏃 Du versuchst zu fliehen...', 2000);
	
	// Kurze Verzögerung für Dramatik
	setTimeout(() => {
		const escapeChance = 0.7; // 70% Fluchtchance
		const success = Math.random() < escapeChance;
		
		console.log('Fluchtversuch:', { success, escapeChance, wantedLevel });
		
		if (success) {
			policeAlert = false;
			wantedLevel = Math.max(0, wantedLevel - 1);
			
			// Polizei-Warnung entfernen
			const warning = document.getElementById('policeWarning');
			if (warning) {
				warning.parentNode.removeChild(warning);
			}
			
			// Polizei-Fahrzeuge entfernen
			removePoliceCars();
			
			// Fuß-Polizisten entfernen
			removeFootPolice();
			
			showMessage('✅ FLUCHT ERFOLGREICH! Du hast die Polizei abgehängt.', 4000);
			showMessage('🕊️ Du bist wieder sicher... fürs Erste!', 3000);
		} else {
			// Gefängnis!
			jailTime = Math.floor(Math.random() * 10) + 5; // 5-15 Minuten Gefängnis
			showMessage(`❌ FLUCHT FEHLGESCHLAGEN!`, 3000);
			showMessage(`🚔 DU WURDEST GEFASST!`, 3000);
			showMessage(`⏰ Gefängnis: ${jailTime} Minuten Strafe!`, 5000);
			
			// Gefängnis-Countdown starten
			startJailTime();
		}
		
		updateBankRobberyInfo();
	}, 2000);
}

function createJailInterior() {
	if (jailRoom) return;

	const room = new THREE.Group();
	room.position.set(jailPosition.x, jailPosition.y, jailPosition.z);
	const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x59636d });
	const wallMaterial = new THREE.MeshPhongMaterial({ color: 0x303841 });
	const barMaterial = new THREE.MeshPhongMaterial({ color: 0x9da8b2, metalness: 0.5, roughness: 0.45 });
	const glassMaterial = new THREE.MeshPhongMaterial({ color: 0x91b9d6, transparent: true, opacity: 0.42 });

	for (let floorIndex = 0; floorIndex < 5; floorIndex++) {
		const floorY = floorIndex * jailFloorHeight;
		const floor = new THREE.Mesh(new THREE.BoxGeometry(28, 0.45, 22), floorMaterial);
		floor.position.y = floorY;
		room.add(floor);

		const backWall = new THREE.Mesh(new THREE.BoxGeometry(28, jailFloorHeight, 0.6), wallMaterial);
		backWall.position.set(0, floorY + jailFloorHeight / 2, -11);
		room.add(backWall);
		const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.6, jailFloorHeight, 22), wallMaterial);
		leftWall.position.set(-14, floorY + jailFloorHeight / 2, 0);
		room.add(leftWall);
		const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.6, jailFloorHeight, 22), wallMaterial);
		rightWall.position.set(14, floorY + jailFloorHeight / 2, 0);
		room.add(rightWall);

		const front = new THREE.Mesh(
			new THREE.BoxGeometry(28, jailFloorHeight, 0.4),
			floorIndex === 0 ? glassMaterial : barMaterial
		);
		front.position.set(0, floorY + jailFloorHeight / 2, 11);
		room.add(front);

		if (floorIndex === 0) {
			const receptionDesk = new THREE.Mesh(new THREE.BoxGeometry(10, 2, 2.5), new THREE.MeshPhongMaterial({ color: 0x1e4c70 }));
			receptionDesk.position.set(-5, floorY + 1, -4);
			room.add(receptionDesk);
			const receptionSign = createPrisonLabel('EMPFANG', 7, 1.8);
			receptionSign.position.set(-5, floorY + 5, -9.5);
			room.add(receptionSign);
		} else {
			[-7, 7].forEach(cellX => {
				const divider = new THREE.Mesh(new THREE.BoxGeometry(0.35, 6, 13), barMaterial);
				divider.position.set(cellX, floorY + 3, -3);
				room.add(divider);
				const bed = new THREE.Mesh(new THREE.BoxGeometry(4, 0.5, 2), new THREE.MeshPhongMaterial({ color: 0x71808c }));
				bed.position.set(cellX + (cellX < 0 ? -3 : 3), floorY + 1.3, -5);
				room.add(bed);
			});
			const floorLabel = createPrisonLabel(`ETAGE ${floorIndex} - ZELLEN`, 9, 1.8);
			floorLabel.position.set(0, floorY + 6.5, -9.5);
			room.add(floorLabel);
		}

		const ceilingLight = new THREE.PointLight(0xd8e8ff, 0.75, 26);
		ceilingLight.position.set(0, floorY + 7, 0);
		room.add(ceilingLight);
	}

	const roof = new THREE.Mesh(new THREE.BoxGeometry(28, 0.6, 22), new THREE.MeshPhongMaterial({ color: 0x202830 }));
	roof.position.y = 5 * jailFloorHeight;
	room.add(roof);
	const elevator = new THREE.Mesh(new THREE.BoxGeometry(5, 5 * jailFloorHeight, 5), new THREE.MeshPhongMaterial({ color: 0x4a5662 }));
	elevator.position.set(0, 5 * jailFloorHeight / 2, 5);
	room.add(elevator);
	const elevatorDoor = new THREE.Mesh(new THREE.BoxGeometry(3.5, 5.5, 0.25), new THREE.MeshPhongMaterial({ color: 0xb8c4ce }));
	elevatorDoor.position.set(0, 3, 7.55);
	room.add(elevatorDoor);
	const elevatorLabel = createPrisonLabel('AUFZUG', 6, 1.7);
	elevatorLabel.position.set(0, 7, 7.8);
	room.add(elevatorLabel);
	scene.add(room);
	jailRoom = room;
}

function createPrisonLabel(text, width, height) {
	const canvas = document.createElement('canvas');
	canvas.width = 512;
	canvas.height = 128;
	const context = canvas.getContext('2d');
	context.fillStyle = '#edf4fa';
	context.font = 'bold 48px Arial';
	context.textAlign = 'center';
	context.fillText(text, 256, 78);
	const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true }));
	label.scale.set(width, height, 1);
	return label;
}

function tryOpenPrisonReception() {
	if (isInVehicle || isInJailInterior || rescueEscapeActive) return false;
	const receptionDistance = Math.hypot(
		player.position.x - prisonReceptionPosition.x,
		player.position.z - prisonReceptionPosition.z
	);
	if (receptionDistance > 6) return false;
	selectedPrisoner = null;
	renderPrisonerList();
	prisonReceptionPanel.style.display = 'block';
	return true;
}

function renderPrisonerList() {
	prisonerList.innerHTML = '';
	prisoners.forEach(name => {
		const entry = document.createElement('div');
		entry.className = 'prisonerEntry';
		const nameButton = document.createElement('button');
		nameButton.className = 'prisonerButton';
		nameButton.textContent = name;
		nameButton.addEventListener('click', () => {
			selectedPrisoner = name;
			renderPrisonerList();
		});
		entry.appendChild(nameButton);

		if (selectedPrisoner === name) {
			const rescueButton = document.createElement('button');
			rescueButton.className = 'rescuePrisonerButton';
			rescueButton.textContent = 'Zur Flucht helfen';
			rescueButton.addEventListener('click', () => startPrisonerRescue(name));
			entry.appendChild(rescueButton);
		}
		prisonerList.appendChild(entry);
	});
}

function startPrisonerRescue(name) {
	prisonReceptionPanel.style.display = 'none';
	selectedPrisoner = null;
	rescueEscapeActive = true;
	rescuedPrisoner = createHuman();
	rescuedPrisoner.userData.isRescuedPrisoner = true;
	rescuedPrisoner.userData.name = name;
	const escapePosition = { x: jailPosition.x, z: jailPosition.z - 18 };
	player.position.set(escapePosition.x, 0, escapePosition.z);
	rescuedPrisoner.position.set(escapePosition.x - 3, 0, escapePosition.z - 2);
	scene.add(rescuedPrisoner);

	wantedLevel = 2;
	policeAlert = true;
	policeLoseSightSince = 0;
	updateWantedLevelDisplay();
	updatePoliceChaseTimerDisplay();
	spawnPoliceCars();
	spawnFootPolice();
	showMessage(`${name} folgt dir. Entkommt gemeinsam der Polizei!`, 3500);
}

function updateRescuedPrisoner() {
	if (!rescuedPrisoner || !rescueEscapeActive) return;
	const dx = player.position.x - rescuedPrisoner.position.x;
	const dz = player.position.z - rescuedPrisoner.position.z;
	const distance = Math.hypot(dx, dz);
	if (distance > 2.5) {
		const followSpeed = 0.13;
		rescuedPrisoner.position.x += (dx / distance) * followSpeed;
		rescuedPrisoner.position.z += (dz / distance) * followSpeed;
		rescuedPrisoner.rotation.y = Math.atan2(dx, dz);
		const legs = rescuedPrisoner.children.filter(child => Math.abs(child.position.x) === 0.3);
		if (legs[0]) legs[0].rotation.x = Math.sin(Date.now() * 0.01) * 0.7;
		if (legs[1]) legs[1].rotation.x = -Math.sin(Date.now() * 0.01) * 0.7;
	}
}

function completePrisonerRescue() {
	if (!rescueEscapeActive || !rescuedPrisoner) return;
	const reward = 750;
	money += reward;
	moneySpan.textContent = `Geld: ${money} €`;
	saveData();
	if (rescuedPrisoner.parent) rescuedPrisoner.parent.remove(rescuedPrisoner);
	showMessage(`${rescuedPrisoner.userData.name} ist sicher. Du erhältst ${reward}€ für die Hilfe.`, 4000);
	rescuedPrisoner = null;
	rescueEscapeActive = false;
}

function updatePrisonElevatorMenu() {
	if (!jailRoom) return;
	const elevatorDistance = Math.hypot(player.position.x - jailPosition.x, player.position.z - (jailPosition.z + 5));
	const canUseElevator = isInJailInterior && elevatorDistance < 5;
	prisonElevatorPanel.style.display = canUseElevator ? 'block' : 'none';
	if (!canUseElevator) {
		displayedJailFloor = null;
		return;
	}
	if (displayedJailFloor === currentJailFloor) return;

	prisonFloorButtons.innerHTML = '';
	for (let floorIndex = 0; floorIndex < 5; floorIndex++) {
		if (floorIndex === currentJailFloor) continue;
		const button = document.createElement('button');
		button.className = 'prisonFloorButton';
		button.dataset.floor = floorIndex;
		button.textContent = floorIndex === 0 ? 'Erdgeschoss - Empfang' : `Etage ${floorIndex} - Zellen`;
		prisonFloorButtons.appendChild(button);
	}
	displayedJailFloor = currentJailFloor;
}

prisonFloorButtons.addEventListener('click', event => {
	const floorButton = event.target.closest('.prisonFloorButton');
	if (!floorButton) return;
	currentJailFloor = Number.parseInt(floorButton.dataset.floor, 10);
	displayedJailFloor = null;
	player.position.set(jailPosition.x, currentJailFloor * jailFloorHeight, jailPosition.z + 5);
	showMessage(`Aufzug: ${currentJailFloor === 0 ? 'Erdgeschoss' : `Etage ${currentJailFloor}`}`, 1500);
});

function enterJailInterior() {
	createJailInterior();
	if (isInVehicle) exitVehicle();
	isInMysteryBasement = false;
	currentBuildingIndex = null;
	isInJailInterior = true;
	currentJailFloor = 1;
	displayedJailFloor = null;
	player.position.set(jailPosition.x, currentJailFloor * jailFloorHeight, jailPosition.z + 5);
}

function leaveJailInterior() {
	isInJailInterior = false;
	currentBuildingIndex = null;
	currentJailFloor = 0;
	displayedJailFloor = null;
	player.position.set(jailPosition.x, 0, jailPosition.z + 15);
}

function startJailTime() {
	if (jailInterval) return;
	enterJailInterior();
	showMessage(`🔒 DU BIST IM GEFÄNGNIS! Noch ${jailTime} Minuten.`, 5000);
	
	jailInterval = setInterval(() => {
		jailTime--;
		
		if (jailTime <= 0) {
			clearInterval(jailInterval);
			jailInterval = null;
			leaveJailInterior();
			showMessage('🚪 DU BIST FREI! Gefängnisstrafe beendet.', 4000);
			showMessage('🕊️ Du kannst wieder spielen!', 3000);
			wantedLevel = 0;
			policeAlert = false;
			securityHacked = false;
			playerHealth = 100;
			updateHealthDisplay();
			saveData();
			
			// Gefängnis-Overlay entfernen
			const overlay = document.getElementById('jailOverlay');
			if (overlay) {
				overlay.parentNode.removeChild(overlay);
			}
			
			// Polizei-Fahrzeuge entfernen
			removePoliceCars();
			
			// Fuß-Polizisten entfernen
			removeFootPolice();
		} else {
			showMessage(`⏰ GEFÄNGNIS: Noch ${jailTime} Minuten!`, 2000);
			console.log(`Gefängnis: ${jailTime} Minuten übrig`);
		}
	}, 60000); // Alle 60 Sekunden (1 Spielminute)
}

// Spieler kann während Gefängniszeit nicht handeln
function isPlayerInJail() {
	return jailTime > 0;
}

// NPC-Bank wieder auffüllen (für Testzwecke)
function refillNpcBank() {
	npcBankMoney = 5000;
	saveData();
	updateBankRobberyInfo();
	showMessage('🔄 NPC-Bank wieder auf 5000€ aufgefüllt!', 3000);
	console.log('NPC-Bank refilled to:', npcBankMoney);
}

// Polizei-Alarm manuell auslösen (für Testzwecke)
function triggerPoliceAlert() {
	policeAlert = true;
	updateBankRobberyInfo();
	showMessage('🚔 POLIZEI-ALARM MANUELL AUSGELÖST! Die Polizei sucht dich!', 5000);
	console.log('Police alert manually triggered:', policeAlert);
}

// Polizei-Status anzeigen (für Debug)
function showPoliceStatus() {
	console.log('=== POLIZEI-STATUS ===');
	console.log('Police Alert:', policeAlert);
	console.log('Wanted Level:', wantedLevel);
	console.log('In Jail:', isPlayerInJail());
	console.log('Jail Time:', jailTime);
	
	showMessage(`🚔 Polizei-Status: ${policeAlert ? 'AKTIV' : 'INAKTIV'} | Wanted: ${wantedLevel}`, 3000);
}

// Garantierte Gefängnis-Strafe (für Testzwecke)
function guaranteedJail() {
	if (!policeAlert) {
		showMessage('❌ Kein Polizei-Alarm aktiv! Lasse dich erst suchen.', 3000);
		return;
	}
	
	jailTime = 2; // 2 Minuten Test-Gefängnis
	showMessage('⏰ GARANTIERTES GEFÄNGNIS! 2 Minuten Strafe zum Testen.', 4000);
	startJailTime();
}

// Automatische Polizei-Verfolgung (wenn Wanted-Level hoch)
function checkPoliceChase() {
	if (policeAlert && wantedLevel >= 2) {
		// Chance auf automatische Festnahme nach einiger Zeit
		if (Math.random() < 0.001) { // 0.1% Chance pro Frame
			jailTime = Math.floor(Math.random() * 5) + 3; // 3-8 Minuten
			showMessage('🚔 ÜBERRASCHUNGSFESTNAHME! Die Polizei hat dich erwischt!', 5000);
			startJailTime();
		}
	}
}

function updatePoliceLoseInterest() {
	if (!policeAlert || wantedLevel < 1) {
		policeLoseSightSince = 0;
		updatePoliceChaseTimerDisplay();
		return;
	}

	let nearestPoliceDistance = Infinity;
	for (const car of policeCars) {
		const dx = player.position.x - car.position.x;
		const dz = player.position.z - car.position.z;
		const distance = Math.sqrt(dx * dx + dz * dz);
		if (distance < nearestPoliceDistance) nearestPoliceDistance = distance;
	}
	for (const cop of footPolice) {
		if (!cop.mesh) continue;
		const dx = player.position.x - cop.mesh.position.x;
		const dz = player.position.z - cop.mesh.position.z;
		const distance = Math.sqrt(dx * dx + dz * dz);
		if (distance < nearestPoliceDistance) nearestPoliceDistance = distance;
	}

	const loseSightDistance = 220;
	const loseSightDelay = 30000;

	if (nearestPoliceDistance > loseSightDistance) {
		if (!policeLoseSightSince) {
			policeLoseSightSince = Date.now();
		}
		updatePoliceChaseTimerDisplay();
		if (Date.now() - policeLoseSightSince >= loseSightDelay) {
			wantedLevel = Math.max(0, wantedLevel - 1);
			policeLoseSightSince = 0;
			if (wantedLevel === 0) {
				resetPoliceAlert();
				completePrisonerRescue();
				showMessage('🚓 Die Polizei hat dich aus den Augen verloren.', 3000);
			} else {
				removePoliceCars();
				removeFootPolice();
				updateWantedLevelDisplay();
				updatePoliceChaseTimerDisplay();
				updateBankRobberyInfo();
				showMessage('🚓 Die Polizei hat dich fast verloren. Wanted sinkt.', 2500);
			}
		}
	} else {
		policeLoseSightSince = 0;
		updatePoliceChaseTimerDisplay();
	}
}

// Polizei-Alarm zurücksetzen (für Testzwecke)
function resetPoliceAlert() {
	policeAlert = false;
	policeLoseSightSince = 0;
	policeWarningShownForCurrentAlert = false;
	mysteryBasementPoliceTriggered = false;
	
	// Polizei-Warnung entfernen
	const warning = document.getElementById('policeWarning');
	if (warning) {
		warning.parentNode.removeChild(warning);
	}
	
	// Polizei-Fahrzeuge entfernen
	removePoliceCars();
	
	// Fuß-Polizisten entfernen
	removeFootPolice();
	mysteryPoliceUnits = [];
	
	updateBankRobberyInfo();
	updatePoliceChaseTimerDisplay();
	showMessage('✅ Polizei-Alarm zurückgesetzt', 3000);
	console.log('Police alert reset:', policeAlert);
}

// Polizei-Fahrzeuge entfernen
function removePoliceCars() {
	policeCars.forEach(car => {
		if (car.parent) {
			car.parent.remove(car);
		}
	});
	policeCars = [];
	policeSpawned = false;
}