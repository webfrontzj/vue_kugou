<template>
    <div class="rank-info-content">
        <div class="rank-banner-wrap" :style="{backgroundImage:'url('+imgurl + ')'}">
            <div class="rank-status container">
                <p>上次更新时间：{{getToday()}}</p>
            </div>
        </div>
        <div class="rank-info-list">
            <mt-cell v-for="(item,index) in songList" :title="item.filename" @click.native="playAudio(index)" :key="index">
                <span class="rank-index" :class="{'rank-list-good':index<3,'rank-list-first':index == 0,'rank-list-second':index == 1,'rank-list-third':index ==2}">{{index + 1}}</span>
                <img src="../assets/images/download_icon.png" width="20" height="20">
            </mt-cell>
        </div>
    </div>
</template>


<script>
    import {Indicator} from 'mint-ui'
    import {PLAY_AUDIO} from '../mixins'

    export default{
        mixins:[PLAY_AUDIO],
        data(){
            return {
                imgurl:'',
                songList:[],
                updateTime:'',
                opacity:0
            }
        },
        //通过路由的before钩子解除routre-view缓存限制
        /*beforeRouterEnter在组件创建之前调用，所以它无法直接用this来访问组件实例。
为了弥补这一点，vue-router开发人员，给他的next方法加了特技，可以传一个回调，回调的第一个参数即是组件实例*/
        beforeRouteEnter: (to, from, next) => {
            next(vm=>{
                vm.$store.commit('showHead',true);
                vm.getList();
                window.onscroll=()=>{
                    vm.opacity=window.pageYOffset / 250
                    vm.$store.commit('setHeadStyle',{background:`rgba(43,162,251,${vm.opacity})`});
                }
            });
        },
        // beforeRouteLeave触发时可以正常访问组件实例，但是next中不能传回调
        beforeRouteLeave (to, from, next) {
            this.$store.commit('showHead',false);
            window.onscroll=null;
            next();
        },
        mounted(){
            window.onscroll = () => {
				this.opacity = window.pageYOffset / 200
				this.$store.commit('setHeadStyle', {background: `rgba(43,162,251,${this.opacity})`})
			}
        },
        methods:{
            getToday(){
                const time=new Date();
                const year=time.getFullYear();
                let month=time.getMonth() + 1;
                let date=time.getDate();
                if(month < 10) month = '0' + month
                if(date < 10) date='0'+data
                return `${year}-${month}-${date}`
            },
            getList(){
                Indicator.open({
                    text:'加载中...',
                    spinnerType:'snake'
                });
                var infoID=this.$route.params.id;
                this.$http.get(`/proxy/rank/info/?rankid=${infoID}&page=1&json=true`).then(({data})=>{
                    Indicator.close();
                    const {info,songs} = data
                    const {banner7url,rankname}=info
                    const {list} = songs
                    this.imgurl=banner7url.replace('{size}','400');
                    this.songList=list
                    this.$store.commit('setHeadTitle',rankname);
                })
            }
        }
    }
</script>

<style>
    .rank-list-good{
        display:inline-block;
        padding:2px 8px;
        left:12px !important;
        border-radius:8px;
        color:#fff;
        margin-top:3px !important;
    }
    .rank-list-first{
        background-color:#e80000;
    }
    .rank-list-second{
        background-color: #FF7200;
    }
    .rank-list-third {
		background-color: #F8B300;
	}
</style>