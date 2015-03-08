// Automatic setup via API page
if(document.URL == "https://habitrpg.com/#/options/settings/api") {
	var updatedConfig = {
		"uuid": $('pre').first().text(),
		"apik": $('pre').last().text(),
		"name": $('.main-herobox figure .avatar-name').text()
	};
	window.postMessage(updatedConfig, '*');
}


function createChatWrapper() {
	$("body").append("<div id='chatWrapper'><div id='chatWrapper_boxes'></div></div>");
	if(config['largetext'] == "true") $("#chatWrapper_boxes").addClass("largeText");
	createGroupsBox();
}

function createGroupsBox() {

	var action = "groups/?type=guilds";
	$.ajax({
		dataType: "json",
		url: baseAPIUrl + action,
		headers: apiHeaders,
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
	} else if ($('.chatBox').length >= 5) {
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
			headers: apiHeaders,
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
	if(chatIsActive) {
		$.ajax({
			dataType: "json",
			url: baseAPIUrl + action,
			data: data,
			headers: apiHeaders,
			success: function(data) {
				var htmlChat = digestChatData(chatBoxId, data);
				if(htmlChat) {
					grabAttentionForNewMessage(chatBoxId);
					$("#"+chatBoxId+" .chatBox_content").html(htmlChat);
					setTimeout("$('#"+chatBoxId+" .chatBox_content').scrollTop($('#"+chatBoxId+" .chatBox_content')[0].scrollHeight)",200);
				}
			}
		});
	}
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
	
	var today = new Date();
	var todayDay = today.getDate();
	var todayMonth = today.getMonth()+1;
	var todayYear = today.getFullYear();
	var formattedToday = todayDay + "/" + todayMonth + "/" + todayYear;
	
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
			var day = date.getDate();
			var month = date.getMonth()+1;
			var year = date.getFullYear();
			var formattedDate = day +"/"+month+"/"+year;
			
			if (formattedDate == formattedToday) var displayedDate = "Today, ";
			else if (day == todayDay - 1) var displayedDate = "Yesterday, "
			else var displayedDate = date.toLocaleDateString();
			
			var formattedTime = "<span class='msg_time'>"+displayedDate+" " + hours + ':' + minutes.substr(minutes.length-2) + "</span>";
			
			
			// The type of poster
			if(chatData[key]['uuid'] == config['uuid'])  {
				var posterClass = "userPoster";
				var extraActionIcon = '<span  onClick='+"'"+'deleteMessage("'+chatBoxId+'","'+groupID+'","'+chatData[key]['id']+'");'+"'"+' class="deleteMessage glyphicon glyphicon-trash"></span>';
				// The message
				var chatText = emoji.replace_colons(mmd(chatData[key]['text']));
			} else if (chatData[key]['uuid'] == "system") {
				var posterClass = "systemPoster";
				var extraActionIcon = '';
				// The message
				var chatText = (chatData[key]['text']);
			} else {
				var posterClass = "otherPoster";
				var flagColorClass = '';
				for(var flaggedKey in chatData[key]['flags']) {
					if(flaggedKey == config['uuid']) flagColorClass = ' flagged ';
				}
				var extraActionIcon = '<span class="'+flagColorClass+' flagMessage glyphicon glyphicon-flag" onClick='+"'"+'flagMessage("'+chatBoxId+'","'+groupID+'","'+chatData[key]['id']+'");'+"'"+'></span>';
				// like
				var likeColorClass = '';
				var numLikes = Object.keys(chatData[key].likes).length;
				if(chatData[key].likes[config['uuid']]) likeColorClass = ' liked';
				if(numLikes <= 0) {
					numLikes = '<span class="likeNumberCont"></span>';
				} else {
					if(numLikes > 9) var likeGlowClass = "gotlike_9";
					else var likeGlowClass = "gotlike_"+numLikes;
					numLikes = '<span class="likeNumberCont' + likeColorClass + '">+<span class="likeNumber">' + numLikes + '</span> </span>';
				} 

				extraActionIcon += numLikes + ' <span class="'+likeColorClass+' likeMessage glyphicon glyphicon-thumbs-up" onClick='+"'"+'likeMessage("'+chatBoxId+'","'+groupID+'","'+chatData[key]['id']+'");'+"'"+'></span>';
				// The message
				var chatText = emoji.replace_colons(mmd(chatData[key]['text']));
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
			var chatMessage = "<div id='mid_"+chatData[key]['id']+"' class='chatMessage "+posterClass+"'><div class='msg_user'>" + userLabel + "</div><div class='bubble "+likeGlowClass+"'>" + chatText + "</div><div class='msg_footer'>"+formattedTime+extraActionIcon+"</div></div>";
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
	
	if($('#mid_'+mid+' .msg_footer .flagMessage').hasClass('flagged') || confirm('Reporting a message indicates that you believe it to be in violation of the community guidelines. Are you sure you wish to report this message?')) {
		
		var action = "groups/"+gid+"/chat/"+mid+"/flag";

		$.ajax({
			dataType: "json",
			url: baseAPIUrl + action,
			type: "POST",
			headers: apiHeaders,
			success: function(data) {
				updateChat(chatBoxId);
				$('#mid_'+mid+' .msg_footer .flagMessage').toggleClass('flagged');
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
			headers: apiHeaders,
			success: function() {
				updateChat(chatBoxId);
			}
		});
}

function likeMessage(chatBoxId, gid, mid) {
	
		var action = "groups/"+gid+"/chat/"+mid+"/like";

		$.ajax({
			dataType: "json",
			url: baseAPIUrl + action,
			type: "POST",
			headers: apiHeaders,
			success: function() {
				updateChat(chatBoxId);
				var $numLikes = '#mid_'+mid+' .msg_footer .likeNumberCont'; // shortcut target
				$('#mid_'+mid+' .msg_footer .likeMessage, ' + $numLikes).toggleClass('liked');
				var numOfLikes = $($numLikes + ' .likeNumber').text(); // Get number of likes displayed
				if(!numOfLikes) numOfLikes = 0; // If empty string, make it zero
				numOfLikes = parseInt(numOfLikes); // Cast as an int instead of string so math will work
				if($($numLikes).hasClass('liked')) { 
					// If post is being liked by user, increase the number by one
					// Using html on the container is necessary for posts that had no
					// likes previously, so it can be given a '+'
					$($numLikes).html(' +<span class="likeNumber">' + (numOfLikes + 1) + '</span>');
				} else if(numOfLikes - 1 > 0) { 
					// If user is removing their like, make sure that result will be
					// greater than zero, if so display the new number
					$($numLikes + ' .likeNumber').text(numOfLikes - 1);
				} else {
					// If user is removing thier like and the resulting number
					// would be zero, just remove it
					$($numLikes).text('');
				}
				
				
			}
		});
}

function sendChatMessage(chatBoxId) {

	var targetTA = $('#TA_'+chatBoxId); 
	var message = targetTA.val(); 
	
	
	if(message.match(/[a-z:]/i)) {
	
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
			headers: apiHeaders,
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

function mention(chatBoxId, name) {
	var currentText = $("#"+chatBoxId+" .chatBox_input textarea").val();
	$("#"+chatBoxId+" .chatBox_input textarea").val(currentText+" @"+name+" ").focus();
}


///////////////////////////////////////////////////////////////////////
//////////////// INITIALIZING /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

// Settings are fetched from attributes of an HTML tag
// called "config" with id "habitRPGChatConfig"
// and stored in object named config
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
var apiHeaders = {
	"x-api-user": user_id,
	"x-api-key": user_key
}

// Hardcoded settings
var baseAPIUrl = "https://habitrpg.com/api/v2/";
var refreshRateFast = 5000;
var refreshRateMedium = 45000;
var refreshRateSlow = 60000;

// Leaving the window changes refresh rate
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

// The default sound
var ping = new Audio("data:audio/mp3;base64,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qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqgk5bbttvQwA1a8zlEpgkFJORI4aRI4cSJaaSSc0iixyWEIX/9VKMpMBCjCgImhQESIg6Jg6JToi/1BpR4qdKnRE8RJiCmopmXHJuQFDEyujCU1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5BA/4HyNyJJaSFMGgAADSAAAAEExBkroARgKAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjk3IChiZXRhKVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuOTcgKGJldGEpVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5BA/4/yFSHJ6MEdiAAADSAAAAEAAAH+AAAAIAAANIAAAARVVVVVVVVMQU1FMy45NyAoYmV0YSlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBg/4/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGD/j/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");

var chatIsActive = true;

// Launche the chat!
createChatWrapper();



///////////////////////////////////////////////////////////////////////
//////////////// INACTIVITY TIMER /////////////////////////////////////
///////////////////////////////////////////////////////////////////////

var idleTime = 0;
$(document).ready(function () {
    //Increment the idle time counter every minute.
    var idleInterval = setInterval(timerIncrement, 60000); // 1 minute
    //Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
        idleTime = 0;
    });
    $(this).keypress(function (e) {
        idleTime = 0;
    });
});

function timerIncrement() {
    idleTime = idleTime + 1;
    if (chatIsActive == true && idleTime > 60) { // 60 minutes
		chatIsActive = false;
		$('head title').text('(Chat Paused) | HabitRPG | Your Life The Role Playing Game');
		bootbox.alert("Welcome back! The HabitRPG chat has been paused while you were away for over 60 minutes.", function() {
			idleTime = 0;
			chatIsActive = true;
			$('head title').text('HabitRPG | Your Life The Role Playing Game');
		});
    }
}