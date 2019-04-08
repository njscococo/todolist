let data = [
    {
        user: 'angus',
        projects: [
            {
                projectName: 'Personal',
                todoItems: [{label:'first', detail:'go', isDone:false},{label:'second', detail:'gogo', isDone:false}]
            },
            {
                projectName: 'Work',
                todoItems: []
            }
        ],        
    }
]

module.exports={
    data
}