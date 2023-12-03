<template>
    <!-- <div class="not-found">
    <div id="not-found">Not Found</div>

</div> -->
    <section class="page_404">
        <div class="container ">
            <div class="row">
                <div class="col-12 ">
                    <div class="text-center">
                        <div class="four_zero_four_bg">
                            <h1 class="text-center ">404</h1>


                        </div>

                        <div class="contant_box_404">
                            <h3 class="h2">
                                Look like you're lost
                            </h3>

                            <p>the page you are looking for not avaible!</p>

                            <router-link href="" to="/welcome" class="link_404">Go Back</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: "notFound",
}
</script>

<style lang="scss" scoped>
.not-found {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba($color: #000000, $alpha: 1);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;

    #not-found {
        position: absolute;
        z-index: 3;
    }

}

/*======================
    404 page
=======================*/


.page_404 {
    padding: 40px 0;
    background: #fff;
    font-family: 'Arvo', serif;
}

.page_404 img {
    width: 100%;
}

.four_zero_four_bg {

    background-image: url("../components/logos/dribbble_1.gif");
    height: 400px;
    background-position: center;
    width: 100%;
}


.four_zero_four_bg h1 {
    font-size: 80px;
}

.four_zero_four_bg h3 {
    font-size: 80px;
}

.link_404 {
    color: #fff !important;
    padding: 10px 20px;
    background: #39ac31;
    margin: 20px 0;
    display: inline-block;
}

.contant_box_404 {
    margin-top: -50px;
}</style>