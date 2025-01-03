import { defineType, defineField } from 'sanity';

export const productitem = defineType({
  name: 'productitem',
  title: 'ProductItem',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'object', // Updated: price is now an object
      fields: [
        defineField({
          name: 'price',
          title: 'Price',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'discountedPrice',
          title: 'Discounted Price',
          type: 'number',
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hoverimage',
      title: 'HoverImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'stock',
      title: 'Stock',
      type: 'object',
      fields: [
        defineField({
          name: 'quantity',
          title: 'Quantity',
          type: 'number',
        }),
      ],
    }),
    defineField({
      name: 'additionalInfoSections',
      title: 'Additional Info Sections',
      type: 'array',
      of: [
        defineField({
          name: 'section',
          title: 'Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
  ],
});
