(function(e){function t(t){for(var i,a,s=t[0],c=t[1],u=t[2],h=0,d=[];h<s.length;h++)a=s[h],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);l&&l(t);while(d.length)d.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],i=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(i=!1)}i&&(r.splice(t--,1),e=a(a.s=n[0]))}return e}var i={},o={app:0},r=[];function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=i,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var l=c;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"13e3":function(e,t,n){},"5c0b":function(e,t,n){"use strict";var i=n("13e3"),o=n.n(i);o.a},cd49:function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var i=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("v-app",{attrs:{theme:"dark"}},[n("router-view"),n("shader-loader"),n("div",{attrs:{id:"renderer"}})],1)],1)},r=[],a=(n("8615"),n("ac6a"),n("d225")),s=n("b0b4"),c=n("308d"),u=n("6bb5"),l=n("4e2b"),h=n("9ab4"),d=n("60a3"),p=(n("ac4d"),n("8a81"),n("2a88")),f=n("5a89"),y=n("b062"),m=function(){function e(){Object(a["a"])(this,e)}return Object(s["a"])(e,[{key:"getMesh",value:function(){if(!this.mesh)throw new Error("No mesh defined");return this.mesh}},{key:"update",value:function(e,t){}}]),e}();m.tag="RenderComponent";var v=function(){function e(){Object(a["a"])(this,e),this.position=new f["F"]}return Object(s["a"])(e,[{key:"getPosition",value:function(){return(new f["F"]).copy(this.position)}},{key:"setPosition",value:function(e){this.position.copy(e)}},{key:"setPositionReference",value:function(e){this.position=e}},{key:"getPositionReference",value:function(){return this.position}}]),e}();v.tag="PositionComponent";var g=n("32d9"),w=n("93e9"),b=n("45b5"),k=n("360d"),O=n("e9d2"),j=n("9ab2"),S=function(e){function t(){return Object(a["a"])(this,t),Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments))}return Object(l["a"])(t,e),t}(m),C=function(e){function t(e){var n;Object(a["a"])(this,t),n=Object(c["a"])(this,Object(u["a"])(t).call(this)),n.scene=new f["w"],n.starScene=new f["w"],n.camera=new f["q"](75,window.innerWidth/window.innerHeight,.1,3e4),n.camera.position.set(.5,20,20),n.camera.lookAt(new f["F"](0,1,0)),n.renderer=new f["H"],n.renderer.setPixelRatio(window.devicePixelRatio),n.renderer.setSize(window.innerWidth,window.innerHeight),n.renderer.autoClear=!1,n.composer=new g["a"](n.renderer),e.appendChild(n.renderer.domElement);var i=new w["a"](n.scene,n.camera);i.clear=!1;var o=new w["a"](n.starScene,n.camera);o.clear=!1;var r=new j["a"](new f["E"](window.innerWidth,window.innerHeight),1.5,.4,.85);r.threshold=0,r.strength=2,r.radius=1;var s=new k["a"](O["a"]);s.renderToScreen=!0;var l=new b["a"];return n.composer.addPass(l),n.composer.addPass(o),n.composer.addPass(r),n.composer.addPass(i),n.composer.addPass(s),window.onresize=function(){n.camera.aspect=window.innerWidth/window.innerHeight,n.camera.updateProjectionMatrix(),n.renderer.setSize(window.innerWidth,window.innerHeight)},n}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"onEntityAdded",value:function(e){if(e.hasComponent(m)){var t=e.getComponent(m);t instanceof S?this.starScene.add(t.getMesh()):this.scene.add(t.getMesh())}}},{key:"onEntityRemoved",value:function(e){e.hasComponent(m)&&(this.scene.remove(e.getComponent(m).getMesh()),this.starScene.remove(e.getComponent(m).getMesh()))}},{key:"onAttach",value:function(e){Object(p["a"])(Object(u["a"])(t.prototype),"onAttach",this).call(this,e),e.addEntityListener(this),this.family=new y["FamilyBuilder"](e).include(m).build()}},{key:"getCamera",value:function(){return this.camera}},{key:"getScene",value:function(){return this.scene}},{key:"getStarScene",value:function(){return this.starScene}},{key:"getRenderer",value:function(){return this.renderer}},{key:"update",value:function(e,t){if(this.family){var n=!0,i=!1,o=void 0;try{for(var r,a=this.family.entities[Symbol.iterator]();!(n=(r=a.next()).done);n=!0){var s=r.value,c=s.getComponent(v),u=s.getComponent(m);u.getMesh().position.copy(c.getPosition()),u.update(t,this.camera)}}catch(l){i=!0,o=l}finally{try{n||null==a.return||a.return()}finally{if(i)throw o}}}this.camera.updateProjectionMatrix(),this.composer.render(t)}}]),t}(y["System"]),P=function(e){function t(){var e;return Object(a["a"])(this,t),e=Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments)),e._name="",e._team=1,e._mass=1e3,e._enginePower=1e3,e}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"mass",get:function(){return this._mass},set:function(e){this._mass=e}},{key:"enginePower",get:function(){return this._enginePower},set:function(e){this._enginePower=e}},{key:"team",get:function(){return this._team},set:function(e){this._team=e}},{key:"name",get:function(){return this._name},set:function(e){this._name=e}}]),t}(y["Entity"]),E=function(){function e(){Object(a["a"])(this,e),this.velocity=new f["F"](0,0,0),this.acceleration=new f["F"](0,0,0)}return Object(s["a"])(e,[{key:"getVelocity",value:function(){return(new f["F"]).copy(this.velocity)}},{key:"setVelocity",value:function(e){this.velocity.copy(e)}},{key:"getAcceleration",value:function(){return(new f["F"]).copy(this.acceleration)}},{key:"setAcceleration",value:function(e){this.acceleration.copy(e)}}]),e}();E.tag="VelocityComponent";var x=function(){function e(){Object(a["a"])(this,e),this.selectionIndicatorObject=null,this.selected=!1}return Object(s["a"])(e,[{key:"select",value:function(){this.selected||(this.selected=!0,this.onSelection())}},{key:"deselect",value:function(){this.selected&&(this.selected=!1,this.onDeselection())}},{key:"isSelected",value:function(){return this.selected}},{key:"onSelection",value:function(){console.log("Generic Selection")}},{key:"onDeselection",value:function(){this.selected=!1,console.log("Generic Deselection")}}]),e}();x.tag="SelectableComponent";var M=function(e){function t(){return Object(a["a"])(this,t),Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments))}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"onSelection",value:function(){console.log("Reporting for Duty!")}},{key:"onDeselection",value:function(){console.log("awwww")}}]),t}(x),_=(n("673e"),function(){function e(){Object(a["a"])(this,e)}return Object(s["a"])(e,[{key:"onEnter",value:function(e){console.log("onEnter FlightComputerAcceleratingState");var t=e.getComponent(D).getTarget(),n=e.getComponent(v).getPosition(),i=e.enginePower/e.mass,o=t.sub(n).normalize().multiplyScalar(i);e.getComponent(E).setAcceleration(o)}},{key:"onExit",value:function(e){console.log("onExit FlightComputerAcceleratingState")}},{key:"update",value:function(e,t){var n=e.getComponent(D).getTarget(),i=e.getComponent(v).getPosition(),o=e.getComponent(E).getVelocity(),r=n.distanceTo(i),a=e.enginePower/e.mass,s=n.sub(i).normalize().multiplyScalar(a),c=o.lengthSq()/(2*s.length());return c>=r?new A:null}},{key:"handleNewTarget",value:function(){return new A}}]),e}()),F=function(){function e(){Object(a["a"])(this,e)}return Object(s["a"])(e,[{key:"onEnter",value:function(e){console.log("onEnter FlightComputerStationaryState")}},{key:"onExit",value:function(e){console.log("onExit FlightComputerStationaryState")}},{key:"update",value:function(e,t){return e.getComponent(D).hasTarget()?new _:null}},{key:"handleNewTarget",value:function(){return new _}}]),e}(),A=function(){function e(){Object(a["a"])(this,e)}return Object(s["a"])(e,[{key:"update",value:function(e,t){var n=e.getComponent(E),i=n.getVelocity();return i.length()<.01?new F:null}},{key:"onEnter",value:function(e){var t=e.getComponent(E),n=t.getVelocity(),i=n.multiplyScalar(-1).normalize();t.setAcceleration(i)}},{key:"onExit",value:function(e){var t=e.getComponent(E);t.setAcceleration(new f["F"](0,0,0));var n=e.getComponent(D);if(n.hasTarget()){var i=n.getTarget(),o=e.getComponent(v).getPosition();o.distanceTo(i)<.1&&n.setTarget(null)}}},{key:"handleNewTarget",value:function(){return null}}]),e}(),D=function(){function e(){Object(a["a"])(this,e),this.target=null,this.state=new A}return Object(s["a"])(e,[{key:"initialise",value:function(e){this.state.onEnter(e),this.entity=e}},{key:"hasTarget",value:function(){return null!==this.target}},{key:"getTarget",value:function(){if(!this.target)throw new Error("Flight Computer has no target");return(new f["F"]).copy(this.target)}},{key:"setTarget",value:function(e){if(null!==e){this.target=(new f["F"]).copy(e);var t=this.state.handleNewTarget();t&&this.setState(t)}else this.target=null}},{key:"update",value:function(e){if(!this.entity)throw new Error("Entity not defined");var t=this.state.update(this.entity,e);t&&this.setState(t)}},{key:"setState",value:function(e){this.state.onExit(this.entity),this.state=e,this.state.onEnter(this.entity)}}]),e}();D.tag="FlightComputerComponent";var T=["Ajax","Albatross","Albrighton","Alert","Ambassador","Amsterdam","Anacreon","Andromeda","Apollo","Arrogant","Arrow","Ascension","Asgard","Assault","Assurance","Astute","Atlantis","Atlas","Attack","Audacity","Austere","Bountiful","Captivity","Centaur","Ceres","Challenger","Chevron","Daedalus","Daring","Defiance","Dependence","Diligence","Diligent","Discovery","Elephant","Endurance","Enterprise","Eruption","Faithful","Farragut","Hercules","Icarus","Illustrious","Impregnable","Impulsive","Indefatigable","Indignant","Indomitable","Infernal","Inscrutable","Integrity","Intrepid","Invincible","Kelvin","Medusa","Meredith","Merlin","Miranda","Mischief","Narcissus","Nautilus","Nemesis","Neptune","Olympus","Opportune","Orion","Orpheus","Orwell","Paladin","Paragon","Pegasus","Peregrine","Powerful","Rapid","Rattlesnake","Regulus","Relentless","Reliance","Repulse","Resistance","Resolute","Scimitar","Scorpion","Sentinel","Sovereign","Spearhead","Spirit","Stratagem","Stubborn","Sturdy","Thor","Tireless","Ultimatum","Unbeaten","Unbending","Unbridled","Unbroken","Undaunted","Unity","Unrivalled","Unruffled","Unshaken","Untiring","Valiant","Valkyrie","Vengeance","Victorious","Victory","Warrior","Warspite"],I=function(){function e(){Object(a["a"])(this,e),this._hull=100,this._shields=100}return Object(s["a"])(e,[{key:"damage",value:function(e){this.shields<e?(e-=this.shields,this.shields=0):this.shields-=e,this.hull-=e}},{key:"hull",get:function(){return this._hull},set:function(e){this._hull=e}},{key:"shields",get:function(){return this._shields},set:function(e){this._shields=e}}]),e}();I.tag="HealthComponent";var L=function(){function e(){Object(a["a"])(this,e),this._weapons=[]}return Object(s["a"])(e,[{key:"weapons",get:function(){return this._weapons},set:function(e){this._weapons=e}}]),e}();L.tag="LoadoutComponent";var B=new i["a"],R=function e(){Object(a["a"])(this,e)},U=function(e){function t(e,n,i,o){var r;return Object(a["a"])(this,t),r=Object(c["a"])(this,Object(u["a"])(t).call(this)),r._damage=e,r._accuracy=n,r._range=i,r._cooldown=o,r.lastFired=0,r}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"canFire",value:function(){return Date.now()-this.lastFired>this.cooldown}},{key:"fire",value:function(e,t){this.lastFired=Date.now();var n=new f["F"](.1*Math.random(),.1*Math.random(),.1*Math.random());if(100*Math.random()<this.accuracy){var i={source:e.getComponent(v).getPosition(),destination:t.getComponent(v).getPosition().add(n),colour:1===e.team?65280:16711680};B.$emit("laser-fired",i);var o=Math.random()*this.damage;t.getComponent(I).damage(o)}else{var r={source:e.getComponent(v).getPosition(),destination:t.getComponent(v).getPosition().add(n.multiplyScalar(20)),colour:1===e.team?65280:16711680};console.log("MISS"),B.$emit("laser-fired",r)}}},{key:"cooldown",get:function(){return this._cooldown},set:function(e){this._cooldown=e}},{key:"damage",get:function(){return this._damage},set:function(e){this._damage=e}},{key:"accuracy",get:function(){return this._accuracy},set:function(e){this._accuracy=e}},{key:"range",get:function(){return this._range},set:function(e){this._range=e}}]),t}(R),N=100,K=.00465047*N,V={mercury:.39*N,venus:.7*N,earth:N,mars:1.524*N,jupiter:5.2*N,saturn:9.6*N,neptune:30.1*N,pluto:39.5*N},W=160,z=.00200399*N*W,G=function(){function e(t,n){Object(a["a"])(this,e),this.renderer=t,this.engine=n,this.id=1}return Object(s["a"])(e,[{key:"createShip",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1?arguments[1]:void 0,n=new P;n.team=e,n.name=T[Math.floor(Math.random()*T.length)],n.putComponent(v),n.putComponent(m),n.putComponent(E),n.putComponent(D).initialise(n),n.putComponent(I),1===e&&n.putComponent(M);var i=16777215;switch(e){case 1:i=65280;break;case 2:i=16711680;break;case 3:i=10066329;break}switch(n.id=this.id,this.id++,t){case"battleship":this.createBattleship(n,i);break;case"battlecruiser":this.createBattlecruiser(n,i);break;case"destroyer":this.createDestroyer(n,i);break}return n}},{key:"createBattleship",value:function(e,t){e.mass=18e3,e.enginePower=1e4;var n=new f["g"](.25,.25,1);n.rotateX(Math.PI/2);var i=new f["o"]({color:t}),o=new f["n"](n,i);e.getComponent(m).mesh=o,e.getComponent(I).hull=1e3;var r=e.putComponent(L),a=new U(50,50,.1*N,1e3);r.weapons.push(a);var s=new U(20,50,.2*N,500);r.weapons.push(s)}},{key:"createBattlecruiser",value:function(e,t){e.mass=12e3,e.enginePower=8e3;var n=new f["c"](.25,.25,1);e.getComponent(I).hull=500;var i=new f["o"]({color:t}),o=new f["n"](n,i);e.getComponent(m).mesh=o;var r=e.putComponent(L),a=new U(50,50,.1*N,1e3);r.weapons.push(a)}},{key:"createDestroyer",value:function(e,t){e.mass=1e3,e.enginePower=1e3;var n=new f["f"](.1,.7,32);n.rotateX(Math.PI/2);var i=new f["o"]({color:t}),o=new f["n"](n,i);e.getComponent(m).mesh=o;var r=e.putComponent(L),a=new U(50,50,.1*N,1e3);r.weapons.push(a)}}]),e}(),H=function(e){function t(){return Object(a["a"])(this,t),Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments))}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"onAttach",value:function(e){Object(p["a"])(Object(u["a"])(t.prototype),"onAttach",this).call(this,e),this.family=new y["FamilyBuilder"](e).include(E).build()}},{key:"update",value:function(e,t){if(this.family){var n=!0,i=!1,o=void 0;try{for(var r,a=this.family.entities[Symbol.iterator]();!(n=(r=a.next()).done);n=!0){var s=r.value,c=s.getComponent(E),u=s.getComponent(v),l=c.getVelocity().add(c.getAcceleration().multiplyScalar(t));l.length()>.1*z&&(l=l.normalize().multiplyScalar(.1*z)),c.setVelocity(l);var h=c.getVelocity().multiplyScalar(t),d=u.getPosition().add(h);u.setPosition(d)}}catch(p){i=!0,o=p}finally{try{n||null==a.return||a.return()}finally{if(i)throw o}}}}}]),t}(y["System"]),Y=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},$=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("script",{attrs:{id:"fragmentShader",type:"x-shader/x-fragment"}},[e._v("\n\t\t\tuniform float time;\n\t\t\tuniform float fogDensity;\n\t\t\tuniform vec3 fogColor;\n\t\t\tuniform sampler2D texture1;\n\t\t\tuniform sampler2D texture2;\n\t\t\tvarying vec2 vUv;\n\t\t\tvoid main( void ) {\n\t\t\t\tvec2 position = - 1.0 + 2.0 * vUv;\n\t\t\t\tvec4 noise = texture2D( texture1, vUv );\n\t\t\t\tvec2 T1 = vUv + vec2( 1.5, - 1.5 ) * time * 0.02;\n\t\t\t\tvec2 T2 = vUv + vec2( - 0.5, 3.0 ) * time * 0.01;\n\t\t\t\tT1.x += noise.x * 2.0;\n\t\t\t\tT1.y += noise.y * 2.0;\n\t\t\t\tT2.x -= noise.y * 0.2;\n\t\t\t\tT2.y += noise.z * 0.2;\n\t\t\t\tfloat p = texture2D( texture1, T1 * 2.0 ).a;\n\t\t\t\tvec4 color = texture2D( texture2, T2 * 2.0 );\n\t\t\t\tvec4 temp = color * ( vec4( p, p, p, p ) * 2.0 ) + ( color * color - 0.1 );\n\t\t\t\tif( temp.r > 1.0 ) { temp.bg += clamp( temp.r - 2.0, 0.0, 100.0 ); }\n\t\t\t\tif( temp.g > 1.0 ) { temp.rb += temp.g - 1.0; }\n\t\t\t\tif( temp.b > 1.0 ) { temp.rg += temp.b - 1.0; }\n\n\t\t\t\ttemp.b -= 0.1;\n\t\t\t\ttemp.r -= 0.1;\n\t\t\t\ttemp.g -= 0.1;\n\t\t\t\tgl_FragColor = temp;\n\t\t\t\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\t\t\t\tconst float LOG2 = 1.442695;\n\t\t\t\tfloat fogFactor = exp2( - fogDensity * fogDensity * 0.1 * LOG2 );\n\t\t\t\tfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n\t\t\t\tgl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n\t\t\t}\n\n        ")]),n("script",{attrs:{id:"vertexShader",type:"x-shader/x-vertex"}},[e._v("\n\t\t\tuniform vec2 uvScale;\n\t\t\tvarying vec2 vUv;\n\t\t\tvoid main()\n\t\t\t{\n\t\t\t\tvUv = uvScale * uv;\n\t\t\t\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\tgl_Position = projectionMatrix * mvPosition;\n\t\t\t}\n\n        ")])])}],X={name:"ShaderLoader"},q=X,J=n("2877"),Q=Object(J["a"])(q,Y,$,!1,null,"36e41560",null),Z=Q.exports,ee=function(e){function t(){return Object(a["a"])(this,t),Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments))}return Object(l["a"])(t,e),t}(y["Entity"]),te=function(e){function t(){return Object(a["a"])(this,t),Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments))}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"update",value:function(e){this.uniforms.time.value+=e}}]),t}(S),ne=function(){function e(t,n){Object(a["a"])(this,e),this.renderer=t,this.engine=n}return Object(s["a"])(e,[{key:"createStar",value:function(e){var t=document.getElementById("vertexShader");if(!t)throw new Error("Could not locate vertexShader");var n=t.textContent||"",i=document.getElementById("fragmentShader");if(!i)throw new Error("Could not locate fragmentShader");var o=i.textContent||"",r=new f["B"],a=new ee;a.putComponent(v),a.putComponent(te);var s=a.getComponent(te);s.uniforms={fogDensity:{value:.45},fogColor:{value:new f["F"](0,0,0)},time:{value:1},uvScale:{value:new f["E"](3,1)},texture1:{value:r.load("textures/lava/cloud.png")},texture2:{value:r.load("textures/lava/lavatile.jpg")}},s.uniforms.texture1.value.wrapS=s.uniforms.texture1.value.wrapT=f["v"],s.uniforms.texture2.value.wrapS=s.uniforms.texture2.value.wrapT=f["v"];var c=new f["y"]({uniforms:s.uniforms,vertexShader:n,fragmentShader:o});return s.mesh=new f["n"](new f["A"](e,30,30,1),c),this.renderer.getStarScene().add(s.getMesh()),s.getMesh().rotation.z=45,this.engine.addEntity(a),a}}]),e}(),ie=n("1355"),oe=function(){function e(){Object(a["a"])(this,e)}return Object(s["a"])(e,null,[{key:"createCircleGeometry",value:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:64,n=new ie["a"],i=[],o=[],r=0;r<=t;r++){var a=r/t*Math.PI*2;i.push(Math.cos(a)*e,0,Math.sin(a)*e),o.push(.5,.5,.5)}return n.setPositions(i),n.setColors(o),n}}]),e}(),re=function(e){function t(e,n){var i;return Object(a["a"])(this,t),i=Object(c["a"])(this,Object(u["a"])(t).call(this)),i.camera=e,i.inputSystem=n,i.velocity=new f["F"](0,0,0),i}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"update",value:function(e,t){var n=this.camera.position.y/10;(this.inputSystem.isKeyPressed("W")||this.inputSystem.isKeyPressed("ArrowUp"))&&(this.velocity.z-=t*n),(this.inputSystem.isKeyPressed("S")||this.inputSystem.isKeyPressed("ArrowDown"))&&(this.velocity.z+=t*n),(this.inputSystem.isKeyPressed("D")||this.inputSystem.isKeyPressed("ArrowRight"))&&(this.velocity.x+=t*n),(this.inputSystem.isKeyPressed("A")||this.inputSystem.isKeyPressed("ArrowLeft"))&&(this.velocity.x-=t*n),this.camera.position.add(this.velocity),this.camera.position.y<.1&&(this.camera.position.y=.1,this.velocity.multiplyScalar(0)),this.velocity.lerp(new f["F"](0,0,0),3*t)}},{key:"onInputEvent",value:function(e,t){"wheel"===e&&this.onMouseWheel(t)}},{key:"onMouseWheel",value:function(e){var t=.005*-e.deltaY*(.01*this.camera.position.y);if(e.deltaY<0){var n=this.inputSystem.planeIntersectionPoint;this.velocity.add(n.sub(this.camera.position).normalize().multiplyScalar(t))}else{var i=this.inputSystem.centerPlaneIntersectionPoint;this.velocity.add(i.sub(this.camera.position).normalize().multiplyScalar(t))}}}]),t}(y["System"]),ae=(n("c5f6"),n("b210")),se=function(){function e(t,n,i){var o=this;Object(a["a"])(this,e),this.renderer=n,this.element=document.createElement("div"),this.element.classList.add(i),this.element.style.pointerEvents="none",this.renderer=n,this.startPoint=new f["E"],this.pointTopLeft=new f["E"],this.pointBottomRight=new f["E"],this.isDown=!1,document.addEventListener("mousedown",function(e){0===e.button&&(o.isDown=!0,o.onSelectStart(e))},!1),document.addEventListener("mousemove",function(e){o.isDown&&o.onSelectMove(e)},!1),document.addEventListener("mouseup",function(e){o.isDown=!1,o.onSelectOver()},!1)}return Object(s["a"])(e,[{key:"onSelectStart",value:function(e){document.body.appendChild(this.element),this.element.style.left=e.clientX+"px",this.element.style.top=e.clientY+"px",this.element.style.width="0px",this.element.style.height="0px",this.startPoint.x=e.clientX,this.startPoint.y=e.clientY}},{key:"onSelectMove",value:function(e){this.pointBottomRight.x=Math.max(this.startPoint.x,e.clientX),this.pointBottomRight.y=Math.max(this.startPoint.y,e.clientY),this.pointTopLeft.x=Math.min(this.startPoint.x,e.clientX),this.pointTopLeft.y=Math.min(this.startPoint.y,e.clientY),this.element.style.left=this.pointTopLeft.x+"px",this.element.style.top=this.pointTopLeft.y+"px",this.element.style.width=this.pointBottomRight.x-this.pointTopLeft.x+"px",this.element.style.height=this.pointBottomRight.y-this.pointTopLeft.y+"px"}},{key:"onSelectOver",value:function(){this.element.parentElement&&this.element.parentElement.removeChild(this.element)}}]),e}(),ce=(n("5df3"),n("f400"),n("4b2f")),ue=function(){function e(){Object(a["a"])(this,e)}return Object(s["a"])(e,null,[{key:"buildDottedMaterial",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.5,o=new ce["a"]({color:e,linewidth:t,dashed:!0,dashScale:n,gapSize:i});return o.defines.USE_DASH="",o.resolution.set(window.innerWidth,window.innerHeight),o}},{key:"buildSolidMaterial",value:function(e,t){var n=new ce["a"]({color:e,linewidth:t,dashed:!1});return n.resolution.set(window.innerWidth,window.innerHeight),n}}]),e}(),le=n("8d86"),he=function(e){function t(){return Object(a["a"])(this,t),Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments))}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"update",value:function(e,n){Object(p["a"])(Object(u["a"])(t.prototype),"update",this).call(this,e,n),this.mesh.rotateY(e);var i=n.position.distanceTo(this.mesh.position);this.mesh.material.linewidth=i<10?5:i<25?3:i<50?2:1}}]),t}(m),de=function(){function e(t){Object(a["a"])(this,e),this.engine=t,this.selectionMarkerMap=new Map}return Object(s["a"])(e,[{key:"onEntityAdded",value:function(e){}},{key:"onEntityRemoved",value:function(e){this.onEntityDeselection(e)}},{key:"onEntitySelection",value:function(e){if(!this.selectionMarkerMap.has(e)){var t=oe.createCircleGeometry(.75),n=ue.buildDottedMaterial(4590,10),i=new le["a"](t,n);i.computeLineDistances(),i.scale.set(1,1,1);var o=new y["Entity"];o.putComponent(v).setPositionReference(e.getComponent(v).getPositionReference()),o.putComponent(he).mesh=i,this.engine.addEntity(o),this.selectionMarkerMap.set(e,o)}}},{key:"onEntityDeselection",value:function(e){var t=this.selectionMarkerMap.get(e);t&&(this.engine.removeEntity(t),this.selectionMarkerMap.delete(e))}}]),e}(),pe=function(e){function t(e,n,i,o){var r;return Object(a["a"])(this,t),r=Object(c["a"])(this,Object(u["a"])(t).call(this)),r.scene=e,r.camera=n,r.renderer=i,r.inputSystem=o,r.selectionGroups={},r}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"onAttach",value:function(e){Object(p["a"])(Object(u["a"])(t.prototype),"onAttach",this).call(this,e),this.family=new y["FamilyBuilder"](e).include(m).build(),this.selectables=new y["FamilyBuilder"](e).include(x).build(),this.selectionBox=new ae["a"](this.camera,this.scene),this.selectionHelper=new se(this.selectionBox,this.renderer,"selectBox"),this.selectionMarkerTracker=new de(e),e.addEntityListener(this.selectionMarkerTracker)}},{key:"update",value:function(e,t){}},{key:"onInputEvent",value:function(e,t){"mousedown"===e&&(this.onMouseClick(t),this.startSelection(t)),"mousemove"===e&&this.onMouseMove(t),"keydown"===e&&this.onKeyDown(t)}},{key:"onEntityAdded",value:function(e){}},{key:"onEntityRemoved",value:function(e){e.hasComponent(x)&&this.deselectEntity(e)}},{key:"onKeyDown",value:function(e){console.log(e.key),isNaN(Number(e.key))||(this.inputSystem.isKeyPressed("Control")?(e.preventDefault(),this.createNewGroup(Number(e.key))):this.selectGroup(Number(e.key)))}},{key:"createNewGroup",value:function(e){this.selectionGroups[e]=this.selectables.entities.filter(function(e){return e.getComponent(x).isSelected()})}},{key:"selectGroup",value:function(e){var t=this;this.unselectAllSelected(),e in this.selectionGroups&&this.selectionGroups[e].forEach(function(e){t.selectEntity(e)})}},{key:"startSelection",value:function(e){this.selectionBox.startPoint.set(e.position.x,e.position.y,.5)}},{key:"onMouseMove",value:function(e){if(this.inputSystem.isMousePressed(0)){this.selectionBox.endPoint.set(e.clientX/window.innerWidth*2-1,-e.clientY/window.innerHeight*2+1,.5);var t=this.selectionBox.select(this.selectionBox.startPoint,this.selectionBox.endPoint),n=!0,i=!1,o=void 0;try{for(var r,a=t[Symbol.iterator]();!(n=(r=a.next()).done);n=!0){var s=r.value,c=!0,u=!1,l=void 0;try{for(var h,d=this.family.entities[Symbol.iterator]();!(c=(h=d.next()).done);c=!0){var p=h.value;if(p.hasComponent(x)){var f=p.getComponent(m);f.getMesh()===s&&this.selectEntity(p)}}}catch(y){u=!0,l=y}finally{try{c||null==d.return||d.return()}finally{if(u)throw l}}}}catch(y){i=!0,o=y}finally{try{n||null==a.return||a.return()}finally{if(i)throw o}}}}},{key:"onMouseClick",value:function(e){if(0===e.button&&(this.inputSystem.isKeyPressed("Shift")||this.unselectAllSelected(),this.family)){var t=e.raycaster.intersectObjects(this.scene.children),n=!0,i=!1,o=void 0;try{for(var r,a=t[Symbol.iterator]();!(n=(r=a.next()).done);n=!0){var s=r.value,c=s.object,u=!0,l=!1,h=void 0;try{for(var d,p=this.family.entities[Symbol.iterator]();!(u=(d=p.next()).done);u=!0){var f=d.value;if(f.hasComponent(x)){var y=f.getComponent(m);y.getMesh()===c&&this.selectEntity(f)}}}catch(v){l=!0,h=v}finally{try{u||null==p.return||p.return()}finally{if(l)throw h}}}}catch(v){i=!0,o=v}finally{try{n||null==a.return||a.return()}finally{if(i)throw o}}}}},{key:"selectEntity",value:function(e){var t=e.getComponent(x);t.isSelected()||this.selectionMarkerTracker.onEntitySelection(e),t.select()}},{key:"deselectEntity",value:function(e){var t=e.getComponent(x);t.deselect(),this.selectionMarkerTracker.onEntityDeselection(e)}},{key:"unselectAllSelected",value:function(){if(this.selectables){var e=!0,t=!1,n=void 0;try{for(var i,o=this.selectables.entities[Symbol.iterator]();!(e=(i=o.next()).done);e=!0){var r=i.value;this.deselectEntity(r)}}catch(a){t=!0,n=a}finally{try{e||null==o.return||o.return()}finally{if(t)throw n}}}}}]),t}(y["System"]),fe=function(e){function t(){return Object(a["a"])(this,t),Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments))}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"onAttach",value:function(e){this.selectables=new y["FamilyBuilder"](e).include(x).build()}},{key:"update",value:function(e,t){}},{key:"onInputEvent",value:function(e,t){"rightclick"===e&&this.onRightClick(t)}},{key:"onRightClick",value:function(e){var t=null;this.selectables.entities.forEach(function(n){var i=n.getComponent(x);if(i.isSelected()&&n.hasComponent(D)){var o=(new f["F"]).copy(e.intersect);if(t){var r=n.getComponent(v).getPosition(),a=t.getComponent(v).getPosition(),s=r.sub(a);o.add(s)}else t=n;var c=n.getComponent(D);c.setTarget(o);var u=new f["A"](.1),l=new f["o"]({color:16711680}),h=new f["n"](u,l);h.position.copy(e.intersect)}})}}]),t}(y["System"]),ye=function(e){function t(){return Object(a["a"])(this,t),Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments))}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"onAttach",value:function(e){this.flightComputerFamily=new y["FamilyBuilder"](e).include(D).build()}},{key:"update",value:function(e,t){this.flightComputerFamily&&this.flightComputerFamily.entities.forEach(function(e){e.getComponent(D).update(t)})}}]),t}(y["System"]),me=new y["Engine"],ve=function(){me=new y["Engine"]},ge=n("f28b"),we=function(e){function t(e,n,i,o,r){var s;return Object(a["a"])(this,t),s=Object(c["a"])(this,Object(u["a"])(t).call(this,e)),s._button=n,s._position=i,s._intersect=o,s._raycaster=r,s}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"raycaster",get:function(){return this._raycaster}},{key:"position",get:function(){return this._position}},{key:"intersect",get:function(){return this._intersect}},{key:"button",get:function(){return this._button}}]),t}(Object(ge["a"])(Event)),be=function(e){function t(e){var n;return Object(a["a"])(this,t),n=Object(c["a"])(this,Object(u["a"])(t).call(this)),n.camera=e,n.plane=new f["r"](new f["F"](0,1,0),0),n.mouse=new f["E"],n.raycaster=new f["u"],n.eventListeners=[],n.keymap={},n.mousemap={},n._planeIntersectionPoint=new f["F"],n._centerPlaneIntersectionPoint=new f["F"],window.addEventListener("contextmenu",function(e){return n.onRightClick(e)}),window.addEventListener("click",function(e){return n.onClick(e)}),window.addEventListener("mousemove",function(e){return n.onMouseMove(e)}),window.addEventListener("wheel",function(e){return n.onWheelEvent(e)}),window.addEventListener("mousedown",function(e){return n.onMouseDown(e)}),window.addEventListener("mouseup",function(e){return n.onMouseUp(e)}),window.addEventListener("keydown",function(e){return n.onKeyDown(e)}),window.addEventListener("keyup",function(e){return n.onKeyUp(e)}),window.onblur=function(){for(var e in n.keymap)n.keymap.hasOwnProperty(e)&&(n.keymap[e]=!1)},window.oncontextmenu=function(){for(var e in n.keymap)n.keymap.hasOwnProperty(e)&&(n.keymap[e]=!1)},n}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"addEventListener",value:function(e){this.eventListeners.push(e)}},{key:"update",value:function(e,t){}},{key:"isKeyPressed",value:function(e){return e=e.toLowerCase(),e in this.keymap&&this.keymap[e]}},{key:"isMousePressed",value:function(e){return e in this.mousemap&&this.mousemap[e]}},{key:"onKeyUp",value:function(e){var t=e.key.toLowerCase();this.keymap[t]=!1,this.dispatch("keyup",e)}},{key:"onKeyDown",value:function(e){var t=e.key.toLowerCase();this.keymap[t]=!0,this.dispatch("keydown",e)}},{key:"onMouseDown",value:function(e){this.recalculatePlaneIntersections(),this.mousemap[e.button]=!0;var t=new we("mousedown",e.button,this.mouse,this._planeIntersectionPoint,this.raycaster);this.dispatch("mousedown",t)}},{key:"onMouseUp",value:function(e){e.preventDefault(),this.recalculatePlaneIntersections(),this.mousemap[e.button]=!1;var t=new we("mouseup",e.button,this.mouse,this._planeIntersectionPoint,this.raycaster);this.dispatch("mouseup",t)}},{key:"onMouseMove",value:function(e){e.preventDefault(),this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-e.clientY/window.innerHeight*2+1,this.dispatch("mousemove",e)}},{key:"onRightClick",value:function(e){e.preventDefault(),this.recalculatePlaneIntersections();var t=new we("rightclick",e.button,this.mouse,this._planeIntersectionPoint,this.raycaster);this.dispatch("rightclick",t)}},{key:"onClick",value:function(e){this.recalculatePlaneIntersections();var t=new we("click",e.button,this.mouse,this._planeIntersectionPoint,this.raycaster);this.dispatch("click",t)}},{key:"onWheelEvent",value:function(e){this.recalculatePlaneIntersections(),this.dispatch("wheel",e)}},{key:"dispatch",value:function(e,t){this.eventListeners.forEach(function(n){n.onInputEvent(e,t)})}},{key:"recalculatePlaneIntersections",value:function(){this.raycaster.setFromCamera(new f["E"](0,0),this.camera),this.raycaster.ray.intersectPlane(this.plane,this._centerPlaneIntersectionPoint),this.raycaster.setFromCamera(this.mouse,this.camera),this.raycaster.ray.intersectPlane(this.plane,this._planeIntersectionPoint)}},{key:"planeIntersectionPoint",get:function(){return this._planeIntersectionPoint},set:function(e){this._planeIntersectionPoint=e}},{key:"centerPlaneIntersectionPoint",get:function(){return this._centerPlaneIntersectionPoint},set:function(e){this._centerPlaneIntersectionPoint=e}}]),t}(y["System"]),ke=(n("6762"),n("2fdb"),function(e){function t(){var e;return Object(a["a"])(this,t),e=Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments)),e.targetTeams={1:[2],2:[1,3],3:[]},e}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"onAttach",value:function(e){this.loadoutFamily=new y["FamilyBuilder"](e).include(L).build()}},{key:"update",value:function(e,t){var n=this;this.loadoutFamily.entities.forEach(function(t){t instanceof P&&n.loadoutFamily.entities.forEach(function(i){i instanceof P&&n.targetTeams[t.team].includes(i.team)&&n.fireWeapons(e,t,i)})})}},{key:"fireWeapons",value:function(e,t,n){var i=t.getComponent(L);i.weapons.forEach(function(e){if(e.canFire()){var i=n.getComponent(v).getPosition(),o=t.getComponent(v).getPosition();o.distanceToSquared(i)<e.range*e.range&&e.fire(t,n)}})}}]),t}(y["System"])),Oe=function(e){function t(){var e;return Object(a["a"])(this,t),e=Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments)),e.firedAt=Date.now(),e.lifetime=100,e}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"isExpired",value:function(){return Date.now()-this.firedAt>this.lifetime}}]),t}(y["Entity"]),je=function(){function e(){Object(a["a"])(this,e)}return Object(s["a"])(e,null,[{key:"create",value:function(e,t,n){var i=new ie["a"];i.setPositions([e.x,e.y,e.z,t.x,t.y,t.z]);var o=ue.buildSolidMaterial(n,5),r=new le["a"](i,o),a=new Oe;return a.putComponent(v),a.putComponent(S).mesh=r,a}}]),e}(),Se=function(e){function t(){var e;return Object(a["a"])(this,t),e=Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments)),e.laserBeams=[],e}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"onAttach",value:function(e){var t=this;B.$on("laser-fired",function(n){var i=je.create(n.source,n.destination,n.colour);t.laserBeams.push(i),e.addEntity(i)})}},{key:"update",value:function(e,t){this.laserBeams.forEach(function(t){t.isExpired()&&e.removeEntity(t)})}}]),t}(y["System"]),Ce=function(e){function t(){return Object(a["a"])(this,t),Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments))}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"onAttach",value:function(e){this.family=new y["FamilyBuilder"](e).include(I).build()}},{key:"update",value:function(e,t){this.family.entities.forEach(function(t){var n=t.getComponent(I);n.hull<0&&e.removeEntity(t)})}}]),t}(y["System"]),Pe=(n("14b9"),function(){function e(){Object(a["a"])(this,e)}return Object(s["a"])(e,null,[{key:"createBackgroundSprite",value:function(e){var t=(new f["B"]).load(e);return t.wrapS=f["v"],t.wrapT=f["v"],t.repeat.x=1.2,t.repeat.y=1.2,t}}]),e}()),Ee=function(e){function t(){return Object(a["a"])(this,t),Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments))}return Object(l["a"])(t,e),Object(s["a"])(t,[{key:"mounted",value:function(){var e=this,t=document.getElementById("renderer");if(!t)throw new Error("Could not find render element");this.engine=me,this.renderer=new C(t),this.engine.addSystem(this.renderer),this.engine.addSystem(new H);for(var n=new G(this.renderer,this.engine),i=0;i<10;i++)for(var o=0;o<10;o++){var r=["battlecruiser","battleship","destroyer"][Math.floor(3*Math.random())],a=n.createShip(1,r);me.addEntity(a),a.getComponent(v).setPosition(new f["F"](15+2*i,10*Math.random()-5,2*o))}for(var s=0;s<50;s++){var c=["battlecruiser","battleship","destroyer"][Math.floor(3*Math.random())],u=n.createShip(2,c);me.addEntity(u),u.getComponent(v).setPosition(new f["F"](-20+s+20*Math.random(),10*Math.random()-5,100+20*Math.random()))}for(var l=0;l<50;l++){var h=["battlecruiser","battleship","destroyer"][Math.floor(3*Math.random())],d=n.createShip(3,h);me.addEntity(d),d.getComponent(v).setPosition(new f["F"](100+l+20*Math.random(),10*Math.random()-5,100+20*Math.random())),d.getComponent(D).setTarget(new f["F"](1e4,0,1e4))}new ne(this.renderer,this.engine).createStar(K);new oe;Object.values(V).forEach(function(t){var n=oe.createCircleGeometry(t,100),i=ue.buildDottedMaterial(16777215,5);e.renderer.getScene().add(new le["a"](n,i))});var p=new be(this.renderer.getCamera());this.engine.addSystem(p),console.log(this.renderer.getRenderer().domElement);var y=new pe(this.renderer.getScene(),this.renderer.getCamera(),this.renderer.getRenderer(),p);this.engine.addSystem(y),p.addEventListener(y),this.engine.addSystem(new ke);var m=new fe;this.engine.addSystem(m),p.addEventListener(m),this.engine.addSystem(new ye);var g=new re(this.renderer.getCamera(),p);p.addEventListener(g);var w=new Se;this.engine.addSystem(w);var b=new Ce;this.engine.addSystem(b),this.engine.addSystem(g);var k=Pe.createBackgroundSprite("textures/stars.png");this.renderer.getStarScene().background=k;var O=new f["d"],j=function t(){e.engine.update(O.getDelta()),requestAnimationFrame(t)};j()}},{key:"beforeDestroy",value:function(){console.log("destroy"),ve()}}]),t}(d["b"]);Ee=h["a"]([Object(d["a"])({components:{ShaderLoader:Z}})],Ee);var xe=Ee,Me=xe,_e=(n("5c0b"),n("6544")),Fe=n.n(_e),Ae=n("7496"),De=Object(J["a"])(Me,o,r,!1,null,null,null),Te=De.exports;Fe()(De,{VApp:Ae["a"]});var Ie=n("8c4f"),Le=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",[n("v-spacer"),n("v-spacer"),n("v-spacer"),n("v-spacer")],1)},Be=[],Re=function(e){function t(){var e;return Object(a["a"])(this,t),e=Object(c["a"])(this,Object(u["a"])(t).apply(this,arguments)),e.entities=[],e}return Object(l["a"])(t,e),t}(d["b"]);Re=h["a"]([d["a"]],Re);var Ue=Re,Ne=Ue,Ke=n("0fd9"),Ve=n("2fa4"),We=Object(J["a"])(Ne,Le,Be,!1,null,"c31b5a60",null),ze=We.exports;Fe()(We,{VRow:Ke["a"],VSpacer:Ve["a"]}),i["a"].use(Ie["a"]);var Ge=new Ie["a"]({mode:"history",base:"",routes:[{path:"/",name:"overview",component:ze}]}),He=n("2f62");i["a"].use(He["a"]);var Ye=new He["a"].Store({state:{selectedShips:[]},mutations:{},actions:{},getters:{selectedShips:function(e){return e.selectedShips}}}),$e=n("9483");Object($e["a"])("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var Xe=n("f309");i["a"].use(Xe["a"]);var qe=new Xe["a"]({icons:{iconfont:"mdi"}});i["a"].config.productionTip=!1,new i["a"]({router:Ge,store:Ye,vuetify:qe,render:function(e){return e(Te)},created:function(){this.$vuetify.theme.dark=!0}}).$mount("#app")}});
//# sourceMappingURL=app.af14d3d4.js.map