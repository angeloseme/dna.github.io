//SPHERE UTILS

function addBasicSphere(radius,color){
  var material= new THREE.MeshBasicMaterial({ color: color,transparent:true,opacity:1 });
	var mesh = new THREE.Mesh( new THREE.SphereGeometry( radius, 50, 50 ), material );
	scene.add(mesh);
	return mesh;
}

function addMeshPhongSphere(radius,color){
	var   material=new THREE.MeshPhongMaterial({ color: color,transparent:true,opacity:1,side: THREE.DoubleSide });
  var mesh = new THREE.Mesh( new THREE.SphereGeometry( radius, 50, 50 ), material );
	scene.add(mesh);
	return mesh;
}

function addGradientShaderSphere(radius,col1,col2){
	var vertexShader = document.getElementById( 'vertexShader' ).textContent;
	var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
	var uniforms = {
		topColor:    { value: new THREE.Color( col1 ) },
		bottomColor: { value: new THREE.Color( col2 ) },
		offset:      { value: 1 },
    exponent:    { value: 1.0 },
		opacity:    { value: 1}
	};
	var material = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, opacity:1,transparent:true,side: THREE.DoubleSide } );
  var mesh = new THREE.Mesh( new THREE.SphereGeometry( radius, 50, 50 ), material );
	scene.add(mesh);
	return mesh;
}

//MATH UTILS
function clamp(val, minV,maxV){
  return Math.min(maxV,Math.max(minV,val));
}


//LOADING

function loadOBJ(path, callback){
  loader = new THREE.OBJLoader();
  loader.load( path , function( geom) {
  	geom.traverse( function ( child ) {
  		if ( child instanceof THREE.Mesh ) {
  		  var tgeom = new THREE.Geometry().fromBufferGeometry( child.geometry);
        callback(tgeom);
        return;
      }
    });
  });
}
