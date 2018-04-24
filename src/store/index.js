import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        audio:{
            songUrl:'',
            imgUrl:'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
            title:'',
            singer:'',
            currentLength:0,
            songLength:0,
            currentFlag:false
        },
        head:{
            toggle:false,
            title:'',
            style:{'background':'rgba(43,162,251,0)'}
        },
        audioLoadding: false,
        headNav:'head-nav1',
        listInfo:{
            songList:[],
            songIndex:0
        },
        listenCount:0,
        showPlayer:false,
        isPlay:true,
        detailPlayerFlag:false,
    },
    getters:{
        audio:state=>state.audio,
        headNav:state => state.headNav,
        head:state => state.head,
        audioLoadding: state => state.audioLoadding,
        isPlay:state=>state.isPlay,
        detailPlayerFlag:state=>state.detailPlayerFlag,
        showPlayer: state => state.showPlayer,
    },
    mutations:{
        showDetailPlayer:(state,flag) => {
            state.audioLoadding = flag
        },
        setHeadNav:(state,nav) =>{
            state.headNav=nav;
        },
        setListInfo:(state,{list,index})=>{
            state.listInfo.songList=list
            state.listInfo.songIndex=index
        },
        setAudio(state,audio){
            if(!state.listenCount){
                state.showPlayer=true  //首次进入应用时不可打开播放详情
            }
            state.listenCount++;
            state.audio={...(state.audio),...audio}
        },
        showHead(state,flag){
            state.head.toggle=flag
        },
        setHeadTitle(state,title){
            state.head.title=title
        },
        setHeadStyle(state,style){
            state.head.style=style
        },
        resetHeadStyle:state=>{
            state.head.style={'background':'rgba(43,162,251,0)'}
        },
        isPlay:(state,flag)=>{
            state.isPlay=flag;
        },
        showDetailPlayer:(state,flag)=>{
            state.detailPlayerFlag=flag;
        },
        setCurrent(state,flag){
            state.audio.currentFlag=flag;
        },
        setAudioTime(state,time){
            state.audio.currentLength=time;
        },
        toggleAudioLoadding:(state,flag)=>{
            state.audioLoadding=flag;
        },
        setLrc:(state,lrc)=>{
            state.audio={...(state.audio),lrc}
        }
    },
    actions:{
        getSong({commit,state},hash){
            commit('toggleAudioLoadding',true);
            axios.get(`/bproxy/yy/index.php?r=play/getdata&hash=${hash}`).then(({data})=>{
                data=data.data
                const songUrl=data.play_url
                const imgUrl=data.img
                const title=data.audio_name
                const songLength=data.timelength / 1000
                const singer=data.author_name
                const currentLength=0
                const lrc=data.lyrics
                const audio={songUrl,imgUrl,title,singer,songLength,currentLength}
                commit('setAudio',audio)
                commit('setLrc',lrc);
                commit('toggleAudioLoadding',false);
            })
        },
        next({dispatch,state}){
            var list=state.listInfo.songList;
            if(state.listInfo.songIndex == list.length-1){
                state.listInfo.songIndex=0
            }else{
                ++state.listInfo.songIndex;
            }
            if(list.length != 0){
                var hash=list[state.listInfo.songIndex].hash;
                dispatch('getSong',hash);
            }
        },
        prev({dispatch,state}){
            var list=state.listInfo.songList;
            if(state.listInfo.songIndex == 0){
                state.listInfo.songIndex = list.length - 1
            }else{
                state.listInfo.songIndex--
            }
            if(list.length !=0){
                var hash=list[state.listInfo.songIndex].hash;
                dispatch('getSong',hash);
            }
        }
    }
});

export default store