<template>
    <div class="header">
        <HeadLogo />
        <RankHead v-if="head.toggle" :title="head.title" :cStyle="head.style"/>
        <HeadNav v-else/>
    </div>
</template>

<script>
    import HeadLogo from "./HeadLogo.vue";
    import HeadNav from "./HeadNav.vue";
    import RankHead from "./RankHead.vue";

    import {mapGetters} from 'vuex';

    export default {
        computed:{
            ...mapGetters(['head'])
        },
        components:{
            HeadLogo,
            HeadNav,
            RankHead
        }
    }
</script>