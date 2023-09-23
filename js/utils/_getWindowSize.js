/* ************************************************************
	get Window Size
************************************************************ */
const getWindowSize = () => {
  var size = {
    width: 0,
    height: 0
  };
  var stage = stage > 0 ? stage : ''; // global変数でstageがぞんざいする場合
  if (document.documentElement.clientHeight) {
    size.width = document.documentElement.clientWidth;
    size.height = document.documentElement.clientHeight;
  } else if (document.body.clientHeight) {
    size.width = document.body.clientWidth;
    size.height = document.body.clientHeight;
  } else if (stage.height) {
    size.width = stage.width;
    size.height = stage.height;
  }
  size.halfX = size.width * 0.5;
  size.halfY = size.height * 0.5;
  return size;
};

export default getWindowSize;
