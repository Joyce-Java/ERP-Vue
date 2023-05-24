<template>
    <div >
        <h1>退出登入....</h1>
    </div>
</template>

<script>

    export default {

        data() {
            return {

            }
        }

        , methods: {






        }, mounted() {


        }, created() {

            localStorage.removeItem('jwt');
            this.$router.push('/login')



        }
    }
</script>