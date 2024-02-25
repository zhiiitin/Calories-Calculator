<template>
    <div class="profile-container">
        <v-container>
            <v-card
            class="mx-auto mt-5"
            hover
            color="#FCFCFC"
            max-width="50%"
            elevation="24"
            rounded="xl"
        >
                <v-card-title class="mt-5">
                    個人資料
                </v-card-title>
                <v-avatar class="mt-5" size="150" color="surface-variant"></v-avatar>
                <v-list-item
                    class="text-gray mt-3"
                    title="Marcus Obrien"
                ></v-list-item>
            </v-card>
        </v-container>
        
    </div>
</template>
<script>
</script>
<style>
 .profile-container{
    background: white url(../assets/logos/calories.png) center top ;
    width: 100%;
    height: 100%;
}
</style>