// Add scrolling function to jQuery
jQuery.fn.scrollTo = function(elem) {
  $(this).animate({
    scrollTop:  $(this).scrollTop() - $(this).offset().top + $(elem).offset().top
  }, speed = 300);
  return this;
};

var HABITICA_URL = 'https://habitica.com';
var membersCache = {};
var contributorTier;
var heroName;
var globalNotifications;
var partyId;
var likeDataURIs = ['data:image/png;base64,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', 'data:image/png;base64,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'];

function setContributorTier(tierValue) {
  contributorTier = tierValue;
}

function setPartyId(idValue) {
  partyId = idValue;
}

function setHeroName(nameValue) {
  heroName = nameValue;
}

function countCharacters (chatBoxId) {
  document.getElementById("charactersLeftInMessage_" + chatBoxId).innerHTML = document.getElementById('TA_' + chatBoxId).value.length;
}

function processNotifications (notifications) {
  globalNotifications = notifications;
  if (config.disableshownotifications == 'false') {
    var guildId;
    $(".group-item.unreadMessages").prop('class', 'group-item');
    for (var key in notifications) {
      if (notifications[key]['data']['group'] && notifications[key]['data']['group']['id'] == partyId) {
        document.querySelector("[linkedid='party']").setAttribute('class', 'group-item unreadMessages');
      } else if (notifications[key]['data'] && notifications[key]['data']['group']) {
        guildId = notifications[key]['data']['group']['id'];
        document.querySelector("[linkedid='" + guildId + "']").setAttribute('class', 'group-item unreadMessages');
      }
    }
  }
}

function markNotificationAsRead (groupID) {
  var notifications = globalNotifications;
  for (var key in notifications) {
    if (notifications[key]['data']['group'] && (groupID == 'party' ? notifications[key]['data']['group']['id'] == partyId : notifications[key]['data']['group']['id'] == groupID)) {
      var notificationId = notifications[key]['id'];
      var action = "notifications/" + notificationId + "/read";
      $.ajax({
        dataType: "json",
        url: baseAPIUrl + action,
        headers: apiHeaders,
        method: 'post',
        success: function(response) {
          processNotifications(response.data);
        }
      });
    }
  }
}

function copyMessageText (messageID) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  var messageElement = document.getElementById(messageID);
  var chatMarkdown = messageElement.getAttribute('data-markdown');
  dummy.innerHTML = chatMarkdown;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
  alert('Message contents copied to clipboard.');
}

function lookForApiKeys (retryCount) {
  var twoSeconds = 2000;

  if (retryCount > 2) {
    return;
  }

  setTimeout(function () {
    if(document.URL === "https://habitica.com/user/settings/api"
      || document.URL === HABITICA_URL + "/user/settings/api") {
        if ($('pre.prettyprint').first().text()) {
          $('.align-items-center button.btn-secondary').click()
          setTimeout(function () {
            var updatedConfig = {
              "uuid": $('pre.prettyprint').first().text(),
              "apik": $('pre.prettyprint').last().text(),
              "name": $('.character-name').first().text()
            };
            window.postMessage(updatedConfig, '*');

            $('.align-items-center button.btn-secondary').click()
          }, 500);
        } else {
          retryCount++;
          lookForApiKeys (retryCount);
        }
      }
  }, twoSeconds);
}

// Automatic setup via API page
lookForApiKeys(0);

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
      success: function(response) {
        var groups = response.data;
		var notifications = response.notifications;
		
        $("#chatWrapper_boxes").append("<div id='groupsBox'></div>");
        $("#groupsBox").append("<div class='hidders groupsBox_title'><div class='groupsBoxTitle_title'>Groups</div><button class='chatBox_minimizer'>—</button></div></div>");
        $("#groupsBox").append("<div class='hidders groupsBox_content'></div>");
        $("#groupsBox").append("<div class='showers groupsBox_shower'><div class='shower_title'>Groups</div><button class='chatBox_minimizer'>—</button></div></div>");

        $("#groupsBox .showers").css('display',"none");
        $("#groupsBox .groupsBox_title, #groupsBox .groupsBox_shower").click(function() {
          $('#groupsBox .hidders').toggle();
          $('#groupsBox .showers').toggle();
        });

        $("#groupsBox .groupsBox_content").append("<div class='groupHR'>Regular Chatrooms</div>");
        $("#groupsBox .groupsBox_content").append("<div linkedId='habitrpg' onClick='createChatBox(\"groups_habitrpg\")' class='group-item'>Tavern</div>");
        if (partyId != "") $("#groupsBox .groupsBox_content").append("<div linkedId='party' onClick='createChatBox(\"groups_party\")' class='group-item'>My Party</div>");
        $("#groupsBox .groupsBox_content").append("<div class='groupHR'>Guilds</div>");
        for (var key in groups) {
          if (groups.hasOwnProperty(key)) {
            $("#groupsBox .groupsBox_content").append("<div linkedId='"+DOMPurify.sanitize(groups[key]['_id'], { SAFE_FOR_JQUERY: true })+"' onClick='createChatBox(\"groups_"+DOMPurify.sanitize(groups[key]['_id'], { SAFE_FOR_JQUERY: true })+"\")' class='group-item'>"+DOMPurify.sanitize(groups[key]['name'], { SAFE_FOR_JQUERY: true })+ "</div>");
          }
        }
        if (groups.length == 0) $("#groupsBox .groupsBox_content").append("<p style='text-align:center'>You're not in any guilds.</p>");
		    if (notifications) processNotifications(notifications); //No neeed to test global notifications as this occurs on load
        if (config.hidegroups == "true") document.getElementById("groupsBox").getElementsByClassName("chatBox_minimizer")[0].click()

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
      $("#chatWrapper_boxes").append("<div class='chatBox' id='"+DOMPurify.sanitize(chatBoxId, { SAFE_FOR_JQUERY: true })+"'></div>");
      $("#"+chatBoxId).append("<div class='hidders chatBox_title'></div>");
      $("#"+chatBoxId).append("<div class='hidders chatBox_content'>Loading chat...</div>");
      $("#"+chatBoxId).append("<div class='hidders chatBox_input'></div>");
      $("#"+chatBoxId).append("<div class='showers chatBox_shower'></div>");
      $("#"+chatBoxId).append("<div class='hidders chatBoxMentionNav' currentMentionPosition='0'><i class='mentionNav_up'>↑</i><i class='mentionNav_down'>↓</i></div>");
      recalculateChatBoxPositions();

      // Populate, position and add triggers
      var action = chatBoxId.replace('groups_','groups/');
      $.ajax({
        dataType: "json",
        url: baseAPIUrl + action,
        headers: apiHeaders,
        success: function(response) {
          var data = response.data;
          var notifications = response.notifications;
          if (notifications && notifications != globalNotifications) processNotifications(notifications);
          if (config['messagecount']) {
            data["chat"] = data["chat"].slice(0, config['messagecount']);
          }

          $("#"+chatBoxId+" .chatBox_title").html("<div class='chatBoxTitle_title'><a href='" + DOMPurify.sanitize(chatBoxId == 'groups_party' ? "/party" : "/groups/" + (chatBoxId == 'groups_habitrpg' ? "tavern" : "guild/"+data['_id']), { SAFE_FOR_JQUERY: true }) + "' target='_blank'>"+DOMPurify.sanitize(data['name'], { SAFE_FOR_JQUERY: true})+"</a></div><button class='chatBox_closer'>×</button><button class='chatBox_minimizer'>—</button>");
          // Prevent link from minimizing window
          $("#"+chatBoxId+" .chatBox_title .chatBoxTitle_title a").click(function(e){
            e.stopPropagation();
          });
          var sanitized_id = DOMPurify.sanitize(chatBoxId, { SAFE_FOR_JQUERY: true})
          $("#"+chatBoxId+" .chatBox_input").html('<textarea id="TA_'+sanitized_id+'" placeholder="Type here..." maxlength="3000" oninput="countCharacters(\''+sanitized_id+'\')"></textarea><button onClick="sendChatMessage(\''+sanitized_id+'\')">Send<br><span class="characterCount">(<span id="charactersLeftInMessage_' + sanitized_id + '">0</span>/3k)</span></button>');
          $("#"+chatBoxId+" .chatBox_shower").html("<div class='shower_title'>"+DOMPurify.sanitize(data['name'], { SAFE_FOR_JQUERY: true})+"</div><button class='chatBox_closer'>×</button><button class='chatBox_minimizer'>—</button>");
          $("#"+chatBoxId+" div .chatBox_closer").click(function() {
            removeChatBox(chatBoxId);
          });

          // Mention navigation
          $("#"+chatBoxId+" .chatBoxMentionNav .mentionNav_up ").click(function() {
            var totalMentions = parseInt($("#"+chatBoxId+" .chatBox_content div").attr('totalMentions'));
            if (totalMentions > 1) {
              var currentMentionPosition = parseInt($(this).parent().attr('currentMentionPosition'));
              if(currentMentionPosition >= totalMentions) {
                var nextMentionPosition = 1;
              } else if(currentMentionPosition < 1) {
                var nextMentionPosition = 1;
              } else {
                var nextMentionPosition = currentMentionPosition + 1;
              }
              $("#"+chatBoxId+" .chatBox_content").scrollTo($("#"+chatBoxId+" .chatBox_content div .chatMessage[mentionNumber='"+nextMentionPosition+"']"));
              $(this).parent().attr('currentMentionPosition',nextMentionPosition);
            } else {
              alert("Looks like your fame has not yet spread here! Get chatting and soon your name will be on everyone's lips.");
            }
          });
          $("#"+chatBoxId+" .chatBoxMentionNav .mentionNav_down ").click(function() {
            var totalMentions = parseInt($("#"+chatBoxId+" .chatBox_content div").attr('totalMentions'));
            if (totalMentions > 1) {
              var currentMentionPosition = parseInt($(this).parent().attr('currentMentionPosition'));
              if(currentMentionPosition > totalMentions) {
                var nextMentionPosition = 1;
              } else if(currentMentionPosition <= 1) {
                var nextMentionPosition = totalMentions;
              } else {
                var nextMentionPosition = currentMentionPosition - 1;
              }
              $("#"+chatBoxId+" .chatBox_content").scrollTo($("#"+chatBoxId+" .chatBox_content div .chatMessage[mentionNumber='"+nextMentionPosition+"']"));
              $(this).parent().attr('currentMentionPosition',nextMentionPosition);
            } else {
              alert("Looks like your fame has not yet spread here! Get chatting and soon your name will be on everyone's lips.");
            }
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
        success: function(response) {
          var data = response.data;
          var notifications = response.notifications;
          if (notifications && notifications != globalNotifications) processNotifications(notifications);
          if (config['messagecount'] >=1 && config['messagecount'] <= 199) {
            data = data.slice(0, config['messagecount']);
          }
          var htmlChat = digestChatData(chatBoxId, data);
          if(htmlChat) {
            if (config.disablereadnotifications == 'false') markNotificationAsRead(chatBoxId.replace('groups_', ''));
            grabAttentionForNewMessage(chatBoxId);
            $("#"+chatBoxId+" .chatBox_content").html(htmlChat);
          }
        }
      });
    }
  }

  function recalculateChatBoxPositions() {
    var iterator = 0;
    $('.group-item').removeClass('openChatBox');
    $('.chatBox').each(function() {
      $(this).css('right',((iterator * 350)+220)+"px");
      $('.group-item[linkedId='+($(this).attr('id')).replace("groups_","")+']').addClass('openChatBox');
      iterator++
    });
  }

  function digestChatData(chatBoxId,chatData) {
	var monthShortName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var newElementId = "id"+(Math.floor(Math.random() * 10000000) + 1);
    var html = $('<div>').attr('id',newElementId);
    var lastMessageIdIsSet = false;
    var lastMessageId = "";
    var preUpdateLastMessageId = $("#"+chatBoxId+" .chatBox_content div").attr("lastMsgId");
    var groupID = chatBoxId.replace('groups_','');

    var totalMentions = 0;

    var today = new Date();
    var todayDay = today.getDate();
    var todayMonth = today.getMonth()+1;
    var todayYear = today.getFullYear();
    switch (parseInt(config.dateformat)) {
      case 1:
        var formattedToday = (todayDay) +"-"+(todayMonth < 10 ? '0' + todayMonth : todayMonth)+"-"+todayYear;
        break;
      case 2:
        var formattedToday = (todayMonth < 10 ? '0' + todayMonth : todayMonth) +"-"+(todayDay < 10 ? '0' + todayDay : todayDay)+"-"+todayYear;
        break;
      case 3:
        var formattedToday = (todayDay) +" "+(monthShortName[todayMonth-1])+" "+todayYear.toString().substr(-2);
        break;
      default:
        var formattedToday = todayYear +"-"+(todayMonth < 10 ? '0' + todayMonth : todayMonth)+"-"+(todayDay < 10 ? '0' + todayDay : todayDay);
        break;
    }

    for (var key in chatData) {
      if (chatData.hasOwnProperty(key) && chatData[key]['text'] !== null ) {
        if (typeof chatData[key]['user'] !== 'undefined' || chatData[key]['uuid'] == "system") {
          if (config.hidesystem == "true" && chatData[key]['uuid'] == "system") {
            continue;
          }
          if(!lastMessageIdIsSet) {
            lastMessageId = chatData[key]['id'];
            lastMessageIdIsSet = true;
          }
          var avatarData = chatData[key]['userStyles'];
          var date = new Date(chatData[key]['timestamp']);
          if (config.timeformat != '24') var timePeriod = (date.getHours() >= 12 ? 'p.m.' : 'a.m.');
          var hours = date.getHours();
          var minutes = "0" + date.getMinutes();
          if (config.timeformat != "24") {
            if (hours == 12 && minutes == 0) {
              hours = "noon";
              minutes = "";
              timePeriod = "";
            } else if (hours == 0 && minutes == 0) { // Say it's 12:01 AM at midnight to avoid confusion
              hours = "12";
              minutes = "01";
            } else {
              hours = hours % 12;
              hours = hours ? hours : 12; // hour '0' is '12' for 12 hour clock
            }
          }
          var day = date.getDate();
          var month = date.getMonth()+1;
          var year = date.getFullYear();
          switch (parseInt(config.dateformat)) {
            case 1:
              var formattedDate = (day) +"-"+(month < 10 ? '0' + month : month)+"-"+year;
              break;
            case 2:
              var formattedDate = (month < 10 ? '0' + month : month) +"-"+(day < 10 ? '0' + day : day)+"-"+year;
              break;
            case 3:
              var formattedDate = (day) +" "+(monthShortName[month-1])+" "+year.toString().substr(-2);
              break;
            default:
              var formattedDate = year +"-"+(month < 10 ? '0' + month : month)+"-"+(day < 10 ? '0' + day : day);
              break;
          }

          if (formattedDate == formattedToday) var displayedDate = "Today, ";
          else if (day == todayDay - 1) var displayedDate = "Yesterday, "
            else var displayedDate = formattedDate;

          var formattedTime = "<span class='msg_time'>"+displayedDate+" " + hours + ':' + minutes.substr(minutes.length-2) + (timePeriod ? " " + timePeriod : "") + "</span>";


          // The type of poster
          if(chatData[key]['uuid'] == config['uuid'])  {
            var extraActionIcon = '<span class="copyMessage" onclick="copyMessageText(\'mid_' + chatData[key]['id'] + '\')"><img height="12.8px" src="data:image/png;base64,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"></span>';
            var posterClass = "userPoster";
            extraActionIcon += '<span onClick='+"'"+'deleteMessage("'+chatBoxId+'","'+groupID+'","'+chatData[key]['id']+'");'+"'"+' class="deleteMessage"><img height="12.8px" src="data:image/png;base64,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"></span>';
            //flag
            var flagColorClass = '';
            for(var flaggedKey in chatData[key]['flags']) {
              if(flaggedKey == config['uuid']) flagColorClass = ' flagged ';
            }
            //like
            var likeColorClass = '';
            var numLikes = 0;
            if (chatData[key].likes) {
              for (i=0;i<Object.keys(chatData[key].likes).length;i++) {
                if (chatData[key].likes) {
                  if (chatData[key].likes[(Object.keys(chatData[key].likes))[i]] == true) numLikes++;
                }
              }
            }
            if(chatData[key].likes && chatData[key].likes[config['uuid']]) likeColorClass = ' liked';
            var likeGlowClass = "";
            if(numLikes <= 0) {
              numLikes = '';
            } else {
              if(numLikes > 9) var likeGlowClass = "gotlike_9";
              else var likeGlowClass = "gotlike_"+numLikes;
              numLikes = '<span class="likeNumberCont' + DOMPurify.sanitize(likeColorClass ) + '">+<span class="likeNumber">' + DOMPurify.sanitize(numLikes) + '</span> </span>';
            }
            extraActionIcon += '<span class="'+ DOMPurify.sanitize(flagColorClass)+' flagMessage" onClick='+"'"+'flagMessage("'+DOMPurify.sanitize(chatBoxId)+'","'+DOMPurify.sanitize(groupID)+'","'+DOMPurify.sanitize(chatData[key]['id'])+'", prompt("Why are you reporting this post? (e.g., spam, swearing, religous oaths, bigotry, slurs, adult topics, violence)"));'+"'"+'><img src="data:image/png;base64,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" height="12.8px"></span>';
            extraActionIcon += numLikes;
            extraActionIcon += '<span class="showInfo" onclick="lookUpMember(\'' + DOMPurify.sanitize(chatData[key]['uuid'] ) + '\', \'mid_' + DOMPurify.sanitize(chatData[key]['id'] ) + '\', \'' + DOMPurify.sanitize((contributorTier && contributorTier >= 4 ? chatData[key]['client'] : '') ) + '\')"><img height="12.8px" src="data:image/png;base64,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"></span>';
            // The message
            var chatText = habiticaMarkdown.render(chatData[key]['text']);
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
            var extraActionIcon = '<span class="copyMessage" onclick="copyMessageText(\'mid_' + DOMPurify.sanitize(chatData[key]['id'] ) + '\')"><img height="12.8px" src="data:image/png;base64,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"></span>';
            extraActionIcon += '<span class="'+DOMPurify.sanitize(flagColorClass)+' flagMessage2" onClick='+"'"+'flagMessage("'+DOMPurify.sanitize(chatBoxId)+'","'+DOMPurify.sanitize(groupID)+'","'+DOMPurify.sanitize(chatData[key]['id'])+'", prompt("Why are you reporting this post? (e.g., spam, swearing, religous oaths, bigotry, slurs, adult topics, violence)"));'+"'"+'><img src="data:image/png;base64,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" height="12.8px"></span>';
            // like
            var likeColorClass = '';
            var numLikes = 0;
            if (chatData[key].likes) {
              for (i=0;i<Object.keys(chatData[key].likes).length;i++) {
                if (chatData[key].likes) {
                  if (chatData[key].likes[(Object.keys(chatData[key].likes))[i]] == true) numLikes++;
                }
              }
            }

            if(chatData[key].likes && chatData[key].likes[config['uuid']]) likeColorClass = ' liked';
            var likeGlowClass = "";
            if(numLikes <= 0) {
              numLikes ='<SPAN CLASS="LIKENUMBERCOUNT">LIKE</SPAN>';
            } else {
              if(numLikes > 9) var likeGlowClass = "gotlike_9";
              else var likeGlowClass = "gotlike_"+numLikes;
              numLikes = '<span class="likeNumberCont' + DOMPurify.sanitize(likeColorClass ) + '">+<span class="likeNumber">' + DOMPurify.sanitize(numLikes ) + '</span> </span>';
            }
            extraActionIcon += '<span class="'+DOMPurify.sanitize(likeColorClass)+' likeMessage" onClick='+"'"+'likeMessage("'+DOMPurify.sanitize(chatBoxId)+'","'+DOMPurify.sanitize(groupID)+'","'+DOMPurify.sanitize(chatData[key]['id'])+'");'+"'"+'><img height="12.8px" src="' + DOMPurify.sanitize((chatData[key].likes && chatData[key].likes[config['uuid']] ? likeDataURIs[1] : likeDataURIs[0]) ) + '">' + DOMPurify.sanitize(numLikes) + '</span>';
            extraActionIcon += '<span class="showInfo" onclick="lookUpMember(\'' + DOMPurify.sanitize(chatData[key]['uuid'] ) + '\', \'mid_' + DOMPurify.sanitize(chatData[key]['id'] ) + '\', \'' + DOMPurify.sanitize((contributorTier && contributorTier >= 4 ? chatData[key]['client'] : '') ) + '\')" style="font-size: 12.8px"><img height="12.8px" src="data:image/png;base64,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"></span>';
            // The message
            var chatText = habiticaMarkdown.render(chatData[key]['text']);
          }


          // The user label
          // check if user has a contributor level, if not (ie: system), set it to undefined
          var userLevel = chatData[key]['contributor'] ? chatData[key]['contributor']['level'] : undefined;
          if (chatData[key]['backer'] && chatData[key]['backer']['npc']) {
            userLevel = 10;
          }
          if(chatData[key]['uuid'] == "system" || typeof userLevel  == 'undefined') {
            var contributorLabel = '';
          } else {
            var contributorLabel = 'label-contributor-'+userLevel;
          }
          var userSymbol = '';
          if(userLevel == 1) userSymbol = '<img height="12.8px" src="data:image/png;base64,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">';
          if(userLevel == 2) userSymbol = '<img height="12.8px" src="data:image/png;base64,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">';
          if(userLevel == 3) userSymbol = '<img height="12.8px" src="data:image/png;base64,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">';
          if(userLevel == 4) userSymbol = '<img height="12.8px" src="data:image/png;base64,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">';
          if(userLevel == 5) userSymbol = '<img height="12.8px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABLCAMAAADzhaESAAAB0VBMVEUAAAD+vl3/vVv9vVzmrFj/vV/+vlrcxabctHf/wF7dz7ThrGDssFrkrFf/vmb/vF3XwI74umH7wWDhrl/ermr4wWf8wGD5vmD/vV35vVvkrljasGb9vmH/vGHgwJH7v2Pj08Th1MPar2rbrmrhwZL9v1rhv5HgwpD4wGPir2DjrmD8vmH5vlr9u2T8wF3hrlvorVPf0cX+umzaxZjcxZPatHjWrm/br2f6v2bfr2Lir1jwsFTrrFDi1cXc1MLcvZPYr3LYsG/YsGnXsWf/vmXlrmTkq17kr13irV37wFrprFblrVTW1Mzf1sXd1cTl1MTp08Ll1L/o077g1rzhzLjezLbiy7Pgz6/Wx6vexKrexaffw5vcwZbfw5TdwJTZv4/cvovYtH3RsHDfsWrXsWrhrGL/vmH6vWD4wF76vl76uV74ul3rrl3oq1jY08LZz8Li0bfXxqLZwp3fv5XOs3/Ts37TsHLas2/brm3SsWv4vGr+vmnwt2f0u2ber2b/u2XtsmXhr2Xar2P+wGLbq2H+vGDgsV3ir1XXzLrWzLPax6zSvpnixJfVvJPewpDWu4zNtYfbuIDNr3n/vXL2u2HdqV36vVv4v1nrqljmr1fnq1X3EzIhAAAAAXRSTlMAQObYZgAAAjlJREFUWMPt0udT2mAAx/GwBBSwah21bKwdEAhhL2WDoswqKHsJVLB1a617de/91zb0ri9I6JO3vWu+v1e5y30uzz2BqKj+jyLxeDwWkzkgkhyRaDQagQitvVjXZcXiiVxOPNmZGFcmsymeFGc2Ums4Ipx6v+1yy+Uu101we07nnsLk3tl61YsjZOztXYtGE6z2kVXtC/L5mrOdN0/wB2QXy4EQgsy2WkySWghiD1253uEJiG2wMD9LGudKIT5lx7BnZU3C07jzvQSCM8QcGLzFpdNIGmOMjAp447dvUARFUARFUARFUMS/TASZq4MqLoNGYwFHY4zUvDyruxuhQVbVGMFiiUATqutK5TnP6vkb8Q37ChYwWr3uhUU2ayW/gCeWOP7ZR+r2Qe70ADej8opENqZ8+mF34iuX3gMOI0RtQkEkljnB319BJ4k2o1oRjdn4psIiTnD8udR+kugYcbliGz8rJDuFuXm2wRI4NI96L/vpwBjqhgAWYDdSSM53Gm1i6HB4QAAzSGrUDtCDpqaST0KdadnFI9+zp+bjY8k94CRCGP2EnlSNuQU8sVQstwkYNg8DM0tgFEVPTp2b+BuRLhsuvvB/IHb7Tz6wkN3+vdn0XxinFwnEh90jy5U1xAzcfwBa4Pra7/Odlg0EQvtyq1Ta36+YTAo5cCaPx+g0GksfNwg/+PN1vU6n02dfT9wF7q1en06ns3pd6jGemAsnZOGpKa1WKgMPeweSxhIJTCAYEBUVVZd+AUBAyGpmQI5gAAAAAElFTkSuQmCC">';
          if(userLevel == 6) userSymbol = '<img height="12.8px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABOCAMAAABbqMtWAAABelBMVEUAAAA/2qFA2aFC2KA926FD2KFA2aM/xJXO2tg/2KBB2qI73KBPvZbA39Q826COzLc+2aCAxq45yJPA4dg6ypVAw5dEwpY9xZVSupWb0b5E2qLH3tZA26JPu5c9wpNG1KLL2teMy7hF06E/x5dB3KNfwJ7M29g/3aO23M+3289dwZ3F39ZSu5aLzbhBxZZDwpU6w5LB4decz76LyrZ9x64/1p9E1KE9yJc4y5bI3NfD3dW03dCQyrZH1qJF1aI/2qBCvpKY0b5C1qFLvpZUupbE39fT1NY92qNfv51IwJhRvJhGwZXG5NrJ3tfG3dXN1dOv4NCUz7uUybdG0p88zJc7xpU2ypS95tjP2Ne54taGy7V6ya5G2aJfxKJD0Z9aw5491J1ftZlXuphHwpdXuZU3x5LF4Ni039Ky3s+41cy3ycWO0r2fybyNv65lvqBMy55CyZpYuJo/zplns5lQuZTI1NLB0syhv7WXwbODwq94uaFTwZpQvpZPt5Lv7Vp0AAAAAXRSTlMAQObYZgAAA25JREFUWMPtl/lT2kAUgJPdLJAAMVUkLaJgjdgqDSDFAkK5FIt4VOtR76v2vjx6t/97XxI61bobnHGmPzj5liEz2cc3+948dhPOwcGBzlMu6mHN1evcJ242GvXYjlwuCuR68pOTs9z8PEv2avzF+J27tmP85Tjw8jHw4u6rz1yd5vH433670Yb7LTY2Nu7fePfubZ6jEVtL7x1N+9oyPQ1BtVrv/t5Jei1GM+XW3hzVEm4TFYaJeoHuVkCw1ru3vhrlaPg7JhLJ4+OlQGApG8gGGGQBuCx9LJcn+rtiDNNN99LmJiE4hCUgRGEzJIXDEoRUI3ownk55mKbOKsZElESEMBWCEV9ChEihyEAw3m9jOgQPxiFbk1wygm7riXh/F9sUICEpJGlICksswkKYEE2KqN22psOMCANlFEVkoMiyLGIJW6YYu06QgYQ0PmxirOAc5pIEQZKUzNhyd+89O5OIRQQmC4T4f4A7gldGKCwVH7QxYYSQoimCYG/i0cOrmvjLm0AlagoPXNmELdOVsyN/TYgCbpkQjgz8TxMWNbH1O8wwYdMU77+sCWhn8tiajC6gVdvKWGhV3MjO3kSgn4ZkyyQIF7sATF7H5Jgc0/U2+dR2u4phF6x93G5/uldbXiEulwtpyMViakrgESHmiRAvTLJMvuUVl2kSbUxTpomv2pjyhbi6ggBFk3mBp+JyQXY8RoJQfaD2plMM0+KEu9MojzwkCwDdZBQK8VD1rOpLp+gnwtzis0Qn4i0THevk9JZkr1fJLjNNecOEIVbRWGtCmGBelkslr1cMqD7mc2YBsiOAGBKxCSH4PKRYJNg4q0pobCAxURihmmb9HfFLmUrmiRrRmaacP/0jubKrQVtqQ8zsMG/1eKbo1n91pOimrvWfyc5dIu5mRNZzAYbcjB7HEin2JU47/DTT09xM2uf+uB3Z3h57OGZwm0o1k6k+AT6Um/sLdFNspvCsWYZ3kj5dVZNAH5Vk8hBmdP1DubFPzQ6Y/XpyWms2m4lgED50GgdBXdcPDsrlRqMxvb5K76f5L9/fPwIGhy0GDYbPDvPGzs7O4KOt4cGtrfeLjP9d/fXowq1R4BYbmKxUKqOjlcrCwpvKa47B/Mxqfq6np2cOvv4wcnZYd0bgmp95nup6zrHxcJfHYwTXOQcHh2vAb1c8y+fX3ZsCAAAAAElFTkSuQmCC">';
          if(userLevel == 7) userSymbol = '<img height="12.8px" src="data:image/png;base64,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">';
          if(userLevel == 8) userSymbol = '<img height="12.8px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAABpCAMAAABrsQ93AAADAFBMVEUAAAAolc0nls4nlssqlc0qlcsrlckrlcwlls8rlMYqls4pirwkl8wsjMAnldEokskpksYnjcEolMwpiLsyha0tl84olsgukscrkMQqisMmi78omMwrlsopirkplMoqlckrjsIpjr8oiL4kltMsjL0phrgqirYyg7HL1N3M1toomMoulcorlsgplMgtksQpjcQqir4miLouhrozibY0h7E8ha01gKnG2uMqk9Auj8MnjL43ha45g6okl9Atk84ll8ktksklisYqlsUii8Miib4tib0lhrwuiboxh7gsh7ddlbUshrM3hrFIhalBgqW42evF2ejR09cjmM8wk8x/rsoklMkrj8grkMIli7thmrhZmbdYk7QxhbQth606gajD2u281ee11OfA2eWpzOCdyN+Zw9yQudMrldIpmdArlc8llcwnkcwzlskmjcgnlMYulMUmisIvirtTkbVjmLQoibMqhLMqhbAzhag8haY8fqC93PDB4O6u0eqnz+TH2uGRv9jZ09GFs9AmkcookMYsjsYmkMQuhb8sh7tnmrk0i7k2hbk/iLIviLIuhqgyfKK92uqu0OTC0+PF1t2fxNvO09fM0NbR1tIrkcwok8Inh8IjiMEqhr8xi71mn7wnjLclh7dJjrBAia5Bi6o6iapTiqhDhqYygaO22vHC3eu0z+K7zt6Zx92oy9jN2NeVwNaJvtbU0tUjlM4ul8yTtsuIrsV7q8QxjMAxhr1ynbg1hLUwgrU6ibNZla9Oka5Liq00f6ssf6u/2/au1umy1+akyd6wz93J2NybwNaJt9OlvtIvl9LV1dGIt84smcplpclzqshvpcRxor9dmb0kg7djkrNDjLNVka5AgalLgZ7A4vPI1uOsxuDJ197O09vJ1Nacw9WMvNF3ttGZuc7R0M00mMwyi8d3o74ijLttm7NOj7JZj68siq/C2fO21e/B1ey0zNiix9iBt9ErmMuassJtqL5doL1GjrlKiqVii6RCe5hOe5Kv3/WquMGEn7J1m7CFm6bLRhXnAAAAAXRSTlMAQObYZgAACfZJREFUaN7tmWV0FFcUgMdnJetu2WSzSUrc3d2Txp1A3I0YIUljxEig0BZ3LVAo7loolEJxqbu7u7xs0p4cCmyGJr+ab05k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">';
          if(userLevel == 9) userSymbol = '<img height="12.8px" src="data:image/png;base64,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">';
          if(userLevel == 10) userSymbol = '<img height="12.8px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAA1CAYAAADoDQMKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAGdYAABnWARjRyu0AAAI/SURBVGhD7dffT9pQFAfw/YFOhoY/wGTJkiUiCK5YrKUWiwQR9uNp/8MelsVk2SK6+UB888GfFAz+IvgDDcnezziX264uTbaWBk70fpOTYHu414859yY+g0cQgaASgaASgaASgaCSp4uoVnegsrEVeG1WfvAdvMUXorT2HpS0Fnipis538BbfiJfzEoxJ04EVrjcyxNT6x4Fr5AjpV3XgChspgRAIgXCUQPQiEALhKIHoRSCeDCLZ+en63FmkEVFzHUJqAl7vfnJ9bxVZRKz5FcYXZ1nPc3kGpg8+u/ZhkUTEz75BSEtCSIpCXF6ASCoG4wsxiB5/ce0nh4hffIcX+hsGSMoK+7dTTmf6ECXORuzv75BCJNoVCC9LNsDI5qF2bEKxUP4D6Y0Yjprze2QQiestmMjLNmBZX4F2+4r1d7tdKORLNgRHDUeOFAKv0clC2gboWg5aly3e3c/93T3kc0UGmZBm2MjNtjZoIObutiFSVm3AUsaA8/ML3vkwndsOrBgF1of94VyqP4KjRkTeaQ8AzeYp73LPzfUNOysWBEcQb66RIiyApmb/CbCCZwXPjAXBdYaOKK6+ZZtagMxiFhqNE/72/4JnxgnB9fA69hNfCNwMN8VfAP96tZrJ33gLQvASwHVezaeGi8BxwlsGNz08POJP/QUvAVwHa+hnQlWWYG9vnz8ZLHiW8EwNFVEufQgMYAXPlK4Z/Cdv8YWo1xv8U7AxzTr/5C2+ENQiEFQiEFQiEFQiEFTyCBAAvwEZGY9r71Ct9QAAAABJRU5ErkJggg==">';
          var userLabel = '<span onClick="mention(\''+DOMPurify.sanitize(chatBoxId)+'\',\''+DOMPurify.sanitize(chatData[key]['username'])+'\')"><span class="label label-default '+DOMPurify.sanitize(contributorLabel)+'">&nbsp;'+DOMPurify.sanitize(chatData[key]['user'])+'&nbsp;' + DOMPurify.sanitize(userSymbol ) +'</span>&nbsp;&nbsp;<span class="label label-username">@' + DOMPurify.sanitize(chatData[key]['username'] ) + '</span></span>';


          // Check for @ Mentions
          var mentionAttribute = "";
          var mentionClass = "";
          var positionOfMention = chatText.indexOf("@"+heroName);
          var shouldMention = false
          if((positionOfMention > -1)) {
            mentionClass = "mentionedInChat";
            chatText = chatText.replace("@"+heroName, DOMPurify.sanitize("<span class='chatMention'>@"+heroName+"</span>"));
            totalMentions = totalMentions + 1;
            mentionAttribute = "mentionNumber='"+totalMentions+"'";
            if (positionOfMention > -1) var shouldMention = true;
          } else if (key==0) {
            totalMentions = totalMentions + 1;
            mentionAttribute = "mentionNumber='"+totalMentions+"'";
          }

          var sendersUuid = chatData[key].uuid;

          // Create HTML
          var chatMessage = "" +
            "<div "+DOMPurify.sanitize(mentionAttribute)+" id='mid_"+DOMPurify.sanitize(chatData[key]['id'])+"' data-markdown=\"" + DOMPurify.sanitize(chatData[key]['text'].replace(/"/g, "''") ) + "\" class='chatMessage "+DOMPurify.sanitize(posterClass)+" "+DOMPurify.sanitize(mentionClass)+" " + DOMPurify.sanitize((config.disableavatars == 'true' ? 'no_avatars' : '')) + "'>" +
              generateAvatar(sendersUuid, avatarData) +
              "<div class='msg_user'>" + DOMPurify.sanitize(userLabel ) + "</div>" +
              "<div class='" + DOMPurify.sanitize((config.disableavatars == 'true' ? 'large_bubble ' : '') ) + "bubble "+DOMPurify.sanitize(likeGlowClass)+"'>" + DOMPurify.sanitize((shouldMention ? "<span class='mentionsUserDot'></span>" : "") ) + DOMPurify.sanitize(chatText ) + "</div>" +
              "<div class='msg_footer'>"+formattedTime+extraActionIcon+"</div>" +
            "</div>";
          $(html).prepend(chatMessage);
        }
      }
    }

    $(html).attr("lastMsgId", lastMessageId);
    $(html).attr("totalMentions", totalMentions);

    if(typeof preUpdateLastMessageId == 'undefined' || preUpdateLastMessageId != lastMessageId) {
      return html;
    } else {
      return false;
    }
  }

  function createAvatarHead (avatarData, uuid) {
    if (!avatarData || !avatarData["items"] || !avatarData["preferences"]) {
      uuid = DOMPurify.sanitize(uuid)
      return '<a href="/profile/' + uuid + '" target="_blank"><div class="herobox user-not-found">' +
                '<div class="character-sprites">' +
                '</div>' +
              '</div></a>';
    }
    if (avatarData['stats']['buffs']) {
      if (avatarData['stats']['buffs']['seafoam']) {
        return '' +
        '<a href="/profile/' + uuid + '" target="_blank"><div class="herobox">' +
          '<div class="character-sprites">' +
            '<span class="seafoam_star" data-v-114900ec>' +
          '</div>' +
        '</div></a>';
      } else if (avatarData['stats']['buffs']['shinySeed']) {
        return '' +
        '<a href="/profile/' + uuid + '" target="_blank"><div class="herobox">' +
          '<div class="character-sprites">' +
            '<span class="avatar_floral_' + DOMPurify.sanitize(avatarData['stats']['class']) + '" data-v-114900ec>' +
          '</div>' +
        '</div></a>';
      } else if (avatarData['stats']['buffs']['snowball']) {
        return '' +
        '<a href="/profile/' + uuid + '" target="_blank"><div class="herobox">' +
          '<div class="character-sprites">' +
            '<span class="snowman" data-v-114900ec>' +
          '</div>' +
        '</div></a>';
      } else if (avatarData['stats']['buffs']['spookySparkles']) {
        return '' +
        '<a href="/profile/' + uuid + '" target="_blank"><div class="herobox">' +
          '<div class="character-sprites">' +
            '<span class="ghost" data-v-114900ec>' +
          '</div>' +
        '</div></a>';
      }
    }
    var gearType = avatarData["preferences"]["costume"] ? 'costume' : 'equipped';
    var gear = avatarData["items"]["gear"][gearType];
    var hairColor = '_' + avatarData["preferences"]["hair"]["color"];
    var sleepClass = avatarData["preferences"]["sleep"] ? 'skin_' + avatarData["preferences"]["skin"] + '_sleep' : 'skin_' + avatarData["preferences"]["skin"];
    return '' +
    '<a href="/profile/' + DOMPurify.sanitize(uuid ) + '" target="_blank"><div class="herobox">' +
        '<div class="character-sprites">' +
          '<span class="chair_' + DOMPurify.sanitize(avatarData["preferences"].chair ) + '" data-v-114900ec></span>' +
          '<span class="' + DOMPurify.sanitize(gear.back ) + '" data-v-114900ec></span>' +
          '<span class="' + DOMPurify.sanitize(sleepClass ) + '" data-v-114900ec></span>' +
          '<span class="' + DOMPurify.sanitize(avatarData["preferences"].size ) + '_shirt_' + DOMPurify.sanitize(avatarData["preferences"].shirt ) + '" data-v-114900ec></span>' +
          '<span class="' + DOMPurify.sanitize(avatarData["preferences"].size ) + '_' + DOMPurify.sanitize(gear.armor) + '" data-v-114900ec></span>' +
          '<span class="' + DOMPurify.sanitize(gear.back ) + '_collar' + '" data-v-114900ec></span>' +
          '<span class="' + DOMPurify.sanitize(gear.body ) + '" data-v-114900ec></span>' +
          '<span class="head_' + DOMPurify.sanitize(avatarData["preferences"].head ) +'" data-v-114900ec></span>' +
          '<span class="hair_base_' + DOMPurify.sanitize(avatarData["preferences"].hair.base + hairColor ) + '" data-v-114900ec></span>' +
          '<span class="hair_bangs_' + DOMPurify.sanitize(avatarData["preferences"].hair.bangs + hairColor ) + '" data-v-114900ec></span>' +
          '<span class="hair_mustache_' + DOMPurify.sanitize(avatarData["preferences"].hair.mustache + hairColor ) + '" data-v-114900ec></span>' +
          '<span class="hair_beard_' + DOMPurify.sanitize(avatarData["preferences"].hair.beard + hairColor ) + '" data-v-114900ec></span>' +
          '<span class="' + DOMPurify.sanitize(gear.eyewear ) + '" data-v-114900ec></span>' +
          '<span class="' + DOMPurify.sanitize(gear.head ) + '" data-v-114900ec></span>' +
          '<span class="' + DOMPurify.sanitize(gear.headAccessory ) + '" data-v-114900ec></span>' +
          '<span class="hair_flower_' + DOMPurify.sanitize(avatarData['preferences']['hair']['flower'] ) + '" data-v-114900ec></span>' +
          '<span class="' + DOMPurify.sanitize(gear.shield ) + '" data-v-114900ec></span>' +
          '<span class="' + DOMPurify.sanitize(gear.weapon ) + '" data-v-114900ec></span>' +
        '</div>' +
      '</div></a>';
  }

  function lookUpMember (uuid, messageID, chatClient) {
    $.ajax({
      dataType: "json",
      url: baseAPIUrl + 'members/' + uuid,
      headers: apiHeaders,
      success: function (response) {
        var data = response.data;
        if (messageID && document.getElementById(messageID)) {
          var chatMessages = document.getElementsByClassName(uuid);
          var elementTitle;
          var contributorTitle;
          var date = new Date(data['auth']['timestamps']['created']);
          var formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
          var today = new Date();
          var todayDay = today.getDate();
          var todayMonth = today.getMonth()+1;
          var todayYear = today.getFullYear();
          var formattedToday = todayYear +"-"+(todayMonth < 10 ? '0' + todayMonth : todayMonth)+"-"+(todayDay < 10 ? '0' + todayDay : todayDay);
          if (formattedDate == formattedToday) var displayedDate = "Today ";
          else if (date.getDate == todayDay - 1) var displayedDate = "Yesterday "
            else var displayedDate = formattedDate;
          var joinedDate = displayedDate  + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
          elementTitle = 'Level ' + data['stats']['lvl'] + " " + data['stats']['class'].charAt(0).toUpperCase() + data['stats']['class'].substr(1) + "; Joined " + joinedDate + (chatClient ? "; " + chatClient : '');
          elementTitle = elementTitle.replace('Wizard', 'Mage');
          if (data["contributor"] && data["contributor"]["level"]) {
            contributorTitle = "Tier " + data["contributor"]["level"] + " " + data["contributor"]["text"];
          } else {
            contributorTitle = "No Contributor Tier";
          }
          document.getElementById(messageID).getElementsByClassName('msg_footer')[0].getElementsByClassName('showInfo')[0].innerHTML = "<br>" + elementTitle + "<br>" + contributorTitle + "<br><a href=\"" + "/profile/" + uuid +  "\" target=\"" + "_blank" + "\">" + uuid + "</a>";
          document.getElementById(messageID).getElementsByClassName('msg_footer')[0].getElementsByClassName('showInfo')[0].style.fontSize = "1.2em";
          document.getElementById(messageID).getElementsByClassName('msg_footer')[0].getElementsByClassName('showInfo')[0].style.display = "block";
          document.getElementById(messageID).getElementsByClassName('msg_footer')[0].getElementsByClassName('showInfo')[0].style.cursor = "text";
          document.getElementById(messageID).getElementsByClassName('msg_footer')[0].getElementsByClassName('showInfo')[0].scrollIntoView(false);
        }
      }
    });
    return true;
  }

  function replaceLoadingSpinner (avatarData, uuid) {
    var cache = membersCache[uuid];

    cache.html = createAvatarHead(avatarData, uuid);
    cache.loaded = true;
    cache.lastUpdated = new Date();

    return cache.html;
  }

  function generateAvatar (uuid, avatarData) {
    if (uuid === 'system') { return ''; }
    if (config.disableavatars == 'true') {
      return '';
    }
    membersCache[uuid] = {
      lastUpdated: new Date(),
      loaded: false,
      html: ''
    };

    return '' +
    DOMPurify.sanitize('<div class="user_avatar ' + uuid + '">' +
      replaceLoadingSpinner(avatarData, uuid) +
      '</div>');
  }

  function flagMessage(chatBoxId, gid, mid, userComment) {
    if (userComment == null) {
      return false;
    }
    if($('#mid_'+mid+' .msg_footer .flagMessage').hasClass('flagged') || confirm('Reporting a message indicates that you believe it to be in violation of the community guidelines. Are you sure you wish to report this message?')) {

      var action = "groups/"+gid+"/chat/"+mid+"/flag";

      $.ajax({
        dataType: "json",
        url: baseAPIUrl + action,
        type: "POST",
        headers: apiHeaders,
        data: {comment: userComment},
        success: function(response) {
          var data = response.data;
          updateChat(chatBoxId);
          $('#mid_'+mid+' .msg_footer .flagMessage').toggleClass('flagged');
        }
      });
    }
  }

  function deleteMessage(chatBoxId, gid, mid) {
    if (config.confirmdelete == 'false' || confirm("Are you sure you want to delete this post? You cannot undo this action.")) {
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
        if ($('#mid_'+mid+' .msg_footer .likeMessage, ' + $numLikes).hasClass('liked')) {
          $('#mid_'+mid+' .msg_footer .likeMessage img').prop('src', likeDataURIs[1]);
        } else {
          $('#mid_'+mid+' .msg_footer .likeMessage img').prop('src', likeDataURIs[0]);
        }
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
    var message = targetTA.val().trim();


    if(message) {
      targetTA.val('');
      var sentMessage = {"message": message};
      var id = chatBoxId.replace('groups_','');
      var action = "groups/"+id+"/chat";

      $.ajax({
        dataType: "json",
        url: baseAPIUrl + action,
        type: "POST",
        data: sentMessage,
        headers: apiHeaders,
        success: function(response) {
          updateChat(chatBoxId);
          $("#"+chatBoxId+" .chatBox_input textarea").focus();
          countCharacters(chatBoxId);
        },
        error: function () {
          targetTA.val(sentMessage['message']);
          alert("Your message could not be sent. This could be for one of the following reasons:\n1. It looks like this post contains a swearword, religious oath, or reference to an addictive substance or adult topic. Habitica has users from all backgrounds, so we keep our chat very clean. Feel free to edit your message so you can post it!\n2. Your account has been banned from chat\n3. There was a network or server error");
        }
      });
    }
  }

  function grabAttentionForNewMessage(chatBoxId) {
    if(soundEnabled) ping.play();

    if($("#"+chatBoxId+" .chatBox_shower").is(":visible")) {
      blink(chatBoxId);
    } else {
      setTimeout("$('#"+chatBoxId+" .chatBox_content').scrollTop($('#"+chatBoxId+" .chatBox_content')[0].scrollHeight)",300);
    }
  }

  function blink(chatBoxId) {
    unblink(chatBoxId);
    var intervalIn = window.setInterval("$('#"+chatBoxId+" .chatBox_shower').css('background','#a0b4d7');",1000)
    $('#'+chatBoxId+' .chatBox_shower').attr('intervalIn',intervalIn);
    window.setTimeout("var intervalOut = window.setInterval(\"$('#"+chatBoxId+" .chatBox_shower').css('background','#c0d4f7');\",1000);$('#"+chatBoxId+" .chatBox_shower').attr('intervalOut',intervalOut);",500);
    $('head title').text('(New messages) Habitica | Your Life The Role Playing Game');
  }

  function unblink(chatBoxId) {
    $('head title').text('Habitica | Your Life The Role Playing Game');
    clearInterval($('#'+chatBoxId+' .chatBox_shower').attr('intervalIn'));
    clearInterval($('#'+chatBoxId+' .chatBox_shower').attr('intervalOut'));
    $('#'+chatBoxId+' .chatBox_shower').css('background','#c0d4f7');
  }

  function mention(chatBoxId, name) {
    insertAtCaret("TA_"+chatBoxId, "@"+name+" ");
  }


  ///////////////////////////////////////////////////////////////////////
  //////////////// INITIALIZING /////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  // Hardcoded settings
  var baseAPIUrl = HABITICA_URL + "/api/v3/";
  var refreshRateFast = 30000; //previously 5000 
  var refreshRateMedium = 45000;
  var refreshRateSlow = 60000;
  var refreshRateNotification = 40000;

  
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
    "x-client": "chat-extension",
    "x-api-user": user_id,
    "x-api-key": user_key
  }

  
  //Make timeouts longer if longer than hour idle time.
  if (parseInt(config.timeoutafter) > 60) {
	refreshRateFast =  Math.ceil(refreshRateFast * parseInt(config.timeoutafter)/60);  
	refreshRateMedium =  Math.ceil(refreshRateMedium * parseInt(config.timeoutafter)/60);  
    refreshRateSlow =  Math.ceil(refreshRateSlow * parseInt(config.timeoutafter)/60);
	refreshRateNotification =  Math.ceil(refreshRateNotification * parseInt(config.timeoutafter)/60);  
  }
  
  
  
 
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

  ping.volume = 0.7;

  // Launch the chat!
  // only create if UserId and API Token are set.
  // Get player's name
  //only fetch if UserId and API Token are set.
  var userIdKeyCorrect = false
  if ((user_id.length == 36) && (user_key.length == 36)) {
	var action = "user";
	$.ajax({
		dataType: "json",
		url: baseAPIUrl + action,
		headers: apiHeaders,
		success: function(response) {
		  var data = response.data;
		  setPartyId(data['party']['_id'] ? data['party']['_id'] : "");
		  setContributorTier(data['contributor']['level']);
		  setHeroName(data['auth']['local']['username']);
		  createChatWrapper(); //Only launch group chat once party key is set.
		  userIdKeyCorrect = true	
		}
	});
  }
 
  //refresh notifications every refreshRateNotification seconds 
  //if no chat windows and if chat is active
  //if UserId and API Token are set.
  setInterval(function () {
	if ((userIdKeyCorrect) && (globalNotifications) && (chatIsActive) && ($('.chatBox').length == 0)) {
		var action = "user?userFields=achievements";
		$.ajax({
		  dataType: "json",
		  url: baseAPIUrl + action,
		  headers: apiHeaders,
		  success: function(response) {
			var notifications = response.notifications;
			if (notifications && notifications != globalNotifications) processNotifications(notifications);
		  }
		});
	}
  }, refreshRateNotification);


  ///////////////////////////////////////////////////////////////////////
  //////////////// INACTIVITY TIMER /////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  var idleTime = 0;
  $(document).ready(function () {
    //Increment the idle time counter every minute.
    var idleInterval = setInterval(timerIncrement, 60000); // 1 minute
    //Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
      if (idleTime > parseInt(config.timeoutafter)) {
        chatIsActive = true;
        $('head title').text('Habitica - Gamify Your Life');
        alert("Welcome back! The Habitica chat has been paused while you were away for over " + config.timeoutafter + " minutes.");
      }
      idleTime = 0;
    });
    $(this).keypress(function (e) {
      if (idleTime > parseInt(config.timeoutafter)) {
        chatIsActive = true;
        $('head title').text('Habitica - Gamify Your Life');
        alert("Welcome back! The Habitica chat has been paused while you were away for over " + config.timeoutafter + " minutes.");
      }
      idleTime = 0;
    });
  });

  function timerIncrement() {
    idleTime = idleTime + 1;
    if (chatIsActive == true && idleTime > parseInt(config.timeoutafter)) {
      chatIsActive = false;
      $('head title').text('(Chat Paused) | Habitica - Gamify Your Life');
    }
  }
