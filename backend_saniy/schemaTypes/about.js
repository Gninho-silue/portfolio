
export default{
    name:'about',
    title:'About',
    type: 'document',
    fields:[
        {
            name:'title',
            title:'Title',
            type:'string'
        },
        {
            name:'description',
            title:'Description',
            type:'string'
        },
        {
            name:'imageUrl',
            title:'ImageUrl',
            type: 'image',
            options: {
              hotspot: true,
            },
        },
        
    ]
}
