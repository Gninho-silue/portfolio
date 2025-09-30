export default {
    name: 'testimonials',
    title: "Testimonials",
    type: 'document',
    fields: [
       {
         name: 'name',
         title: 'Name',
         type: 'string'
        },

       {
         name: 'company',
         title: 'Company',
         type: 'string'
        },

       {
         name: 'imageUrl',
         title: 'ImageUrl',
         type: 'image',
         option: {
            hotspot: true,
         }
        },


        {
            name: 'feedback',
            title: 'Feedback',
            type: 'string'
           },

    ]

}