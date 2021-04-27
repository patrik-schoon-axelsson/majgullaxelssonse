<template>
    <li><a class="btn" target="_blank" :href="href">{{name}}</a></li>
</template>

<script>
export default {
name: 'LinksButton',
props: ['href', 'name']
}
</script>

<style lang="scss" scoped>
li {
    width: 100%;
    margin: 0.5rem;
    a {
        width: 100%;
    }
}

</style>