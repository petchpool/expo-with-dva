import { Ionicons } from '@expo/vector-icons'

const imageAssets = {
  robotDev: require('../assets/images/robot-dev.png'),
  robotProd: require('../assets/images/robot-prod.png')
}

const fontAssets = {
  ...Ionicons.font,
  'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf')
}

export default {
  imageAssets,
  fontAssets
}