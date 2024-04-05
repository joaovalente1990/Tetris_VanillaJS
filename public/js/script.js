
var status; 
var current_piece, last_piece;
var counter;
var divContent, divNext;
var arr_alturas;
var altura_max, altura_min, altura;
var menuMainIsShown, menuPlayAgainIsShown;
var animationCounter;
var line;
var lines, total_lines;
var render, stop, timeout;
var level;
var speed, duration;
var hole, hole_col, len_hole;
var left, dir;
var dropped; //rotated;
var down_line;
var score;
var levelUp;
var paused;
var rotationCenterCol, rotationCenterLine, pos_line;
var upRot_flag;
var notAllowedCondition;
var rotationIsAllowed, afterRotationHeight;
var hdiv;


const n_lines = 20, n_cols = 10;
const n_levels = 29;

status = 0;
current_piece = {id:undefined, type:undefined, x:undefined, y:undefined, stopped:undefined, moveAllowedEsq:undefined, moveAllowedDir:undefined, moveAllowedDown:undefined, col:undefined, width:undefined, height:undefined};
last_piece = {id:undefined, type:undefined, x:undefined, y:undefined, stopped:undefined, moveAllowedEsq:undefined, moveAllowedDir:undefined, moveAllowedDown:undefined, col:undefined, width:undefined, height:undefined};
next_piece = {id:undefined, type:undefined, col:undefined, width:undefined};

menuMainIsShown = true;
menuPlayAgainIsShown = false;

speed = [];

for(let lvl=1; lvl<=n_levels; lvl++){
	speed.push(300 - 10*(lvl-1));
}

function setPos(piece, x, y) {

	var element = document.getElementById(piece.id);

	element.style.position = "absolute";
	element.style['margin-left'] = x+"px";
	element.style['margin-top'] = y+"px";
	element.style['z-index'] = 1;

	piece.x = x;
	piece.y = y;
	
}

function redraw(){


	duration = speed[level-1];
	console.log("counter: "+ counter);
	line=counter+1;

	document.getElementById("levelDisplay").innerHTML = ""+level;

    
    if(status==1 && !paused){

		if(!current_piece.stopped){
			
			render = true;
			stop = false;
			timeout = false;


			if(counter == 0 && !upRot_flag){

				current_piece.type = Math.floor(Math.random()*18);


				switch(current_piece.type){
					case 0: divContent = "<div class='tt0-a rect cyan'></div><div class='tt0-b rect cyan'></div><div class='tt0-c rect cyan'></div><div class='tt0-d rect cyan'></div>"; //TetriminoCyanHorizontal
							break;
					case 1: divContent = "<div class='tt1-a rect magenta'></div><div class='tt1-b rect magenta'></div><div class='tt1-c rect magenta'></div><div class='tt1-d rect magenta'></div>";//TetriminoMagentaUp
							break;
					case 2: divContent = "<div class='tt2-a rect orange'></div><div class='tt2-b rect orange'></div><div class='tt2-c rect orange'></div><div class='tt2-d rect orange'></div>";//TetriminoOrangeRight
							break;
					case 3: divContent = "<div class='tt3-a rect blue'></div><div class='tt3-b rect blue'></div><div class='tt3-c rect blue'></div><div class='tt3-d rect blue'></div>"; //TetriminoBlueLeft
							break;
					case 4: divContent = "<div class='tt4-a rect yellow'></div><div class='tt4-b rect yellow'></div><div class='tt4-c rect yellow'></div><div class='tt4-d rect yellow'></div>"; //TetriminoYellow
							break;
					case 5: divContent = "<div class='tt5-a rect green'></div><div class='tt5-b rect green'></div><div class='tt5-c rect green'></div><div class='tt5-d rect green'></div>"; //TetriminoGreenVertical
							break;
					case 6: divContent = "<div class='tt6-a rect magenta'></div><div class='tt6-b rect magenta'></div><div class='tt6-c rect magenta'></div><div class='tt6-d rect magenta'></div>"; //TetriminoMagentaRight
							break;
					case 7: divContent = "<div class='tt7-a rect red'></div><div class='tt7-b rect red'></div><div class='tt7-c rect red'></div><div class='tt7-d rect red'></div>"; //TetriminoRedHorizontal
							break;
					case 8: divContent = "<div class='tt8-a rect cyan'></div><div class='tt8-b rect cyan'></div><div class='tt8-c rect cyan'></div><div class='tt8-d rect cyan'></div>"; //TetriminoCyanVertical
							break;
					case 9: divContent = "<div class='tt9-a rect orange'></div><div class='tt9-b rect orange'></div><div class='tt9-c rect orange'></div><div class='tt9-d rect orange'></div>"; //TetriminoOrangeLeft
							break;
					case 10: divContent = "<div class='tt10-a rect blue'></div><div class='tt10-b rect blue'></div><div class='tt10-c rect blue'></div><div class='tt10-d rect blue'></div>"; //TetriminoBlueRight
							break;
					case 11: divContent = "<div class='tt11-a rect magenta'></div><div class='tt11-b rect magenta'></div><div class='tt11-c rect magenta'></div><div class='tt11-d rect magenta'></div>"; //TetriminoMagentaDown
							break;
					case 12: divContent = "<div class='tt12-a rect magenta'></div><div class='tt12-b rect magenta'></div><div class='tt12-c rect magenta'></div><div class='tt12-d rect magenta'></div>"; //TetriminoMagentaLeft
							break;
					case 13: divContent = "<div class='tt13-a rect blue'></div><div class='tt13-b rect blue'></div><div class='tt13-c rect blue'></div><div class='tt13-d rect blue'></div>"; //TetriminoBlueUp
							break;
					case 14: divContent = "<div class='tt14-a rect blue'></div><div class='tt14-b rect blue'></div><div class='tt14-c rect blue'></div><div class='tt14-d rect blue'></div>"; //TetriminoBlueDown
							break;
					case 15: divContent = "<div class='tt15-a rect red'></div><div class='tt15-b rect red'></div><div class='tt15-c rect red'></div><div class='tt15-d rect red'></div>"; //TetriminoRedVertical
							break;
					case 16: divContent = "<div class='tt16-a rect green'></div><div class='tt16-b rect green'></div><div class='tt16-c rect green'></div><div class='tt16-d rect green'></div>"; //TetriminoGreenHorizontal
							break;
					case 17: divContent = "<div class='tt17-a rect orange'></div><div class='tt17-b rect orange'></div><div class='tt17-c rect orange'></div><div class='tt17-d rect orange'></div>"; //TetriminoOrangeUp
							break;
					case 18: divContent = "<div class='tt18-a rect orange'></div><div class='tt18-b rect orange'></div><div class='tt18-c rect orange'></div><div class='tt18-d rect orange'></div>"; //TetriminoOrangeDown
							break;
				}

				next_piece.type = Math.floor(Math.random()*18);
				setWidth(next_piece);

				switch(next_piece.type){
					case 0: divNext = "<div class='tt0-a rect cyan'></div><div class='tt0-b rect cyan'></div><div class='tt0-c rect cyan'></div><div class='tt0-d rect cyan'></div>"; //TetriminoCyanHorizontal
							break;
					case 1: divNext = "<div class='tt1-a rect magenta'></div><div class='tt1-b rect magenta'></div><div class='tt1-c rect magenta'></div><div class='tt1-d rect magenta'></div>";//TetriminoMagentaUp
							break;
					case 2: divNext = "<div class='tt2-a rect orange'></div><div class='tt2-b rect orange'></div><div class='tt2-c rect orange'></div><div class='tt2-d rect orange'></div>";//TetriminoOrangeRight
							break;
					case 3: divNext = "<div class='tt3-a rect blue'></div><div class='tt3-b rect blue'></div><div class='tt3-c rect blue'></div><div class='tt3-d rect blue'></div>"; //TetriminoBlueLeft
							break;
					case 4: divNext = "<div class='tt4-a rect yellow'></div><div class='tt4-b rect yellow'></div><div class='tt4-c rect yellow'></div><div class='tt4-d rect yellow'></div>"; //TetriminoYellow
							break;
					case 5: divNext = "<div class='tt5-a rect green'></div><div class='tt5-b rect green'></div><div class='tt5-c rect green'></div><div class='tt5-d rect green'></div>"; //TetriminoGreenVertical
							break;
					case 6: divNext = "<div class='tt6-a rect magenta'></div><div class='tt6-b rect magenta'></div><div class='tt6-c rect magenta'></div><div class='tt6-d rect magenta'></div>"; //TetriminoMagentaRight
							break;
					case 7: divNext = "<div class='tt7-a rect red'></div><div class='tt7-b rect red'></div><div class='tt7-c rect red'></div><div class='tt7-d rect red'></div>"; //TetriminoRedHorizontal
							break;
					case 8: divNext = "<div class='tt8-a rect cyan'></div><div class='tt8-b rect cyan'></div><div class='tt8-c rect cyan'></div><div class='tt8-d rect cyan'></div>"; //TetriminoCyanVertical
							break;
					case 9: divNext = "<div class='tt9-a rect orange'></div><div class='tt9-b rect orange'></div><div class='tt9-c rect orange'></div><div class='tt9-d rect orange'></div>"; //TetriminoOrangeLeft
							break;
					case 10: divNext = "<div class='tt10-a rect blue'></div><div class='tt10-b rect blue'></div><div class='tt10-c rect blue'></div><div class='tt10-d rect blue'></div>"; //TetriminoBlueRight
							break;
					case 11: divNext = "<div class='tt11-a rect magenta'></div><div class='tt11-b rect magenta'></div><div class='tt11-c rect magenta'></div><div class='tt11-d rect magenta'></div>"; //TetriminoMagentaDown
							break;
					case 12: divNext = "<div class='tt12-a rect magenta'></div><div class='tt12-b rect magenta'></div><div class='tt12-c rect magenta'></div><div class='tt12-d rect magenta'></div>"; //TetriminoMagentaLeft
							break;
					case 13: divNext = "<div class='tt13-a rect blue'></div><div class='tt13-b rect blue'></div><div class='tt13-c rect blue'></div><div class='tt13-d rect blue'></div>"; //TetriminoBlueUp
							break;
					case 14: divNext = "<div class='tt14-a rect blue'></div><div class='tt14-b rect blue'></div><div class='tt14-c rect blue'></div><div class='tt14-d rect blue'></div>"; //TetriminoBlueDown
							break;
					case 15: divNext = "<div class='tt15-a rect red'></div><div class='tt15-b rect red'></div><div class='tt15-c rect red'></div><div class='tt15-d rect red'></div>"; //TetriminoRedVertical
							break;
					case 16: divNext = "<div class='tt16-a rect green'></div><div class='tt16-b rect green'></div><div class='tt16-c rect green'></div><div class='tt16-d rect green'></div>"; //TetriminoGreenHorizontal
							break;
					case 17: divNext = "<div class='tt17-a rect orange'></div><div class='tt17-b rect orange'></div><div class='tt17-c rect orange'></div><div class='tt17-d rect orange'></div>"; //TetriminoOrangeUp
							break;
					case 18: divNext = "<div class='tt18-a rect orange'></div><div class='tt18-b rect orange'></div><div class='tt18-c rect orange'></div><div class='tt18-d rect orange'></div>"; //TetriminoOrangeDown
							break;
				}


				var next = document.createElement("DIV");
			
				next.setAttribute("id", "N"+next_piece.id);
			

				next.innerHTML = divNext;

				document.getElementById("nextDisplay").appendChild(next);


				switch(next_piece.type){

					

					case 0: next.style.position="absolute";
					        next.style['margin-left'] = "-173px";
					        next.style['margin-top'] = "-170px";
							break;

					case 1: next.style.position="absolute";
					        next.style['margin-left'] = "-103px";
					        next.style['margin-top'] = "-160px";
							break;

					case 2: next.style.position="absolute";
					        next.style['margin-left'] = "-50px";
					        next.style['margin-top'] = "-160px";
							break;

					case 3: next.style.position="absolute";
					        next.style['margin-left'] = "-47px";
					        next.style['margin-top'] = "-160px";
							break;

					case 4: next.style.position="absolute";
					        next.style['margin-left'] = "-60px";
					        next.style['margin-top'] = "-155px";
							break;

					case 5: next.style.position="absolute";
					        next.style['margin-left'] = "-62px";
					        next.style['margin-top'] = "-140px";
							break;

					case 6: next.style.position="absolute";
					        next.style['margin-left'] = "-115px";
					        next.style['margin-top'] = "-142px";
							break;

					case 7: next.style.position="absolute";
					        next.style['margin-left'] = "-48px";
					        next.style['margin-top'] = "-125px";
							break;

					case 8: next.style.position="absolute";
					        next.style['margin-left'] = "-102px";
					        next.style['margin-top'] = "-128px";
							break;

					case 9: next.style.position="absolute";
					        next.style['margin-left'] = "-47px";
					        next.style['margin-top'] = "-185px";
							break;

					case 10: next.style.position="absolute";
					        next.style['margin-left'] = "-47px";
					        next.style['margin-top'] = "-185px";
							break;

					case 11: next.style.position="absolute";
					        next.style['margin-left'] = "-102px";
					        next.style['margin-top'] = "-185px";
							break;

					case 12: next.style.position="absolute";
					        next.style['margin-left'] = "-92px";
					        next.style['margin-top'] = "-142px";
							break;

					case 13: next.style.position="absolute";
					        next.style['margin-left'] = "-115px";
					        next.style['margin-top'] = "-140px";
							break;

					case 14: next.style.position="absolute";
					        next.style['margin-left'] = "-88px";
					        next.style['margin-top'] = "-142px";
							break;

					case 15: next.style.position="absolute";
					        next.style['margin-left'] = "-62px";
					        next.style['margin-top'] = "-142px";
							break;

					case 16: next.style.position="absolute";
					        next.style['margin-left'] = "-75px";
					        next.style['margin-top'] = "-155px";
							break;

					case 17: next.style.position="absolute";
					        next.style['margin-left'] = "-87px";
					        next.style['margin-top'] = "-140px";
							break;

					case 18: next.style.position="absolute";
					        next.style['margin-left'] = "-115px";
					        next.style['margin-top'] = "-140px";
							break;
							
					
										
				}

				

				switch(next_piece.type) {
					case 0:  next_piece.col = Math.floor(Math.random()*6);
							 break;
					case 1:  case 2: case 3: case 7: case 9: case 10: case 11: case 16: next_piece.col = Math.floor(Math.random()*7);
							 break;
					case 4: case 5: case 6: case 12: case 13: case 14: case 15: case 17: case 18: next_piece.col = Math.floor(Math.random()*8);
							 break;
					case 8: next_piece.col = Math.floor(Math.random()*9);
							 break;
				}

				
			setPosX(current_piece.col);
		    setWidth(current_piece);
		    setHeight(current_piece.type);

			var div = document.createElement("DIV");
			
			div.setAttribute("id", ""+current_piece.id);
			

			div.innerHTML = divContent;

			document.getElementById("divMain").appendChild(div);

			dropped = false;
			hole = false;
			len_hole = 0;
			rotationCenterCol = current_piece.col;
			pos_line = 0;
			rotationCenterLine = pos_line;
			
			}



			setPosY(counter);

			

			if(dir) orientation = 1;
			else orientation = -1;

						
			if(hole) {
				setAlturaMax(hole, hole_col, orientation);
			}
			 else {
				setAlturaMax();	
			}
			setAltura(altura_max);
			

			console.log(current_piece);
			setPos(current_piece, current_piece.x, current_piece.y);
			

			switch(current_piece.type){
				case 0: switch(altura){
							case 0: if(counter == 19){
										current_piece.stopped = true;
									}
									break;
							case 1: if(counter == 18){
										current_piece.stopped = true;
									}
									break;
							case 2: if(counter == 17){
										current_piece.stopped = true;
									}
									break;
							case 3: if(counter == 16){
										current_piece.stopped = true;
									}
									break;
							case 4: if(counter == 15){
										current_piece.stopped = true;
									}
									break;
							case 5: if(counter == 14){
										current_piece.stopped = true;
									}
									break;
							case 6: if(counter == 13){
										current_piece.stopped = true;
									}
									break;
							case 7: if(counter == 12){
										current_piece.stopped = true;
									}
									break;
							case 8: if(counter == 11){
										current_piece.stopped = true;
									}
									break;
							case 9: if(counter == 10){
										current_piece.stopped = true;
									}
									break;
							case 10: if(counter == 9){
										current_piece.stopped = true;
									}
									break;
							case 11: if(counter == 8){
										current_piece.stopped = true;
									}
									break;
							case 12: if(counter == 7){
										current_piece.stopped = true;
									}
									break;
							case 13: if(counter == 6){
										current_piece.stopped = true;
									}
									break;
							case 14: if(counter == 5){
										current_piece.stopped = true;
									}
									break;
							case 15: if(counter == 4){
										current_piece.stopped = true;
									}
									break;
							case 16: if(counter == 3){
										current_piece.stopped = true;
									}
									break;
							case 17: if(counter == 2){
										current_piece.stopped = true;
									}
									break;
							case 18: if(counter == 1){
										current_piece.stopped = true;
									}
									break;
							case 19: if(counter == 0){
										current_piece.stopped = true;
									}
									break;
						}
						break;

				case 1: case 2: case 3: case 4: case 7: case 9: case 10: case 11: case 16: 

						switch(altura){

							case 0: if(counter == 18){
										current_piece.stopped = true;
									}
									break;
							case 1: if(counter == 17){
										current_piece.stopped = true;
									}
									break;
							case 2: if(counter == 16){
										current_piece.stopped = true;
									}
									break;
							case 3: if(counter == 15){
										current_piece.stopped = true;
									}
									break;
							case 4: if(counter == 14){
										current_piece.stopped = true;
									}
									break;
							case 5: if(counter == 13){
										current_piece.stopped = true;
									}
									break;
							case 6: if(counter == 12){
										current_piece.stopped = true;
									}
									break;
							case 7: if(counter == 11){
										current_piece.stopped = true;
									}
									break;
							case 8: if(counter == 10){
										current_piece.stopped = true;
									}
									break;
							case 9: if(counter == 9){
										current_piece.stopped = true;
									}
									break;
							case 10: if(counter == 8){
										current_piece.stopped = true;
									}
									break;
							case 11: if(counter == 7){
										current_piece.stopped = true;
									}
									break;
							case 12: if(counter == 6){
										current_piece.stopped = true;
									}
									break;
							case 13: if(counter == 5){
										current_piece.stopped = true;
									}
									break;
							case 14: if(counter == 4){
										current_piece.stopped = true;
									}
									break;
							case 15: if(counter == 3){
										current_piece.stopped = true;
									}
									break;
							case 16: if(counter == 2){
										current_piece.stopped = true;
									}
									break;
							case 17: if(counter == 1){
										current_piece.stopped = true;
									}
									break;
							case 18: if(counter == 0){
										current_piece.stopped = true;
									}
									break;


						}
						break;

				case 5: case 6: case 12: case 13: case 14: case 15: case 17: case 18: 

						switch(altura){

							case 0: if(counter == 17){
										current_piece.stopped = true;
									}
									break;
							case 1: if(counter == 16){
										current_piece.stopped = true;
									}
									break;
							case 2: if(counter == 15){
										current_piece.stopped = true;
									}
									break;
							case 3: if(counter == 14){
										current_piece.stopped = true;
									}
									break;
							case 4: if(counter == 13){
										current_piece.stopped = true;
									}
									break;
							case 5: if(counter == 12){
										current_piece.stopped = true;
									}
									break;
							case 6: if(counter == 11){
										current_piece.stopped = true;
									}
									break;
							case 7: if(counter == 10){
										current_piece.stopped = true;
									}
									break;
							case 8: if(counter == 9){
										current_piece.stopped = true;
									}
									break;
							case 9: if(counter == 8){
										current_piece.stopped = true;
									}
									break;
							case 10: if(counter == 7){
										current_piece.stopped = true;
									}
									break;
							case 11: if(counter == 6){
										current_piece.stopped = true;
									}
									break;
							case 12: if(counter == 5){
										current_piece.stopped = true;
									}
									break;
							case 13: if(counter == 4){
										current_piece.stopped = true;
									}
									break;
							case 14: if(counter == 3){
										current_piece.stopped = true;
									}
									break;
							case 15: if(counter == 2){
										current_piece.stopped = true;
									}
									break;
							case 16: if(counter == 1){
										current_piece.stopped = true;
									}
									break;
							case 17: if(counter == 0){
										current_piece.stopped = true;
									}
									break;
						}
						break;

			case 8: switch(altura){
						case 0: if(counter == 16){
									current_piece.stopped = true;
								}
								break;
						case 1: if(counter == 15){
									current_piece.stopped = true;
								}
								break;
						case 2: if(counter == 14){
									current_piece.stopped = true;
								}
								break;
						case 3: if(counter == 13){
									current_piece.stopped = true;
								}
								break;
						case 4: if(counter == 12){
									current_piece.stopped = true;
								}
								break;
						case 5: if(counter == 11){
									current_piece.stopped = true;
								}
								break;
						case 6: if(counter == 10){
									current_piece.stopped = true;
								}
								break;
						case 7: if(counter == 9){
									current_piece.stopped = true;
								}
								break;
						case 8: if(counter == 8){
									current_piece.stopped = true;
								}
								break;
						case 9: if(counter == 7){
									current_piece.stopped = true;
								}
								break;
						case 10: if(counter == 6){
									current_piece.stopped = true;
								}
								break;
						case 11: if(counter == 5){
									current_piece.stopped = true;
								}
								break;
						case 12: if(counter == 4){
									current_piece.stopped = true;
								}
								break;
						case 13: if(counter == 3){
									current_piece.stopped = true;
								}
								break;
						case 14: if(counter == 2){
									current_piece.stopped = true;
								}
								break;
						case 15: if(counter == 1){
									current_piece.stopped = true;
								}
								break;
						case 16: if(counter == 0){
									current_piece.stopped = true;
								}
								break;
					}
					break;



				}
			} 
		}


	if(status==1 && !paused){
		if(current_piece.stopped) { 
			render = false;
			stop = true;
			timeout = false;

			for(let i=0; i<current_piece.height; i++){

				if(level==0||level==1){

					if(!dropped) score +=1;
					else score +=2;

				} 
				else if(level==2||level==3){

					if(!dropped) score +=2;
					else score +=4;

				} 
				else if(level==4||level==5){

					if(!dropped) score +=3;
					else score +=6;

				}
				else if(level==6||level==7){

					if(!dropped) score +=4;
					else score +=8;

				}
				else {

					if(!dropped) score +=5;
					else score +=10;

				} 
			}

			document.getElementById("scoreDisplay").innerHTML=""+score;
			
			switch(current_piece.type){
				case 0: var c = "d";

						if(dropped) line = n_lines-altura;

						if(!hole){
							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i]++;

								lines[line-1][i] = current_piece.id + c; 


								if(arr_alturas[i]>altura_max){
									altura_max = arr_alturas[i];
								}

								c = String.fromCharCode(c.charCodeAt(0) - 1);

							}



							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i] = altura_max; 
								
							}

					    } else {


					    	var allHeightsMinor;

					    	allHeightsMinor = true;

					    	for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
					    				var j,k;
					    				for(j=0; dir && i!=(hole_col+j) && j<len_hole; j++);
					    				for(k=0; left && i!=(hole_col-k) && k<len_hole; k++);

					    				if(j==len_hole || k==len_hole){
					    					arr_alturas[i]++;
					    					if(arr_alturas[i]>altura_max){
					    						allHeightsMinor = false;
												altura_max = arr_alturas[i];
											}

					    				}

					    				

					    		lines[line-1][i] = current_piece.id + c;


					    		c = String.fromCharCode(c.charCodeAt(0) - 1);

								
					    	}


					    	if(allHeightsMinor) altura_max++;

					    	for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
					    			
									var j, k;

									for(j=0; dir && i!=hole_col+j && j<len_hole; j++);
									for(k=0; left && i!=hole_col-k && k<len_hole; k++);
									
									if(j==len_hole || k==len_hole) {
										arr_alturas[i] = altura_max;
									}
							}


					    }

					    
						break;

				case 1: var c = "a";

						if(dropped) line = n_lines-altura-1;

						if(!hole){
							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i]++;

								lines[line][i] = current_piece.id + c; 

								if(arr_alturas[i]>altura_max){
									altura_max = arr_alturas[i];
								}

								c = String.fromCharCode(c.charCodeAt(0) + 1);

							}

							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i] = altura_max; 
								
							}

							lines[line-1][current_piece.col+1] = current_piece.id + c; 
							arr_alturas[current_piece.col+1]++;
							altura_max++;
							 
						}


						break;

					case 2: var c = "d";

						if(dropped) line = n_lines-altura-1;

						lines[line-1][current_piece.col+2] = current_piece.id + c; 
						c = String.fromCharCode(c.charCodeAt(0) - 1);

						if(!hole){

							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i]++;
								

								lines[line][i] = current_piece.id + c; 


								if(arr_alturas[i]>altura_max){
									altura_max = arr_alturas[i];
								}

								c = String.fromCharCode(c.charCodeAt(0) - 1);

							}

							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i] = altura_max; 
								
							}

							arr_alturas[current_piece.col+2]++;
							altura_max++;
							setAltura(altura_max);
							 
						}

						
						break;

					case 3: var c = "d";

						if(dropped) line = n_lines-altura-1;

						lines[line-1][current_piece.col] = current_piece.id + c; 
						c = String.fromCharCode(c.charCodeAt(0) - 1);

						if(!hole){
							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i]++;


								lines[line][i] = current_piece.id + c; 


								if(arr_alturas[i]>altura_max){
									altura_max = arr_alturas[i];
								}

								c = String.fromCharCode(c.charCodeAt(0) - 1);

							}

							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i] = altura_max; 
								
							}

							arr_alturas[current_piece.col]++;
						    altura_max++;
							 
						}

						break;

					case 4: var c = "d";

						if(dropped) line = n_lines-altura-1;

						if(!hole){
							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i]+=2;

								lines[line-1][i] = current_piece.id + c; 


								if(arr_alturas[i]>altura_max){
									altura_max = arr_alturas[i];
								}

								c = String.fromCharCode(c.charCodeAt(0) - 1);

							}

							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								lines[line][i] = current_piece.id + c;
								c = String.fromCharCode(c.charCodeAt(0) - 1);
							}

							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i] = altura_max; 
								
							}
							 
						}

						
						break;

				case 5: var c = "d";

						if(dropped) line = n_lines-altura-2;

						if(!hole){
							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								
								if(i==current_piece.col+1) arr_alturas[i]+=2;
								else arr_alturas[i]++;

								lines[line][i] = current_piece.id + c; 


								if(arr_alturas[i]>altura_max){
									altura_max = arr_alturas[i];
								}

								c = String.fromCharCode(c.charCodeAt(0) - 1);

							}

							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i] = altura_max; 
								
							}

							arr_alturas[current_piece.col]++;
							lines[line-1][current_piece.col] = current_piece.id + c; 
							c = String.fromCharCode(c.charCodeAt(0) - 1);
							lines[line+1][current_piece.col+1] = current_piece.id + c; 
							

							altura_max++; 
						}

						
						break;
				case 6: var c = "a";

						if(dropped) line = n_lines-altura-2;

						lines[line+1][current_piece.col] = current_piece.id + c; 
						c = String.fromCharCode(c.charCodeAt(0) + 1);
						lines[line-1][current_piece.col] = current_piece.id + c; 
						c = String.fromCharCode(c.charCodeAt(0) + 1);

						if(!hole){
							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								
								if(i==current_piece.col) arr_alturas[i]+=2;
								else arr_alturas[i]++;
								

								lines[line][i] = current_piece.id + c; 


								if(arr_alturas[i]>altura_max){
									altura_max = arr_alturas[i];
								}

								c = String.fromCharCode(c.charCodeAt(0) + 1);

							}

							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i] = altura_max; 
								
							}

							arr_alturas[current_piece.col]++;
							

							altura_max++;
						}

						
						break;
				case 7: var c = "a";

						if(dropped) line = n_lines-altura-1;

						if(!hole){
							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								
								if(i==current_piece.col+1) arr_alturas[i]+=2;
								else arr_alturas[i]++;
								

								if(arr_alturas[i]>altura_max){
									altura_max = arr_alturas[i];
								}


							}

							for(let i=current_piece.col; i<current_piece.col + current_piece.width-1; i++){
								
								arr_alturas[i] = altura_max; 

								lines[line-1][i] = current_piece.id + c; 

								c = String.fromCharCode(c.charCodeAt(0) + 1);
								
							}


							if(altura_max==arr_alturas[current_piece.col+2]){

								for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
									arr_alturas[i]++;
								}

								altura_max++;

							}

							arr_alturas[current_piece.col+2]=altura_max-1;


							for(let i=current_piece.col + current_piece.width - 1; i>current_piece.col; i--){
								
								lines[line][i] = current_piece.id + c;

								c = String.fromCharCode(c.charCodeAt(0) + 1);
								
							}

						}

						
						break;
				case 8: var c = "d";

						if(dropped) line = n_lines-altura-current_piece.height;

						if(!hole){
							for(let i=line-1; i<line-1 + current_piece.height; i++){
								
								arr_alturas[current_piece.col]++;

								lines[i][current_piece.col] = current_piece.id + c; 


								c = String.fromCharCode(c.charCodeAt(0) - 1);

							}

							altura_max = arr_alturas[current_piece.col];
							
						}

						
						break;
				case 9: var c = "a";

						if(dropped) line = n_lines-altura-1;

						if(!hole){
							for(let i=current_piece.col + current_piece.width - 1; i>=current_piece.col; i--){
								
								if(i==current_piece.col) arr_alturas[i]+=2;
								else arr_alturas[i]++;
								

								lines[line-1][i] = current_piece.id + c; 


								if(arr_alturas[i]>altura_max){
									altura_max = arr_alturas[i];
								}

								c = String.fromCharCode(c.charCodeAt(0) + 1);

							}

							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i] = altura_max; 
								
							}

							lines[line][current_piece.col] = current_piece.id + c; 
							
						}

						
						break;
				case 10: var c = "a";

						if(dropped) line = n_lines-altura-1;

						if(!hole){
							for(let i=current_piece.col + current_piece.width - 1; i>=current_piece.col; i--){
								
								if(i==current_piece.col+2) arr_alturas[i]+=2;
								else arr_alturas[i]++;


								lines[line-1][i] = current_piece.id + c; 


								if(arr_alturas[i]>altura_max){
									altura_max = arr_alturas[i];
								}

								c = String.fromCharCode(c.charCodeAt(0) + 1);

							}

							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i] = altura_max; 
								
							}

							lines[line][current_piece.col+2] = current_piece.id + c;

						}

						break;
				case 11: var c = "a";

						if(dropped) line = n_lines-altura-1;

						lines[line][current_piece.col+1] = current_piece.id + c; 
						c = String.fromCharCode(c.charCodeAt(0) + 1);

						if(!hole){
							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								
								if(i==current_piece.col+1) arr_alturas[i]+=2;
								else arr_alturas[i]++;

								lines[line-1][i] = current_piece.id + c; 


								if(arr_alturas[i]>altura_max){
									altura_max = arr_alturas[i];
								}

								c = String.fromCharCode(c.charCodeAt(0) + 1);

							}

							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i] = altura_max; 
								
							}

						}

						
						break;
				case 12: var c = "a";

						if(dropped) line = n_lines-altura-2;

						lines[line+1][current_piece.col+1] = current_piece.id + c; 
						c = String.fromCharCode(c.charCodeAt(0) + 1);
						lines[line-1][current_piece.col+1] = current_piece.id + c; 
						c = String.fromCharCode(c.charCodeAt(0) + 1);


						if(!hole){
							for(let i=current_piece.col +  current_piece.width - 1; i>=current_piece.col; i--){
								
								if(i==current_piece.col+1) arr_alturas[i]+=3;
								else arr_alturas[i]++;


								lines[line][i] = current_piece.id + c; 


								c = String.fromCharCode(c.charCodeAt(0) + 1);

							}

							if(arr_alturas[current_piece.col]>arr_alturas[current_piece.col+1])
										altura_max = arr_alturas[current_piece.col]+1;
							else 
								altura_max = arr_alturas[current_piece.col+1];


							arr_alturas[current_piece.col+1]=altura_max;
							arr_alturas[current_piece.col] = altura_max-1;
							
						}

						
						break;
				case 13: var c = "a";

						if(dropped) line = n_lines-altura-2;

						for(let ln=line+1; ln> line + 1 - current_piece.height; ln--){
							lines[ln][current_piece.col] = current_piece.id + c; 
							c = String.fromCharCode(c.charCodeAt(0) + 1);
						}

						lines[line-1][current_piece.col+1] = current_piece.id + c; 


						if(!hole){


							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								
								if(i==current_piece.col) arr_alturas[i]+=3;
								else  arr_alturas[i]++;


								if(arr_alturas[i]>altura_max){
									altura_max = arr_alturas[i];
								}

								c = String.fromCharCode(c.charCodeAt(0) + 1);

							}

							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i] = altura_max; 
								
							}

						}

						
						break;
				case 14: var c = "a";

						if(dropped) line = n_lines-altura-2;

						for(let ln=line+1; ln> line + 1 - current_piece.height; ln--){
							lines[ln][current_piece.col+1] = current_piece.id + c; 
							c = String.fromCharCode(c.charCodeAt(0) + 1);
						}

						lines[line+1][current_piece.col] = current_piece.id + c; 


						if(!hole){
							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								
								arr_alturas[i]++;


								if(arr_alturas[i]>altura_max){
									altura_max = arr_alturas[i];
								}

							}

							arr_alturas[current_piece.col]= altura_max;
							arr_alturas[current_piece.col+1] = altura_max + 2; 

							altura_max+=2; 
						}

						
						break;
				case 15: var c = "a";

						if(dropped) line = n_lines-altura-2;

						lines[line+1][current_piece.col] = current_piece.id + c; 
						c = String.fromCharCode(c.charCodeAt(0) + 1);
						lines[line-1][current_piece.col+1] = current_piece.id + c; 
						c = String.fromCharCode(c.charCodeAt(0) + 1);

						if(!hole){
							for(let i=current_piece.col + current_piece.width - 1; i>=current_piece.col; i--){
								
								if(i==current_piece.col) arr_alturas[i]+=2;
								else arr_alturas[i]++;

								lines[line][i] = current_piece.id + c; 


								if(arr_alturas[i]>altura_max){
									altura_max = arr_alturas[i];
								}

								c = String.fromCharCode(c.charCodeAt(0) + 1);

							}

							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i] = altura_max; 
								
							}

							arr_alturas[current_piece.col+1]++;

							altura_max++; 
						}

						break;

				case 16: var c = "a";

						if(dropped) line = n_lines-altura-1;

						if(!hole){


							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								
								arr_alturas[i]++;


								if(arr_alturas[i]>altura_max){
									altura_max = arr_alturas[i];
								}

							}

							if(arr_alturas[current_piece.col+2]==altura_max && arr_alturas[current_piece.col]!=altura_max && arr_alturas[current_piece.col+1]!=altura_max)
								altura_max--;

							for(let i=current_piece.col + current_piece.width - 2; i>=current_piece.col; i--){
								arr_alturas[i] = altura_max; 
								lines[line][i] = current_piece.id + c; 
								c = String.fromCharCode(c.charCodeAt(0) + 1);
							}

							for(let cl=current_piece.col+1; cl<current_piece.col + current_piece.width; cl++){
								arr_alturas[cl] = altura_max + 1;
								lines[line-1][cl] = current_piece.id + c; 
								c = String.fromCharCode(c.charCodeAt(0) + 1);

							}

							altura_max++;
							
						}

						
						break;

				case 17: var c = "a";

						if(dropped) line = n_lines-altura-2;

						for(let ln=line+1; ln>line+1-current_piece.height; ln--){
							
							lines[ln][current_piece.col+1] = current_piece.id + c; 
							c = String.fromCharCode(c.charCodeAt(0) + 1);

						}

						lines[line-1][current_piece.col] = current_piece.id + c; 


						if(!hole){
							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								
								if(i==current_piece.col+1) arr_alturas[i]+=3;
								else arr_alturas[i]++;


								if(arr_alturas[i]>altura_max){
									altura_max = arr_alturas[i];
								}

							}

							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i] = altura_max; 
								
							}


							altura_max++; 
						}

						
						break;

				case 18: var c = "a";

						if(dropped) line = n_lines-altura-2;

						for(let ln=line+1; ln>line+1-current_piece.height; ln--){
							
							lines[ln][current_piece.col] = current_piece.id + c; 
							c = String.fromCharCode(c.charCodeAt(0) + 1);

						}

						lines[line+1][current_piece.col+1] = current_piece.id + c; 


						if(!hole){
							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								
								arr_alturas[i]++;

								if(arr_alturas[i]>altura_max){
									altura_max = arr_alturas[i];
								}

							}

							for(let i=current_piece.col; i<current_piece.col + current_piece.width; i++){
								arr_alturas[i] = altura_max; 
								
							}

							arr_alturas[current_piece.col]+=2;

							altura_max+=2; 

							 
						}

						
						break;

			}	


				var curr_children = document.getElementById(current_piece.id).childNodes;
				c = "a";

				//curr_children[3].style['background-color']="red";

				
				for(let ch=0; ch<curr_children.length; ch++){
					curr_children[ch].setAttribute("id", current_piece.id + c);

					c = String.fromCharCode(c.charCodeAt(0) + 1);
				}


			    setAltura(altura_max);
			    console.log("arr_alturas: " + arr_alturas);
				console.log(lines);
				
				var n_cleared;

				n_cleared = 0;

				for(let ln=line-1; ln<line-1 + current_piece.height; ln++){


					if(lines[ln].filter(check_not_empty).length==10){

						var up_line, all_ids_up_to_current, uniq, parentnodes;


						down_line = [];
						up_line = [];
						all_ids_up_to_current = [];
						parentnodes = [];
						uniq = []; 


						total_lines++;
						document.getElementById("linesDisplay").innerHTML=""+total_lines;
						n_cleared++;

						for(let i=0; i<n_cols; i++){

							if(lines[ln][i]!=-1){
								
								var ln_elem = document.getElementById(lines[ln][i]); 
								ln_elem.style.visibility = "hidden"; 
								
							}
						
						}

						
						for(let l=ln; l<n_lines; l++){

							for(let cl=0; cl<n_cols; cl++){

								if(lines[l][cl]!=-1){
									down_line.push(lines[l][cl]); 
								}

							}
							
						}

						
						for(let l=n_lines-1; l>=0; l--){
							all_ids_up_to_current = all_ids_up_to_current.concat(lines[l]);
						}



						up_line = all_ids_up_to_current.filter(check_not_down).filter(check_not_empty);


						for(let el=0; el<up_line.length; el++){

							if(up_line[el]!=-1){

								console.log(document.getElementById(up_line[el]).parentNode.id);
								var p_id = document.getElementById(up_line[el]).parentNode.id;

								if(!parentnodes.includes(p_id)){
									
									parentnodes.push(p_id);
									uniq.push(up_line[el]);
								}

							}
						}


						setTimeout(function(){
							if(uniq) uniq.forEach(shift_down_up_line);
						}, 600);


						var audioCLR  = new Audio();
						var srcCLR = document.createElement("source");
						srcCLR.type = "audio/mpeg";
						srcCLR.src = "lineClear.mp3";
						audioCLR.appendChild(srcCLR);
						audioCLR.play();

						
						for(let cl=0; cl<n_cols; cl++){

							var n_empty;

							n_empty = 0;

							var tmp, cpy;

							cpy = JSON.parse(JSON.stringify(lines)); 


							var ant;

							ant=lines[0][cl];

							for(let l=1; l<=ln; l++){
								tmp = cpy[l][cl];
								lines[l][cl] = ant;
								ant = tmp;
							}

							lines[0][cl]=-1;

							for(let l=0; l<n_lines && !isOccupied(l, cl); l++)
								n_empty++;

							arr_alturas[cl]=n_lines-n_empty;

						}


					}



				}

				if(n_cleared==1){
					score += 40*level;
				}
				else if(n_cleared==2){
					score += 100*level;
				}
				else if(n_cleared==3){
					score += 300*level;
				}
				else if(n_cleared==4){
					score +=1200*level;
				}

				document.getElementById("scoreDisplay").innerHTML=""+score;

				var reachedTheTop;

				reachedTheTop = false;

				if(altura==20) reachedTheTop = true;

				switch(next_piece.type){
					case 1: case 2: case 3: case 4: case 16: for(let i=next_piece.col; i<next_piece.col + next_piece.width; i++){
								reachedTheTop = reachedTheTop || (arr_alturas[i] == 19);
							}
							break;
					case 5: case 12: reachedTheTop = reachedTheTop || (arr_alturas[next_piece.col]==19) || (arr_alturas[next_piece.col+1]==18);
							break;
					case 6: case 15: reachedTheTop = reachedTheTop || (arr_alturas[next_piece.col]==18) || (arr_alturas[next_piece.col+1]==19);
							break;
					case 7: for(let i=next_piece.col+1; i<next_piece.col + next_piece.width; i++){
								reachedTheTop = reachedTheTop || (arr_alturas[i] == 19);
							}
							break;
					case 8: reachedTheTop = reachedTheTop || (arr_alturas[next_piece.col]==17);
							break; 
					case 9: reachedTheTop = reachedTheTop || (arr_alturas[next_piece.col]==19);
							break; 
					case 10: reachedTheTop = reachedTheTop || (arr_alturas[next_piece.col+2]==19);
							 break;
					case 11: reachedTheTop = reachedTheTop || (arr_alturas[next_piece.col+1]==19);
							 break;
					case 13: reachedTheTop = reachedTheTop || (arr_alturas[next_piece.col]==18);
							 break;
					case 14: case 18: for(let i=next_piece.col; i<next_piece.col + next_piece.width; i++){
								reachedTheTop = reachedTheTop || (arr_alturas[i] == 18);
							 }
							 break;
					case 17: reachedTheTop = reachedTheTop || (arr_alturas[next_piece.col+1]==18);
							 break;

				}

				if(reachedTheTop){
					current_piece.stopped = true;
					copy(current_piece, last_piece);
					status = 0;
					setTimeout(gameover, 600);
				} else {

					if(total_lines==lines_lvl_ant + 25 + 5*(level-1)){
						level++; 
						levelUp = true;
						lines_lvl_ant = total_lines;
					}
					else levelUp = false;


					copy(current_piece, last_piece);

					if(levelUp==true){

						setTimeout(function(){
							clearBoard();
							document.getElementById("player").setAttribute("src", "");
							var audio_levelup  = new Audio();
							var src_levelup = document.createElement("source");
							src_levelup.type = "audio/mpeg";
							src_levelup.src = "levelup.mp3";
							audio_levelup.appendChild(src_levelup);
							var plevel = document.getElementById("plevel");
							plevel.innerHTML = "Level " + level;
						    plevel.style.display ="";
						    audio_levelup.play();
						}, 500);
					    

					    duration += 1000;

						setTimeout(function(){
							plevel.style.display="none";
							document.getElementById("player").setAttribute("src", "mainsound.mp3");
							levelUp = false;
							current_piece.moveAllowedEsq = current_piece.moveAllowedDir = true;

							altura = altura_max = altura_min = 0;

							left = dir = false;
							hole = false;

							lines = [];

							for(let ln=0; ln<n_lines; ln++){
								lines.push([]);
								for(let col=0; col<n_cols; col++){
									lines[ln][col]=-1; 
								}
							}

							arr_alturas = [];

							for(let i=0; i<n_cols; i++){
								arr_alturas.push(0);
							}

						}, 1000);
						
					}

					
						
					counter = 0;

					current_piece.stopped = false;

					if(!levelUp) current_piece.id++;
					else current_piece.id=0;

					document.getElementById("nextDisplay").removeChild(document.getElementById("N"+next_piece.id));
		 			current_piece.type = next_piece.type;
		  			current_piece.col = next_piece.col;
		  			next_piece.id++;

				}

		 

		} else {
			counter++;

		}

		upRot_flag = false;

	}
	

	
	if(status==1) {

		render = false;
		stop = false;
		timeout = true;

		setTimeout(redraw, duration);
	}
	

}



function drawAnimationStart(){
	var imgs, imgAnimationStart;

	imgs = ["three.png", "two.png", "one.png"];
    
	
	imgAnimationStart = document.getElementById("imgAnimationStart");
	imgAnimationStart.setAttribute("src", imgs[animationCounter]);
	
	animationCounter++;
	if(animationCounter<3) setTimeout(drawAnimationStart, 300);
	

	else {
		setTimeout(function(){document.getElementById("divMain").removeChild(document.getElementById("imgAnimationStart"))},300);
		
	}


}


function copy(obj, copy) {
    
    
    for (var attr in obj) {
    	
        if (obj.hasOwnProperty(attr)) {
        	copy[attr] = obj[attr];
        }
    }

return copy;
}


function startGame() {

	if(menuMainIsShown) hideMenu("main");
	else hideMenu("playAgain");

	
	var img = document.createElement("IMG");
	img.setAttribute("id", "imgAnimationStart");
	document.getElementById("divMain").appendChild(img);
	

	animationCounter = 0;
	drawAnimationStart();
	

	status=1;
	level = 1;

	levelUp = false;
	lines_lvl_ant = 0;

	paused = false;


	current_piece.stopped = false;

	current_piece.moveAllowedEsq = current_piece.moveAllowedDir = true;

	altura = altura_max = altura_min = 0;

	left = dir = false;
	hole = false;

	upRot_flag = false;


	counter=0;
	total_lines=0;
	score=0;
	document.getElementById("linesDisplay").innerHTML=""+total_lines;
	document.getElementById("scoreDisplay").innerHTML=""+score;

	var nextDSP = document.getElementById("nextDisplay");

	if(nextDSP.hasChildNodes()){ 
		nextDSP.removeChild(nextDSP.firstElementChild);
	}


	current_piece.id = 0;
	next_piece.id = 0;
	current_piece.type = 18; //Math.floor(Math.random()*18);

	switch(current_piece.type) {
		case 0:  current_piece.col = Math.floor(Math.random()*6);
				 break;
		case 1:  case 2: case 3: case 7: case 9: case 10: case 11: case 16: current_piece.col = Math.floor(Math.random()*7);
				 break;
		case 4: case 5: case 6: case 12: case 13: case 14: case 15: case 17: case 18: current_piece.col = Math.floor(Math.random()*8);
				 break;
		case 8: current_piece.col = Math.floor(Math.random()*9);
				 break;
	}

	lines = [];

	for(let ln=0; ln<n_lines; ln++){
		lines.push([]);
		for(let col=0; col<n_cols; col++){
			lines[ln][col]=-1; 
		}
	}

	arr_alturas = [];

	for(let i=0; i<n_cols; i++){
		arr_alturas.push(0);
	}

	var p = document.createElement("P");
	p.setAttribute("id", "plevel");
	p.innerHTML = "Level " + level;
	
	

	setTimeout(function(){
		document.getElementById("divMain").appendChild(p);
		setTimeout(function(){
			document.getElementById("plevel").style.display="none";
		}, 500);
	}, 1200);


	setTimeout(function(){
		document.getElementById("player").setAttribute("src", "mainsound.mp3");
		redraw(); 
	}, 2300);
	
}


function showMenu(menu){

	if(menu === "main"){

		var ajust = document.getElementById("ajust");
		var logo = document.getElementById("imglogo");
		var btns = document.getElementsByClassName("mainBtn");

		ajust.style.display = '';
		logo.style.display = '';


		for (let i=0; i<btns.length; i++){
			btns[i].style.display = '';
		}

		menuMainIsShown = true;

	} else if(menu === "playAgain"){


		menuPlayAgainIsShown = true;
	}
}

function hideMenu(menu){
	if(menu === "main"){

		var ajust = document.getElementById("ajust");
		var logo = document.getElementById("imglogo");
		var btns = document.getElementsByClassName("mainBtn");

		ajust.style.display = 'none';
		logo.style.display = 'none';

		for (let i=0; i<btns.length; i++){
			btns[i].style.display = 'none';
		}

		menuMainIsShown = false;

	} else if(menu === "playAgain"){
		document.getElementById("divMain").removeChild(document.getElementById("imgGameOver"));
		menuPlayAgainIsShown = false;
	}
}


function clearBoard(){
	for(let i=0; (current_piece.id != undefined) && i<=last_piece.id; i++){
		console.log("toRemove: " + i.toString());
		document.getElementById("divMain").removeChild(document.getElementById(i.toString()));
		
	}
}

function getPosX(elem){
	return elem.style['margin-left'];
}

function getPosY(elem){
	return elem.style['margin-top'];
}

function setPosY(line){
	
	switch(current_piece.type){
				case 0: case 9: case 10: case 11: current_piece.y = -214 + (3+25)*line;
					    break;
				case 1: case 2: case 3: current_piece.y = -186 + (3+25)*line;
					    break;
				case 4: case 16: current_piece.y = -185 + (3+25)*line;
					    break;
				case 5: case 7: case 15: current_piece.y = -156 + (3+25)*line;
					    break;
				case 6: case 12: case 13: case 14: case 17: case 18: current_piece.y = -158 + (3+25)*line;
					    break;
				case 8: current_piece.y = -130+ (3+25)*line;
					    break;
			}
	
}

function setPosX(column) {

	console.log("current: " + current_piece.type);
	console.log("posXCol: " + current_piece.col);
    
    
	switch(current_piece.type){
		case 0: current_piece.x = -175 + (3+25)*current_piece.col;
				break;
		case 1: case 11: case 12: case 14: case 17: current_piece.x = -119 + (3+25)*current_piece.col;
				break;
		case 2: case 3: case 9: case 10: current_piece.x = -64 + (3+25)*current_piece.col;
				break;
		case 4: case 5: case 15: case 16: current_piece.x = -92 + (3+25)*current_piece.col;
				break;
		case 6: case 8: case 13: case 18: current_piece.x = -147 + (3+25)*current_piece.col;
				break;
		case 7: current_piece.x = -65 + (3+25)*current_piece.col;
				break;
		
	} 
	
}


function setCol(column){
	current_piece.col = column;
}

function setWidth(piece){
	switch(piece.type) {
		case 0: piece.width = 4;
				break;
		case 1: case 2: case 3: case 7: case 9: case 10: case 11: case 16: piece.width = 3;
				break;
		case 4: case 5: case 6: case 12: case 13: case 14: case 15: case 17: case 18: piece.width = 2;
				break;
		case 8: piece.width = 1;
				break; 
	}
}

function setHeight(ttmino){
	switch(ttmino) {
		case 0: current_piece.height = 1;
				break;
		case 1: case 2: case 3: case 4: case 7: case 9: case 10: case 11: case 16: current_piece.height = 2;
				break; 
		case 5: case 6: case 12: case 13: case 14: case 15: case 17: case 18: current_piece.height = 3;
				break; 
		case 8: current_piece.height = 4;
				break; 

	}
}

function setCounter(cntr){
	counter = cntr; 
}

function setAlturaMax(hole=false, col=-1, orientation=-1){
	var max_i;

	altura_max = 0;
	max_i = -1;

	if(!hole){
		for(let i=current_piece.col; i<current_piece.col+current_piece.width; i++){
			if(arr_alturas[i] > altura_max){
				altura_max = arr_alturas[i];
				max_i = i;
			}

		}

		switch(current_piece.type){
			case 5: if(max_i==current_piece.col)
						altura_max--;
					break;

			case 6: if(max_i==current_piece.col+1)
						altura_max--;
					break;

			case 7: if(max_i==current_piece.col && allDifferent(max_i))
						altura_max--;
					break;

			case 9: if((max_i==current_piece.col+1 || max_i==current_piece.col+2) && arr_alturas[current_piece.col]!=altura_max){
						altura_max--;
					}
					break;

			case 10: if((max_i==current_piece.col || max_i==current_piece.col+1) && arr_alturas[current_piece.col+2]!=altura_max){
						altura_max--;
					}
					break;
			case 11: if((max_i==current_piece.col || max_i==current_piece.col+2) && arr_alturas[current_piece.col+1]!=altura_max){
						altura_max--;
					}
					break;
			case 12: if(max_i==current_piece.col && arr_alturas[current_piece.col+1]!=altura_max){
						altura_max--;
					}
					break;

			case 13: if(max_i==current_piece.col+1 && arr_alturas[current_piece.col]!=altura_max){
						altura_max-=2;
					 }
					 break;

			case 15: if(max_i==current_piece.col+1 && arr_alturas[current_piece.col]!=altura_max){
						altura_max--;
					 }
					 break;

			case 16: if(max_i==current_piece.col+2 && arr_alturas[current_piece.col]!=altura_max && arr_alturas[current_piece.col+1]!=altura_max){
						altura_max--;
					 }
					 break;

			case 17: if(max_i==current_piece.col && arr_alturas[current_piece.col+1]!=altura_max){
						altura_max-=2;
					 }
					 break;


		}

	} else {
		var soma;

		for(let i=current_piece.col; i!=current_piece.col+current_piece.width; i++){ 
			soma=0;

			var j;

			for(j=0; i!=col+orientation*j && j<len_hole; j++);
				if(j==len_hole){
					for(let ln=n_lines; ln>line; ln--){
					 	soma++;
					}

					for(let l=line; l<n_lines && !isOccupied(l, i); l++){
						soma--;
					}
				}


			if(soma>altura_max){
				altura_max = soma;
			}
		}

		for(let idx=0; idx<len_hole; idx++){
			soma = 0;

    		for(let ln=n_lines; ln>line; ln--){
    			soma++;
			}

			for(let lx=line; lx<n_lines && !isOccupied(lx, col+orientation*idx); lx++){
				soma--;
			}
								
			if(soma>altura_max){
				altura_max = soma;
			}

			
    	}
					   

	}
	
}


function allDifferent(maxCol){
	var count;

	count=0;

	for(let c=current_piece.col; c<current_piece.col + current_piece.width; c++){
		if(arr_alturas[c]!=arr_alturas[maxCol])
			count++;
	}

	return (count==current_piece.width-1);
}

function rotateLeft(){

	rotationIsAllowed = true;

	switch(current_piece.type){
		case 0: afterRotationHeight = 4;

				for(let l=line-2; rotationIsAllowed && l>line-1-afterRotationHeight; l--){
					for(let c=current_piece.col; rotationIsAllowed && c<current_piece.col + current_piece.width; c++){
						rotationIsAllowed = rotationIsAllowed && !isOccupied(l, c);

					}
				}

				break;
		case 1: afterRotationHeight = 3;

				for(let l=line-1; rotationIsAllowed && l>line-2-afterRotationHeight; l--){
					rotationIsAllowed = rotationIsAllowed && !isOccupied(l, current_piece.col + current_piece.width - 1);
				}

				break;
		case 2: afterRotationHeight = 3;

				for(let l=line-1; rotationIsAllowed && l>line-2-afterRotationHeight; l--){
					for(let c=current_piece.col; rotationIsAllowed && c<current_piece.col + current_piece.width; c++){
						if(l==line-2 || c!=(current_piece.col + current_piece.width - 1)){
							rotationIsAllowed = rotationIsAllowed && !isOccupied(l, c);
						}
					}
				}

				rotationIsAllowed = rotationIsAllowed && !isOccupied(line-2, current_piece.col-1);

				break;
		case 3: afterRotationHeight = 3;

				for(let l=line-1; rotationIsAllowed && l>line-2-afterRotationHeight; l--){
					for(let c=current_piece.col+1; rotationIsAllowed && c<current_piece.col + current_piece.width; c++){
						rotationIsAllowed = rotationIsAllowed && !isOccupied(l, c);
					}
				}

				break;
		case 5: afterRotationHeight = 2;

				for(let l=line-1; rotationIsAllowed && l<line-1+afterRotationHeight; l++){
					for(let c=current_piece.col-1; rotationIsAllowed && c<current_piece.col + current_piece.width; c++){
						if(l==line-1 && c!=current_piece.col || l==line && c!=current_piece.col && c!=current_piece.col+1)
							rotationIsAllowed = rotationIsAllowed && !isOccupied(l, c);
					}
				}
		        break;
		case 6: rotationIsAllowed = rotationIsAllowed && !isOccupied(line, current_piece.col-1);

				rotationIsAllowed = rotationIsAllowed && !isOccupied(line-1, current_piece.col+1);

		        break;
		case 7: afterRotationHeight = 3;

				for(let l=line-2; rotationIsAllowed && l<line-1+current_piece.height; l++){
					for(let c=current_piece.col; rotationIsAllowed && c<current_piece.col + current_piece.width; c++){
						if(c==current_piece.col+2){
							rotationIsAllowed = rotationIsAllowed && !isOccupied(l, c);
						}
					}
				}

				break;
		case 8: afterRotationWidth = 4;

				for(let l=line-1; rotationIsAllowed && l<line-1+current_piece.height; l++){
					for(let c=current_piece.col-3; rotationIsAllowed && c<current_piece.col-3 + afterRotationWidth-1; c++){
							rotationIsAllowed = rotationIsAllowed && !isOccupied(l, c);
					}
				}

				break;
		case 9:  for(let c=current_piece.col+1; rotationIsAllowed && c<current_piece.col + current_piece.width; c++){
				 	rotationIsAllowed = rotationIsAllowed && !isOccupied(line-2, c);
				 }

				 for(let c=current_piece.col+1; rotationIsAllowed && c<current_piece.col + current_piece.width; c++){
				 	rotationIsAllowed = rotationIsAllowed && !isOccupied(line, c);
				 }

				 break;
		case 10: for(let c=current_piece.col; rotationIsAllowed && c<current_piece.col + current_piece.width; c++){
				 	rotationIsAllowed = rotationIsAllowed && !isOccupied(line-2, c);
				 }

				 rotationIsAllowed = rotationIsAllowed && !isOccupied(line, current_piece.col-1);

				 break;
		case 11: for(let c=current_piece.col; rotationIsAllowed && c<current_piece.col + current_piece.width; c++){
				 	rotationIsAllowed = rotationIsAllowed && !isOccupied(line-2, c);
				 }

				 rotationIsAllowed = rotationIsAllowed && !isOccupied(line, current_piece.col-1);

				 break;
		case 12: afterRotationWidth = 3;

				 for(let c=current_piece.col-1; rotationIsAllowed && c<current_piece.col-1 + afterRotationWidth-1; c++){
				 	rotationIsAllowed = rotationIsAllowed && !isOccupied(line-1, c);
				 }

				 break;
		case 13: for(let l=line-1; rotationIsAllowed && l<line-1+current_piece.height; l++){
					for(let c=current_piece.col-2; rotationIsAllowed && c<current_piece.col-2 + afterRotationWidth-1; c++){
						rotationIsAllowed = rotationIsAllowed && !isOccupied(l, c);
					}
				 }

		         break;
		case 14: afterRotationWidth = 3;

		         for(let c=current_piece.col-2; rotationIsAllowed && c<current_piece.col-2 + afterRotationWidth-1; c++){
		            rotationIsAllowed = rotationIsAllowed && !isOccupied(line-1, c);
		         }

		         break;
		case 15: for(let c=current_piece.col; rotationIsAllowed && c<current_piece.col + afterRotationWidth; c+=2){
					rotationIsAllowed = rotationIsAllowed && !isOccupied(line-1, c);
				 }
				 
				 rotationIsAllowed = rotationIsAllowed && !isOccupied(line, current_piece.col+2);

		         break;
		case 16: for(let c=current_piece.col; rotationIsAllowed && c<current_piece.col + current_piece.width; c++){
							rotationIsAllowed = rotationIsAllowed && !isOccupied(line-2, c);
				 }

				 rotationIsAllowed = rotationIsAllowed && !isOccupied(line-1, current_piece.col);
				 
				 break;
		case 17: 

		         for(let l=line-1; rotationIsAllowed && l<line-1 + afterRotationHeight; l++){
							rotationIsAllowed = rotationIsAllowed && !isOccupied(l, current_piece.col-1);
				 }

		         break;
		case 18: for(let l=line-1; rotationIsAllowed && l<line-1+current_piece.height; l++){
					for(let c=current_piece.col-2; rotationIsAllowed && c<current_piece.col; c++){
						rotationIsAllowed = rotationIsAllowed && !isOccupied(l, c);
					}
				 }

				 rotationIsAllowed = rotationIsAllowed && !isOccupied(line, current_piece.col+1);

		         break;
	}

	if(rotationIsAllowed){
	}

}


function rotateRight(){

	console.log("col: " + current_piece.col);

	console.log("cntr: "+counter);

	//counter = 0;

	rotationIsAllowed = true;

	switch(current_piece.type){
		
		case 0: afterRotationHeight = 4;

				for(let l=line; rotationIsAllowed && l<line-1+afterRotationHeight; l++){
					for(let c=current_piece.col; rotationIsAllowed && c<current_piece.col + current_piece.width; c++){
						rotationIsAllowed = rotationIsAllowed && !isOccupied(l, c);

					}
				}

				break;

		case 1: case 2: case 3: afterRotationHeight = 3;

				for(let l=line+1; rotationIsAllowed && l<line+afterRotationHeight; l++){
					for(let c=current_piece.col; rotationIsAllowed && c<current_piece.col + current_piece.width; c++){
						rotationIsAllowed = rotationIsAllowed && !isOccupied(l, c);

					}
				}

				break;

		case 5: for(let c=current_piece.col; rotationIsAllowed && c>current_piece.col - 2; c--){
					rotationIsAllowed = rotationIsAllowed && !isOccupied(line+1, c);

				}

				break;

		case 6: rotationIsAllowed = rotationIsAllowed && !isOccupied(line, current_piece.col-1);
				break;

		case 7: afterRotationHeight = 3;

				for(let l=line; rotationIsAllowed && l<line-1+afterRotationHeight; l++){
					rotationIsAllowed = rotationIsAllowed && !isOccupied(l, current_piece.col);
				}

				break;


		case 8: afterRotationWidth = 4;

				for(let l=line-1; rotationIsAllowed && l<line-1+current_piece.height; l++){
					for(let c=current_piece.col; rotationIsAllowed && c>current_piece.col - afterRotationWidth; c--){
						rotationIsAllowed = rotationIsAllowed && !isOccupied(l, c);

					}
				}

				break;

		case 9: afterRotationHeight = 3;
		
				for(let l=line; rotationIsAllowed && l<line-1+afterRotationHeight; l++){ 
					rotationIsAllowed = rotationIsAllowed && !isOccupied(l, current_piece.col + 1);
				}

				break;

		case 10:    afterRotationHeight = 3;

					for(let l=line; rotationIsAllowed && l<line-1+afterRotationHeight; l++){
						for(let c=current_piece.col; rotationIsAllowed && c<current_piece.col + current_piece.width-1; c++){
							rotationIsAllowed = rotationIsAllowed && !isOccupied(l, c);

						}
					}

					rotationIsAllowed = rotationIsAllowed && !isOccupied(line+1, current_piece.col + current_piece.width-1);

					rotationIsAllowed = rotationIsAllowed && !isOccupied(line+1, current_piece.col-1);

					break;

		case 11: 	afterRotationHeight = 3;

					for(let l=line; rotationIsAllowed && l<line-1+afterRotationHeight; l++){
						for(let c=current_piece.col; rotationIsAllowed && c<current_piece.col + current_piece.width; c++){
							if(l!=line || c!=current_piece.col+1)
								rotationIsAllowed = rotationIsAllowed && !isOccupied(l, c);

						}
					}

					rotationIsAllowed = rotationIsAllowed && !isOccupied(line, current_piece.col - 1);

					break;

		case 12: 	afterRotationHeight = 2;

					for(let l=line-1; rotationIsAllowed && l<line-1+afterRotationHeight; l++){
						rotationIsAllowed = rotationIsAllowed && !isOccupied(l, current_piece.col + current_piece.width - 1);
					}

					break;

		case 13: afterRotationHeight = 2;
				 afterRotationWidth = 3;

				 for(let l=line-1; rotationIsAllowed && l<line-1+afterRotationHeight; l++){
				 	rotationIsAllowed = rotationIsAllowed && !isOccupied(l, current_piece.col + afterRotationWidth - 1);
				 }
				 break;

		case 14:  afterRotationWidth = 3;

				  for(let l=line-1; rotationIsAllowed && l<line-1+current_piece.height; l++){
				 	rotationIsAllowed = rotationIsAllowed && !isOccupied(l, current_piece.col + afterRotationWidth - 1);
				  }

				  rotationIsAllowed = rotationIsAllowed && !isOccupied(line, current_piece.col);

				  break;
		case 15:  afterRotationWidth = 3;

				  for(let l=line-1; rotationIsAllowed && l<line-1+current_piece.height; l++){
				 	rotationIsAllowed = rotationIsAllowed && !isOccupied(l, current_piece.col + afterRotationWidth - 1);
				  }

				  rotationIsAllowed = rotationIsAllowed && !isOccupied(line+1, current_piece.col+1);

				  break;

		case 16: afterRotationHeight = 3;

				  for(let l=line; rotationIsAllowed && l<line-1+afterRotationHeight; l++){
					for(let c=current_piece.col+1; rotationIsAllowed && c<current_piece.col + current_piece.width; c++){
				 		if(l!=line || c!=current_piece.col+1){
				 			rotationIsAllowed = rotationIsAllowed && !isOccupied(l, c);
				 		}
				 	}
				  }

				  rotationIsAllowed = rotationIsAllowed && !isOccupied(line-1, current_piece.col);

				  break;

		case 17:    for(let l=line-1; rotationIsAllowed && l<line-1+current_piece.height; l++){
						rotationIsAllowed = rotationIsAllowed && !isOccupied(l, current_piece.col + current_piece.width - 1);
					}

					rotationIsAllowed = rotationIsAllowed && !isOccupied(line+1, current_piece.col);

					break;

		case 18:    for(let l=line-1; rotationIsAllowed && l<line-1+current_piece.height; l++){
						rotationIsAllowed = rotationIsAllowed && !isOccupied(l, current_piece.col - 1);
					}

					rotationIsAllowed = rotationIsAllowed && !isOccupied(line-1, current_piece.col+1);

					break;
				
	}


	if(rotationIsAllowed){
		document.getElementById(current_piece.id).style.position = "absolute";

		switch(current_piece.type){

			case 0: divContent = "<div class='tt8-a rect cyan'></div><div class='tt8-b rect cyan'></div><div class='tt8-c rect cyan'></div><div class='tt8-d rect cyan'></div>";
					
					current_piece.type = 8;
					current_piece.width = 1;
					current_piece.height = 4;

					console.log("rot:  " + rotationCenterCol);
					console.log("current:  " + current_piece.col);
					console.log("cpc: " + current_piece.col);

					if(rotationCenterCol == current_piece.col){
						document.getElementById(current_piece.id).style['margin-left'] = current_piece.x + 28 + "px";
						document.getElementById(current_piece.id).style['margin-top'] = current_piece.y + 84 + "px";
						pos_line = 0;
						rotationCenterLine = 0;

					} else {
						
							document.getElementById(current_piece.id).style['margin-left'] = current_piece.x + 112 + "px";
							console.log("lne: " + line);
							console.log("cntr1: " + counter);
							rotationCenterLine = 0;
							if(counter>=3) {
								setCounter(counter-3);
								line = counter + 1;
							}

							if(counter==0){
								upRot_flag = true;
							}

							pos_line = -3;
							rotationCenterCol = current_piece.col + 3;
							setCol(current_piece.col + 3);
							console.log("rcl: " + rotationCenterLine);

					}



					break;

			case 1: divContent = "<div class='r25 rect magenta'></div><div class='r26 rect magenta'></div><div class='r27 rect magenta'></div><div class='r28 rect magenta'></div>";

					current_piece.type = 6;
					current_piece.width = 2;
					current_piece.height = 3;

					document.getElementById(current_piece.id).style['margin-left'] = current_piece.x - 28 + "px";
					document.getElementById(current_piece.id).style['margin-top'] = current_piece.y + 28 + "px";
					break;

			case 2: divContent = "<div class='r73 rect orange'></div><div class='r74 rect orange'></div><div class='r75 rect orange'></div><div class='r76 rect orange'></div>";

					current_piece.type = 18;
					current_piece.width = 2;
					current_piece.height = 3;

					document.getElementById(current_piece.id).style['margin-left'] = current_piece.x - 84 + "px";
					document.getElementById(current_piece.id).style['margin-top'] = current_piece.y + 28 + "px";
					break;

			case 3: divContent = "<div class='r53 rect blue'></div><div class='r54 rect blue'></div><div class='r55 rect blue'></div><div class='r56 rect blue'></div>";

					current_piece.type = 13;
					current_piece.width = 2;
					current_piece.height = 3;

					document.getElementById(current_piece.id).style['margin-left'] = current_piece.x - 83 + "px";
					document.getElementById(current_piece.id).style['margin-top'] = current_piece.y + 28 + "px";
					break;

			case 5: divContent = "<div class='r65 rect green'></div><div class='r66 rect green'></div><div class='r67 rect green'></div><div class='r68 rect green'></div>";
					
					current_piece.type = 16;
					current_piece.width = 3;
					current_piece.height = 2;

					document.getElementById(current_piece.id).style['margin-top'] = current_piece.y - 28 + "px";

					break;

			case 6: divContent = "<div class='r45 rect magenta'></div><div class='r46 rect magenta'></div><div class='r47 rect magenta'></div><div class='r48 rect magenta'></div>";

					current_piece.type = 11;
					current_piece.width = 3;
					current_piece.height = 2;

					document.getElementById(current_piece.id).style['margin-left'] = current_piece.x + 28 + "px";
					document.getElementById(current_piece.id).style['margin-top'] = current_piece.y - 56 + "px";

					break;

			case 7: divContent = "<div class='r61 rect red'></div><div class='r62 rect red'></div><div class='r63 rect red'></div><div class='r64 rect red'></div>";

					current_piece.type = 15;
					current_piece.width = 2;
					current_piece.height = 3;

					document.getElementById(current_piece.id).style['margin-left'] = current_piece.x - 27 + "px";

					break;

			case 8: divContent = "<div class='tt0-a rect cyan'></div><div class='tt0-b rect cyan'></div><div class='tt0-c rect cyan'></div><div class='tt0-d rect cyan'></div>";

					current_piece.type = 0;
					current_piece.width = 4;
					current_piece.height = 1;

					console.log("line: " + line);
					console.log("rcl: " + rotationCenterLine);
					console.log("cpc: " + current_piece.col);

					if(rotationCenterLine != pos_line){ 
							document.getElementById(current_piece.id).style['margin-left'] = current_piece.x - 28 + "px";
							setCounter(counter+3);
							line = counter + 1;
							pos_line = 0;
							rotationCenterLine = 0;


					}
					else {
						document.getElementById(current_piece.id).style['margin-left'] = current_piece.x - 112 + "px";
						document.getElementById(current_piece.id).style['margin-top'] = current_piece.y - 84 + "px";
						rotationCenterCol = current_piece.col;
						setCol(current_piece.col-3);
						pos_line = 0;
						rotationCenterLine = 0;
					}
					
					
					
					console.log("rotV: " + rotationCenterCol);
					console.log("currentV: " + current_piece.col);

					break;
		}

		setPosX(current_piece.col);
		setPosY(counter);
		document.getElementById(current_piece.id).innerHTML=divContent;
		//status = 0; //só para conseguir testar
		
		if(hole) setAlturaMax(hole, hole_col, -1);
		else setAlturaMax();

		setAltura(altura_max);
		console.log("arr_alturas: "+arr_alturas);
	}


}

function setAltura(alt){
	altura = alt;
}


function updateRotationCenterCol(){
	rotationCenterCol = current_piece.col;
}

function gameover(){
	var imgGameOver;

	document.getElementById("player").setAttribute("src", "");
	var audio_G_OVER  = new Audio();
	var src_G_OVER = document.createElement("source");
	src_G_OVER.type = "audio/mpeg";
	src_G_OVER.src = "gameover.mp3";
	audio_G_OVER.appendChild(src_G_OVER);
	audio_G_OVER.play();
    var imgGameOver = document.createElement("IMG");
    imgGameOver.setAttribute("id", "imgGameOver");
	imgGameOver.setAttribute("src", "gameover1.png");
	document.getElementById("divMain").appendChild(imgGameOver);
	showMenu("playAgain");

}

function isOccupied(row, col){
	return lines[row][col]!=-1;
}

function isCovered(piece, start_col, last_col){ 
	var covered;
	var k;
	
	covered = false;

	
	for(let c=start_col; !covered && c<=last_col; c++){
		var ln;

		switch(current_piece.type){

			case 0: case 4: case 8: case 9: case 10: case 11: case 13: case 17: for(ln=line-2; !isOccupied(ln, c) && ln>=0; ln--); 
											 				   					break;
			case 1: if(c==start_col || c==last_col){
						for(ln=line-1; !isOccupied(ln, c) && ln>=0; ln--);
					}

					for(let l=line-2; l>=0; l--)
						covered = covered || isOccupied(l, start_col+1);
					break;
			case 2: case 12: case 15: if(c!=last_col){
								for(ln=line-1; !isOccupied(ln, c) && ln>=0; ln--);
							 }

							for(let l=line-2; l>=0; l--)
								covered = covered || isOccupied(l, last_col);
							break;
			case 3: if(c!=start_col){
						for(ln=line-1; !isOccupied(ln, c) && ln>=0; ln--);
					}

					for(let l=line-2; l>=0; l--)
						covered = covered || isOccupied(l, start_col);
					break;
			case 5: case 6: if(c==start_col){
								for(ln=line-2; !isOccupied(ln, c) && ln>=0; ln--);
							}
							else for(ln=line-1; !isOccupied(ln, c) && ln>=0; ln--);
							break;
			case 7: if(c!=last_col){
						for(ln=line-2; !isOccupied(ln, c) && ln>=0; ln--);
					}

					for(let l=line-1; l>=0; l--)
						covered = covered || isOccupied(l, last_col);
					break;
			case 14: if(c==start_col){
						for(ln=line; !isOccupied(ln, c) && ln>=0; ln--);
					 }
					 else for(ln=line-2; !isOccupied(ln, c) && ln>=0; ln--);
					 break;
			case 16: if(c==start_col){
						for(ln=line-1; !isOccupied(ln, c) && ln>=0; ln--);
					 }
					 else for(ln=line-2; !isOccupied(ln, c) && ln>=0; ln--);
					 break;
			case 18: if(c==start_col){
						for(ln=line-2; !isOccupied(ln, c) && ln>=0; ln--);
					 }
					 else for(ln=line; !isOccupied(ln, c) && ln>=0; ln--);
					 break;


		}	

				
		if(ln==-1) covered = covered || false;
		else covered = true;


	}	
		

return covered;
}


function check_not_down(id){
	return !down_line.includes(id);
}

function check_not_empty(space){
	return space != -1;
}

function shift_down_up_line(item){
	
	var elem = document.getElementById(item); 
	elem.parentNode.style.position="absolute";
	elem.parentNode.style['margin-top'] = (parseInt(getPosY(elem.parentNode).substring(0, getPosY(elem.parentNode).indexOf('p'))) + 3 + 25) + "px";
		
}

function quit(){

	if(!menuPlayAgainIsShown){
		 
		 status = 0;

		 current_piece.stopped = true;

		 if((counter==0 && !render) && (altura != n_lines)) current_piece.id--; 

		 if(current_piece.id != undefined) copy(current_piece, last_piece);

		 altura = altura_max = altura_min = 0;
		 

		 if(!menuMainIsShown){
		 	clearBoard();
		 	if(document.getElementById("divHelp") != null)
		 		document.getElementById("divMain").removeChild(document.getElementById("divHelp"));
			showMenu("main");
		 }
    } else {

    	status = 0;
    	hideMenu("playAgain");


    	if(!menuMainIsShown){
    		clearBoard();
    		showMenu("main");
    	}
    }

    document.getElementById("player").setAttribute("src", "");
    
    if(document.getElementById("plevel")){
    	document.getElementById("divMain").removeChild(document.getElementById("plevel"));
	}

}


document.getElementById("btnPlay").addEventListener("click", startGame);


document.addEventListener("keydown", function(event) {

    switch (event.which || event.keyCode){

    	case 39: if(current_piece.col + current_piece.width - 1 < 9){

    				 line=counter+1; 

    				 notAllowedCondition = false;

    				 switch(current_piece.type){
    				 	case 1: case 7: for(let l=line-1, c=0; l<line-1 + current_piece.height; c++, l++){
    				 				notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col + current_piece.width - 1 + c);
    				 			}
    				 			break;
    				 	case 0: case 2: case 4: case 8: case 10: case 12: case 14: case 17: for(let l=line-1; l<line-1 + current_piece.height; l++){
    				 				notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col + current_piece.width);
    				 			}
    				 			break;
    				 	case 3: for(let l=line-1, c=-1; l<line-1 + current_piece.height; c+=2, l++){
    				 				notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col + current_piece.width - 1 + c);
    				 			}
    				 			break;
    				 	case 5: notAllowedCondition = notAllowedCondition || isOccupied(line-1, current_piece.col + current_piece.width-1);
    				 			
    				 			for(let l=line; l<line-1 + current_piece.height; l++){
    				 				notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col + current_piece.width);
    				 			}
    				 			break;
    				 	case 6: for(let l=line-1; l<line-1 + current_piece.height; l+=2){
    				 				notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col + current_piece.width-1);
    				 			}

    				 			notAllowedCondition = notAllowedCondition || isOccupied(line, current_piece.col + current_piece.width);
    				 			break;
    				 	case 9: for(let l=line-1, c=1; l<line-1 + current_piece.height; c-=2, l++){
    				 				notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col + current_piece.width - 1 + c);
    				 			}
    				 			break;
    				 	case 11: case 16: for(let l=line-1, c=1; l<line-1 + current_piece.height; c-=1, l++){
    				 				notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col + current_piece.width - 1 + c);
    				 			 }
    				 			 break;
    				 	case 13: notAllowedCondition = notAllowedCondition || isOccupied(line-1, current_piece.col + current_piece.width);
    				 			
    				 			 for(let l=line; l<line-1 + current_piece.height; l++){
    				 				notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col + current_piece.width - 1);
    				 			 }
    				 			 break;
    				 	case 15: notAllowedCondition = notAllowedCondition || isOccupied(line+1, current_piece.col + current_piece.width-1);
    				 			
    				 			 for(let l=line-1; l<line-1 + current_piece.height-1; l++){
    				 				notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col + current_piece.width);
    				 			 }
    				 			 break;
    				 	case 18: notAllowedCondition = notAllowedCondition || isOccupied(line+1, current_piece.col + current_piece.width);
    				 			
    				 			 for(let l=line-1; l<line-1 + current_piece.height-1; l++){
    				 				notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col + current_piece.width - 1);
    				 			 }
    				 			 break;

    				 }


    				 if(notAllowedCondition === true){
    				 	current_piece.moveAllowedDir = false;
    				 }
    	             else {
    	             	current_piece.moveAllowedDir = true;
    	             }

    	         }
    	         else {
    	         	current_piece.moveAllowedDir = false;
    	         }

    	       

    	        if(current_piece.moveAllowedDir && (line-1 > n_lines - arr_alturas[current_piece.col + current_piece.width])){ 
    	        	if(!hole) { 
    	        		hole = true;
    	        		hole_col = current_piece.col + current_piece.width;
    	        	}
    	        }

    	        if(hole && current_piece.moveAllowedDir) len_hole++;


    			if (!current_piece.stopped && current_piece.moveAllowedDir) {
    					dir=true;
    			        left=false;
    				 	setCol(current_piece.col + 1);
    				 	updateRotationCenterCol();
    				 	setPosX(current_piece.col);


						if(hole) setAlturaMax(hole, hole_col, 1);
						else setAlturaMax();

						setAltura(altura_max);
						
    				 	setPos(current_piece, current_piece.x, current_piece.y);
 						
    			 }


    			 break;

    	case 37:   if(current_piece.col > 0){
    					line=counter+1;

    					notAllowedCondition = false;

    					switch(current_piece.type){
    						case 0: case 3: case 4: case 6: case 8: case 9: case 13: case 18: for(let l=line-1; l<line-1 + current_piece.height; l++){
    				 					notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col - 1);
    				 				}
    				 				break;
    				 		case 1: case 16: for(let l=line-1, c=0; l<line-1 + current_piece.height; c--, l++){
    				 					notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col + c);
    				 				}
    				 				break;
    				 		case 2: for(let l=line-1, c=0; l<line-1 + current_piece.height; c-=2, l++){
    				 					notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col + current_piece.width - 2 + c);
    				 				}
    				 				break;
    				 		case 5: case 7: for(let l=line-1; l<line-1 + current_piece.height-1; l++){
    				 					notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col - 1);
    				 				}

    				 				notAllowedCondition = notAllowedCondition || isOccupied(line+1, current_piece.col);
    				 				break;
    				 		case 10:  for(let l=line-1; l<line-1 + current_piece.height-1; l++){
    				 					notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col - 1);
    				 				  }

    				 				  notAllowedCondition = notAllowedCondition || isOccupied(line, current_piece.col + current_piece.width - 2);
    				 				  break;
    				 		case 11:  for(let l=line-1; l<line-1 + current_piece.height-1; l++){
    				 					notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col - 1);
    				 				  }

    				 				  notAllowedCondition = notAllowedCondition || isOccupied(line, current_piece.col);
    				 				  break;
    				 		case 12:  for(let l=line-1; l<line-1 + current_piece.height; l++){
    				 					if(l!=line)
    				 						notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col);
    				 				  }

    				 				  notAllowedCondition = notAllowedCondition || isOccupied(line, current_piece.col-1);
    				 				  break;
    				 		case 14:  for(let l=line-1; l<line-1 + current_piece.height-1; l++){
    				 						notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col);
    				 				  }

    				 				  notAllowedCondition = notAllowedCondition || isOccupied(line+1, current_piece.col-1);
    				 				  break;
    				 		case 15:  for(let l=line; l<line-1 + current_piece.height; l++){
    				 						notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col-1);
    				 				  }

    				 				  notAllowedCondition = notAllowedCondition || isOccupied(line-1, current_piece.col);
    				 				  break;
    				 		case 17:  for(let l=line; l<line-1 + current_piece.height; l++){
    				 						notAllowedCondition = notAllowedCondition || isOccupied(l, current_piece.col+current_piece.width);
    				 				  }

    				 				  notAllowedCondition = notAllowedCondition || isOccupied(line-1, current_piece.col-1);
    				 				  break;

    					}

    					if(notAllowedCondition === true){
    				 		current_piece.moveAllowedEsq = false;
    				 	}
    				 	else {
    				 		current_piece.moveAllowedEsq = true;
    				 	}
    					
    	            }
    	            else {
    	            	current_piece.moveAllowedEsq = false;
    	            }


    				if (!current_piece.stopped && current_piece.moveAllowedEsq) {
	    					left=true;
	    					dir=false;

	    					if(hole && !isCovered(current_piece, current_piece.col-1, current_piece.col-1+current_piece.width-1)){ 
	    						hole = false;
    						}

    						 if(current_piece.moveAllowedEsq && (line-1 > n_lines - arr_alturas[current_piece.col -1])){
    	        			 	if(!hole) { 
    	        			 		hole = true;
    	        					hole_col = current_piece.col - 1;
    	        				}
    	        			}


    	       		 if(hole && current_piece.moveAllowedEsq) len_hole++;


		    				setCol(current_piece.col -1);
		    				updateRotationCenterCol();
		    			    setPosX(current_piece.col);

 
							if(hole) setAlturaMax(hole, hole_col, -1);
							else setAlturaMax();

							setAltura(altura_max);

		    			    setPos(current_piece, current_piece.x, current_piece.y);
		    			   
	    			 }	
	    			
	    			 break;

    	case 32: if(menuMainIsShown){
    				startGame();
    			 } else {
    			 	if(status==1){
    			 		
	    			 	switch(current_piece.type){
	    			 		
							case 0: dropped = true;
									current_piece.y = -214 + (3+25)*19 - (25+3)*altura; 
									setPos(current_piece, current_piece.x, current_piece.y);
									current_piece.stopped = true;
									break;

							case 1: case 2: case 3: 
									dropped = true;
									current_piece.y = -186 + (3+25)*18 - (25+3)*altura; 
									setPos(current_piece, current_piece.x, current_piece.y);
									current_piece.stopped = true;
									break;

							case 9: case 10: case 11: 
									dropped = true;
									current_piece.y = -214 + (3+25)*18 - (25+3)*altura; 
									setPos(current_piece, current_piece.x, current_piece.y);
									current_piece.stopped = true;
									break;

							case 8: dropped = true;
									current_piece.y = -130 + (3+25)*16 - (25+3)*altura; 
									setPos(current_piece, current_piece.x, current_piece.y);
									current_piece.stopped = true;
									break;

							case 6: case 12: case 13: case 14: case 17: case 18: 
									dropped = true;
									current_piece.y = -158 + (3+25)*17 - (25+3)*altura; 
									setPos(current_piece, current_piece.x, current_piece.y);
									current_piece.stopped = true;
									break;

							case 5: case 15:  
									dropped = true;
									current_piece.y = -156 + (3+25)*17 - (25+3)*altura; 
									setPos(current_piece, current_piece.x, current_piece.y);
									current_piece.stopped = true;
									break;

							case 4: case 16: 
									dropped = true;
									current_piece.y = -185 + (3+25)*18 - (25+3)*altura; 
									setPos(current_piece, current_piece.x, current_piece.y);
									current_piece.stopped = true;
									break;

							case 7: dropped = true;
									current_piece.y = -156 + (3+25)*18 - (25+3)*altura; 
									setPos(current_piece, current_piece.x, current_piece.y);
									current_piece.stopped = true;
									break;
						}

						
					}
    			 }
    			 break;

    	case 27: if(status){
    				quit();
    			 }
				 break;

		case 80: if(status){
					
					if(!paused)
						paused = true;
					else
						paused = false;
				 }
				 break;

		case 38: if(status){
					rotateLeft();
				 }
				 break;

		case 40: if(status){
					rotateRight();
				 }
				 break;

		case 72: if(!paused){
				 	paused = true;
				 	hdiv = document.createElement("DIV");
				    hdiv.setAttribute("id", "divHelp");
				    var imgleft = document.createElement("IMG");
				    imgleft.setAttribute("id", "leftArrow");
				    imgleft.setAttribute("src", "LeftArrow.png");
				    var p = document.createElement("P");
				    p.setAttribute("id", "pLeftArrow");
				    p.setAttribute("class", "pControls");
				    var pnodeleft = document.createTextNode("LEFT");
				    p.appendChild(pnodeleft);
				    hdiv.appendChild(imgleft);
				    hdiv.appendChild(p);
				    var imgright = document.createElement("IMG");
				    imgright.setAttribute("id", "rightArrow");
				    imgright.setAttribute("src", "rightArrow.png");
				    var p1 = document.createElement("P");
				    p1.setAttribute("id", "pRightArrow");
				    p1.setAttribute("class", "pControls");
				    var pnoderight = document.createTextNode("RIGHT");
				    p1.appendChild(pnoderight);
				    hdiv.appendChild(imgright);
				    hdiv.appendChild(p1);


				    document.getElementById("divMain").appendChild(hdiv);
				 } else {
				 	paused = false;
				 	document.getElementById("divMain").removeChild(hdiv);
				 }
		         //show controls
				 break;
    
	}
       	

});

	











