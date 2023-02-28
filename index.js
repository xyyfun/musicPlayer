let lrc = {
	'songStatus': 1,
	'lyricVersion': 2,
	'lyric':
		'[00:25.53]背靠在树枝上\n[00:29.73]蜻蜓落在露水旁乘凉\n[00:35.46]表白后的乌梅树下\n[00:39.00]土壤发了芽\n[00:42.78]美得不像话\n[00:48.09]再让我想一想\n[00:52.35]那最腻的情话怎么讲\n[00:58.02]慢火熬的细水长流\n[01:01.53]念长长久久\n[01:05.40]约好到白头\n[01:11.37]你浅浅的微笑就像 乌梅子酱\n[01:17.01]我尝了你嘴角唇膏 薄荷味道\n[01:22.62]是甜甜的爱情 来的这么确定\n[01:28.32]因为你每个害羞的反应\n[01:33.99]你浅浅的微笑就像 乌梅子酱\n[01:39.63]迎风吹过你的头发 我好喜欢\n[01:45.15]厚厚的甜蜜感用幸福秤杆秤一些收藏\n[01:52.32]合照一张和夕阳\n[02:15.66]舀一勺这味道 暮暮朝朝比例刚刚好\n[02:25.56]果肉配焦糖的温柔\n[02:29.04]再几个春秋\n[02:32.88]我喂你一口\n[02:38.94]你浅浅的微笑就像 乌梅子酱\n[02:44.55]我尝了你嘴角唇膏 薄荷味道\n[02:50.13]是甜甜的爱情 来的这么确定\n[02:55.83]因为你每个害羞的反应\n[03:01.53]你浅浅的微笑就像 乌梅子酱\n[03:07.17]迎风吹过你的头发 我好喜欢\n[03:12.69]厚厚的甜蜜感用幸福秤杆秤一些收藏\n[03:19.83]合照一张和夕阳\n[03:29.82]厚厚的甜蜜感用幸福秤杆秤一些收藏\n[03:36.75]合照一张和夕阳',
	'code': 200,
};
// console.log(lrc.lyric.split('\n'));

/**
 * @Date         : 2023-02-25 22:05:56
 * @description  : 将拿到的数据转换为 => 时间+歌词的格式
 * @return        {Object}
 */
function conversionLrc() {
	let arrLrc = lrc.lyric.split('\n');
	let result = [];
	arrLrc.forEach(e => {
		let arr = e.split(']');
		let objLrc = {
			time: seconds(arr[0].substring(1)),
			lyrics: arr[1],
		};
		result.push(objLrc);
	});
	return result;
}

/**
 * @Date         : 2023-02-25 22:40:48
 * @description  : 将时间转换为数字（秒）
 * @param         {*} time:
 * @return        {*}
 */
function seconds(time) {
	let arr = time.split(':');
	return arr[0] * 60 + +arr[1];
}

let lrcData = conversionLrc();

let doms = {
	audio: document.querySelector('audio'),
	root: document.querySelector('.root'),
	ul: document.querySelector('ul'),
};

/**
 * @Date         : 2023-02-25 22:42:01
 * @description  : 返回当前播放的歌曲下标
 * @return        {*}
 */
function index() {
	// audioTime 播放器当前时间
	let audioTime = doms.audio.currentTime;
	for (let i = 0; i < lrcData.length; i++) {
		if (audioTime < lrcData[i].time) {
			return i - 1;
		}
	}
	return lrcData.length - 1;
}

/**
 * @Date         : 2023-02-25 23:25:42
 * @description  : 绘制歌词
 * @return        {*}
 */
function draw() {
	lrcData.forEach(e => {
		let li = document.createElement('li');
		li.innerHTML = e.lyrics;
		doms.ul.appendChild(li);
	});
}
draw();

let liHight = doms.ul.children[0].clientHeight;
let rootHight = doms.root.clientHeight;

/**
 * @Date         : 2023-02-25 23:25:30
 * @description  : 歌词移动
 * @return        {*}
 */
function move() {
	let id = index();
	let y = id * liHight - rootHight / 2;
	if (id < 0) {
		doms.ul.style.transform = `translateY(${-y}px)`;
	} else {
		doms.ul.style.transform = `translateY(${-y}px)`;
		let li = document.querySelector('.active');
		if (li) {
			li.classList.remove('active');
		}
		doms.ul.children[id].classList.add('active');
	}
}

doms.audio.addEventListener('timeupdate', move);
