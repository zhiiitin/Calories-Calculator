<template>
  <v-container>
    <v-card
      class="mx-auto px-12 pt-12 pb-8"
      hover
      color="#FCFCFC"
      rounded="xl"
      :max-width="settingStep === 1 ? 900 : 400"
      elevation="24"
    >
      <template v-if="settingStep === 0">
        <v-card-title>
          Welcome！歡迎您的加入<br />
          請先填寫下列資料</v-card-title
        >
        <v-form>
          <v-radio-group v-model="userProfile.sex" inline class="d-flex justify-center mt-3 mb-8">
            <v-radio label="男" value="1"></v-radio>
            <v-radio label="女" value="0"></v-radio>
          </v-radio-group>
          <DatePicker
            :selectedDate="userProfile.birthDate"
            @update:selectedDate="updateBirthDate"
          ></DatePicker>
          <v-text-field
            v-model="userProfile.height"
            type="number"
            label="身高(cm)"
            variant="outlined"
            density="comfortable"
          >
          </v-text-field>
          <v-text-field
            v-model="userProfile.weight"
            label="體重(kg)"
            variant="outlined"
            density="comfortable"
          >
          </v-text-field>
        </v-form>
        <v-btn
          class="mt-8 mb-3"
          width="80"
          variant="tonal"
          text="下一步"
          @click="settingStep = 1"
          :disabled="!isAllowToStepTwo"
        />
      </template>
      <template v-else-if="settingStep === 1">
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
          @click="createUserProfile()"
          :disabled="!isExerciseLevelSelected"
        />
      </template>
      <template v-else>
        <div>
          <v-card-title>請稍候，建立資料中...</v-card-title>
          <v-progress-circular class="my-8" :size="40" :width="5" indeterminate color="grey-darken-1"></v-progress-circular>
        </div>
      </template>
    </v-card>
  </v-container>
</template>
<script setup>
import { ref, computed } from 'vue'
import ExerciseIntensityCard from '@/components/ExerciseIntensityCard.vue'
import DatePicker from '@/components/DatePicker.vue'
import { useVuelidate } from '@vuelidate/core'
import { numeric, required, helpers } from '@vuelidate/validators'
import { createProfile } from '../service/profileService'

const settingStep = ref(0)

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

const isExerciseLevelSelected = computed(() =>
  exerciseIntensityLevels.value.some((item) => item.isSelected)
)

const userProfile = ref({
  sex: null,
  height: '',
  weight: '',
  birthDate: '',
  tdee: null,
  bmr: null,
  bmi: null
})

const userProfileRules = {
  sex: {
    required: helpers.withMessage('此欄位為必填', required)
  },
  birthDate: {
    required: helpers.withMessage('此欄位為必填', required)
  },
  height: {
    required: helpers.withMessage('此欄位為必填', required),
    umeric: helpers.withMessage('此欄位需為正數', numeric)
  },
  weight: {
    required: helpers.withMessage('此欄位為必填', required),
    umeric: helpers.withMessage('此欄位需為正數', numeric)
  }
}

const v$ = useVuelidate(userProfileRules, userProfile)
const isAllowToStepTwo = computed(() => {
  v$.value.$validate()
  if (v$.value.$error) {
    return false
  }
  return true
})

const exerciseLevel = ref(0)

// 選擇運動強度，若有已選擇的item 狀態改回false
const selectedIntensity = (selectData) => {
  exerciseIntensityLevels.value.forEach((item) => {
    if (item.isSelected) {
      item.isSelected = false
    }
  })
  selectData.isSelected = true
  exerciseLevel.value = selectData.value
}

// emit 事件接收birthDate值變化
const updateBirthDate = (updatedDate) => {
  userProfile.value.birthDate = updatedDate
}

// 建立使用者個人詳細資料
const createUserProfile = async () => {
  settingStep.value = 2 ;
  const height = userProfile.value.height
  const weight = userProfile.value.weight
  const sex = userProfile.value.sex
  const age = calculateAge(userProfile.value.birthDate)

  userProfile.value.bmi = calculateBmi(height, weight)
  userProfile.value.bmr = calculateBmr(age, height, weight, sex)
  userProfile.value.tdee = calculateTdee(userProfile.value.bmr)

  const result = await createProfile(userProfile.value)
  console.log(result)
}

// 計算BMI
const calculateBmi = (height, weight) => {
  const _height = height / 100
  const bmi = weight / (_height * _height)
  return bmi
}

// 計算BMR
const calculateBmr = (age, height, weight, sex) => {
  const bmr = weight * 9.99 + height * 6.25 - age * 4.92 + (166 * sex - 161)
  return bmr
}

// 計算年齡
const calculateAge = (birthDate) => {
  const ageDifMs = Date.now() - new Date(birthDate).getTime()
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}
// 計算TDEE
const calculateTdee = (bmr) => {
  const mutiple = exerciseLevel.value
  const tdee = bmr * mutiple
  return tdee
}
</script>
<style scoped></style>
