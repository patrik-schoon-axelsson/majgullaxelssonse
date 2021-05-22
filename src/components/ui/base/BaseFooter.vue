<template>
<footer class="page-footer">
    <div class="container">
        <p class="center-align">
            MajgullAxelsson.se tillhör Majgull Axelsson AB. Kontakt för sidan är <a href="mailto:webmaster@majgullaxelsson.se"> webmaster@majgullaxelsson.se</a>.         
        </p>
    </div>
</footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
footer {
    bottom: 0;
    position: fixed;
    width: 100vw;
    height: 5vh;
    p{
        margin: 0;
        padding: 0;
        font-size: 0.9rem;
    }
    a {
        color: #fff;
        &:hover {
            color: #90a4ae;
        }
    }
}

</style>