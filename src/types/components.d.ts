import NavBar from '@/components/NavBar.vue'
import UseIcon from '@/components/UseIcon.vue'
import RadioButton from '@/components/RadioButton.vue'

declare module 'vue' {
  interface GlobalComponents {
    NavBar: typeof NavBar
    UseIcon: typeof UseIcon
    RadioButton: typeof RadioButton
  }
}
