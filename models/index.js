import global from './global'
import post from './post'

export const registerModels = app => {
  app.model(global)
  app.model(post)
}