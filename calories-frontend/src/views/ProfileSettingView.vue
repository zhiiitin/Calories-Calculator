<template>
  <v-container>
    <v-card
      class="mx-auto px-12 pt-12 pb-8"
      hover
      color="#FCFCFC"
      rounded="xl"
      :max-width="nextStep ? 900 : 400"
      elevation="24"
    >
      <template v-if="!nextStep">
        <v-card-title>
          Welcome！歡迎您的加入<br />
          請先填寫下列資料</v-card-title
        >
        <v-form>
          <v-radio-group inline class="d-flex justify-center mt-3 mb-8">
            <v-radio label="男" value="one"></v-radio>
            <v-radio label="女" value="two"></v-radio>
          </v-radio-group>
          <v-menu
            ref="menu"
            v-model="menuActive"
            :close-on-content-click="false"
            transition="scale-transition"
            min-width="auto"
          >
            <template v-slot:activator="{ props }">
              <v-text-field
                v-model="_birthDate"
                label="出生日期"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="props"
                variant="outlined"
                density="comfortable"
              >
              </v-text-field>
            </template>
            <v-date-picker
              hide-actions
              v-model="birthDate"
              hide-header="true"
              color="grey-lighten-2"
              elevation="12"
              header="出生日期"
              viewMode="year"
              rounded="lg"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1950-01-01"
            >
            </v-date-picker>
          </v-menu>
          <v-text-field
            v-model="height"
            type="number"
            label="身高(cm)"
            variant="outlined"
            density="comfortable"
          >
          </v-text-field>
          <v-text-field v-model="weight" label="體重(kg)" variant="outlined" density="comfortable">
          </v-text-field>
        </v-form>
        <v-btn
          class="mt-8 mb-3"
          width="80"
          variant="tonal"
          text="下一步"
          @click="nextStep = !nextStep"
        />
      </template>
      <template v-else>
        <v-card-title> 請選擇活動程度</v-card-title>
        <v-container>
          <v-row justify="center">
            <v-col v-for="data in exerciseIntensityLevels" :cols="data.flex" class="mt-2">
              <ExerciseIntensityCard
                :data="data"
                :isSelected="data.isSelected"
                @click="selectedIntensity(data)"
              ></ExerciseIntensityCard>
            </v-col>
          </v-row>
        </v-container>
        <v-btn
          class="mt-8 mb-3"
          width="80"
          variant="tonal"
          text="下一步"
          @click="nextStep = !nextStep"
          :disabled="!isExerciseLevelSelected"
        />
      </template>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import ExerciseIntensityCard from '@/components/ExerciseIntensityCard.vue'

const birthDate = ref()
const menuActive = ref(false)
const nextStep = ref(false)

const _birthDate = computed(() =>
  birthDate.value ? dayjs(birthDate.value).format('YYYY-MM-DD') : ''
)

const exerciseIntensityLevels = ref([
  {
    title: '趨於靜態活動',
    subTitle: '沒什麼在運動...',
    content: '生活型態屬於久坐類型，如久坐、靜臥、沙發馬鈴薯',
    value: 1.2,
    flex: 4,
    imagePath: 'src/assets/images/working.png',
    isSelected: false
  },
  {
    title: '輕量活動',
    subTitle: '每週運動1-3天',
    content: '輕鬆的基本活動，如散步、烹飪、遛狗',
    value: 1.375,
    flex: 4,
    imagePath: 'src/assets/images/walking-the-dog.png',
    isSelected: false
  },
  {
    title: '中度活動',
    subTitle: '每週運動3-5天',
    content: '呼吸心跳些微加快的活動，如掃拖地、逛街、健走',
    value: 1.55,
    flex: 4,
    imagePath: 'src/assets/images/trekking.png',
    isSelected: false
  },
  {
    title: '高度活動',
    subTitle: '每週運動6-7天',
    content: '呼吸心跳快速且會大量流汗的活動，如有氧運動、游泳、登山、騎腳踏車、打球',
    value: 1.72,
    flex: 4,
    imagePath: 'src/assets/images/swimming.png',
    isSelected: false
  },
  {
    title: '非常高度活動',
    subTitle: '無時無刻都在動',
    content: '幾乎整天都做高強度的運動，如長跑、運動訓練、體力勞動工作',
    value: 1.9,
    flex: 4,
    imagePath: 'src/assets/images/exercise.png',
    isSelected: false
  }
])

const isExerciseLevelSelected = computed(() => exerciseIntensityLevels.value.some((item) => item.isSelected))


const height = ref()
const weight = ref()

// 選擇運動強度，若有已選擇的item 狀態改回false
const selectedIntensity = (selectData) => {
  exerciseIntensityLevels.value.forEach((item) => {
    if (item.isSelected) {
      item.isSelected = false
    }
  })
  selectData.isSelected = true
}
</script>
<style scoped></style>
