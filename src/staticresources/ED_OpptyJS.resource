
(function(w){
  
    var utilMethods = {
        "populateTable":populateTable,
        "round":round,
        "formatDate":formatDate,
    };
    
    function round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }
    
    function formatDate(inputDate) {
        var date = new Date(inputDate);
        if (!isNaN(date.getTime()) ){
            // Months use 0 index.
            return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
        }
    }
    
   function populateTable(input) {
        console.log('input: ', input);
        
        
        if (!input) {
            console.log('input is undefined');
            input = 'No recommendations detected'
        }
       
        var inputArr;
        console.log('input.charAt(2):  ' + input.charAt(1));
       	if(input.charAt(1)=='p'){
           inputArr = input.split('<p>');
        } else {
           inputArr = input.split('<br>');
        }
        var outputHTML = "";
        
        for (var i = 0; i < inputArr.length; ++i) {
            
            var score;
            var desc;
            
            var color = 'slds-text-color--error';
            
            // cleans up the strings by removing any system field traits
            var cleanStr = inputArr[i].replace(/%/g,'').replace(/__c/g,'').replace(/_/g,' ').replace('+ ','+').replace('- ','-').trim();
            cleanStr = cleanStr.replace(/\b[a-z]/g,function(f){return f.toUpperCase();})
            console.log("Clean String: " + cleanStr);
            
            // handle format of other smaller phrases
            if(cleanStr.indexOf('other smaller') > 0) {
                score = cleanStr.substr(0,1) + ' ' + cleanStr.substr(cleanStr.lastIndexOf(' '));
                desc = cleanStr.substr(1,cleanStr.lastIndexOf(' '));
            }
            else if(cleanStr.startsWith('From The Baseline') > 0){
                score = cleanStr.split(',')[1].replace('+','+ ').replace('-','- ').replace(' + ','+').replace(' - ','-');
                console.log('baseline score: ' + score);
                desc = cleanStr.split(',')[0]
            }
            else {
                score = cleanStr.substr(0, cleanStr.indexOf(' ')).replace('+','+ ').replace('-','- ');
                desc = cleanStr.substr(cleanStr.indexOf(' ') + 1).replace('Because','').replace('If You Change','Change');
            }
            console.log('score: ' + score);
            
            if(score.startsWith('+')){
                color = 'ac-sdd-text-color--green';
            }
            
            if(score.startsWith('N')){
				outputHTML += '<div class="slds-truncate slds-text-body--regular slds-m-vertical--xx-small slds-text-color--weak" title="'  + desc + '">' + score + ' ' + desc + '</div>'
            	document.getElementsByClassName('meetingButton')[0].style.display = 'none';
            } else if (score.startsWith('+') || score.startsWith('-') ){
            	outputHTML += '<div class="slds-item--label ac-sdd-left-col slds-truncate slds-text-body--regular slds-m-vertical--xx-small ' + color + '">' + score + '</div>';
				outputHTML += '<div class="slds-item--detail ac-sdd-right-col slds-truncate slds-text-body--regular slds-m-vertical--xx-small slds-text-color--weak" title="' + desc + '">' + desc + '</div>'
            }
                
            
        }
        return outputHTML;
    
	}

	w.myUtil = utilMethods;
})(window);

