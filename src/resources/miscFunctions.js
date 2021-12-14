/* eslint-disable */ 
// From http://web.archive.org/web/20110102112946/http://www.scottklarr.com/topic/425/how-to-insert-text-into-a-textarea-where-the-cursor-is/
function insertAtCaret (areaId, text) {
  const txtarea = document.getElementById(areaId)
  const scrollPos = txtarea.scrollTop
  let strPos = 0
  const br = ((txtarea.selectionStart || txtarea.selectionStart == '0')
    ? 'ff'
    : (document.selection ? 'ie' : false))
  if (br == 'ie') {
    txtarea.focus()
    var range = document.selection.createRange()
    range.moveStart('character', -txtarea.value.length)
    strPos = range.text.length
  } else if (br == 'ff') strPos = txtarea.selectionStart

  const front = (txtarea.value).substring(0, strPos)
  const back = (txtarea.value).substring(strPos, txtarea.value.length)
  txtarea.value = front + text + back
  strPos = strPos + text.length
  if (br == 'ie') {
    txtarea.focus()
    var range = document.selection.createRange()
    range.moveStart('character', -txtarea.value.length)
    range.moveStart('character', strPos)
    range.moveEnd('character', 0)
    range.select()
  } else if (br == 'ff') {
    txtarea.selectionStart = strPos
    txtarea.selectionEnd = strPos
    txtarea.focus()
  }
  txtarea.scrollTop = scrollPos
}
