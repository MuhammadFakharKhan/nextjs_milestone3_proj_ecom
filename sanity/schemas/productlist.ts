import { defineType } from "sanity";

export const productlist = defineType({
    name: 'productlist',
    title: 'ProductList',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
      },
      {
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: { type: 'category' },
      },
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [{ type: 'image' }],
      },
      {
        name: 'priceData',
        title: 'Price Data',
        type: 'object',
        fields: [
          {
            name: 'price',
            title: 'Price',
            type: 'number',
          },
          {
            name:'discounted_price',
            title:'Discounted Price',
            type:'number'
          },
        ],
      },
      {
        name: 'additionalInfoSections',
        title: 'Additional Info Sections',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Title',
                type: 'string',
              },
              {
                name: 'description',
                title: 'Description',
                type: 'text',
              },
            ],
          },
        ],
      },
    ],
  })




 