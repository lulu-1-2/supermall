import { debounce } from 'common/utils';
import BackTop from "components/content/backTop/BackTop";
//图片加载监听混入
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            newRefresh: null
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh, 200);
        this.itemImgListener = () => {
            this.newRefresh();
        };
        this.$bus.$on("itemImageLoad", this.itemImgListener);
        //console.log('我是混入的内容');
    },
}
//回到顶部监听混入
export const backTopMixin = {
    components:{
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
          },
    },
}



