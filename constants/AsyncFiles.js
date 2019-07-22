import { Ionicons } from '@expo/vector-icons'

export const assets = [
  require('../assets/images/robot-dev.png'),
  require('../assets/images/robot-prod.png')
]

export const fonts = {
  ...Ionicons.font,
  'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf')
}