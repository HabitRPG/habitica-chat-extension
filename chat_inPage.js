// Markdown parser mmd.js from https://github.com/p01/mmd.js
;function mmd(s){var h='';function E(s){return new Option(s).innerHTML}function I(s){return E(s).replace(/!\[([^\]]*)]\(([^(]+)\)/g,'<img alt="$1"src="$2">').replace(/\[([^\]]+)]\(([^(]+)\)/g,'$1'.link('$2')).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>')}s.replace(/^\s+|\r|\s+$/g,'').replace(/\t/g,'    ').split(/\n\n+/).forEach(function(b,f,R){R={}[f=b[0]];h+=R?R[1]+('\n'+b).split(R[0]).slice(1).map(R[3]?E:I).join(R[3]||'</li>\n<li>')+R[2]:f=='#'?'<h'+(f=b.indexOf(' '))+'>'+I(b.slice(f+1))+'</h'+f+'>':f=='<'?b:'<p>'+I(b)+'</p>'});return h};


function createChatWrapper() {
	$("body").append("<div id='chatWrapper'><div id='chatWrapper_boxes'></div></div>");
	if(config['largetext'] == "true") $("#chatWrapper_boxes").css('font-size','1.2em');
}

function removeChatBox(chatBoxId) {
	$("#"+chatBoxId).remove();
	clearInterval(intervals[chatBoxId]);
	delete intervals[chatBoxId]	;
	recalculateChatBoxPositions();
}

function createChatBox(chatBoxId) {
	
	var chatBoxTitle = "";
	
	if($("#"+chatBoxId).is(':visible')) {
		removeChatBox(chatBoxId);
	} else if ($('.chatBox').length > 5) {
		alert('Only 5 groups can be opened at once. Please close one of your groups before opening another one.');
	} else {
		$("#chatWrapper_boxes").append("<div class='chatBox' id='"+chatBoxId+"'></div>");
		$("#"+chatBoxId).append("<div class='hidders chatBox_title'></div>");
		$("#"+chatBoxId).append("<div class='hidders chatBox_content'>Loading chat...</div>");
		$("#"+chatBoxId).append("<div class='hidders chatBox_input'></div>");
		$("#"+chatBoxId).append("<div class='showers chatBox_shower'></div>");
		recalculateChatBoxPositions();
				
		// Populate, position and add triggers
		var action = chatBoxId.replace('groups_','groups/');
		$.ajax({
			dataType: "json",
			url: baseAPIUrl + action,
			headers: headers,
			success: function(data) {

				$("#"+chatBoxId+" .chatBox_title").html("<div class='chatBoxTitle_title'><a href='#/options/groups/guilds/"+data['_id']+"'>"+data['name']+"</a></div><button class='chatBox_closer'><i class='glyphicon glyphicon-remove'></i></button><button class='chatBox_minimizer'><i class='glyphicon glyphicon-chevron-down'></i></button>");
				// Prevent link from minimizing window
				$("#"+chatBoxId+" .chatBox_title .chatBoxTitle_title a").click(function(e){
				    e.stopPropagation();
				});	
				$("#"+chatBoxId+" .chatBox_input").html('<textarea id="TA_'+chatBoxId+'" "Type here..."></textarea><button onClick="sendChatMessage(\''+chatBoxId+'\')">Send</button>');
				$("#"+chatBoxId+" .chatBox_shower").html("<div class='shower_title'>"+data['name']+"</div><button class='chatBox_closer'><i class='glyphicon glyphicon-remove'></i></button>");
				$("#"+chatBoxId+" div .chatBox_closer").click(function() {
					removeChatBox(chatBoxId);
				});	
				$("#"+chatBoxId+" .chatBox_input textarea").keyup(function(e){
					if (!e) e = window.event;
					var keyCode = e.keyCode || e.which;
					if (keyCode == '13' && !e.shiftKey){ sendChatMessage($(this).parent().parent().attr('id')) }
				});
			}
		});	
		$("#"+chatBoxId+" .chatBox_shower").css('display',"none");
		$("#"+chatBoxId+" .chatBox_title").click(function() {
			$('#'+chatBoxId+' .hidders').toggle();
			$('#'+chatBoxId+' .showers').toggle();
			$("#"+chatBoxId+" .chatBox_content").scrollTop($("#"+chatBoxId+" .chatBox_content")[0].scrollHeight);
			unblink(chatBoxId);
			clearInterval(intervals[chatBoxId]);
			delete intervals.chatBoxId;
			intervals[chatBoxId] = window.setInterval("updateChat('"+chatBoxId+"')", refreshRateMedium);
		});
		$("#"+chatBoxId+" .chatBox_shower").click(function() {
			$('#'+chatBoxId+' .hidders').toggle();
			$('#'+chatBoxId+' .showers').toggle();
			$("#"+chatBoxId+" .chatBox_content").scrollTop($("#"+chatBoxId+" .chatBox_content")[0].scrollHeight);
			unblink(chatBoxId);
			clearInterval(intervals[chatBoxId]);
			delete intervals.chatBoxId;
			intervals[chatBoxId] = window.setInterval("updateChat('"+chatBoxId+"')", refreshRateFast);
		});
		
		updateChat(chatBoxId);
		intervals[chatBoxId] = window.setInterval("updateChat('"+chatBoxId+"')", refreshRateFast);
	}
}

function updateChat(chatBoxId) {
	var action = chatBoxId.replace('groups_','groups/') + "/chat";
	var data = "";
	
	$.ajax({
		dataType: "json",
		url: baseAPIUrl + action,
		data: data,
		headers: headers,
		success: function(data) {
			var htmlChat = digestChatData(chatBoxId, data);
			if(htmlChat) {
				$("#"+chatBoxId+" .chatBox_content").html(htmlChat).scrollTop($("#"+chatBoxId+" .chatBox_content")[0].scrollHeight);
				grabAttentionForNewMessage(chatBoxId);
			}
		}
	});

}

function recalculateChatBoxPositions() {
	var iterator = 0;
	$('.group').removeClass('openChatBox');
	$('.chatBox').each(function() {
		$(this).css('right',((iterator * 350)+220)+"px");
		$('.group[linkedId='+($(this).attr('id')).replace("groups_","")+']').addClass('openChatBox');
		iterator++
	});
}

function digestChatData(chatBoxId,chatData) {
	var newElementId = "id"+(Math.floor(Math.random() * 10000000) + 1);
	var html = $('<div>').attr('id',newElementId);
	var lastMessageIdIsSet = false;
	var lastMessageId = "";
	var preUpdateLastMessageId = $("#"+chatBoxId+" .chatBox_content div").attr("lastMsgId");
	var groupID = chatBoxId.replace('groups_','');
	
	for (var key in chatData) {
	  if (chatData.hasOwnProperty(key)) {
		if (typeof chatData[key]['user'] !== 'undefined' || chatData[key]['uuid'] == "system") {
			if(!lastMessageIdIsSet) {
				lastMessageId = chatData[key]['id'];
				lastMessageIdIsSet = true;
			}
			var date = new Date(chatData[key]['timestamp']);
			var hours = date.getHours();
			var minutes = "0" + date.getMinutes();
			var seconds = "0" + date.getSeconds();
			var day = date.getDate();
			var month = date.getMonth()+1;
			var year = date.getFullYear();
			var formattedTime = day +"/"+month+"/"+year+" "+hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
			
			
			// The type of poster
			if(chatData[key]['uuid'] == config['uuid'])  {
				var posterClass = "userPoster";
				var extraActionIcon = '<span  onClick='+"'"+'deleteMessage("'+chatBoxId+'","'+groupID+'","'+chatData[key]['id']+'");'+"'"+' class="deleteMessage glyphicon glyphicon-trash"></span>';
				// The message
				var chatText = mmd(chatData[key]['text']);
			} else if (chatData[key]['uuid'] == "system") {
				var posterClass = "systemPoster";
				var extraActionIcon = '';
				// The message
				var chatText = (chatData[key]['text']);
			} else {
				var posterClass = "otherPoster";
				var extraActionIcon = '<span class="flagMessage glyphicon glyphicon-flag" onClick='+"'"+'flagMessage("'+chatBoxId+'","'+groupID+'","'+chatData[key]['id']+'");'+"'"+'></span>';
				// The message
				var chatText = mmd(chatData[key]['text']);
			}
			
			
			// The user label
			// check if user has a contributor level, if not (ie: system), set it to undefined
			var userLevel = chatData[key]['contributor'] ? chatData[key]['contributor']['level'] : undefined;
			if(chatData[key]['uuid'] == "system" || typeof userLevel  == 'undefined') {
				var contributorLabel = '';
			} else {
				var contributorLabel = 'label-contributor-'+userLevel;
			}

			var userSymbol = '';
			if(userLevel == 8) userSymbol = '<span class="glyphicon glyphicon-star"></span>';
			if(userLevel == 9) userSymbol = '<span class="glyphicon icon-crown"></span>';
			var userLabel = '<span class="label label-default '+contributorLabel+'" onClick="mention(\''+chatBoxId+'\',\''+chatData[key]['user']+'\')">&nbsp;'+chatData[key]['user']+'&nbsp;' + userSymbol+'</span>&nbsp;&nbsp;';

			// Create HTML
			var chatMessage = "<div class='chatMessage "+posterClass+"'><div class='msg_user'>" + userLabel + "</div><div class='bubble'>" + chatText + "</div><div class='msg_time'>"+formattedTime+extraActionIcon+"</div></div>";
			$(html).prepend(chatMessage);
		}
	  }
	}
	
	$(html).attr("lastMsgId", lastMessageId);
	if(typeof preUpdateLastMessageId == 'undefined' || preUpdateLastMessageId != lastMessageId) {
		return html;
	} else {
		return false;
	}
}

function flagMessage(chatBoxId, gid, mid) {
	
	if(confirm('Reporting a message indicates that you believe it to be in violation of the community guidelines. Are you sure you wish to report this message?')) {
		
		var action = "groups/"+gid+"/chat/"+mid+"/flag";

		$.ajax({
			dataType: "json",
			url: baseAPIUrl + action,
			type: "POST",
			headers: headers,
			success: function(data) {
				alert('This message was reported.');
				updateChat(chatBoxId);
			}
		});
	}
}

function deleteMessage(chatBoxId, gid, mid) {
	
		var action = "groups/"+gid+"/chat/"+mid;

		$.ajax({
			dataType: "json",
			url: baseAPIUrl + action,
			type: "DELETE",
			headers: headers,
			success: function() {
				updateChat(chatBoxId);
			}
		});
}

function sendChatMessage(chatBoxId) {

	var targetTA = $('#TA_'+chatBoxId); 
	var message = targetTA.val(); 
	
	if(message.match(/[a-z]/i)) {
		console.log(message);
	
		// URI Encoding of the message
		message = encodeURIComponent(message);

		targetTA.val('');
		var sentMessage = {"message": message};
		var id = chatBoxId.replace('groups_','');
		var action = "groups/"+id+"/chat?message="+message;

		$.ajax({
			dataType: "json",
			url: baseAPIUrl + action,
			type: "POST",
			//data: sentMessage,
			headers: headers,
			success: function() {
				updateChat(chatBoxId);
				$("#"+chatBoxId+" .chatBox_input textarea").focus();
			}
		});
	}
}

function grabAttentionForNewMessage(chatBoxId) {
	if(soundEnabled) ping.play();
		
	if($("#"+chatBoxId+" .chatBox_shower").is(":visible")) {
		blink(chatBoxId);
	}	
}

function blink(chatBoxId) {
	unblink(chatBoxId);
	var intervalIn = window.setInterval("$('#"+chatBoxId+" .chatBox_shower').css('background','#a0b4d7');",1000)
	$('#'+chatBoxId+' .chatBox_shower').attr('intervalIn',intervalIn);
	window.setTimeout("var intervalOut = window.setInterval(\"$('#"+chatBoxId+" .chatBox_shower').css('background','#c0d4f7');\",1000);$('#"+chatBoxId+" .chatBox_shower').attr('intervalOut',intervalOut);",500);
	$('head title').text('(New messages) HabitRPG | Your Life The Role Playing Game');
}

function unblink(chatBoxId) {
	$('head title').text('HabitRPG | Your Life The Role Playing Game');
	clearInterval($('#'+chatBoxId+' .chatBox_shower').attr('intervalIn'));
	clearInterval($('#'+chatBoxId+' .chatBox_shower').attr('intervalOut'));
	$('#'+chatBoxId+' .chatBox_shower').css('background','#c0d4f7');
}

function createGroupsBox() {

	var action = "groups/?type=guilds";
	$.ajax({
		dataType: "json",
		url: baseAPIUrl + action,
		headers: headers,
		success: function(groups) {
			
			$("#chatWrapper_boxes").append("<div id='groupsBox'></div>");
			$("#groupsBox").append("<div class='hidders groupsBox_title'><div class='groupsBoxTitle_title'>Groups</div><button class='chatBox_minimizer'><i class='glyphicon glyphicon-chevron-down'></i></button></div></div>");
			$("#groupsBox").append("<div class='hidders groupsBox_content'></div>");
			$("#groupsBox").append("<div class='showers groupsBox_shower'><div class='shower_title'>Groups</div></div>");
			
			$("#groupsBox .showers").css('display',"none");
			$("#groupsBox .groupsBox_title, #groupsBox .groupsBox_shower").click(function() {
				$('#groupsBox .hidders').toggle();
				$('#groupsBox .showers').toggle();
			});
			
			$("#groupsBox .groupsBox_content").append("<div class='groupHR'>Regular Chatrooms</div>");
			$("#groupsBox .groupsBox_content").append("<div linkedId='habitrpg' onClick='createChatBox(\"groups_habitrpg\")' class='group'>Tavern</div>");
			$("#groupsBox .groupsBox_content").append("<div linkedId='party' onClick='createChatBox(\"groups_party\")' class='group'>My Party</div>");
			$("#groupsBox .groupsBox_content").append("<div class='groupHR'>Guilds</div>");
			for (var key in groups) {
			  if (groups.hasOwnProperty(key)) {
				$("#groupsBox .groupsBox_content").append("<div linkedId='"+groups[key]['_id']+"' onClick='createChatBox(\"groups_"+groups[key]['_id']+"\")' class='group'>"+groups[key]['name'] + "</div>");
			  }
			}
			
		}
	});
}

function mention(chatBoxId, name) {
	var currentText = $("#"+chatBoxId+" .chatBox_input textarea").val();
	$("#"+chatBoxId+" .chatBox_input textarea").val(currentText+" @"+name+" ");
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

var attributes = document.getElementById('habitRPGChatConfig').attributes;
var intervals = {};
var config = {};

for (var i = 0, len = attributes.length; i < len; i++) {
    config[attributes[i].name] = attributes[i].value;
} 

if(config['sound'] == "true") var soundEnabled = true;
else var soundEnabled = false;


var user_id = config['uuid'];
var user_key = config['apik'];
var headers = {
	"x-api-user": user_id,
	"x-api-key": user_key
}
var baseAPIUrl = "https://habitrpg.com/api/v2/";
var refreshRateFast = 5000;
var refreshRateMedium = 10000;
var refreshRateSlow = 10000;

window.addEventListener('focus', function() {
	for (var key in intervals) {
		clearInterval(intervals[key]);
		delete intervals.key;
		intervals[key] = window.setInterval("updateChat('"+key+"')", refreshRateFast);
	}
});

window.addEventListener('blur', function() {
	for (var key in intervals) {
		clearInterval(intervals[key]);
		delete intervals.key;
		intervals[key] = window.setInterval("updateChat('"+key+"')", refreshRateSlow);
	}
});

var ping = new Audio("data:audio/mp3;base64,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YP+P0KQAypgAAAgQgBlDAAABAagDKgAAACA5gGVMAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUD0AAD///3AslaWoG/AAA///U9rQiAgbAamCUJKAAKD/j//84E2mnNQnQVZAY/w///cKoPqLQImaUlqUxBTUUzLjk3IChiZXRhKVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//uQYP+N8G4ASpgAAAgVYBlTAAABAkgDKGAAACA+AGUAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUf8AAD//8XFg4YNvLFnpMnWhg3d6AAAu2oRtk4lKEZiJ0rGf//h9QsEFLFElQE9ySw/4///DoOuEKzoBWLkSyAMFgKmIKaimZccm5AUMTK6MJSqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQYP+N0FwAypgAAAgToBlDAAABAbgDKmAAACA4gGVMAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq74AAB5yeDa3CyPNR1OmfxS38AAD//0U9taQ6Fw6JnuBIDcf///c6oTzR0eIR/7///PgEbHi60oVNGDAekWqPh9MQU1FMy45NyAoYmV0YSmqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQYP+P0JcAypgAAAgQA3kzACOjAbgDKgAAACBJAGUMAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqob4AAD//+qJCCgWJnnYslW/4AADlB5MMr3d5zptrHpQAADXfD/9LKXySZYDgUoJUpWysf2///klCUCHxkEE6ekqKlGF0xBTUUzLjk3IChiZXRhKaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uQYP+N0IQYyZgBHRoQgBlDAAABAXgDKmAAACBPACVMAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqof8AAD//+KkXpQQoYYG1hYAAAADAfwAAf/3I/iyiEAhWLmWCuikb8f//tDWCrmCMVKH3GxYCDfD//+8kWBl4iWzawimIKaimZccm5AUMTK6MJTVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//uQYP+J0H0AShgAAAgQorlTACOhQkADKaAAACBHAGVMAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45NyAoYmV0YSlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjk3IChiZXRhKVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//uQYP+N0H4AypgAAAgVwBldAAABAgQDKGAAACA1AGUMAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQYP+P8AAAf4AAAAgAAA/wAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=");

createChatWrapper();
createGroupsBox();
