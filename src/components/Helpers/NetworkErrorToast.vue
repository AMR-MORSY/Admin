<template>
    <div class="toast-container  position-fixed bottom-0 end-0 p-3" >
        <div id="NetworkErrorToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" >
           
            <div class="toast-body" style="background-color: red; border-radius: 5px;">
               <strong style="color: white;">Network Error......!</strong> 
                
            </div>
          
        </div>
    </div>
</template>

<script>
import "bootstrap";

export default {
    data() {


        return {}
    },
    name: "NetwwokErrorToast",
  
      
}
</script>

<style lang="scss" scoped>


</style>