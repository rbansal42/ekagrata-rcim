import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { category } from './category'
import { story } from './story'
import { homePage } from './homePage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, story, homePage],
}
