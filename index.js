
var stats;

var camera, controls, scene, renderer, raycaster;

init();
animate();

function useAccel() {
	var nav = navigator.userAgent;
	var mobile = false;
	['Android', 'Mobile'].forEach(function(word) {
		if (nav.indexOf(word) != -1) {
			mobile = true;
		}
	})
	return mobile;
}

function init() {

	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setClearColor( 0x000000, 0 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	var pointLight = new THREE.PointLight( 0xffffff, 1.5 );
					pointLight.position.set( 0, 7, 0 );
	scene.add( pointLight );

	document.getElementById('container').appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 0.5;

  controls = new THREE.DeviceOrientationControls( camera );

	if (useAccel()) {
		controls = new THREE.DeviceOrientationControls(camera);
		setupTapRec();
	} else {
		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.enableDamping = true;
		controls.dampingFactor = 0.25;
		setupClickRec();
	}
	//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
	controls.enableZoom = false;
	controls.enablePan = false;

	raycaster = new THREE.Raycaster();

	// world

	createSkybox();
	createContent();
	// addGalleryImage('viet.jpg', 180);
	createText();

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

var frame = 0;
function animate() {
	frame++;
	requestAnimationFrame( animate );

	controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true

	camera.updateMatrixWorld();
	raycaster.setFromCamera( new THREE.Vector2(0,0), camera );
	var intersects = raycaster.intersectObjects( scene.children ).map(function(p)
  {return p.object}).filter(function(obj) {return !!obj.selectable});
	var obj = intersects.length ? intersects[0] : null;
	setSelectedObject(obj);

	render();

}

var _selectedObject = null;
var _selectionBackground = null;

function setSelectedObject(obj){
	if (obj !== _selectedObject) {
		if (_selectionBackground) scene.remove(_selectionBackground)
		_selectedObject = obj;
		if (_selectedObject) {
			_selectionBackground = createSelectionBackgroundFromObject(obj);
			scene.add(_selectionBackground);
		}
	}
}

function createSelectionBackgroundFromObject(obj) {
 	var geometry = new THREE.PlaneGeometry( 2, 1.76);
 	var material = new THREE.MeshBasicMaterial( {color: 0x111111, side: THREE.DoubleSide} );
	var mesh = new THREE.Mesh(geometry, material);
	// var pos = THREE.Vector3.setFromMatrixPosition( obj.matrixWorld )
	// mesh.position.copy(pos);
	mesh.position.setFromMatrixPosition(obj.matrixWorld);
	mesh.rotation.set(obj.rotation.x, obj.rotation.y, obj.rotation.z);
	mesh.translateZ(-1);
	mesh.scale.set(1.3, 1.3, 1.3);
	return mesh;
}

function render() {
	var time = frame/60;
	renderer.render( scene, camera );

}



function createSkybox() {
	var r = "cube/portfolio/";
	var ext = '.jpg';
	var urls = [ r + "px" + ext, r + "nx" + ext,
				 r + "py" + ext, r + "ny" + ext,
				 r + "pz" + ext, r + "nz" + ext ];
	textureCube = new THREE.CubeTextureLoader().load( urls );
	textureCube.format = THREE.RGBFormat;
	textureCube.mapping = THREE.CubeReflectionMapping;
	var textureLoader = new THREE.TextureLoader();

	var cubeShader = THREE.ShaderLib[ "cube" ];
	var cubeMaterial = new THREE.ShaderMaterial( {
		fragmentShader: cubeShader.fragmentShader,
		vertexShader: cubeShader.vertexShader,
		uniforms: cubeShader.uniforms,
		depthWrite: false,
		side: THREE.BackSide
	} );
	cubeMaterial.uniforms[ "tCube" ].value = textureCube;

	var geo = new THREE.BoxGeometry( 100, 100, 100 )
	cubeMesh = new THREE.Mesh( geo, cubeMaterial );
	scene.add( cubeMesh );

}

function addGalleryImage(url, angle, vertAngle, link) {
	var loader = new THREE.TextureLoader();

	// load a resource
	loader.load(
		// resource URL
		url,
		// Function when resource is loaded
		function ( texture ) {
			// do something with the texture
			var material = new THREE.MeshBasicMaterial( {
				map: texture,
				side: THREE.DoubleSide,
				transparent: true,

			 } );
		 	var geometry = new THREE.PlaneGeometry( 2, 1.76);
// 		 	var material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
		 	var plane = new THREE.Mesh( geometry, material );
		 	plane.rotateY(angle * Math.PI / 180);
			plane.rotateX(vertAngle * Math.PI / 180);
			// plane.rotateZ((Math.random() - 0.5) * 2 * Math.PI * 2 * 0.1)
		 	plane.translateZ(-5);
		 	scene.add( plane );
			plane.selectable = true;
			plane.link = link
		},
		// Function called when download progresses
		function ( xhr ) {

		},
		// Function called when download errors
		function ( xhr ) {
			console.log('error')
		}
	);
}

function createText() {
	var loader = new THREE.FontLoader();
	loader.load('droid_serif_regular.typeface.js', function ( font ) {
		var material = new THREE.MultiMaterial( [
							new THREE.MeshPhongMaterial( { color: 0xffa700, shading: THREE.FlatShading } ), // front
							new THREE.MeshPhongMaterial( { color: 0xffa700, shading: THREE.SmoothShading } ) // side
						] );
		["KEVIN", "CADENA"].forEach(function(text, i) {
			var textGeo = new THREE.TextGeometry(text, {
								font: font,
								size: 0.5,
								height: 0.3,
								material: 0
							});
			textGeo.computeBoundingBox();
			var width = textGeo.boundingBox.max.x - textGeo.boundingBox.min.x;
			var height = textGeo.boundingBox.max.y - textGeo.boundingBox.min.y;
			// var material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
			var mesh = new THREE.Mesh(textGeo, material);
			mesh.translateX(-width/2)
			mesh.translateY(0.6 - i*0.6 - height/4);
			mesh.translateZ(-4);
			scene.add(mesh);
		});

				["is a Graphic Designer & Artist", "Move your phone around ", "to see the projects"].forEach(function(text, i) {
			var textGeo = new THREE.TextGeometry(text, {
								font: font,
								size: 0.2,
								height: 0.2,
								material: 0
							});
			textGeo.computeBoundingBox();
			var width = textGeo.boundingBox.max.x - textGeo.boundingBox.min.x;
			var height = textGeo.boundingBox.max.y - textGeo.boundingBox.min.y;
			// var material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
			var mesh = new THREE.Mesh(textGeo, material);
			mesh.translateX(-width/2)
			mesh.translateY(0.6 - i*0.5 - height * 4);
			mesh.translateZ(-4);
			scene.add(mesh);
		});


	});
}



function _data_callback(data) {
	var items = data.sections[0];
	items = items.slice(1)
	for (var i=0; i<items.length; i++) {
		var item = items[i];
		var row = i % 2;
		var col = Math.ceil(i/2);
		var nCols = Math.ceil(items.length/2);
		var url = item.style.split('(')[1].split(')')[0];
		var stride = 360 / nCols;
		addGalleryImage(url, (col + row / 2) * stride, row * 40 - 20, item.url);
	}
}

function setupTapRec() {
	var pos = {x: 0, y: 0};
	var cancelTap = false;
	document.getElementById('container').addEventListener('touchstart', function(e) {
		pos = {x: e.touches[0].pageX, y: e.touches[0].pageY};
		cancelTap = false;
	})
	document.getElementById('container').addEventListener('touchmove', function(e) {
		if (Math.abs(pos.x - e.touches[0].pageX) > 3 || Math.abs(pos.y - e.touches[0].pageY) > 3) {
			cancelTap = true;
		}
		pos = {x: e.touches[0].pageX, y: e.touches[0].pageY};
	})
	document.getElementById('container').addEventListener('touchend', function(e) {
		if (!cancelTap) {
			tapped();
		}
	})
}

function setupClickRec() {
	var cancelled = false;
	document.getElementById('container').addEventListener('mousedown', function(e) {
		cancelled = false;
	});
	document.getElementById('container').addEventListener('mousemove', function(e) {
		cancelled = true;
	});
	document.getElementById('container').addEventListener('mouseup', function(e) {
		if (!cancelled) tapped()
	})
}

function tapped() {
	if (_selectedObject && _selectedObject.link) {
  	var lightbox = lity();
  	lightbox(_selectedObject.link);

	}
}

screen.orientation.lock( 'portrait' );

function createContent() {
	addGalleryImage('img/ARC.png', 15, 30, 'mpages/ARC/index.html')
	addGalleryImage('img/CVR.png', 70, -30, 'mpages/CV/index.html')
	addGalleryImage('img/CRT.png', -40, 15, 'mpages/CRT/index.html')
	addGalleryImage('img/BMBR.png', -70, 30, 'mpages/BMB/index.html')
	addGalleryImage('img/DZR.png', -160, 25, 'mpages/DZ/index.html')
	addGalleryImage('img/FCMR.png', 180, -25, 'mpages/FCMR/index.html')
	addGalleryImage('img/H@BR.png', -40, -20, 'mpages/HAB/index.html')
	addGalleryImage('img/HMR.png', -90, 0, 'mpages/HM/index.html')
	addGalleryImage('img/MblIRR.png', 40, 0, 'mpages/MIR/index.html')
	addGalleryImage('img/MFR.png', 65, 85, 'mpages/MF/index.html')
	addGalleryImage('img/obweb.png', -110, -30, 'mpages/OBW/index.html')
	addGalleryImage('img/POSR.png', 60, 30, 'mpages/PS/index.html')
	addGalleryImage('img/RWCR.png', 160, 20, 'mpages/RWC/index.html')
	addGalleryImage('img/SMSR.png', 110, 20, 'mpages/SMS/index.html')
	addGalleryImage('img/QR.png', 120, -20, 'mpages/RQ/index.html')
}

