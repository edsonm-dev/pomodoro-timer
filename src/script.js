



let timerSettings = { session:25,
                        break:5,
                        started:false,
                        name:'Session',
                        setTimeleft:function(props){
                            this[props+"TimeLeft"]=timerSettings[props]*60;
                            console.log(props + "is set to "+ this[props+"TimeLeft"]);
                        }};

timerSettings.breakTimeLeft =timerSettings.break*60;
timerSettings.sessionTimeLeft=timerSettings.session*60;

let count
let seconds 
let minutes
let changeTo

$(function () {
    
    $("#session-length").text(timerSettings.session);
    $("#break-length").text(timerSettings.break);
    $("#timer-label").text(timerSettings.name);
   
    
    $("#time-left").text("25:00");
    
    const increment= function (target,name){

        if(timerSettings[name] < 60){
            timerSettings[name]++;
            timerSettings.setTimeleft(name);
        }
        let num = timerSettings[name];
        $(target).text(num);
        
    }
    const decrement= function (target,name){

        if(timerSettings[name] > 1){
            timerSettings[name]--;
            timerSettings.setTimeleft(name);

        }
        let num = timerSettings[name];
        $(target).text(num);
        
    }


    $("#session-increment").on("click",function(event){
        increment("#session-length","session")
        
        if(timerSettings.name=="Session"){

            seconds= Math.floor(timerSettings["sessionTimeLeft"]%60);
            minutes= Math.floor(timerSettings["sessionTimeLeft"]/60);
            $("#time-left").text(minutes.toString().padStart(2,'0') + ":" + seconds.toString().padStart(2,'0'));
        }

        }) 

    $("#break-increment").on("click",function(event){
        increment("#break-length","break")
        
        if(timerSettings.name=="Break"){

            seconds= Math.floor(timerSettings["breakTimeLeft"]%60);
            minutes= Math.floor(timerSettings["breakTimeLeft"]/60);
            $("#time-left").text(minutes.toString().padStart(2,'0') + ":" + seconds.toString().padStart(2,'0'));
        }
    
    
    
    }) 
    
    $("#session-decrement").on("click",function(event){
        decrement("#session-length","session")
        
        
        if(timerSettings.name=="Session"){

            seconds= Math.floor(timerSettings["sessionTimeLeft"]%60);
            minutes= Math.floor(timerSettings["sessionTimeLeft"]/60);
            $("#time-left").text(minutes.toString().padStart(2,'0') + ":" + seconds.toString().padStart(2,'0'));
        }
        
        })     
    
    $("#break-decrement").on("click",function(event){
        decrement("#break-length","break")
    
        if(timerSettings.name=="Break"){

            seconds= Math.floor(timerSettings["breakTimeLeft"]%60);
            minutes= Math.floor(timerSettings["breakTimeLeft"]/60);
            $("#time-left").text(minutes.toString().padStart(2,'0') + ":" + seconds.toString().padStart(2,'0'));
        }
    
    
    
    }) 
        
    $("#start_stop").on("click",function(event){
        
        timerSettings.started=!timerSettings.started

        function countDown(){

            name =timerSettings.name.toLowerCase();
            
            console.log(name);
            //console.log(timerSettings[name + "TimeLeft"]);
            
            if (timerSettings[name + "TimeLeft"] > 0){
                timerSettings[name + "TimeLeft"]--;                
                
                //what to display----
                seconds= Math.floor(timerSettings[name + "TimeLeft"]%60);
                minutes= Math.floor(timerSettings[name + "TimeLeft"]/60);
                $("#time-left").text(minutes.toString().padStart(2,'0') + ":" + seconds.toString().padStart(2,'0'));
                //--------------------

            }else{
                console.log("changed" + name);
                timerSettings[name + "TimeLeft"]=timerSettings[name]*60;
                changeTo= (name == "session") ? "Break" : "Session";
                console.log(changeTo);
                timerSettings.name=changeTo;
                $("#timer-label").text(timerSettings.name);
                console.log(timerSettings.name);

                seconds= Math.floor(timerSettings[changeTo.toLowerCase() + "TimeLeft"]%60);
                minutes= Math.floor(timerSettings[changeTo.toLowerCase() + "TimeLeft"]/60);
                $("#time-left").text(minutes.toString().padStart(2,'0') + ":" + seconds.toString().padStart(2,'0'))
            }

            if(timerSettings[name + "TimeLeft"]<4){
                $("#time-left").css("color","#9d0208");
            }else{
                $("#time-left").css("color","#f1faee") 
            }
            if(timerSettings[name + "TimeLeft"]==0){
                $("#beep")[0].play();
            }



        
        }        
        
        
        if(timerSettings.started == true){
            
            $("#startbtn").removeClass("fas fa-play fa-2x");
            $("#startbtn").addClass("fas fa-pause fa-2x");
            
            count = setInterval(countDown,1000);

        }else{
            console.log("clearelt");
             clearInterval(count);    
             $("#startbtn").removeClass("fas fa-pause fa-2x");
             $("#startbtn").addClass("fas fa-play fa-2x");        
        }
        console.log(timerSettings.started);
    }) 
    $("#reset").on("click",function(event){

        timerSettings.break=5;
        timerSettings.session=25;
        timerSettings.breakTimeLeft=timerSettings.break*60;
        timerSettings.sessionTimeLeft=timerSettings.session*60;
        timerSettings.name="Session";
        timerSettings.started=false;
        clearInterval(count); 
        $("#session-length").text(timerSettings.session);
        $("#break-length").text(timerSettings.break);
        $("#timer-label").text(timerSettings.name);
        $("#beep")[0].pause();
        $("#beep")[0].currentTime=0;
        $("#time-left").text("25:00");
        $("#startbtn").removeClass("fas fa-pause fa-2x");
        $("#startbtn").addClass("fas fa-play fa-2x");  


    })


});