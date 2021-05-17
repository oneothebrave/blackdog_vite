<template>
  <Nav />

  <div class="contents">
    <WorkBox v-for="work in works" :key="work._id" :work="work" />
  </div>
</template>

<script>
import Nav from "../components/Nav.vue"
import WorkBox from "../components/WorkBox.vue";
import { onBeforeMount } from 'vue';
import { useRouter } from "vue-router";
import axios from "axios";
export default {
    components:{
        Nav,
        WorkBox
    },
    setup(){
        const router = useRouter();
        onBeforeMount(() => {
            axios
                .get("/api/user/auth",
                    {
                        headers: {
                            "auth-token": localStorage["auth-token"]
                        }
                    }
                )
                .then((response) => {
                    axios
                        .get("/api/retrieve/")
                        .then((res) => {
                            console.log(213)
                            console.log(res)
                            debugger
                        })
                })
                .catch((err) => {
                    // 验证不通过就跳回到Login页面
                    router.push({
                        name: "Login"
                    });
                })
        });
        
        // 获取数据

        const works = [
            {"_id": 1, "title": "el3", "src": "/static/el3.jpg", "authorHead": "/static/el3.jpg", "authorName": "mario9", "info": "This one takes the cake for the sheer number of “thirteen ways of looking at x” knockoffs that I’ve seen. But please see also: “The Emperor of Ice-Cream.”"},
            {"_id": 2, "title": "el2", "src": "/static/el2.jpg", "authorHead": "/static/el2.jpg", "authorName": "mario8", "info": "To be quite honest, my favorite Plath poem is “The Applicant.” But “Daddy” is still the most iconic, especially if you’ve ever heard her read it aloud."},
            {"_id": 3, "title": "el1", "src": "/static/el1.jpg", "authorHead": "/static/el1.jpg", "authorName": "mario7", "info": "One of the defining works of the Harlem Renaissance, by its greatest poet. It also, of course, gave inspiration and lent a title to another literary classic: Lorraine Hansberry’s A Raisin in the Sun."},
            {"_id": 4, "title": "l2", "src": "/static/l2.jpg", "authorHead": "/static/l2.jpg", "authorName": "mario6", "info": "The truth is, there are lots of equally iconic Dickinson poems, so consider this a stand-in for them all. Though, as Jay Parini has noted, this poem is perfect, “one of Dickinson’s most compressed and chilling attempts to come to terms with mortality.”"},
            {"_id": 5, "title": "阿尔卑斯山", "src": "/static/l1.jpg", "authorHead": "/static/l1.jpg", "authorName": "mario5", "info": "Bishop’s much loved and much discussed ode to loss, which Claudia Roth Pierpont called “a triumph of control, understatement, wit. Even of self-mockery, in the poetically pushed rhyme word “vaster,” and the ladylike, pinkies-up “shan’t.” An exceedingly rare mention of her mother—as a woman who once owned a watch. A continent standing in for losses larger than itself.”"},
            {"_id": 6, "title": "m2", "src": "/static/m2.jpg", "authorHead": "/static/m2.jpg", "authorName": "mario4", "info": "This blew my mind in high school, and I wasn’t the only one."},
            {"_id": 7, "title": "m1", "src": "/static/m1.jpg", "authorHead": "/static/m1.jpg", "authorName": "mario3", "info": "Otherwise known as “the most misread poem in America.” See also: “Stopping by Woods on a Snowy Evening.” And “Birches.” All begin in delight and end in wisdom, as Frost taught us great poems should."},
            {"_id": 8, "title": "s2", "src": "/static/s2.jpg", "authorHead": "/static/s2.jpg", "authorName": "mario2", "info": "Without a doubt one of the most important poems of the 20th century. “It has never lost its glamour,” Paul Muldoon observed. “It has never failed to be equal to both the fracture of its own era and what, alas, turned out to be the even greater fracture of the ongoing 20th century and now, it seems, the 21st century.” See also: “The Love Song of J. Alfred Prufrock.”"},
            {"_id": 9, "title": "s1", "src": "/static/s1.jpg", "authorHead": "/static/s1.jpg", "authorName": "mario", "info": "The most anthologized poem of the last 25 years for a reason. See also: “This is Just to Say,” which, among other things, has spawned a host of memes and parodies."}
            
        ];

        return {
            works
        }

    }

}
</script>

<style>

</style>