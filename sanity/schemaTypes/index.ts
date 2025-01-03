import { type SchemaTypeDefinition } from 'sanity'
import { productitem} from '../schemas/productitem'
import { category } from '../schemas/category'
import {productlist} from '../schemas/productlist'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productitem, category, productlist],
}
